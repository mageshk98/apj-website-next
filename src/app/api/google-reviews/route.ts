import { NextResponse } from 'next/server';
import { fetchPlaceReviews, PlacesConfigError } from '../../../lib/places';

/*
  GET /api/google-reviews

  Server-side only: the Google API key stays in the environment and never
  reaches the browser. The response is the normalized shape the testimonial
  section renders — not Google's raw payload.
*/

// Re-fetch from Google at most once an hour.
export const revalidate = 3600;

export async function GET() {
  try {
    const payload = await fetchPlaceReviews();
    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    // Detail is logged server-side; the client only sees a generic failure.
    console.error('[google-reviews]', error);
    return NextResponse.json(
      { error: 'Reviews unavailable' },
      { status: error instanceof PlacesConfigError ? 503 : 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
