import React from 'react';

/**
 * Full-bleed image banner with a gradient overlay and floating particles,
 * shared by the homepage and the docs landing page.
 */
const HeroBanner: React.FC = () => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl h-48 sm:h-64 md:h-80">
      {/* Background Image with Subtle Effects */}
      <div className="absolute inset-0">
        <img
          src="https://i.imgur.com/qyHaHQB.jpeg"
          alt="Rights Institute"
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
      </div>
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-2xl"></div>
    </div>
  );
};

export default HeroBanner;
