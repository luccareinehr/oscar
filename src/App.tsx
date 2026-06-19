import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ScenarioId, Settings, SavedPrompt } from './lib/types'
import { buildPrompt } from './lib/prompts'
import { DEFAULT_SETTINGS, scenarioById } from './scenarios'
import { loadSaved, makeId, persistSaved } from './lib/store'
import { useT } from './i18n/LanguageContext'
import { Logo } from './components/Logo'
import { Hero } from './components/Hero'
import { LanguageToggle } from './components/LanguageToggle'
import { ScenarioPicker } from './components/ScenarioPicker'
import { SettingsPanel } from './components/SettingsPanel'
import { ImageDropzone } from './components/ImageDropzone'
import { ImageWarning } from './components/ImageWarning'
import { PromptPreview } from './components/PromptPreview'
import { UsageChecklist } from './components/UsageChecklist'
import { SavedPrompts } from './components/SavedPrompts'
import { TextArea } from './components/ui'
import { IconText } from './components/icons'

export default function App() {
  const { t } = useT()
  const [scenarioId, setScenarioId] = useState<ScenarioId>('sketchToRender')
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [saved, setSaved] = useState<SavedPrompt[]>(() => loadSaved())

  const [imageName, setImageName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  // Custom additions + explicit generation (no auto-generate).
  const [customPrompt, setCustomPrompt] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [generated, setGenerated] = useState<string | null>(null)

  const scenario = scenarioById(scenarioId)

  const buildFull = useMemo(
    () => () => {
      const base = buildPrompt(scenario, settings)
      const extra = customPrompt.trim()
      return extra ? `${base}\n\nAdditional instructions: ${extra}` : base
    },
    [scenario, settings, customPrompt],
  )

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  // Any edit to the inputs invalidates a previously generated prompt, so the
  // user is never looking at a stale result. (loadItem sets state directly and
  // intentionally keeps its saved prompt.)
  const changeScenario = (id: ScenarioId) => {
    setScenarioId(id)
    setGenerated(null)
  }
  const patch = (p: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...p }))
    setGenerated(null)
  }
  const changeCustom = (v: string) => {
    setCustomPrompt(v)
    setGenerated(null)
  }

  const pickImage = (file: File) => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageName(file.name)
    setImageUrl(URL.createObjectURL(file))
  }

  const clearImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageName(null)
    setImageUrl(null)
  }

  const updateSaved = (next: SavedPrompt[]) => {
    setSaved(next)
    persistSaved(next)
  }

  const generate = () => setGenerated(buildFull())

  const saveCurrent = () => {
    const prompt = buildFull()
    setGenerated(prompt)
    const item: SavedPrompt = {
      id: makeId(),
      name: `${t(`scenario.${scenarioId}.label`)} · ${new Date().toLocaleString()}`,
      scenario: scenarioId,
      settings,
      prompt,
    }
    updateSaved([item, ...saved])
  }

  const loadItem = (item: SavedPrompt) => {
    setScenarioId(item.scenario)
    setSettings(item.settings)
    setGenerated(item.prompt)
  }

  const deleteItem = (id: string) => updateSaved(saved.filter((x) => x.id !== id))

  return (
    <div className="min-h-screen font-serif text-neutral-200">
      {/* Header with architectural backdrop */}
      <header className="relative overflow-hidden border-b border-white/10">
        <Hero className="absolute inset-y-0 right-0 w-3/5" />
        <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-7">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-neutral-100">
                <Logo className="h-14 w-14" />
              </span>
              <div>
                <h1 className="font-display text-4xl font-medium uppercase tracking-[0.3em] text-neutral-50">
                  Oscar
                </h1>
                <p className="mt-1 text-[12px] uppercase tracking-[0.32em] text-neutral-400">
                  {t('brand.subtitle')}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
          <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-neutral-400">
            {t('tagline')}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        <Step n={1} title={t('step.scenario')}>
          <ScenarioPicker value={scenarioId} onChange={changeScenario} />
        </Step>

        <Step n={2} title={t('step.image')}>
          <ImageDropzone
            imageName={imageName}
            imageUrl={imageUrl}
            onPick={pickImage}
            onClear={clearImage}
          />
        </Step>

        <Step n={3} title={t('step.settings')}>
          <SettingsPanel scenario={scenario} settings={settings} onChange={patch} />
        </Step>

        {/* Generate button sits right before the "Your prompt" step */}
        <button
          type="button"
          onClick={generate}
          className="w-full rounded-lg bg-neutral-100 px-4 py-3.5 text-[15px] font-semibold uppercase tracking-[0.12em] text-neutral-900 transition-opacity hover:opacity-90"
        >
          {generated ? t('generate.again') : t('generate.button')}
        </button>

        <Step n={4} title={t('step.result')}>
          <div className="space-y-4">
            <ImageWarning hasImage={!!imageUrl} />

            {/* Optional custom instructions */}
            <div>
              <button
                type="button"
                onClick={() => setShowCustom((v) => !v)}
                className="flex items-center gap-1.5 text-[14px] font-medium text-neutral-300 hover:text-neutral-100"
              >
                <IconText className="h-4 w-4" />
                {showCustom ? t('custom.hide') : t('custom.add')}
              </button>
              {showCustom && (
                <div className="mt-3">
                  <TextArea
                    value={customPrompt}
                    onChange={changeCustom}
                    placeholder={t('custom.placeholder')}
                  />
                </div>
              )}
            </div>

            <PromptPreview prompt={generated} />
            <UsageChecklist />
            <SavedPrompts
              saved={saved}
              onSave={saveCurrent}
              onLoad={loadItem}
              onDelete={deleteItem}
            />
          </div>
        </Step>
      </main>

      <footer className="mx-auto max-w-5xl px-6 pb-12 text-center text-[13px] text-neutral-600">
        {t('footer')}
      </footer>
    </div>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/25 text-[13px] font-semibold text-neutral-100">
          {n}
        </span>
        <h2 className="eyebrow shrink-0 text-[15px] font-medium text-neutral-300">{title}</h2>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      {children}
    </section>
  )
}
