'use client'

import React, { useEffect, useRef, useState } from 'react';

interface GameOfLifeProps {
  opacity?: number;
  blur?: number;
  scrollProgress?: number;
  delay?: number;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({ opacity = 1.0, blur = 0.1, scrollProgress = 0, delay = 1.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  // Track scrollProgress via ref so draw() always has latest value without restarting the game loop
  const scrollProgressRef = useRef(scrollProgress);
  useEffect(() => { scrollProgressRef.current = scrollProgress; }, [scrollProgress]);

  // Game state variables matching your Svelte implementation
  const [cellGrid, setCellGrid] = useState<number[][]>([]);
  const [cellColorGrid, setCellColorGrid] = useState<number[][][]>([]);
  const [generation, setGeneration] = useState(0);
  const [ruleNumber, setRuleNumber] = useState(0);
  const [birthRules, setBirthRules] = useState<number[]>([]);
  const [surviveRules, setSurviveRules] = useState<number[]>([]);
  const [numberGensLeftForRuleSet, setNumberGensLeftForRuleSet] = useState(100);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Grid properties - now as state variables that update on resize
  const cellSize = 20; // Increased from 12 to reduce memory usage and improve performance
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);

  // Prior generation grid for death detection (reduced from 3 to 1 for memory efficiency)
  const [priorGenGrid, setPriorGenGrid] = useState<number[][]>([]);


  const matrixToNumber = (m) => Number.parseInt(m.flat().join(''), 2);

  const numberToSquareMatrix = (n) => {
    let bits = n.toString(2);             // e.g. "101001111" [web:61][web:62]
    const len = bits.length;

    // find smallest k^2 >= len
    const size = Math.ceil(Math.sqrt(len));   // side length
    const targetLen = size * size;           // total bits (perfect square) [web:87]

    // pad with leading zeros to reach perfect square length
    bits = bits.padStart(targetLen, '0');    // [web:47][web:56][web:82]

    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(
        bits
          .slice(i * size, (i + 1) * size)
          .split('')
          .map(Number)
      );
    }
    return rows;
  };


  // Classic patterns for injection
  const patterns = [
    {
      name: "Glider",
      array: [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
      patternNumber: 143
    },
    {
      name: "Lightweight Spaceship",
      array: [
        [1, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1]
      ],
      patternNumber: 591407
    },
    {
      name: "Pulsar",
      array: [
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
      ],
      patternNumber: 67146150768898983591936
    },
    {
      name: "R-pentomino",
      array: [[0, 1, 1], [1, 1, 0], [0, 1, 0]],
      patternNumber: 242
    },
    {
      name: "Beacon",
      array: [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]],
      patternNumber: 52275
    }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newGridWidth = Math.floor(window.innerWidth / cellSize);
      const newGridHeight = Math.floor((window.innerHeight - 100) / cellSize);
      setGridWidth(newGridWidth);
      setGridHeight(newGridHeight);
    };

    // Initialize on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cellSize]);

  // Generate next rule number based on current rule and generation
  const generateNextRuleNumber = () => {
    return Math.abs(1 + (ruleNumber || 1) * generation) % Math.pow(2, 18);
  };

  // Generate rule set from rule number (exactly like your Svelte code)
  const generateRuleSet = (ruleNumberNew?: number) => {
    const newRuleNumber = ruleNumberNew || generateNextRuleNumber();
    const newBirthRules: number[] = [];
    const newSurviveRules: number[] = [];

    // Convert the number to binary and pad to 18 digits
    newRuleNumber
      .toString(2)
      .padStart(18, "0")
      .split("")
      .forEach((bit, index) => {
        // Convert every 1 to a rule based on the 1's index
        if (bit === "1") {
          if (index <= 9) newBirthRules.push(index);
          if (index > 9) newSurviveRules.push(index - 9);
        }
      });

    setRuleNumber(newRuleNumber);
    setBirthRules(newBirthRules);
    setSurviveRules(newSurviveRules);

    return {
      ruleNumber: newRuleNumber,
      birthRules: newBirthRules,
      surviveRules: newSurviveRules,
    };
  };

  // Change to random rules (matching your implementation)
  const changeRandomRules = () => {
    generateRuleSet();
    setNumberGensLeftForRuleSet(ruleNumber % 128);
  };

  // Place random pattern on the grid - now accepts grid parameters
  const placeRandomPattern = (currentGrid: number[][], currentColorGrid: number[][][], currentGridWidth: number, currentGridHeight: number) => {
    // Check if grids are properly initialized
    if (!currentGrid.length || !currentColorGrid.length) {
      return { grid: currentGrid, colorGrid: currentColorGrid };
    }

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const patternArray = randomPattern.array;

    // Get random position for the pattern
    const x = Math.floor(Math.random() * (currentGridWidth - patternArray[0].length));
    const y = Math.floor(Math.random() * (currentGridHeight - patternArray.length));

    const newGrid = currentGrid.map(row => [...row]);
    const newColorGrid = currentColorGrid.map(row => row.map(cell => [...cell]));

    // Place the pattern on the grid
    patternArray.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell === 1) {
          const newX = x + dx;
          const newY = y + dy;
          if (newX >= 0 && newX < currentGridWidth && newY >= 0 && newY < currentGridHeight) {
            newGrid[newY][newX] = 1;
            // Generate more vibrant, contrasting colors
            const baseHue = (ruleNumber * generation + newX * 20 + newY * 30) % 360;
            const resultColor = [
              Math.floor(150 + Math.sin(baseHue * 0.1) * 105), // Higher base values for brightness
              Math.floor(150 + Math.cos(baseHue * 0.15) * 105),
              Math.floor(150 + Math.sin(baseHue * 0.2) * 105)
            ];
            newColorGrid[newY][newX] = resultColor;
          }
        }
      });
    });

    return { grid: newGrid, colorGrid: newColorGrid };
  };

  // Initialize the game
  const initializeGame = (currentGridWidth: number, currentGridHeight: number) => {
    // Initialize cellGrid and cellColorGrid with empty cells
    let newCellGrid = Array(currentGridHeight)
      .fill(null)
      .map(() => Array(currentGridWidth).fill(0));
    let newCellColorGrid = Array(currentGridHeight)
      .fill(null)
      .map(() => Array(currentGridWidth).fill([0, 0, 0]));

    // Add some initial patterns to the local grids
    for (let i = 0; i < 2; i++) { // Reduced from 5 to 2 for lower memory usage
      const result = placeRandomPattern(newCellGrid, newCellColorGrid, currentGridWidth, currentGridHeight);
      newCellGrid = result.grid;
      newCellColorGrid = result.colorGrid;
    }

    // Set the state with the fully populated grids
    setCellGrid(newCellGrid);
    setCellColorGrid(newCellColorGrid);
    setGeneration(0);
  };

  // Activate a cell with enhanced color calculation
  const activateCell = (x: number, y: number, grid: number[][], colorGrid: number[][][], currentGridWidth: number, currentGridHeight: number) => {
    if (x < 0 || y < 0 || x >= currentGridWidth || y >= currentGridHeight) return { grid, colorGrid };

    const newGrid = [...grid];
    const newColorGrid = [...colorGrid];

    // Set the cell state to active
    newGrid[y][x] = 1;

    // Arrays to store neighbor colors
    const neighborColors: number[][] = [];
    const neighborCells = [
      [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
      [x, y - 1], [x, y + 1],
      [x + 1, y - 1], [x + 1, y], [x + 1, y + 1],
    ];

    // Collect colors of active neighboring cells
    for (const [nX, nY] of neighborCells) {
      if (
        nX >= 0 &&
        nY >= 0 &&
        nX < currentGridWidth &&
        nY < currentGridHeight &&
        newGrid[nY][nX] === 1
      ) {
        const cellColor = newColorGrid[nY][nX];
        if (cellColor && !cellColor.every(c => c === 0)) {
          neighborColors.push(cellColor);
        }
      }
    }

    let resultColor = [0, 0, 0];
    if (neighborColors.length) {
      // Calculate the average color of neighboring cells with enhancement
      const sum = neighborColors.reduce(
        (acc, cur) => [acc[0] + cur[0], acc[1] + cur[1], acc[2] + cur[2]],
        [0, 0, 0]
      );
      resultColor = sum.map((v) => Math.floor(v / neighborColors.length));

      // Add more variation and brightness
      resultColor = resultColor.map((c, i) =>
        Math.min(255, Math.max(100, c + (Math.sin(generation * 0.2 + i) * 80))) // Increased variation
      );
    } else {
      // Generate much more vibrant colors if no neighbor colors are found
      const baseHue = (ruleNumber * generation + x * 25 + y * 35) % 360;
      const positionInfluence = (x + y) * 15;
      resultColor = [
        Math.floor(120 + Math.sin((baseHue + positionInfluence) * 0.1) * 135), // Much brighter base
        Math.floor(120 + Math.cos((baseHue + positionInfluence + 120) * 0.1) * 135),
        Math.floor(120 + Math.sin((baseHue + positionInfluence + 240) * 0.1) * 135)
      ];
    }

    newColorGrid[y][x] = resultColor;
    return { grid: newGrid, colorGrid: newColorGrid };
  };

  // Count neighbors for a cell
  const countNeighbors = (x: number, y: number, grid: number[][], currentGridWidth: number, currentGridHeight: number) => {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < currentGridWidth && ny >= 0 && ny < currentGridHeight) {
          count += grid[ny][nx];
        }
      }
    }
    return count;
  };

  // Run one generation (matching your Svelte implementation)
  const runGeneration = () => {
    if (cellGrid.length === 0) return;

    // Create a copy of the current grid state
    const tempGrid = cellGrid.map((row) => [...row]);
    let newGrid = [...cellGrid];
    let newColorGrid = [...cellColorGrid];

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        // Optimization: Skip empty rows
        if (
          y > 0 &&
          y < gridHeight - 1 &&
          !tempGrid[y - 1].includes(1) &&
          !tempGrid[y].includes(1) &&
          !tempGrid[y + 1].includes(1)
        ) {
          break;
        }

        // Count live neighbors for the current cell
        const neighborCount = countNeighbors(x, y, tempGrid, gridWidth, gridHeight);

        // Apply Game of Life rules
        if (
          (tempGrid[y][x] === 0 && birthRules.includes(neighborCount)) ||
          (tempGrid[y][x] === 1 &&
            (surviveRules.includes(neighborCount) ||
              birthRules.includes(neighborCount)))
        ) {
          const result = activateCell(x, y, newGrid, newColorGrid, gridWidth, gridHeight);
          newGrid = result.grid;
          newColorGrid = result.colorGrid;
        } else if (
          tempGrid[y][x] === 1 &&
          !birthRules.includes(neighborCount) &&
          !surviveRules.includes(neighborCount)
        ) {
          // Deactivate cell
          newGrid[y][x] = 0;
          newColorGrid[y][x] = [0, 0, 0];
        }
      }
    }

    // Process next rule set
    if (isRandomMode) {
      setNumberGensLeftForRuleSet(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          changeRandomRules();
          return ruleNumber % 128;
        }
        return newCount;
      });
    }

    // Ensure the universe is not dead (simplified to only check against immediate prior)
    if (JSON.stringify(priorGenGrid) === JSON.stringify(newGrid)) {
      changeRandomRules();
      const result = placeRandomPattern(newGrid, newColorGrid, gridWidth, gridHeight);
      newGrid = result.grid;
      newColorGrid = result.colorGrid;
    }

    // Save the current grid state for future reference
    setPriorGenGrid(JSON.parse(JSON.stringify(newGrid)));

    setCellGrid(newGrid);
    setCellColorGrid(newColorGrid);
    setGeneration(prev => prev + 1);
  };

  // Draw the grid with much more vibrant colors
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cells with much more vibrant, contrasting colors
    cellGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const color = cellColorGrid[y][x];
          if (color && !color.every(c => c === 0)) {
            // Much more vibrant color processing
            const [r, g, b] = color;

            // Enhanced color with scroll-based effects and time variation
            const timeVariation = Math.sin(generation * 0.08) * 30;
            const scrollInfluence = scrollProgressRef.current * 60;

            // Create much brighter, more saturated colors
            const enhancedR = Math.min(255, Math.max(80, r + timeVariation + scrollInfluence));
            const enhancedG = Math.min(255, Math.max(80, g + Math.cos(generation * 0.06) * 40));
            const enhancedB = Math.min(255, Math.max(80, b + Math.sin(generation * 0.04) * 50));

            // Add strong glow effect
            const glowIntensity = 0.8 + Math.sin(generation * 0.15) * 0.4;
            ctx.shadowColor = `rgb(${enhancedR}, ${enhancedG}, ${enhancedB})`;
            ctx.shadowBlur = cellSize * glowIntensity;

            ctx.fillStyle = `rgb(${enhancedR}, ${enhancedG}, ${enhancedB})`;

            // Draw cell with square pixels (no rounded corners)
            ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);

            // Add inner glow for more depth
            ctx.shadowBlur = cellSize * 0.3;
            ctx.shadowColor = `rgba(${enhancedR}, ${enhancedG}, ${enhancedB}, 0.8)`;
            ctx.fill();
          }
        }
      });
    });
  };

  // Game loop using setInterval with configurable delay
  const startGameLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (isPlaying && cellGrid.length > 0) {
        runGeneration();
        draw();
      }
    }, delay * 1000); // Configurable delay between each generation
  };

  // Initialize on mount and when grid dimensions change
  useEffect(() => {
    // Generate initial random rule set
    const defaultRuleNumber = Math.floor(Math.random() * Math.pow(2, 18));
    generateRuleSet(defaultRuleNumber);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = gridWidth * cellSize;
      canvas.height = gridHeight * cellSize;
    }

    initializeGame(gridWidth, gridHeight);
  }, [gridWidth, gridHeight]);

  // Start game loop when grid is ready
  useEffect(() => {
    if (cellGrid.length > 0) {
      draw(); // Draw initial state
      startGameLoop();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cellGrid, isPlaying]);

  // Add random patterns occasionally for some activity
  useEffect(() => {
    const patternInterval = setInterval(() => {
      if (Math.random() > 0.85 && cellGrid.length > 0) { // Reduced frequency from 0.7 to 0.85 for lower CPU usage
        const result = placeRandomPattern(cellGrid, cellColorGrid, gridWidth, gridHeight);
        setCellGrid(result.grid);
        setCellColorGrid(result.colorGrid);
      }
    }, 10000); // Increased from 6000 to 10000ms for less frequent pattern injection

    return () => clearInterval(patternInterval);
  }, [cellGrid, cellColorGrid, ruleNumber, gridWidth, gridHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full "
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        mixBlendMode: 'screen',
        zIndex: 1
      }}
    />
  );
};

export default GameOfLife;