import { business } from '../data/site';
import { navLinks } from '../lib/navLinks';
import { LogoMark } from './Logo';

// Short footer — contact details live in the Contact section just above.
export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-apj flex flex-col gap-8 border-t border-navy-foreground/10 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-11 w-11" />
          <div className="leading-tight">
            <p className="font-display text-base font-extrabold">ANBU</p>
            <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-navy-foreground/70">Power Junction</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-navy-foreground/75 hover:text-navy-foreground">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container-apj flex flex-col gap-2 pb-8 text-xs text-navy-foreground/60 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {business.legalName}. Proprietor: {business.proprietor}.
        </p>
        <p>Neelankarai, Chennai – 600 115 · Serving Tamil Nadu</p>
      </div>
    </footer>
  );
}
