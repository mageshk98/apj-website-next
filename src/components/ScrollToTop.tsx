'use client';

import { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { animate, utils } from 'animejs';
import { prefersReducedMotion } from '../lib/motion';

/*
  Round "back to top" button. It appears once the visitor is past the first
  screen and sits above the floating WhatsApp button, never over it.
*/

const SHOW_AFTER = 500; // px

export function ScrollToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const reduce = prefersReducedMotion();
    let shown = false;
    let ticking = false;

    utils.set(el, { opacity: 0, scale: 0.9 });

    const apply = (next: boolean) => {
      if (next === shown) return;
      shown = next;
      el.style.pointerEvents = next ? 'auto' : 'none';
      if (reduce) {
        utils.set(el, { opacity: next ? 1 : 0, scale: 1 });
        return;
      }
      animate(el, {
        opacity: next ? 1 : 0,
        scale: next ? 1 : 0.9,
        duration: 220,
        ease: 'out(2)',
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        apply(window.scrollY > SHOW_AFTER);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      utils.remove(el);
      el.style.removeProperty('opacity');
      el.style.removeProperty('transform');
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      style={{ pointerEvents: 'none' }}
      className="group fixed bottom-40 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-card outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring lg:bottom-28 lg:right-6"
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
