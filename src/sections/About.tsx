import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const gradient = svgRef.current.querySelector('#precision-grad');
    if (!gradient) return;

    const stops = gsap.utils.toArray<SVGStopElement>(
      gradient.querySelectorAll('stop')
    );

    if (stops.length < 5) return;

    // Breathing gradient animation
    const phase1 = gsap.timeline({
      defaults: { duration: 6, ease: 'sine.inOut' },
    });

    phase1.to(stops[0], { attr: { offset: '20%' } });
    phase1.to(stops[1], { attr: { offset: '45%' } }, 0);
    phase1.to(stops[2], { attr: { offset: '70%' }, duration: 5 }, 0);
    phase1.to(stops[3], { attr: { offset: '95%' }, duration: 5 }, 0);
    phase1.to(stops[4], { attr: { offset: '100%' } }, 0);

    const phase2 = gsap.timeline({
      defaults: { duration: 6, ease: 'sine.inOut' },
    });

    phase2.to(stops[0], { attr: { offset: '0%' } });
    phase2.to(stops[1], { attr: { offset: '25%' } }, 0);
    phase2.to(stops[2], { attr: { offset: '50%' }, duration: 5 }, 0);
    phase2.to(stops[3], { attr: { offset: '75%' }, duration: 5 }, 0);
    phase2.to(stops[4], { attr: { offset: '100%' } }, 0);

    phase1.add(phase2);
    phase1.repeat(-1);

    // Content entrance animation
    const contentElements = contentRef.current?.querySelectorAll('.about-animate');
    if (contentElements) {
      gsap.fromTo(
        contentElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      phase1.kill();
      progressTween.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-void border-t border-base-border overflow-hidden"
    >
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="section-progress"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* SVG Gradient Background */}
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        <defs>
          <radialGradient id="precision-grad">
            <stop offset="0%" stopColor="#FFB800" />
            <stop offset="25%" stopColor="#FFB800" />
            <stop offset="50%" stopColor="#111111" />
            <stop offset="75%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#precision-grad)" />
      </svg>

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative z-10 py-24 md:py-40 px-6 text-center"
      >
        <p className="about-animate text-amber text-xs font-medium uppercase tracking-[0.08em] mb-6">
          About Us
        </p>

        <h2 className="about-animate text-text-primary font-grotesk font-semibold uppercase tracking-[0.02em] text-3xl md:text-5xl max-w-[800px] mx-auto">
          Diverse Portfolio of Global Services
        </h2>

        <p className="about-animate text-text-secondary font-grotesk text-base leading-relaxed max-w-[640px] mx-auto mt-8">
          Global Media Wings is a dynamic and diversified enterprise with extensive operations spanning across Media, Real Estate, Aviation, Finance, and IT Services. With a commitment to excellence, our team of seasoned professionals delivers integrated solutions that power global innovation and transform visionary concepts into reality.
        </p>

        {/* Stats row */}
        <div className="about-animate grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mt-16 max-w-[800px] mx-auto">
          <div className="text-center md:border-r border-base-border px-4">
            <span className="block text-text-primary font-grotesk font-light text-4xl md:text-5xl tracking-tight tabular-nums">
              9+
            </span>
            <span className="block text-text-secondary text-xs uppercase tracking-[0.08em] mt-2">
              Industries Served
            </span>
          </div>
          <div className="text-center md:border-r border-base-border px-4">
            <span className="block text-text-primary font-grotesk font-light text-4xl md:text-5xl tracking-tight tabular-nums">
              Global
            </span>
            <span className="block text-text-secondary text-xs uppercase tracking-[0.08em] mt-2">
              Reach & Impact
            </span>
          </div>
          <div className="text-center px-4">
            <span className="block text-text-primary font-grotesk font-light text-4xl md:text-5xl tracking-tight tabular-nums">
              360°
            </span>
            <span className="block text-text-secondary text-xs uppercase tracking-[0.08em] mt-2">
              Integrated Solutions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
