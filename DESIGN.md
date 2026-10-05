# Design System

<!-- impeccable:design-schema 1 -->

## World

Paper and ink for explanation; a dark stage for real showcase images; one accent for "what AI produced".

## Palette

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F3F2EE` | Stage |
| `--paper-2` | `#E7E5DF` | Panels, table heads |
| `--ink` | `#151515` | Type, human steps, cover |
| `--mute` | `#67665F` | Meta |
| `--rule` | `#CFCDC5` | Hairlines |
| `--accent` | `#D9480F` | AI output, paid tier, key words |
| `--stage` | `#121212` | Showcase slides |

Rule: accent marks only what AI made or what paid unlocks. Human steps are outlined in ink.

## Typography

Pretendard Variable. One unit `--u = min(1vw, 1.78vh)` drives the scale so laptop and TV show the same layout.
Tokens `--t-h1` · `--t-h2` · `--t-key` · `--t-say` · `--t-meta` · `--t-mono`. `word-break: keep-all`.

## Imagery

Showcase images: `object-fit: contain`, no frame on the dark stage. Missing image → `.shot.is-missing` shows the written description instead.
Work scenes are HTML mockups (files, chat bubble, sheet, mail), never screenshots.

## Motion

Slide crossfade. One 5-second timed scene (`data-motion`, elements switch on at `data-at` ms) with replay. Performance bars grow on entry. All honor `prefers-reduced-motion`.

## Controls

Bottom chrome: prev/next (disabled at ends), progress, fullscreen. In fullscreen the chrome hides after 2.5s still.
