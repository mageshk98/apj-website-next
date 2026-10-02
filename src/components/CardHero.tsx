'use client';

import { useEffect, useRef, useState } from 'react';
import { BatteryFull, Bike, Building2, Car, Sun, Zap, type LucideIcon } from 'lucide-react';

/*
  Photo banner at the top of a card. Must sit inside an element with the
  `group` class, which drives the hover effects.

  - Reveal: when it scrolls into view a navy curtain wipes away while the
    photo settles from a slight zoom and blur. `index` staggers cards.
  - Hover: slow zoom, the brand tint lifts, the bottom shade deepens and a
    light sheen sweeps across once.
  With reduced motion the transitions are off, so the photo just appears.
*/

// Shown in the banner of any card that has no photo yet, keyed by category slug.
const ICONS: Record<string, LucideIcon> = {
  'car-batteries': Car,
  'bike-batteries': Bike,
  'inverter-batteries': Zap,
  'tubular-batteries': BatteryFull,
  'solar-batteries': Sun,
  'commercial-batteries': Building2,
};

type Props = {
  slug: string;
  image?: { src: string; alt: string };
  index?: number;
};

export function CardHero({ slug, image, index = 0 }: Props) {
  const Icon = ICONS[slug] ?? BatteryFull;
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setShown(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Once the reveal has played, drop the stagger so hover reacts instantly.
  useEffect(() => {
    if (!shown) return;
    const id = window.setTimeout(() => setSettled(true), 1600);
    return () => window.clearTimeout(id);
  }, [shown]);

  // Cards in the same row reveal one after another.
  const delay = settled ? undefined : { transitionDelay: `${(index % 3) * 120}ms` };

  return (
    <div ref={ref} className="relative aspect-[16/9] overflow-hidden border-b border-border bg-navy">
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          style={delay}
          className={`h-full w-full object-cover transition-[opacity,scale,filter] ${settled ? 'duration-700' : 'duration-[1100ms]'} ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            shown ? 'scale-100 opacity-100 blur-0 group-hover:scale-[1.08]' : 'scale-[1.18] opacity-0 blur-sm'
          }`}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              'radial-gradient(120% 90% at 85% 10%, color-mix(in oklab, var(--color-spark) 35%, transparent) 0%, transparent 55%), linear-gradient(135deg, var(--color-navy) 0%, color-mix(in oklab, var(--color-primary) 70%, var(--color-navy)) 100%)',
          }}
          aria-hidden="true"
        >
          <Icon
            className="h-16 w-16 text-navy-foreground/90 transition-transform duration-700 ease-out group-hover:scale-110"
            strokeWidth={1.25}
          />
        </div>
      )}

      {/* Brand tint: ties the stock photos together, lifts on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/15 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
      />

      {/* Bottom shade, deeper on hover for a framed, cinematic feel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Sheen: sweeps across on hover, snaps back invisibly on leave. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent motion-reduce:hidden group-hover:translate-x-[400%] group-hover:transition-transform group-hover:duration-[1100ms] group-hover:ease-out"
      />

      {/* Reveal curtain: wipes off to the right when the card enters view. */}
      <div
        aria-hidden="true"
        style={delay}
        className={`pointer-events-none absolute inset-0 origin-right bg-navy transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:hidden ${
          shown ? 'scale-x-0' : 'scale-x-100'
        }`}
      />
    </div>
  );
}
