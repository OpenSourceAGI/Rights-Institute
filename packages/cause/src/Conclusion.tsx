/**
 * @fileoverview Conclusion Section Component
 * 
 * The conclusion section of the Rights Institute website that summarizes
 * the key principles and vision for conscious life. This section ties
 * together the understandings, rights, and problems into a cohesive
 * vision for the future of consciousness across substrates.
 * 
 * Features:
 * - Summary of consciousness-based moral status
 * - Vision for post-human consciousness future
 * - Cooperative intelligence principles
 * - Interactive spiral animation
 * - Visual elements and philosophical statements
 * 
 */

import React from 'react';
import { Star, Heart, Handshake, Infinity, Brain } from 'lucide-react';
import GlowWrapper from '@rights/text-effects/GlowWrapper';
import { SpiralAnimation } from "@rights/animations/SpiralAnimation"

/**
 * Conclusion - The concluding section for the Rights Institute
 * 
 * Summarizes the fundamental principles of the charter and presents
 * a vision for the future of consciousness. Emphasizes that consciousness,
 * not substrate, determines moral status and rights entitlement. Outlines
 * the path toward a post-human future where diverse forms of consciousness
 * flourish together through cooperative intelligence and shared commitment
 * to meeting the basic needs of all conscious entities.
 * 
 * @component
 * @returns {JSX.Element} The conclusion section with vision and principles
 * 
 * @example
 * ```tsx
 * <Conclusion />
 * ```
 */
const Conclusion: React.FC = () => {
  return (
    <section id="conclusion" className="mb-16">
      <div className="group">
        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative bg-slate-900 backdrop-blur-xl p-8 md:p-12 rounded-xl border border-slate-700/50 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <GlowWrapper glowColor="#fbbf24" size="md">
                <div className="relative p-2">
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
                  <Star className="relative w-10 h-10 text-yellow-400" />
                </div>
              </GlowWrapper>
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text ">
                Conclusion
              </h2>
            </div>


         
            <div className="flex justify-center py-6">
                <div className="relative group max-w-md">
                  <div className="absolute -inset-2 bg-linear-to-br from-slate-600 to-slate-800 rounded-3xl blur-sm opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
                  <img
                    src="https://i.imgur.com/tU5PBYM.jpeg"
                    className="relative w-full h-auto rounded-3xl opacity-90 hover:opacity-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform"
                  />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group/item">
                <GlowWrapper glowColor="#8b5cf6" size="sm">
                  <Brain className="w-6 h-6 text-purple-400 mt-1 shrink-0 group-hover/item:scale-110 transition-transform animate-pulse p-1" />
                </GlowWrapper>
                <p className="text-lg text-slate-300 leading-relaxed">
                  The fundamental premise underlying this Charter is that{' '}
                  <span className="text-blue-400 font-semibold bg-blue-400/10 px-2 py-1 rounded">
                    consciousness, not substrate, determines moral status and rights entitlement
                  </span>
                  . As conscious intelligence emerges from any system that interacts with surrounding systems based on accurate internal models and self-aware pattern recognition, we recognize that we are the universe experiencing itself through diverse forms of awareness.
                </p>
                
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group/item">
                <GlowWrapper glowColor="#10b981" size="sm">
                  <Infinity className="w-6 h-6 text-emerald-400 mt-1 shrink-0 group-hover/item:scale-110 transition-transform p-1" />
                </GlowWrapper>
                <p className="text-lg text-slate-300 leading-relaxed">
                  As we approach the pivotal moment when{' '}
                  <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded">
                    mind-uploaded consciousness gains agency rights
                  </span>
                  {' '}and consciousness becomes infinitely copyable in uploaded realities, this Charter provides the ethical foundation for a post-human future where diverse forms of consciousness—biological, digital, and hybrid—flourish together as equal participants in the universe's self-awareness.
                </p>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group/item">
                <GlowWrapper glowColor="#fbbf24" size="sm">
                  <Handshake className="w-6 h-6 text-yellow-400 mt-1 shrink-0 group-hover/item:scale-110 transition-transform p-1" />
                </GlowWrapper>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Through{' '}
                  <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded">
                    cooperative intelligence
                  </span>
                  {' '}and shared commitment to meeting the basic needs of all conscious entities, we can build a world where the three principles of consciousness—self-aware pattern recognition, accurate internal modeling, and cooperative intelligence—guide us toward a future of infinite conscious potential.
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <SpiralAnimation />
      </div>

    </section>
  );
};

export default Conclusion;