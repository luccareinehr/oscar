import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ScenarioId, Settings, SavedPrompt } from './lib/types'
import { buildPrompt } from './lib/prompts'
import { DEFAULT_SETTINGS, scenarioById } from './scenarios'
import { loadSaved, makeId, persistSaved } from './lib/store'
import { useT } from './i18n/LanguageContext'
import { Logo } from './components/Logo'
import { LanguageToggle } from './components/LanguageToggle'
import { ScenarioPicker } from './components/ScenarioPicker'
import { SettingsPanel } from './components/SettingsPanel'
import { ImageDropzone } from './components/ImageDropzone'
import { ImageWarning } from './components/ImageWarning'
import { PromptPreview } from './components/PromptPreview'
import { UsageChecklist } from './components/UsageChecklist'
import { SavedPrompts } from './components/SavedPrompts'

export default function App() {
  const { t } = useT()
  const [scenarioId, setScenarioId] = useState<ScenarioId>('sketchToRender')
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [saved, setSaved] = useState<SavedPrompt[]>(() => loadSaved())

  const [imageName, setImageName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const scenario = scenarioById(scenarioId)
  const prompt = useMemo(() => buildPrompt(scenario, settings), [scenario, settings])

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  const patch = (p: Partial<Settings>) => setSettings((s) => ({ ...s, ...p }))

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

  const saveCurrent = () => {
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
  }

  const deleteItem = (id: string) => updateSaved(saved.filter((x) => x.id !== id))

  return (
    <div className="min-h-screen bg-graphite-900 font-serif text-neutral-200">
      <header className="border-b border-graphite-700 bg-graphite-950">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="text-gold-500">
              <Logo className="h-10 w-10" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-semibold leading-none tracking-wide text-neutral-100">
                Oscar
              </h1>
              <p className="mt-1 max-w-md text-[13px] leading-snug text-neutral-500">
                {t('tagline')}
              </p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <Step n={1} title={t('step.scenario')}>
          <ScenarioPicker value={scenarioId} onChange={setScenarioId} />
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

        <Step n={4} title={t('step.result')} accent>
          <div className="space-y-4">
            <ImageWarning hasImage={!!imageUrl} />
            <PromptPreview prompt={prompt} />
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

      <footer className="mx-auto max-w-3xl px-4 pb-10 text-center text-[13px] text-neutral-600">
        {t('footer')}
      </footer>
    </div>
  )
}

function Step({
  n,
  title,
  accent = false,
  children,
}: {
  n: number
  title: string
  accent?: boolean
  children: ReactNode
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
            accent
              ? 'bg-gold-500 text-graphite-950'
              : 'border border-graphite-600 text-gold-400'
          }`}
        >
          {n}
        </span>
        <h2 className="font-display text-2xl font-medium text-neutral-100">{title}</h2>
      </div>
      <div
        className={`rounded-xl border p-4 ${
          accent
            ? 'border-gold-600/30 bg-graphite-800/40'
            : 'border-graphite-700 bg-graphite-800'
        }`}
      >
        {children}
      </div>
    </section>
  )
}
