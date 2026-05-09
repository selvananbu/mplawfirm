import { useEffect, useLayoutEffect, useState } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useI18n } from '../i18n/useI18n';

const easeOut = [0.22, 1, 0.36, 1];

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Branded splash: coordinates with webfonts + a short beat, then cinematic exit (respects reduced motion).
 */
export default function PageLoader({ onExitComplete }) {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      onExitComplete?.();
    }
  }, [prefersReducedMotion, onExitComplete]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let cancelled = false;

    (async () => {
      const fonts = (document.fonts?.ready ?? Promise.resolve()).catch(() => {});
      await Promise.race([
        Promise.all([fonts, delay(920)]),
        delay(3200),
      ]);
      if (!cancelled) setVisible(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion, onExitComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => onExitComplete?.()}>
      {visible && (
        <Motion.div
          key="page-loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label={t('loader.status')}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(12px)',
          }}
          transition={{
            duration: 0.62,
            ease: easeOut,
          }}
          className="page-loader-root fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-950"
        >
          <div className="page-loader-aurora pointer-events-none absolute inset-0 opacity-95" aria-hidden />
          <div className="page-loader-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

          <Motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.06, ease: easeOut }}
            className="relative z-[1] flex flex-col items-center px-6"
          >
            <div className="relative mb-8">
              <div className="page-loader-ring pointer-events-none absolute inset-[-10px] rounded-[1.35rem] opacity-70" aria-hidden />
              <img
                src="/logo-transparent.png"
                alt=""
                width={112}
                height={112}
                fetchPriority="high"
                className="relative h-24 w-24 rounded-2xl object-contain sm:h-28 sm:w-28 drop-shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                decoding="async"
              />
            </div>

            <p
              style={{ fontFamily: 'var(--font-display)' }}
              className="mb-2 text-center text-[15px] font-semibold tracking-tight text-white sm:text-[17px]"
            >
              M.P. Law firm
            </p>
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="mb-10 max-w-[300px] text-center text-[11px] uppercase tracking-[0.26em] text-gold-400/95 sm:text-xs"
            >
              {t('loader.tagline')}
            </p>

            <div className="relative h-[3px] w-[min(280px,72vw)] overflow-hidden rounded-full bg-white/[0.12]">
              <div className="page-loader-shimmer absolute inset-y-0 -left-full w-2/3 rounded-full bg-gradient-to-r from-transparent via-gold-400/95 to-transparent" />
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
