import {
  fetchPlaceDetailsFromGoogle,
  buildClientPayload,
} from '../../src/lib/googleReviewsPayload.js';

function resolvePlacesReferer() {
  const explicit = process.env.GOOGLE_PLACES_API_REFERER?.trim();
  if (explicit) return explicit;
  const site =
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.DEPLOY_URL ||
    '';
  if (site) {
    try {
      return new URL(site).origin + '/';
    } catch {
      /* fall through */
    }
  }
  return 'http://localhost:5173/';
}

export const handler = async () => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, configured: false }),
    };
  }

  try {
    const raw = await fetchPlaceDetailsFromGoogle(apiKey, placeId, {
      referer: resolvePlacesReferer(),
    });
    const payload = buildClientPayload(raw);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error';
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message }),
    };
  }
};
