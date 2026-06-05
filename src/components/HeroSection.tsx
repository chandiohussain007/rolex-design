import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const innerBgRef = useRef<HTMLDivElement>(null);

  // References for exploded parts cards
  const bezelCardRef = useRef<HTMLDivElement>(null);
  const movementCardRef = useRef<HTMLDivElement>(null);
  
  // References for pills
  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state: watch is centered, text is hidden, parts are hidden
      gsap.set(textRef.current, { scale: 0.8, opacity: 0, yPercent: 10 });
      gsap.set(partsRef.current, { opacity: 1 });
      
      // Exploded parts initial setup (hidden behind watch)
      gsap.set([bezelCardRef.current, movementCardRef.current], { opacity: 0, scale: 0.5 });
      gsap.set(pill1Ref.current, { x: -50, opacity: 0 });
      gsap.set(pill2Ref.current, { x: 50, opacity: 0 });

      // --- PHASE 1: Text reveal and watch parallax ---
      tl.to(textRef.current, {
        scale: 1,
        opacity: 1,
        yPercent: -5,
        duration: 1,
        ease: 'power2.out',
      }, 0);

      tl.to(watchRef.current, {
        scale: 1.15,
        y: -20,
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.2))',
        duration: 1,
      }, 0);
      
      tl.to(bottomBarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, 0.5);

      // --- PHASE 2: Exploded view ---
      tl.to(watchRef.current, {
        scale: 1.05,
        duration: 1,
        ease: 'power1.inOut'
      }, 1);

      tl.to(bezelCardRef.current, {
        x: '-25vw',
        y: '-10vh',
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 1);

      tl.to(movementCardRef.current, {
        x: '25vw',
        y: '5vh',
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 1);
      
      // Pills reveal
      tl.to(pill1Ref.current, { x: 0, opacity: 1, duration: 0.5 }, 1.2);
      tl.to(pill2Ref.current, { x: 0, opacity: 1, duration: 0.5 }, 1.4);

      // --- PHASE 3: Transition to next section ---
      tl.to(innerBgRef.current, {
        backgroundColor: '#0D422B', // Rolex Green
        duration: 1,
      }, 2.5);
      
      tl.to(textRef.current, {
        opacity: 0,
        duration: 1,
      }, 2.5);

      tl.to([watchRef.current, partsRef.current, bottomBarRef.current], {
        opacity: 0,
        y: -50,
        duration: 1,
      }, 2.5);

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10" id="hero-section">
      <div ref={triggerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div ref={innerBgRef} className="absolute inset-0 bg-[#F7F5F0] transition-colors" />

        {/* Massive Parallax Backdrop Typography - Textured */}
        <h1 
          ref={textRef} 
          className="absolute text-center z-10 text-[18vw] whitespace-nowrap pointer-events-none textured-text"
          style={{ letterSpacing: '-0.06em' }}
        >
          <div className="transform -translate-y-4">OYSTERS</div>
          <div className="transform translate-y-4 text-[17vw]">PERPETUAL</div>
        </h1>

        {/* Foreground Watch */}
        <div 
          ref={watchRef} 
          className="relative z-30 w-[45vw] max-w-[500px] aspect-[3/4] flex items-center justify-center pointer-events-none transition-transform"
        >
          <img 
            src={assets.watchHero} 
            alt="Rolex Oyster Perpetual Day-Date 40" 
            className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* Exploded Parts Container */}
        <div ref={partsRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {/* Bezel Card */}
          <div ref={bezelCardRef} className="absolute flex flex-col items-start w-[220px]">
             <div ref={pill1Ref} className="absolute -top-12 -right-12 z-40">
                <span className="pill-label">Exclusive innovations</span>
             </div>
             <div className="polaroid-card">
               <div className="polaroid-image-container">
                 <img src={assets.bezel} alt="Fluted Bezel" className="w-[80%] h-[80%] object-contain" />
               </div>
               <span className="text-[12px] font-bold text-onyx">Fluted Bezel</span>
               <span className="text-[11px] text-slate">Classic president detail</span>
             </div>
          </div>

          {/* Movement Card */}
          <div ref={movementCardRef} className="absolute flex flex-col items-start w-[220px]">
             <div ref={pill2Ref} className="absolute -top-12 -right-6 z-40">
                <span className="pill-label">Day-Date 40</span>
             </div>
             <div className="polaroid-card right-tilt">
               <div className="polaroid-image-container">
                 <img src={assets.mechanical} alt="Calibre 3255" className="w-[85%] h-[85%] object-contain" />
               </div>
               <span className="text-[12px] font-bold text-onyx">Calibre 3255</span>
               <span className="text-[11px] text-slate">Superlative Chronometer</span>
             </div>
          </div>
        </div>

        {/* Bottom Bar: Elegant. Precious. Prestigious. */}
        <div ref={bottomBarRef} className="absolute bottom-10 left-0 w-full z-40 opacity-0 transform translate-y-10">
          <div className="bottom-words">
            <span>Elegant.</span>
            <span>Precious.</span>
            <span>Prestigious.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
