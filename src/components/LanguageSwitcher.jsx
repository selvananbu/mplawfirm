import { motion as Motion } from 'framer-motion';
import { useI18n } from '../i18n/useI18n';

const locales = [
  { code: 'en', short: 'EN' },
  { code: 'ta', short: 'தமிழ்' },
];

const toneStyles = {
  dark: {
    track:
      'border-white/12 bg-navy-950/55 ring-1 ring-white/5',
    inactive: 'text-slate-400 hover:text-slate-200',
  },
  light: {
    track:
      'border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-200/70',
    inactive: 'text-slate-500 hover:text-navy-900',
  },
};

export default function LanguageSwitcher({ className = '', tone = 'dark' }) {
  const { locale, setLocale, t } = useI18n();
  const ts = toneStyles[tone] ?? toneStyles.dark;

  return (
    <div
      className={`inline-flex items-center ${className}`}
      role="group"
      aria-label={t('nav.langLabel')}
    >
      <div className={`relative flex rounded-full border p-0.5 ${ts.track}`}>
        {locales.map(({ code, short }) => {
          const active = locale === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              className={`relative z-10 min-w-[2.75rem] px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
                active ? 'text-white' : ts.inactive
              }`}
              aria-pressed={active}
              lang={code === 'ta' ? 'ta' : 'en'}
            >
              {active && (
                <Motion.span
                  layoutId="mplang-pill"
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-gold-500/95 to-gold-600/90 shadow-[0_1px_8px_rgba(200,163,58,0.35)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-[1]">{short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
