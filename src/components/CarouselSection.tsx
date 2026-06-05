import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets, watchModels } from '../data';
import { WatchModel } from '../types';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CarouselProps {
  selectedWatch: WatchModel;
  setSelectedWatch: (watch: WatchModel) => void;
}

export default function CarouselSection({ selectedWatch, setSelectedWatch }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const watchImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background transition from Green to Off-White
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'top top',
          scrub: 1,
        },
        backgroundColor: '#F7F5F0',
        duration: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleModelChange = (model: WatchModel) => {
    if (model.id === selectedWatch.id) return;

    gsap.timeline()
      .to(watchImgRef.current, {
        opacity: 0,
        x: -20,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in'
      })
      .call(() => setSelectedWatch(model))
      .set(watchImgRef.current, { x: 20 })
      .to(watchImgRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen py-32 px-6 md:px-20 z-20" style={{ backgroundColor: '#0D422B' }} id="carousel-section">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center h-full">
        
        {/* Left: Presentation Pillow */}
        <div className="relative w-full aspect-square max-h-[700px] flex items-center justify-center">
          <img 
            src={assets.pillow} 
            alt="Leather Cushion" 
            className="absolute w-[85%] h-auto object-contain drop-shadow-2xl z-10"
          />
          <img 
            ref={watchImgRef}
            src={selectedWatch.image} 
            alt={selectedWatch.name} 
            className="absolute w-[65%] h-auto object-contain z-20 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Right: Configurator Sidebar */}
        <div className="flex flex-col w-full max-w-xl xl:pl-16">
          <div className="mb-2">
            <span className="font-heading font-bold text-[13px] text-onyx tracking-wide">Our models</span>
          </div>
          
          <h2 className="text-6xl md:text-[5rem] mb-12 leading-[0.85] flex flex-col items-start gap-1">
            <div className="textured-text text-[6rem]">PURE</div>
            <div className="textured-text-light text-[5rem] -mt-4">BRILLIANCE</div>
          </h2>

          <div className="grid grid-cols-2 gap-6 w-full">
            {watchModels.slice(1).map((model) => (
              <div 
                key={model.id}
                onClick={() => handleModelChange(model)}
                className={`model-card bg-white border ${selectedWatch.id === model.id ? 'border-gold shadow-lg' : 'border-transparent'} p-4 flex flex-col justify-between aspect-[3/4] group relative overflow-hidden`}
              >
                <div className="w-full flex-grow flex items-center justify-center p-2 mb-4 bg-[#F7F5F0]">
                  <img src={model.image} alt={model.name} />
                </div>
                
                <div className="flex flex-col gap-1 z-10 bg-white">
                  <span className="font-body text-[11px] font-medium text-slate">{model.subtitle}</span>
                  <h3 className="font-heading font-semibold text-[13px] leading-tight text-onyx">{model.name}</h3>
                  <span className="font-body text-[12px] text-slate mt-1">{model.price}</span>
                </div>

                {selectedWatch.id !== model.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F7F5F0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-onyx" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-end w-full">
             <button className="w-12 h-12 rounded-full border border-slate/30 flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                <ArrowRight className="w-5 h-5 text-onyx" strokeWidth={1.5} />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
