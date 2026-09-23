import { business, founder, whyApj } from '../data/site';
import { external } from '../components/Button';
import { LinkedinIcon } from '../components/SocialIcons';
import { EnergyField, founderSparks } from '../components/EnergyField';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden section-y bg-navy text-navy-foreground">
      <EnergyField sparks={founderSparks} />
      <div className="container-apj relative">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-spark">About APJ · Since {business.establishedYear}</p>
            <h2 className="heading-lg mt-2">{founder.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-sm font-medium text-navy-foreground/60">{founder.title}</p>
              <a
                href={founder.linkedin}
                {...external}
                aria-label={`${founder.name} on LinkedIn`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-foreground/60 transition-colors hover:text-spark"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
            <p className="mt-5 border-l-2 border-spark pl-4 font-display text-lg font-semibold leading-snug">
              &ldquo;{founder.quote}&rdquo;
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-navy-foreground/75">{founder.bio}</p>
          </div>
          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-spark/70 via-spark/20 to-navy-foreground/10 p-[3px] shadow-lift">
              <img
                src={founder.photo}
                alt={`${founder.name}, ${founder.title}`}
                width={480}
                height={480}
                className="aspect-square w-full rounded-[1.6rem] border border-navy-foreground/10 object-cover"
              />
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-7 border-t border-navy-foreground/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyApj.map((w) => (
            <li key={w.title}>
              <h3 className="font-display text-base font-bold">{w.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-foreground/75">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
