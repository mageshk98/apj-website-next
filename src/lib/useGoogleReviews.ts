'use client';

import { useEffect, useState } from 'react';

/*
  Reads the reviews served by /api/google-reviews (which talks to the Google
  Places API server-side). Fetched once per page load and shared between
  mounts, so React StrictMode's double-run does not hit the endpoint twice.
*/

export type Review = {
  id: string;
  authorName: string;
  authorPhoto: string | null;
  authorUri: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  googleMapsUri: string | null;
};

export type ReviewsData = {
  businessName: string | null;
  rating: number | null;
  totalReviews: number;
  googleMapsUri: string | null;
  reviews: Review[];
};

export type ReviewsState =
  { status: 'loading'; data: null } | { status: 'ready'; data: ReviewsData } | { status: 'error'; data: null };

let cached: Promise<ReviewsData> | null = null;

function loadReviews(): Promise<ReviewsData> {
  cached ??= fetch('/api/google-reviews')
    .then((res) => {
      if (!res.ok) throw new Error(`reviews ${res.status}`);
      return res.json() as Promise<ReviewsData>;
    })
    .catch((error: unknown) => {
      cached = null; // allow a retry on the next page view
      throw error;
    });
  return cached;
}

export function useGoogleReviews(): ReviewsState {
  const [state, setState] = useState<ReviewsState>({ status: 'loading', data: null });

  useEffect(() => {
    let active = true;
    loadReviews()
      .then((data) => active && setState({ status: 'ready', data }))
      .catch(() => active && setState({ status: 'error', data: null }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}
