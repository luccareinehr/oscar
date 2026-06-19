import heroUrl from '../assets/hero.jpg'

/**
 * Architectural backdrop for the header: a black-and-white Niemeyer photograph,
 * masked to fade into the black canvas on the left so the brand and tagline stay
 * legible. Imported through Vite so the asset is hashed and base-path correct.
 */
export function Hero({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 55%), linear-gradient(to top, transparent 4%, black 22%)',
        WebkitMaskComposite: 'source-in',
        maskImage:
          'linear-gradient(to right, transparent, black 55%), linear-gradient(to top, transparent 4%, black 22%)',
        maskComposite: 'intersect',
      }}
      aria-hidden
    >
      <img
        src={heroUrl}
        alt=""
        className="h-full w-full object-cover object-[60%_30%] opacity-90"
      />
    </div>
  )
}
