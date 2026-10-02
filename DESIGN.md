# Design System

<!-- impeccable:design-schema 1 -->

## World

Living-room lamp light on cool paper. Monochrome charcoal on `#F5F5F3`. Images sit in hairline frames at **natural aspect ratio**. The frame takes the image's own ratio (from `width`/`height`) and is sized with container query units, so nothing is cropped or letterboxed.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F5F5F3` | Stage |
| `--paper-2` | `#E8E8E4` | Panels |
| `--ink` | `#111111` | Type, rules |
| `--body` | `#2C2C2A` | Body |
| `--mute` | `#5E5E5A` | Meta |
| `--rule` | `#C4C4BE` | Hairlines |

No accent color. Selection and focus use ink/paper inversion.

## Typography

Pretendard Variable (CDN) → Apple SD Gothic Neo → Malgun Gothic.  
One unit `--u = min(1vw, 1.78vh)` drives the scale so a laptop and a TV show the same layout.  
Tokens: `--t-h1` · `--t-h2` · `--t-key` (the one sentence each slide must land) · `--t-say` · `--t-meta`. Measure ≤46rem.  
`word-break: keep-all` so Korean wraps at word boundaries.

## Imagery

`object-fit: contain` inside a frame of the same ratio. Captions below in figcaption, never over the photo as a sticker.  
Numbers and processes are drawn in HTML (timeline, bars, flow), not as screenshots, so they stay sharp and Korean renders.

## Motion

One slide crossfade (opacity + slight rise). Honor `prefers-reduced-motion`.

## Controls

Bottom chrome: prev/next (disabled at the ends), progress, speaker notes (`N`), fullscreen (`F`). In fullscreen the chrome hides after 2.5s without mouse movement. Visible `:focus-visible` rings.  
Speaker notes live in each slide's `<aside class="notes">`.
