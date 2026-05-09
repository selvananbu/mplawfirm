import { useI18n } from '../i18n/useI18n';
import { useFontScale } from '../accessibility/useFontScale';

const LEVELS = [
  { level: 0, letterClass: 'text-[11px] leading-none' },
  { level: 1, letterClass: 'text-sm leading-none' },
  { level: 2, letterClass: 'text-base leading-none' },
];

/**
 * Three-step root font scale (100% / 112.5% / 125%) for readability.
 * Light styling to match the announcement bar.
 */
export default function FontSizeControl({ className = '' }) {
  const { t } = useI18n();
  const { scale, setScale } = useFontScale();

  const hint = (lv) => {
    if (lv === 0) return t('nav.fontSizeHint0');
    if (lv === 1) return t('nav.fontSizeHint1');
    return t('nav.fontSizeHint2');
  };

  return (
    <div
      className={`inline-flex items-center ${className}`}
      role="group"
      aria-label={t('nav.fontSizeGroup')}
    >
      <div className="relative flex rounded-full border border-slate-200/90 bg-white p-0.5 shadow-sm ring-1 ring-slate-200/70">
        {LEVELS.map(({ level, letterClass }) => {
          const active = scale === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => setScale(level)}
              title={hint(level)}
              aria-label={hint(level)}
              aria-pressed={active}
              className={`relative min-w-[2.25rem] px-2 py-1 rounded-full text-center transition-colors duration-200 ${
                active
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900'
              }`}
            >
              <span className={`font-semibold ${letterClass}`} aria-hidden>
                A
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
