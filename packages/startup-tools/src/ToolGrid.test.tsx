import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToolGrid } from './ToolGrid';
import type { Tool } from './tool';

const tools: Tool[] = [
  {
    id: '1',
    name: 'Contract Wizard',
    description: 'Draft contractor agreements in minutes',
    url: 'https://example.com/contract-wizard',
    category: 'Legal',
    problem: 'Drafting contracts is slow',
  },
  {
    id: '2',
    name: 'DesignFlow',
    description: 'A design system builder for teams',
    url: 'https://example.com/designflow',
    category: 'Design',
    problem: 'Inconsistent UI components',
  },
  {
    id: '3',
    name: 'PayTrack',
    description: 'Track startup expenses and budgets',
    url: 'https://example.com/paytrack',
    category: 'Finance',
    problem: 'Manual expense tracking',
  },
];

describe('ToolGrid', () => {
  it('renders all tools when there is no search term and category is all', () => {
    render(<ToolGrid tools={tools} searchTerm="" selectedCategory="all" />);
    expect(screen.getByText('Contract Wizard')).toBeInTheDocument();
    expect(screen.getByText('DesignFlow')).toBeInTheDocument();
    expect(screen.getByText('PayTrack')).toBeInTheDocument();
    expect(screen.getByText('Showing 3 tools')).toBeInTheDocument();
  });

  it('filters by name (case-insensitive)', () => {
    render(<ToolGrid tools={tools} searchTerm="contract" selectedCategory="all" />);
    expect(screen.getByText('Contract Wizard')).toBeInTheDocument();
    expect(screen.queryByText('DesignFlow')).not.toBeInTheDocument();
    expect(screen.queryByText('PayTrack')).not.toBeInTheDocument();
  });

  it('filters by description content', () => {
    render(<ToolGrid tools={tools} searchTerm="budgets" selectedCategory="all" />);
    expect(screen.getByText('PayTrack')).toBeInTheDocument();
    expect(screen.queryByText('Contract Wizard')).not.toBeInTheDocument();
  });

  it('filters by problem content', () => {
    render(<ToolGrid tools={tools} searchTerm="Inconsistent" selectedCategory="all" />);
    expect(screen.getByText('DesignFlow')).toBeInTheDocument();
    expect(screen.queryByText('PayTrack')).not.toBeInTheDocument();
  });

  it('filters by category', () => {
    render(<ToolGrid tools={tools} searchTerm="" selectedCategory="design" />);
    expect(screen.getByText('DesignFlow')).toBeInTheDocument();
    expect(screen.queryByText('Contract Wizard')).not.toBeInTheDocument();
  });

  it('translates a hyphenated category slug into its spaced category name', () => {
    const acceleratorTool: Tool = {
      id: '4',
      name: 'LaunchPad',
      description: 'Accelerator application tracker',
      url: 'https://example.com/launchpad',
      category: 'startup accelerators',
      problem: 'Hard to track applications',
    };
    render(<ToolGrid tools={[acceleratorTool]} searchTerm="" selectedCategory="startup-accelerators" />);
    expect(screen.getByText('LaunchPad')).toBeInTheDocument();
  });

  it('combines search and category filters', () => {
    render(<ToolGrid tools={tools} searchTerm="design" selectedCategory="finance" />);
    expect(screen.queryByText('DesignFlow')).not.toBeInTheDocument();
    expect(screen.queryByText('PayTrack')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<ToolGrid tools={tools} searchTerm="nonexistent-tool-xyz" selectedCategory="all" />);
    expect(screen.getByText('No tools found')).toBeInTheDocument();
  });

  it('shows singular tool text when exactly one result matches', () => {
    render(<ToolGrid tools={tools} searchTerm="" selectedCategory="finance" />);
    expect(screen.getByText('Showing 1 tool')).toBeInTheDocument();
  });

  it('shows the search term in the results summary', () => {
    render(<ToolGrid tools={tools} searchTerm="Contract" selectedCategory="all" />);
    expect(screen.getByText(/matching "Contract"/)).toBeInTheDocument();
  });
});
