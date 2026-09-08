import React from 'react';
import { ToolCard } from './ToolCard';
import { Tool } from './tool';
import { Search } from 'lucide-react';

interface ToolGridProps {
  tools: Tool[];
  searchTerm: string;
  selectedCategory: string;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ tools, searchTerm, selectedCategory }) => {
  const filteredTools = tools.filter(tool => {
    const matchesSearch = searchTerm === '' || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      tool.category.toLowerCase() === selectedCategory.replace('-', ' ');
    
    return matchesSearch && matchesCategory;
  });

  if (filteredTools.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or selecting a different category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};