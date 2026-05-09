import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { FIRM_EMAIL, FIRM_MAILTO_HREF, FIRM_PHONE_DISPLAY, FIRM_PHONE_HREF, FIRM_WHATSAPP_HREF } from '../constants/contact';
import { OfficeAddressFooter } from './OfficeAddress';
import { useI18n } from '../i18n/useI18n';

export default function Footer() {
  const { t, ta } = useI18n();
  const practiceLinks = ta('footer.practiceLinks');
  const quickLinks = ta('footer.quickLinks');
  const legalLinks = ta('footer.legal');

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/90 to-slate-100/80 shadow-sm px-6 py-7 sm:px-8 sm:py-8 mb-14 ring-1 ring-slate-200/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-navy-900 font-semibold text-[21px] sm:text-[22px] leading-snug mb-1.5"
              >
                {t('footer.ctaTitle')}
              </div>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600 text-[13px] leading-relaxed">
                {t('footer.ctaSubtitle')}
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
              <a
                href={FIRM_PHONE_HREF}
                style={{ fontFamily: 'var(--font-display)' }}
                className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300/90 bg-white text-navy-900 text-[12px] font-medium shadow-sm hover:border-gold-500/45 hover:text-gold-800 transition-all"
              >
                <HiOutlinePhone className="text-gold-600 shrink-0" />
                {FIRM_PHONE_DISPLAY}
              </a>
              <a
                href="#contact"
                style={{ fontFamily: 'var(--font-display)' }}
                className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 px-5 py-3 rounded-lg bg-navy-900 text-white text-[12px] font-semibold tracking-wide ring-1 ring-inset ring-gold-500/35 hover:bg-navy-800 transition-colors shadow-sm"
              >
                {t('footer.bookConsultation')}
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-gold-500/20 p-[2px] shadow-sm">
                <img src="/logo-transparent.png" alt="M.P. Law firm logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)' }} className="text-navy-900 font-semibold text-[16px] tracking-tight">
                  M.P. Law firm
                </div>
                <div style={{ fontFamily: 'var(--font-display)' }} className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
                  {t('nav.firmSubtitle')}
                </div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600 text-[13px] leading-relaxed mb-6">
              {t('footer.brandBody')}
            </p>
            <div className="space-y-4">
              {[
                { Icon: HiOutlinePhone, label: FIRM_PHONE_DISPLAY, href: FIRM_PHONE_HREF },
                { Icon: HiOutlineMail, label: FIRM_EMAIL, href: FIRM_MAILTO_HREF },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} style={{ fontFamily: 'var(--font-body)' }} className="flex items-center gap-2.5 text-slate-600 hover:text-gold-700 transition-colors text-[13px]">
                  <Icon className="text-gold-600 text-base flex-shrink-0" /> {label}
                </a>
              ))}
              <div className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="text-gold-600 text-base flex-shrink-0 mt-0.5" aria-hidden />
                <OfficeAddressFooter />
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-6">
              {t('footer.practiceHeading')}
            </h4>
            <ul className="space-y-3">
              {practiceLinks.map((area) => (
                <li key={area}>
                  <a
                    href="#practice"
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-slate-600 hover:text-gold-700 transition-colors text-[13px] flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-gold-500 transition-colors flex-shrink-0" />
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-6">
              {t('footer.quickHeading')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{ fontFamily: 'var(--font-body)' }}
                    className="text-slate-600 hover:text-gold-700 transition-colors text-[13px] flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-gold-500 transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)' }} className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-6">
              {t('footer.consultHeading')}
            </h4>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600 text-[13px] mb-5 leading-relaxed">
              {t('footer.consultBody')}
            </p>
            <a
              href="#contact"
              style={{ fontFamily: 'var(--font-display)' }}
              className="block w-full text-center py-3 rounded-lg bg-navy-900 text-white text-[11px] font-bold tracking-widest uppercase ring-1 ring-inset ring-gold-500/35 hover:bg-navy-800 transition-colors shadow-sm"
            >
              {t('footer.bookNow')}
            </a>
            <div className="mt-5 pt-5 border-t border-slate-200">
              <div style={{ fontFamily: 'var(--font-display)' }} className="text-[10px] uppercase tracking-widest text-gold-600 mb-2 font-semibold">
                {t('footer.feelFree')}
              </div>
              <a
                href={FIRM_PHONE_HREF}
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-navy-900 font-semibold text-[18px] hover:text-gold-700 transition-colors"
              >
                {FIRM_PHONE_DISPLAY}
              </a>
              <a
                href={FIRM_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-body)' }}
                className="flex items-center gap-1.5 text-slate-600 text-[12px] mt-2 hover:text-gold-700 transition-colors"
              >
                <FaWhatsapp className="text-gold-600 text-sm flex-shrink-0" aria-hidden />
                {t('footer.whatsappLine')}
              </a>
              <div style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 text-[11px] mt-1">
                {t('footer.respondNote')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 text-[12px]">
            {t('footer.copyright', { year: String(new Date().getFullYear()) })}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-slate-500 hover:text-gold-700 transition-colors text-[12px]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
