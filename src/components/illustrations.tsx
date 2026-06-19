import type { ScenarioId } from '../lib/types'

type P = { className?: string }

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function SketchToRender({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        {/* dashed sketch house */}
        <rect x="8" y="16" width="52" height="48" rx="2" strokeDasharray="4 4" opacity="0.7" />
        <path d="M16 48 L34 30 L52 48" strokeDasharray="3 3" />
        <path d="M20 48 V62 H48 V48" strokeDasharray="3 3" />
        {/* arrow */}
        <path d="M70 40 H88" />
        <path d="M83 35 L90 40 L83 45" />
        {/* solid render house */}
        <circle cx="140" cy="22" r="5" />
        <path d="M100 50 L120 30 L140 50" />
        <path d="M105 50 V64 H135 V50" />
        <path d="M116 64 V54 H124 V64" />
      </g>
    </svg>
  )
}

function EditObjects({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        {/* ground */}
        <path d="M18 66 H142" />
        {/* armchair */}
        <path d="M40 66 V48 q0 -6 6 -6 h20 q6 0 6 6 V66" />
        <path d="M40 58 H72" />
        <path d="M34 66 V54 q0 -4 6 -4" />
        <path d="M78 66 V54 q0 -4 -6 -4" />
        {/* floor lamp */}
        <path d="M112 66 V30" />
        <path d="M104 66 H120" />
        <path d="M103 30 H121 L116 20 H108 Z" />
      </g>
    </svg>
  )
}

function ChangePerspective({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        <circle cx="28" cy="18" r="5" />
        {/* house with a perspective side */}
        <path d="M58 66 V42 L82 26 L106 42 V66 Z" />
        <path d="M106 42 L120 34 L120 58 L106 66" />
        <path d="M82 26 L96 18 L120 34" />
        {/* dashed swooping arrow */}
        <path d="M44 68 q44 -32 96 -10" strokeDasharray="4 3" />
        <path d="M132 52 l9 6 -10 5" />
      </g>
    </svg>
  )
}

function Upscale4k({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden>
      <g {...common}>
        <rect x="16" y="22" width="40" height="40" rx="2" opacity="0.75" />
        <path d="M36 22 V62 M16 42 H56" opacity="0.75" />
        <path d="M66 42 H84" />
        <path d="M79 37 L86 42 L79 47" />
        <rect x="96" y="22" width="48" height="40" rx="2" />
        <path
          d="M108 22 V62 M120 22 V62 M132 22 V62 M96 35 H144 M96 48 H144"
          opacity="0.3"
        />
        <text
          x="120"
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

/** Decorative house-on-a-hill-with-a-tree sketch for the image dropzone. */
export function DropzoneSketch({ className }: P) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <g {...common} strokeWidth={1.2} opacity="0.6">
        {/* hill */}
        <path d="M6 98 Q64 70 116 94 Q160 112 196 88" />
        {/* house */}
        <path d="M70 94 V70 L90 54 L110 70 V94 Z" />
        <path d="M82 94 V80 H98 V94" />
        <path d="M90 54 V47" />
        {/* tree */}
        <path d="M150 96 V66" />
        <circle cx="150" cy="56" r="13" />
        <circle cx="138" cy="62" r="9" />
        <circle cx="162" cy="62" r="9" />
      </g>
    </svg>
  )
}
