'use client'

import { CopyableCommand } from '@/components/CopyableCommand'
import { InteractiveImage } from '@/components/InteractiveImage'
import { motion } from 'framer-motion'

export function CommandLogEntry({
  number,
  icon,
  title,
  description,
  command,
  imageSrc,
  imageWidth,
  imageHeight,
  reverse = false,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  command: { value: string; command: string }[]
  imageSrc: string
  imageWidth: number
  imageHeight: number
  reverse?: boolean
}) {
  const textAnimation = {
    hidden: { opacity: 0, x: reverse ? 40 : -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const } },
  }
  const imageAnimation = {
    hidden: { opacity: 0, x: reverse ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`grid items-center gap-10 border-b border-white/[0.08] py-14 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-2 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <motion.div variants={textAnimation} className="flex min-w-0 flex-col gap-3.5">
        <div className="flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#4e5a66]">
            Log <span className="font-[family-name:var(--font-chakra)] text-[1.05rem] font-semibold text-[#4fc3e8]">{number}</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px] border border-[#2a333c] bg-[#131920] text-[#93e2ff]">
            {icon}
          </span>
          <h3 className="font-[family-name:var(--font-chakra)] text-[1.15rem] uppercase tracking-wide text-[#e7edf3]">
            {title}
          </h3>
        </div>
        <p className="max-w-[520px] text-[#8b98a5]">{description}</p>
        <CopyableCommand command={command} dark />
      </motion.div>

      <motion.div variants={imageAnimation} className="min-w-0">
        <InteractiveImage src={imageSrc} alt={`${title} demo`} width={imageWidth} height={imageHeight} />
      </motion.div>
    </motion.div>
  )
}
