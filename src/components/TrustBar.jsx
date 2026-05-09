import { useI18n } from '../i18n/useI18n';

/**
 * Credibility strip aligned with Indian legal framework & Tamil Nadu practice.
 */
export default function TrustBar() {
  const { ta } = useI18n();
  const items = ta('trust.items');

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 list-none m-0 p-0"
        >
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" aria-hidden />
              <span
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[11px] uppercase tracking-[0.12em] font-medium text-slate-600 text-center sm:text-left max-w-[18rem] sm:max-w-none leading-snug"
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
