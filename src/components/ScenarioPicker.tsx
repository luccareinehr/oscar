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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {SCENARIOS.map((s) => {
        const active = s.id === value
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            className={`group flex flex-col rounded-lg border p-5 text-left transition-all ${
              active
                ? 'border-white/40 bg-white/[0.05]'
                : 'border-white/10 bg-white/[0.015] hover:border-white/25 hover:bg-white/[0.03]'
            }`}
          >
            <div
              className={`flex h-24 items-center justify-center ${
                active ? 'text-neutral-100' : 'text-neutral-400 group-hover:text-neutral-200'
              }`}
            >
              <ScenarioArt id={s.id} className="h-20 w-full" />
            </div>
            <div className="mt-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-100">
              {t(`scenario.${s.id}.label`)}
            </div>
            <div className="mt-2 text-[14px] leading-snug text-neutral-500">
              {t(`scenario.${s.id}.blurb`)}
            </div>
          </button>
        )
      })}
    </div>
  )
}
