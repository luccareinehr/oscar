import type { ScenarioId } from '../lib/types'
import { SCENARIOS } from '../scenarios'
import { ScenarioArt } from './illustrations'
import { useT } from '../i18n/LanguageContext'

export function ScenarioPicker({
  value,
  onChange,
}: {
  value: ScenarioId
  onChange: (id: ScenarioId) => void
}) {
  const { t } = useT()
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {SCENARIOS.map((s) => {
        const active = s.id === value
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            className={`group overflow-hidden rounded-xl border text-left transition-all ${
              active
                ? 'border-gold-500 bg-graphite-700 ring-1 ring-gold-500'
                : 'border-graphite-600 bg-graphite-800 hover:border-graphite-500'
            }`}
          >
            <div
              className={`flex h-20 items-center justify-center border-b ${
                active
                  ? 'border-gold-600/40 bg-graphite-800 text-gold-400'
                  : 'border-graphite-600 bg-graphite-900 text-gold-500/70 group-hover:text-gold-400'
              }`}
            >
              <ScenarioArt id={s.id} className="h-14 w-full px-2" />
            </div>
            <div className="p-3">
              <div
                className={`font-display text-lg leading-tight ${
                  active ? 'text-neutral-100' : 'text-neutral-200'
                }`}
              >
                {t(`scenario.${s.id}.label`)}
              </div>
              <div className="mt-1 text-[13px] leading-snug text-neutral-400">
                {t(`scenario.${s.id}.blurb`)}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
