'use client';

import { useRef } from 'react';
import { MessageCircle, PhoneCall, ShoppingBag } from 'lucide-react';
import { business } from '../data/site';
import { whatsappLink } from '../lib/links';
import { button, external } from '../components/Button';
import { useHeroAnimation } from '../lib/useHeroAnimation';
import { EnergyField, heroSparks } from '../components/EnergyField';

// Icons nudge on hover; the button itself lifts 2px (see `hoverLift`).
const hoverLift = 'hover:-translate-y-0.5 group';
const hoverIcon = 'transition-transform duration-200 group-hover:translate-x-0.5';

export default function Hero() {
  const stats = [
    { k: 'Since', v: String(business.establishedYear) },
    { k: 'Experience', v: `${business.experienceYears} yrs` },
    { k: 'Service area', v: 'Tamil Nadu' },
  ];

  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLParagraphElement>(null);
  const badgeDot = useRef<HTMLSpanElement>(null);
  const headingLines = useRef<HTMLHeadingElement>(null);
  const description = useRef<HTMLParagraphElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);
  const imageParallax = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    root,
    grid,
    badge,
    badgeDot,
    headingLines,
    description,
    actions,
    stats: statsRef,
    imageWrap,
    imageParallax,
    image,
    glow,
  });

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-navy text-navy-foreground">
      <EnergyField sparks={heroSparks} gridRef={grid} startDelay={1500} />
      <div className="container-apj relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p
            ref={badge}
            className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/80"
          >
            <span ref={badgeDot} className="h-1.5 w-1.5 rounded-full bg-spark" aria-hidden="true" />
            Battery · Inverter · Solar
          </p>
          <h1 ref={headingLines} className="heading-xl mt-5">
            <span className="inline-block">Power Solutions</span> <span className="inline-block">You Can Trust.</span>
          </h1>
          <p
            ref={description}
            className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/80 md:text-lg"
          >
            {business.experienceYears} years of field experience in batteries, inverters and solar solutions — with
            dependable sales, installation, service and support. Based in Neelankarai, Chennai, serving customers across
            Tamil Nadu.
          </p>
          <div ref={actions} className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex">
              <a href="#batteries" className={button('primary', 'lg', hoverLift)}>
                <ShoppingBag className={`h-4 w-4 ${hoverIcon}`} aria-hidden="true" />
                Shop Batteries
              </a>
            </span>
            <span className="inline-flex">
              <a href="#finder" className={button('onNavy', 'lg', hoverLift)}>
                <PhoneCall className={`h-4 w-4 ${hoverIcon}`} aria-hidden="true" />
                Get Expert Help
              </a>
            </span>
            <span className="inline-flex">
              <a href={whatsappLink()} {...external} className={button('whatsapp', 'lg', hoverLift)}>
                <MessageCircle className={`h-4 w-4 ${hoverIcon}`} aria-hidden="true" />
                WhatsApp Us
              </a>
            </span>
          </div>
          <dl
            ref={statsRef}
            className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-navy-foreground/15 pt-6"
          >
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-navy-foreground/55">{s.k}</dt>
                <dd className="font-display text-lg font-bold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div ref={imageWrap}>
          <div ref={imageParallax} className="relative">
            <div
              ref={glow}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-0 blur-2xl"
              style={{
                background:
                  'radial-gradient(60% 60% at 50% 50%, var(--color-spark) 0%, var(--color-primary) 45%, transparent 75%)',
              }}
            />
            <img
              ref={image}
              src="/hero-power.jpg"
              alt="Car battery, wall-mounted home inverter and solar panel arranged together"
              width={1600}
              height={1200}
              className="relative w-full rounded-2xl border border-navy-foreground/10 object-cover shadow-lift"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
