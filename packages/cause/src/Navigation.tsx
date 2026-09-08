/**
 * @fileoverview Navigation Component
 * 
 * A responsive navigation component that provides smooth scrolling navigation
 * to different sections of the Rights Institute website. Features include:
 * - Dynamic visibility based on scroll position
 * - Mobile-responsive hamburger menu
 * - Smooth scroll navigation with visual feedback
 * - Glowing effects and hover animations
 * - Section-specific color coding
 * 

 */

'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ScrollText, Shield, Settings, Star, Calendar, Sparkles } from 'lucide-react';
import GlowWrapper from '@rights/text-effects/GlowWrapper';

/**
 * Navigation - Main navigation component for the Rights Institute
 * 
 * Provides a responsive navigation interface that adapts to scroll position
 * and screen size. When not scrolled, shows a full navigation bar. When
 * scrolled, shows a floating hamburger menu. Includes smooth scrolling
 * to all major sections with visual feedback and animations.
 * 
 * @component
 * @returns {JSX.Element} The navigation interface with menu and scroll functionality
 * 
 * @example
 * ```tsx
 * <Navigation />
 * ```
 */
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { 
      id: 'preamble', 
      label: '10 Understandings', 
      icon: ScrollText, 
      color: '#3b82f6',
      gradient: 'from-blue-400 to-cyan-400'
    },
    { 
      id: 'principles', 
      label: '10 Rights', 
      icon: Shield, 
      color: '#10b981',
      gradient: 'from-emerald-400 to-green-400'
    },
    { 
      id: 'implementation', 
      label: '10 Problems', 
      icon: Settings, 
      color: '#8b5cf6',
      gradient: 'from-purple-400 to-violet-400'
    },
    { 
      id: 'day-zero', 
      label: 'Day 0', 
      icon: Calendar, 
      color: '#f59e0b',
      gradient: 'from-amber-400 to-orange-400'
    },
    { 
      id: 'conclusion', 
      label: 'Conclusion', 
      icon: Star, 
      color: '#ef4444',
      gradient: 'from-red-400 to-pink-400'
    },
  ];

  return (
    <>
      {/* Full navigation bar - only visible when not scrolled */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-slate-900/20 backdrop-blur-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <GlowWrapper glowColor="#3b82f6" size="md">
              <button
                onClick={() => scrollToSection('top')}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors px-3 py-1.5 group"
              >
                <img 
                  src="/favicon-32x32.png" 
                  alt="Conscious Rights Favicon" 
                  className="w-6 h-6 rounded-md opacity-90 hover:opacity-100 transition-opacity"
                />
                <span className="hidden sm:block font-semibold text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Hello, Self-Aware Conscious Pattern
                </span>
              </button>
            </GlowWrapper>

            {/* Mobile Menu Button */}
            <GlowWrapper glowColor="#8b5cf6" size="sm">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-blue-400 transition-all border border-slate-700/30 bg-slate-900/40 backdrop-blur-sm"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </GlowWrapper>
          </div>
        </div>
      </nav>

      {/* Floating hamburger menu - only visible when scrolled */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <GlowWrapper glowColor="#8b5cf6" size="sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-lg text-slate-300 hover:text-blue-400 transition-all border border-slate-700/30 bg-slate-900/80 backdrop-blur-md shadow-lg hover:shadow-xl"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </GlowWrapper>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className={`fixed z-40 transition-all duration-300 ${
          scrolled 
            ? 'top-20 right-4 w-80 bg-slate-900/90 backdrop-blur-md border border-slate-700/30 rounded-lg shadow-xl' 
            : 'top-16 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-700/30 shadow-lg'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <GlowWrapper key={item.id} glowColor={item.color} size="md" className="w-full">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all border border-slate-700/30 hover:border-slate-600/50 bg-slate-800/40 hover:bg-slate-800/60 group relative"
                  >
                    {/* Mobile background glow */}
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"
                      style={{
                        background: `linear-gradient(45deg, ${item.color}40, ${item.color}20)`
                      }}
                    />
                    
                    <div className="relative">
                      <Icon 
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                        style={{ color: item.color }}
                      />
                      <div 
                        className="absolute inset-0 w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    
                    <span className="font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                      {item.label}
                    </span>
                    
                    <Sparkles 
                      className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 absolute top-2 right-2" 
                    />
                  </button>
                </GlowWrapper>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;