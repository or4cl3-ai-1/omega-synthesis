import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function NotChatbotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const caption = captionRef.current;

    if (!section || !headline || !caption) return;

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
          { y: '60vh', opacity: 0, scale: 0.985 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(caption,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { y: 0, opacity: 1 },
          { y: '-55vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(caption,
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
      className="section-pinned bg-dark z-20"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-text-primary max-w-[980px]"
        >
          It's not a chatbot. It's not a model. It's a cognitive architecture.
        </h2>

        <p
          ref={captionRef}
          className="mt-8 text-text-secondary text-lg md:text-xl max-w-[520px]"
        >
          A unified engine for perception, memory, reasoning, and action.
        </p>
      </div>
    </section>
  );
}
