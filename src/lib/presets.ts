export interface Preset {
  id: string
  label: string
  fragment?: string
}

export const STYLE_PRESETS: Preset[] = [
  { id: '', label: 'No specific style' },
  { id: 'modern-minimal', label: 'Modern minimalist', fragment: 'clean modern minimalist architecture with simple lines' },
  { id: 'scandinavian', label: 'Scandinavian', fragment: 'Scandinavian style with light woods and a muted palette' },
  { id: 'mediterranean', label: 'Mediterranean', fragment: 'Mediterranean style with stucco walls and terracotta accents' },
  { id: 'brutalist', label: 'Brutalist', fragment: 'brutalist style with exposed board-formed concrete' },
  { id: 'industrial', label: 'Industrial', fragment: 'industrial style with exposed steel and brick' },
  { id: 'tropical', label: 'Contemporary tropical', fragment: 'contemporary tropical design with timber screens and natural ventilation' },
]

export const MATERIAL_PRESETS: Preset[] = [
  { id: '', label: 'Keep / unspecified' },
  { id: 'concrete', label: 'Concrete', fragment: 'fair-faced concrete surfaces' },
  { id: 'brick', label: 'Brick', fragment: 'exposed brick masonry' },
  { id: 'wood', label: 'Wood', fragment: 'warm timber cladding' },
  { id: 'glass-steel', label: 'Glass & steel', fragment: 'a glass curtain wall with slim steel mullions' },
  { id: 'stone', label: 'Natural stone', fragment: 'natural stone cladding' },
  { id: 'render-white', label: 'White render', fragment: 'smooth white rendered walls' },
]

export function presetFragment(presets: Preset[], id: string): string {
  return presets.find((p) => p.id === id)?.fragment ?? ''
}
