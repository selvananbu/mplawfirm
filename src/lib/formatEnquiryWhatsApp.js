/**
 * Plain-text enquiry for WhatsApp Business Cloud API (max 4096 chars — truncate server-side).
 * Uses *bold* markers supported in WhatsApp default client.
 */
export function formatEnquiryWhatsApp({ name, email, phone, matterType, message }) {
  const msg = (message ?? '').trim() || '—';
  const lines = [
    '*New website enquiry*',
    '',
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*Phone:* ${phone}`,
    `*Matter:* ${matterType}`,
    '',
    '*Message:*',
    msg,
  ];
  return lines.join('\n');
}
