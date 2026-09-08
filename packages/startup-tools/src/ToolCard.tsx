'use client';

import React from 'react';
import { 
  ExternalLink, Tag, Scale, Code, Palette, DollarSign, 
  Megaphone, Zap, TrendingUp, Building, Users, Network, 
  Calendar, Shield, Rocket 
} from 'lucide-react';
import { Tool } from './tool';

const categoryIcons = {
  'Legal': Scale,
  'Development': Code,
  'Design': Palette,
  'Finance': DollarSign,
  'Marketing': Megaphone,
  'Productivity': Zap,
  'Fundraising': TrendingUp,
  'Business Setup': Building,
  'HR & Recruiting': Users,
  'Networking': Network,
  'Events': Calendar,
  'Insurance': Shield,
  'Startup Accelerators': Rocket
};

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const CategoryIcon = categoryIcons[tool.category as keyof typeof categoryIcons] || Tag;
  
  const handleClick = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1.5 bg-gray-100 rounded-md group-hover:bg-blue-100 transition-colors duration-200">
                <CategoryIcon className="h-3.5 w-3.5 text-gray-600 group-hover:text-blue-600" />
              </div>
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700">
                {tool.category}
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1.5 line-clamp-1">
              {tool.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2 leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>
          <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tag className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500 line-clamp-1">{tool.problem}</span>
        </div>
      </div>
      
      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
    </div>
  );
};