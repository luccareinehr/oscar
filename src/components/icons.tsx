import type { ReactNode } from 'react'

type P = { className?: string }

function S({ children, className = 'h-4 w-4' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

export const IconSource = ({ className }: P) => (
  <S className={className}>
    <path d="M4 4h11l5 5v11a0 0 0 0 1 0 0H4z" />
    <path d="M14 4v5h5" />
    <path d="M8 13l2.5 2.5L14 12l3 4H8z" />
  </S>
)

export const IconHome = ({ className }: P) => (
  <S className={className}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </S>
)

export const IconStyle = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="8.5" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
  </S>
)

export const IconMaterial = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 16l9 5 9-5" />
  </S>
)

export const IconSun = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </S>
)

export const IconLeaf = ({ className }: P) => (
  <S className={className}>
    <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
    <path d="M5 19c4-4 7-7 10-9" />
  </S>
)

export const IconPeople = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="8" r="3" />
    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </S>
)

export const IconCamera = ({ className }: P) => (
  <S className={className}>
    <path d="M3 8h3l1.5-2h9L18 8h3v11H3z" />
    <circle cx="12" cy="13" r="3.5" />
  </S>
)

export const IconHeight = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3v18" />
    <path d="M8 6l4-3 4 3" />
    <path d="M8 18l4 3 4-3" />
  </S>
)

export const IconClock = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
)

export const IconText = ({ className }: P) => (
  <S className={className}>
    <path d="M4 6h16M7 6v13M17 6v13" />
  </S>
)

export const IconPin = ({ className }: P) => (
  <S className={className}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </S>
)

export const IconFrame = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="6" width="18" height="12" rx="1.5" />
  </S>
)

export const IconMonitor = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="4" width="18" height="13" rx="1.5" />
    <path d="M8 21h8M12 17v4" />
  </S>
)

export const IconLock = ({ className }: P) => (
  <S className={className}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </S>
)

export const IconCopy = ({ className }: P) => (
  <S className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </S>
)

export const IconCheck = ({ className }: P) => (
  <S className={className}>
    <path d="M5 13l4 4L19 7" />
  </S>
)

export const IconAlert = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3l9 16H3l9-16z" />
    <path d="M12 10v4M12 17h.01" />
  </S>
)

export const IconPlus = ({ className }: P) => (
  <S className={className}>
    <path d="M12 5v14M5 12h14" />
  </S>
)
