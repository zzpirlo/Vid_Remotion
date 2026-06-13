# Development Log

## Progress Summary
- **Phase 1 – Art Direction** completed: defined color palette, typography, shape language, icon style, background treatment, and motion principles.
- **Storyboard Outline** created: 10-scene sequence with purpose, key visuals, duration, and on‑screen text.
- **Asset Checklist** compiled: reusable SVG assets, background elements, text components, motion hooks, and data labels.

## SVG Design Specifications

---

### 1. Mars Base Planet
**Description**  
A flat, vector representation of Mars optimized for independent animation of rotation, surface features, and atmospheric layers. Built from simple geometric primitives (circles, paths) to keep file size low and transform performance high in Remotion.

**Layer Structure** (top → bottom)  
1. `mars-surface-details` – stroked paths for Olympus Mons and Valles Marineris (optional, can be toggled).  
2. `mars-atmosphere` – a slightly larger circle with low‑opacity fill (`#00B4D8` at 15 %) to simulate a thin haze.  
3. `mars-base` – the main planetary circle (`#E25822` fill, no stroke).  
4. `mars-shadow` – a subtle drop‑shadow ellipse beneath the planet (offset 2 px down/right, `#000000` at 8 % opacity) – used only when the planet is lifted off the background for emphasis.  
5. `mars-highlight` – a thin crescent‑shaped path on the upper‑left edge of the planet (`#FFFFFF` at 12 % opacity) to suggest a light source; can be animated to simulate changing illumination.

**Naming Conventions**  
- File: `mars-base.svg`  
- Layer IDs: `mars-base`, `mars-atmosphere`, `mars-surface-details`, `mars-shadow`, `mars-highlight`  
- CSS classes (if using inline styles): `.mars-base`, `.mars-atmosphere`, etc.  
- When imported as a React component, export each layer as a named export: `MarsBase`, `MarsAtmosphere`, `MarsSurfaceDetails`, `MarsShadow`, `MarsHighlight`.

---

### 2. Light Texture Overlay
**Description**  
A very low‑opacity noise texture to prevent banding on flat colors. Designed as a reusable SVG filter that can be applied to any layer via `filter:url(#noiseTexture)`.

**Layer Structure**  
- Single `<filter>` element with id `noiseTexture` containing `<feTurbulence>` (type="fractalNoise", baseFrequency="0.65", numOctaves="1", stitchTiles="stitch") and `<feComponentTransfer>` to reduce opacity to ~4 %.

**Naming Conventions**  
- File: `texture-noise.svg` (exported as a React component `NoiseTexture` that returns the `<filter>` element).  
- Usage: `<NoiseTexture />` placed in the `<defs>` of the root SVG; layers reference it with `filter="url(#noiseTexture)"`.

---

### 3. Shadow / Highlight Layers (generic)
**Description**  
Reusable drop‑shadow and highlight shapes that can be applied to any icon, landmark, or UI element to convey depth without breaking the flat aesthetic.

**Layer Structure** (applied per element)  
1. `element-shadow` – blurred ellipse (`stdDeviation="2"`), fill `#000000` at 6 % opacity, offset 2 px down/right.  
2. `element-highlight` – small ellipse or path on the top‑left quadrant, fill `#FFFFFF` at 10 % opacity, no blur.

**Naming Conventions**  
- Files: `shadow.svg` and `highlight.svg` (each exports a functional component receiving `width`, `height`, `offsetX`, `offsetY`, `opacity` props).  
- Layer IDs inside: `shadow`, `highlight`.  
- When used, clone with unique IDs via `useId()` or pass a `uuid` prop to avoid DOM ID collisions.

---

### 4. Icons (general)
**Description**  
Flat, 2‑px stroke icons with optional solid fill for state indication. All icons share the same stroke width and corner radius (4 px) for visual consistency.

**Layer Structure**  
- `icon-outline` – the main stroked path (stroke=`#F5F5F5` or accent color, stroke-width=`2`, fill=`none`).  
- `icon-fill` (optional) – same shape as outline, fill=`#E25822` or `#00B4D8`, opacity controlled via props (0 → 1).  
- `icon-shadow` – reusable shadow layer (see above).  
- `icon-highlight` – reusable highlight layer (see above).

**Naming Conventions**  
- File: `icon-<name>.svg` (e.g., `icon-rocket.svg`, `icon-astronaut.svg`).  
- Exported component: `Icon<Name>` (PascalCase).  
- Props: `color` (stroke color), `filled` (boolean), `size` (width/height), `withShadow` (boolean), `withHighlight` (boolean).  
- Internal IDs: `icon-outline`, `icon-fill`, `icon-shadow`, `icon-highlight` (scoped via `useId`).

---

### 5. Landmarks (Olympus Mons, Valles Marineris, Polar Caps)
**Description**  
Simplified, stylized representations of Martian geography. Built from basic shapes (triangles, rounded rectangles, paths) so they can be scaled, rotated, and animated independently.

**Layer Structure** (example for Olympus Mons)  
- `landmark-base` – main shape (e.g., a stacked set of rounded triangles) with fill=`#F5F5F5` (or neutral) and stroke=`#E25822` (2 px).  
- `landmark-detail` – optional inner lines or texture (stroke=`#E25822`, stroke-width=`1`).  
- `landmark-shadow` – reusable shadow.  
- `landmark-highlight` – reusable highlight.

**Naming Conventions**  
- File: `landmark-<name>.svg` (e.g., `landmark-olympus-mons.svg`, `landmark-valles-marineris.svg`, `landmark-polar-cap.svg`).  
- Exported component: `Landmark<Name>` (PascalCase).  
- Props: `size`, `color` (stroke), `withShadow`, `withHighlight`.  
- Internal IDs follow pattern `<name>-outline`, `<name>-detail`, `<name>-shadow`, `name>-highlight`.

---

### 6. Timelines (Exploration Timeline)
**Description**  
A horizontal line with evenly spaced markers; each marker can hold an icon and a label. Designed to be driven by data (years, events) and animated via stroke‑draw or scale‑in.

**Layer Structure**  
- `timeline-line` – thin `<line>` or `<path>` (stroke=`#F5F5F5`, stroke-width=`2`).  
- `timeline-marker-<i>` – reusable marker group (see below).  
- `timeline-label-<i>` – text element (Source Sans Pro 400, 20 pt, fill=`#F5F5F5`).  
- `timeline-icon-<i>` – placeholder for an icon component (rocket, lander, rover).  
- `timeline-shadow` – optional drop‑shadow under the line (same as generic shadow).  
- `timeline-highlight` – optional subtle glow on active marker (fill=`#00B4D8` at 12 % opacity).

**Marker Group Structure**  
- `marker-dot` – circle (r=`6`, fill=`#F5F5F5`).  
- `marker-connector` – short line from dot to timeline line (stroke=`#F5F5F5`, stroke-width=`1.5`).  

**Naming Conventions**  
- File: `timeline-exploration.svg`.  
- Exported component: `ExplorationTimeline`.  
- Props: `data` (array of `{year, label, iconName}`), `activeIndex` (to highlight current marker), `size` (width, height).  
- Internal IDs: `timeline-line`, `marker-dot-<i>`, `marker-connector-<i>`, `timeline-label-<i>`, `timeline-icon-<i>`.

---

### 7. Data Callouts (Numbers, Facts, Bubbles)
**Description**  
Circular or pill‑shaped bubbles that enclose a numeric value or short fact. Designed to scale with the text inside and to be animatable (fade, scale pop).

**Layer Structure**  
- `callout-background` – circle (`r` computed from text width/height + padding) or rounded rectangle (rx/ry=`8`), fill=`#2D2D2D` (or accent color), stroke=`none`.  
- `callout-text` – `<text>` or HTML‑in‑SVG (IBM Plex Mono 600, 24 pt, fill=`#F5F5F5`).  
- `callout-shadow` – reusable shadow.  
- `callout-highlight` – optional outer glow (stroke=`#00B4D8`, stroke-width=`2`, opacity=`0.1`).  

**Naming Conventions**  
- File: `data-callout.svg` (generic) – exports a component `DataCallout`.  
- Props: `content` (string or number), `type` (`"circle"` | `"pill"`), `colorScheme` (`"neutral"` | `"accent"` | `"success"` | `"error"`), `withShadow`, `withHighlight`, `sizeOverride` (optional).  
- Internal IDs: `callout-background`, `callout-text`, `callout-shadow`, `callout-highlight`.  
- For specific reusable callouts (e.g., temperature bubble), create `data-callout-temperature.svg` that sets default props accordingly.

---

**All SVGs are designed to be:**  
- **Flat** – no complex gradients; only subtle opacity‑based highlights/shadows.  
- **Layered** – each visual concern (base, detail, shadow, highlight) is a separate layer that can be toggled, animated, or styled independently in Remotion using transforms (`translate`, `scale`, `rotate`) and opacity changes.  
- **Optimized for transforms** – shapes are centered at their origin (0,0) or have a clear pivot point so that Remotion’s `<AbsoluteFill>` or `<div>` transforms behave predictably.  
- **Reusable** – naming and props allow the same file to be used across multiple scenes with only props changing (color, size, state).

*End of SVG design specifications. Next phase will involve implementing these assets as React‑SVG components and wiring them to the storyboard timing.*

## Implementation Phase – Completed
- Created folder structure: src/assets/svg, src/components, src/hooks, src/compositions, src/scenes.
- Implemented SVG assets as React components:
  - Mars base (MarsBase, MarsAtmosphere, MarsShadow, MarsHighlight)
  - Noise texture overlay (NoiseTexture)
  - Generic Shadow and Highlight components
  - Icons: IconRocket, IconAstronaut
  - Landmarks: LandmarkOlympusMons, LandmarkVallesMarineris, LandmarkPolarCap
  - Exploration timeline: ExplorationTimeline
  - Data callout: DataCallout
- Implemented motion hooks in src/hooks/motion.ts:
  - useFadeInOut, useScalePop, useOrbitProgress, usePulse, useStagger, useLineDraw, useBlink, useMotionBlurTrail
- Created Root composition (src/Root.tsx) defining:
  - Width: 1080, Height: 1920 (9:16), FPS: 60, Duration: 3600 frames (60 seconds)
  - Scene breakdown according to storyboard (10 scenes × 6 seconds each)
  - Used reusable assets and motion hooks for entrance fades and simple transforms.
- All assets are flat, layered, and optimized for Remotion transforms.
- No external animation libraries used; all motion based on remotion's useCurrentFrame and easing functions.

Next steps: Refine scene animations, add precise timing per storyboard, polish visual integration, and export final video.


## Phase 7 – Component Architecture (Remotion)

### Tree Structure (one responsibility per component)

```
src/
├── Root.tsx                  // Root composition: defines video metadata (width, height, fps, duration) and renders the SceneManager
│
├── SceneManager.tsx          // Handles scene sequencing based on frame count; renders the active Scene component
│
├── scenes/                   // One component per storyboard scene (only composition, no animation logic)
│   ├── Scene01_OpeningHook.tsx
│   ├── Scene02_PlanetOverview.tsx
│   ├── Scene03_OrbitSeasons.tsx
│   ├── Scene04_SurfaceFeatures.tsx
│   ├── Scene05_AtmosphereClimate.tsx
│   ├── Scene06_WaterIce.tsx
│   ├── Scene07_Moons.tsx
│   ├── Scene08_ExplorationTimeline.tsx
│   ├── Scene09_FutureOutlook.tsx
│   └── Scene10_ClosingCTA.tsx
│
├── layout/                   // Shared visual layout helpers (background, safe zone, centering)
│   ├── BackgroundLayer.tsx   // Deep-space color + optional noise texture
│   ├── CenteredContainer.tsx // Flex container that centers children within the composition
│   └── SafeZone.tsx          // Invisible guides (or visible in dev) for 120px top/bottom margin
│
├── motion/                   // Pure animation primitives (hooks) – isolated logic
│   ├── useFadeSlide.ts
│   ├── useScalePop.ts
│   ├── useOrbitMotion.ts
│   ├── useLineDrawReveal.ts
│   ├── usePulseIdle.ts
│   ├── useCountUp.ts
│   ├── useStaggerSequence.ts
│   ├── useBlinkHighlight.ts
│   ├── useRotate3DRack.ts
│   └── useFadeInScaleCombo.ts
│
├── assets/                   // SVG asset wrappers (presentational, no motion)
│   ├── mars/                 // MarsBase, MarsAtmosphere, MarsShadow, MarsHighlight
│   ├── icons/                // IconRocket, IconAstronaut, etc.
│   ├── landmarks/            // LandmarkOlympusMons, LandmarkVallesMarineris, LandmarkPolarCap
│   ├── timeline/             // ExplorationTimeline (static data-driven)
│   ├── callouts/             // DataCallout
│   └── textures/             // NoiseTexture
│
├── hooks/                    // Existing custom hooks (useVideoConfig wrapper, etc.) – kept for compatibility
│   └── motion.ts             // Original aggregate file (can be refactored into individual primitives)
│
└── types/                    // TypeScript interfaces (scene data, props, etc.)
    ├── sceneData.ts
    └── timelineItem.ts
```

### Responsibility Summary

- **Root composition** (`Root.tsx`): Only sets up the `<Composition>` with correct dimensions, FPS, and duration. Delegates rendering to `SceneManager`.
- **SceneManager**: Computes the current scene index from `useCurrentFrame()` and renders the appropriate `<SceneXX_...>` component. It passes the `progressInScene` (0‑1) as a prop so scenes can drive animations if needed, but ideally scenes stay purely presentational.
- **Scene components**: Receive `progressInScene` (optional) and any data they need. They **only** compose layout and asset wrappers; they do **not** contain animation logic. Any animation is triggered via the motion hooks used inside asset wrappers or layout components.
- **Shared layout components**: Handle background, centering, safe zone, and any global styling. They may use motion primitives for ambient effects (e.g., pulsing background circles).
- **Motion components (hooks)**: Pure functions that return animated values (opacity, scale, rotate, etc.) based on `useCurrentFrame()`. They are imported and used by asset wrappers or layout components.
- **Asset wrappers**: Thin React components around the SVG elements. They accept props (color, size, state) and apply motion hooks to those props. They contain **no** scene‑specific logic; they are reusable across scenes.
- **Types**: Define the shape of scene data, timeline items, etc., to keep props consistent.

This hierarchy ensures:
- One responsibility per component.
- Scenes are purely compositional (easy to reorder or replace).
- Motion logic is isolated and reusable.
- Asset wrappers are dumb presentational components that can be animated in any context.

*Add this tree to Development.md under a new “Component Architecture” section.*

Let me know if you’d like any adjustments or if we should proceed to implementing the scene components using this structure.


## Phase 8 – Implementation Complete
- **Phase 8A – Root & Motion Primitives**: Created Root.tsx (9:16, 60fps, 3600 frames) and all motion primitives (useFadeSlide, useScalePop, useOrbitMotion, useLineDrawReveal, usePulseIdle, useCountUp, useStaggerSequence, useBlinkHighlight, useRotate3DRack, useFadeInScaleCombo).
- **Phase 8B – Layout & Scene Components**: Built layout components (BackgroundLayer, CenteredContainer, SafeZone) and all ten scene components (Scene01_OpeningHook through Scene10_ClosingCTA). Each scene uses only existing assets and motion primitives, with no new assets or animation logic added.
- All components follow the hierarchy defined in Phase 7, ensuring separation of concerns: scenes compose, layout handles positioning, motion primitives drive animations, asset wrappers are presentational.

The project is now ready for preview and refinement. Run `npx remotion studio` to see the current state, then proceed to polish timings, easing, and visual integration as needed.