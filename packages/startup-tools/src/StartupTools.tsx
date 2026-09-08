'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { CategoryFilter } from './CategoryFilter';
import { ToolGrid } from './ToolGrid';
import { tools, categories } from './tools';

function StartupTools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <ToolGrid 
        tools={tools} 
        searchTerm={searchTerm} 
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default StartupTools;