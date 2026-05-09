import { useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { useInView } from './useInView';
import {
  HiOutlineShieldCheck,
  HiOutlineScale,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { OFFICE_CITY } from '../constants/contact';
import { useI18n } from '../i18n/useI18n';

const AREA_ICONS = [
  HiOutlineShieldCheck,
  HiOutlineExclamationCircle,
  HiOutlineScale,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineUserGroup,
];

export default function PracticeAreas() {
  const { t, ta } = useI18n();
  const [ref, inView] = useInView(0.08);

  const areas = useMemo(() => {
    const rows = ta('practice.areas');
    return rows.map((area, i) => ({
      ...area,
      icon: AREA_ICONS[i] ?? HiOutlineShieldCheck,
    }));
  }, [ta]);

  return (
    <section id="practice" ref={ref} className="py-24 sm:py-32 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-4"
            >
              {t('practice.eyebrow')}
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[36px] sm:text-[44px] font-semibold leading-tight tracking-tight text-navy-900"
            >
              {t('practice.title')} <span className="text-gold-500">{t('practice.titleGold')}</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 text-[15px] leading-relaxed max-w-md lg:text-right">
            {t('practice.intro', { city: OFFICE_CITY })}
          </p>
        </Motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
          {areas.map((area, i) => (
            <Motion.a
              key={area.num}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white p-8 transition-all duration-300 ease-out block no-underline text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 hover:bg-slate-50/90 hover:shadow-[0_12px_40px_-16px_rgba(15,23,42,0.09)] hover:ring-1 hover:ring-gold-500/15"
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-[11px] font-bold text-slate-300 group-hover:text-slate-400 transition-colors duration-300 tracking-wider"
                >
                  {area.num}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-[9px] uppercase tracking-widest font-medium text-gold-600 group-hover:text-gold-700 transition-colors duration-300"
                >
                  {area.tag}
                </span>
              </div>

              <div className="w-11 h-11 bg-navy-50 group-hover:bg-navy-100/90 flex items-center justify-center mb-5 transition-colors duration-300">
                <area.icon className="text-navy-900 group-hover:text-navy-800 text-xl transition-colors duration-300" />
              </div>

              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[18px] font-semibold text-navy-900 mb-3 transition-colors duration-300"
              >
                {area.title}
              </h3>
              <p
                style={{ fontFamily: 'var(--font-body)' }}
                className="text-slate-500 group-hover:text-slate-600 text-[13px] leading-relaxed transition-colors duration-300"
              >
                {area.desc}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-100 group-hover:border-gold-200/50 transition-colors duration-300">
                <span
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-[11px] font-semibold text-slate-400 group-hover:text-gold-700 uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300"
                >
                  {t('practice.discuss')}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </div>
            </Motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
