'use client'

import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Understandings from './Understandings';
import Implementation from './Problems';
import Preparation from './Preparation';
import Conclusion from './Conclusion';
import Footer from '@rights/site-shell/Footer';
import GameOfLife from '@rights/animations/GameOfLife';

function CAUSEMainPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [colorSeed, setColorSeed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const pendingScroll = useRef({ progress: 0, seed: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      pendingScroll.current = {
        progress: docHeight > 0 ? scrollTop / docHeight : 0,
        seed: scrollTop * 0.002,
      };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollProgress(pendingScroll.current.progress);
          setColorSeed(pendingScroll.current.seed);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const getBackgroundStyle = () => {
    const offset1 = Math.sin(colorSeed * 0.1) * 10;
    const offset2 = Math.cos(colorSeed * 0.1) * 8;
    const hue1 = (scrollProgress * 60 + offset1 + 220) % 360;
    const hue2 = (scrollProgress * 40 + offset2 + 280) % 360;
    const sat1 = 8 + Math.sin(colorSeed * 0.2) * 2;
    const sat2 = 6 + Math.cos(colorSeed * 0.1) * 2;
    const light1 = 2 + Math.cos(colorSeed * 0.1) * 1;
    const light2 = 1.5 + Math.sin(colorSeed * 0.2) * 1;

    return {
      background: `
        radial-gradient(ellipse at ${40 + Math.sin(colorSeed) * 5}% ${50 + Math.cos(colorSeed * 0.1) * 8}%,
          hsl(${hue1}, ${sat1}%, ${light1}%) 0%, transparent 80%),
        radial-gradient(ellipse at ${60 + Math.cos(colorSeed * 0.1) * 5}% ${50 + Math.sin(colorSeed * 0.05) * 8}%,
          hsl(${hue2}, ${sat2}%, ${light2}%) 0%, transparent 70%),
        linear-gradient(${135 + Math.sin(colorSeed) * 10}deg,
          hsl(${hue1}, 10%, 1.5%) 0%,
          hsl(${hue2}, 8%, 1%) 50%,
          hsl(${(hue1 + hue2) / 2}, 5%, 0.5%) 100%
        )
      `,
    };
  };

  const getParticleStyle = () => {
    const time = colorSeed;
    const hue1 = (time * 8 + 200) % 360;
    const hue2 = (time * 6 + 120) % 360;
    return {
      background: `
        radial-gradient(circle at ${40 + scrollProgress * 30 + Math.sin(time * 0.1) * 10}% ${50 + scrollProgress * 20 + Math.cos(time * 0.05) * 8}%,
          hsla(${hue1}, 20%, 15%, 0.015) 0%, transparent 60%),
        radial-gradient(circle at ${60 + scrollProgress * 40 + Math.cos(time * 0.1) * 12}% ${50 + scrollProgress * 15 + Math.sin(time * 0.1) * 10}%,
          hsla(${hue2}, 18%, 12%, 0.012) 0%, transparent 60%)
      `,
      backgroundSize: `
        ${150 + Math.sin(time) * 20}px ${120 + Math.cos(time * 0.1) * 15}px,
        ${130 + Math.cos(time * 0.1) * 18}px ${110 + Math.sin(time * 0.05) * 12}px
      `,
    };
  };

  const getOverlayStyle = () => {
    const time = colorSeed;
    const hue1 = (time * 12 + 180) % 360;
    const hue2 = (time * 10 + 270) % 360;
    return {
      background: `
        radial-gradient(circle at ${30 + scrollProgress * 8 + Math.sin(time * 0.1) * 6}% ${40 + scrollProgress * 6 + Math.cos(time * 0.1) * 5}%,
          hsla(${hue1}, 15%, 20%, 0.008) 0%, transparent 70%),
        radial-gradient(circle at ${70 - scrollProgress * 8 + Math.cos(time * 0.05) * 5}% ${60 - scrollProgress * 6 + Math.sin(time * 0.1) * 4}%,
          hsla(${hue2}, 18%, 18%, 0.006) 0%, transparent 70%)
      `,
    };
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-100 bg-black">
      {/* Dynamic background on its own fixed layer — keeps root div static so no full-page repaint */}
      <div className="fixed inset-0 z-0" style={getBackgroundStyle()} />
      <div className="fixed inset-0 bg-slate-900/60 z-0" />

      {/* Subtle effect overlays — skip on mobile to reduce paint cost */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-8" style={getOverlayStyle()} />
          <div className="absolute inset-0 opacity-4" style={getParticleStyle()} />
        </div>
      )}

      <div className="relative z-10">
        <Navigation />

        <div
          className="relative overflow-hidden"
          style={{ minHeight: isMobile ? '40vh' : '60vh' }}
        >
          {/* Skip canvas animation on mobile — too expensive on low-power devices */}
          {!isMobile && (
            <GameOfLife
              opacity={0.9}
              blur={0.2}
              delay={2.5}
              scrollProgress={scrollProgress}
            />
          )}
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-4">
            <Header />
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pb-8">
          <Understandings />
          <Implementation />
          <Preparation />
          <Conclusion />
          <Footer />
        </article>
      </div>
    </div>
  );
}

export default CAUSEMainPage;
