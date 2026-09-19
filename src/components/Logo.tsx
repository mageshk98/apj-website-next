export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 48 48" role="img" aria-label="Anbu Power Junction APJ mark">
      <rect width="48" height="48" rx="12" fill="var(--color-navy)" />
      <path d="M26.5 9 13 27h8.2l-2.7 12L35 20.5h-8.6L29 9h-2.5Z" fill="var(--color-spark)" />
      <rect x="8" y="38" width="32" height="3" rx="1.5" fill="var(--color-primary)" />
    </svg>
  );
}
