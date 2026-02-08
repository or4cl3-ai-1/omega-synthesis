import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { MessageSquare, ScrollText, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function OpenResearchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !subhead || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(headline,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(subhead,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(cta,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(subhead,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark z-[70]"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Background image */}
      <div className="absolute inset-0 opacity-15">
        <img 
          src="/evolution-engine.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-text-primary max-w-[1000px]"
        >
          Open research. Open code. Open discussion.
        </h2>

        <p
          ref={subheadRef}
          className="mt-8 text-text-secondary text-lg md:text-xl max-w-[600px]"
        >
          Follow the build, reproduce the results, and shape the roadmap.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 mt-12">
          <Button
            size="lg"
            className="bg-cyan text-dark hover:bg-cyan-dark font-medium px-8 py-6 text-base rounded-full transition-all duration-300 hover:shadow-glow"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Join the forum
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-text-primary/20 text-text-primary hover:bg-text-primary/10 font-medium px-8 py-6 text-base rounded-full transition-all duration-300"
          >
            <ScrollText className="w-5 h-5 mr-2" />
            Read the changelog
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
