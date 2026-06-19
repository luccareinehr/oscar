import type {
  CameraAngle,
  CameraHeight,
  ScenarioDef,
  Settings,
} from './types'
import { MATERIAL_PRESETS, STYLE_PRESETS, presetFragment } from './presets'

/**
 * The "sober" contract prepended to every prompt. This is the heart of the app:
 * it constrains the model toward restrained, scale-accurate, geometry-preserving
 * output instead of the usual over-vegetated, golden-hour "AI slop".
 */
export const PREAMBLE = [
  'Photorealistic but restrained architectural visualization.',
  'Preserve the exact geometry, proportions, and structural lines of the attached image.',
  'Keep accurate human scale (doors ~2.1 m tall, ceilings ~2.7–3 m, standard furniture sizes).',
  'Use climate-appropriate, sparse-to-moderate vegetation, never overgrown.',
  'Use realistic, even daylight; neutral white balance.',
  'Do not invent or remove structural elements unless explicitly instructed.',
].join(' ')

/** Explicit "don'ts". Nano Banana respects negative guidance well. */
export const NEGATIVE =
  'Avoid: exaggerated or inconsistent scale, dense jungle-like or overgrown vegetation, ' +
  'dramatic cinematic or golden-hour lighting, lens flares, bloom, heavy color grading, ' +
  'fisheye distortion, and any fictional structural changes not present in the source image.'

export function lightingFragment(s: Settings): string {
  switch (s.lighting) {
    case 'overcast':
      return 'soft, even overcast daylight'
    case 'soft-daylight':
      return 'natural soft daylight with gentle, believable shadows'
    case 'dusk':
      return 'calm dusk light with a subtle, restrained interior glow'
    case 'interior-ambient':
      return 'balanced ambient interior lighting'
  }
}

export function vegetationFragment(s: Settings): string {
  switch (s.vegetation) {
    case 'none':
      return 'no added vegetation'
    case 'sparse':
      return 'a few sparse, climate-appropriate plants'
    case 'moderate':
      return 'moderate, realistic landscaping (kept tidy, not overgrown)'
  }
}

export function peopleFragment(s: Settings): string {
  return s.people === 'sparse'
    ? 'a few correctly scaled human figures for scale reference'
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
 * Assemble the final prompt: sober preamble + scenario body + fidelity lock +
 * output spec + negative guidance.
 */
export function buildPrompt(def: ScenarioDef, s: Settings): string {
  const lines: string[] = [PREAMBLE, '', def.buildBody(s)]

  if (def.id !== 'upscale4k' && s.fidelityLock) {
    lines.push(
      'Fidelity: change only what is explicitly requested above; preserve all other geometry, proportions, and structural elements exactly as in the attached image.',
    )
  }

  if (def.id === 'upscale4k') {
    lines.push('Output: maximum 4K resolution; preserve the original aspect ratio.')
  } else {
    lines.push(`Output: ${s.resolution} resolution, ${s.aspectRatio} aspect ratio.`)
  }

  lines.push('', NEGATIVE)
  return lines.join('\n')
}
