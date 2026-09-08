/**
 * @fileoverview Border Beam Effect Component
 * 
 * A component that creates an animated border beam effect using CSS
 * conic gradients and masks. The effect creates a rotating light beam
 * that travels around the border of an element, typically triggered
 * on hover for interactive feedback.
 * 
 * Features:
 * - Configurable beam size and duration
 * - Customizable border width and colors
 * - CSS-based animation with conic gradients
 * - Mask-based border effect
 * - Hover-triggered visibility
 * 

 */

import React from 'react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam - A component that creates animated border beam effects
 * 
 * Generates a rotating light beam effect around the border of an element
 * using CSS conic gradients and masking. The beam rotates continuously
 * and becomes visible on hover, creating an engaging interactive effect.
 * 
 * @component
 * @param {BorderBeamProps} props - The component props
 * @param {number} [props.size=200] - The size of the beam effect in pixels
 * @param {number} [props.duration=15] - The duration of one complete rotation in seconds
 * @param {number} [props.borderWidth=1.5] - The width of the border beam in pixels
 * @param {string} [props.colorFrom='#ffaa40'] - The starting color of the beam gradient
 * @param {string} [props.colorTo='#9c40ff'] - The ending color of the beam gradient
 * @param {number} [props.delay=0] - The delay before the animation starts in seconds
 * @returns {JSX.Element} The border beam effect container
 * 
 * @example
 * ```tsx
 * <div className="group relative">
 *   <BorderBeam size={300} duration={10} colorFrom="#3b82f6" colorTo="#10b981" />
 *   <div className="p-4">Content with border beam effect</div>
 * </div>
 * ```
 */
const BorderBeam: React.FC<BorderBeamProps> = ({
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  delay = 0,
}) => {
  return (
    <div
      className=" absolute inset-0 rounded-xl"
      style={{
        '--size': size,
        '--duration': duration,
        '--border-width': borderWidth,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--delay': `-${delay}s`,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            conic-gradient(
              from 0deg,
              transparent,
              ${colorFrom},
              ${colorTo},
              transparent
            )
          `,
          animation: `border-beam ${duration}s linear infinite`,
          animationDelay: 'var(--delay)',
          mask: `
            radial-gradient(
              calc(var(--size) * 1px) circle at center,
              transparent calc(var(--size) * 1px - var(--border-width) * 1px),
              black calc(var(--size) * 1px)
            )
          `,
          WebkitMask: `
            radial-gradient(
              calc(var(--size) * 1px) circle at center,
              transparent calc(var(--size) * 1px - var(--border-width) * 1px),
              black calc(var(--size) * 1px)
            )
          `,
        }}
      />
    </div>
  );
};

export default BorderBeam;