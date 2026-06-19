import type { ScenarioDef, ScenarioId, Settings } from '../lib/types'
import { sketchToRender } from './sketchToRender'
import { editObjects } from './editObjects'
import { changePerspective } from './changePerspective'
import { upscale4k } from './upscale4k'

export const SCENARIOS: ScenarioDef[] = [
  sketchToRender,
  editObjects,
  changePerspective,
  upscale4k,
]

export function scenarioById(id: ScenarioId): ScenarioDef {
  return SCENARIOS.find((s) => s.id === id) ?? sketchToRender
}

export const DEFAULT_SETTINGS: Settings = {
  environment: 'outdoor',
  lighting: 'soft-daylight',
  vegetation: 'sparse',
  people: 'none',
  style: '',
  materials: '',
  cameraAngle: 'eye-level',
  cameraHeight: 'standing',
  aspectRatio: '3:2',
  resolution: '2K',
  fidelityLock: true,
  sourceType: 'hand sketch',
  editInstruction: '',
  editRegion: '',
  timeOfDay: 'keep',
  season: 'keep',
}
