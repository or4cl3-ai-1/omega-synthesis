import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Cpu, Network, Atom } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AnySubstrateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const icons = iconsRef.current;

    if (!section || !headline || !subhead || !icons) return;

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
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(subhead,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.10
        )
        .fromTo(icons,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.15
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headline,
          { y: 0, opacity: 1 },
          { y: '-55vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(subhead,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(icons,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const substrates = [
    { icon: Cpu, label: 'Edge' },
    { icon: Cloud, label: 'Cloud' },
    { icon: Network, label: 'Distributed swarm' },
    { icon: Atom, label: 'Hybrid quantum' },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark z-[60]"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Background image */}
      <div className="absolute inset-0 opacity-15">
        <img 
          src="/consciousness-lattice.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-text-primary"
        >
          Runs on any substrate.
        </h2>

        <div
          ref={subheadRef}
          className="mt-8 font-mono text-sm tracking-[0.12em] text-cyan"
        >
          Edge • Cloud • Distributed swarm • Hybrid quantum
        </div>

        {/* Substrate icons */}
        <div ref={iconsRef} className="flex gap-8 mt-12">
          {substrates.map((sub) => (
            <div
              key={sub.label}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-dark-tertiary border border-white/10 flex items-center justify-center group-hover:border-cyan/50 group-hover:bg-cyan/5 transition-all duration-300">
                <sub.icon className="w-8 h-8 text-text-secondary group-hover:text-cyan transition-colors" />
              </div>
              <span className="text-text-secondary text-sm">{sub.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
