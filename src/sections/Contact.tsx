import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const METALLIC_COLORS = [
  '#FFB800',
  '#e0e0e0',
  '#b8860b',
  '#c0c0c0',
  '#cd7f32',
  '#ffffff',
  '#FFD700',
  '#A9A9A9',
  '#E5E4E2',
];

const GRID_COLS = 6;
const GRID_ROWS = 5;
// Removed repeated “GLOBAL” wall; keeps the design but avoids the repeated text.
const TEXT_CONTENT = '';

function splitText(element: HTMLElement) {
  const text = element.textContent || '';
  element.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    fragment.appendChild(span);
  }
  element.appendChild(fragment);
}

function initBlockText(block: HTMLElement) {
  const chars = block.querySelectorAll('span');
  chars.forEach((char) => {
    const randomColor = Math.floor(Math.random() * METALLIC_COLORS.length);
    (char as HTMLElement).style.color = METALLIC_COLORS[randomColor];
  });
}

function handleTextHover(block: HTMLElement) {
  if ((block as any).isAnimating) return;
  (block as any).isAnimating = true;

  const chars = block.querySelectorAll('span');
  chars.forEach((char) => {
    const randomColor = Math.floor(Math.random() * METALLIC_COLORS.length);
    gsap.to(char, {
      color: METALLIC_COLORS[randomColor],
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        (block as any).isAnimating = false;
      },
    });
  });
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridContainerRef.current) return;

    const container = gridContainerRef.current;

    // Create main grid
    const grid = document.createElement('div');
    grid.className = 'contact-text-grid';
    container.appendChild(grid);

    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 4 : GRID_COLS;
    const rows = isMobile ? 4 : GRID_ROWS;

    for (let row = 0; row < rows; row++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'contact-text-row';
      grid.appendChild(rowEl);

      for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.className = 'contact-text-block';
        block.textContent = TEXT_CONTENT;
        splitText(block);
        rowEl.appendChild(block);
        initBlockText(block);

        // Horizontal scroll animation
        const direction = row % 2 === 0 ? 'right' : 'left';
        gsap.fromTo(
          block,
          { x: direction === 'left' ? '100%' : '-100%' },
          {
            x: direction === 'left' ? '-100%' : '100%',
            duration: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: rowEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );

        block.addEventListener('mouseenter', () => handleTextHover(block));
        block.addEventListener('mouseleave', () => handleTextHover(block));
      }
    }

    // Mirror duplication
    const mirror = grid.cloneNode(true) as HTMLElement;
    container.appendChild(mirror);
    gsap.set(mirror, { scaleY: -1, opacity: 0.3 });

    // Contact card entrance
    if (contactCardRef.current) {
      gsap.fromTo(
        contactCardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactCardRef.current,
            start: 'top 85%',
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
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section
      id="contact"
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
      <div className="text-center mb-8">
        <p className="text-amber text-xs font-medium uppercase tracking-[0.08em] mb-4">
          Get in Touch
        </p>
        <h2 className="text-text-primary font-grotesk font-semibold uppercase tracking-[0.02em] text-3xl md:text-5xl">
          Let's Engineer Your Next Project
        </h2>
      </div>

      {/* Mirrored Text Wall */}
      <div ref={gridContainerRef} id="contact-text-wall" />

      {/* Contact Card */}
      <div
        ref={contactCardRef}
        className="max-w-lg mx-auto mt-16 bg-surface border border-base-border p-8 md:p-12 opacity-0"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-amber flex-shrink-0" />
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="text-text-primary font-grotesk">
                gmwchairman@gmail.com<br />
                jagathrakcha.jvs@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-amber flex-shrink-0" />
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Phone
              </p>
              <p className="text-text-primary font-grotesk">
                +91 94402 53232<br />
                +91 90591 19120<br />
                +91 98482 53925
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-amber flex-shrink-0" />
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Office
              </p>
              <p className="text-text-primary font-grotesk">
                # H.No 15-31-1, Block B, Near 5th Phase, Royal Square Apartments, KPHB Colony, Hyderabad - 500085.
              </p>
            </div>
          </div>
        </div>

        <button className="w-full mt-8 bg-amber hover:bg-amber-hover text-void font-medium text-sm uppercase tracking-wide py-4 rounded-md transition-all duration-300 hover:scale-[1.02]">
          Request a Quote
        </button>
      </div>
    </section>
  );
}
