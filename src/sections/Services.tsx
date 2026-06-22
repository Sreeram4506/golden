import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE_SERVICES = [
  'Media & Digital Services',
  'Gold Trading & Precious Metals',
  'Real Estate Development & Property Services',
  'Aviation Projects & Consultancy',
  'Financial Services & Advisory',
  'Automobile Sales, Service & Maintenance',
  'Information Technology (IT) Services',
  'Construction & Infrastructure Works',
  'National Business Operations',
  'International Business Operations',
  'Diversified Business Ventures as approved by partners',
];

const SERVICES = [...BASE_SERVICES, ...BASE_SERVICES, ...BASE_SERVICES, ...BASE_SERVICES];

export default function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const displayServices = useMemo(() => {
    if (isMobile) {
      return SERVICES.filter((_, i) => i % 3 === 0).slice(0, 20);
    }
    return SERVICES;
  }, [isMobile]);

  useEffect(() => {
    if (!wrapperRef.current || !cylinderRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      cylinderRef.current.querySelectorAll('.carousel-cell')
    );

    const cardWidth = isMobile ? window.innerWidth * 0.75 : window.innerWidth * 0.2;
    const radius = Math.max((cardWidth / 2) / Math.tan(Math.PI / cards.length), 300);

    cards.forEach((card, index) => {
      const angle = (360 / cards.length) * index;
      gsap.set(card, {
        transformOrigin: `50% 50% -${radius}px`,
        rotateY: angle,
      });
    });

    const rotateTween = gsap.to(cylinderRef.current, {
      rotateY: -360,
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    const filterTween = gsap.fromTo(
      cards,
      { filter: 'brightness(200%) blur(4px)' },
      {
        filter: 'brightness(100%) blur(0px)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );

    // Progress bar
    const progressTween = gsap.to(progressRef.current, {
      scaleX: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      rotateTween.kill();
      filterTween.kill();
      progressTween.kill();
    };
  }, [displayServices, isMobile]);

  return (
    <section id="services" ref={sectionRef} className="relative bg-void border-t border-base-border">
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="section-progress"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Section header */}
      <div className="text-center pt-20 pb-10 px-6">
        <p className="text-amber text-xs font-medium uppercase tracking-[0.08em] mb-4">
          What We Do
        </p>
        <h2 className="text-text-primary font-grotesk font-semibold uppercase tracking-[0.02em] text-3xl md:text-5xl">
          Our Services
        </h2>
      </div>

      {/* Cylinder Carousel */}
      <div ref={wrapperRef} className="scene-cylinder">
        <div ref={cylinderRef} className="carousel-cylinder">
          {displayServices.map((service, index) => (
            <div
              key={index}
              className="carousel-cell"
              style={{
                width: isMobile ? '75vw' : '20vw',
              }}
            >
              <span className="text-center leading-tight">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service cards grid fallback for mobile readability */}
      <div className="lg:hidden px-6 pb-20">
        <div className="grid grid-cols-2 gap-px bg-base-border">
          {displayServices.slice(0, 12).map((service, index) => (
            <div
              key={index}
              className="bg-surface p-4 flex items-center justify-center text-center text-text-primary text-sm font-medium uppercase tracking-wide min-h-[80px]"
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
