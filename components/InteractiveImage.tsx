'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface InteractiveImageProps {
  src: string
  alt: string
}

export function InteractiveImage({ src, alt }: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dampenedX = useSpring(mouseX, { stiffness: 300, damping: 65 })
  const dampenedY = useSpring(mouseY, { stiffness: 300, damping: 65 })

  const rotateX = useTransform(dampenedY, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(dampenedX, [-0.5, 0.5], ['-7.5deg', '7.5deg'])
  const scale = useTransform(dampenedX, [-1, 0, 1], [1, isHovered ? 1.05 : 1, 1])

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
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          scale,
        }}
        // @ts-ignore  type error
        className="relative w-full h-[340px] rounded-lg overflow-hidden border border-solid shadow-md bg-slate-950"
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 668px) 100vw, (max-width: 1200px) 100vw, 33vw"
          className="relative z-0"
          unoptimized
        />
      </motion.div>
    </div>
  )
}
