import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Box, 
  Orbit, 
  ShieldCheck, 
  Clock, 
  Dna, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const cards = cardsRef.current;

    if (!section || !leftCol || !cards) return;

    const cardElements = cards.querySelectorAll('.feature-card');

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(leftCol,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      cardElements.forEach((card) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, rotateX: 6 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Box,
      title: 'Unified 5D State',
      description: 'One tensor for cognition, ethics, time, and evolution.',
    },
    {
      icon: Orbit,
      title: 'Event Horizon Ingestion',
      description: 'Multi-modal encoding that preserves phenomenological structure.',
    },
    {
      icon: ShieldCheck,
      title: 'Resonance Gate',
      description: 'Ethical projection with differentiable gating and PAS-weighted selection.',
    },
    {
      icon: Clock,
      title: 'Temporal Spiral',
      description: 'Narrative coherence and golden-ratio memory resonance.',
    },
    {
      icon: Dna,
      title: 'Evolution Engine',
      description: 'Self-modifying architecture search with G-RAG.',
    },
    {
      icon: CheckCircle,
      title: 'Formal Verification Layer',
      description: 'Lean 4 + Z3 proofs for critical paths.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark-secondary py-24 md:py-32 z-[80]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left column - sticky */}
          <div
            ref={leftColRef}
            className="lg:w-[38%] lg:sticky lg:top-[12vh] lg:self-start"
          >
            <h2 className="font-display font-bold text-display-2 text-text-primary mb-6">
              Built for teams who ship.
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              OMEGA‑SYNTHESIS is designed to integrate without re-architecting your stack. 
              Start with inference. Add memory. Enable learning—when you're ready.
            </p>

            {/* Email signup form */}
            <div className="space-y-4">
              <label className="font-mono text-xs uppercase tracking-[0.12em] text-cyan">
                Get early access
              </label>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-dark-tertiary border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:border-cyan/50 rounded-xl h-12"
                />
                <Button
                  className="bg-cyan text-dark hover:bg-cyan-dark font-medium px-6 rounded-xl h-12 transition-all duration-300 hover:shadow-glow"
                >
                  Request
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right column - scrolling cards */}
          <div ref={cardsRef} className="lg:w-[58%] space-y-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card card-glass rounded-2xl p-6 border border-white/5 hover:border-cyan/30 transition-all duration-300 group perspective-1000"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-cyan/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
