/*
  Button styles. Use on <a>, <Link> or <button>:
    <a className={button('whatsapp', 'lg')} href="...">WhatsApp Us</a>
*/
const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold transition-all duration-200 active:translate-y-px whitespace-nowrap';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-card',
  navy: 'bg-navy text-navy-foreground hover:bg-navy/90 shadow-card',
  outline: 'border border-border bg-background text-foreground hover:bg-secondary',
  whatsapp: 'bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 shadow-card',
  onNavy: 'border border-navy-foreground/25 bg-navy-foreground/5 text-navy-foreground hover:bg-navy-foreground/15',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

export function button(
  variant: keyof typeof variants = 'primary',
  size: keyof typeof sizes = 'md',
  extra = '',
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

// Spread onto links that open in a new tab (WhatsApp, Google Maps).
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
