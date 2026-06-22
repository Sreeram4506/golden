import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-void border-t border-base-border py-24 md:py-40 px-6"
    >
      <div className="text-center mb-8">
        <p className="text-amber text-xs font-medium uppercase tracking-[0.08em] mb-4">
          Get in Touch
        </p>
        <h2 className="text-text-primary font-grotesk font-semibold uppercase tracking-[0.02em] text-3xl md:text-5xl">
          Let's Engineer Your Next Project
        </h2>
      </div>

      <div className="max-w-lg mx-auto mt-16 bg-surface border border-base-border p-8 md:p-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-amber flex-shrink-0" />
            <div className="text-left">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Email
              </p>
              <div className="text-text-primary font-grotesk leading-relaxed">
                <a
                  className="hover:text-amber transition-colors"
                  href="mailto:gmwchairman@gmail.com"
                >
                  gmwchairman@gmail.com
                </a>
                <br />
                <a
                  className="hover:text-amber transition-colors"
                  href="mailto:jagathrakcha.jvs@gmail.com"
                >
                  jagathrakcha.jvs@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-amber flex-shrink-0" />
            <div className="text-left">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Phone
              </p>
              <div className="text-text-primary font-grotesk leading-relaxed">
                <a
                  className="hover:text-amber transition-colors"
                  href="tel:+919440253232"
                >
                  +91 94402 53232
                </a>
                <br />
                <a
                  className="hover:text-amber transition-colors"
                  href="tel:+919059119120"
                >
                  +91 90591 19120
                </a>
                <br />
                <a
                  className="hover:text-amber transition-colors"
                  href="tel:+919848253925"
                >
                  +91 98482 53925
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-amber flex-shrink-0" />
            <div className="text-left">
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Office
              </p>
              <p className="text-text-primary font-grotesk">
                # H.No 15-31-1, Block B, Near 5th Phase, Royal Square Apartments,
                KPHB Colony, Hyderabad - 500085.
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://wa.me/919440253232?text=Hello%20Global%20Media%20Wings%2C%20I%20would%20like%20to%20request%20a%20quote%20for%20my%20project."
          target="_blank"
          rel="noreferrer"
          className="block w-full mt-8 bg-amber hover:bg-amber-hover text-void font-medium text-sm uppercase tracking-wide py-4 rounded-md transition-all duration-300 hover:scale-[1.02] text-center"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}
