import { useMemo, useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineX, HiOutlinePhone } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { FIRM_PHONE_DISPLAY, FIRM_PHONE_HREF, FIRM_WHATSAPP_HREF } from '../constants/contact';
import LanguageSwitcher from './LanguageSwitcher';
import FontSizeControl from './FontSizeControl';
import { useI18n } from '../i18n/useI18n';

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { name: t('nav.about'), href: '#about' },
      { name: t('nav.practice'), href: '#practice' },
      { name: t('nav.whyUs'), href: '#why-us' },
      { name: t('nav.testimonials'), href: '#testimonials' },
      { name: t('nav.contact'), href: '#contact' },
    ],
    [t]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <div
        style={{ fontFamily: 'var(--font-display)' }}
        className="bg-slate-100 border-b border-slate-200/90 text-slate-600 text-xs py-2.5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 min-w-0 flex-1">
            <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <HiOutlinePhone className="text-gold-600 text-sm flex-shrink-0" aria-hidden />
              <span>{t('nav.announcementContact')}</span>
              <a
                href={FIRM_PHONE_HREF}
                className="text-gold-700 font-medium hover:text-gold-600 transition-colors"
              >
                {FIRM_PHONE_DISPLAY}
              </a>
              <span className="text-slate-300" aria-hidden>
                ·
              </span>
              <a
                href={FIRM_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-700 font-medium hover:text-gold-600 transition-colors"
              >
                <FaWhatsapp className="text-sm" aria-hidden />
                {t('fab.whatsapp')}
              </a>
            </span>
            <span className="hidden sm:inline text-slate-300 select-none" aria-hidden>
              |
            </span>
            <a
              href="#contact"
              className="font-medium text-slate-700 hover:text-gold-700 transition-colors whitespace-nowrap"
            >
              {t('nav.freeConsultArrow')}
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <FontSizeControl />
            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>

      <Motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ fontFamily: 'var(--font-display)' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-slate-200/80 border-b border-slate-200'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            <a href="#home" className="flex items-center gap-3">
              <img
                src="/logo-transparent.png"
                alt="M.P. Law firm logo"
                className="h-11 w-11 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12"
              />
              <div>
                <div className="text-navy-900 font-semibold text-[17px] tracking-tight leading-none">M.P. Law firm</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-0.5 font-medium">
                  {t('nav.firmSubtitle')}
                </div>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-navy-900 transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-1.5 left-4 right-4 h-[1.5px] bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
              <a
                href="#contact"
                className="ml-4 px-5 py-2.5 bg-navy-900 text-white text-[12px] font-semibold tracking-wide hover:bg-navy-700 transition-colors duration-200"
              >
                {t('nav.bookConsultation')}
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-navy-900 text-2xl p-2 hover:bg-slate-100 transition-colors"
                aria-label={t('nav.toggleMenu')}
              >
                {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <Motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 text-[14px] font-medium text-slate-700 hover:text-navy-900 hover:bg-slate-50 transition-all"
                  >
                    {link.name}
                  </Motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 py-3 bg-navy-900 text-white text-center text-[13px] font-semibold tracking-wide hover:bg-navy-700 transition-colors"
                >
                  {t('nav.bookFreeConsultation')}
                </a>
                <a
                  href={FIRM_PHONE_HREF}
                  className="py-3 border border-slate-200 text-navy-900 text-center text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  <HiOutlinePhone className="text-gold-500" />
                  {t('nav.callPhone')} {FIRM_PHONE_DISPLAY}
                </a>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.nav>
    </>
  );
}
