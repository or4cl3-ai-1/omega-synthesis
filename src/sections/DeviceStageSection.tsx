import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  LayoutDashboard, 
  Brain, 
  Shield, 
  Dna, 
  Settings,
  Cpu,
  Orbit,
  ShieldCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function DeviceStageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const device = deviceRef.current;
    const glow = glowRef.current;
    const cards = cardsRef.current;

    if (!section || !device || !glow || !cards) return;

    const cardElements = cards.querySelectorAll('.feature-card');

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
        .fromTo(device,
          { y: '110vh', rotateX: 55, scale: 0.86, opacity: 0 },
          { y: 0, rotateX: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(glow,
          { opacity: 0, scale: 0.9 },
          { opacity: 0.9, scale: 1, ease: 'none' },
          0
        );

      // Cards staggered entrance
      cardElements.forEach((card, i) => {
        scrollTl.fromTo(card,
          { x: '40vw', opacity: 0, rotateY: 18 },
          { x: 0, opacity: 1, rotateY: 0, ease: 'none' },
          0.10 + i * 0.06
        );
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(device,
          { y: 0, rotateX: 0, scale: 1, opacity: 1 },
          { y: '-90vh', rotateX: -28, scale: 0.92, opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(glow,
          { opacity: 0.9 },
          { opacity: 0, ease: 'power2.in' },
          0.70
        );

      cardElements.forEach((card) => {
        scrollTl.fromTo(card,
          { x: 0, opacity: 1 },
          { x: '-20vw', opacity: 0, ease: 'power2.in' },
          0.70
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Brain, label: 'Cognition' },
    { icon: Shield, label: 'Ethics' },
    { icon: Dna, label: 'Evolution' },
    { icon: Settings, label: 'Settings' },
  ];

  const featureCards = [
    {
      icon: Cpu,
      title: 'Penta-Mind Engine',
      description: '5D cognitive state tensor',
    },
    {
      icon: Orbit,
      title: 'Event Horizon',
      description: 'Ingestion & encoding layer',
    },
    {
      icon: ShieldCheck,
      title: 'Resonance Gate',
      description: 'Ethical projection & gating',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark z-50 perspective-1000"
    >
      {/* Glow layer */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[110vmin] h-[110vmin] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 55%, rgba(0,240,255,0.22), rgba(0,0,0,0) 60%)',
        }}
      />

      {/* Device card */}
      <div
        ref={deviceRef}
        className="relative w-[min(86vw,1180px)] h-[min(72vh,720px)] card-glass rounded-2xl shadow-card preserve-3d overflow-hidden"
      >
        {/* Sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-dark-secondary/50 p-6">
          <div className="font-display font-bold text-lg text-text-primary mb-8">
            Omega Stack
          </div>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-cyan/10 text-cyan'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content area */}
        <div className="absolute left-64 right-0 top-0 bottom-0 p-8">
          <div className="mb-6">
            <h3 className="font-display font-semibold text-2xl text-text-primary">
              Dashboard
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              Real-time cognitive architecture monitoring
            </p>
          </div>

          {/* Feature cards */}
          <div ref={cardsRef} className="grid grid-cols-3 gap-6">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="feature-card card-glass rounded-xl p-6 border border-white/5 hover:border-cyan/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                  <card.icon className="w-6 h-6 text-cyan" />
                </div>
                <h4 className="font-display font-semibold text-text-primary mb-2">
                  {card.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Status line */}
          <div className="absolute bottom-8 right-8 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-text-secondary">Status: online</span>
            <span className="text-text-secondary/50">•</span>
            <span className="text-cyan font-mono">PAS: 0.91</span>
          </div>
        </div>

        {/* Device UI Mock Image Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="/device-ui-mock.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
