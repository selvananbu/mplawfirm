import { useState, useEffect, useRef, useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlinePhone, HiX } from 'react-icons/hi';
import { FIRM_PHONE_DISPLAY, FIRM_PHONE_HREF, FIRM_WHATSAPP_HREF } from '../constants/contact';
import { useI18n } from '../i18n/useI18n';

const actionStyle =
  'bg-navy-900 text-white ring-1 ring-inset ring-gold-500/40 hover:bg-navy-800 hover:text-white hover:ring-gold-500/55';
const iconStyle = 'h-5 w-5 flex-shrink-0 text-gold-400';

export default function FloatingContactFab() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        key: 'call',
        label: t('fab.callWithPhone', { phone: FIRM_PHONE_DISPLAY }),
        href: FIRM_PHONE_HREF,
        external: false,
        icon: HiOutlinePhone,
      },
      {
        key: 'whatsapp',
        label: t('fab.whatsapp'),
        href: FIRM_WHATSAPP_HREF,
        external: true,
        icon: FaWhatsapp,
      },
    ],
    [t]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed z-[60] flex flex-col items-end gap-3 right-4 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <AnimatePresence>
        {open && (
          <Motion.ul
            id="fab-contact-menu"
            role="menu"
            aria-label={t('nav.srContactMenu')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="mb-1 flex flex-col items-end gap-2.5"
          >
            {actions.map((a, i) => {
              const Icon = a.icon;
              return (
                <Motion.li
                  key={a.key}
                  role="none"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                >
                  <a
                    role="menuitem"
                    href={a.href}
                    {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={() => setOpen(false)}
                    className={`flex min-w-0 items-center gap-2.5 rounded-full py-2.5 pl-4 pr-3 shadow-lg shadow-black/25 transition-colors ${actionStyle}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="max-w-[min(240px,70vw)] truncate text-[13px] font-semibold tracking-wide text-white">
                      {a.label}
                    </span>
                    <Icon className={iconStyle} aria-hidden />
                  </a>
                </Motion.li>
              );
            })}
          </Motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="fab-contact-menu"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-xl shadow-black/30 ring-2 ring-gold-500/35 ring-inset transition-transform hover:bg-navy-800 hover:ring-gold-500/50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <span className="sr-only">{open ? t('nav.srCloseMenu') : t('nav.srContactMenu')}</span>
        {open ? <HiX className="h-6 w-6" aria-hidden /> : <HiOutlinePhone className="h-6 w-6" aria-hidden />}
      </button>
    </div>
  );
}
