/**
 * @fileoverview Header Section Component
 * 
 * The main header section of the Rights Institute website that introduces
 * the CAUSE concept with interactive animations and visual effects.
 * Features include:
 * - Globe animation with philosophical statement
 * - Quantum geometry visualization
 * - Particle text effects
 * - Responsive design with dynamic font sizing
 * - Embossed visual styling
 * 

 */

'use client'

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import QuantumGeometry  from '../Animations/QuantumGeometry';
import { Globe } from "../Animations/GlobeAnimation"

import GlowWrapper from '../TextEffects/GlowWrapper';
import VaporizeTextCycle, { Tag } from '../TextEffects/VaporizeText';
import { ParticleTextEffect } from "../TextEffects/ParticleText";

/**
 * Header - The main header section for the Rights Institute
 * 
 * Introduces the CAUSE concept with "Dream Emerges Destiny" and
 * "Common Agreements & Understandings by and for Self-Aware Emergence".
 * Features multiple interactive animations including a globe, quantum
 * geometry, and particle text effects that create an immersive
 * introduction to the website's philosophy.
 * 
 * @component
 * @returns {JSX.Element} The header section with animations and title content
 * 
 * @example
 * ```tsx
 * <Header />
 * ```
 */
const Header: React.FC = () => {
  const [fontSize, setFontSize] = useState("50rem");

  
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 768) {
        setFontSize("20rem"); // Mobile
      } else if (window.innerWidth < 1024) {
        setFontSize("40rem"); // Tablet
      } else {
        setFontSize("60rem"); // Desktop
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    <div className="relative">
      {/* Globe Animation at the top */}
      <div className="flex justify-center mb-4">
        <GlowWrapper glowColor="#10b981" size="lg" className="rounded-lg">
      <div className="relative flex size-full max-w-2xl items-center justify-center overflow-visible rounded-lg border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl px-8 pb-8 pt-8 md:shadow-xl">
        <span className=" whitespace-pre-wrap bg-linear-to-b from-blue-600 to-black-500 bg-clip-text text-center text-2xl font-semibold leading-none tracking-wider z-10 relative" style={{ fontVariant: 'small-caps', fontSize: '1.2rem' }}>
        Dream Emerges Destiny
        </span>
        <Globe className="top-0 scale-125" />
        <div className=" absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.05),rgba(255,255,255,0))]" />
      </div>
    </GlowWrapper>
      </div>

        <QuantumGeometry 
          autoRandomize={true}
        />

          {/* Glow effect */}
          
          {/* Embossed card container */}
            {/* Embossed inner effect */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-300/10 to-slate-600/10 rounded-3xl blur-sm transform scale-105"></div>
            <div className="absolute inset-0 bg-linear-to-tl from-slate-100/5 to-transparent rounded-3xl"></div>
            
            {/* Content container with embossed styling */}
          
              <ParticleTextEffect words={
                ["CAUSE", "Common Agreements & Understandings", 
                "by and for Self-Aware Emergence", "🧬 Carbon + 🤖 Silicon"]
                } />
                {/* <VaporizeTextCycle
                  texts={["CAUSE", "Common Agreements & Understandings", "by and for Self-Aware Emergence", "🧬 Carbon + 🤖 Silicon"]}
                  font={{
                    fontFamily: "sans-serif",
                    fontSize: fontSize,
                    fontWeight: 700,
                  }}
                  color="rgb(147, 197, 253)"
                  spread={3}
                  density={4}
                  animation={{
                    vaporizeDuration: 3,
                    fadeInDuration: 2,
                    waitDuration: 1,
                  }}
                  direction="left-to-right"
                  alignment="center"
                  tag={Tag.H3}
                /> */}
              
              {/* Embossed subtitle */}
              
    </div>
  );
};

export default Header;