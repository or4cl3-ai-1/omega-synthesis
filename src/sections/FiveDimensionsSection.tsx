import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FiveDimensionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const list = listRef.current;

    if (!section || !headline || !list) return;

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
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(list,
          { y: '22vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.10
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '40vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(list,
          { y: 0, opacity: 1 },
          { y: '-12vh', opacity: 0, ease: 'power2.in' },
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const dimensions = ['RECURSIVE', 'ETHICAL', 'CONSCIOUS', 'TEMPORAL', 'EVOLUTIONARY'];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark z-30"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/penta-mind-hero.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-text-primary max-w-[1100px]"
        >
          It reasons across five dimensions—so you don't have to choose between safety and performance.
        </h2>

        <div
          ref={listRef}
          className="mt-12 font-mono text-sm md:text-base tracking-[0.12em] text-cyan"
        >
          {dimensions.map((dim, i) => (
            <span key={dim}>
              {dim}
              {i < dimensions.length - 1 && (
                <span className="mx-3 text-text-secondary">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
