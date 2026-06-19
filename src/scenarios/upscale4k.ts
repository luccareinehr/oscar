import type { ScenarioDef } from '../lib/types'

export const upscale4k: ScenarioDef = {
  id: 'upscale4k',
  label: 'Upscale to 4K',
  blurb: 'Sharpen and upscale an existing image to 4K without changing its content.',
  fields: [],
  buildBody: () =>
    'Enhance the attached image to high 4K resolution: increase sharpness, recover fine' +
    ' texture and material detail, and clean up compression artifacts. Make no stylistic,' +
    ' geometric, lighting, color, or content changes whatsoever. This is a pure quality upscale.',
}
