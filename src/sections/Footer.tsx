import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-surface border-t border-base-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="Global Media Wings" className="h-10 w-auto object-contain" />
            <span className="text-amber font-grotesk font-medium text-xl uppercase tracking-wide">
              Global Media Wings
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-secondary hover:text-text-primary text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-text-secondary hover:text-amber transition-colors duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-border my-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-text-muted text-xs">
              &copy; {new Date().getFullYear()} Global Media Wings. All rights reserved.
            </p>
            <p className="text-text-muted text-xs">
              Govt.Regd.No: 1171/2020 Telangana
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-muted hover:text-text-secondary text-xs transition-colors duration-300">
              Privacy Policy
            </a>
            <span className="text-text-muted">&middot;</span>
            <a href="#" className="text-text-muted hover:text-text-secondary text-xs transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
