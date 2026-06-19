import type { ScenarioDef } from '../lib/types'
import {
  angleFragment,
  heightFragment,
  lightingFragment,
  vegetationFragment,
} from '../lib/prompts'

export const changePerspective: ScenarioDef = {
  id: 'changePerspective',
  label: 'Change perspective / lighting',
  blurb:
    'Re-render the same building from a new camera angle, time of day, or season, kept consistent.',
  fields: [
    'cameraAngle',
    'cameraHeight',
    'timeOfDay',
    'season',
    'lighting',
    'vegetation',
    'aspectRatio',
    'resolution',
    'fidelityLock',
  ],
  buildBody: (s) => {
    const angle = angleFragment(s.cameraAngle)
    const height = heightFragment(s.cameraHeight)
    const time = s.timeOfDay === 'keep' ? '' : ` Time of day: ${s.timeOfDay}.`
    const season = s.season === 'keep' ? '' : ` Season: ${s.season}.`
    return (
      `Re-render the building shown in the attached image from a ${angle} (${height}),` +
      ` keeping the same building design, proportions, materials, and surroundings` +
      ` consistent with the original.${time}${season}` +
      ` Lighting: ${lightingFragment(s)}. Vegetation: ${vegetationFragment(s)}.`
    )
  },
}
