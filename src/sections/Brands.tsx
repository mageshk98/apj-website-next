import { brands } from '../data/site';
import { whatsappLink } from '../lib/links';
import { external } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';

export default function Brands() {
  return (
    <section id="brands" className="section-y pt-0 md:pt-0">
      <div className="container-apj">
        <SectionTitle
          eyebrow="Brands We Work With"
          title="Products from established power brands."
          intro="Availability varies by model and location — tap a brand to ask us before ordering."
        />
        <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => (
            <li key={b.slug}>
              <a
                href={whatsappLink({ kind: 'product', product: `${b.name} products` })}
                {...external}
                className="card-surface flex h-full flex-col justify-between gap-3 p-5 transition-colors hover:border-primary/40"
              >
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    loading="lazy"
                    className="brand-logo h-8 w-auto max-w-[70%] object-contain object-left"
                  />
                ) : (
                  <span className="font-display text-base font-bold">{b.name}</span>
                )}
                <span className="text-xs text-muted-foreground">{b.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
