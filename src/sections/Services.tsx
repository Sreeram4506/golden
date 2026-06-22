import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'Media & Digital Services',
    detail: 'Brand storytelling, content systems, and digital growth support for modern businesses.',
    tone: 'Creative',
  },
  {
    title: 'Gold Trading & Precious Metals',
    detail: 'Trusted sourcing, trading, and advisory support across precious metal opportunities.',
    tone: 'Trade',
  },
  {
    title: 'Real Estate Development & Property Services',
    detail: 'Development, brokerage, and property support shaped around long-term value.',
    tone: 'Assets',
  },
  {
    title: 'Aviation Projects & Consultancy',
    detail: 'Strategic advisory and project support for aviation-linked initiatives and operations.',
    tone: 'Aerospace',
  },
  {
    title: 'Financial Services & Advisory',
    detail: 'Practical financial guidance for planning, structuring, and decision-making.',
    tone: 'Finance',
  },
  {
    title: 'Automobile Sales, Service & Maintenance',
    detail: 'Vehicle sales support, after-sales service, and maintenance coordination.',
    tone: 'Mobility',
  },
  {
    title: 'Information Technology (IT) Services',
    detail: 'Technology solutions that help teams build, run, and scale with confidence.',
    tone: 'Tech',
  },
  {
    title: 'Construction & Infrastructure Works',
    detail: 'Delivery support for construction, site work, and infrastructure execution.',
    tone: 'Build',
  },
  {
    title: 'National Business Operations',
    detail: 'Operational support for business activity across local markets and networks.',
    tone: 'Local',
  },
  {
    title: 'International Business Operations',
    detail: 'Cross-border business coordination designed for global reach and expansion.',
    tone: 'Global',
  },
  {
    title: 'Diversified Business Ventures as approved by partners',
    detail: 'Flexible engagement in additional ventures when aligned with partner approvals.',
    tone: 'Flexible',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-base-border bg-void py-20 md:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={introRef} className="mx-auto max-w-3xl text-center">
          <p className="text-amber text-xs font-medium uppercase tracking-[0.18em] mb-4">
            What We Do
          </p>
          <h2 className="text-balance text-text-primary font-grotesk font-semibold uppercase tracking-[0.02em] text-3xl sm:text-4xl md:text-5xl">
            Services designed for real business movement
          </h2>
          <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary">
            A focused portfolio of services across media, trade, property, aviation, finance,
            mobility, technology, construction, and global business operations.
          </p>
        </div>

        <div className="mt-14 lg:mt-16">
          <div className="grid gap-4 sm:grid-cols-2 xl:gap-5">
            {SERVICES.map((service, index) => (
              <article
                key={service.title}
                ref={(node) => {
                  cardsRef.current[index] = node;
                }}
                className={[
                  'service-card group relative overflow-hidden rounded-[1.5rem] border border-base-border bg-surface/90 p-5 sm:p-6',
                  index === SERVICES.length - 1 ? 'sm:col-span-2' : '',
                  index === 2 || index === 7 ? 'sm:col-span-2' : '',
                ].join(' ')}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent opacity-60" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber/30 bg-amber/10 text-sm font-semibold text-amber">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-text-muted">
                        {service.tone}
                      </span>
                      <h3 className="mt-1 text-lg sm:text-xl font-grotesk font-semibold uppercase tracking-[0.01em] text-text-primary">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex rounded-full border border-base-border px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-text-secondary transition-colors group-hover:border-amber/40 group-hover:text-amber">
                    Service
                  </span>
                </div>

                <p className="mt-4 max-w-xl text-sm sm:text-[15px] leading-relaxed text-text-secondary">
                  {service.detail}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  <span className="h-px w-8 bg-amber/40" />
                  Partner-aligned delivery
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
