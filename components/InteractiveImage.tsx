'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface InteractiveImageProps {
  src: string
  alt: string
  /** Natural pixel dimensions of the recording, used to size the terminal frame with no letterboxing. */
  width: number
  height: number
}

// Sampled directly from the VHS Catppuccin Mocha recordings so the window
// chrome is indistinguishable from the terminal background inside the GIF.
const TERMINAL_BG = '#1c1c2c'

export function InteractiveImage({ src, alt, width, height }: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dampenedX = useSpring(mouseX, { stiffness: 300, damping: 65 })
  const dampenedY = useSpring(mouseY, { stiffness: 300, damping: 65 })

  const rotateX = useTransform(dampenedY, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(dampenedX, [-0.5, 0.5], ['-4deg', '4deg'])
  const scale = useTransform(dampenedX, [-1, 0, 1], [1, isHovered ? 1.015 : 1, 1])

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set((event.clientX - centerX) / (rect.width / 2))
      mouseY.set((event.clientY - centerY) / (rect.height / 2))
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered, mouseX, mouseY])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          scale,
          backgroundColor: TERMINAL_BG,
        }}
        // @ts-ignore  type error
        className="relative w-full rounded-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
      >
        <div
          className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-2.5"
          style={{ backgroundColor: TERMINAL_BG }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}`, backgroundColor: TERMINAL_BG }}>
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 668px) 100vw, (max-width: 1200px) 100vw, 33vw"
            className="relative z-0"
            unoptimized
          />
        </div>
      </motion.div>
    </div>
  )
}
