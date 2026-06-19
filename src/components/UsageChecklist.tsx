import { useT } from '../i18n/LanguageContext'

export function UsageChecklist() {
  const { t } = useT()
  return (
    <div className="rounded-lg border border-graphite-600 bg-graphite-800 p-4">
      <h3 className="text-[15px] font-semibold text-neutral-200">{t('use.title')}</h3>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-[15px] text-neutral-400">
        <li>{t('use.step1')}</li>
        <li>
          {t('use.step2pre')}{' '}
          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gold-400 underline"
          >
            {t('use.step2geminiApp')}
          </a>{' '}
          {t('use.step2geminiQuota')} {t('use.step2or')}{' '}
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gold-400 underline"
          >
            {t('use.step2studio')}
          </a>{' '}
          {t('use.step2studioQuota')}
        </li>
        <li>{t('use.step3')}</li>
        <li>{t('use.step4')}</li>
      </ol>
      <p className="mt-3 text-[13px] text-neutral-500">{t('use.note')}</p>
    </div>
  )
}
