# Design System

<!-- impeccable:design-schema 1 -->

## World

Living-room lamp light on cool paper. Monochrome charcoal on `#F5F5F3`. Images sit in hairline frames at **natural aspect ratio** (contain + letterbox), never cropped to fill.

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
Display ~clamp 2.2–3.4rem. Body ~clamp 1.1–1.4rem. Measure ≤38rem.

## Imagery

`object-fit: contain`; frames letterbox with `--paper-2`. Captions below or in figcaption, never over the photo as a sticker.

## Motion

One slide crossfade (opacity + slight rise). Honor `prefers-reduced-motion`.

## Controls

Bottom chrome: prev/next, progress, fullscreen. Visible `:focus-visible` rings.
