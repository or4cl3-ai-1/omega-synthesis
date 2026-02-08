import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    if (!section || !label || !headline || !cta) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(label, 
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0, duration: 0.35, delay: 0.1 }
      )
      .fromTo(headline.querySelectorAll('.word'),
        { opacity: 0, y: 40, rotateX: 18 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.03 },
        '-=0.1'
      )
      .fromTo(cta,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        '-=0.4'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([label, headline, cta], { opacity: 1, y: 0, x: 0 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold visible
      // SETTLE (30-70%): Hold visible
      // EXIT (70-100%): Fade out and move up
      scrollTl
        .fromTo(headline,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(label,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = "We're building a reasoning engine that thinks in five dimensions.";
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark z-10"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />
      
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="/penta-mind-hero.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Micro label */}
        <div
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.12em] text-cyan/85 mb-8"
        >
          Or4cl3 AI Research
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-text-primary max-w-[1100px] perspective-1000"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mt-12">
          <a 
            href="/OMEGA-SYNTHESIS-Technical-Paper.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-cyan text-dark hover:bg-cyan-dark font-medium px-8 py-6 text-base rounded-full transition-all duration-300 hover:shadow-glow"
            >
              <FileText className="w-5 h-5 mr-2" />
              Read the paper
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            className="border-text-primary/20 text-text-primary hover:bg-text-primary/10 font-medium px-8 py-6 text-base rounded-full transition-all duration-300"
          >
            Request access
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
