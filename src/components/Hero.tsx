/**
 * Decorative architectural backdrop for the header, echoing the curved concrete
 * eave, glass facade and columns of a Niemeyer building. Self-contained SVG in
 * greyscale, masked to fade into the black canvas on the left. No network asset,
 * so it always renders. Swap for a real photo later if desired.
 */
export function Hero({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 42%)',
        maskImage: 'linear-gradient(to right, transparent, black 42%)',
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 600 360"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="concrete" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6e6e72" />
            <stop offset="1" stopColor="#2a2a2d" />
          </linearGradient>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b2b2f" />
            <stop offset="1" stopColor="#0e0e10" />
          </linearGradient>
        </defs>

        <rect width="600" height="360" fill="url(#sky)" />

        {/* Sweeping concrete eave */}
        <path
          d="M70 70 Q300 20 600 70 L600 150 Q320 96 90 150 Z"
          fill="url(#concrete)"
        />
        <path
          d="M70 70 Q300 20 600 70"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />

        {/* Glass facade band with mullions */}
        <path
          d="M120 150 Q330 100 600 150 L600 250 Q340 206 130 250 Z"
          fill="#161618"
          stroke="rgba(255,255,255,0.18)"
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 150 + i * 38
          return (
            <line
              key={i}
              x1={x}
              y1={150 - (i < 6 ? (6 - i) * 4 : 0)}
              x2={x}
              y2={250}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
            />
          )
        })}

        {/* Slanted columns / pilotis */}
        <path d="M180 250 L165 360" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        <path d="M320 246 L320 360" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
        <path d="M470 250 L486 360" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      </svg>
    </div>
  )
}
