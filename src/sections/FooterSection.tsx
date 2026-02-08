import { Github, Twitter, MessageCircle } from 'lucide-react';

export function FooterSection() {
  const footerLinks = {
    Docs: ['Quickstart', 'API Reference', 'Examples'],
    Research: ['Paper', 'Benchmarks', 'Safety'],
    Company: ['About', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms'],
  };

  return (
    <footer className="relative bg-dark py-16 md:py-20 z-[90]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left - Logo and tagline */}
          <div className="lg:max-w-[320px]">
            <div className="font-display font-bold text-2xl text-text-primary mb-4">
              OMEGA<span className="text-cyan">‑</span>SYNTHESIS
            </div>
            <p className="text-text-secondary mb-6">
              A reasoning engine that thinks in five dimensions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-tertiary border border-white/10 flex items-center justify-center text-text-secondary hover:text-cyan hover:border-cyan/50 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-tertiary border border-white/10 flex items-center justify-center text-text-secondary hover:text-cyan hover:border-cyan/50 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-dark-tertiary border border-white/10 flex items-center justify-center text-text-secondary hover:text-cyan hover:border-cyan/50 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right - Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-text-primary hover:text-cyan transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            © Or4cl3 AI Research. All rights reserved.
          </p>
          <p className="text-text-secondary/60 text-sm">
            Designed with cognitive intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
