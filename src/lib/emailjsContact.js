import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FIRM_EMAIL } from '../constants/contact';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID?.trim();
/** Override inbox if different from `FIRM_EMAIL` (must match template “To Email” variable). */
const inboxFromEnv = import.meta.env.VITE_EMAILJS_INBOX_EMAIL?.trim();
/** If set, we also send this param name with the inbox address (your dashboard “To Email” = {{this}}). */
const customToParam = import.meta.env.VITE_EMAILJS_TO_TEMPLATE_PARAM?.trim();

export function isEmailJsConfigured() {
  return Boolean(publicKey && serviceId && templateId);
}

export function isAutoReplyConfigured() {
  return Boolean(publicKey && serviceId && autoReplyTemplateId);
}

/** Human-readable detail for UI when EmailJS `send` rejects. */
export function formatEmailJsSendError(err) {
  if (err instanceof EmailJSResponseStatus) {
    return `(${err.status}) ${err.text}`;
  }
  if (err && typeof err === 'object' && 'status' in err && 'text' in err) {
    return `(${err.status}) ${err.text}`;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}

/**
 * Sends enquiry via EmailJS. Template must define matching variables (see `.env.example`).
 */
export async function sendContactEmailViaEmailJs({
  name,
  email,
  phone,
  matterLabel,
  visitorMessage,
}) {
  if (!isEmailJsConfigured()) {
    throw new Error('EmailJS is not configured');
  }

  const firmInbox = inboxFromEnv || FIRM_EMAIL;
  /** Only the brief description — structured fields are sent separately to avoid duplicating them in the template. */
  const messageOnly = (visitorMessage ?? '').trim();
  const inquirySnippet = messageOnly || '—';
  const messageBody = inquirySnippet;
  /** Short line for Subject / summary fields in EmailJS (same idea as customer acknowledgement {{title}}). */
  const enquirySubject = `New website enquiry — ${matterLabel}`;

  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    phone,
    matter_type: matterLabel,
    inquiry_body: inquirySnippet,
    title: matterLabel,
    subject: enquirySubject,
    to_email: firmInbox,
    office_email: firmInbox,
    /** Extra aliases so “To Email” works whatever name you used in the dashboard. */
    recipient_email: firmInbox,
    email_to: firmInbox,
    company_email: firmInbox,
    admin_email: firmInbox,
    destination_email: firmInbox,
    /**
     * EmailJS “Contact Us” pre-built template uses `name`, `email`, `message`, `time`.
     * If “To Email” is wrongly set to `{{email}}`, mail goes to the visitor — fix To in the dashboard.
     */
    name,
    email,
    message: messageBody,
    time: new Date().toISOString(),
  };

  if (customToParam && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(customToParam)) {
    templateParams[customToParam] = firmInbox;
  }

  await emailjs.send(serviceId, templateId, templateParams, { publicKey });
}

/**
 * Sends a thank-you / acknowledgement to the visitor’s email.
 * In EmailJS, set “To Email” to `{{to_email}}` (visitor). Template typically uses {{name}}, {{title}}.
 */
export async function sendAutoReplyViaEmailJs({
  toEmail,
  customerName,
  enquiryTitle,
  acknowledgement,
}) {
  if (!isAutoReplyConfigured()) {
    return;
  }

  await emailjs.send(
    serviceId,
    autoReplyTemplateId,
    {
      to_email: toEmail,
      name: customerName,
      title: enquiryTitle,
      customer_name: customerName,
      acknowledgement,
      message: acknowledgement,
    },
    { publicKey }
  );
}
