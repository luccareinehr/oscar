/**
 * Oscar mark: a geometric line glyph, a square mass with one large rounded
 * corner (a Niemeyer curve) and a slender left bay. Drawn in line-art to match
 * the minimal monochrome identity. Colored via currentColor.
 */
export function Logo({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Outer mass: square with a large rounded top-right corner */}
      <path d="M6 42 V6 H27 A15 15 0 0 1 42 21 V42 Z" />
      {/* Slender left bay */}
      <path d="M16 6 V42" />
    </svg>
  )
}
