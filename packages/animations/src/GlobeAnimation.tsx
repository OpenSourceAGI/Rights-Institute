"use client"

import React, { useEffect, useRef } from "react"
import createGlobe from "cobe"
import type { COBEOptions, Globe } from "cobe"

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

const generateRandomColor = (): [number, number, number] => [
  Math.random(),
  Math.random() * 0.5 + 0.5,
  Math.random() * 0.5 + 0.5,
];

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 3.5,
  baseColor: [1, 1, 1],
  markerColor: generateRandomColor(),
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.05 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [23.8103, 90.4125], size: 0.06 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.09 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [19.4326, -99.1332], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.09 },
    { location: [34.6937, 135.5022], size: 0.06 },
    { location: [41.0082, 28.9784], size: 0.07 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [48.8566, 2.3522], size: 0.07 },
    { location: [35.6762, 139.6503], size: 0.08 },
    { location: [-33.8688, 151.2093], size: 0.06 },
    { location: [55.7558, 37.6176], size: 0.07 },
    { location: [-1.2921, 36.8219], size: 0.05 },
    { location: [37.7749, -122.4194], size: 0.08 },
    { location: [52.5200, 13.4050], size: 0.06 },
    { location: [25.2048, 55.2708], size: 0.07 },
    { location: [-34.6037, -58.3816], size: 0.06 },
    { location: [1.3521, 103.8198], size: 0.06 },
    { location: [55.9533, -3.1883], size: 0.05 },
    { location: [59.9139, 10.7522], size: 0.05 },
    { location: [60.1699, 24.9384], size: 0.05 },
    { location: [64.1466, -21.9426], size: 0.04 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const rRef = useRef(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      rRef.current = delta / 200
    }
  }

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current) return

    const globe: Globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      markerColor: generateRandomColor(),
    })

    let animFrameId: number
    const animate = () => {
      if (!pointerInteracting.current) phi += 0.005
      globe.update({
        phi: phi + rRef.current,
        width: width * 2,
        height: width * 2,
      })
      animFrameId = requestAnimationFrame(animate)
    }
    animFrameId = requestAnimationFrame(animate)

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })

    return () => {
      cancelAnimationFrame(animFrameId)
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
