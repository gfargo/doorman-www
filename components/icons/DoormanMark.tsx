/**
 * Custom brand mark, replacing the generic lucide DoorOpenIcon. A door
 * frame whose handle is the same pulsing status dot used throughout the
 * homepage's live-traffic panel and provider terminals, so the mark reads
 * as "a door that's actively watching," not just a door glyph.
 *
 * Uses currentColor for the frame so it inherits whatever text color its
 * context sets (dark header on light routes, light/cyan on the homepage),
 * and a separate `ledClassName` for the handle dot's color and animation.
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
      <rect x="5" y="2" width="14" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 7.5h14" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="15.1" cy="12.5" r="1.35" className={ledClassName}>
        {pulse ? (
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        ) : null}
      </circle>
    </svg>
  )
}
