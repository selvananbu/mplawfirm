import {
  OFFICE_CITY,
  OFFICE_LINE_1,
  OFFICE_LINE_2,
  OFFICE_MAPS_URL,
  OFFICE_PIN,
} from '../constants/contact';
import { useI18n } from '../i18n/useI18n';

/** Highlight Coimbatore + link to Maps */
export function OfficeAddressFooter() {
  const { t } = useI18n();

  return (
    <div className="text-[13px] leading-relaxed">
      <div style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600">
        <a
          href={OFFICE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block text-slate-600 hover:text-gold-800 transition-colors"
        >
          <span className="block">{OFFICE_LINE_1}</span>
          <span className="block">{OFFICE_LINE_2}</span>
          <span className="mt-1.5 inline-flex flex-wrap items-center gap-x-1">
            <span className="rounded-sm bg-gold-500/12 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/25">
              {OFFICE_CITY}
            </span>
            <span className="text-slate-500 group-hover:text-gold-800/90">, {OFFICE_PIN}</span>
          </span>
          <span className="mt-2 block text-[11px] font-medium text-gold-700 underline-offset-2 group-hover:underline">
            {t('maps.openInGoogleMaps')}
          </span>
        </a>
      </div>
    </div>
  );
}

export function OfficeAddressContactCard() {
  const { t } = useI18n();

  return (
    <div style={{ fontFamily: 'var(--font-display)' }} className="text-[14px] leading-relaxed text-navy-900">
      <span className="font-semibold block">{OFFICE_LINE_1}</span>
      <span className="font-semibold block">{OFFICE_LINE_2}</span>
      <span className="mt-2 flex flex-wrap items-center gap-x-1.5">
        <span className="rounded-md bg-navy-900/5 px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/25">
          {OFFICE_CITY}
        </span>
        <span className="text-slate-600">, {OFFICE_PIN}</span>
      </span>
      <a
        href={OFFICE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: 'var(--font-body)' }}
        className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-navy-800 hover:text-gold-700 transition-colors duration-200"
      >
        {t('maps.openInGoogleMaps')}
        <span aria-hidden className="text-gold-600">
          →
        </span>
      </a>
    </div>
  );
}
