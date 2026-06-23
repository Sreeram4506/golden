import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: 'CH. Trinadh Babu', title: 'C.M.D', image: '/trinad.png' },
  { name: 'J. Venkateshwarlu', title: 'M.D', image: '/venkata.png' },
];

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Hexagon entrance animation
    const hexagons = gridRef.current?.querySelectorAll('.hexagon-wrapper');
    if (hexagons) {
      gsap.fromTo(
        hexagons,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

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
      progressTween.kill();
    };
  }, []);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="relative bg-void border-t border-base-border py-24 md:py-40 px-6"
    >
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="section-progress"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Section title */}
      <div className="text-center mb-16">
        <p className="text-amber text-xs font-medium uppercase tracking-[0.08em] mb-4">
          Leadership
        </p>
        <h2 className="text-text-primary font-grotesk font-semibold uppercase tracking-[0.02em] text-3xl md:text-5xl">
          Our Leadership
        </h2>
      </div>

      <div
        ref={gridRef}
        className="max-w-[800px] mx-auto flex flex-wrap justify-center gap-8 md:gap-16"
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            className="hexagon-wrapper opacity-0"
          >
            <div className="hexagon group">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
              />
              <div className="hexagon-overlay">
                <h3 className="text-text-primary font-grotesk font-medium text-sm uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-text-secondary text-xs mt-1">
                  {member.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
