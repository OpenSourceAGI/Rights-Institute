/**
 * @fileoverview CREDIT Component - LegalChain Platform
 * 
 * A comprehensive landing page for the LegalChain platform that revolutionizes Creative Commons licensing
 * through blockchain-powered attribution and trust verification. Features smart remixing rights,
 * credential verification, secure agreements, and transparent revenue sharing.
 * 
 * @features
 * - Creative Commons reimagined with blockchain attribution
 * - Smart remixing rights with automatic revenue sharing
 * - Credential trust network for verification
 * - Secure everyday agreements
 * - Solana blockchain integration
 * - OpenSign legal compliance
 * - Weighted attribution economics
 * 
 * @sections
 * - Hero section with platform overview
 * - Core features grid
 * - PROSPER License information
 * - How it works process
 * - Benefits for creators and users
 * - Call-to-action
 * - Footer with navigation
 * 
 * @props None - This is a self-contained landing page component
 * 
 * @example
 * ```tsx
 * import CREDIT from '@rights/credit/CREDIT';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <CREDIT />
 *     </div>
 *   );
 * }
 * ```
 * 
 * @author vtempest
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import { SiGithub } from 'react-icons/si';
import {
  FileText, 
  Coins, 
  Users, 
  BarChart3, 
  Shield, 
  Globe, 
  Zap, 
  GitBranch,
  TrendingUp,
  Lock,
  Smartphone,
  CheckCircle,
  Music,
  GraduationCap,
  Car,
  Award,
  Briefcase,
  UserCheck,
  ExternalLink,
  Link as LinkIcon,
  Scale,
  Code,
  Heart,
  DollarSign,
  Clock,
  Eye
} from 'lucide-react';

/**
 * CREDIT Component - LegalChain Platform Landing Page
 * 
 * A comprehensive landing page showcasing the LegalChain platform's capabilities
 * in revolutionizing Creative Commons licensing through blockchain technology.
 * Features smart attribution tracking, credential verification, and secure agreements.
 * 
 * @returns {JSX.Element} The complete LegalChain platform landing page
 */
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">LegalChain</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
            <a href="#prosper" className="text-gray-300 hover:text-white transition-colors">PROSPER License</a>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Creative Commons
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Reimagined
            </span>
          </h2>
          <p className="text-2xl text-purple-300 mb-4 font-semibold">
             Credentials, Recognition & Exchange of Digital Information and Trust	
          </p>

          <p className="text-2xl text-purple-300 mb-4 font-semibold">
            Remix, Attribute, Credit, Earn
          </p>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Revolutionary platform enabling creators to allow unlimited remixing of their content. When online content 
            remixers (DJs, Youtubers, LLMs etc.), producers, 
            or collaborators credit the original creator, they automatically receive weighted revenue cuts through 
            blockchain-verified attribution. Beyond creative works, verify college degrees, certificates, job history, 
            achievements, and secure agreements like car sales with cryptographic trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold">
              Launch Platform
            </button>
            <button className="border border-purple-500 text-purple-400 px-8 py-4 rounded-lg hover:bg-purple-500 hover:text-white transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Core Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Creative Commons Remixing */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Smart Remixing Rights</h4>
              <p className="text-gray-300 leading-relaxed">
                Creators enable unlimited remixing with automatic attribution tracking. When DJs or producers credit originals, 
                weighted revenue sharing activates instantly through smart contracts.
              </p>
            </div>

            {/* Credential Verification */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Credential Trust Network</h4>
              <p className="text-gray-300 leading-relaxed">
                Verify college degrees, professional certificates, job history, and achievements with cryptographic proof. 
                Build tamper-proof professional profiles backed by institutional signatures.
              </p>
            </div>

            {/* Secure Agreements */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Everyday Agreements</h4>
              <p className="text-gray-300 leading-relaxed">
                Secure car sales, rental agreements, freelance contracts, and personal transactions with legally binding 
                digital signatures and blockchain verification.
              </p>
            </div>

            {/* Solana Blockchain */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Solana Blockchain</h4>
              <p className="text-gray-300 leading-relaxed">
                Ultra-low transaction costs ($0.0000075 per signature) with 65,000+ TPS throughput for real-time 
                attribution tracking and instant micropayments.
              </p>
            </div>

            {/* OpenSign Integration */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Legal Compliance</h4>
              <p className="text-gray-300 leading-relaxed">
                Legally compliant e-signatures with OpenSign's API-driven architecture, supporting multi-signer workflows 
                and comprehensive audit trails across jurisdictions.
              </p>
            </div>

            {/* Weighted Distribution */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Attribution Economics</h4>
              <p className="text-gray-300 leading-relaxed">
                Creator contribution networks modelved as weighted graphs with PageRank-style algorithms for fair 
                revenue distribution based on usage and collaboration impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROSPER License Section */}
      <section id="prosper" className="px-6 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-6">
              PROSPER License
            </h3>
            <p className="text-xl text-purple-300 font-semibold mb-4">
              Permissionless Reuse for an Open Society of Public & Enterprise Review
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Open Source</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Commercial Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-medium">Blockchain Enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Scale className="w-8 h-8 text-purple-400 mr-3" />
              Open Source for a Creative Commons
            </h4>
            <p className="text-gray-300 leading-relaxed mb-6">
              Creators benefit when their works are remixed, reviewed, and redistributed, fostering a shared global culture 
              of collaborative creation. The PROSPER License extends open source philosophy by integrating blockchain-based 
              creator compensation with traditional licensing, creating a sustainable ecosystem where digital works can be 
              freely shared while establishing fair compensation through community-driven funding.
            </p>
            <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
              <p className="text-purple-200 italic text-lg">
                "Given enough eyeballs, all bugs are shallow" — while ensuring creators receive recognition and 
                compensation through transparent, automated systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dual Licensing Structure */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <GitBranch className="w-6 h-6 text-green-400 mr-3" />
                Dual Licensing Structure
              </h4>
              
              <div className="space-y-6">
                <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                  <h5 className="text-green-300 font-semibold mb-2">Open Source Tier</h5>
                  <p className="text-sm text-gray-300 mb-2">Annual Revenue Under $5M USD</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Free commercial use within threshold</li>
                    <li>• Include copyright notice and attribution</li>
                    <li>• Share derivatives under same license</li>
                    <li>• PROSPER Credit participation optional</li>
                  </ul>
                </div>

                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                  <h5 className="text-blue-300 font-semibold mb-2">Commercial Tier</h5>
                  <p className="text-sm text-gray-300 mb-2">Annual Revenue $5M+ USD</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Separate commercial license required</li>
                    <li>• PROSPER Credit system participation</li>
                    <li>• Enterprise support available</li>
                    <li>• Additional rights and reduced obligations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PROSPER Credit System */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <Coins className="w-6 h-6 text-yellow-400 mr-3" />
                PROSPER Credit System
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-purple-300 font-semibold mb-2">Privacy-Preserving Tracking</h5>
                  <p className="text-sm text-gray-300">
                    Blockchain-based logs with cryptographic proof while maintaining user privacy through 
                    zero-knowledge protocols.
                  </p>
                </div>

                <div>
                  <h5 className="text-purple-300 font-semibold mb-2">Automated Distribution</h5>
                  <p className="text-sm text-gray-300 mb-2">PROSPER tokens distributed based on:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Normalized usage metrics</li>
                    <li>• Community reputation scores</li>
                    <li>• Collaboration multipliers</li>
                    <li>• Weighted contribution analysis</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-purple-300 font-semibold mb-2">Fair Compensation</h5>
                  <p className="text-sm text-gray-300 mb-2">Token pools funded by:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• If LLM "chat answer" uses your content or remixes content for training, the LLM provider may license all PROSPER content</li>
                    <li>• Voluntary user contributions from creators and supporters who believe in fair compensation</li>
                    <li>• Commercial license fees from enterprises exceeding the $5M revenue threshold</li>
                    <li>• Community grants and funding initiatives supporting the ecosystem</li>
                    <li>• Integration partnerships with platforms and service providers</li>
                    <li>• Ad revenue sharing from platforms hosting PROSPER-licensed content</li>
                    <li>• Cross-platform distribution fees from federated networks and social media</li>
                  </ul>
                  <p className="text-sm text-gray-300 mt-3">
                    All PROSPER-licensed content may be freely rehosted on any platform—federated news sites, video platforms, 
                    photo galleries, social networks, and more. However, platforms must share ad revenue proportionally with 
                    PROSPER Credits. This revolutionary approach allows anyone from teenagers worldwide to major corporations 
                    to reuse and remix artists' work without permission, as long as proper attribution is given. It enables 
                    big companies to instantly leverage culture for growth and advertising while ensuring creators receive 
                    fair compensation through the blockchain-verified attribution system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-500/30">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Heart className="w-6 h-6 text-pink-400 mr-3" />
              Stakeholder Benefits
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-pink-300 font-semibold mb-2">Individual Developers</h5>
                <p className="text-sm text-gray-300">
                  Unrestricted access with optional PROSPER Credit participation for recognition and compensation.
                </p>
              </div>
              <div>
                <h5 className="text-pink-300 font-semibold mb-2">Small Businesses</h5>
                <p className="text-sm text-gray-300">
                  Free commercial use up to $5M revenue—substantial growth room before commercial licensing.
                </p>
              </div>
              <div>
                <h5 className="text-pink-300 font-semibold mb-2">Large Enterprises</h5>
                <p className="text-sm text-gray-300">
                  Clear licensing pathways with legal certainty and enterprise support while ensuring fair creator compensation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold mr-4">
              View Full License
            </button>
            <button className="border border-purple-500 text-purple-400 px-8 py-4 rounded-lg hover:bg-purple-500 hover:text-white transition-all">
              Implementation Guide
            </button>
          </div>
        </div>
      </section>

      {/* Trust Verification Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Trust Through Verification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Education</h4>
              <p className="text-gray-300">
                Verify degrees, certifications, and academic achievements with institutional backing.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Employment</h4>
              <p className="text-gray-300">
                Build verified work history with employer-signed records and performance metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Achievements</h4>
              <p className="text-gray-300">
                Document victories, awards, and accomplishments with cryptographic proof.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Identity</h4>
              <p className="text-gray-300">
                Establish trusted digital identity for secure transactions and agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selective Disclosure & Privacy Section */}
      <section className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Privacy-First Credential Verification
          </h3>
          
          {/* Selective Disclosure Mechanisms */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
                <Lock className="w-8 h-8 text-purple-400 mr-3" />
                Selective Disclosure Mechanisms
              </h4>
              <p className="text-xl text-purple-300 max-w-4xl mx-auto leading-relaxed">
                Advanced cryptographic techniques enable granular attribute sharing while maintaining complete privacy control
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <GitBranch className="w-6 h-6 text-green-400 mr-3" />
                    Merkle Tree Architecture
                  </h5>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Each credential is structured as a Merkle tree where individual attributes form leaf nodes. 
                    Users can selectively reveal specific attributes by providing relevant Merkle proofs while 
                    keeping other attributes completely private.
                  </p>
                  <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                    <h6 className="text-green-300 font-semibold mb-2">BLS Signature Integration</h6>
                    <p className="text-sm text-gray-300">
                      Boneh-Lynn-Shacham signatures provide efficient aggregation and verification of 
                      multiple credential attributes with minimal computational overhead.
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Shield className="w-6 h-6 text-blue-400 mr-3" />
                    Sophisticated Use Cases
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Prove graduation from an accredited institution without revealing the specific school
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Demonstrate employment history duration without revealing company names
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Confirm professional licensing without exposing license numbers or personal details
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        Validate certification levels without revealing examination scores
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration with Existing Systems */}
          <div className="mb-16">
            <h4 className="text-3xl font-bold text-white text-center mb-12">
              Seamless System Integration
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* GitHub Integration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <SiGithub className="w-8 h-8 text-white" />
                </div>
                <h5 className="text-xl font-bold text-white mb-4">GitHub & Developer Credentials</h5>
                <p className="text-gray-300 mb-4">
                  Comprehensive developer credentialing beyond code contributions and repository metrics.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Code className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Educational background verification</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Briefcase className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Professional experience validation</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Cloud platform certifications</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Open source contribution records</p>
                  </div>
                </div>
              </div>

              {/* Academic Integration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h5 className="text-xl font-bold text-white mb-4">Academic Institution Integration</h5>
                <p className="text-gray-300 mb-4">
                  Standardized APIs connecting with existing student information systems.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Digital diploma issuance</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <UserCheck className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Cross-institution verification</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <BarChart3 className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Selective transcript sharing</p>
                  </div>
                </div>
              </div>

              {/* Professional Licensing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="bg-gradient-to-r from-green-600 to-green-700 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h5 className="text-xl font-bold text-white mb-4">Professional Licensing Bodies</h5>
                <p className="text-gray-300 mb-4">
                  Blockchain-based licenses with built-in expiration and renewal mechanisms.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Automatic expiration tracking</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Continuing education verification</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">Real-time disciplinary updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy and Security Architecture */}
          <div>
            <h4 className="text-3xl font-bold text-white text-center mb-12">
              Advanced Privacy & Security
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cryptographic Access Control */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h5 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Lock className="w-6 h-6 text-purple-400 mr-3" />
                  Cryptographic Access Control
                </h5>
                <p className="text-gray-300 mb-6">
                  Multi-layered cryptographic access control ensures complete user sovereignty over credential data.
                </p>
                <div className="space-y-4">
                  <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                    <h6 className="text-purple-300 font-semibold mb-2">Hierarchical Key Management</h6>
                    <p className="text-sm text-gray-300">
                      Generate derived keys for specific purposes without exposing master private keys
                    </p>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                    <h6 className="text-blue-300 font-semibold mb-2">Time-Limited Access</h6>
                    <p className="text-sm text-gray-300">
                      Temporary access keys automatically expire to minimize exposure risk
                    </p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                    <h6 className="text-green-300 font-semibold mb-2">Multi-Signature Requirements</h6>
                    <p className="text-sm text-gray-300">
                      High-value credentials require verification from multiple trusted parties
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy-Preserving Verification */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h5 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Eye className="w-6 h-6 text-cyan-400 mr-3" />
                  Privacy-Preserving Verification
                </h5>
                <p className="text-gray-300 mb-6">
                  Privacy by design principles ensure verifiers receive only minimum necessary information.
                </p>
                <div className="space-y-4">
                  <div className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-500/30">
                    <h6 className="text-cyan-300 font-semibold mb-2">Attribute-Based Disclosure</h6>
                    <p className="text-sm text-gray-300">
                      Share individual attributes like degree field without revealing institution or graduation date
                    </p>
                  </div>
                  <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-500/30">
                    <h6 className="text-indigo-300 font-semibold mb-2">Predicate Proofs</h6>
                    <p className="text-sm text-gray-300">
                      Mathematical proofs about credential attributes without revealing exact values
                    </p>
                  </div>
                  <div className="bg-pink-900/30 rounded-lg p-4 border border-pink-500/30">
                    <h6 className="text-pink-300 font-semibold mb-2">Biometric Integration</h6>
                    <p className="text-sm text-gray-300">
                      Enhanced security through biometric authentication for credential presentation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-xl p-8 border border-purple-500/30">
              <h5 className="text-xl font-bold text-white mb-4 text-center">
                Universal Credential Verification System
              </h5>
              <p className="text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
                This comprehensive approach creates a universal credential verification system that addresses 
                the limitations of traditional centralized credentialing while providing enhanced security, 
                privacy, and user control through cryptographic access mechanisms. The blockchain-based 
                architecture ensures tamper-proof credential storage while enabling flexible, privacy-preserving 
                verification processes across multiple domains and use cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">1. Create & License</h4>
              <p className="text-gray-300">
                Upload content with Creative Commons licensing, set remixing permissions, and establish attribution requirements through smart contracts.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">2. Remix & Credit</h4>
              <p className="text-gray-300">
                DJs and creators remix freely while blockchain automatically tracks attribution and triggers revenue sharing when credited properly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">3. Earn & Verify</h4>
              <p className="text-gray-300">
                Receive weighted token distributions based on usage impact while building verified credential profiles for trust and reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Revolutionary Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold text-white mb-8">For Creators & Artists</h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Remix Revenue Sharing</h5>
                    <p className="text-gray-300">Earn automatically when your work is remixed and properly credited</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Creative Freedom</h5>
                    <p className="text-gray-300">Enable unlimited remixing while maintaining attribution rights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Verified Portfolio</h5>
                    <p className="text-gray-300">Build cryptographically verified creative and professional credentials</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-8">For Everyone</h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Trusted Transactions</h5>
                    <p className="text-gray-300">Secure car sales, contracts, and agreements with blockchain verification</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Credential Verification</h5>
                    <p className="text-gray-300">Instantly verify degrees, certificates, and professional history</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="text-white font-semibold mb-2">Transparent Attribution</h5>
                    <p className="text-gray-300">Clear, immutable records of contributions and collaborations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Creative Attribution?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join the revolution in Creative Commons licensing, trust verification, and transparent revenue sharing for the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold">
              Start Creating
            </button>
            <button className="border border-purple-500 text-purple-400 px-8 py-4 rounded-lg hover:bg-purple-500 hover:text-white transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h5 className="text-xl font-bold text-white">LegalChain</h5>
              </div>
              <p className="text-gray-400">
                Revolutionizing Creative Commons through blockchain-powered attribution and trust verification.
              </p>
            </div>
            <div>
              <h6 className="text-white font-semibold mb-4">Platform</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Creative Commons</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust Network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-semibold mb-4">Community</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LegalChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;