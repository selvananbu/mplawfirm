import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fetchPlaceDetailsFromGoogle, buildClientPayload } from './src/lib/googleReviewsPayload.js'
import { formatEnquiryWhatsApp } from './src/lib/formatEnquiryWhatsApp.js'
import { sendWhatsAppTextMessage } from './netlify/lib/whatsappGraphSend.js'

/** Server-side Places requests have no browser Referer; Google keys restricted by HTTP referrer need this set. */
function resolveDevPlacesReferer(env) {
  const explicit = env.GOOGLE_PLACES_API_REFERER?.trim()
  if (explicit) return explicit
  const port = env.VITE_DEV_PORT?.trim() || '5173'
  return `http://localhost:${port}/`
}

async function readRequestJson(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString()
  try {
    return JSON.parse(raw || '{}')
  } catch {
    throw new Error('Invalid JSON')
  }
}

function whatsappEnquiryDevProxy(env) {
  return {
    name: 'whatsapp-enquiry-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/whatsapp-enquiry')) {
          next()
          return
        }
        if (req.method !== 'POST') {
          next()
          return
        }

        const notifySecret =
          env.CONTACT_NOTIFY_SECRET || process.env.CONTACT_NOTIFY_SECRET
        const headerSecret =
          req.headers['x-contact-secret'] || req.headers['X-Contact-Secret']
        if (notifySecret?.trim() && headerSecret !== notifySecret.trim()) {
          res.statusCode = 401
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }))
          return
        }

        let payload
        try {
          payload = await readRequestJson(req)
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }))
          return
        }

        const accessToken =
          env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN
        const phoneNumberId =
          env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_NUMBER_ID
        const to =
          env.WHATSAPP_NOTIFY_TO || process.env.WHATSAPP_NOTIFY_TO

        if (!accessToken?.trim() || !phoneNumberId?.trim() || !to?.trim()) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, configured: false }))
          return
        }

        const name = String(payload.name ?? '').trim()
        const email = String(payload.email ?? '').trim()
        const phone = String(payload.phone ?? '').trim()
        const matterType = String(payload.matterType ?? '').trim()
        const message = payload.message != null ? String(payload.message) : ''

        if (!name || !email) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Missing name or email' }))
          return
        }

        const bodyText = formatEnquiryWhatsApp({
          name,
          email,
          phone,
          matterType,
          message,
        })

        try {
          await sendWhatsAppTextMessage({
            accessToken: accessToken.trim(),
            phoneNumberId: phoneNumberId.trim(),
            toE164Digits: to.trim(),
            bodyText,
          })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
        } catch (e) {
          console.error('[whatsapp-enquiry dev proxy]', e)
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              ok: false,
              error: e instanceof Error ? e.message : 'WhatsApp send failed',
            }),
          )
        }
      })
    },
  }
}

function googleReviewsDevProxy(env) {
  return {
    name: 'google-reviews-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/google-reviews')) {
          next()
          return
        }
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          next()
          return
        }

        const apiKey =
          env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY
        const placeId = env.GOOGLE_PLACE_ID || process.env.GOOGLE_PLACE_ID

        if (!apiKey || !placeId) {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, configured: false }))
          return
        }

        try {
          const raw = await fetchPlaceDetailsFromGoogle(apiKey, placeId, {
            referer: resolveDevPlacesReferer(env),
          })
          const payload = buildClientPayload(raw)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        } catch (e) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: e instanceof Error ? e.message : 'Proxy error',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      googleReviewsDevProxy(env),
      whatsappEnquiryDevProxy(env),
    ],
  }
})
