'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { InvestorCard } from './InvestorCard';
import { InvestorTable } from './InvestorTable';
import { SearchBar } from './SearchBar';
import { investors } from './investorData';
import { Investor } from './types';

type ViewMode = 'card' | 'table';

export const InvestorList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedCount, setDisplayedCount] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // Load investors from JSON on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
      } catch (error) {
        console.error('Failed to load investors from JSON:', error);
      }
    };

    loadData();
  }, []);

  // Filter investors based on search term
  const filteredInvestors = useMemo(() => {
    if (!searchTerm.trim()) return investors;

    const term = searchTerm.toLowerCase();
    return investors.filter((investor) => {
      return (
        investor.name.toLowerCase().includes(term) ||
        investor.location.toLowerCase().includes(term) ||
        investor.description.toLowerCase().includes(term) ||
        investor.contactPerson.toLowerCase().includes(term) ||
        (investor.focuses || []).some(focus => focus.toLowerCase().includes(term)) ||
        (investor.portfolio || []).some(company => company.toLowerCase().includes(term))
      );
    });
  }, [searchTerm, investors]);

  // Get currently displayed investors
  const displayedInvestors = filteredInvestors.slice(0, displayedCount);
  const hasMore = displayedCount < filteredInvestors.length;

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const scrollThreshold = document.documentElement.offsetHeight - 1000;

      if (
        scrollPosition >= scrollThreshold &&
        hasMore &&
        !isLoading &&
        !isInitialLoading
      ) {
        setIsLoading(true);
        setTimeout(() => {
          setDisplayedCount(prev => Math.min(prev + 24, filteredInvestors.length));
          setIsLoading(false);
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, isInitialLoading, filteredInvestors.length]);

  // Reset displayed count when search changes
  useEffect(() => {
    setDisplayedCount(24);
  }, [searchTerm]);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="inline-flex items-center gap-3 text-blue-600 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-xl font-semibold">Loading investor database...</span>
          </div>
        </div>
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{loadingError}</p>
          <button
            onClick={() => {
              console.log('Retry button clicked');
              window.location.reload();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative">
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 relative">
          {/* Back Button */}
          <div className="absolute left-0 top-0">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Investor Rank
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover and connect with the world's top venture capital firms and angel investors
          </p>
          <div className="mt-4 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 px-4 py-2 rounded-full inline-block text-sm font-semibold">
            {investors.length.toLocaleString()} investors in our database
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg bg-white shadow-md p-1 gap-1">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'card'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Card View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Table View
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-600 text-center text-lg">
            {searchTerm.trim() === ''
              ? `Showing ${viewMode === 'table' ? filteredInvestors.length.toLocaleString() : displayedInvestors.length.toLocaleString()} of ${filteredInvestors.length.toLocaleString()} investors`
              : `Found ${filteredInvestors.length.toLocaleString()} investors matching "${searchTerm}"`}
          </p>
        </div>

        {/* Investor Content */}
        {filteredInvestors.length > 0 ? (
          <>
            {viewMode === 'table' ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <InvestorTable investors={filteredInvestors} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {displayedInvestors.map((investor) => (
                    <div
                      key={investor.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${(parseInt(investor.id) % 24) * 50}ms` }}
                    >
                      <InvestorCard investor={investor} />
                    </div>
                  ))}
                </div>

                {/* Loading indicator */}
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center gap-3 text-blue-600 bg-white px-6 py-3 rounded-xl shadow-md">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-lg font-medium">Loading more investors...</span>
                    </div>
                  </div>
                )}

                {/* Load more button */}
                {hasMore && !isLoading && (
                  <div className="text-center py-12">
                    <button
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setDisplayedCount(prev => Math.min(prev + 48, filteredInvestors.length));
                          setIsLoading(false);
                        }, 200);
                      }}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      Load More Investors ({Math.min(48, filteredInvestors.length - displayedCount)} more)
                    </button>
                    <p className="text-gray-500 text-sm mt-3">
                      Or scroll down to auto-load more
                    </p>
                  </div>
                )}

                {/* End of list indicator */}
                {!hasMore && filteredInvestors.length > 0 && (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
                      <div className="text-green-500 mb-3">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-semibold text-lg">All investors loaded!</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Showing all {filteredInvestors.length.toLocaleString()} investors
                        {searchTerm && ` matching "${searchTerm}"`}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">No investors found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search terms or browse all investors</p>
            {searchTerm && (
              <button
                onClick={() => {
                  console.log('Clear search button clicked');
                  setSearchTerm('');
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};