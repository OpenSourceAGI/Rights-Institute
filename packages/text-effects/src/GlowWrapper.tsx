/**
 * @fileoverview Glow Wrapper Effect Component
 * 
 * A reusable component that wraps children with an animated glowing border effect.
 * Creates a rotating conic gradient that provides a dynamic, eye-catching
 * visual enhancement to any content it wraps.
 * 
 * Features:
 * - Configurable glow colors
 * - Multiple size options (sm, md, lg)
 * - Animated rotating gradient effect
 * - Backdrop blur for depth
 * - Customizable className support
 * 

 */

import React from 'react';

interface GlowWrapperProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * GlowWrapper - A component that adds animated glowing border effects
 * 
 * Wraps any content with a rotating conic gradient that creates a
 * dynamic glowing effect. The glow color, size, and additional styling
 * can be customized through props. Useful for highlighting important
 * UI elements and creating visual interest.
 * 
 * @component
 * @param {GlowWrapperProps} props - The component props
 * @param {React.ReactNode} props.children - The content to wrap with glow effect
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.glowColor='#c2c2c2'] - The color of the glow effect
 * @param {'sm'|'md'|'lg'} [props.size='md'] - The size of the glow wrapper
 * @returns {JSX.Element} The wrapped content with glow effect
 * 
 * @example
 * ```tsx
 * <GlowWrapper glowColor="#3b82f6" size="lg">
 *   <button>Click me</button>
 * </GlowWrapper>
 * ```
 */
const GlowWrapper: React.FC<GlowWrapperProps> = ({ 
  children, 
  className = '', 
  glowColor = '#c2c2c2',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-0.5',
    md: 'p-px',
    lg: 'p-1'
  };

  return (
    <div className={`relative inline-flex overflow-hidden ${sizeClasses[size]} ${className}`}>
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
        style={{
          background: `conic-gradient(from_90deg_at_50%_50%, ${glowColor}_0%, #505050_50%, ${glowColor}_100%)`
        }}
      />
      <span className="inline-flex h-full w-full items-center justify-center bg-slate-950/90 backdrop-blur-3xl">
        {children}
      </span>
    </div>
  );
};

export default GlowWrapper;