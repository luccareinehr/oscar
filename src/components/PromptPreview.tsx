import { useState } from 'react'
import { useT } from '../i18n/LanguageContext'
import { IconCheck, IconCopy } from './icons'

export function PromptPreview({ prompt }: { prompt: string | null }) {
  const { t } = useT()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!prompt) return
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="glass overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
          {t('prompt.header')}
        </span>
        <button
          type="button"
          onClick={copy}
          disabled={!prompt}
          className="flex items-center gap-1.5 rounded-md bg-neutral-100 px-3 py-1.5 text-[13px] font-semibold text-neutral-900 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
          {copied ? t('prompt.copied') : t('prompt.copy')}
        </button>
      </div>
      {prompt ? (
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-[13px] leading-relaxed text-neutral-300">
          {prompt}
        </pre>
      ) : (
        <p className="px-4 py-12 text-center text-[15px] italic text-neutral-500">
          {t('prompt.placeholder')}
        </p>
      )}
    </div>
  )
}
