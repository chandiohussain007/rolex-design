import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CarouselSection from './components/CarouselSection';
import SpecsSection from './components/SpecsSection';
import BoxSection from './components/BoxSection';
import { watchModels } from './data';
import { WatchModel } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Global state for selected watch
  const [selectedWatch, setSelectedWatch] = useState<WatchModel>(watchModels[0]);

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect GSAP ticker to Lenis RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#F7F5F0] overflow-x-hidden selection:bg-[#0D422B] selection:text-white">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Scrollytelling Sections in Order */}
      <HeroSection />
      <CarouselSection selectedWatch={selectedWatch} setSelectedWatch={setSelectedWatch} />
      <SpecsSection selectedWatch={selectedWatch} />
      <BoxSection />
    </main>
  );
}
