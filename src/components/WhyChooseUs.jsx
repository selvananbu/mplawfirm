import { useMemo } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useInView } from './useInView';
import {
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { OFFICE_CITY } from '../constants/contact';
import { useI18n } from '../i18n/useI18n';

const easeBusiness = [0.22, 1, 0.36, 1];

const REASON_ICONS = [HiOutlineBadgeCheck, HiOutlineClock, HiOutlineShieldCheck, HiOutlineLightBulb];

const leftColumnVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.085, delayChildren: 0.05 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easeBusiness },
  },
};

const statsGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const statTileVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeBusiness },
  },
};

const reasonsListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.14 },
  },
};

const reasonCardVariants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeBusiness },
  },
};

export default function WhyChooseUs() {
  const { t, ta } = useI18n();
  const [ref, inView] = useInView(0.12);
  const prefersReducedMotion = useReducedMotion();

  const reasons = useMemo(() => {
    const rows = ta('why.reasons');
    return rows.map((r, i) => ({
      icon: REASON_ICONS[i] ?? HiOutlineBadgeCheck,
      title: r.title,
      desc: r.desc,
    }));
  }, [ta]);

  const stats = ta('why.stats');

  const motionState = inView ? 'visible' : 'hidden';
  const skipMotion = Boolean(prefersReducedMotion);

  return (
    <section id="why-us" ref={ref} className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <Motion.div
            className="lg:col-span-2"
            variants={skipMotion ? undefined : leftColumnVariants}
            initial={skipMotion ? false : 'hidden'}
            animate={skipMotion ? undefined : motionState}
          >
            <Motion.div
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-4"
              variants={skipMotion ? undefined : fadeUpItem}
            >
              {t('why.eyebrow', { city: OFFICE_CITY })}
            </Motion.div>
            <Motion.h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[36px] sm:text-[42px] font-semibold leading-tight tracking-tight text-navy-900 mb-6"
              variants={skipMotion ? undefined : fadeUpItem}
            >
              {t('why.title1')}
              <br />
              <span className="text-gold-500">{t('why.title2')}</span>
            </Motion.h2>
            <Motion.p
              style={{ fontFamily: 'var(--font-body)' }}
              className="text-slate-500 text-[15px] leading-relaxed mb-12"
              variants={skipMotion ? undefined : fadeUpItem}
            >
              {t('why.intro')}
            </Motion.p>

            <Motion.div
              className="grid grid-cols-2 gap-px bg-slate-200"
              variants={skipMotion ? undefined : statsGridVariants}
            >
              {stats.map((s) => (
                <Motion.div
                  key={s.label}
                  variants={skipMotion ? undefined : statTileVariants}
                  whileHover={
                    skipMotion
                      ? undefined
                      : {
                          y: -2,
                          transition: { duration: 0.22, ease: easeBusiness },
                        }
                  }
                  whileTap={skipMotion ? undefined : { scale: 0.995 }}
                  className="bg-navy-900 px-6 py-7 text-center"
                >
                  <div
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-[28px] font-semibold text-gold-400 leading-none mb-2"
                  >
                    {s.value}
                  </div>
                  <div
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-[9px] uppercase tracking-widest text-slate-400 font-medium"
                  >
                    {s.label}
                  </div>
                </Motion.div>
              ))}
            </Motion.div>

            <Motion.div className="mt-8" variants={skipMotion ? undefined : fadeUpItem}>
              <a
                href="#contact"
                style={{ fontFamily: 'var(--font-display)' }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-900 text-white text-[12px] font-semibold tracking-wide hover:bg-navy-700 transition-colors duration-200 group"
              >
                {t('why.cta', { city: OFFICE_CITY })}
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className="lg:col-span-3 space-y-4"
            variants={skipMotion ? undefined : reasonsListVariants}
            initial={skipMotion ? false : 'hidden'}
            animate={skipMotion ? undefined : motionState}
          >
            {reasons.map((reason) => (
              <Motion.div
                key={reason.title}
                variants={skipMotion ? undefined : reasonCardVariants}
                whileHover={
                  skipMotion
                    ? undefined
                    : {
                        y: -2,
                        transition: { duration: 0.28, ease: easeBusiness },
                      }
                }
                className="group flex gap-5 p-6 border border-slate-100 transition-colors duration-300 hover:border-gold-200/70 hover:bg-slate-50/90 hover:shadow-[0_10px_36px_-18px_rgba(15,23,42,0.08)]"
              >
                <div className="w-12 h-12 bg-navy-900 group-hover:bg-navy-800 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ring-1 ring-gold-500/15 group-hover:ring-gold-500/25">
                  <reason.icon className="text-gold-400 text-xl transition-colors duration-300" />
                </div>
                <div>
                  <h3
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-[16px] font-semibold text-navy-900 mb-2"
                  >
                    {reason.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 text-[14px] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
