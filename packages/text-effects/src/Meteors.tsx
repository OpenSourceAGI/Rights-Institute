/**
 * @fileoverview Meteors Effect Component
 * 
 * A visual effect component that creates animated meteor-like particles
 * that streak across the screen. Each meteor has a randomized position,
 * delay, and duration to create a natural, varied effect.
 * 
 * Features:
 * - Configurable number of meteors
 * - Randomized positions and timing
 * - CSS-based animations with custom keyframes
 * - Gradient trail effects
 * - Responsive design
 * 

 */

import React from 'react';

interface MeteorsProps {
  number?: number;
}

/**
 * Meteors - A component that creates animated meteor effects
 * 
 * Generates a specified number of animated meteor particles that
 * streak across the screen with randomized positions, delays, and
 * durations. Each meteor has a gradient trail effect and rotates
 * at a specific angle to create a realistic meteor shower effect.
 * 
 * @component
 * @param {MeteorsProps} props - The component props
 * @param {number} [props.number=20] - The number of meteors to display
 * @returns {JSX.Element} The meteor effects container
 * 
 * @example
 * ```tsx
 * <Meteors number={15} />
 * ```
 */
const Meteors: React.FC<MeteorsProps> = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true);
  
  return (
    <div className="absolute inset-0 overflow-hidden ">
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className="absolute animate-meteor-effect left-1/2 top-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-215"
          style={{
            top: Math.random() * (400 - -400) + -400 + "px",
            left: Math.random() * (400 - -400) + -400 + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.random() * (10 - 2) + 2 + "s",
          }}
        >
          <div className=" absolute top-1/2 left-1/2 h-px w-[50px] -translate-y-1/2 -translate-x-1/2 bg-linear-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;