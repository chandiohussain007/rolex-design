import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { specFeatures } from '../data';
import { WatchModel } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface SpecsProps {
  selectedWatch: WatchModel;
}

export default function SpecsSection({ selectedWatch }: SpecsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const watchImgRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    lineRefs.current = lineRefs.current.slice(0, specFeatures.length);
    dotRefs.current = dotRefs.current.slice(0, specFeatures.length);
    labelRefs.current = labelRefs.current.slice(0, specFeatures.length);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set(labelRefs.current, { opacity: 0, scale: 0.9 });
      gsap.set(dotRefs.current, { scale: 0, opacity: 0 });

      lineRefs.current.forEach((line) => {
        if (!line) return;
        const length = 1000;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });

      // Adjust scale based on image type (dial vs full watch)
      const targetScale = selectedWatch.id === 'green-gold' ? 1.5 : 2.2;

      tl.fromTo(watchImgRef.current, 
        { scale: 1 }, 
        { scale: targetScale, duration: 1, ease: 'power2.inOut' }
      );

      specFeatures.forEach((feature, i) => {
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        const label = labelRefs.current[i];
        
        const startTime = 1 + (i * 0.15); 

        tl.to(dot, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, startTime);
        tl.to(line, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, startTime + 0.1);
        tl.to(label, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, startTime + 0.3);
      });

      tl.to({}, { duration: 0.5 });

    }, triggerRef);

    return () => ctx.revert();
  }, [selectedWatch.id]); // Re-run animation if watch changes

  return (
    <div ref={containerRef} className="relative w-full bg-[#1A1A1A] text-white z-30" id="specs-section">
      <div ref={triggerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] to-[#111111]" />

        <div className="relative w-[50vw] max-w-[600px] aspect-square flex items-center justify-center">
          
          <img 
            ref={watchImgRef}
            src={selectedWatch.macroImage} 
            alt={`${selectedWatch.name} Close-up`} 
            className="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10"
          />

          <svg 
            ref={svgRef}
            className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {specFeatures.map((feature, i) => (
              <g key={`svg-${feature.id}`}>
                <line
                  ref={el => lineRefs.current[i] = el}
                  x1={`${feature.dotX}%`}
                  y1={`${feature.dotY}%`}
                  x2={`${feature.labelX}%`}
                  y2={`${feature.labelY}%`}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.2"
                />
                <circle
                  ref={el => dotRefs.current[i] = el}
                  cx={`${feature.dotX}%`}
                  cy={`${feature.dotY}%`}
                  r="0.8"
                  fill="#C5A059"
                  className="filter drop-shadow-[0_0_5px_rgba(197,160,89,0.8)]"
                />
              </g>
            ))}
          </svg>

          <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
            {specFeatures.map((feature, i) => {
              const isLeft = feature.side === 'left';
              return (
                <div
                  key={`label-${feature.id}`}
                  ref={el => labelRefs.current[i] = el}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${feature.labelX}%`,
                    top: `${feature.labelY}%`,
                    transform: `translate(${isLeft ? '-100%' : '0%'}, -50%)`,
                    padding: isLeft ? '0 10px 0 0' : '0 0 0 10px',
                  }}
                >
                  <div className="hotspot-label group">
                    <span className="tracking-wide group-hover:text-white transition-colors">{feature.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
