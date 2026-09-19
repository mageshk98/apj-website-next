import { ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { addressLines, business } from '../data/site';
import { formatPhone, telLink, whatsappLink } from '../lib/links';
import { button, external } from '../components/Button';
import { FacebookIcon, InstagramIcon } from '../components/SocialIcons';

export default function Contact() {
  const sinceLabel = `Since ${business.establishedYear} · ${business.experienceYears} yrs`;
  const landmark = business.address.line2.replace(/^Near\s+/i, '');

  return (
    <section id="contact" className="section-y bg-navy text-navy-foreground">
      <div className="container-apj grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow text-spark">Visit Us</p>
          <h2 className="heading-lg mt-2">
            Based in Neelankarai. Serving all of Tamil Nadu.
          </h2>
          <p className="mt-4 max-w-md text-navy-foreground/75">
            Walk in for a battery test, an inverter check or a solar consultation. Can&apos;t make it in? We deliver
            and install across Tamil Nadu.
          </p>
          <address className="mt-6 space-y-1 border-t border-navy-foreground/15 pt-6 text-base not-italic leading-relaxed text-navy-foreground/80">
            {addressLines.map((line, i) => (
              <p key={line} className={i === 0 ? 'font-display font-bold text-navy-foreground' : ''}>
                {line}
              </p>
            ))}
          </address>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={business.mapsUrl} {...external} className={button('primary')}>
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
            <a href={whatsappLink()} {...external} className={button('whatsapp')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
          <a
            href={business.mapsUrl}
            {...external}
            className="mt-7 flex w-fit flex-wrap items-center gap-2 border-t border-navy-foreground/15 pt-6 text-sm"
          >
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-spark text-spark" />
              ))}
            </span>
            <span className="font-display font-bold">{business.rating}</span>
            <span className="text-navy-foreground/65">from {business.reviewCount} Google reviews</span>
            <span className="font-semibold text-spark hover:underline">Read them</span>
          </a>
        </div>

        <div className="rounded-xl border border-navy-foreground/15 bg-navy-foreground/[0.04] p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-base font-bold">Contact &amp; hours</h3>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-energy/15 px-2.5 py-1 text-xs font-semibold text-energy">
              <span className="h-1.5 w-1.5 rounded-full bg-energy" aria-hidden="true" />
              Open Today
            </span>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/50">Call us</p>
          <a
            href={telLink(business.primaryPhone)}
            className="mt-3 flex items-center gap-3 rounded-lg bg-spark p-4 text-navy transition-colors hover:bg-spark/90"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/10">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block font-display font-bold">{formatPhone(business.primaryPhone)}</span>
              <span className="block text-xs text-navy/70">Primary · Sales &amp; WhatsApp</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {business.phones.slice(1).map((p) => (
              <a
                key={p}
                href={telLink(p)}
                className="rounded-lg border border-navy-foreground/15 p-3 text-sm transition-colors hover:border-navy-foreground/35"
              >
                <span className="block font-display font-semibold">{formatPhone(p)}</span>
                <span className="block text-xs text-navy-foreground/55">Alternate line</span>
              </a>
            ))}
          </div>

          <a
            href={`mailto:${business.email}`}
            className="mt-5 flex items-center gap-3 border-t border-navy-foreground/15 pt-5 text-sm font-medium hover:text-spark"
          >
            <Mail className="h-4 w-4 text-spark" aria-hidden="true" />
            <span className="break-all">{business.email}</span>
          </a>

          <div className="mt-5 space-y-2.5 border-t border-navy-foreground/15 pt-5 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/50">Working hours</p>
            {business.openingHours.map((h) => (
              <div key={h.days} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-navy-foreground/80">
                  <Clock className="h-3.5 w-3.5 text-navy-foreground/50" aria-hidden="true" />
                  {h.days}
                </span>
                <span className="font-semibold">{h.hours}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-navy-foreground/15 pt-5">
            <a
              href={business.socials.instagram}
              {...external}
              aria-label="APJ on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-foreground/15 text-navy-foreground/80 transition-colors hover:border-spark hover:text-spark"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={business.socials.facebook}
              {...external}
              aria-label="APJ on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-foreground/15 text-navy-foreground/80 transition-colors hover:border-spark hover:text-spark"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-navy-foreground/50">Please call ahead on public holidays.</p>
        </div>
      </div>

      <div className="container-apj mt-10">
        <div className="relative overflow-hidden rounded-xl border border-navy-foreground/15">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d128126.75316692324!2d80.1586831!3d13.0014136!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525dade0f74815%3A0x813164d8392cc5a9!2sANBU%20POWER%20JUNCTION!5e1!3m2!1sen!2sin!4v1789795510959!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="APJ location map"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap justify-end gap-2 p-4">
            <span className="pointer-events-auto rounded-full border border-navy-foreground/15 bg-navy/90 px-3 py-1.5 text-xs font-semibold shadow-card backdrop-blur">
              {sinceLabel}
            </span>
            <span className="pointer-events-auto rounded-full border border-navy-foreground/15 bg-navy/90 px-3 py-1.5 text-xs font-semibold shadow-card backdrop-blur">
              Near {landmark}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:max-w-sm">
            <div className="card-surface pointer-events-auto flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-foreground">{business.legalName}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {business.address.line1}, {business.address.locality}, {business.address.city}{' '}
                  {business.address.postalCode}
                </p>
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-foreground">
                  <Star className="h-3.5 w-3.5 fill-spark text-spark" aria-hidden="true" />
                  {business.rating} ({business.reviewCount})
                </p>
              </div>
              <a href={business.mapsUrl} {...external} className={button('navy', 'sm', 'shrink-0')}>
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
