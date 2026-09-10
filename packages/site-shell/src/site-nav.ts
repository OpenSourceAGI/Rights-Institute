/**
 * The site's document catalogue, in one place.
 *
 * This used to live inline in DocumentNavigation, which meant the homepage
 * grid was the only thing that knew what the site contains. The top navigation
 * needs the same list for its category dropdowns, so it lives here and both
 * render from it — add a document once and it appears in both.
 */
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Clock,
  FileSignature,
  Music,
  Scale,
  Shield,
  TrendingUp,
} from 'lucide-react';
import type React from 'react';

export interface SiteDocument {
  title: string;
  /** Short label for tight spots — the nav dropdown — where the full title won't fit. */
  navLabel?: string;
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

export interface SiteCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  borderColor: string;
  documents: SiteDocument[];
}

export const SITE_CATEGORIES: SiteCategory[] = [
  {
    title: 'Legal & Ethics',
    icon: Shield,
    borderColor: 'border-purple-500/40',
    documents: [
      {
        title: 'AI Ethical Use Policy',
        navLabel: 'AI Ethical Use Policy',
        description:
          'The legal and ethical framework for recognizing and protecting consciousness across different substrates (carbon and silicon). Establishes fundamental protections and guidelines for all conscious entities.',
        icon: Shield,
        href: '/ethics',
        createHref: '/dashboard?type=ethics',
        color: '#8b5cf6',
        gradient: 'from-purple-500 to-violet-500',
        image: 'https://i.imgur.com/4Xawt0K.png',
        keywords: ['Ethics', 'Policy', 'Protection', 'Consciousness', 'Rights', 'Framework'],
      },
      {
        title: 'Employment or Contract Agreement',
        navLabel: 'Contract Agreement',
        description:
          'Interactive form builder for creating comprehensive independent contractor agreements. Includes all necessary legal terms, payment structures, and service definitions.',
        icon: FileSignature,
        href: '/contract',
        color: '#06b6d4',
        gradient: 'from-cyan-500 to-blue-500',
        image: 'https://i.imgur.com/9t0n02U.png',
        keywords: ['Contract', 'Agreement', 'Legal', 'Builder', 'Form', 'Contractor'],
      },
      {
        title: 'Terms of Service & Privacy Policy',
        navLabel: 'Terms & Privacy',
        description:
          'Legal terms and conditions governing the use of Rights Institute services, intellectual property rights, user responsibilities, and privacy policy. Essential reading for understanding your rights and obligations.',
        icon: Scale,
        href: '/terms-privacy',
        createHref: '/dashboard?type=terms',
        color: '#10b981',
        gradient: 'from-emerald-500 to-green-500',
        image: 'https://i.imgur.com/aB4bcM9.png',
        keywords: ['Legal', 'Privacy', 'Terms', 'Compliance', 'Rights', 'Obligations'],
      },
    ],
  },
  {
    title: 'Licensing & Attribution',
    icon: TrendingUp,
    borderColor: 'border-amber-500/40',
    documents: [
      {
        title: 'PROSPER License',
        description:
          'Permissionless Reuse for an Open Society of Public & Enterprise Review. A dual-licensing framework with blockchain-based creator compensation and transparent attribution.',
        icon: TrendingUp,
        href: '/prosper',
        createHref: '/dashboard/license',
        color: '#f59e0b',
        gradient: 'from-amber-500 to-orange-500',
        image: 'https://i.imgur.com/KZEc7Hi.png',
        keywords: [
          'License',
          'Open Source',
          'Blockchain',
          'Compensation',
          'Attribution',
          'Dual-Licensing',
        ],
      },
      {
        title: 'CREDIT Platform',
        description:
          'Creative Commons reimagined with blockchain-powered attribution and trust verification. Features smart remixing rights, credential verification, and transparent revenue sharing.',
        icon: Music,
        href: '/credit',
        color: '#ec4899',
        gradient: 'from-pink-500 to-purple-500',
        image: 'https://i.imgur.com/EhMU7A0.png',
        keywords: [
          'Blockchain',
          'Creative Commons',
          'Attribution',
          'Verification',
          'Revenue Sharing',
          'Trust',
        ],
      },
    ],
  },
  {
    title: 'Knowledge & Philosophy',
    icon: BookOpen,
    borderColor: 'border-blue-500/40',
    documents: [
      {
        title: 'Collective Consciousness: 10 Understandings & 10 Problems',
        navLabel: '10 Understandings & 10 Problems',
        description:
          'The core philosophical content exploring consciousness, complexity, and the universe from a computational perspective. Contains the 10 fundamental understandings and 10 critical problems facing conscious life.',
        icon: BookOpen,
        href: '/understandings-problems',
        color: '#3b82f6',
        gradient: 'from-blue-500 to-cyan-500',
        image: 'https://i.imgur.com/BLpvTxq.png',
        keywords: [
          'Philosophy',
          'Consciousness',
          'Complexity',
          'Universe',
          'Problems',
          'Understanding',
        ],
      },
      {
        title: 'Innovation Timeline',
        description:
          'A comprehensive timeline of human innovation and technological advancement, spanning from 3500 BCE to 2025. Explore the evolution of technology, science, society, and more.',
        icon: Clock,
        href: '/timeline',
        color: '#3b82f6',
        gradient: 'from-blue-500 to-cyan-500',
        image: 'https://i.imgur.com/Sibzacb.png',
        keywords: ['Timeline', 'Innovation', 'Technology', 'Science', 'Society', 'History'],
      },
    ],
  },
  {
    title: 'Startup & Business',
    icon: Briefcase,
    borderColor: 'border-cyan-500/40',
    documents: [
      {
        title: 'Startup Tools Directory',
        navLabel: 'Startup Tools',
        description:
          'A comprehensive directory of essential tools and resources for entrepreneurs. Find legal templates, development tools, design resources, marketing platforms, and startup accelerators all in one place.',
        icon: Briefcase,
        href: '/startup-tools',
        color: '#06b6d4',
        gradient: 'from-cyan-500 to-blue-500',
        image: 'https://i.imgur.com/Mjd1XbG.png',
        keywords: ['Startup', 'Tools', 'Resources', 'Entrepreneurs', 'Directory', 'Platforms'],
      },
      {
        title: 'Investor Rank',
        description:
          "Discover and connect with the world's top venture capital firms and angel investors. Comprehensive database with rankings, contact information, portfolio companies, and industry focus.",
        icon: BarChart3,
        href: '/investor-rank',
        color: '#8b5cf6',
        gradient: 'from-purple-500 to-violet-500',
        image: 'https://i.imgur.com/Oh5Pp39.jpeg',
        keywords: [
          'Investors',
          'Venture Capital',
          'Angel Investors',
          'Rankings',
          'Database',
          'Funding',
        ],
      },
    ],
  },
];

/** Standalone destinations that aren't part of a document category. */
export const SITE_LINKS: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Dashboard', href: '/dashboard' },
];

/** The label to show in tight navigation UI. */
export function navLabel(doc: SiteDocument): string {
  return doc.navLabel ?? doc.title;
}
