'use client'

import React, { forwardRef, useRef } from 'react'

import { AnimatedBeam } from '@/components/ui/animated-beam'
import { cn } from '@/lib/utils'
import { VercelLogoIcon } from '@radix-ui/react-icons'
import { DoorOpenIcon, FileCode2Icon, TableIcon } from 'lucide-react'

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

export function ListFlow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        (className = 'relative flex w-full max-w-[360px] items-center justify-center overflow-hidden py-2'),
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between  gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <VercelLogoIcon className="w-4 h-4" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <DoorOpenIcon className="w-4 h-4" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <FileCode2Icon className="w-4 h-4" />
          </Circle>
          <Circle ref={div2Ref}>
            <TableIcon className="w-4 h-4" />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        duration={3}
        pathWidth={3}
        // @ts-expect-error - TS doesn't like the ref type
        containerRef={containerRef}
        // @ts-expect-error - TS doesn't like the ref type
        fromRef={div1Ref}
        // @ts-expect-error - TS doesn't like the ref type
        toRef={div6Ref}
      />
      <AnimatedBeam
        duration={3}
        pathWidth={3}
        // @ts-expect-error - TS doesn't like the ref type
        containerRef={containerRef}
        // @ts-expect-error - TS doesn't like the ref type
        fromRef={div2Ref}
        // @ts-expect-error - TS doesn't like the ref type
        toRef={div6Ref}
      />

      <AnimatedBeam
        duration={3}
        pathWidth={3}
        // @ts-expect-error - TS doesn't like the ref type
        containerRef={containerRef}
        // @ts-expect-error - TS doesn't like the ref type
        fromRef={div6Ref}
        // @ts-expect-error - TS doesn't like the ref type
        toRef={div7Ref}
      />
    </div>
  )
}
