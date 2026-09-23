'use client';

import { useLayoutEffect, useRef } from 'react';
import { animate, createTimeline, onScroll, stagger, utils } from 'animejs';

/*
  Hero "power system coming online" animation.

  Structure:
    1. entrance timeline  — badge, heading, description, buttons, stats, image
    2. ambient loops      — image float, glow pulse, badge dot
    3. scroll interaction — subtle parallax on the image and the grid

  Everything is driven by refs, cleaned up on unmount (so React StrictMode's
  double-run is safe) and skipped when the visitor prefers reduced motion.
*/

export type HeroRefs = {
  root: React.RefObject<HTMLElement | null>;
  grid: React.RefObject<HTMLElement | null>;
  badge: React.RefObject<HTMLElement | null>;
  badgeDot: React.RefObject<HTMLElement | null>;
  headingLines: React.RefObject<HTMLElement | null>;
  description: React.RefObject<HTMLElement | null>;
  actions: React.RefObject<HTMLElement | null>;
  stats: React.RefObject<HTMLElement | null>;
  imageWrap: React.RefObject<HTMLElement | null>;
  imageParallax: React.RefObject<HTMLElement | null>;
  image: React.RefObject<HTMLElement | null>;
  glow: React.RefObject<HTMLElement | null>;
};

// Anything with revert() — timelines, animations and scroll observers.
type Revertible = { revert: () => unknown };

const children = (el: Element | null) => (el ? Array.from(el.children) : []);

export function useHeroAnimation(refs: HeroRefs) {
  // Kept in a ref so re-renders never rebuild the timeline.
  const instances = useRef<Revertible[]>([]);

  useLayoutEffect(() => {
    const {
      root,
      grid,
      badge,
      badgeDot,
      headingLines,
      description,
      actions,
      stats,
      imageWrap,
      imageParallax,
      image,
      glow,
    } = refs;
    const rootEl = root.current;
    const gridEl = grid.current;
    const imageWrapEl = imageWrap.current;
    if (!rootEl || !gridEl || !imageWrapEl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const badgeEl = badge.current ?? rootEl;
    const descriptionEl = description.current ?? rootEl;
    const headings = children(headingLines.current);
    const buttons = children(actions.current);
    const statItems = children(stats.current);

    // Content is visible by default; reduced motion (and no-JS) leaves it alone.
    if (reduceMotion) return;

    const created: Revertible[] = [];
    const shift = isMobile ? 0.6 : 1; // shorter travel on small screens

    /* ---------- 1. entrance ---------- */

    const hidden = [badge.current, ...headings, description.current, ...buttons, ...statItems, imageWrapEl].filter(
      Boolean,
    ) as HTMLElement[];

    utils.set(hidden, { opacity: 0 });
    utils.set(gridEl, { opacity: 0.15 });

    const timeline = createTimeline({
      defaults: { ease: 'out(3)', duration: 700 },
    });

    timeline
      .add(gridEl, { opacity: [0.15, 0.6], duration: 900, ease: 'out(2)' }, 0)
      .add(badgeEl, { opacity: [0, 1], y: [18 * shift, 0] }, 150)
      .add(headings, { opacity: [0, 1], y: [25 * shift, 0] }, stagger(150, { start: 300 }))
      .add(descriptionEl, { opacity: [0, 1], y: [20 * shift, 0] }, 650)
      .add(imageWrapEl, { opacity: [0, 1], x: [50 * shift, 0], scale: [0.97, 1], duration: 900 }, 700)
      .add(buttons, { opacity: [0, 1], y: [15 * shift, 0], duration: 600 }, stagger(90, { start: 850 }))
      .add(statItems, { opacity: [0, 1], y: [15 * shift, 0], duration: 600 }, stagger(90, { start: 1000 }));

    created.push(timeline);

    /* ---------- 2. ambient loops ---------- */

    // Indicator dot in the "Battery · Inverter · Solar" badge.
    if (badgeDot.current) {
      created.push(
        animate(badgeDot.current, {
          opacity: [0.4, 1],
          duration: 1800,
          ease: 'inOutSine',
          alternate: true,
          loop: true,
          delay: 900,
        }),
      );
    }

    // The product image breathes very slightly once it has settled.
    if (image.current) {
      created.push(
        animate(image.current, {
          y: [0, -5, 0],
          duration: 4500,
          ease: 'inOutSine',
          loop: true,
          delay: 1600,
        }),
      );
    }

    // Energy glow behind the product image.
    if (glow.current) {
      created.push(
        animate(glow.current, {
          opacity: [0.1, 0.22],
          duration: 3500,
          ease: 'inOutSine',
          alternate: true,
          loop: true,
          delay: 1400,
        }),
      );
    }

    /* ---------- 3. scroll interaction ---------- */

    if (!isMobile) {
      // Tracks from "hero reaches the top of the viewport" until it has scrolled past.
      // `sync` smooths the follow so the movement never feels jumpy.
      const scrollRange = {
        target: rootEl,
        enter: 'top top',
        leave: 'top bottom',
        sync: 0.4,
      } as const;

      created.push(
        animate(imageParallax.current ?? imageWrapEl, {
          y: [0, 18],
          ease: 'linear',
          autoplay: onScroll({ ...scrollRange }),
        }),
        animate(gridEl, { y: [0, 8], ease: 'linear', autoplay: onScroll({ ...scrollRange }) }),
      );
    }

    instances.current = created;

    return () => {
      instances.current.forEach((instance) => instance.revert());
      instances.current = [];

      // Hand every element back to CSS. revert() restores the value captured when the
      // animation was built — which is the hidden state — so clear the styles outright.
      const touched = [...hidden, gridEl, imageParallax.current, image.current, glow.current].filter(
        Boolean,
      ) as HTMLElement[];
      utils.remove(touched);
      touched.forEach(({ style }) => {
        style.removeProperty('opacity');
        style.removeProperty('transform');
        style.removeProperty('translate');
        style.removeProperty('scale');
      });
    };
    // refs are stable for the lifetime of the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
