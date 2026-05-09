import { useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { useInView } from './useInView';
import { HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineBadgeCheck, HiOutlineClock } from 'react-icons/hi';
import { OFFICE_CITY } from '../constants/contact';
import { LAWYER_NAME } from '../constants/branding';
import { useI18n } from '../i18n/useI18n';

const HIGHLIGHT_ICONS = [HiOutlineBadgeCheck, HiOutlineClock, HiOutlineShieldCheck, HiOutlineUserGroup];

export default function About() {
  const { t, ta } = useI18n();
  const [ref, inView] = useInView(0.15);

  const highlights = useMemo(() => {
    const rows = ta('about.highlights');
    return rows.map((h, i) => ({
      icon: HIGHLIGHT_ICONS[i] ?? HiOutlineBadgeCheck,
      label: h.label,
      desc: h.desc,
    }));
  }, [ta]);

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-navy-900 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-gold-500/20" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-t border-r border-gold-500/20" />

              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[10px] uppercase tracking-[0.2em] text-gold-500 mb-5 font-medium"
              >
                {t('about.cardEyebrow', { city: OFFICE_CITY })}
              </div>
              <div style={{ fontFamily: 'var(--font-display)' }} className="text-3xl font-semibold text-white leading-snug mb-6">
                {t('about.cardTitle1')}
                <br />
                <span className="text-gold-400">{t('about.cardTitle2')}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-400 text-[15px] leading-relaxed mb-8">
                {t('about.cardBody')}
              </p>

              <div className="grid grid-cols-3 gap-px bg-white/5">
                {[
                  { v: '500+', l: t('about.statMatters') },
                  { v: '20+', l: t('about.statYears') },
                  { v: 'TN', l: t('about.statTn') },
                ].map((s) => (
                  <div key={s.l} className="bg-navy-800/60 px-4 py-5 text-center">
                    <div style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-semibold text-gold-400">
                      {s.v}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)' }} className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 shadow-lg p-5 max-w-[13.5rem] sm:w-56">
              <div style={{ fontFamily: 'var(--font-display)' }} className="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                {t('about.badgeEyebrow')}
              </div>
              <div style={{ fontFamily: 'var(--font-display)' }} className="text-[13px] font-semibold text-navy-900 leading-snug">
                {t('about.badgeTitle')}
              </div>
              <p style={{ fontFamily: 'var(--font-body)' }} className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {t('about.badgeBody')}
              </p>
              <div className="mt-3 h-[2px] w-8 bg-gold-500" />
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-4"
            >
              {t('about.eyebrow')}
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[36px] sm:text-[42px] font-semibold leading-tight tracking-tight text-navy-900 mb-6"
            >
              {t('about.title1')}
              <br />
              <span className="text-gold-500">{t('about.title2')}</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 leading-relaxed mb-5 text-[15px]">
              {t('about.p1', { city: OFFICE_CITY })}
            </p>
            <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 leading-relaxed mb-10 text-[15px]">
              {t('about.p2', { lawyer: LAWYER_NAME })}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map((h) => (
                <div key={h.label} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-100 hover:border-gold-300 transition-colors duration-200">
                  <div className="w-9 h-9 bg-navy-900 flex items-center justify-center flex-shrink-0">
                    <h.icon className="text-gold-500 text-base" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)' }} className="text-[12px] font-semibold text-navy-900 mb-0.5">
                      {h.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)' }} className="text-[11px] text-slate-500 leading-relaxed">
                      {h.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              style={{ fontFamily: 'var(--font-display)' }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-900 text-white text-[12px] font-semibold tracking-wide hover:bg-navy-700 transition-colors duration-200 group"
            >
              {t('about.cta', { city: OFFICE_CITY })}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
