import type { FieldKey, ScenarioDef, Settings } from '../lib/types'
import { MATERIAL_PRESETS, STYLE_PRESETS } from '../lib/presets'
import { Field, Select, TextInput, Toggle } from './ui'
import { useT } from '../i18n/LanguageContext'
import {
  IconCamera,
  IconClock,
  IconFrame,
  IconHeight,
  IconHome,
  IconLeaf,
  IconLock,
  IconMaterial,
  IconMonitor,
  IconPeople,
  IconPin,
  IconSource,
  IconStyle,
  IconSun,
  IconText,
} from './icons'

interface Props {
  scenario: ScenarioDef
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
}

export function SettingsPanel({ scenario, settings: s, onChange }: Props) {
  const { t } = useT()
  const show = (k: FieldKey) => scenario.fields.includes(k)

  if (scenario.fields.length === 0) {
    return (
      <p className="rounded-md bg-graphite-700 p-3 text-[15px] text-neutral-400">
        {t('settings.none')}
      </p>
    )
  }

  // Helper to build translated <option> lists for an enum field.
  // `readonly` + `as const` at call sites preserves the literal union type.
  const opts = <T extends string>(field: string, values: readonly T[]) =>
    values.map((v) => ({ value: v, label: t(`opt.${field}.${v}`) }))

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {show('sourceType') && (
        <Field label={t('field.sourceType')} icon={<IconSource />}>
          <Select
            value={s.sourceType}
            onChange={(v) => onChange({ sourceType: v })}
            options={opts('sourceType', ['hand sketch', 'CAD line drawing', 'floor plan'] as const)}
          />
        </Field>
      )}

      {show('environment') && (
        <Field label={t('field.environment')} icon={<IconHome />}>
          <Select
            value={s.environment}
            onChange={(v) => onChange({ environment: v })}
            options={opts('environment', ['outdoor', 'indoor'] as const)}
          />
        </Field>
      )}

      {show('style') && (
        <Field label={t('field.style')} icon={<IconStyle />}>
          <Select
            value={s.style}
            onChange={(v) => onChange({ style: v })}
            options={STYLE_PRESETS.map((p) => ({
              value: p.id,
              label: t(`preset.style.${p.id}`),
            }))}
          />
        </Field>
      )}

      {show('materials') && (
        <Field label={t('field.materials')} icon={<IconMaterial />}>
          <Select
            value={s.materials}
            onChange={(v) => onChange({ materials: v })}
            options={MATERIAL_PRESETS.map((p) => ({
              value: p.id,
              label: t(`preset.material.${p.id}`),
            }))}
          />
        </Field>
      )}

      {show('lighting') && (
        <Field label={t('field.lighting')} icon={<IconSun />}>
          <Select
            value={s.lighting}
            onChange={(v) => onChange({ lighting: v })}
            options={opts('lighting', [
              'soft-daylight',
              'overcast',
              'dusk',
              'interior-ambient',
            ] as const)}
          />
        </Field>
      )}

      {show('vegetation') && (
        <Field label={t('field.vegetation')} icon={<IconLeaf />}>
          <Select
            value={s.vegetation}
            onChange={(v) => onChange({ vegetation: v })}
            options={opts('vegetation', ['none', 'sparse', 'moderate'] as const)}
          />
        </Field>
      )}

      {show('people') && (
        <Field label={t('field.people')} icon={<IconPeople />}>
          <Select
            value={s.people}
            onChange={(v) => onChange({ people: v })}
            options={opts('people', ['none', 'sparse'] as const)}
          />
        </Field>
      )}

      {show('cameraAngle') && (
        <Field label={t('field.cameraAngle')} icon={<IconCamera />}>
          <Select
            value={s.cameraAngle}
            onChange={(v) => onChange({ cameraAngle: v })}
            options={opts('cameraAngle', [
              'eye-level',
              'aerial',
              'worms-eye',
              'one-point-perspective',
            ] as const)}
          />
        </Field>
      )}

      {show('cameraHeight') && (
        <Field label={t('field.cameraHeight')} icon={<IconHeight />}>
          <Select
            value={s.cameraHeight}
            onChange={(v) => onChange({ cameraHeight: v })}
            options={opts('cameraHeight', ['low', 'standing', 'elevated'] as const)}
          />
        </Field>
      )}

      {show('timeOfDay') && (
        <Field label={t('field.timeOfDay')} icon={<IconClock />}>
          <Select
            value={s.timeOfDay}
            onChange={(v) => onChange({ timeOfDay: v })}
            options={opts('timeOfDay', ['keep', 'morning', 'midday', 'dusk'] as const)}
          />
        </Field>
      )}

      {show('season') && (
        <Field label={t('field.season')} icon={<IconLeaf />}>
          <Select
            value={s.season}
            onChange={(v) => onChange({ season: v })}
            options={opts('season', ['keep', 'spring', 'summer', 'autumn', 'winter'] as const)}
          />
        </Field>
      )}

      {show('editInstruction') && (
        <div className="sm:col-span-2">
          <Field label={t('field.editInstruction')} icon={<IconText />}>
            <TextInput
              value={s.editInstruction}
              onChange={(v) => onChange({ editInstruction: v })}
              placeholder={t('placeholder.editInstruction')}
            />
          </Field>
        </div>
      )}

      {show('editRegion') && (
        <div className="sm:col-span-2">
          <Field label={t('field.editRegion')} icon={<IconPin />}>
            <TextInput
              value={s.editRegion}
              onChange={(v) => onChange({ editRegion: v })}
              placeholder={t('placeholder.editRegion')}
            />
          </Field>
        </div>
      )}

      {show('aspectRatio') && (
        <Field label={t('field.aspectRatio')} icon={<IconFrame />}>
          <Select
            value={s.aspectRatio}
            onChange={(v) => onChange({ aspectRatio: v })}
            options={[
              { value: '3:2', label: '3:2' },
              { value: '4:3', label: '4:3' },
              { value: '16:9', label: '16:9' },
              { value: '1:1', label: '1:1' },
            ]}
          />
        </Field>
      )}

      {show('resolution') && (
        <Field label={t('field.resolution')} icon={<IconMonitor />}>
          <Select
            value={s.resolution}
            onChange={(v) => onChange({ resolution: v })}
            options={[
              { value: '1K', label: '1K' },
              { value: '2K', label: '2K' },
              { value: '4K', label: '4K' },
            ]}
          />
        </Field>
      )}

      {show('fidelityLock') && (
        <div className="sm:col-span-2">
          <Toggle
            checked={s.fidelityLock}
            onChange={(v) => onChange({ fidelityLock: v })}
            label={t('field.fidelityLock')}
            icon={<IconLock />}
          />
        </div>
      )}
    </div>
  )
}
