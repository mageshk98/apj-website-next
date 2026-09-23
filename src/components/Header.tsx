'use client';

import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { business } from '../data/site';
import { formatPhone, telLink } from '../lib/links';
import { navLinks } from '../lib/navLinks';
import { LogoMark } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="container-apj flex h-18 items-center justify-between gap-6 py-3">
        <a href="#top" aria-label="Anbu Power Junction home" className="flex items-center gap-3">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.95rem] font-extrabold tracking-tight">ANBU</span>
            <span className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Power Junction
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <a href={telLink(business.primaryPhone)} className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {formatPhone(business.primaryPhone)}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="relative border-t border-border bg-background lg:hidden">
          <div className="container-apj flex flex-col py-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
