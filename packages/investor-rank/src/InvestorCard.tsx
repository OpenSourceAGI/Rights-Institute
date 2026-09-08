'use client';

import React from 'react';
import { MapPin, Calendar, Users, ExternalLink, Mail, Building2, TrendingUp, Star } from 'lucide-react';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import { Investor } from './types';

interface InvestorCardProps {
  investor: Investor;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({ investor }) => {
  const {
    name,
    id,
    exitRate,
    contactPerson,
    email,
    homepage,
    linkedin,
    facebook,
    founded,
    description,
    focuses,
    location,
    portfolio
  } = investor;

  // Convert id to rank number
  const rank = parseInt(id);
  
  // Convert exitRate to percentage (remove % sign if present)
  const percentage = exitRate.replace('%', '');
  
  // Convert founded year to number
  const yearFounded = parseInt(founded) || 0;

  const displayedPortfolioCompanies = (portfolio || []).slice(0, 12);
  const remainingCount = Math.max(0, (portfolio || []).length - displayedPortfolioCompanies.length);

  // Format website URL for display
  const formatWebsite = (url: string) => {
    if (!url || url === '#') return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  // Get rank badge color based on rank
  const getRankBadgeColor = (rank: number) => {
    if (rank <= 10) return 'from-yellow-400 via-yellow-500 to-orange-500 text-white shadow-yellow-200';
    if (rank <= 50) return 'from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-200';
    if (rank <= 100) return 'from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-emerald-200';
    return 'from-gray-400 via-gray-500 to-gray-600 text-white shadow-gray-200';
  };

  // Handle card click
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on links, buttons, or interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select')) {
      return;
    }
    
    // Check if homepage is valid and clickable
    const validHomepage = homepage && 
                         homepage !== '#' && 
                         homepage !== 'Not Available' && 
                         homepage !== 'N/A' &&
                         homepage.trim() !== '';
    
    if (validHomepage) {
      // Add visual feedback
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
      
      // Ensure URL has protocol
      let url = homepage;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="group relative cursor-pointer select-none"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Click to visit ${name} website`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e as any);
        }
      }}
    >
      {/* Rank number in corner */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className={`bg-gradient-to-br ${getRankBadgeColor(rank)} rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white`}>
          #{rank}
        </div>
      </div>
      
      {/* Main card */}
      <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200 p-6 border border-white/80 overflow-hidden bg-gradient-to-br from-blue-50/60 via-white to-teal-50/60">
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
        
        {/* Click indicator - moved to non-blocking position */}
        {homepage && homepage !== '#' && homepage !== 'Not Available' && homepage !== 'N/A' && homepage.trim() !== '' && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Click to visit
            </div>
          </div>
        )}
        
        {/* Header with rank badge */}
        <div className="relative flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                  {name}
                </h2>
                {rank <= 10 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-yellow-600">Top 10</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium">{location}</span>
              </div>
              {yearFounded > 0 && (
                <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-full group-hover:bg-teal-100 transition-colors duration-300">
                  <Calendar className="w-3.5 h-3.5 text-teal-500" />
                  <span className="font-medium">{yearFounded}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Percentage badge */}
          <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-lg">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            {percentage}%
          </div>
        </div>

        {/* Description with fade effect */}
        <div className="relative mb-5">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
            {description}
          </p>
          <div className="absolute bottom-0 right-0 w-8 h-6 bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* Contact section with glassmorphism */}
        <div className="bg-gradient-to-r from-white/80 via-blue-50/40 to-indigo-50/40 rounded-2xl p-4 mb-5 border border-white/50 group-hover:border-blue-200/50 transition-colors duration-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-blue-600" />
            Contact
          </h3>
          <div className="space-y-2">
            {contactPerson && contactPerson !== 'Not Available' && (
              <div className="text-xs text-gray-600">
                <span className="font-medium text-gray-800">{contactPerson}</span>
              </div>
            )}
            
            {email && email !== 'Not Available' && (
              <div className="text-xs">
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-1 group/link"
                  title="Email"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="w-3 h-3 group-hover/link:rotate-12 transition-transform duration-300" />
                  {email}
                </a>
              </div>
            )}
            
            {homepage && homepage !== '#' && homepage !== 'Not Available' && homepage !== 'N/A' && homepage.trim() !== '' && (
              <div className="text-xs">
                <a 
                  href={homepage.startsWith('http') ? homepage : `https://${homepage}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-1 group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 group-hover/link:rotate-12 transition-transform duration-300" />
                  {formatWebsite(homepage)}
                </a>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {linkedin && linkedin !== '#' && linkedin !== 'Not Available' && linkedin !== 'N/A' && linkedin.trim() !== '' && (
                <a
                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:rotate-12 p-1.5 rounded-lg hover:bg-blue-50"
                  title="LinkedIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              )}
              {facebook && facebook !== '#' && facebook !== 'Not Available' && facebook !== 'N/A' && facebook.trim() !== '' && (
                <a
                  href={facebook.startsWith('http') ? facebook : `https://${facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125 hover:rotate-12 p-1.5 rounded-lg hover:bg-blue-50"
                  title="Facebook"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Focus Areas with animated tags */}
        <div className="mb-5">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-teal-600" />
            Focus Areas
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {(focuses || []).slice(0, 4).map((focus, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-blue-800 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-blue-200/50 cursor-default"
              >
                {focus}
              </span>
            ))}
            {(focuses || []).length > 4 && (
              <span className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-gray-200">
                +{(focuses || []).length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Portfolio companies with staggered animation */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            Portfolio ({(portfolio || []).length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {displayedPortfolioCompanies.map((company, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-teal-50 via-emerald-50 to-green-50 text-teal-700 px-2.5 py-1 rounded-lg text-xs border border-teal-200/50 cursor-default font-medium"
              >
                {company}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-200">
                +{remainingCount}
              </span>
            )}
          </div>
        </div>

        {/* Hover glow effect - background only */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-teal-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-teal-400/5 transition-all duration-700 pointer-events-none"></div>
      </div>
    </div>
  );
};