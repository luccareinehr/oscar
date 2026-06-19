import { useState } from 'react'
import { useT } from '../i18n/LanguageContext'
import { IconCheck, IconCopy } from './icons'

export function PromptPreview({ prompt }: { prompt: string }) {
  const { t } = useT()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-graphite-600 bg-graphite-800">
      <div className="flex items-center justify-between border-b border-graphite-600 px-4 py-2.5">
        <span className="text-[13px] font-medium uppercase tracking-wide text-neutral-400">
          {t('prompt.header')}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md bg-gold-500 px-3 py-1.5 text-[13px] font-semibold text-graphite-950 transition-colors hover:bg-gold-400"
        >
          {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
          {copied ? t('prompt.copied') : t('prompt.copy')}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-[13px] leading-relaxed text-neutral-300">
        {prompt}
      </pre>
    </div>
  )
}
