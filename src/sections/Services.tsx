import { MessageCircle } from 'lucide-react';
import { services } from '../data/site';
import { whatsappLink } from '../lib/links';
import { external } from '../components/Button';
import { SectionTitle } from '../components/SectionTitle';

export default function Services() {
  return (
    <section id="services" className="section-y">
      <div className="container-apj">
        <SectionTitle
          eyebrow="Services"
          title="Sales, installation, service and repair."
          intro="Buying the product is only half the job. We install it correctly and stay available when it needs attention — even for products bought elsewhere."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <a
              key={s.slug}
              href={whatsappLink({ kind: 'service', service: s.name })}
              {...external}
              className="card-surface group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <h3 className="font-display text-base font-bold">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-primary">{s.area}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-whatsapp">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Enquire on WhatsApp
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
