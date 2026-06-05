import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function BoxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const boxRef = useRef<HTMLImageElement>(null);
  const watchRef = useRef<HTMLImageElement>(null);
  
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set(containerRef.current, { backgroundColor: '#1A1A1A' });
      tl.to(containerRef.current, {
        backgroundColor: '#F7F5F0',
        duration: 0.5,
      }, 0);

      // --- PHASE 1: Setup ---
      // Box stays fixed in the middle
      gsap.set(boxRef.current, { scale: 0.9, opacity: 0 });
      // Watch starts high up (offscreen or top of screen)
      gsap.set(watchRef.current, { yPercent: -150, scale: 1.2, opacity: 0 });
      gsap.set(textContainerRef.current, { opacity: 0, scale: 0.95 });

      // Box appears
      tl.to(boxRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.2);

      // Watch scrolls down from top to sit right above the box cushion
      tl.to(watchRef.current, {
        yPercent: -10, // Just above center
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))',
      }, 0.2);

      // --- PHASE 2: Watch sinks into box ---
      tl.to(watchRef.current, {
        yPercent: 0,
        scale: 0.45, // Shrink to fit inside box
        duration: 1.2,
        ease: 'power1.inOut',
        filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.8))',
      }, 1.2);

      // --- PHASE 3: Massive wrapped text reveal ---
      tl.to(textContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      }, 2.0);

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-40" id="box-section">
      <div ref={triggerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* The Massive Slogan that wraps around */}
        <div 
          ref={textContainerRef}
          className="absolute inset-0 flex items-center justify-center w-full h-full z-10 pointer-events-none"
        >
          <h2 className="textured-text text-[10vw] leading-[0.85] text-center flex flex-col">
            <div className="flex justify-between w-full px-[5vw]">
              <span>TURNING</span>
              <span>EVERY DAY</span>
            </div>
            <div className="flex justify-between w-full px-[5vw] my-2">
              <span>INTO A</span>
              <span>PROMISE FOR</span>
            </div>
            <div className="flex justify-between w-full px-[15vw]">
              <span>THE</span>
              <span>FUTURE.</span>
            </div>
          </h2>
        </div>

        {/* Watch Box Assembly */}
        <div className="relative w-[80vw] max-w-[600px] aspect-square flex items-center justify-center z-20">
          
          <img 
            ref={boxRef}
            src={assets.box} 
            alt="Rolex Box" 
            className="absolute w-[70%] h-auto object-contain filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.3)] z-10"
          />
          
          <img 
            ref={watchRef}
            src={assets.watchHero} 
            alt="Rolex Day-Date" 
            className="absolute w-[60%] h-auto object-contain z-20"
            style={{ transformOrigin: 'center center' }} 
          />
          
        </div>

      </div>
    </div>
  );
}
