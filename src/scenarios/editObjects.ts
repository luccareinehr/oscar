import type { ScenarioDef } from '../lib/types'
import { lightingFragment, materialFragment } from '../lib/prompts'

export const editObjects: ScenarioDef = {
  id: 'editObjects',
  label: 'Edit objects in a render',
  blurb:
    'Add, remove, or replace furniture, materials, vegetation, or figures in an existing render.',
  fields: [
    'editInstruction',
    'editRegion',
    'materials',
    'lighting',
    'aspectRatio',
    'resolution',
    'fidelityLock',
  ],
  buildBody: (s) => {
    const instruction =
      s.editInstruction.trim() ||
      '(describe the change, e.g. "replace the sofa with a grey linen sofa")'
    const region = s.editRegion.trim()
      ? ` Target area: ${s.editRegion.trim()}.`
      : ''
    const material = materialFragment(s)
    const materialLine = material ? ` Use ${material} where relevant.` : ''
    return (
      `In the attached render, make this specific edit: ${instruction}.${region}${materialLine}` +
      ` Match the existing ${lightingFragment(s)} and keep everything else in the image unchanged,` +
      ` including geometry, materials, lighting, and composition.`
    )
  },
}
