import { useEffect, useState } from 'react';

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
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={[
          'w-full border-b border-base-border/40 transition-colors duration-300',
          scrolled ? 'bg-void/85 backdrop-blur-lg' : 'bg-void/55 backdrop-blur',
        ].join(' ')}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="Global Media Wings" className="h-10 w-auto object-contain" />
            <span className="text-amber font-grotesk font-medium text-lg uppercase tracking-wide sm:hidden">
              GMW
            </span>
            <span className="hidden sm:block text-amber font-grotesk font-medium text-lg uppercase tracking-wide">
              Global Media Wings
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
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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

      {/* Mobile dropdown (normal menu, no fullscreen overlay) */}
      {menuOpen && (
        <div className="lg:hidden border-b border-base-border/40 bg-void/80 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-secondary hover:text-amber text-sm font-medium uppercase tracking-widest transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
