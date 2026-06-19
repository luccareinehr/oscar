import type { ReactNode } from 'react'

export function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
        {icon && <span className="text-neutral-300">{icon}</span>}
        {label}
      </span>
      {children}
    </label>
  )
}

interface SelectProps<T extends string> {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}

export function Select<T extends string>({ value, onChange, options }: SelectProps<T>) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full appearance-none rounded-md border border-white/15 bg-white/[0.03] px-3 py-2.5 pr-9 text-[15px] text-neutral-100 shadow-sm focus:border-white/60 focus:outline-none focus:ring-1 focus:ring-white/30"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-neutral-900 text-neutral-100">
            {o.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-white/12 bg-white/[0.03] px-3 py-2.5 text-[15px] text-neutral-100 shadow-sm placeholder:text-neutral-500 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
    />
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-y rounded-md border border-white/12 bg-white/[0.03] px-3 py-2 text-[15px] text-neutral-100 shadow-sm placeholder:text-neutral-500 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
    />
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  icon,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-md border border-white/12 bg-white/[0.03] px-3 py-3 text-left text-[15px] text-neutral-100 shadow-sm hover:border-white/25"
    >
      <span className="flex items-center gap-2">
        {icon && <span className="text-neutral-300">{icon}</span>}
        {label}
      </span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-neutral-100' : 'bg-white/15'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
            checked ? 'translate-x-4 bg-neutral-900' : 'translate-x-1 bg-neutral-300'
          }`}
        />
      </span>
    </button>
  )
}
