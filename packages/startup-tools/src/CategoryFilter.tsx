'use client';

import React from 'react';
import { 
  Grid3X3, Scale, Code, Palette, DollarSign, Megaphone, 
  Zap, TrendingUp, Building, Users, Network, Calendar, Shield, Rocket
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    count: number;
  }>;
}

const iconMap = {
  Grid3X3, Scale, Code, Palette, DollarSign, Megaphone,
  Zap, TrendingUp, Building, Users, Network, Calendar, Shield, Rocket
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) => {
  // Split categories into two rows
  const firstRow = categories.slice(0, 8);
  const secondRow = categories.slice(8);

  const renderCategoryButton = (category: any) => {
    const IconComponent = iconMap[category.icon as keyof typeof iconMap];
    const isSelected = selectedCategory === category.id;
    
    return (
      <button
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        className={`
          flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap
          ${isSelected 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <IconComponent className="h-3 w-3" />
        <span>{category.name}</span>
        <span className={`
          text-xs px-1.5 py-0.5 rounded-full font-semibold
          ${isSelected 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-600'
          }
        `}>
          {category.count}
        </span>
      </button>
    );
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="space-y-2">
          {/* First Row */}
          <div className="flex flex-wrap gap-2">
            {firstRow.map(renderCategoryButton)}
          </div>
          
          {/* Second Row */}
          <div className="flex flex-wrap gap-2">
            {secondRow.map(renderCategoryButton)}
          </div>
        </div>
      </div>
    </div>
  );
};