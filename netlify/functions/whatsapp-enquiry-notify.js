import { sendWhatsAppTextMessage } from '../lib/whatsappGraphSend.js';

/** Keep in sync with `src/lib/formatEnquiryWhatsApp.js`. */
function formatEnquiryWhatsApp({ name, email, phone, matterType, message }) {
  const msg = (message ?? '').trim() || '—';
  return [
    '*New website enquiry*',
    '',
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*Phone:* ${phone}`,
    `*Matter:* ${matterType}`,
    '',
    '*Message:*',
    msg,
  ].join('\n');
}

function json(statusCode, data) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' });
  }

  const notifySecret = process.env.CONTACT_NOTIFY_SECRET?.trim();
  const headerSecret =
    event.headers['x-contact-secret'] || event.headers['X-Contact-Secret'];
  if (notifySecret && headerSecret !== notifySecret) {
    return json(401, { ok: false, error: 'Unauthorized' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const to = process.env.WHATSAPP_NOTIFY_TO?.trim();

  if (!accessToken || !phoneNumberId || !to) {
    return json(503, { ok: false, configured: false });
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const phone = String(payload.phone ?? '').trim();
  const matterType = String(payload.matterType ?? '').trim();
  const message = payload.message != null ? String(payload.message) : '';

  if (!name || !email) {
    return json(400, { ok: false, error: 'Missing name or email' });
  }

  const bodyText = formatEnquiryWhatsApp({
    name,
    email,
    phone,
    matterType,
    message,
  });

  try {
    await sendWhatsAppTextMessage({
      accessToken,
      phoneNumberId,
      toE164Digits: to,
      bodyText,
    });
    return json(200, { ok: true });
  } catch (e) {
    console.error('[whatsapp-enquiry-notify]', e);
    return json(502, {
      ok: false,
      error: e instanceof Error ? e.message : 'WhatsApp send failed',
    });
  }
};
