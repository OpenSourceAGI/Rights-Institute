'use client';

import React from 'react';
import { Search, Sparkles, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:block">Home</span>
          </button>

          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Startup Tools Directory
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Essential resources for entrepreneurs
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>
          
          {/* Right side - could add user menu, etc. */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 hidden md:block">
              64 tools
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};