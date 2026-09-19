// Section heading block: small blue label + big title + optional intro.
export function SectionTitle(props: { eyebrow: string; title: string; intro?: string; className?: string }) {
  return (
    <div className={props.className ?? 'max-w-xl'}>
      <p className="eyebrow">{props.eyebrow}</p>
      <h2 className="heading-lg mt-2">{props.title}</h2>
      {props.intro && <p className="mt-3 text-muted-foreground">{props.intro}</p>}
    </div>
  );
}
