import { PackageSearch } from 'lucide-react';
import { business, categories } from '../data/site';
import { telLink, whatsappLink } from '../lib/links';
import { button, external } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';

export default function Batteries() {
  return (
    <section id="batteries" className="section-y">
      <div className="container-apj">
        <SectionTitle
          eyebrow="Batteries"
          title="Batteries for every kind of load."
          intro="Car, bike, inverter, tubular, solar and commercial batteries from multiple brands, with delivery and installation support across Tamil Nadu."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.slug} className="card-surface flex flex-col p-6">
              <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-primary">{c.shortName}</span>
              <h3 className="heading-md mt-2">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.useCases.map((u) => (
                  <li key={u} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {u}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink({ kind: 'product', product: c.name })}
                {...external}
                className={button('outline', 'sm', 'mt-5 self-start')}
              >
                Ask about {c.shortName.toLowerCase()} batteries
              </a>
            </article>
          ))}
        </div>

        {/* Why there are no prices listed */}
        <div className="mt-6 flex flex-col items-start gap-4 rounded-xl border border-dashed border-border p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <PackageSearch className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              <span className="font-display font-bold text-foreground">Prices confirmed before you buy. </span>
              Models, prices and stock change often, so we send you the current price, warranty and availability directly.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={whatsappLink()} {...external} className={button('whatsapp')}>
              Get a quote
            </a>
            <a href={telLink(business.primaryPhone)} className={button('outline')}>
              Call now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
