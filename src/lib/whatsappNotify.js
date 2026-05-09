/**
 * Browser → Netlify function `/api/whatsapp-enquiry` (Meta WhatsApp Cloud API).
 * Enable with VITE_WHATSAPP_NOTIFY_ENABLED=true and configure server env (see .env.example).
 */
export function isWhatsAppBusinessNotifyEnabled() {
  return import.meta.env.VITE_WHATSAPP_NOTIFY_ENABLED === 'true';
}

/**
 * Fire-and-forget notification to your WhatsApp Business inbox (same summary as email).
 * Does not throw — logs on failure so contact form success is unchanged.
 */
export async function notifyWhatsAppBusinessEnquiry({
  name,
  email,
  phone,
  matterType,
  message,
}) {
  const secret = import.meta.env.VITE_CONTACT_NOTIFY_SECRET?.trim();
  const res = await fetch('/api/whatsapp-enquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-contact-secret': secret } : {}),
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      matterType,
      message,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    const msg = data.error || data.message || res.statusText || 'Request failed';
    throw new Error(typeof msg === 'string' ? msg : 'WhatsApp notify failed');
  }
  return data;
}
