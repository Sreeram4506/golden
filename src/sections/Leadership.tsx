import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: 'CH. Trinadh Babu',
    title: 'C.M.D',
    image: '/trinad.jpeg',
    description:
      'CH. Trinadh Babu serves as a trusted advisor, guiding stakeholders with practical expertise and a clear, problem-solving approach. As an investor, he evaluates opportunities with a focus on long-term strength—balancing risk and growth to support sustainable progress. In the real estate domain, his involvement reflects a commitment to responsible planning, consistent delivery, and quality outcomes, ensuring that projects move forward with confidence and meet the expectations of customers and partners.',
  },
  {
    name: 'J. Venkateshwarlu',
    title: 'M.D',
    image: '/venkata.png',
    description:
      'As a trusted advocate, J. Venkateshwarlu brings disciplined legal insight and a client-first approach to every matter. As an investor, he focuses on sustainable value creation—identifying opportunities with long-term potential and steering decisions with clarity and confidence. In real estate, his experience reflects a strong commitment to quality development, reliable execution, and customer satisfaction, helping transform visions into real spaces that people are proud to be part of.',
  },
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
            <div className="hexagon group w-[220px] sm:w-[260px] md:w-[280px] mx-auto">
              <img
                className="block"
                src={member.image}
                alt={member.name}
                loading="lazy"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-text-primary font-grotesk font-medium text-sm uppercase tracking-wide">
                {member.name}
              </h3>
              <p className="text-text-secondary text-xs mt-1">
                {member.title}
              </p>
            </div>

            {member.description ? (
              <p className="text-text-secondary text-[11px] leading-relaxed mt-4 max-w-[280px] text-center">
                {member.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
