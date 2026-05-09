import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useInView } from './useInView';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FIRM_EMAIL,
  FIRM_MAILTO_HREF,
  FIRM_PHONE_DISPLAY,
  FIRM_PHONE_HREF,
  FIRM_WHATSAPP_HREF,
  OFFICE_CITY,
} from '../constants/contact';
import { CONTACT_CASE_TYPE_VALUES } from '../constants/caseTypes';
import {
  isEmailJsConfigured,
  sendAutoReplyViaEmailJs,
  sendContactEmailViaEmailJs,
  formatEmailJsSendError,
} from '../lib/emailjsContact';
import {
  isWhatsAppBusinessNotifyEnabled,
  notifyWhatsAppBusinessEnquiry,
} from '../lib/whatsappNotify';
import { OfficeAddressContactCard } from './OfficeAddress';
import { useI18n } from '../i18n/useI18n';

const easeContact = [0.22, 1, 0.36, 1];

const actionBtnClass =
  'flex items-center justify-center gap-2 w-full rounded-lg py-3.5 text-[12px] font-semibold tracking-wide transition-all duration-300 ' +
  'bg-navy-900 text-white ring-1 ring-inset ring-gold-500/40 hover:bg-navy-800 hover:ring-gold-500/55';

const fieldWrap =
  'rounded-xl border border-slate-200/90 bg-white transition-all duration-300 ease-out ' +
  'focus-within:border-gold-500/55 focus-within:ring-2 focus-within:ring-gold-500/20 focus-within:shadow-[0_0_0_3px_rgba(200,163,58,0.06)]';

const inputInner =
  'w-full rounded-xl border-0 bg-transparent px-4 py-3 text-[14px] text-navy-900 placeholder:text-slate-400 ' +
  'focus:outline-none focus:ring-0';

export default function ContactCTA() {
  const { t, ta } = useI18n();
  const [ref, inView] = useInView(0.08);
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', phone: '', caseType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const caseTypeLabels = ta('contact.caseTypes');

  const handleChange = (e) => {
    setSubmitError('');
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSending(true);

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const idx = CONTACT_CASE_TYPE_VALUES.indexOf(form.caseType);
    const matterLabel = idx >= 0 ? caseTypeLabels[idx] : form.caseType;
    try {
      if (!isEmailJsConfigured()) {
        setSubmitError(t('contact.emailNotConfigured'));
        return;
      }

      await sendContactEmailViaEmailJs({
        name,
        email,
        phone,
        matterLabel,
        visitorMessage: form.message,
      });
      try {
        await sendAutoReplyViaEmailJs({
          toEmail: email,
          customerName: name,
          enquiryTitle: matterLabel,
          acknowledgement: t('contact.autoReplyEmail', { name }),
        });
      } catch (autoReplyErr) {
        console.error('[Contact auto-reply EmailJS]', autoReplyErr);
      }

      if (isWhatsAppBusinessNotifyEnabled()) {
        notifyWhatsAppBusinessEnquiry({
          name,
          email,
          phone,
          matterType: matterLabel,
          message: form.message,
        }).catch((waErr) => console.warn('[WhatsApp notify]', waErr));
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 8000);
      setForm({ name: '', email: '', phone: '', caseType: '', message: '' });
    } catch (err) {
      console.error('[Contact enquiry EmailJS]', err);
      setSubmitError(
        t('contact.emailError', { reason: formatEmailJsSendError(err) })
      );
    } finally {
      setSending(false);
    }
  };

  const skipEntrance = Boolean(prefersReducedMotion);
  const formAnimate = skipEntrance ? 'visible' : inView ? 'visible' : 'hidden';

  const rowVariants = skipEntrance
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: easeContact },
        },
      };

  const formShellVariants = skipEntrance
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: 0.05 },
        },
      };

  const contactDetails = [
    { icon: HiOutlinePhone, label: t('contact.phone'), value: FIRM_PHONE_DISPLAY, href: FIRM_PHONE_HREF },
    { icon: HiOutlineMail, label: t('contact.email'), value: FIRM_EMAIL, href: FIRM_MAILTO_HREF },
    { icon: HiOutlineLocationMarker, label: t('contact.office'), office: true },
    { icon: HiOutlineClock, label: t('contact.availability'), hours: true },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: easeContact }}
          className="max-w-2xl mb-14 sm:mb-16"
        >
          <div
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[11px] uppercase tracking-[0.18em] text-gold-600 font-semibold mb-3"
          >
            {t('contact.eyebrow')}
          </div>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[32px] sm:text-[42px] font-semibold leading-tight tracking-tight text-navy-900 mb-4"
          >
            {t('contact.title')} <span className="text-gold-600">{t('contact.titleGold')}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600 text-[15px] leading-relaxed">
            {t('contact.intro')}
          </p>
        </Motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: easeContact }}
            className="lg:col-span-3"
          >
            <Motion.form
              onSubmit={handleSubmit}
              variants={formShellVariants}
              initial={skipEntrance ? false : 'hidden'}
              animate={formAnimate}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="h-1 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900 opacity-90" />
              <div className="p-8 sm:p-10">
                <Motion.div variants={rowVariants} className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2"
                    >
                      {t('contact.labelName')}
                    </label>
                    <div className={fieldWrap}>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.placeholderName')}
                        className={inputInner}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2"
                    >
                      {t('contact.labelEmail')}
                    </label>
                    <div className={fieldWrap}>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.placeholderEmail')}
                        className={inputInner}
                      />
                    </div>
                  </div>
                </Motion.div>

                <Motion.div variants={rowVariants} className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2"
                    >
                      {t('contact.labelPhone')}
                    </label>
                    <div className={fieldWrap}>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder={FIRM_PHONE_DISPLAY}
                        className={inputInner}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2"
                    >
                      {t('contact.labelMatter')}
                    </label>
                    <div className={`${fieldWrap} relative`}>
                      <select
                        name="caseType"
                        value={form.caseType}
                        onChange={handleChange}
                        required
                        className={`${inputInner} appearance-none cursor-pointer pr-10`}
                      >
                        <option value="">{t('contact.selectMatter')}</option>
                        {caseTypeLabels.map((label, i) => (
                          <option key={CONTACT_CASE_TYPE_VALUES[i]} value={CONTACT_CASE_TYPE_VALUES[i]}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                        ▾
                      </span>
                    </div>
                  </div>
                </Motion.div>

                <Motion.div variants={rowVariants} className="mb-7">
                  <label
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2"
                  >
                    {t('contact.labelMessage')}
                  </label>
                  <div className={fieldWrap}>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t('contact.placeholderMessage')}
                      className={`${inputInner} resize-none min-h-[120px]`}
                    />
                  </div>
                </Motion.div>

                <Motion.div variants={rowVariants}>
                  {submitError ? (
                    <p
                      role="alert"
                      style={{ fontFamily: 'var(--font-body)' }}
                      className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800 leading-snug"
                    >
                      {submitError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{ fontFamily: 'var(--font-display)' }}
                    className={
                      'w-full rounded-lg py-3.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ' +
                      'bg-navy-900 text-white ring-1 ring-inset ring-gold-500/40 hover:bg-navy-800 hover:ring-gold-500/55 ' +
                      'flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none'
                    }
                  >
                    {sending ? (
                      t('contact.sending')
                    ) : submitted ? (
                      <>
                        <HiOutlineShieldCheck className="text-gold-400 text-lg shrink-0" aria-hidden />
                        {t('contact.submitted')}
                      </>
                    ) : (
                      t('contact.submit')
                    )}
                  </button>

                  <div className="flex flex-col gap-2 mt-4 text-center">
                    <p style={{ fontFamily: 'var(--font-body)' }} className="text-[11px] text-slate-600 leading-snug">
                      {t('contact.submitChannelsNote')}
                    </p>
                    <div className="flex items-start gap-2 justify-center">
                      <HiOutlineShieldCheck className="text-gold-500/70 text-sm shrink-0 mt-0.5" aria-hidden />
                      <p style={{ fontFamily: 'var(--font-body)' }} className="text-[11px] text-slate-500 leading-snug">
                        {t('contact.privacyNote')}
                      </p>
                    </div>
                  </div>
                </Motion.div>
              </div>
            </Motion.form>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14, ease: easeContact }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactDetails.map((item, i) => (
              <Motion.div
                key={item.label}
                initial={skipEntrance ? false : { opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: skipEntrance ? 0 : 0.18 + i * 0.06, ease: easeContact }}
                className={
                  'group flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm ' +
                  'transition-all duration-300 hover:border-gold-500/35 hover:shadow-md'
                }
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200/90 transition-colors duration-300 group-hover:bg-gold-500/[0.06] group-hover:ring-gold-500/30">
                  <item.icon className="text-lg text-gold-600/85 group-hover:text-gold-600" aria-hidden />
                </div>
                <div className="min-w-0 pt-0.5">
                  <div
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5"
                  >
                    {item.office ? (
                      <>
                        {item.label} · <span className="text-gold-600">{OFFICE_CITY}</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </div>
                  {item.office ? (
                    <OfficeAddressContactCard />
                  ) : item.href ? (
                    <a
                      href={item.href}
                      style={{ fontFamily: 'var(--font-display)' }}
                      className="text-[15px] font-semibold text-navy-900 hover:text-gold-700 transition-colors duration-200 break-all"
                    >
                      {item.value}
                    </a>
                  ) : item.hours ? (
                    <div style={{ fontFamily: 'var(--font-body)' }} className="text-[14px] text-slate-600 leading-snug space-y-1">
                      <div>{t('contact.availabilityWeekdays')}</div>
                      <div>{t('contact.availabilitySunday')}</div>
                    </div>
                  ) : (
                    <div style={{ fontFamily: 'var(--font-body)' }} className="text-[14px] text-slate-600 leading-snug">
                      {item.value}
                    </div>
                  )}
                </div>
              </Motion.div>
            ))}

            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-slate-100/90 p-6 sm:p-7 shadow-sm ring-1 ring-slate-200/70">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/45 to-transparent" />
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[10px] uppercase tracking-[0.16em] text-gold-600 font-semibold mb-2"
              >
                {t('contact.directEyebrow')}
              </div>
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-navy-900 font-semibold text-[17px] mb-3 leading-snug"
              >
                {t('contact.directTitle')}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600 text-[13px] leading-relaxed mb-5">
                {t('contact.directBody', { phone: FIRM_PHONE_DISPLAY })}
              </p>
              <div className="flex flex-col gap-2.5">
                <a href={FIRM_PHONE_HREF} className={actionBtnClass}>
                  <HiOutlinePhone className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  {t('contact.callCta', { phone: FIRM_PHONE_DISPLAY })}
                </a>
                <a
                  href={FIRM_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionBtnClass}
                >
                  <FaWhatsapp className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  {t('contact.whatsappCta')}
                </a>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
