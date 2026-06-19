import { useT } from '../i18n/LanguageContext'
import { IconAlert } from './icons'

/**
 * Prominent, unmissable warning: the generated prompt is meaningless on its own.
 * It must be sent together with the user's attached image in the Gemini UI.
 */
export function ImageWarning({ hasImage }: { hasImage: boolean }) {
  const { t } = useT()
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-lg border border-gold-500/60 bg-gold-500/10 p-4"
    >
      <IconAlert className="mt-0.5 h-6 w-6 shrink-0 text-gold-400" />
      <div className="text-[15px] text-neutral-200">
        <p className="font-semibold text-gold-400">{t('warn.title')}</p>
        <p className="mt-1 leading-snug">
          {t('warn.body')}{' '}
          <span className="font-semibold">
            {hasImage ? t('warn.ctxHas') : t('warn.ctxNo')}
          </span>{' '}
          {t('warn.beforeRun')}
        </p>
      </div>
    </div>
  )
}
