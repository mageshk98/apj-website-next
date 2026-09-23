'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { currentTheme, saveTheme, type Theme } from '../lib/theme';

/*
  Simple pill switch: sun for light, moon for dark, with a knob that slides to
  the active side. The theme itself lives in the data-theme attribute on <html>
  (see src/lib/theme.ts), which the inline script in the layout sets before the
  first paint.
*/

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

// The server render assumes "light"; React re-renders with the real value right
// after hydration, once the attribute set by the inline script is readable.
const useTheme = (): Theme => useSyncExternalStore(subscribe, currentTheme, () => 'light');

export function ThemeToggle() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    const root = document.documentElement;

    // Fade the colours for the length of the swap only (see globals.css).
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 500);

    root.setAttribute('data-theme', next);
    saveTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggle}
      className="relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-border bg-secondary outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-background shadow-card transition-[translate] duration-300 ease-out ${
          isDark ? 'translate-x-8' : 'translate-x-1'
        }`}
        aria-hidden="true"
      />
      <span className="relative flex w-full items-center justify-between px-2">
        <Sun
          className={`h-4 w-4 transition-colors ${isDark ? 'text-muted-foreground' : 'text-spark'}`}
          aria-hidden="true"
        />
        <Moon
          className={`h-4 w-4 transition-colors ${isDark ? 'text-spark' : 'text-muted-foreground'}`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
