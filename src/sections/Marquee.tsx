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

  const arabicText = 'حلول رفع ثقيلة عالمية المستوى — منذ عام 2001';
  const englishText = 'Engineering the Extraordinary — Across Land, Sea & Air';

  return (
    <section
      ref={sectionRef}
      className="bg-[#121212] border-t border-b border-base-border overflow-hidden"
    >
      <div ref={contentRef} className="py-12 md:py-16 opacity-0">
        {/* Arabic line */}
        <div className="overflow-hidden mb-4">
          <div className="marquee-track">
            <span
              className="font-scheherazade text-text-primary whitespace-nowrap px-8"
              style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: 1.4 }}
            >
              {arabicText}&nbsp;&nbsp;&nbsp;{arabicText}&nbsp;&nbsp;&nbsp;{arabicText}&nbsp;&nbsp;&nbsp;{arabicText}
            </span>
            <span
              className="font-scheherazade text-text-primary whitespace-nowrap px-8"
              style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: 1.4 }}
            >
              {arabicText}&nbsp;&nbsp;&nbsp;{arabicText}&nbsp;&nbsp;&nbsp;{arabicText}&nbsp;&nbsp;&nbsp;{arabicText}
            </span>
          </div>
        </div>

        {/* English line */}
        <div className="overflow-hidden">
          <div className="marquee-track" style={{ animationDirection: 'reverse' }}>
            <span
              className="font-grotesk font-light italic text-text-secondary whitespace-nowrap px-8"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
            >
              {englishText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{englishText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{englishText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{englishText}
            </span>
            <span
              className="font-grotesk font-light italic text-text-secondary whitespace-nowrap px-8"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
            >
              {englishText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{englishText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{englishText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{englishText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
