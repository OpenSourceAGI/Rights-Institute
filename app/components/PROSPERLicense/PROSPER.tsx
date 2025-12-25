'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { grab } from 'grab-api.js';
import codecraftStudioData, { sampleLicenseDataByToken } from '../../sample-data/codecraft-studio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import {
  FileText,
  Copyright,
  Scale,
  Users,
  Coins,
  Shield,
  BookOpen,
  Menu,
  X,
  Copy,
  Check,
  Calendar,
  User,
  Mail,
  FolderOpen,
  Hash,
  Key,
  Building2,
  Code,
  Palette,
  FileCode,
  TestTube,
  Zap,
  Globe,
  Star,
  Download,
  Home,
  Share2
} from 'lucide-react';

const sections = [
  { id: 'terms', title: 'License Terms', icon: FileText },
  { id: 'preamble', title: 'Preamble', icon: BookOpen },
  { id: 'dual-licensing', title: 'Dual Licensing Structure', icon: Scale },
  { id: 'prosper-credit', title: 'PROSPER Credit System', icon: Coins },
  { id: 'attribution', title: 'Attribution Requirements', icon: Users },
  { id: 'patent', title: 'Patent Protection', icon: Shield },
  { id: 'understanding', title: 'Understanding PROSPER', icon: BookOpen },
];

// Role icons mapping
const roleIcons = {
  'Lead Developer': Code,
  'UI/UX Designer': Palette,
  'Documentation': FileCode,
  'Testing': TestTube,
  'Maintainer': User,
  'Contributor': User,
  'Sponsor': Building2,
  'Organization': Building2,
};

interface PROSPERLicenseProps {
  sampleSlug?: string;
}

export default function PROSPERLicense({ sampleSlug = 'codecraft-studio' }: PROSPERLicenseProps) {
  const [activeSection, setActiveSection] = useState('terms');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copyrightCopied, setCopyrightCopied] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToken, setProjectToken] = useState(null);
  const router = useRouter();

  // Get sample data based on slug
  const sampleData = sampleLicenseDataByToken[sampleSlug] || sampleLicenseDataByToken['codecraft-studio'];

  // Use sample data values
  const year = sampleData.config.defaultYear;
  const fullname = sampleData.authors[0]?.name || 'Jane Developer';
  const contact = sampleData.authors[0]?.email || 'jane@example.com';
  const projectName = sampleData.config.defaultProjectName;
  const projectId = sampleData.config.defaultProjectId;
  const hashKey = sampleData.config.defaultHashKey;
  const appName = sampleData.config.defaultAppName;
  const logoUrl = sampleData.config.defaultLogoUrl;

  // Get project token from URL path (client-side routing)
  const [urlToken, setUrlToken] = useState<string | null>(null);

  useEffect(() => {
    // Parse token from URL path
    const parseToken = () => {
      const pathname = window.location.pathname;
      const tokenMatch = pathname.match(/\/prosper\/([a-zA-Z0-9]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;
      setUrlToken(token);
    };

    // Parse initial token
    parseToken();

    // Listen for browser navigation (back/forward buttons)
    window.addEventListener('popstate', parseToken);

    return () => {
      window.removeEventListener('popstate', parseToken);
    };
  }, []);

  // Use sample data for authors and organizations
  const authors = sampleData.authors;
  const organizations = sampleData.organizations;

  const openEntityModal = (entity) => {
    setSelectedEntity(entity);
    setIsModalOpen(true);
  };

  const handleProjectClick = (projectName) => {
    // Generate a random token
    const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Navigate to the project license page using client-side routing
    window.history.pushState({}, '', `/prosper/${randomToken}`);
    // Update the URL token state
    setUrlToken(randomToken);
  };

  // Generate comprehensive copyright text
  const generateCopyrightText = () => {
    const individualAuthors = authors.map(author => author.name).join(', ');
    const orgAuthors = organizations.map(org => org.name).join(', ');

    let copyrightText = `© ${year}`;
    if (authors.length > 0) {
      copyrightText += ` ${individualAuthors}`;
    }
    if (organizations.length > 0) {
      copyrightText += authors.length > 0 ? `, ${orgAuthors}` : ` ${orgAuthors}`;
    }

    return copyrightText;
  };

  // Generate hash key with "cred" instead of "sha256"
  const generateHashKey = () => {
    return hashKey.replace('sha256:', 'by:');
  };

  const copyrightText = generateCopyrightText();
  const hashKeyText = generateHashKey();

  const copyToClipboard = async () => {
    try {
      const fullText = `${copyrightText}\n${hashKeyText}`;
      await navigator.clipboard.writeText(fullText);
      setCopyrightCopied(true);
      setTimeout(() => setCopyrightCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyHashKey = async () => {
    try {
      await navigator.clipboard.writeText(hashKeyText);
      setCopyrightCopied(true);
      setTimeout(() => setCopyrightCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy hash key: ', err);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'terms';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch project data from API when token is present
  useEffect(() => {
    if (urlToken) {
      const fetchProjectData = async () => {
        try {
          const response = await fetch(`/api/project-license/${urlToken}`);
          const data = await response.json();
          // In a real implementation, you would update the component state with the fetched data
          // For now, we'll just log it
        } catch (error) {
          console.error('Error fetching project data:', error);
        }
      };

      fetchProjectData();
    }
  }, [urlToken]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Large Background Text with Shine Effect */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1
            className="text-[20vw] sm:text-[15vw] lg:text-[12vw] font-black text-gray-100/30 select-none transform -rotate-12 tracking-wider relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              backgroundSize: '200% 100%',
              animation: `shine ${codecraftStudioData.backgroundText.shineDuration}s ease-in-out ${codecraftStudioData.backgroundText.shineDelay}s infinite`
            }}
          >
            {codecraftStudioData.backgroundText.text}
          </h1>
        </div>

        {/* Shine Animation Keyframes */}
        <style jsx>{`
          @keyframes shine {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <a href="/" className="flex items-center space-x-3 group">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-200">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="h-6 w-6 object-contain" />
                    ) : (
                      <Scale className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      {appName} - PROSPER License
                    </h1>
                    <p className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors duration-200">Publishing Rights of Open Source</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Main</span>
                </a>
                <button
                  className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Fixed Icon Sidebar - Always Visible */}
          <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-white/80 backdrop-blur-md border-r border-gray-200/50 flex flex-col items-center py-6 space-y-4 z-40 shadow-sm">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="group relative">
                  <button
                    className={`w-10 h-10 p-0 rounded-lg transition-all duration-200 flex items-center justify-center ${activeSection === section.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-110'
                        : 'hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105 text-gray-600'
                      }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {section.title}
                  </div>
                </div>
              );
            })}
          </aside>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
              <div className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Contents</h2>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          className={`w-full flex items-center justify-start h-auto py-3 px-3 rounded-lg transition-all duration-200 ${activeSection === section.id
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                              : 'hover:bg-indigo-50 hover:text-indigo-600 text-gray-700'
                            }`}
                          onClick={() => scrollToSection(section.id)}
                        >
                          <Icon className="h-4 w-4 mr-3 shrink-0" />
                          <span className="text-left">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 ml-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                  {/* Title Section */}
                  <div className="mb-6 lg:mb-8">
                    <div className="relative w-full max-w-4xl mx-auto">
                      {/* Background Image */}
                      <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src="https://i.imgur.com/I34iD0f.png"
                          alt="PROSPER License Header"
                          className="w-full h-full object-contain object-center transform hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                        {/* Frosted Glass Overlay with Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 lg:p-6 shadow-xl max-w-xl mx-4">
                            <div className="text-center">
                              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2 lg:mb-3 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent transform hover:scale-110 hover:rotate-1 transition-all duration-500 drop-shadow-lg animate-pulse">
                                {appName}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subtitle Below Header */}
                      <div className="text-center mt-6 lg:mt-8">
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto px-4">
                          Permissionless Reuse for an Open Society of Public & Enterprise Review
                        </p>

                      </div>
                    </div>
                  </div>

                  <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  <div className="flex flex-wrap justify-center gap-1 lg:gap-2 mt-3 lg:mt-4 px-2 lg:px-0">
                    <Badge className="bg-emerald-500/20 backdrop-blur-sm text-emerald-700 shadow-lg text-xs px-2 py-1 border border-emerald-500/30 flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      Open Source
                    </Badge>
                    <Badge className="bg-blue-500/20 backdrop-blur-sm text-blue-700 shadow-lg text-xs px-2 py-1 border border-blue-500/30 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Credit Attribution
                    </Badge>
                    <Badge className="bg-green-500/20 backdrop-blur-sm text-green-700 shadow-lg text-xs px-2 py-1 border border-green-500/30 flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      Commercial Friendly
                    </Badge>
                    <Badge className="bg-purple-500/20 backdrop-blur-sm text-purple-700 shadow-lg text-xs px-2 py-1 border border-purple-500/30 flex items-center gap-1">
                      <Coins className="h-3 w-3" />
                      Blockchain Royalties
                    </Badge>
                    <Badge className="bg-orange-500/20 backdrop-blur-sm text-orange-700 shadow-lg text-xs px-2 py-1 border border-orange-500/30 flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      Creative Commons
                    </Badge>
                  </div>
                  {/* License Terms */}
                  <section id="terms" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                      License Terms
                    </h2>

                    {/* Copyright Information */}
                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg mb-6">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {/* Main Copyright */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-2 flex-1">
                              <Copyright className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                              <div className="flex-1 space-y-2">
                                <p className="font-mono text-sm text-gray-800 font-bold break-all leading-relaxed bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-emerald-200 shadow-sm">
                                  {copyrightText}
                                </p>
                                <button
                                  onClick={copyHashKey}
                                  className="font-mono text-xs text-gray-500 break-all leading-relaxed bg-gray-50/60 backdrop-blur-sm p-2 rounded border border-gray-200 hover:bg-gray-100/80 hover:border-gray-300 transition-all duration-200 cursor-pointer w-full text-left flex items-center justify-between group"
                                >
                                  <span>{hashKeyText.replace('by:', 'credit:')}</span>
                                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </button>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={copyToClipboard}
                              className="ml-4 shrink-0 hover:bg-emerald-100"
                            >
                              {copyrightCopied ? (
                                <Check className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          {/* License Owners Section  */}
                          {(authors.length > 0 || organizations.length > 0) && (
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                                <Users className="h-4 w-4 mr-2 text-emerald-600" />
                                License Owners
                              </h4>
                              <div className="grid gap-3">
                                {/* Individual Authors */}
                                {authors.map((author, index) => {
                                  const RoleIcon = roleIcons[author.role] || User;
                                  return (
                                    <div key={`author-${index}`} className="bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-emerald-200 shadow-sm group">
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center space-x-2">
                                          <RoleIcon className="h-3 w-3 text-emerald-600" />
                                          <div className="space-y-1">
                                            <div className="flex items-center space-x-1">
                                              <Copyright className="h-3 w-3 text-emerald-600" />
                                              <button
                                                onClick={() => {
                                                  const entity = codecraftStudioData.entityDetails[author.name];
                                                  if (entity) {
                                                    openEntityModal(entity);
                                                  } else {
                                                    console.warn('Entity not found for:', author.name);
                                                  }
                                                }}
                                                className="text-xs font-medium text-gray-900 hover:text-emerald-600 hover:underline transition-colors duration-200 cursor-pointer"
                                              >
                                                {author.name}
                                              </button>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <Hash className="h-3 w-3 text-emerald-600" />
                                              <button
                                                onClick={copyHashKey}
                                                className="text-xs text-gray-500 font-mono hover:text-emerald-600 hover:bg-emerald-50 px-1 py-0.5 rounded transition-all duration-200 cursor-pointer flex items-center space-x-1"
                                              >
                                                <span>{hashKeyText}</span>
                                                <Copy className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700 px-1 py-0.5">
                                          {author.role}
                                        </Badge>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Organizational Authors */}
                                {organizations.map((org, index) => {
                                  const RoleIcon = roleIcons[org.role] || Building2;
                                  return (
                                    <div key={`org-${index}`} className="bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-emerald-200 shadow-sm group">
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center space-x-2">
                                          <RoleIcon className="h-3 w-3 text-emerald-600" />
                                          <div className="space-y-1">
                                            <div className="flex items-center space-x-1">
                                              <Building2 className="h-3 w-3 text-emerald-600" />
                                              <button
                                                onClick={() => {
                                                  const entity = codecraftStudioData.entityDetails[org.name];
                                                  if (entity) {
                                                    openEntityModal(entity);
                                                  } else {
                                                    console.warn('Entity not found for:', org.name);
                                                  }
                                                }}
                                                className="text-xs font-medium text-gray-900 hover:text-emerald-600 hover:underline transition-colors duration-200 cursor-pointer"
                                              >
                                                {org.name}
                                              </button>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <Hash className="h-3 w-3 text-emerald-600" />
                                              <button
                                                onClick={copyHashKey}
                                                className="text-xs text-gray-500 font-mono hover:text-emerald-600 hover:bg-emerald-50 px-1 py-0.5 rounded transition-all duration-200 cursor-pointer flex items-center space-x-1"
                                              >
                                                <span>{hashKeyText}</span>
                                                <Copy className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700 px-1 py-0.5">
                                          {org.role}
                                        </Badge>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}


                        </div>
                      </CardContent>
                    </Card>

                    <p className="text-gray-700 leading-relaxed">
                      Permission is hereby granted, free of charge, to any person obtaining a copy of this work and associated files (the "Work"), to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Work, subject to the following conditions:
                    </p>
                  </section>

                  <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* Preamble */}
                  <section id="preamble" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <BookOpen className="h-6 w-6 mr-3 text-indigo-600" />
                      Preamble: Open Source for a Creative Commons
                    </h2>
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                      <CardContent className="p-6">

                        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg mb-6">
                          <CardContent className="p-6">
                            <div className="text-center">
                              <div className="prose prose-gray max-w-none">
                                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-emerald-800 leading-relaxed italic">
                                  <span className="text-emerald-600">🔄</span> Share openly and review. <br />
                                  <span className="text-emerald-600">⚡</span> Build fast and scale. <br />
                                  <span className="text-emerald-600">🖖</span> Live long and prosper.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Creators benefit when their works are remixed, reviewed, and redistributed, fostering a shared global culture of collaborative creation. When creative content and code is transparent and publicly accessible, it leverages collective intelligence to identify bugs, suggest improvements, and create better versions and remixes. The best products which emerge over time are often those giving consumers total freedom to improve and customize, which this license enables while creating an online international creative commons.
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Open source development within the creative commons functions as a distributed peer review system, similar to academic peer review that validates scientific research. This collaborative approach creates mutual benefits: creators gain access to high-quality, community-vetted code; original authors receive improvements & bug fixes; status recognition via peer ratings; and society advances through accelerated innovation and shared knowledge.
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            The PROSPER License extends this philosophy by integrating blockchain-based creator compensation with traditional open source licensing. This creates a sustainable ecosystem where digital works (software, creative content, documentation) can be freely shared while establishing fair compensation through community-driven funding and usage-based token distribution.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            By releasing works under this license, you join a collaborative ecosystem that embodies Linus's Law: "given enough eyeballs, all bugs are shallow"—while ensuring creators receive recognition and compensation through transparent, automated systems.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* Dual Licensing Structure */}
                  <section id="dual-licensing" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <Scale className="h-6 w-6 mr-3 text-purple-600" />
                      Dual Licensing Structure
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-purple-600" />
                            Open Source Tier
                          </h3>
                          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md">
                            Annual Revenue Under $5M USD
                          </Badge>
                          <p className="text-sm text-gray-700 mb-4">
                            Organizations with annual revenue below $5 million USD may use the Work under these terms:
                          </p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Include copyright notice and license in all copies or substantial portions</li>
                            <li>• Share derivative works under this same license (copyleft provision)</li>
                            <li>• Provide proper attribution to original authors in all distributions</li>
                            <li>• Make source code available for any distributed derivative works</li>
                            <li>• Commercial use permitted within revenue threshold</li>
                            <li>• PROSPER Credit system participation optional</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Star className="h-5 w-5 mr-2 text-amber-600" />
                            Commercial Tier
                          </h3>
                          <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md">
                            Annual Revenue $5M+ USD
                          </Badge>
                          <p className="text-sm text-gray-700 mb-4">
                            Organizations meeting or exceeding the revenue threshold must:
                          </p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Obtain a separate commercial license from the licensor</li>
                            <li>• Participate in the PROSPER Credit system for usage tracking</li>
                            <li>• Commercial licenses provide additional rights and reduced obligations</li>
                            <li>• Enterprise support available under commercial terms</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* PROSPER Credit System */}
                  <section id="prosper-credit" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <Coins className="h-6 w-6 mr-3 text-yellow-600" />
                      PROSPER Credit System
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      The PROSPER Credit system provides transparent creator compensation through:
                    </p>

                    <div className="space-y-6">
                      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-cyan-600" />
                            Privacy-Preserving Usage Tracking
                          </h3>
                          <p className="text-gray-700 text-sm">
                            Blockchain-based logs provide cryptographic proof of usage while maintaining user privacy through zero-knowledge protocols and decentralized tracking.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                            Automated Token Distribution
                          </h3>
                          <p className="text-gray-700 text-sm mb-3">
                            PROSPER tokens distributed to creators based on:
                          </p>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Normalized usage metrics</li>
                            <li>• Community reputation scores (0-1.0 scale)</li>
                            <li>• Collaboration multipliers for joint contributions</li>
                            <li>• Weighted contribution graph analysis</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-green-600" />
                            Fair Compensation
                          </h3>
                          <p className="text-gray-700 text-sm mb-3">
                            Token pools funded by:
                          </p>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Voluntary contributions from users</li>
                            <li>• Commercial license fees</li>
                            <li>• Community grants and sponsorships</li>
                            <li>• Integration support partnerships</li>
                            <li>• Ad revenue sharing from platforms hosting PROSPER-licensed content</li>
                            <li>• Cross-platform distribution fees from federated networks and social media</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 shadow-lg transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                            Cross-Platform Distribution & Ad Revenue Sharing
                          </h3>
                          <p className="text-gray-700 text-sm mb-3">
                            All PROSPER-licensed content may be freely rehosted on any platform—federated news sites, video platforms, photo galleries, social networks, and more. However, platforms must share ad revenue proportionally with PROSPER Credits.
                          </p>
                          <p className="text-gray-700 text-sm mb-3">
                            This revolutionary approach allows anyone from teenagers worldwide to major corporations to reuse and remix artists' work without permission, as long as proper attribution is given. It enables big companies to instantly leverage culture for growth and advertising while ensuring creators receive fair compensation through the blockchain-verified attribution system.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-indigo-200">
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Platform Requirements</h4>
                              <ul className="space-y-1 text-xs text-gray-700">
                                <li>• Proportional ad revenue sharing</li>
                                <li>• Blockchain-verified attribution tracking</li>
                                <li>• Transparent usage reporting</li>
                                <li>• Creator compensation distribution</li>
                              </ul>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-indigo-200">
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">User Benefits</h4>
                              <ul className="space-y-1 text-xs text-gray-700">
                                <li>• Free remix and reuse rights</li>
                                <li>• No permission required</li>
                                <li>• Proper attribution maintained</li>
                                <li>• Creator compensation ensured</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Attribution Requirements */}
                  <section id="attribution" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <Users className="h-6 w-6 mr-3 text-rose-600" />
                      Attribution and Sharing Requirements
                    </h2>
                    <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-lg">
                      <CardContent className="p-6">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          When using this Work, you must:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Retain original copyright notices in all copies</li>
                          <li>• Clearly identify original authors and contributors with their roles</li>
                          <li>• Acknowledge organizational sponsors and contributors</li>
                          <li>• Link to original source repository where technically feasible</li>
                          <li>• Document any significant modifications made</li>
                          <li>• Preserve all existing attribution in derivative works</li>
                          <li>• Ensure accurate creator attribution in PROSPER Credit records</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-rose-600" />
                        Source Availability
                      </h3>
                      <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 shadow-lg">
                        <CardContent className="p-6">
                          <p className="text-gray-700 leading-relaxed mb-3">
                            For any distribution of the Work or derivatives:
                          </p>
                          <ul className="space-y-2 text-gray-700 text-sm">
                            <li>• Complete source code must be available under same license terms</li>
                            <li>• Source provided in preferred form for modification</li>
                            <li>• Include training data, relevant research, build scripts, and installation instructions</li>
                            <li>• Document dependencies and third-party components clearly</li>
                            <li>• Maintain public repository or provide source upon request</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Patent Protection */}
                  <section id="patent" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <Shield className="h-6 w-6 mr-3 text-indigo-600" />
                      Patent Protection
                    </h2>
                    <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 shadow-lg">
                      <CardContent className="p-6">
                        <p className="text-gray-700 leading-relaxed">
                          Each contributor grants a perpetual, worldwide, non-exclusive, royalty-free, irrevocable patent license for patent claims necessarily infringed by their contributions to the Work. This license terminates if you initiate patent litigation against any contributor regarding patents in this Work.
                        </p>
                      </CardContent>
                    </Card>

                    <div className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Scale className="h-5 w-5 mr-2 text-indigo-600" />
                          License Compatibility
                        </h3>
                        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 shadow-lg">
                          <CardContent className="p-4">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              This license maintains compatibility with other open source licenses while preserving blockchain integration. When combining with differently-licensed code, the most restrictive terms apply to the combined work. Commercial licensees receive separate compatibility provisions. This license is compatible with Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <X className="h-5 w-5 mr-2 text-red-600" />
                          Termination
                        </h3>
                        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-lg">
                          <CardContent className="p-4">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              License terminates automatically upon violation of terms. Upon termination: cease all use and distribution immediately. Good faith efforts to remedy violations within 30 days may restore license.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </section>

                  {/* Understanding PROSPER */}
                  <section id="understanding" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <BookOpen className="h-6 w-6 mr-3 text-teal-600" />
                      Understanding the PROSPER Model
                    </h2>
                    <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 shadow-lg">
                      <CardContent className="p-6">
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-700 leading-relaxed mb-4">
                            The PROSPER License addresses the fundamental tension between open source accessibility and creator sustainability. Unlike purely permissive licenses that provide no revenue model, or restrictive copyleft licenses that can deter enterprise adoption, PROSPER creates a sustainable middle path that encourages innovation while ensuring fair creator compensation.
                          </p>

                          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-teal-600" />
                            Stakeholder Benefits
                          </h3>

                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md transform hover:scale-105 transition-all duration-300">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <Code className="h-4 w-4 mr-2 text-blue-600" />
                                  Individual Developers
                                </h4>
                                <p className="text-sm text-gray-600">Unrestricted access to high-quality works with assurance that improvements return to the community. Optional PROSPER Credit participation provides recognition and potential compensation.</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md transform hover:scale-105 transition-all duration-300">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <Building2 className="h-4 w-4 mr-2 text-green-600" />
                                  Small Businesses
                                </h4>
                                <p className="text-sm text-gray-600">Free commercial use up to $5M annual revenue—providing substantial room for growth before commercial licensing becomes necessary.</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-md transform hover:scale-105 transition-all duration-300">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <Scale className="h-4 w-4 mr-2 text-purple-600" />
                                  Large Enterprises
                                </h4>
                                <p className="text-sm text-gray-600">Clear licensing pathways with legal certainty. Commercial licensing provides enterprise support while ensuring participation in fair creator compensation.</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-md transform hover:scale-105 transition-all duration-300">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <BookOpen className="h-4 w-4 mr-2 text-amber-600" />
                                  Educational Organizations
                                </h4>
                                <p className="text-sm text-gray-600">Complete freedom to use, modify, and redistribute works for educational missions without restrictions.</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-md transform hover:scale-105 transition-all duration-300">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <Shield className="h-4 w-4 mr-2 text-rose-600" />
                                  Non-Profit Organizations
                                </h4>
                                <p className="text-sm text-gray-600">Unrestricted access for mission-driven work while contributing to the collaborative ecosystem.</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200 shadow-md transform hover:scale-105 transition-all duration-300">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                  <TestTube className="h-4 w-4 mr-2 text-cyan-600" />
                                  Researchers
                                </h4>
                                <p className="text-sm text-gray-600">Access to transparent, peer-reviewed works with built-in attribution and collaboration tracking.</p>
                              </CardContent>
                            </Card>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                            <Palette className="h-5 w-5 mr-2 text-teal-600" />
                            Design Philosophy
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            PROSPER embodies the principle that creative work benefits from transparency, collaborative review, and equitable compensation. By integrating blockchain technology with proven open source licensing, it creates a sustainable ecosystem where creators can focus on innovation while the community ensures quality and provides economic support.
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            This framework transforms traditional intellectual property into commons-based ownership where creators receive compensation through community funding rather than restrictive licensing. This enables free distribution of digital works while maintaining creator sustainability—representing an evolution in open source licensing that addresses modern creative economy realities while preserving the collaborative spirit that makes open source valuable to society.
                          </p>

                          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                            <FileCode className="h-5 w-5 mr-2 text-teal-600" />
                            Implementation Notes
                          </h3>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Organizations considering PROSPER License adoption should:
                          </p>
                          <ul className="space-y-2 text-gray-700 text-sm">
                            <li>• Evaluate their current revenue against the $5M threshold</li>
                            <li>• Consider blockchain infrastructure requirements for Credit system participation</li>
                            <li>• Review compatibility with existing open source dependencies</li>
                            <li>• Plan for community engagement and attribution workflows</li>
                            <li>• Assess legal implications in their jurisdiction</li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed mt-4">
                            The license text may be customized for specific use cases while maintaining core provisions for attribution, sharing, and creator compensation.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Warranty and Liability */}
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <Shield className="h-6 w-6 mr-3 text-gray-600" />
                      Warranty and Liability
                    </h2>
                    <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 shadow-lg">
                      <CardContent className="p-6">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong>DISCLAIMER:</strong> The work is provided "as is", without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall authors or copyright holders be liable for any claim, damages, or other liability, whether in contract, tort, or otherwise, arising from the work or its use.
                        </p>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Alternative Formats */}
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                      <Download className="h-6 w-6 mr-3 text-slate-600" />
                      Alternative Formats
                    </h2>
                    <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 shadow-lg">
                      <CardContent className="p-6">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          This license is available in multiple formats for different use cases:
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="outline" className="flex items-center space-x-2 hover:bg-slate-100">
                            <FileText className="h-4 w-4" />
                            <span>Markdown</span>
                          </Button>
                          <Button variant="outline" className="flex items-center space-x-2 hover:bg-slate-100">
                            <FileText className="h-4 w-4" />
                            <span>PDF</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        {/* Entity Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
            {selectedEntity ? (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    {selectedEntity.type === 'Individual' ? (
                      <User className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Building2 className="h-5 w-5 text-emerald-600" />
                    )}
                    <span>{selectedEntity.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedEntity.role}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                        Contact
                      </h3>
                      <p className="text-sm text-gray-600">{selectedEntity.email || selectedEntity.contact}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-emerald-600" />
                        Location
                      </h3>
                      <p className="text-sm text-gray-600">{selectedEntity.location}</p>
                    </div>
                    {selectedEntity.website && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-emerald-600" />
                          Website
                        </h3>
                        <a
                          href={`https://${selectedEntity.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-600 hover:underline"
                        >
                          {selectedEntity.website}
                        </a>
                      </div>
                    )}
                    {selectedEntity.github && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 flex items-center">
                          <Code className="h-4 w-4 mr-2 text-emerald-600" />
                          GitHub
                        </h3>
                        <a
                          href={`https://${selectedEntity.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-600 hover:underline"
                        >
                          {selectedEntity.github}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-emerald-600" />
                      About
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedEntity.bio}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid gap-4 md:grid-cols-3">
                    {selectedEntity.contributions && (
                      <div className="text-center p-3 bg-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">{selectedEntity.contributions}</div>
                        <div className="text-xs text-gray-600">Contributions</div>
                      </div>
                    )}
                    {selectedEntity.followers && (
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedEntity.followers}</div>
                        <div className="text-xs text-gray-600">Followers</div>
                      </div>
                    )}
                    {selectedEntity.employees && (
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedEntity.employees}</div>
                        <div className="text-xs text-gray-600">Employees</div>
                      </div>
                    )}
                  </div>

                  {/* Projects */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-emerald-600" />
                      Notable Projects
                    </h3>
                    <div className="space-y-2">
                      {selectedEntity.projects.map((project, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer transition-all duration-200 group"
                          onClick={() => handleProjectClick(project.name)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{project.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              ⭐ {project.stars}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">{project.description}</p>
                          <div className="mt-2 flex items-center text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <FileText className="h-3 w-3 mr-1" />
                            View License
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No entity information available</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}