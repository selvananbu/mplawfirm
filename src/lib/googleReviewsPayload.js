/**
 * Normalizes Google Places API (New) Place details JSON for the Client Stories UI.
 * @see https://developers.google.com/maps/documentation/places/web-service/place-details
 */

export function initialsFromDisplayName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0];
    const b = parts[parts.length - 1][0];
    return `${a}${b}`.toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export function mapPlacesReviewToStory(rev, idx) {
  const rawText = rev.text;
  const text =
    typeof rawText === 'string'
      ? rawText.trim()
      : (rawText?.text ?? '').trim();
  const authorName = rev.authorAttribution?.displayName?.trim() || 'Google reviewer';
  return {
    id: rev.name || `google-review-${idx}`,
    text,
    rating: Math.min(5, Math.max(1, Math.round(Number(rev.rating) || 5))),
    name: authorName,
    role: 'Google review',
    initials: initialsFromDisplayName(authorName),
    badge: rev.relativePublishTimeDescription || 'Google review',
    authorPhoto: rev.authorAttribution?.photoUri || null,
    authorUri: rev.authorAttribution?.uri || null,
    source: 'google',
  };
}

function localizedText(field) {
  if (field == null) return null;
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && typeof field.text === 'string') return field.text;
  return null;
}

export function buildClientPayload(placesJson) {
  const mapped = (placesJson.reviews || [])
    .map((rev, idx) => mapPlacesReviewToStory(rev, idx))
    .filter((s) => s.text.length > 0);

  return {
    source: 'google',
    placeDisplayName: localizedText(placesJson.displayName),
    rating: typeof placesJson.rating === 'number' ? placesJson.rating : null,
    userRatingCount:
      typeof placesJson.userRatingCount === 'number' ? placesJson.userRatingCount : null,
    googleMapsUri: placesJson.googleMapsUri || null,
    reviews: mapped,
  };
}

/**
 * @param {{ referer?: string }} [options] — Send only if your API key uses HTTP referrer restrictions.
 * Prefer Application restrictions: none + API restriction: Places API (New).
 */
export async function fetchPlaceDetailsFromGoogle(apiKey, placeId, options = {}) {
  const id = placeId.replace(/^places\//, '');
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`;
  const fieldMask = [
    'displayName',
    'googleMapsUri',
    'rating',
    'userRatingCount',
    'reviews',
  ].join(',');

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': fieldMask,
  };
  if (options.referer) {
    headers.Referer = options.referer;
  }

  const res = await fetch(url, {
    headers,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || res.statusText || 'Places request failed';
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return json;
}
