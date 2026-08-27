/**
 * Custom brand mark, replacing the generic lucide DoorOpenIcon.
 *
 * Reads as a guarded threshold: an arched doorway (a gate/checkpoint) set
 * inside a frame, with a scan line across the header and the pulsing status
 * LED as the handle — the same live-traffic dot used across the homepage
 * panels and provider terminals. The arch distinguishes it from a plain
 * rectangular door glyph and nods to a "gateway" being watched.
 *
 * The frame uses currentColor so it inherits its context's text color (dark
 * on light routes, light/cyan on the homepage). `ledClassName` controls the
 * handle dot's color and `pulse` toggles its animation.
 */
export function DoormanMark({
  className,
  ledClassName = 'fill-current',
  pulse = false,
}: {
  className?: string
  ledClassName?: string
  pulse?: boolean
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Outer frame / threshold */}
      <path
        d="M4 21V9.2a8 8 0 0 1 16 0V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Floor / threshold line */}
      <path d="M2.5 21h19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Inner door panel */}
      <path
        d="M7.5 21V10.2a4.5 4.5 0 0 1 9 0V21"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.45"
      />
      {/* Scan / header line */}
      <path d="M7.8 13.4h8.4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Handle = status LED */}
      <circle cx="14" cy="16.4" r="1.3" className={ledClassName}>
        {pulse ? (
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        ) : null}
      </circle>
    </svg>
  )
}
