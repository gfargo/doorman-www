'use client'

import React, { forwardRef, useRef } from 'react'

import { AnimatedBeam } from '@/components/ui/animated-beam'
import { cn } from '@/lib/utils'
import { VercelLogoIcon } from '@radix-ui/react-icons'
import { Code2Icon, DoorOpenIcon } from 'lucide-react'

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-10 flex size-12 items-center justify-center rounded-full border-2 bg-primary text-primary-foreground p-3 border-white/80',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)

Circle.displayName = 'Circle'

export function DownloadFlowBeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex w-full max-w-[360px] items-center justify-center overflow-hidden py-2"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between items-center">
          <Circle ref={div2Ref}>
            <VercelLogoIcon className="w-4 h-4" />
          </Circle>
          <Circle ref={div3Ref} className="size-16">
            <DoorOpenIcon className="w-4 h-4" />
          </Circle>
          <Circle ref={div1Ref}>
            <Code2Icon className="w-4 h-4" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        duration={3}
        pathWidth={3}
        // @ts-expect-error - TS doesn't like the ref type
        containerRef={containerRef}
        // @ts-expect-error - TS doesn't like the ref type
        fromRef={div2Ref}
        // @ts-expect-error - TS doesn't like the ref type
        toRef={div1Ref}
      />
      <AnimatedBeam
        duration={3}
        pathWidth={3}
        // @ts-expect-error - TS doesn't like the ref type
        containerRef={containerRef}
        // @ts-expect-error - TS doesn't like the ref type
        fromRef={div3Ref}
        // @ts-expect-error - TS doesn't like the ref type
        toRef={div2Ref}
      />
    </div>
  )
}
