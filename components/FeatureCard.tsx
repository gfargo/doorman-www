'use client'

import { useTheme } from 'next-themes'
import HyperText from './ui/hyper-text'
import ShineBorder from './ui/shine-border'
import { motion } from 'framer-motion'

export function FeatureCard({
  title,
  description,
  icon,
  index = 0,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index?: number
}) {
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ShineBorder
        className="place-items-start p-6 shadow-md"
        duration={20}
        color={theme.theme === 'dark' ? 'white' : 'black'}
      >
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full mr-4">{icon}</div>
          <HyperText className="text-xl font-semibold text-black dark:text-white" text={title} />
        </div>
        <p className="text-gray-600 pl-14">{description}</p>
      </ShineBorder>
    </motion.div>
  )
}
