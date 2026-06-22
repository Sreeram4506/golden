import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const links = document.querySelectorAll('.menu-link-item');
      gsap.fromTo(
        links,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-void/90 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-[1400px] mx-auto">
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.png" alt="Global Media Wings Logo" className="h-10 w-auto object-contain" />
            <span className="text-amber font-grotesk font-medium text-xl uppercase tracking-wide hidden sm:block">
              GMW
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-secondary hover:text-amber text-sm font-medium uppercase tracking-widest transition-colors duration-300 nav-link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2 group"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-text-primary transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-text-primary transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-text-primary transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div className={`fullscreen-menu ${menuOpen ? 'active' : ''}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-text-primary hover:text-amber transition-colors z-10"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-4">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="overflow-hidden">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="fullscreen-menu-link menu-link-item block"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 flex gap-6">
          {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-text-muted hover:text-amber text-xs uppercase tracking-widest transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
