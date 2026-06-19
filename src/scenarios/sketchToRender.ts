import type { ScenarioDef } from '../lib/types'
import {
  lightingFragment,
  materialFragment,
  peopleFragment,
  styleFragment,
  vegetationFragment,
} from '../lib/prompts'

export const sketchToRender: ScenarioDef = {
  id: 'sketchToRender',
  label: 'Sketch / print → render',
  blurb:
    'Turn a hand sketch, CAD line drawing, or floor plan into a sober photorealistic render.',
  fields: [
    'sourceType',
    'environment',
    'style',
    'materials',
    'lighting',
    'vegetation',
    'people',
    'aspectRatio',
    'resolution',
    'fidelityLock',
  ],
  buildBody: (s) => {
    const env = s.environment === 'indoor' ? 'interior space' : 'exterior scene'
    const style = styleFragment(s)
    const material = materialFragment(s)
    const parts = [
      `Render the attached ${s.sourceType} as a realistic ${env}.`,
      style && `Architectural character: ${style}.`,
      material && `Primary materials: ${material}.`,
      `Lighting: ${lightingFragment(s)}.`,
      s.environment === 'outdoor' && `Vegetation: ${vegetationFragment(s)}.`,
      `People: ${peopleFragment(s)}.`,
    ].filter(Boolean)
    return parts.join(' ')
  },
}
