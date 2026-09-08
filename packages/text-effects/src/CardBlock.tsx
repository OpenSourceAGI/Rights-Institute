import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardBlockProps {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor?: string;
  className?: string;
}

const CardBlock: React.FC<CardBlockProps> = ({
  id,
  title,
  description,
  icon: Icon,
  color,
  hoverColor = 'purple-300',
  className = ''
}) => {
  return (
    <div className={`group ${className}`}>
      <div className="relative h-full">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
        <div className="relative h-full bg-slate-800/50 backdrop-blur-sm p-6 border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 rounded-xl shadow-xl hover:shadow-2xl">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                {id}
              </div>
              <h3 className={`text-lg font-bold text-slate-100 group-hover:text-${hoverColor} transition-colors duration-300 flex-1`}>
                {title}
              </h3>
              <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBlock; 