/**
 * @fileoverview Document Navigation Component
 * 
 * A navigation page with buttons linking to different documents:
 * - CAUSE (main homepage)
 * - Terms of Service
 * - Privacy Policy
 * 
 * Features:
 * - Interactive buttons with icons
 * - Hover effects and animations
 * - Responsive design
 * - Glow effects and visual feedback
 */

'use client';

import React from 'react';
import Footer from './Footer';
import { useSession, signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { AuthButton } from '../Auth/AuthButton';

import {
  FileText,
  Shield,
  Lock,
  Home,
  ArrowRight,
  BookOpen,
  Scale,
  Eye,
  TrendingUp,
  FileSignature,
  Music,
  Coins,
  Clock,
  Briefcase,
  BarChart3
} from 'lucide-react';

interface DocumentButtonProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  createHref?: string;
  color: string;
  gradient: string;
  image: string;
  keywords: string[];
  showActions?: boolean;
}

const DocumentButton: React.FC<DocumentButtonProps> = ({
  title,
  description,
  icon: Icon,
  href,
  createHref,
  color,
  gradient,
  image,
  keywords,
  showActions = false
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateCustom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const targetUrl = createHref || '/dashboard';

    if (session) {
      router.push(targetUrl);
    } else {
      signIn.social({ provider: 'google', callbackURL: targetUrl });
    }
  };

  return (

    <div
      onClick={() => router.push(href)}
      className="relative h-full cursor-pointer group"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
      <div className="relative h-full bg-slate-900 backdrop-blur-xl p-6 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 rounded-xl shadow-xl hover:shadow-2xl">
        <div className="flex items-start gap-4">
          {/* Image Section */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute inset-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-lg blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-7 h-7 text-slate-200" />
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors duration-300">
                {title}
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              {description}
            </p>

            {/* Action Buttons */}
            {showActions && (
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleCreateCustom}
                  className="relative inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 text-white font-semibold shadow-md transition-all duration-200 group/button overflow-hidden"
                >
                  <span className="z-10">Create Custom</span>
                  <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover/button:opacity-20 transition-opacity duration-300 rounded-lg"></span>
                </button>

                <a
                  href={href}
                  onClick={(e) => e.stopPropagation()}
                  className="relative inline-flex items-center px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 text-slate-100 font-semibold shadow-md transition-all duration-200 group/button overflow-hidden"
                >
                  <span className="z-10">Example Demo</span>
                  <span className="absolute inset-0 bg-slate-600 opacity-0 group-hover/button:opacity-20 transition-opacity duration-300 rounded-lg"></span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * DocumentNavigation - Main navigation page for different documents
 * 
 * Provides a clean interface for navigating between different
 * documents and sections of the Rights Institute. Each document
 * is presented as an interactive card with icons, descriptions,
 * and smooth hover animations.
 * 
 * @component
 * @returns {JSX.Element} The document navigation interface
 * 
 * @example
 * ```tsx
 * <DocumentNavigation />
 * ```
 */
const DocumentNavigation: React.FC = () => {
  const documents = [

    {
      title: 'Employment or Contract Agreement ',
      description: 'Interactive form builder for creating comprehensive independent contractor agreements. Includes all necessary legal terms, payment structures, and service definitions.',
      icon: FileSignature,
      href: '/contract',
      createHref: '/dashboard?type=contract',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
      image: 'https://i.imgur.com/9t0n02U.png',
      keywords: ['Contract', 'Agreement', 'Legal', 'Builder', 'Form', 'Contractor']
    },
    {
      title: 'Terms of Service & Privacy Policy',
      description: 'Legal terms and conditions governing the use of Rights Institute services, intellectual property rights, user responsibilities, and privacy policy. Essential reading for understanding your rights and obligations.',
      icon: Scale,
      href: '/terms-privacy',
      createHref: '/dashboard?type=terms',
      color: '#10b981',
      gradient: 'from-emerald-500 to-green-500',
      image: 'https://i.imgur.com/aB4bcM9.png',
      keywords: ['Legal', 'Privacy', 'Terms', 'Compliance', 'Rights', 'Obligations']
    },
    {
      title: 'AI Ethical Use Policy',
      description: 'The legal and ethical framework for recognizing and protecting consciousness across different substrates (carbon and silicon). Establishes fundamental protections and guidelines for all conscious entities.',
      icon: Shield,
      href: '/ethics',
      createHref: '/dashboard?type=ethics',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-violet-500',
      image: 'https://i.imgur.com/4Xawt0K.png',
      keywords: ['Ethics', 'Policy', 'Protection', 'Consciousness', 'Rights', 'Framework']
    },
    {
      title: 'PROSPER License',
      description: 'Permissionless Reuse for an Open Society of Public & Enterprise Review. A dual-licensing framework with blockchain-based creator compensation and transparent attribution.',
      icon: TrendingUp,
      href: '/prosper',
      createHref: '/dashboard/license',
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-500',
      image: 'https://i.imgur.com/KZEc7Hi.png',
      keywords: ['License', 'Open Source', 'Blockchain', 'Compensation', 'Attribution', 'Dual-Licensing']
    },
    {
      title: 'CREDIT Platform',
      description: 'Creative Commons reimagined with blockchain-powered attribution and trust verification. Features smart remixing rights, credential verification, and transparent revenue sharing.',
      icon: Music,
      href: '/credit',
      color: '#ec4899',
      gradient: 'from-pink-500 to-purple-500',
      image: 'https://i.imgur.com/EhMU7A0.png',
      keywords: ['Blockchain', 'Creative Commons', 'Attribution', 'Verification', 'Revenue Sharing', 'Trust']
    },
    {
      title: '10 Understandings & 10 Problems',
      description: 'The core philosophical content exploring consciousness, complexity, and the universe from a computational perspective. Contains the 10 fundamental understandings and 10 critical problems facing conscious life.',
      icon: BookOpen,
      href: '/understandings-problems',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://rights.institute/logo.png',
      keywords: ['Philosophy', 'Consciousness', 'Complexity', 'Universe', 'Problems', 'Understanding']
    },
    {
      title: 'Startup Tools Directory',
      description: 'A comprehensive directory of essential tools and resources for entrepreneurs. Find legal templates, development tools, design resources, marketing platforms, and startup accelerators all in one place.',
      icon: Briefcase,
      href: '/startup-tools',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
      image: 'https://i.imgur.com/Mjd1XbG.png',
      keywords: ['Startup', 'Tools', 'Resources', 'Entrepreneurs', 'Directory', 'Platforms']
    },
    {
      title: 'Investor Rank',
      description: 'Discover and connect with the world\'s top venture capital firms and angel investors. Comprehensive database with rankings, contact information, portfolio companies, and industry focus.',
      icon: BarChart3,
      href: '/investor-rank',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-violet-500',
      image: 'https://i.imgur.com/Oh5Pp39.jpeg',
      keywords: ['Investors', 'Venture Capital', 'Angel Investors', 'Rankings', 'Database', 'Funding']
    },

    {
      title: 'Innovation Timeline',
      description: 'A comprehensive timeline of human innovation and technological advancement, spanning from 3500 BCE to 2025. Explore the evolution of technology, science, society, and more.',
      icon: Clock,
      href: '/timeline',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://i.imgur.com/Sibzacb.png',
      keywords: ['Timeline', 'Innovation', 'Technology', 'Science', 'Society', 'History']
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      {/* Floating Google Sign-in Button */}
      <div className="fixed top-4 right-4 z-50">
        <AuthButton />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Heading Art Background */}
        <div className="relative mb-12 overflow-hidden rounded-3xl h-64 md:h-80">
          {/* Background Image with Subtle Effects */}
          <div className="absolute inset-0">
            <img
              src="https://i.imgur.com/qyHaHQB.jpeg"
              alt="Heading Art Background"
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
        {/* Document Navigation Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {documents.map((doc, index) => (
            <DocumentButton
              key={index}
              title={doc.title}
              description={doc.description}
              icon={doc.icon}
              href={doc.href}
              createHref={doc.createHref}
              color={doc.color}
              gradient={doc.gradient}
              image={doc.image}
              keywords={doc.keywords}
              showActions={index < 4}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentNavigation; 