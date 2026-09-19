import { MessageCircle, PhoneCall, ShoppingBag } from 'lucide-react';
import { business } from '../data/site';
import { whatsappLink } from '../lib/links';
import { button, external } from '../components/Button';

export default function Hero() {
  const stats = [
    { k: 'Since', v: String(business.establishedYear) },
    { k: 'Experience', v: `${business.experienceYears} yrs` },
    { k: 'Service area', v: 'Tamil Nadu' },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="hairline-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-apj relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-spark" aria-hidden="true" />
            Battery · Inverter · Solar
          </p>
          <h1 className="heading-xl mt-5">Power Solutions You Can Trust.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/80 md:text-lg">
            {business.experienceYears} years of field experience in batteries, inverters and solar solutions — with
            dependable sales, installation, service and support. Based in Neelankarai, Chennai, serving customers across
            Tamil Nadu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#batteries" className={button('primary', 'lg')}>
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Shop Batteries
            </a>
            <a href="#finder" className={button('onNavy', 'lg')}>
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Get Expert Help
            </a>
            <a href={whatsappLink()} {...external} className={button('whatsapp', 'lg')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-navy-foreground/15 pt-6">
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-navy-foreground/55">{s.k}</dt>
                <dd className="font-display text-lg font-bold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <img
          src="/hero-power.jpg"
          alt="Car battery, wall-mounted home inverter and solar panel arranged together"
          width={1600}
          height={1200}
          className="w-full rounded-2xl border border-navy-foreground/10 object-cover shadow-lift"
        />
      </div>
    </section>
  );
}
