import type {
  CameraAngle,
  CameraHeight,
  ScenarioDef,
  Settings,
} from './types'
import { MATERIAL_PRESETS, STYLE_PRESETS, presetFragment } from './presets'

/**
 * The contract prepended to every prompt. The goal is "sober but not bland":
 * believable, scale-accurate, geometry-preserving output that still looks like
 * a crafted, professionally photographed render, not a flat clay model.
 */
export const PREAMBLE = [
  'Photorealistic, professionally photographed architectural visualization with rich natural detail, in the style of a high-end architecture magazine.',
  'Render crisp, tactile materials with visible texture and micro-detail, soft realistic global illumination with gentle ambient occlusion and accurate contact shadows, layered depth, and a subtle sense of atmosphere.',
  'Preserve the exact geometry, proportions, and structural lines of the attached image, with accurate human scale (doors about 2.1 m, ceilings about 2.7 to 3 m, standard furniture sizes).',
  'Keep it believable and tasteful: real materials, balanced natural light, and climate-appropriate planting. Restrained but not bland, with depth, warmth, and craft, and without theatrical or fantastical effects.',
].join(' ')

/** Explicit "don'ts". These target only the garish failure modes, not warmth. */
export const NEGATIVE =
  'Avoid: exaggerated or inconsistent scale, dense jungle-like or overgrown vegetation, ' +
  'cartoonish or fantastical styling, oversaturated colors, heavy HDR halos, strong lens flares, ' +
  'gaudy artificial color grading, fisheye distortion, and any fictional structural changes not present in the source image.'

export function lightingFragment(s: Settings): string {
  switch (s.lighting) {
    case 'overcast':
      return 'soft, even overcast daylight with smooth diffuse shading and gentle cool tones'
    case 'soft-daylight':
      return 'natural daylight with soft directional sunlight, warm highlights and believable soft shadows that give the scene depth'
    case 'dusk':
      return 'warm dusk light, fading daylight balanced against a soft, inviting interior glow'
    case 'interior-ambient':
      return 'balanced ambient interior lighting with warm accent pools and soft, natural shadows'
  }
}

export function vegetationFragment(s: Settings): string {
  switch (s.vegetation) {
    case 'none':
      return 'no added vegetation'
    case 'sparse':
      return 'a few sparse, climate-appropriate plants, naturally arranged'
    case 'moderate':
      return 'lush but tidy, realistic landscaping, kept in proportion and not overgrown'
  }
}

export function peopleFragment(s: Settings): string {
  return s.people === 'sparse'
    ? 'a few correctly scaled human figures for scale and life'
    : 'no people'
}

export function styleFragment(s: Settings): string {
  return presetFragment(STYLE_PRESETS, s.style)
}

export function materialFragment(s: Settings): string {
  return presetFragment(MATERIAL_PRESETS, s.materials)
}

export function angleFragment(angle: CameraAngle): string {
  switch (angle) {
    case 'eye-level':
      return 'eye-level perspective'
    case 'aerial':
      return 'aerial / bird’s-eye view'
    case 'worms-eye':
      return 'low worm’s-eye view'
    case 'one-point-perspective':
      return 'symmetric one-point perspective'
  }
}

export function heightFragment(height: CameraHeight): string {
  switch (height) {
    case 'low':
      return 'low camera height'
    case 'standing':
      return 'standing eye height (~1.6 m)'
    case 'elevated':
      return 'elevated camera height'
  }
}

/**
 * Assemble the final prompt: rich-but-sober preamble + scenario body + fidelity
 * lock + a quality line + output spec + negative guidance.
 */
export function buildPrompt(def: ScenarioDef, s: Settings): string {
  const lines: string[] = [PREAMBLE, '', def.buildBody(s)]

  if (def.id !== 'upscale4k' && s.fidelityLock) {
    lines.push(
      'Fidelity: change only what is explicitly requested above; preserve all other geometry, proportions, and structural elements exactly as in the attached image.',
    )
  }

  lines.push(
    'Quality: sharp focus, fine material textures, realistic reflections and soft shadows, gentle natural depth of field, magazine-grade architectural photography.',
  )

  if (def.id === 'upscale4k') {
    lines.push('Output: maximum 4K resolution; preserve the original aspect ratio.')
  } else {
    lines.push(`Output: ${s.resolution} resolution, ${s.aspectRatio} aspect ratio.`)
  }

  lines.push('', NEGATIVE)
  return lines.join('\n')
}
