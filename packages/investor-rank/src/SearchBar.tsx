'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-10">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Search investors by name, industry, location, or portfolio companies..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-3xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-white placeholder-gray-400"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};