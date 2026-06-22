import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2 }
    )
      .fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.65'
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="min-h-[100dvh] bg-void">
      <div className="flex flex-col lg:flex-row min-h-[100dvh]">
        {/* Left Panel - Image */}
        <div
          ref={imageRef}
          className="w-full lg:w-[55%] h-[60vh] lg:h-auto relative opacity-0"
        >
          <img
            src="/hero-crane.jpg"
            alt="Heavy lift crane operation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-void/20 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/60 lg:hidden" />
        </div>

        {/* Right Panel - Content */}
        <div className="w-full lg:w-[45%] bg-white flex flex-col justify-center px-6 md:px-10 lg:px-12 py-12 lg:py-0">
          <h1
            ref={headingRef}
            className="text-[#0a0a0a] font-grotesk font-medium uppercase leading-[0.9] tracking-[-0.02em] opacity-0"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 6rem)',
              maxWidth: '90%',
            }}
          >
            Building Diversified Ventures
          </h1>

          <p
            ref={descRef}
            className="text-text-secondary font-grotesk text-base leading-relaxed max-w-[400px] mt-8 opacity-0"
          >
            A diversified enterprise spanning media, precious metals, property, aviation,
            finance, mobility, technology, construction, and international operations.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10 opacity-0">
            <button
              onClick={handleExploreClick}
              className="bg-amber hover:bg-amber-hover text-void font-medium text-sm uppercase tracking-wide px-7 py-3 rounded-md transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Services
            </button>
            <button className="bg-transparent text-[#0a0a0a] font-medium text-sm uppercase tracking-wide px-7 py-3 rounded-md border border-[#1a1a1a] hover:border-[#0a0a0a] transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
