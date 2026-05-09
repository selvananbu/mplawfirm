import { useEffect, useState } from 'react';
import { OFFICE_MAPS_URL } from '../constants/contact';

/**
 * Loads reviews from same-origin `/api/google-reviews` (Vite dev middleware or Netlify function).
 * Falls back to curated stories if the endpoint is missing, errors, or returns no text reviews.
 */
export function useGoogleReviews(fallbackStories) {
  const [state, setState] = useState(() => ({
    status: 'loading',
    stories: fallbackStories,
    meta: {
      source: 'fallback',
      placeDisplayName: null,
      rating: null,
      userRatingCount: null,
      googleMapsUri: OFFICE_MAPS_URL,
      error: null,
    },
  }));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/google-reviews', {
          headers: { Accept: 'application/json' },
        });

        if (res.status === 503) {
          if (!cancelled) {
            setState({
              status: 'ready',
              stories: fallbackStories,
              meta: {
                source: 'fallback',
                placeDisplayName: null,
                rating: null,
                userRatingCount: null,
                googleMapsUri: OFFICE_MAPS_URL,
                error: null,
              },
            });
          }
          return;
        }

        if (!res.ok) {
          throw new Error(`Reviews unavailable (${res.status})`);
        }

        const data = await res.json();
        const list = Array.isArray(data.reviews) ? data.reviews : [];
        const useGoogle = data.source === 'google' && list.length > 0;

        if (!cancelled) {
          setState({
            status: 'ready',
            stories: useGoogle ? list : fallbackStories,
            meta: {
              source: useGoogle ? 'google' : 'fallback',
              placeDisplayName: data.placeDisplayName ?? null,
              rating: typeof data.rating === 'number' ? data.rating : null,
              userRatingCount:
                typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
              googleMapsUri: data.googleMapsUri || OFFICE_MAPS_URL,
              error: null,
            },
          });
        }
      } catch (e) {
        if (!cancelled) {
          setState({
            status: 'ready',
            stories: fallbackStories,
            meta: {
              source: 'fallback',
              placeDisplayName: null,
              rating: null,
              userRatingCount: null,
              googleMapsUri: OFFICE_MAPS_URL,
              error: e instanceof Error ? e.message : 'Could not load reviews',
            },
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [fallbackStories]);

  return state;
}
