"use client";

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Scale, 
  Users, 
  Shield, 
  BookOpen, 
  Menu,
  X,
  Copy,
  Check,
  Calendar,
  User,
  Mail,
  Building2,
  Globe,
  Star,
  Eye,
  Lock,
  Settings,
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
  Home
} from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'Introduction', icon: BookOpen },
  { id: 'acceptance', title: 'Acceptance of Terms', icon: FileText },
  { id: 'services', title: 'Our Services', icon: Globe },
  { id: 'user-accounts', title: 'User Accounts', icon: User },
  { id: 'privacy-policy', title: 'Privacy Policy', icon: Shield },
  { id: 'data-collection', title: 'Data Collection', icon: Eye },
  { id: 'data-usage', title: 'Data Usage', icon: Settings },
  { id: 'user-rights', title: 'Your Rights', icon: Scale },
  { id: 'security', title: 'Security', icon: Lock },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Star },
  { id: 'third-party', title: 'Third Party Services', icon: Building2 },
  { id: 'liability', title: 'Liability & Disclaimers', icon: AlertTriangle },
  { id: 'contact', title: 'Contact Information', icon: Mail },
];

const TermsPrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // App configuration
  const appName = "Rights Institute";
  const companyName = "Rights Institute";
  const contactEmail = "legal@rights.institute";
  const lastUpdated = "January 15, 2025";
  const effectiveDate = "January 1, 2025";

  const copyToClipboard = async (text: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
      let currentSection = 'introduction';
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {appName}
                </h1>
                <p className="text-sm text-gray-600">Terms of Service & Privacy Policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
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
                  className={`w-10 h-10 p-0 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    activeSection === section.id 
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
                  <h2 className="text-lg font-semibold text-gray-900">Table of Contents</h2>
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
                        className={`w-full flex items-center justify-between h-auto py-3 px-3 rounded-lg transition-all duration-200 ${
                          activeSection === section.id 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                            : 'hover:bg-indigo-50 hover:text-indigo-600 text-gray-700'
                        }`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <div className="flex items-center">
                          <Icon className="h-4 w-4 mr-3 shrink-0" />
                          <span className="text-left text-sm font-medium">{section.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
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
            <div className="bg-white/80 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-12">
                {/* Title Section */}
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                      <Scale className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                    {appName}
                  </h1>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 drop-shadow-md">
                    Terms of Service & Privacy Policy
                  </h2>
                  <div className="flex justify-center gap-2 mt-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">GDPR Compliant</div>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">CCPA Compliant</div>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">Cookie Policy</div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>

                {/* Last Updated Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Last Updated: {lastUpdated}</p>
                        <p className="text-sm text-gray-600">Effective Date: {effectiveDate}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${appName} Terms - Last Updated: ${lastUpdated}`, 'header')}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    >
                      {copiedSection === 'header' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Introduction */}
                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <BookOpen className="h-6 w-6 mr-3 text-indigo-600" />
                    Introduction
                  </h2>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Welcome to {appName}, operated by {companyName}. These Terms of Service ("Terms") and Privacy Policy govern your use of our website, applications, and services (collectively, the "Services"). 
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these terms, then you may not access the Services.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We are committed to protecting your privacy and ensuring transparency in how we collect, use, and protect your personal information. This document combines our Terms of Service and Privacy Policy to provide you with a comprehensive understanding of your rights and our responsibilities.
                    </p>
                  </div>
                </section>

                {/* Acceptance of Terms */}
                <section id="acceptance" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                    Acceptance of Terms
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      By accessing and using {appName}, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-200 mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Scale className="h-5 w-5 mr-2 text-blue-600" />
                        Legal Agreement
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• You must be at least 18 years old to use our Services</li>
                        <li>• You agree to provide accurate and complete information</li>
                        <li>• You are responsible for maintaining the security of your account</li>
                        <li>• You agree to use our Services in compliance with all applicable laws</li>
                      </ul>
                    </div>
                  </div>
                </section>


                {/* User Accounts */}
                <section id="user-accounts" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <User className="h-6 w-6 mr-3 text-amber-600" />
                    User Accounts
                  </h2>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Lock className="h-5 w-5 mr-2 text-amber-600" />
                          Account Security
                        </h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Use a strong, unique password for your account</li>
                          <li>• Enable two-factor authentication when available</li>
                          <li>• Do not share your account credentials with others</li>
                          <li>• Notify us immediately of any unauthorized access</li>
                        </ul>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                          Account Responsibility
                        </h3>
                        <p className="text-gray-700 text-sm">
                          You are responsible for safeguarding the password and for any activities that occur under your account. We cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Privacy Policy */}
                <section id="privacy-policy" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Shield className="h-6 w-6 mr-3 text-rose-600" />
                    Privacy Policy
                  </h2>
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-rose-200 transform hover:scale-105 transition-all duration-300">
                        <Eye className="h-8 w-8 text-rose-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
                        <p className="text-sm text-gray-700">We're clear about what data we collect and why we collect it.</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-rose-200 transform hover:scale-105 transition-all duration-300">
                        <Lock className="h-8 w-8 text-rose-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
                        <p className="text-sm text-gray-700">Your data is protected with industry-standard security measures.</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-rose-200 transform hover:scale-105 transition-all duration-300">
                        <Users className="h-8 w-8 text-rose-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Control</h3>
                        <p className="text-sm text-gray-700">You have control over your personal information and privacy settings.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Collection */}
                <section id="data-collection" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Eye className="h-6 w-6 mr-3 text-cyan-600" />
                    Data Collection
                  </h2>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We collect information you provide directly to us, information we obtain automatically when you use our Services, and information from other sources.
                    </p>
                    <div className="space-y-6">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-cyan-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="h-5 w-5 mr-2 text-cyan-600" />
                          Information You Provide
                        </h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Account information (name, email, profile details)</li>
                          <li>• Content you create, upload, or share</li>
                          <li>• Communications with us and other users</li>
                          <li>• Payment and billing information</li>
                        </ul>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-cyan-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-cyan-600" />
                          Automatically Collected Information
                        </h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Device and browser information</li>
                          <li>• IP address and location data</li>
                          <li>• Usage patterns and preferences</li>
                          <li>• Cookies and similar tracking technologies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Usage */}
                <section id="data-usage" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Settings className="h-6 w-6 mr-3 text-teal-600" />
                    How We Use Your Data
                  </h2>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We use the information we collect to provide, maintain, and improve our Services, process transactions, and communicate with you.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-teal-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-teal-600" />
                            Service Operations
                          </h3>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            <li>• Provide and maintain our Services</li>
                            <li>• Process transactions and payments</li>
                            <li>• Provide customer support</li>
                          </ul>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-teal-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                            <Star className="h-5 w-5 mr-2 text-teal-600" />
                            Improvements
                          </h3>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            <li>• Analyze usage patterns</li>
                            <li>• Develop new features</li>
                            <li>• Enhance user experience</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-teal-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-teal-600" />
                            Communications
                          </h3>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            <li>• Send service notifications</li>
                            <li>• Respond to inquiries</li>
                            <li>• Marketing (with consent)</li>
                          </ul>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-teal-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-teal-600" />
                            Security & Legal
                          </h3>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            <li>• Prevent fraud and abuse</li>
                            <li>• Enforce our Terms</li>
                            <li>• Comply with legal requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* User Rights */}
                <section id="user-rights" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Scale className="h-6 w-6 mr-3 text-indigo-600" />
                    Your Rights & Choices
                  </h2>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      You have certain rights regarding your personal information. We provide you with the ability to access, update, and delete your information.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-200 text-center transform hover:scale-105 transition-all duration-300">
                        <Eye className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Access</h3>
                        <p className="text-sm text-gray-700">View the personal data we have about you</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-200 text-center transform hover:scale-105 transition-all duration-300">
                        <Settings className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Update</h3>
                        <p className="text-sm text-gray-700">Correct or update your information</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-200 text-center transform hover:scale-105 transition-all duration-300">
                        <X className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete</h3>
                        <p className="text-sm text-gray-700">Request deletion of your data</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-200 text-center transform hover:scale-105 transition-all duration-300">
                        <Lock className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Control</h3>
                        <p className="text-sm text-gray-700">Manage privacy settings</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Security */}
                <section id="security" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Lock className="h-6 w-6 mr-3 text-green-600" />
                    Security Measures
                  </h2>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-green-600" />
                          Encryption
                        </h3>
                        <p className="text-sm text-gray-700">Data is encrypted in transit and at rest using industry-standard protocols.</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Eye className="h-5 w-5 mr-2 text-green-600" />
                          Access Controls
                        </h3>
                        <p className="text-sm text-gray-700">Strict access controls ensure only authorized personnel can access your data.</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-green-600" />
                          Monitoring
                        </h3>
                        <p className="text-sm text-gray-700">Continuous monitoring and regular security audits protect against threats.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookies & Tracking */}
                <section id="cookies" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Star className="h-6 w-6 mr-3 text-yellow-600" />
                    Cookies & Tracking Technologies
                  </h2>
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We use cookies and similar tracking technologies to track activity on our Service and hold certain information to improve your experience.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-yellow-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-yellow-600" />
                          Types of Cookies We Use
                        </h3>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Essential Cookies</h4>
                            <p className="text-xs text-gray-600">Required for basic site functionality</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Analytics Cookies</h4>
                            <p className="text-xs text-gray-600">Help us understand how you use our site</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Preference Cookies</h4>
                            <p className="text-xs text-gray-600">Remember your settings and preferences</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Marketing Cookies</h4>
                            <p className="text-xs text-gray-600">Provide relevant ads and content</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-yellow-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                          <User className="h-5 w-5 mr-2 text-yellow-600" />
                          Your Cookie Choices
                        </h3>
                        <p className="text-sm text-gray-700">
                          You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our Services.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third Party Services */}
                <section id="third-party" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Building2 className="h-6 w-6 mr-3 text-purple-600" />
                    Third Party Services
                  </h2>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Our Services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-purple-600" />
                        Important Notice
                      </h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Third-party sites have their own privacy policies</li>
                        <li>• We encourage you to review these policies</li>
                        <li>• We are not responsible for third-party practices</li>
                        <li>• Integration services may share data according to their terms</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Liability & Disclaimers */}
                <section id="liability" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <AlertTriangle className="h-6 w-6 mr-3 text-red-600" />
                    Liability & Disclaimers
                  </h2>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-6 shadow-lg">
                    <div className="space-y-6">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-red-600" />
                          Service Disclaimer
                        </h3>
                        <p className="text-sm text-gray-700 mb-3">
                          Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied.
                        </p>
                        <ul className="space-y-1 text-gray-700 text-xs">
                          <li>• We do not guarantee uninterrupted access</li>
                          <li>• Services may be modified or discontinued</li>
                          <li>• Content accuracy is not guaranteed</li>
                        </ul>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Scale className="h-5 w-5 mr-2 text-red-600" />
                          Limitation of Liability
                        </h3>
                        <p className="text-sm text-gray-700">
                          To the maximum extent permitted by law, {companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section id="contact" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center drop-shadow-md">
                    <Mail className="h-6 w-6 mr-3 text-blue-600" />
                    Contact Information
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      If you have any questions about these Terms of Service and Privacy Policy, please contact us:
                    </p>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                          Company Information
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Company:</span>
                            <span>{companyName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Service:</span>
                            <span>{appName}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-blue-600" />
                          Contact Details
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Email:</span>
                            <div className="flex items-center space-x-2">
                              <a 
                                href={`mailto:${contactEmail}`}
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                              >
                                {contactEmail}
                              </a>
                              <button
                                onClick={() => copyToClipboard(contactEmail, 'email')}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                                title="Copy email address"
                              >
                                {copiedSection === 'email' ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Support:</span>
                            <span className="text-blue-600">Available 24/7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="text-center mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    © 2025 {companyName}. All rights reserved. | Last updated: {lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsPrivacyPage;