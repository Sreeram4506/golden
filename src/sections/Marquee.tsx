import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const tween = gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  const primaryText =
    'Global Media Wings | Since 2001 | Diversified Business Group | Trusted Across Sectors';
  const secondaryText =
    'Building diversified ventures across media, property, finance, aviation, technology, and more';

  return (
    <section
      ref={sectionRef}
      className="bg-[#121212] border-t border-b border-base-border overflow-hidden"
    >
      <div ref={contentRef} className="py-12 md:py-16 opacity-0">
        <div className="overflow-hidden mb-4">
          <div className="marquee-track">
            <span
              className="font-grotesk font-semibold text-text-primary whitespace-nowrap px-8 uppercase tracking-[0.12em]"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.75rem)', lineHeight: 1.4 }}
            >
              {primaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{primaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{primaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{primaryText}
            </span>
            <span
              className="font-grotesk font-semibold text-text-primary whitespace-nowrap px-8 uppercase tracking-[0.12em]"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.75rem)', lineHeight: 1.4 }}
            >
              {primaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{primaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{primaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{primaryText}
            </span>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-track" style={{ animationDirection: 'reverse' }}>
            <span
              className="font-grotesk font-light italic text-text-secondary whitespace-nowrap px-8"
              style={{ fontSize: 'clamp(1rem, 2.6vw, 1.5rem)' }}
            >
              {secondaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{secondaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{secondaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{secondaryText}
            </span>
            <span
              className="font-grotesk font-light italic text-text-secondary whitespace-nowrap px-8"
              style={{ fontSize: 'clamp(1rem, 2.6vw, 1.5rem)' }}
            >
              {secondaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{secondaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{secondaryText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{secondaryText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
