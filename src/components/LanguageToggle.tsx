import { useT } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/strings'

const FLAGS: { lang: Lang; flag: string; label: string }[] = [
  { lang: 'pt', flag: '🇧🇷', label: 'PT' },
  { lang: 'en', flag: '🇺🇸', label: 'EN' },
]

export function LanguageToggle() {
  const { lang, setLang } = useT()
  return (
    <div className="flex items-center gap-1 rounded-full border border-graphite-600 bg-graphite-800 p-0.5">
      {FLAGS.map((f) => {
        const active = f.lang === lang
        return (
          <button
            key={f.lang}
            type="button"
            onClick={() => setLang(f.lang)}
            aria-pressed={active}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium transition-colors ${
              active
                ? 'bg-graphite-700 text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span className="text-base leading-none">{f.flag}</span>
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
