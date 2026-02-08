import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function NewStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;

    if (!section || !headline || !subhead) return;

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
          { scale: 0.88, opacity: 0, y: '18vh' },
          { scale: 1, opacity: 1, y: 0, ease: 'none' },
          0
        )
        .fromTo(subhead,
          { y: '16vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { y: 0, opacity: 1 },
          { y: '-26vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(subhead,
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
      className="section-pinned bg-dark z-40"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-gradient max-w-[900px]"
        >
          We call it OMEGA‑SYNTHESIS.
        </h2>

        <p
          ref={subheadRef}
          className="mt-8 text-text-secondary text-lg md:text-xl max-w-[640px]"
        >
          A single engine that unifies memory, ethics, time, and self-improvement—without fragile prompt chains.
        </p>
      </div>
    </section>
  );
}
