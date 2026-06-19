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
      <span className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-neutral-400">
        {icon && <span className="text-gold-500">{icon}</span>}
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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full rounded-md border border-graphite-600 bg-graphite-700 px-3 py-2 text-[15px] text-neutral-200 shadow-sm focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-graphite-800 text-neutral-200">
          {o.label}
        </option>
      ))}
    </select>
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
      className="w-full rounded-md border border-graphite-600 bg-graphite-700 px-3 py-2 text-[15px] text-neutral-200 shadow-sm placeholder:text-neutral-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
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
      className="flex w-full items-center justify-between rounded-md border border-graphite-600 bg-graphite-700 px-3 py-2.5 text-left text-[15px] text-neutral-200 shadow-sm hover:border-graphite-500"
    >
      <span className="flex items-center gap-2">
        {icon && <span className="text-gold-500">{icon}</span>}
        {label}
      </span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-gold-500' : 'bg-graphite-500'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-graphite-950 transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  )
}
