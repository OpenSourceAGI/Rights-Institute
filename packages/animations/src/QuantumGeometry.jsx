/**
 * @fileoverview Quantum Geometry Interactive Component
 * 
 * An interactive 3D visualization component that creates parabolic spherical
 * orbitals inspired by quantum superposition and wave function collapse.
 * Features dynamic line generation, color schemes, and interactive effects
 * that respond to user interaction.
 * 
 * Features:
 * - Dynamic sphere generation with configurable parameters
 * - Multiple color schemes (Neon, Ocean, Galaxy, etc.)
 * - Interactive hover effects and animations
 * - Auto-randomization with configurable intervals
 * - Quantum-inspired orbital visualization
 * - Responsive design with mouse interaction
 * 

 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * QuantumGeometry - Interactive quantum-inspired 3D visualization
 * 
 * Creates a dynamic 3D sphere with animated orbital lines that represent
 * quantum superposition states. The component generates parabolic spherical
 * orbitals with configurable parameters and multiple color schemes. Users
 * can interact with the visualization through hover effects and clicks,
 * triggering wave function collapse-like animations.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Object} [props.config] - Configuration object for sphere generation
 * @param {number} [props.config.minLines=6] - Minimum number of orbital lines
 * @param {number} [props.config.maxLines=12] - Maximum number of orbital lines
 * @param {number} [props.config.minSphereSize=120] - Minimum sphere size in pixels
 * @param {number} [props.config.maxSphereSize=380] - Maximum sphere size in pixels
 * @param {boolean} [props.autoRandomize=true] - Whether to auto-randomize the sphere
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {Function} [props.onSphereClick] - Callback function for sphere clicks
 * @returns {JSX.Element} The quantum geometry visualization
 * 
 * @example
 * ```tsx
 * <QuantumGeometry 
 *   config={{ minLines: 8, maxLines: 15 }}
 *   autoRandomize={true}
 *   onSphereClick={(event) => console.log('Sphere clicked')}
 * />
 * ```
 */
const QuantumGeometry = ({
  config = {
    minLines: 6,
    maxLines: 12,
    minSphereSize: 120,
    maxSphereSize: 380,
    minLineWidth: 2,
    maxLineWidth: 8,
    minGlowIntensity: 6,
    maxGlowIntensity: 12,
    minRotationSpeed: 2,
    maxRotationSpeed: 15,
    minSaturation: 70,
    maxSaturation: 90,
    minLightness: 50,
    maxLightness: 70,
    autoRandomizeMin: 5000,
    autoRandomizeMax: 12000,
    opacity: 0.75
  },
  autoRandomize = true,
  className = "",
  onSphereClick = null
}) => {
  // Simple random number generator with seed - same as Svelte
  let seed = useRef(Date.now() % 2147483647);
  
  const random = () => {
    seed.current = (seed.current * 16807) % 2147483647;
    return (seed.current - 1) / 2147483646;
  };

  const randomRange = (min, max) => min + random() * (max - min);
  const randomInt = (min, max) => Math.floor(randomRange(min, max + 1));

  // Enhanced color scheme definitions - exact same as Svelte
  const colorSchemes = {
    Single: (index, total, baseHue) => baseHue,
    Dual: (index, total, baseHue) => 
      index % 2 === 0 ? baseHue : (baseHue + 180) % 360,
    Complementary: (index, total, baseHue) => 
      index % 2 === 0 ? baseHue : (baseHue + 180) % 360,
    Triadic: (index, total, baseHue) => 
      baseHue + (index % 3) * 120,
    Analogous: (index, total, baseHue) => 
      (baseHue + (index * 30)) % 360,
    Split: (index, total, baseHue) => {
      const angles = [0, 150, 210];
      return (baseHue + angles[index % 3]) % 360;
    },
    Tetradic: (index, total, baseHue) => 
      baseHue + (index % 4) * 90,
    Monochromatic: (index, total, baseHue) => baseHue,
    Warm: (index, total) => 
      randomRange(0, 60) + (index % 2) * 300,
    Cool: (index, total) => 
      randomRange(180, 270),
    Neon: (index, total) => {
      const neonHues = [300, 60, 120, 180, 240, 0];
      return neonHues[index % neonHues.length];
    },
    Sunset: (index, total) => {
      const sunsetHues = [15, 30, 45, 330, 345];
      return sunsetHues[index % sunsetHues.length];
    },
    Ocean: (index, total) => {
      const oceanHues = [180, 200, 220, 240, 160];
      return oceanHues[index % oceanHues.length];
    },
    Forest: (index, total) => {
      const forestHues = [120, 140, 90, 100, 80];
      return forestHues[index % forestHues.length];
    },
    Galaxy: (index, total) => {
      const galaxyHues = [240, 280, 300, 260, 220];
      return galaxyHues[index % galaxyHues.length];
    },
    Fire: (index, total) => {
      const fireHues = [0, 15, 30, 45, 60];
      return fireHues[index % fireHues.length];
    },
    Ice: (index, total) => {
      const iceHues = [180, 190, 200, 210, 220];
      return iceHues[index % iceHues.length];
    },
    Cyberpunk: (index, total) => {
      const cyberpunkHues = [300, 180, 60, 320, 200];
      return cyberpunkHues[index % cyberpunkHues.length];
    },
    Pastel: (index, total) => random() * 360,
    Vintage: (index, total) => {
      const vintageHues = [30, 45, 60, 200, 220];
      return vintageHues[index % vintageHues.length];
    },
    Gradient: (index, total, baseHue) => 
      (baseHue + (index / total) * 60) % 360,
    Electric: (index, total) => {
      const electricHues = [60, 120, 180, 240, 300];
      return electricHues[index % electricHues.length];
    }
  };

  const colorSchemeNames = Object.keys(colorSchemes);

  /**
   * Parabolic spherical orbital, inspired by quantum superposition and the 
   * wave function collapse.
   * @author vtempest (2025)
   */
  function generateSphereConfig(cfg = config) {
    const lineCount = randomInt(cfg.minLines, cfg.maxLines);
    const sphereSize = randomInt(cfg.minSphereSize, cfg.maxSphereSize);
    const lineWidth = randomRange(cfg.minLineWidth, cfg.maxLineWidth);
    const glowIntensity = randomRange(cfg.minGlowIntensity, cfg.maxGlowIntensity);
    const rotationSpeed = randomRange(cfg.minRotationSpeed, cfg.maxRotationSpeed);
    
    // Select random color scheme
    const colorSchemeName = colorSchemeNames[randomInt(0, colorSchemeNames.length - 1)];
    const colorSchemeFunc = colorSchemes[colorSchemeName];
    
    // Base color configuration
    let saturation = randomInt(cfg.minSaturation, cfg.maxSaturation);
    let lightness = randomInt(cfg.minLightness, cfg.maxLightness);
    
    // Adjust saturation and lightness for specific schemes
    if (colorSchemeName === 'Pastel') {
      saturation = randomInt(30, 50);
      lightness = randomInt(70, 85);
    } else if (colorSchemeName === 'Neon' || colorSchemeName === 'Electric') {
      saturation = randomInt(85, 100);
      lightness = randomInt(50, 70);
    } else if (colorSchemeName === 'Vintage') {
      saturation = randomInt(40, 60);
      lightness = randomInt(40, 60);
    } else if (colorSchemeName === 'Monochromatic') {
      lightness = randomInt(30, 80);
    }

    const baseHue = random() * 360;

    // Generate line data with enhanced color schemes
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      let hue = colorSchemeFunc(i, lineCount, baseHue);
      
      // Special handling for monochromatic - vary lightness instead of hue
      let lineLightness = lightness;
      if (colorSchemeName === 'Monochromatic') {
        lineLightness = randomInt(30, 80);
      }

      lines.push({
        id: i,
        angleX: random() * 360,
        angleY: random() * 360,
        angleZ: random() * 360,
        hue,
        speed: randomRange(0.5, 1.5),
        customLightness: colorSchemeName === 'Monochromatic' ? lineLightness : undefined
      });
    }

    return {
      lines,
      sphereSize,
      lineWidth,
      glowIntensity,
      rotationSpeed,
      saturation,
      lightness,
      colorScheme: colorSchemeName
    };
  }

  // State variables - same structure as Svelte
  const [sphereData, setSphereData] = useState(() => generateSphereConfig(config));
  const [hueShift, setHueShift] = useState(0);
  const [hoveredLineId, setHoveredLineId] = useState(null);
  const [hoverEffects, setHoverEffects] = useState({});
  const sphereRef = useRef(null);
  const timeoutId = useRef(null);
  const hueTimeoutId = useRef(null);

  const randomizeSphere = () => {
    setSphereData(generateSphereConfig(config));
  };

  const shiftHue = () => {
    setHueShift(prev => (prev + randomRange(10, 50)) % 360);
  };

  const handleMouseMove = (event) => {
    if (!sphereRef.current) return;

    const sphereRect = sphereRef.current.getBoundingClientRect();
    const isOverSphere = (
      event.clientX >= sphereRect.left &&
      event.clientX <= sphereRect.right &&
      event.clientY >= sphereRect.top &&
      event.clientY <= sphereRect.bottom
    );

    if (!isOverSphere) {
      setHoveredLineId(null);
      return;
    }

    // Find which line element is being hovered
    const elementFromPoint = document.elementFromPoint(event.clientX, event.clientY);
    if (elementFromPoint && elementFromPoint.dataset.lineId) {
      const lineId = parseInt(elementFromPoint.dataset.lineId);
      if (lineId !== hoveredLineId) {
        setHoveredLineId(lineId);
        // Generate random hover effects
        setHoverEffects({
          hueShift: randomRange(-90, 90),
          saturationBoost: randomRange(10, 30),
          lightnessShift: randomRange(-20, 20),
          glowMultiplier: randomRange(1.5, 3),
          speedMultiplier: randomRange(0.3, 2.5),
          scaleMultiplier: randomRange(1.1, 1.4)
        });
      }
    } else {
      setHoveredLineId(null);
    }
  };

  const handleSphereClick = (event) => {
    if (onSphereClick) {
      onSphereClick();
    }
  };

  // Derived function to calculate line styles - same logic as Svelte
  const getLineStyle = (line) => {
    const isHovered = hoveredLineId === line.id;
    let finalHue = (line.hue + hueShift) % 360;
    let finalSaturation = sphereData.saturation;
    let finalLightness = line.customLightness || sphereData.lightness;
    let finalGlow = sphereData.glowIntensity;
    let finalSpeed = sphereData.rotationSpeed * line.speed;
    let finalScale = 1;

    if (isHovered) {
      finalHue = (finalHue + hoverEffects.hueShift) % 360;
      finalSaturation = Math.min(100, finalSaturation + hoverEffects.saturationBoost);
      finalLightness = Math.max(0, Math.min(100, finalLightness + hoverEffects.lightnessShift));
      finalGlow *= hoverEffects.glowMultiplier;
      finalSpeed *= hoverEffects.speedMultiplier;
      finalScale = hoverEffects.scaleMultiplier;
    }

    const color = `hsla(${finalHue}, ${finalSaturation}%, ${finalLightness}%, ${config.opacity})`;
    
    return {
      transform: `rotateX(${line.angleX}deg) rotateY(${line.angleY}deg) rotateZ(${line.angleZ}deg) scale(${finalScale})`,
      borderColor: color,
      borderWidth: `${sphereData.lineWidth}px`,
      boxShadow: `0 0 ${finalGlow}px ${color}`,
      animationDuration: `${finalSpeed}s`,
      zIndex: isHovered ? 10 : 1
    };
  };

  useEffect(() => {
    // Add global mouse event listener
    document.addEventListener('mousemove', handleMouseMove);

    if (autoRandomize) {
      const scheduleNext = () => {
        randomizeSphere();
        const delay = randomRange(config.autoRandomizeMin, config.autoRandomizeMax);
        timeoutId.current = window.setTimeout(scheduleNext, delay);
      };

      const scheduleHueShift = () => {
        shiftHue();
        const delay = randomRange(2000, 6000);
        hueTimeoutId.current = window.setTimeout(scheduleHueShift, delay);
      };

      scheduleNext();
      scheduleHueShift();
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId.current) clearTimeout(timeoutId.current);
      if (hueTimeoutId.current) clearTimeout(hueTimeoutId.current);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .orbital-sphere {
          perspective: 1000px;
        }
        
        @keyframes orbitalSpin {
          from { 
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); 
          }
          to { 
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); 
          }
        }
        
        @keyframes orbitalLineSpin {
          from { 
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); 
          }
          to { 
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); 
          }
        }

        .orbital-line {
          animation: orbitalLineSpin infinite linear;
        }
      `}</style>
      
      <div className={`relative w-full h-full flex justify-center items-center p-2.5 overflow-hidden ${className}`}>
        {/* Color scheme indicator (optional debug info) */}
        <div className="absolute top-2 left-2 text-xs opacity-50 pointer-events-none z-20">
          {/* {sphereData.colorScheme} */}
        </div>
        
        <div className="relative z-10" onClick={handleSphereClick} ref={sphereRef}>
          <div 
            className="relative cursor-pointer orbital-sphere"
            style={{
              transformStyle: 'preserve-3d',
              animation: `orbitalSpin ${sphereData.rotationSpeed}s infinite linear`,
              width: `${sphereData.sphereSize}px`,
              height: `${sphereData.sphereSize}px`,
            }}
          >
            {sphereData.lines.map((line) => {
              const lineStyle = getLineStyle(line);
              return (
                <div
                  key={line.id}
                  className="absolute inset-0 rounded-full border-solid transition-all duration-200 ease-in-out orbital-line"
                  data-line-id={line.id}
                  style={{
                    transform: lineStyle.transform,
                    borderColor: lineStyle.borderColor,
                    borderWidth: lineStyle.borderWidth,
                    boxShadow: lineStyle.boxShadow,
                    animationDuration: lineStyle.animationDuration,
                    zIndex: lineStyle.zIndex,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantumGeometry;