# Theme

White and near-black surfaces, with the original orange as the accent.

## Color tokens

Defined on `:root` in `app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | Page and section background |
| `--color-bg-soft` | `#f7f7f7` | Alternate sections, utility bar, soft panels |
| `--color-text` | `#1a1a1a` | Headings and body copy |
| `--color-text-muted` | `#6b6b6b` | Eyebrows, secondary copy, utility links |
| `--color-border` | `#e4e4e4` | Rules, field borders, outlined controls |
| `--color-overlay` | `rgba(255, 255, 255, 0.85)` | Light hero scrim so text can stay near-black |
| `--color-overlay-dark` | `rgba(0, 0, 0, 0.25)` | Faint dark scrim only where a photo needs it |
| `--color-accent` | `#ff7a00` | Buttons, marks, dots, emphasized words, focus rings |
| `--color-accent-hover` | `#e06b00` | Pressed and hovered accent fills |
| `--color-ink` | `#111111` | Footer and other large dark surfaces |

Sections alternate `--color-bg` and `--color-bg-soft`. Desktop section padding is 96px. Mobile section padding is 56px.

`--color-text` on white is well above the WCAG AA body-text ratio. `--color-text-muted` (`#6b6b6b`) on white is about 5.3:1. Dark text on `#ff7a00` is about 6.7:1, so accent fills use `--color-text`, not white. The footer stays `--color-ink` so its light type remains readable, with orange used for the top rule, logo bars, and link hovers.

## Type

Loaded in `app/layout.tsx` with `next/font/google` and exposed as `--font-fira` and `--font-roboto`.

- Headings: Fira Sans, weight 700, tight line-height, `--color-text`.
- Body: Roboto, weight 400, `--color-text`.
- Nav links: Roboto, weight 500, uppercase.
- Buttons: Roboto, weight 600, uppercase, letter-spacing 0.5px. Roboto has no 600 file (400, 500, 700), so the browser uses the 700 cut for that weight. Nav stays at 500.

## Buttons

Shared shape: uppercase, weight 600, padding `12px 24px`, radius `3px`, letter-spacing `0.5px`. Background, text, and border transition over `0.3s ease`.

| Class | Rest | Hover |
| --- | --- | --- |
| `.btn .btn-primary` | Orange fill, dark text | Fill deepens to `--color-accent-hover` |
| `.btn .btn-outline` | Transparent, 1px `--color-text` border | Fills orange, text stays dark |
| `.btn .btn-outline-white` | Transparent, 1px white border, white text | Fills orange, text turns dark |

Use `.btn-outline-white` only over photographs. On the light hero overlay, use `.btn-primary`.

Emphasized words inside `h2` elements take the accent. Logo bars use the accent on both the light header and the dark footer.

Focus is a 2px orange outline with a 3px offset.
