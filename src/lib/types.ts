export type ScenarioId =
  | 'sketchToRender'
  | 'editObjects'
  | 'changePerspective'
  | 'upscale4k'

export type Environment = 'indoor' | 'outdoor'
export type Lighting = 'overcast' | 'soft-daylight' | 'dusk' | 'interior-ambient'
export type Vegetation = 'none' | 'sparse' | 'moderate'
export type People = 'none' | 'sparse'
export type Resolution = '1K' | '2K' | '4K'
export type AspectRatio = '1:1' | '4:3' | '3:2' | '16:9'
export type CameraAngle =
  | 'eye-level'
  | 'aerial'
  | 'worms-eye'
  | 'one-point-perspective'
export type CameraHeight = 'low' | 'standing' | 'elevated'
export type SourceType = 'hand sketch' | 'CAD line drawing' | 'floor plan'
export type TimeOfDay = 'keep' | 'morning' | 'midday' | 'dusk'
export type Season = 'keep' | 'spring' | 'summer' | 'autumn' | 'winter'

/** Which controls a scenario exposes in the settings panel. */
export type FieldKey =
  | 'sourceType'
  | 'environment'
  | 'style'
  | 'materials'
  | 'lighting'
  | 'vegetation'
  | 'people'
  | 'cameraAngle'
  | 'cameraHeight'
  | 'timeOfDay'
  | 'season'
  | 'editInstruction'
  | 'editRegion'
  | 'aspectRatio'
  | 'resolution'
  | 'fidelityLock'

export interface Settings {
  environment: Environment
  lighting: Lighting
  vegetation: Vegetation
  people: People
  style: string // preset id or ''
  materials: string // preset id or ''
  cameraAngle: CameraAngle
  cameraHeight: CameraHeight
  aspectRatio: AspectRatio
  resolution: Resolution
  fidelityLock: boolean
  // scenario-specific free text
  sourceType: SourceType
  editInstruction: string
  editRegion: string
  timeOfDay: TimeOfDay
  season: Season
}

export interface ScenarioDef {
  id: ScenarioId
  label: string
  blurb: string
  fields: FieldKey[]
  buildBody: (s: Settings) => string
}

export interface SavedPrompt {
  id: string
  name: string
  scenario: ScenarioId
  settings: Settings
  prompt: string
}
