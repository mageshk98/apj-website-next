/*
  Google Places API (New) — Place Details.

  Runs server-side only: the API key never reaches the browser. Shared by the
  serverless function (api/google-reviews.ts) and the dev middleware in
  vite.config.ts so both behave identically.
*/

const PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places';

// Only the fields the testimonial section actually renders.
const FIELD_MASK = [
  'displayName',
  'rating',
  'userRatingCount',
  'googleMapsUri',
  'reviews.rating',
  'reviews.text',
  'reviews.relativePublishTimeDescription',
  'reviews.publishTime',
  'reviews.googleMapsUri',
  'reviews.authorAttribution',
].join(',');

export type NormalizedReview = {
  id: string;
  authorName: string;
  authorPhoto: string | null;
  authorUri: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  googleMapsUri: string | null;
};

export type ReviewsPayload = {
  businessName: string | null;
  rating: number | null;
  totalReviews: number;
  googleMapsUri: string | null;
  reviews: NormalizedReview[];
};

type PlacesReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlacesResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

export class PlacesConfigError extends Error {}

/** Reads config at call time so the dev server can inject it per request. */
export function readConfig(env: Record<string, string | undefined> = process.env) {
  const apiKey = env.GOOGLE_MAPS_API_KEY;
  const placeId = env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    throw new PlacesConfigError('GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID must be set');
  }
  return { apiKey, placeId };
}

export async function fetchPlaceReviews(env?: Record<string, string | undefined>): Promise<ReviewsPayload> {
  const { apiKey, placeId } = readConfig(env);

  const response = await fetch(`${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=en`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
  });

  if (!response.ok) {
    // Detail stays in the server log; the client only ever sees a generic failure.
    throw new Error(`Places API responded ${response.status}`);
  }

  const data = (await response.json()) as PlacesResponse;

  const reviews: NormalizedReview[] = (data.reviews ?? [])
    .map((review, index) => ({
      id: review.name ?? `review-${index}`,
      authorName: review.authorAttribution?.displayName?.trim() || 'Google user',
      authorPhoto: review.authorAttribution?.photoUri ?? null,
      authorUri: review.authorAttribution?.uri ?? null,
      rating: typeof review.rating === 'number' ? review.rating : 0,
      // Reviews are shown verbatim — never rewritten or summarised.
      text: (review.text?.text ?? review.originalText?.text ?? '').trim(),
      relativeTime: review.relativePublishTimeDescription ?? '',
      googleMapsUri: review.googleMapsUri ?? null,
    }))
    .filter((review) => review.text.length > 0);

  return {
    businessName: data.displayName?.text ?? null,
    rating: typeof data.rating === 'number' ? data.rating : null,
    totalReviews: typeof data.userRatingCount === 'number' ? data.userRatingCount : 0,
    googleMapsUri: data.googleMapsUri ?? null,
    reviews,
  };
}
