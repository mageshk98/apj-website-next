/*
  Light/dark theme helpers. The theme lives in a `data-theme` attribute on <html>;
  globals.css swaps the colour tokens based on it.
*/
export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null; // storage blocked (private mode etc.)
  }
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

// A saved choice wins; otherwise follow the visitor's OS setting.
export function preferredTheme(): Theme {
  return readStoredTheme() ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// Runs synchronously in <head> so the right theme is set before the first paint
// (no white flash for dark-mode visitors). Same logic as preferredTheme() above.
export const themeInitScript = `(function(){var t=null;try{t=localStorage.getItem("${THEME_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){try{t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){t="light"}}document.documentElement.setAttribute("data-theme",t)})()`;
