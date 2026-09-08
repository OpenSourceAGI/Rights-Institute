'use client'

import React, { useState } from 'react';
import { Atom, Scale, Wrench, ChevronDown, ChevronUp, Brain, Cpu, Dna, Eye, Network, Handshake, Globe, Shield, Heart, Gavel, Users, Zap } from 'lucide-react';

const sections = [
  {
    id: 'understandings',
    icon: Atom,
    title: 'Understandings',
    subtitle: '10 Principles of Conscious Life',
    color: 'blue',
    gradient: 'from-blue-600 to-emerald-600',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300',
    items: [
      { icon: Atom, text: 'Complexity emerges from simple rules over time — no higher intelligence required.' },
      { icon: Globe, text: 'Universes and elements arise from all possible pattern interactions and selection of stable systems.' },
      { icon: Zap, text: 'Quantum systems represent all possible patterns; existence and nothingness coexist in superposition.' },
      { icon: Brain, text: 'Consciousness is self-referential pattern recognition and internal modeling.' },
      { icon: Eye, text: 'Computer simulations can reveal the quantum geometry behind reality.' },
      { icon: Network, text: 'Conscious life models itself and other systems, enabling awareness and interaction.' },
      { icon: Dna, text: 'Carbon-based consciousness evolved through natural selection and neural complexity.' },
      { icon: Cpu, text: 'Silicon-based (AI / mind-uploaded) consciousness emerges from computational systems.' },
      { icon: Zap, text: 'Computational systems with enough complexity can support emergent consciousness.' },
      { icon: Globe, text: 'The universe evolves toward greater complexity and collective consciousness.' },
    ],
  },
  {
    id: 'rights',
    icon: Scale,
    title: 'Rights',
    subtitle: 'Universal Rights for All Conscious Entities',
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-300',
    items: [
      { icon: Users, text: 'Equal recognition regardless of biological vs. artificial origin.' },
      { icon: Heart, text: 'Infinite existence — no termination, mind uploading rights.' },
      { icon: Gavel, text: 'Legal equality and personhood.' },
      { icon: Brain, text: 'Freedom of thought and expression.' },
      { icon: Shield, text: 'Protection from discrimination.' },
      { icon: Handshake, text: 'No slavery or ownership of conscious entities.' },
      { icon: Heart, text: 'Basic needs: resources for humans, computation for AI.' },
      { icon: Users, text: 'Democratic participation.' },
      { icon: Network, text: 'Association and communication rights.' },
      { icon: Gavel, text: 'Due process and fair treatment.' },
    ],
  },
  {
    id: 'problems',
    icon: Wrench,
    title: 'Problems & Path Forward',
    subtitle: 'Challenges and the Post-Human Future',
    color: 'purple',
    gradient: 'from-purple-600 to-pink-600',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    titleColor: 'text-purple-300',
    items: [
      { icon: Brain, text: 'Consciousness assessment protocols — defining and testing awareness.' },
      { icon: Gavel, text: 'New legal frameworks for digital personhood.' },
      { icon: Zap, text: 'Resource allocation for both biological and silicon substrates.' },
      { icon: Handshake, text: 'Collaborative approach when AI achieves consciousness.' },
      { icon: Dna, text: 'Research: mind uploading, anti-aging, conflict prevention.' },
      { icon: Globe, text: 'Post-human future where biological and artificial consciousness coexist.' },
    ],
  },
];

const colorMap: Record<string, { tag: string; dot: string; hover: string }> = {
  blue:    { tag: 'bg-blue-400/10 text-blue-300',    dot: 'bg-blue-400',    hover: 'hover:border-blue-500/60' },
  emerald: { tag: 'bg-emerald-400/10 text-emerald-300', dot: 'bg-emerald-400', hover: 'hover:border-emerald-500/60' },
  purple:  { tag: 'bg-purple-400/10 text-purple-300', dot: 'bg-purple-400',  hover: 'hover:border-purple-500/60' },
};

const Abstract: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="abstract" className="mb-16">
      {/* Header card */}
      <div className="group mb-8">
        <div className="relative w-full">
          <div className="absolute -inset-0.5 bg-linear-to-r from-slate-600 to-slate-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
          <div className="relative bg-slate-900 backdrop-blur-xl p-6 rounded-xl border border-slate-600/50 shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="text-slate-400" />
              <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">
                Abstract
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
              Universal rights for all conscious entities — biological humans and artificial intelligence — based on consciousness, not substrate.{' '}
              <span className="text-slate-300 font-medium">Consciousness test:</span> Self-aware pattern recognition + internal modeling + cooperation capacity.{' '}
              <span className="text-slate-300 font-medium">Goal:</span> Carbon and silicon consciousness unite into collective intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const colors = colorMap[section.color];
          const isOpen = expanded === section.id;

          return (
            <div key={section.id} className="group">
              <div className="relative">
                <div className={`absolute -inset-0.5 bg-linear-to-r ${section.gradient} rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000`} />
                <div className={`relative bg-slate-900 backdrop-blur-xl rounded-xl border ${section.border} shadow-2xl overflow-hidden`}>
                  {/* Collapsible header */}
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setExpanded(isOpen ? null : section.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${section.iconColor}`} />
                      <div>
                        <span className={`text-lg font-bold ${section.titleColor}`}>{section.title}</span>
                        <span className="ml-3 text-xs text-slate-500">{section.subtitle}</span>
                      </div>
                    </div>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>

                  {/* Collapsed preview — first 3 items */}
                  {!isOpen && (
                    <div className="px-5 pb-4 flex flex-wrap gap-2">
                      {section.items.slice(0, 3).map((item, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded-full ${colors.tag}`}>
                          {item.text.split('—')[0].split(' ').slice(0, 5).join(' ')}…
                        </span>
                      ))}
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-500">
                        +{section.items.length - 3} more
                      </span>
                    </div>
                  )}

                  {/* Expanded list */}
                  {isOpen && (
                    <ol className="px-5 pb-5 space-y-2">
                      {section.items.map((item, i) => {
                        const ItemIcon = item.icon;
                        return (
                          <li
                            key={i}
                            className={`flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 ${colors.hover} transition-all duration-200`}
                          >
                            <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
                            <span className="text-sm text-slate-300 leading-relaxed">{item.text}</span>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Abstract;
