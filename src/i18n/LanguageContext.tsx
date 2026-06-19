import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { STRINGS, type Lang } from './strings'

const STORAGE_KEY = 'oscar:lang:v1'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const Ctx = createContext<LangCtx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // ignore
  }
  return 'pt' // Portuguese is the default
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => initialLang())

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LangCtx>(() => {
    const setLang = (l: Lang) => {
      setLangState(l)
      try {
        localStorage.setItem(STORAGE_KEY, l)
      } catch {
        // ignore
      }
    }
    const t = (key: string) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key
    return { lang, setLang, t }
  }, [lang])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useT(): LangCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useT must be used within LanguageProvider')
  return ctx
}
