'use client';

import { useLayoutEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';

/*
  Navy background treatment: the hairline grid plus a few points of light that
  sparkle at grid intersections and fade out again. Used by the hero and the
  founder section. Desktop only, and skipped for reduced motion.

  The grid is 56px (see .hairline-grid in index.css), so spark coordinates are
  multiples of 56 and land on intersections. Both sections are always navy, so
  the amber sparks read the same whatever theme the visitor's OS is set to.
*/

export type EnergySpark = { left: number; top: number; size?: number };

export const heroSparks: EnergySpark[] = [
  { left: 224, top: 168 },
  { left: 616, top: 112, size: 8 },
  { left: 392, top: 336 },
  { left: 784, top: 224, size: 4 },
  { left: 336, top: 448, size: 4 },
  { left: 168, top: 392 },
];

export const founderSparks: EnergySpark[] = [
  { left: 168, top: 112, size: 4 },
  { left: 560, top: 224 },
  { left: 336, top: 392, size: 8 },
  { left: 896, top: 168, size: 4 },
  { left: 728, top: 336 },
];

type Props = {
  sparks: EnergySpark[];
  /** Delay before the first spark, so it can follow an entrance animation. */
  startDelay?: number;
  /** The hero passes its own ref so the grid can take part in its timeline. */
  gridRef?: React.Ref<HTMLDivElement>;
};

export function EnergyField({ sparks, startDelay = 600, gridRef }: Props) {
  const sparksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = sparksRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const targets = Array.from(container.children);
    if (!targets.length) return;

    const animation = animate(targets, {
      opacity: [0, 0.9, 0],
      scale: [0.6, 1, 0.6],
      duration: 2200,
      ease: 'inOutSine',
      loop: true,
      loopDelay: 5200,
      delay: stagger(900, { start: startDelay }),
    });

    return () => {
      animation.revert();
      utils.remove(targets);
      targets.forEach((el) => {
        (el as HTMLElement).style.removeProperty('opacity');
        (el as HTMLElement).style.removeProperty('transform');
      });
    };
  }, [startDelay]);

  return (
    <>
      <div ref={gridRef} className="hairline-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div ref={sparksRef} className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {sparks.map((spark) => {
          const size = spark.size ?? 6;
          return (
            <span
              key={`${spark.left}-${spark.top}`}
              style={{
                left: spark.left,
                top: spark.top,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
              }}
              className="absolute rounded-full bg-spark opacity-0 shadow-[0_0_10px_2px_var(--color-spark)]"
            />
          );
        })}
      </div>
    </>
  );
}
