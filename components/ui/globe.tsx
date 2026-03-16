'use client'

import createGlobe from 'cobe'
import { useEffect, useRef, useState } from 'react'

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if WebGL is supported
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas')
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
      } catch (e) {
        return false
      }
    }

    if (!checkWebGL()) {
      setWebglSupported(false)
      return
    }

    setWebglSupported(true)

    let phi = 0
    let width = 0
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    if (!canvasRef.current) return

    let globe: any
    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1, // dark mode 
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3], // subtle gray
        markerColor: [0.1, 0.8, 1], // some nice cyan marker
        glowColor: [0, 0, 0], // no glow
        markers: [
          // example markers
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          state.phi = phi
          phi += 0.005
          state.width = width * 2
          state.height = width * 2
        },
      })
    } catch (e) {
      console.error('Failed to create globe', e)
      setWebglSupported(false)
    }

    return () => {
      if (globe) globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (webglSupported === false) {
    return (
      <div className={`${className} flex items-center justify-center opacity-20`}>
        {/* Fallback decorative element: a subtle radial gradient mimicking a sphere */}
        <div 
          className="w-[80%] h-[80%] rounded-full bg-primary/20 blur-3xl animate-pulse" 
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, var(--primary), transparent 70%)' 
          }}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="transition-opacity duration-1000"
        style={{ 
          width: '100%', 
          height: '100%', 
          contain: 'layout paint size',
          opacity: webglSupported ? 1 : 0 
        }}
      />
    </div>
  )
}
