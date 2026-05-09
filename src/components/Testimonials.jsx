import { useMemo, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { HiStar, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useGoogleReviews } from '../hooks/useGoogleReviews';
import { mapFallbackRows } from '../i18n/fallbackStories';
import { OFFICE_CITY } from '../constants/contact';
import { useI18n } from '../i18n/useI18n';

function PoweredByGoogle() {
  const { t } = useI18n();
  return (
    <span className="text-[11px] text-slate-500">
      {t('testimonials.poweredBy')}{' '}
      <a
        href="https://developers.google.com/maps/documentation/places/web-service/policies"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-slate-700 underline-offset-2 hover:underline"
      >
        {t('testimonials.google')}
      </a>
    </span>
  );
}

export default function Testimonials() {
  const { t, ta } = useI18n();
  const [ref, inView] = useInView(0.12);
  const fallbackStories = useMemo(() => mapFallbackRows(ta('testimonials.fallback')), [ta]);
  const { status, stories, meta } = useGoogleReviews(fallbackStories);
  const [current, setCurrent] = useState(0);

  const loading = status === 'loading';
  const len = stories.length;
  const maxIdx = Math.max(0, len - 1);
  const safeIndex = len === 0 ? 0 : Math.min(Math.max(0, current), maxIdx);
  const story = stories[safeIndex];
  const hasMultiple = len > 1;

  const next = () =>
    setCurrent((c) => {
      if (len === 0) return 0;
      const idx = Math.min(Math.max(0, c), len - 1);
      return (idx + 1) % len;
    });
  const prev = () =>
    setCurrent((c) => {
      if (len === 0) return 0;
      const idx = Math.min(Math.max(0, c), len - 1);
      return (idx - 1 + len) % len;
    });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <p
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[11px] uppercase tracking-[0.18em] text-gold-600 font-semibold mb-3"
          >
            {t('testimonials.eyebrow')}
          </p>
          <h2
            id="testimonials-heading"
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[32px] sm:text-[40px] font-semibold leading-tight tracking-tight text-navy-900 mb-4"
          >
            {t('testimonials.heading')}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)' }} className="text-slate-600 text-[15px] leading-relaxed">
            {t('testimonials.intro', { city: OFFICE_CITY })}
          </p>

          {meta.source === 'google' && meta.rating != null && (
            <div
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] text-slate-700 shadow-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(meta.rating) ? 'text-gold-500' : 'text-slate-200'}`}
                  />
                ))}
              </span>
              <span className="font-semibold text-navy-900">{meta.rating.toFixed(1)}</span>
              {meta.userRatingCount != null && (
                <span className="text-slate-500">
                  {t('testimonials.reviewsCount', { count: meta.userRatingCount })}
                </span>
              )}
            </div>
          )}

          {meta.source === 'google' && (
            <p
              style={{ fontFamily: 'var(--font-body)' }}
              className="mt-4 text-[12px] text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              {t('testimonials.googleDisclaimer')}{' '}
              <a
                href={meta.googleMapsUri}
                target="_blank"
                rel="noreferrer"
                className="text-navy-800 underline-offset-2 hover:underline font-medium"
              >
                {t('testimonials.googleMaps')}
              </a>{' '}
              {t('testimonials.googleDisclaimerEnd')}
            </p>
          )}
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900 opacity-90" />

            <div className="p-8 sm:p-10 lg:p-12">
              {loading ? (
                <div className="animate-pulse space-y-6" aria-busy="true" aria-label={t('testimonials.loading')}>
                  <div className="flex justify-between">
                    <div className="h-4 w-28 bg-slate-200 rounded" />
                    <div className="h-6 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="space-y-3 border-l-4 border-slate-100 pl-6">
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-[92%]" />
                    <div className="h-3 bg-slate-200 rounded w-[78%]" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-36 bg-slate-200 rounded" />
                      <div className="h-3 w-48 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              ) : story ? (
                <>
                  <AnimatePresence mode="wait">
                    <Motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                        <div className="flex gap-0.5" aria-label={`${story.rating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <HiStar
                              key={i}
                              className={`w-[18px] h-[18px] ${i < story.rating ? 'text-gold-500' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <span
                          style={{ fontFamily: 'var(--font-display)' }}
                          className="text-[11px] font-semibold uppercase tracking-wider text-navy-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-sm"
                        >
                          {story.badge}
                        </span>
                      </div>

                      <blockquote
                        cite={meta.googleMapsUri || undefined}
                        style={{ fontFamily: 'var(--font-body)' }}
                        className="border-l-4 border-gold-500 pl-6 sm:pl-8 text-[16px] sm:text-[17px] text-slate-700 leading-[1.75] mb-10"
                      >
                        {story.text}
                      </blockquote>

                      <div className="flex items-center gap-4">
                        {story.authorPhoto ? (
                          <img
                            src={story.authorPhoto}
                            alt=""
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover border border-slate-200 bg-slate-100 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div
                            style={{ fontFamily: 'var(--font-display)' }}
                            className="w-12 h-12 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center font-semibold text-sm flex-shrink-0"
                            aria-hidden
                          >
                            {story.initials}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div style={{ fontFamily: 'var(--font-display)' }} className="text-navy-900 font-semibold text-[15px] truncate">
                            {story.name}
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)' }} className="text-slate-500 text-[13px] mt-0.5">
                            {story.role}
                          </div>
                        </div>
                      </div>
                    </Motion.div>
                  </AnimatePresence>

                  {hasMultiple && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-10 pt-8 border-t border-slate-100">
                      <div className="flex gap-2 justify-center sm:justify-start">
                        {stories.map((item, i) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCurrent(i)}
                            className={`h-[3px] rounded-full transition-all duration-300 ${
                              i === safeIndex ? 'bg-gold-500 w-8' : 'bg-slate-200 w-4 hover:bg-slate-300'
                            }`}
                            aria-label={t('testimonials.showStory', { n: i + 1, total: stories.length })}
                            aria-current={i === safeIndex}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2 justify-center sm:justify-end">
                        <button
                          type="button"
                          onClick={prev}
                          className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-600 hover:border-gold-400 hover:text-navy-900 transition-colors flex items-center justify-center"
                          aria-label={t('testimonials.prev')}
                        >
                          <HiOutlineChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          className="w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-600 hover:border-gold-400 hover:text-navy-900 transition-colors flex items-center justify-center"
                          aria-label={t('testimonials.next')}
                        >
                          <HiOutlineChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-500">
              {meta.source === 'google' && (
                <>
                  <PoweredByGoogle />
                  <span className="hidden sm:inline text-slate-300" aria-hidden>
                    |
                  </span>
                </>
              )}
              <a
                href={meta.googleMapsUri}
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-navy-800 font-medium hover:text-gold-600 underline-offset-4 hover:underline"
              >
                {t('testimonials.readGoogle')}
              </a>
            </div>
          </div>

          {!loading && stories.length > 1 && (
            <div className="hidden lg:grid grid-cols-4 gap-3 mt-8">
              {stories.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`text-left rounded-lg border p-4 transition-colors duration-200 ${
                    i === safeIndex
                      ? 'border-gold-400 bg-white shadow-sm ring-1 ring-gold-400/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    style={{ fontFamily: 'var(--font-display)' }}
                    className={`text-[13px] font-semibold mb-1 truncate ${i === safeIndex ? 'text-navy-900' : 'text-slate-600'}`}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)' }} className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                    {item.text}
                  </div>
                </button>
              ))}
            </div>
          )}
        </Motion.div>
      </div>
    </section>
  );
}
