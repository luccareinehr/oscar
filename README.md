# Oscar

Sober, scale-accurate render prompts for architecture. Named after Oscar Niemeyer.

Oscar helps architecture students and professionals turn a few bounded settings
(scenario, lighting, vegetation, materials, camera, resolution) into a clean,
copy-paste prompt that produces restrained, geometry-respecting renders instead of
the usual over-vegetated, golden-hour "AI slop". The interface is bilingual
(Portuguese default, English) and monochrome.

## Current app

- Pure client-side single-page app: Vite + React + TypeScript + Tailwind.
- No account, no API key, no backend. Everything runs in the browser.
- You pick a scenario, tune sober settings, generate a prompt, then paste it into a
  free Google UI (Gemini app or AI Studio) together with your own image.
- Deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

### Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Roadmap

Three versions, increasing in capability, cost, and complexity.

### Version 1: prompt generator for the Nano Banana free tier (current)

The app we have today. It does not call any paid API. It builds a carefully
engineered "sober" prompt that the user runs manually in the free Gemini app or
Google AI Studio, attaching their own image.

Next step within this version: take a set of real test images, run the prompts, and
**tune the prompt wording and defaults** based on what actually holds up (scale,
geometry, restraint) versus what drifts. The prompt logic lives in
`src/lib/prompts.ts`, so this is iteration on text, not architecture.

Pros: free, zero infrastructure, private. Cons: manual copy-paste, and the free
model sometimes "changes everything" because nothing forces it to respect the input
geometry.

### Version 2: direct generation with Nano Banana Pro (paid)

Wire the app to the **paid Gemini image API** (Nano Banana Pro / current Gemini image
model). The model understands the prompt better and the app can **generate the image
directly**, with no copy-paste step. Likely bring-your-own-key (each user pays Google
for their own usage) to avoid the app absorbing all costs.

The current design keeps this door open: the same `buildPrompt()` output can feed an
API call. Cons: it costs money per image (no free image tier on the API), and it still
relies on a general image model, so geometry fidelity is better but not guaranteed.

### Version 3: a dedicated geometry-preserving pipeline (most complex, most interesting)

The core limitation of versions 1 and 2 is that a general image model has no hard
constraint to respect the building you drew. The fix is not "an AI trained only on
architecture" (a from-scratch foundation model is impractical for this project).
The fix is **conditioning the generation on the structure of the input image**.

**Approach: ControlNet on top of an open image model.**
- Take an open base model (SDXL or FLUX).
- From the input image (a sketch, a CAD/BIM viewport, or an existing render), extract
  one or more **control maps**: a depth map and a line/edge map (MLSD or Canny) work
  well for buildings, optionally segmentation.
- Run generation conditioned on those maps with a **low denoise / high control
  strength**, so the model restyles materials and light while keeping walls, floor
  count, proportions, and rooflines locked.
- Optionally add a small **LoRA** later to capture a consistent house style. A LoRA
  teaches aesthetics, not geometry, so it complements ControlNet rather than replacing
  it.

This is the part that solves the "it changed everything" problem, because the
structure comes from a control map, not from the model's imagination. It needs no
training dataset, only existing models and control extractors.

**Model-agnostic conditioning (Nano Banana Pro as an alternative backend).**
ControlNet itself cannot attach to Nano Banana Pro: it is a trainable network that
injects conditioning into an open model's internal denoising layers, which requires
the weights and control over the sampling loop. Nano Banana Pro is closed and
API-only, so there is nothing to hook. The goal of this version (condition generation
on the input's structure, not the model's imagination) is still partly reachable with
it, through a different mechanism. Nano Banana Pro accepts input images, so the same
control maps extracted above (depth, line/edge, optionally segmentation) can be passed
as **reference images** alongside the prompt, with instructions to preserve wall
positions, floor count, and rooflines and to restyle only materials and light. This is
**soft guidance, not a hard lock**: there is no control-strength dial forcing fidelity,
so it can still drift on difficult geometry. Expected fidelity ranking: text only
(versions 1 and 2) < Nano Banana Pro with reference maps < open model with true
ControlNet.

The design consequence is to keep the pipeline **model-agnostic at the
control-extraction step**: extract the maps once, then route to either backend. Use
Nano Banana Pro with the maps as references when base aesthetics matter most and no
servers are wanted; use an open model with true ControlNet when a specific drawing
needs a hard geometry lock. (Confirm Nano Banana Pro's current multi-image reference
behavior against Google's live API docs before relying on it; the image-input features
change quickly.)

**Are the open models good enough?** For open-ended generation Nano Banana Pro is
generally ahead (prompt understanding, fewer artifacts, less fiddling), but this task
is geometry-preserving restyling, where an open model with ControlNet can win on the
axis that matters because it provides the hard lock Nano Banana Pro lacks. FLUX.1 is
close to commercial quality and is the first open model worth benchmarking; SDXL is a
step behind aesthetically but has the most mature ControlNet ecosystem, so its
conditioning is the most reliable. The sober, restrained look this app targets also
plays to a control-conditioned pipeline rather than the flashy photorealism where
Nano Banana Pro pulls ahead. The honest answer is to measure it: a small bake-off on
about five real input images (sketch, CAD viewport, existing render), run through
Nano Banana Pro (prompt only), FLUX with ControlNet, and SDXL with ControlNet, scored
on two separate axes, **geometry fidelity** (did walls, floors, and rooflines survive)
and **aesthetic restraint** (sober versus slop). This folds into the version 1 step of
testing on real images.

**Where it runs.** Unlike versions 1 and 2, this requires real GPU inference:
- **Local**, on a good machine. An Apple Silicon Mac runs ComfyUI through PyTorch MPS
  (slower than NVIDIA but workable for testing). Free and private.
- **Serverless API** such as Replicate or fal.ai: pay per image, no servers to manage,
  and a natural backend if generation is wired into Oscar.
- **Rented GPU** such as RunPod or Vast.ai: cheap by the hour, one-click ComfyUI
  templates.
- **Hyperscaler** (GCP, AWS, Azure): most flexible but most overhead (GPU quota
  requests, instance setup, billing). Only worth it at production scale.

**Tradeoffs.** This version stops being free: local ties up the machine, everything
else costs per image or per hour, and the app would need to host or proxy inference
instead of being a static site. In exchange it gives the geometry fidelity that a
prompt alone cannot guarantee, which is exactly the failure mode seen on some renders
in version 1.

A pragmatic split is to keep versions 1 and 2 for fast ideation and use the version 3
pipeline only when geometry must be preserved.
