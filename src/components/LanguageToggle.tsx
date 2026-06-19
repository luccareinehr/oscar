import { useT } from '../i18n/LanguageContext'
import type { Lang } from '../i18n/strings'

const FLAGS: { lang: Lang; flag: string; label: string }[] = [
  { lang: 'pt', flag: '🇧🇷', label: 'PT' },
  { lang: 'en', flag: '🇺🇸', label: 'EN' },
]

export function LanguageToggle() {
  const { lang, setLang } = useT()
  return (
    <div className="flex items-center rounded-full border border-white/15 bg-white/[0.04] px-1 py-1 backdrop-blur">
      {FLAGS.map((f, i) => {
        const active = f.lang === lang
        return (
          <div key={f.lang} className="flex items-center">
            {i > 0 && <span className="mx-0.5 h-4 w-px bg-white/15" />}
            <button
              type="button"
              onClick={() => setLang(f.lang)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium tracking-wide transition-colors ${
                active ? 'text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <span className="text-base leading-none">{f.flag}</span>
              {f.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
