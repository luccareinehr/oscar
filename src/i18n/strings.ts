export type Lang = 'pt' | 'en'

type Dict = Record<string, string>

const pt: Dict = {
  tagline: 'Prompts sóbrios e em escala para arquitetura. Cole no Gemini ou no AI Studio.',

  'step.scenario': 'Escolha um cenário',
  'step.image': 'Sua imagem',
  'step.settings': 'Ajustes',
  'step.result': 'Seu prompt',

  // Scenarios
  'scenario.sketchToRender.label': 'Esboço para render',
  'scenario.sketchToRender.blurb':
    'Transforme um esboço, desenho CAD ou planta em um render fotorrealista e sóbrio.',
  'scenario.editObjects.label': 'Editar objetos',
  'scenario.editObjects.blurb':
    'Adicione, remova ou troque móveis, materiais, vegetação ou pessoas.',
  'scenario.changePerspective.label': 'Mudar perspectiva ou luz',
  'scenario.changePerspective.blurb':
    'Refaça o render de outro ângulo, horário ou estação, mantendo o prédio.',
  'scenario.upscale4k.label': 'Melhorar para 4K',
  'scenario.upscale4k.blurb': 'Aumente a nitidez e a resolução sem mudar o conteúdo.',

  // Image dropzone
  'image.dropTitle': 'Solte sua imagem aqui, ou clique para escolher',
  'image.dropSub': 'Fica no seu dispositivo. Serve só para lembrar o que anexar no Gemini.',
  'image.selected': 'Selecionada:',
  'image.remove': 'remover',

  // Settings
  'settings.none': 'Sem ajustes. É só melhoria de qualidade em 4K, sem mudar o conteúdo.',
  'field.sourceType': 'Tipo de origem',
  'field.environment': 'Ambiente',
  'field.style': 'Estilo',
  'field.materials': 'Material',
  'field.lighting': 'Iluminação',
  'field.vegetation': 'Vegetação',
  'field.people': 'Pessoas',
  'field.cameraAngle': 'Ângulo da câmera',
  'field.cameraHeight': 'Altura da câmera',
  'field.timeOfDay': 'Horário',
  'field.season': 'Estação',
  'field.editInstruction': 'O que mudar',
  'field.editRegion': 'Onde (dica opcional)',
  'field.aspectRatio': 'Proporção',
  'field.resolution': 'Resolução',
  'field.fidelityLock': 'Travar fidelidade. Mudar só o que pedi.',
  'placeholder.editInstruction': 'ex.: "trocar o sofá por um sofá de linho cinza"',
  'placeholder.editRegion': 'ex.: "na parede esquerda perto da janela"',

  // Options
  'opt.sourceType.hand sketch': 'Esboço à mão',
  'opt.sourceType.CAD line drawing': 'Desenho CAD',
  'opt.sourceType.floor plan': 'Planta baixa',
  'opt.environment.outdoor': 'Externo',
  'opt.environment.indoor': 'Interno',
  'opt.lighting.soft-daylight': 'Luz do dia suave',
  'opt.lighting.overcast': 'Nublado',
  'opt.lighting.dusk': 'Entardecer (sóbrio)',
  'opt.lighting.interior-ambient': 'Ambiente interno',
  'opt.vegetation.none': 'Nenhuma',
  'opt.vegetation.sparse': 'Pouca',
  'opt.vegetation.moderate': 'Moderada (limitada)',
  'opt.people.none': 'Nenhuma',
  'opt.people.sparse': 'Poucas (p/ escala)',
  'opt.cameraAngle.eye-level': 'Altura dos olhos',
  'opt.cameraAngle.aerial': 'Aérea (pássaro)',
  'opt.cameraAngle.worms-eye': 'Contra-plongée',
  'opt.cameraAngle.one-point-perspective': 'Perspectiva de 1 ponto',
  'opt.cameraHeight.low': 'Baixa',
  'opt.cameraHeight.standing': 'Em pé (~1,6 m)',
  'opt.cameraHeight.elevated': 'Elevada',
  'opt.timeOfDay.keep': 'Manter original',
  'opt.timeOfDay.morning': 'Manhã',
  'opt.timeOfDay.midday': 'Meio-dia',
  'opt.timeOfDay.dusk': 'Entardecer',
  'opt.season.keep': 'Manter original',
  'opt.season.spring': 'Primavera',
  'opt.season.summer': 'Verão',
  'opt.season.autumn': 'Outono',
  'opt.season.winter': 'Inverno',

  // Presets
  'preset.style.': 'Sem estilo definido',
  'preset.style.modern-minimal': 'Minimalista moderno',
  'preset.style.scandinavian': 'Escandinavo',
  'preset.style.mediterranean': 'Mediterrâneo',
  'preset.style.brutalist': 'Brutalista',
  'preset.style.industrial': 'Industrial',
  'preset.style.tropical': 'Tropical contemporâneo',
  'preset.material.': 'Manter ou indefinido',
  'preset.material.concrete': 'Concreto',
  'preset.material.brick': 'Tijolo',
  'preset.material.wood': 'Madeira',
  'preset.material.glass-steel': 'Vidro e aço',
  'preset.material.stone': 'Pedra natural',
  'preset.material.render-white': 'Reboco branco',

  // Warning
  'warn.title': 'Anexe sua imagem junto com este prompt.',
  'warn.body':
    'Este prompt só descreve como transformar uma imagem. Sozinho, ele não faz nada. No app do Gemini ou no Google AI Studio, cole este prompt E anexe sua imagem',
  'warn.ctxHas': '(a que está acima)',
  'warn.ctxNo': '(o esboço ou render que quer mudar)',
  'warn.beforeRun': 'antes de gerar.',

  // Prompt preview
  'prompt.header': 'Prompt gerado',
  'prompt.copy': 'Copiar prompt',
  'prompt.copied': 'Copiado',

  // Checklist
  'use.title': 'Como usar este prompt',
  'use.step1': 'Clique em "Copiar prompt" acima.',
  'use.step2pre': 'Abra o',
  'use.step2geminiApp': 'app do Gemini',
  'use.step2geminiQuota': '(~20 imagens grátis/dia)',
  'use.step2or': 'ou o',
  'use.step2studio': 'Google AI Studio',
  'use.step2studioQuota': '(~500/dia).',
  'use.step3': 'Anexe sua imagem (o esboço ou render).',
  'use.step4': 'Cole o prompt e gere.',
  'use.note':
    'Os limites grátis são definidos pelo Google e podem mudar. Este app nunca envia sua imagem ou prompt para lugar nenhum. Tudo fica no seu navegador.',

  // Saved
  'saved.title': 'Prompts salvos',
  'saved.save': 'Salvar atual',
  'saved.empty': 'Nada salvo ainda. Salve um prompt para reutilizar os ajustes depois.',
  'saved.delete': 'excluir',

  footer:
    'Funciona inteiramente no seu navegador. Sem conta, sem chave de API, nada enviado a servidores.',
}

const en: Dict = {
  tagline: 'Sober, scale-accurate render prompts for architecture. Paste into Gemini or AI Studio.',

  'step.scenario': 'Choose a scenario',
  'step.image': 'Your image',
  'step.settings': 'Settings',
  'step.result': 'Your prompt',

  'scenario.sketchToRender.label': 'Sketch to render',
  'scenario.sketchToRender.blurb':
    'Turn a hand sketch, CAD drawing, or floor plan into a sober photorealistic render.',
  'scenario.editObjects.label': 'Edit objects',
  'scenario.editObjects.blurb':
    'Add, remove, or replace furniture, materials, vegetation, or figures.',
  'scenario.changePerspective.label': 'Change perspective or light',
  'scenario.changePerspective.blurb':
    'Re-render from a new angle, time of day, or season, keeping the building.',
  'scenario.upscale4k.label': 'Upscale to 4K',
  'scenario.upscale4k.blurb': 'Sharpen and upscale without changing the content.',

  'image.dropTitle': 'Drop your image here, or click to choose',
  'image.dropSub': 'Stays on your device. Just a reminder of what to attach in Gemini.',
  'image.selected': 'Selected:',
  'image.remove': 'remove',

  'settings.none': 'No settings. Pure 4K quality upscale, content untouched.',
  'field.sourceType': 'Source type',
  'field.environment': 'Environment',
  'field.style': 'Style',
  'field.materials': 'Material',
  'field.lighting': 'Lighting',
  'field.vegetation': 'Vegetation',
  'field.people': 'People',
  'field.cameraAngle': 'Camera angle',
  'field.cameraHeight': 'Camera height',
  'field.timeOfDay': 'Time of day',
  'field.season': 'Season',
  'field.editInstruction': 'What to change',
  'field.editRegion': 'Where (optional hint)',
  'field.aspectRatio': 'Aspect ratio',
  'field.resolution': 'Resolution',
  'field.fidelityLock': 'Fidelity lock. Change only what I asked.',
  'placeholder.editInstruction': 'e.g. "replace the sofa with a grey linen sofa"',
  'placeholder.editRegion': 'e.g. "the left wall near the window"',

  'opt.sourceType.hand sketch': 'Hand sketch',
  'opt.sourceType.CAD line drawing': 'CAD drawing',
  'opt.sourceType.floor plan': 'Floor plan',
  'opt.environment.outdoor': 'Outdoor',
  'opt.environment.indoor': 'Indoor',
  'opt.lighting.soft-daylight': 'Soft daylight',
  'opt.lighting.overcast': 'Overcast',
  'opt.lighting.dusk': 'Dusk (restrained)',
  'opt.lighting.interior-ambient': 'Interior ambient',
  'opt.vegetation.none': 'None',
  'opt.vegetation.sparse': 'Sparse',
  'opt.vegetation.moderate': 'Moderate (capped)',
  'opt.people.none': 'None',
  'opt.people.sparse': 'Sparse (for scale)',
  'opt.cameraAngle.eye-level': 'Eye level',
  'opt.cameraAngle.aerial': 'Aerial (bird’s-eye)',
  'opt.cameraAngle.worms-eye': 'Worm’s-eye',
  'opt.cameraAngle.one-point-perspective': 'One-point perspective',
  'opt.cameraHeight.low': 'Low',
  'opt.cameraHeight.standing': 'Standing (~1.6 m)',
  'opt.cameraHeight.elevated': 'Elevated',
  'opt.timeOfDay.keep': 'Keep original',
  'opt.timeOfDay.morning': 'Morning',
  'opt.timeOfDay.midday': 'Midday',
  'opt.timeOfDay.dusk': 'Dusk',
  'opt.season.keep': 'Keep original',
  'opt.season.spring': 'Spring',
  'opt.season.summer': 'Summer',
  'opt.season.autumn': 'Autumn',
  'opt.season.winter': 'Winter',

  'preset.style.': 'No specific style',
  'preset.style.modern-minimal': 'Modern minimalist',
  'preset.style.scandinavian': 'Scandinavian',
  'preset.style.mediterranean': 'Mediterranean',
  'preset.style.brutalist': 'Brutalist',
  'preset.style.industrial': 'Industrial',
  'preset.style.tropical': 'Contemporary tropical',
  'preset.material.': 'Keep or unspecified',
  'preset.material.concrete': 'Concrete',
  'preset.material.brick': 'Brick',
  'preset.material.wood': 'Wood',
  'preset.material.glass-steel': 'Glass & steel',
  'preset.material.stone': 'Natural stone',
  'preset.material.render-white': 'White render',

  'warn.title': 'Attach your image with this prompt.',
  'warn.body':
    'This prompt only describes how to transform an image. On its own it does nothing. In the Gemini app or Google AI Studio, paste this prompt AND attach your image',
  'warn.ctxHas': '(the one shown above)',
  'warn.ctxNo': '(the sketch or render you want to change)',
  'warn.beforeRun': 'before running.',

  'prompt.header': 'Generated prompt',
  'prompt.copy': 'Copy prompt',
  'prompt.copied': 'Copied',

  'use.title': 'How to use this prompt',
  'use.step1': 'Click "Copy prompt" above.',
  'use.step2pre': 'Open the',
  'use.step2geminiApp': 'Gemini app',
  'use.step2geminiQuota': '(~20 free images/day)',
  'use.step2or': 'or',
  'use.step2studio': 'Google AI Studio',
  'use.step2studioQuota': '(~500/day).',
  'use.step3': 'Attach your image (the sketch or render).',
  'use.step4': 'Paste the prompt and run.',
  'use.note':
    'Free daily limits are set by Google and may change. This tool never sends your image or prompt anywhere. Everything stays in your browser.',

  'saved.title': 'Saved prompts',
  'saved.save': 'Save current',
  'saved.empty': 'Nothing saved yet. Save a prompt to reuse its settings later.',
  'saved.delete': 'delete',

  footer: 'Runs entirely in your browser. No account, no API key, nothing sent to a server.',
}

export const STRINGS: Record<Lang, Dict> = { pt, en }
