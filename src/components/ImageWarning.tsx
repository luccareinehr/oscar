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
      className="flex gap-3 rounded-lg border border-white/25 bg-white/[0.05] p-4 backdrop-blur-md"
    >
      <IconAlert className="mt-0.5 h-6 w-6 shrink-0 text-neutral-100" />
      <div className="text-[15px] text-neutral-300">
        <p className="font-semibold text-neutral-100">{t('warn.title')}</p>
        <p className="mt-1 leading-snug">
          {t('warn.body')}{' '}
          <span className="font-semibold text-neutral-100">
            {hasImage ? t('warn.ctxHas') : t('warn.ctxNo')}
          </span>{' '}
          {t('warn.beforeRun')}
        </p>
      </div>
    </div>
  )
}
