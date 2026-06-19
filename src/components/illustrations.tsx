import type { ScenarioId } from '../lib/types'

type P = { className?: string }

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function SketchToRender({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        {/* sketch frame */}
        <rect x="6" y="12" width="60" height="56" rx="4" strokeDasharray="4 4" opacity="0.8" />
        <path d="M18 48 L36 32 L54 48" strokeDasharray="3 3" />
        <rect x="23" y="48" width="26" height="14" strokeDasharray="3 3" />
        {/* arrow */}
        <path d="M72 40 H86" />
        <path d="M82 36 L88 40 L82 44" />
        {/* render frame */}
        <rect x="94" y="12" width="60" height="56" rx="4" />
        <circle cx="140" cy="26" r="5" />
        <path d="M104 48 L122 32 L140 48" />
        <rect x="109" y="48" width="26" height="14" />
        <rect x="117" y="52" width="8" height="10" fill="currentColor" stroke="none" opacity="0.25" />
      </g>
    </svg>
  )
}

function EditObjects({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        <rect x="10" y="12" width="140" height="56" rx="5" opacity="0.8" />
        {/* sofa */}
        <path d="M40 54 v-9 a6 6 0 0 1 6 -6 h22 a6 6 0 0 1 6 6 v9" />
        <path d="M34 54 h52 v6 h-52 z" />
        {/* wand */}
        <path d="M104 56 L128 30" />
        <path d="M124 26 l6 6" />
        {/* sparkles */}
        <path
          d="M118 24 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 z"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
        <path
          d="M136 44 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 z"
          fill="currentColor"
          stroke="none"
          opacity="0.4"
        />
      </g>
    </svg>
  )
}

function ChangePerspective({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        <circle cx="36" cy="24" r="4.5" />
        {/* building with a perspective side */}
        <path d="M60 64 V34 L82 22 L104 34 V64 Z" />
        <path d="M104 34 L118 28 L118 58 L104 64" />
        <path d="M82 22 L96 16 L118 28" />
        {/* rotation arrow */}
        <path d="M46 66 a46 32 0 0 1 86 -8" strokeDasharray="4 3" />
        <path d="M126 50 l8 5 -9 5" />
      </g>
    </svg>
  )
}

function Upscale4k({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        {/* low-res block */}
        <rect x="14" y="22" width="40" height="40" rx="2" opacity="0.8" />
        <path d="M34 22 V62 M14 42 H54" opacity="0.8" />
        {/* arrow */}
        <path d="M64 42 H82" />
        <path d="M78 38 L84 42 L78 46" />
        {/* hi-res block */}
        <rect x="96" y="22" width="50" height="40" rx="2" />
        <path
          d="M108 22 V62 M121 22 V62 M134 22 V62 M96 35 H146 M96 48 H146"
          opacity="0.25"
        />
        <text
          x="121"
          y="47"
          textAnchor="middle"
          fontSize="15"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="600"
          fill="currentColor"
          stroke="none"
        >
          4K
        </text>
      </g>
    </svg>
  )
}

const MAP: Record<ScenarioId, (p: P) => JSX.Element> = {
  sketchToRender: SketchToRender,
  editObjects: EditObjects,
  changePerspective: ChangePerspective,
  upscale4k: Upscale4k,
}

export function ScenarioArt({ id, className }: { id: ScenarioId; className?: string }) {
  const Art = MAP[id]
  return <Art className={className} />
}
