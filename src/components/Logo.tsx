/**
 * Oscar mark, inspired by the "Olho" (Eye) of the Museu Oscar Niemeyer in
 * Curitiba: a horizontal lens form elevated on a single slender blade support.
 * Drawn as elegant gold line-art; colored via currentColor.
 */
export function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 52"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* The Eye */}
      <path d="M9 17 C 20 5, 44 5, 55 17 C 44 29, 20 29, 9 17 Z" />
      {/* Pupil */}
      <ellipse cx="32" cy="17" rx="6" ry="4" fill="currentColor" stroke="none" />
      {/* Leaning blade support */}
      <path d="M30 28 L27 45 L33 45 L34 28" />
      {/* Ground */}
      <path d="M19 45 H45" strokeWidth={2.4} />
    </svg>
  )
}
