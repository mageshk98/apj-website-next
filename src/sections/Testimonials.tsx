'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { animate, stagger, utils } from 'animejs';
import { business } from '../data/site';
import { prefersReducedMotion } from '../lib/motion';
import { useGoogleReviews, type Review } from '../lib/useGoogleReviews';
import { button, external } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';

/*
  Customer reviews, pulled live from the business's Google Business Profile
  through /api/google-reviews. Nothing here is hard-coded: if the API is
  unavailable the section says so rather than inventing testimonials.

  Google attribution is kept on every card (author name, photo and a link to
  the review on Google Maps), as the Places API terms require.
*/

const CARDS_PER_PAGE = { mobile: 1, tablet: 2, desktop: 3 };

function useCardsPerPage() {
  const [perPage, setPerPage] = useState(CARDS_PER_PAGE.desktop);

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 640px)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () =>
      setPerPage(
        desktop.matches ? CARDS_PER_PAGE.desktop : tablet.matches ? CARDS_PER_PAGE.tablet : CARDS_PER_PAGE.mobile,
      );

    update();
    tablet.addEventListener('change', update);
    desktop.addEventListener('change', update);
    return () => {
      tablet.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
    };
  }, []);

  return perPage;
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= rounded ? 'fill-spark text-spark' : 'text-muted-foreground/40'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function Avatar({ review }: { review: Review }) {
  const initials = review.authorName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  if (review.authorPhoto) {
    return (
      <img
        src={review.authorPhoto}
        alt={`${review.authorName}'s Google profile photo`}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-9 w-9 shrink-0 rounded-full border border-border object-cover"
      />
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-display text-xs font-bold text-muted-foreground">
      {initials || '★'}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="card-surface flex h-full flex-col p-6">
      <Stars rating={review.rating} />
      {/* Review text is shown verbatim; long ones are clamped visually only. */}
      <p className="mt-4 line-clamp-6 flex-1 text-sm leading-relaxed text-muted-foreground">{review.text}</p>

      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Avatar review={review} />
        <div className="min-w-0 flex-1">
          {review.authorUri ? (
            <a
              href={review.authorUri}
              {...external}
              className="block truncate font-display text-sm font-bold hover:text-primary"
            >
              {review.authorName}
            </a>
          ) : (
            <p className="truncate font-display text-sm font-bold">{review.authorName}</p>
          )}
          <p className="truncate text-xs text-muted-foreground">
            Google review{review.relativeTime ? ` · ${review.relativeTime}` : ''}
          </p>
        </div>
      </div>

      {review.googleMapsUri && (
        <a
          href={review.googleMapsUri}
          {...external}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          View on Google Maps
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="card-surface flex h-full animate-pulse flex-col p-6" aria-hidden="true">
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-11/12 rounded bg-muted" />
        <div className="h-3 w-9/12 rounded bg-muted" />
      </div>
      <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
        <div className="h-9 w-9 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-muted" />
          <div className="h-2 w-20 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { status, data } = useGoogleReviews();
  const perPage = useCardsPerPage();
  const [rawPage, setPage] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const reviews = data?.reviews ?? [];
  const pageCount = Math.max(1, Math.ceil(reviews.length / perPage));
  const mapsUrl = data?.googleMapsUri ?? business.mapsUrl;

  // Derived rather than stored, so a breakpoint change can never leave the
  // carousel parked on a page that no longer exists.
  const page = Math.min(rawPage, pageCount - 1);

  // Entrance: runs once, when the section first scrolls into view.
  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    if (!section || !intro || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const targets = [intro, ...Array.from(trackRef.current?.children ?? [])] as HTMLElement[];
        utils.set(targets, { opacity: 0 });
        animate(targets, {
          opacity: [0, 1],
          y: [20, 0],
          scale: [0.98, 1],
          duration: 650,
          ease: 'out(3)',
          delay: stagger(90),
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [status]);

  const goTo = (next: number) => setPage(((next % pageCount) + pageCount) % pageCount);

  // Lightweight horizontal swipe for touch devices.
  const swipeStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    swipeStart.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = swipeStart.current;
    const end = e.changedTouches[0]?.clientX;
    swipeStart.current = null;
    if (start == null || end == null) return;
    const distance = start - end;
    if (Math.abs(distance) < 50) return; // ignore taps and tiny drags
    goTo(distance > 0 ? page + 1 : page - 1);
  };

  const summary = useMemo(() => {
    if (!data?.rating || !data.totalReviews) return null;
    return { rating: data.rating, count: data.totalReviews };
  }, [data]);

  return (
    <section id="reviews" ref={sectionRef} className="section-y bg-surface">
      <div className="container-apj">
        <header ref={introRef} className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Customer Reviews"
            title="What Our Customers Say"
            intro="Trusted by customers across Tamil Nadu for dependable power solutions, installation and service. Every review below comes from our Google Business Profile."
          />

          {summary && (
            <a
              href={mapsUrl}
              {...external}
              className="card-surface flex items-center gap-4 p-4 transition-colors hover:border-primary/40"
            >
              <span className="font-display text-3xl font-extrabold leading-none">{summary.rating}</span>
              <span>
                <Stars rating={summary.rating} />
                <span className="mt-1 block text-xs text-muted-foreground">
                  Based on {summary.count} Google {summary.count === 1 ? 'review' : 'reviews'}
                </span>
              </span>
            </a>
          )}
        </header>

        {status === 'loading' && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="card-surface mt-10 flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">Customer reviews are temporarily unavailable.</p>
            <a href={mapsUrl} {...external} className={button('outline', 'sm')}>
              View our reviews on Google Maps
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        )}

        {status === 'ready' && reviews.length === 0 && (
          <div className="card-surface mt-10 flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">Customer reviews will appear here once available.</p>
            <a href={mapsUrl} {...external} className={button('outline', 'sm')}>
              View our reviews on Google Maps
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        )}

        {status === 'ready' && reviews.length > 0 && (
          <>
            {/* Carousel: one page at a time, 1/2/3 cards by breakpoint. */}
            <div className="mt-10 overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="shrink-0 grow-0 px-2 first:pl-0 last:pr-0"
                    style={{ flexBasis: `${100 / perPage}%` }}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>

            {pageCount > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goTo(page - 1)}
                  aria-label="Previous reviews"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to review page ${i + 1}`}
                      aria-current={i === page}
                      className={`h-1.5 rounded-full transition-all ${
                        i === page ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo(page + 1)}
                  aria-label="Next reviews"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={mapsUrl} {...external} className={button('outline')}>
                View all reviews on Google Maps
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Reviews and ratings are provided by Google. Content belongs to its authors.
        </p>
      </div>
    </section>
  );
}
