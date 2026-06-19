import type { SavedPrompt } from '../lib/types'
import { useT } from '../i18n/LanguageContext'
import { IconPlus } from './icons'

interface Props {
  saved: SavedPrompt[]
  onSave: () => void
  onLoad: (item: SavedPrompt) => void
  onDelete: (id: string) => void
}

export function SavedPrompts({ saved, onSave, onLoad, onDelete }: Props) {
  const { t } = useT()
  return (
    <div className="rounded-lg border border-graphite-600 bg-graphite-800 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-neutral-200">{t('saved.title')}</h3>
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-1 rounded-md border border-graphite-600 px-3 py-1.5 text-[13px] font-semibold text-neutral-300 hover:border-gold-500/60 hover:text-gold-400"
        >
          <IconPlus className="h-4 w-4" />
          {t('saved.save')}
        </button>
      </div>

      {saved.length === 0 ? (
        <p className="mt-2 text-[13px] text-neutral-500">{t('saved.empty')}</p>
      ) : (
        <ul className="mt-2 divide-y divide-graphite-700">
          {saved.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-2">
              <button
                type="button"
                onClick={() => onLoad(item)}
                className="truncate text-left text-[15px] text-neutral-300 hover:text-gold-400 hover:underline"
                title={item.name}
              >
                {item.name}
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="ml-3 shrink-0 text-[13px] text-neutral-500 hover:text-red-400"
              >
                {t('saved.delete')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
