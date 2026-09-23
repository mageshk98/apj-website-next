/*
  Logo files live in `public/`:
    logo-mark.webp — the icon (header, footer, browser tab icon)
    logo-full.webp — icon + wordmark version, kept for print/social use
  Replace those files to change the logo.
*/
export function LogoMark({ className = 'h-10' }: { className?: string }) {
  return (
    <img
      src="/logo-mark.webp"
      alt="Anbu Power Junction"
      width={1312}
      height={1199}
      className={`${className} w-auto shrink-0 object-contain`}
    />
  );
}
