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
import HeroBanner from './HeroBanner';
import { useSession, signIn } from '@rights/auth/auth-client';
import { useRouter } from 'next/navigation';
import { SITE_CATEGORIES, type SiteCategory, type SiteDocument } from './site-nav';

// The catalogue itself lives in ./site-nav so the top navigation renders from
// the same list — see that file.
type DocumentButtonProps = SiteDocument;

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
      <div className="relative h-full bg-slate-900 backdrop-blur-xl p-4 sm:p-6 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 rounded-xl shadow-xl hover:shadow-2xl">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Image Section */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute inset-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br ${gradient} rounded-lg blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-slate-200 shrink-0" />
              <h3 className="text-base sm:text-xl font-bold text-slate-100 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                {title}
              </h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              {description}
            </p>

            {/* Action Buttons */}
            {showActions && (
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
                <button
                  onClick={handleCreateCustom}
                  className="relative inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 text-white text-sm font-semibold shadow-md transition-all duration-200 group/button overflow-hidden"
                >
                  <span className="z-10">Create Custom</span>
                  <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover/button:opacity-20 transition-opacity duration-300 rounded-lg"></span>
                </button>

                <a
                  href={href}
                  onClick={(e) => e.stopPropagation()}
                  className="relative inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-slate-800 hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 text-slate-100 text-sm font-semibold shadow-md transition-all duration-200 group/button overflow-hidden"
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
  const categories: SiteCategory[] = SITE_CATEGORIES;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading Art Background */}
        <HeroBanner />

        {/* Categorized Document Navigation */}
        <div className="space-y-10">
          {categories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex}>
                <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${category.borderColor}`}>
                  <CategoryIcon className="w-5 h-5 text-slate-400 shrink-0" />
                  <h2 className="text-lg font-semibold text-slate-200">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.documents.map((doc, docIndex) => (
                    <DocumentButton
                      key={docIndex}
                      title={doc.title}
                      description={doc.description}
                      icon={doc.icon}
                      href={doc.href}
                      createHref={doc.createHref}
                      color={doc.color}
                      gradient={doc.gradient}
                      image={doc.image}
                      keywords={doc.keywords}
                      showActions={doc.showActions}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentNavigation; 