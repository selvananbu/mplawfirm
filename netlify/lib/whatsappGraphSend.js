/**
 * Meta WhatsApp Cloud API — server-only (Netlify / Vite dev proxy).
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
 */
const GRAPH_VERSION = 'v21.0';

export async function sendWhatsAppTextMessage({
  accessToken,
  phoneNumberId,
  toE164Digits,
  bodyText,
}) {
  const text = String(bodyText).slice(0, 4096);
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: String(toE164Digits).replace(/\D/g, ''),
      type: 'text',
      text: { preview_url: false, body: text },
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errMsg =
      json?.error?.message || json?.error?.error_user_msg || `HTTP ${res.status}`;
    throw new Error(errMsg);
  }
  return json;
}
