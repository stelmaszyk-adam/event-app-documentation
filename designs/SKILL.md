# Figma Design System Skill — The Radiant Curator

> Instructions for building and maintaining the EventApp design system in Figma. Use this as the authoritative reference when executing `figma-use`, `figma-generate-library`, or `figma-generate-design` skills.

---

## 1. Design Philosophy

- **Creative North Star:** "The Radiant Curator" — cinematic, kinetic, sophisticated event discovery
- **No-Line Rule:** Never use 1px borders for sectioning. Separate with tonal shifts or gradients.
- **Glass & Gradient Rule:** Floating UI uses glassmorphism (70% opacity + 20px backdrop blur)
- **No pure black/white:** Always use violet-tinted neutrals (`on_surface` / `surface` tokens)
- **No standard shadows:** Use tinted ambient shadows with `#4900cc` at low opacity
- **Editorial typography:** Extreme contrast between massive display type and tight metadata

---

## 2. Variable Collections Setup

Create these 5 collections in Figma Variables:

### Collection: Primitives (Single Mode)

Raw color palette. Group with `/` separator.

| Group | Variables |
|---|---|
| `purple/` | 50: `#f0e6ff`, 100: `#e0ccff`, 200: `#cfbcff`, 300: `#b399ff`, 400: `#8b66e6`, 500: `#6134e3`, 600: `#4900cc`, 700: `#3a00a3`, 800: `#2d0080`, 900: `#1c0066`, 950: `#0f0033` |
| `magenta/` | 50: `#fce4ec`, 100: `#f8bbd0`, 200: `#ffb2c5`, 300: `#e57399`, 400: `#c94a74`, 500: `#a8275a`, 600: `#880643`, 700: `#6d0034`, 800: `#5c0a28`, 900: `#3e0019` |
| `violet/` | 50: `#f3e5f9`, 100: `#e2b6f3`, 200: `#cc8be6`, 300: `#b560d9`, 400: `#a040c8`, 500: `#8935b6`, 600: `#6a2895`, 700: `#4a1a6b`, 800: `#3b1558`, 900: `#250d38` |
| `neutral/` | 0: `#ffffff`, 50: `#fcf8ff`, 100: `#f7f0fc`, 150: `#f1eaf7`, 200: `#ebe4f2`, 250: `#e5deec`, 300: `#ddd6e5`, 400: `#cbc4d0`, 500: `#958e99`, 600: `#7a757f`, 700: `#49454f`, 800: `#36343b`, 850: `#2b2930`, 900: `#211f26`, 920: `#1d1a22`, 940: `#1c1a22`, 950: `#141218`, 970: `#0f0d13` |
| `red/` | 50: `#ffdad6`, 100: `#ffb4ab`, 200: `#ff897a`, 500: `#d32f2f`, 700: `#93000a`, 900: `#690005`, 950: `#5c1010` |
| `green/` | 50: `#e8f5e9`, 100: `#c8e6c9`, 200: `#a5d6a7`, 500: `#2e7d32`, 700: `#1b5e20`, 900: `#1b4d1e` |
| `orange/` | 50: `#fff3e0`, 100: `#ffcc80`, 500: `#f57c00`, 700: `#e65100`, 900: `#5c2e00` |

### Collection: Colors (2 Modes: Light, Dark)

All values are **aliases** to Primitives. Use variable references, not raw hex.

#### Brand Group (`brand/`)

| Variable | Light | Dark |
|---|---|---|
| `brand/primary` | `{purple/600}` | `{purple/200}` |
| `brand/on-primary` | `{neutral/0}` | `{purple/800}` |
| `brand/primary-container` | `{purple/500}` | `{purple/600}` |
| `brand/on-primary-container` | `{purple/50}` | `{purple/50}` |
| `brand/secondary` | `{violet/500}` | `{violet/100}` |
| `brand/on-secondary` | `{neutral/0}` | `{violet/700}` |
| `brand/secondary-container` | `{violet/50}` | `{violet/600}` |
| `brand/on-secondary-container` | `{violet/800}` | `{violet/50}` |
| `brand/tertiary` | `{magenta/500}` | `{magenta/200}` |
| `brand/on-tertiary` | `{neutral/0}` | `{magenta/800}` |
| `brand/tertiary-container` | `{magenta/50}` | `{magenta/600}` |
| `brand/on-tertiary-container` | `{magenta/800}` | `{magenta/50}` |

#### Surface Group (`surface/`)

| Variable | Light | Dark |
|---|---|---|
| `surface/default` | `{neutral/50}` | `{neutral/950}` |
| `surface/dim` | `{neutral/300}` | `{neutral/950}` |
| `surface/bright` | `{neutral/0}` | `{neutral/800}` |
| `surface/container-lowest` | `{neutral/0}` | `{neutral/970}` |
| `surface/container-low` | `{neutral/100}` | `{neutral/920}` |
| `surface/container` | `{neutral/150}` | `{neutral/900}` |
| `surface/container-high` | `{neutral/200}` | `{neutral/850}` |
| `surface/container-highest` | `{neutral/250}` | `{neutral/800}` |
| `surface/tint` | `{purple/600}` | `{purple/200}` |
| `surface/on-surface` | `{neutral/940}` | `{neutral/250}` |
| `surface/on-surface-variant` | `{neutral/700}` | `{neutral/400}` |

#### Outline Group (`outline/`)

| Variable | Light | Dark |
|---|---|---|
| `outline/default` | `{neutral/600}` | `{neutral/500}` |
| `outline/variant` | `{neutral/400}` | `{neutral/700}` |

#### Feedback Group (`feedback/`)

| Variable | Light | Dark |
|---|---|---|
| `feedback/error` | `{red/500}` | `{red/100}` |
| `feedback/on-error` | `{neutral/0}` | `{red/900}` |
| `feedback/error-container` | `{red/50}` | `{red/700}` |
| `feedback/on-error-container` | `{red/950}` | `{red/50}` |
| `feedback/success` | `{green/500}` | `{green/200}` |
| `feedback/on-success` | `{neutral/0}` | `{green/900}` |
| `feedback/success-container` | `{green/50}` | `{green/700}` |
| `feedback/on-success-container` | `{green/900}` | `{green/100}` |
| `feedback/warning` | `{orange/500}` | `{orange/100}` |
| `feedback/on-warning` | `{neutral/0}` | `{orange/900}` |
| `feedback/warning-container` | `{orange/50}` | `{orange/700}` |
| `feedback/on-warning-container` | `{orange/900}` | `{orange/50}` |

### Collection: Spacing (Single Mode)

Scope: Gap, Padding, Width, Height.

| Variable | Value (px) |
|---|---|
| `spacing/0` | 0 |
| `spacing/1` | 4 |
| `spacing/2` | 8 |
| `spacing/3` | 12 |
| `spacing/4` | 16 |
| `spacing/5` | 20 |
| `spacing/6` | 24 |
| `spacing/8` | 32 |
| `spacing/10` | 40 |
| `spacing/12` | 48 |
| `spacing/16` | 64 |
| `spacing/20` | 80 |
| `spacing/24` | 96 |

### Collection: Radius (Single Mode)

Scope: Corner Radius only.

| Variable | Value (px) |
|---|---|
| `radius/none` | 0 |
| `radius/sm` | 8 |
| `radius/md` | 12 |
| `radius/lg` | 16 |
| `radius/xl` | 24 |
| `radius/full` | 9999 |

### Collection: Numbers (Single Mode)

| Variable | Value | Scoping |
|---|---|---|
| `icon/sm` | 16 | Width, Height |
| `icon/md` | 20 | Width, Height |
| `icon/lg` | 24 | Width, Height |
| `icon/xl` | 32 | Width, Height |
| `stroke/thin` | 1 | Stroke weight |
| `stroke/default` | 1.75 | Stroke weight |
| `stroke/thick` | 2.5 | Stroke weight |
| `opacity/glass` | 0.70 | Opacity |
| `opacity/glass-dark` | 0.60 | Opacity |
| `opacity/ghost-border` | 0.15 | Opacity |
| `opacity/tint-glow` | 0.08 | Opacity |

---

## 3. Text Styles

Font: **Inter** (must be available in the Figma file). Create grouped text styles with `/` naming.

| Style Name | Weight | Size | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|
| `display/lg` | Bold (700) | 56 | 63 (112%) | -1.12 | None |
| `display/md` | Bold (700) | 44 | 50 (114%) | -0.88 | None |
| `display/sm` | SemiBold (600) | 36 | 42 (116%) | -0.54 | None |
| `headline/lg` | SemiBold (600) | 32 | 40 (125%) | 0 | None |
| `headline/md` | SemiBold (600) | 28 | 36 (128%) | 0 | None |
| `headline/sm` | SemiBold (600) | 24 | 32 (133%) | 0 | None |
| `title/lg` | SemiBold (600) | 22 | 28 (127%) | 0 | None |
| `title/md` | Medium (500) | 18 | 24 (133%) | +0.18 | None |
| `title/sm` | Medium (500) | 16 | 22 (137%) | +0.16 | None |
| `body/lg` | Regular (400) | 16 | 24 (150%) | +0.24 | None |
| `body/md` | Regular (400) | 14 | 20 (143%) | +0.21 | None |
| `body/sm` | Regular (400) | 12 | 16 (133%) | +0.24 | None |
| `label/lg` | Medium (500) | 14 | 20 (143%) | +0.14 | None |
| `label/md` | Medium (500) | 12 | 16 (133%) | +0.60 | Uppercase |
| `label/sm` | Medium (500) | 11 | 16 (145%) | +0.55 | Uppercase |

---

## 4. Effect Styles

| Style Name | Type | X | Y | Blur | Spread | Color |
|---|---|---|---|---|---|---|
| `elevation/sm` | Drop Shadow | 0 | 4 | 16 | -2 | `#4900cc` @ 8% |
| `elevation/md` | Drop Shadow | 0 | 8 | 30 | -4 | `#4900cc` @ 10% |
| `elevation/lg` | Drop Shadow | 0 | 16 | 48 | -8 | `#4900cc` @ 12% |
| `elevation/xl` | Drop Shadow | 0 | 24 | 60 | -12 | `#4900cc` @ 15% |
| `glass/blur` | Layer Blur | - | - | 20 | - | - |

---

## 5. Component Specifications

### Button / Primary

| Property | Token/Value |
|---|---|
| Fill | Gradient: `brand/primary` to `brand/primary-container` |
| Text fill | `brand/on-primary` |
| Text style | `label/lg` |
| Corner radius | `radius/full` |
| Padding H | `spacing/6` (24px) |
| Padding V | `spacing/4` (16px) |
| Min height | 48px |
| Effect (hover) | `elevation/sm` |
| Border | None |

### Button / Secondary (Glass)

| Property | Token/Value |
|---|---|
| Fill | `surface/container-highest` @ `opacity/glass` |
| Effect | `glass/blur` |
| Border | `outline/variant` @ `opacity/ghost-border` |
| Text fill | `brand/primary` |
| Text style | `label/lg` |
| Corner radius | `radius/full` |
| Padding H | `spacing/6` |
| Padding V | `spacing/4` |

### Button / Tertiary

| Property | Token/Value |
|---|---|
| Fill | None (transparent) |
| Text fill | `brand/primary` |
| Text style | `label/lg` |
| Padding H | `spacing/4` |
| Padding V | `spacing/3` |

### Event Card

| Property | Token/Value |
|---|---|
| Fill | `surface/container-lowest` |
| Corner radius | `radius/xl` (24px) |
| Image overlay | Gradient: `brand/secondary-container` to transparent (bottom 30%) |
| Title style | `title/lg` |
| Title fill | `surface/on-surface` |
| Metadata style | `label/md` |
| Metadata fill | `surface/on-surface-variant` |
| Internal padding | `spacing/4` |
| Card separation | `spacing/8` or `spacing/12` |
| Effect | None (tonal layering only) |
| Border | None |

### Selection Chip

| Property | Unselected | Selected |
|---|---|---|
| Fill | `surface/container-high` | `brand/primary` |
| Text fill | `surface/on-surface-variant` | `brand/on-primary` |
| Text style | `label/lg` | `label/lg` |
| Corner radius | `radius/full` | `radius/full` |
| Padding H | `spacing/4` | `spacing/4` |
| Padding V | `spacing/2` | `spacing/2` |

### Input Field

| Property | Default | Focused |
|---|---|---|
| Fill | `surface/container-low` | `surface/container-highest` |
| Border | None | `brand/primary` @ 20%, 2px |
| Text fill | `surface/on-surface` | `surface/on-surface` |
| Placeholder fill | `surface/on-surface-variant` | `surface/on-surface-variant` |
| Text style | `body/lg` | `body/lg` |
| Corner radius | `radius/sm` | `radius/sm` |
| Padding H | `spacing/4` | `spacing/4` |
| Padding V | `spacing/3` | `spacing/3` |

### Bottom Navigation (Glass)

| Property | Token/Value |
|---|---|
| Fill | `surface/container-lowest` @ `opacity/glass` |
| Effect | `glass/blur` |
| Border (top) | `outline/variant` @ `opacity/ghost-border` |
| Icon inactive fill | `surface/on-surface-variant` |
| Icon active fill | `brand/primary` |
| Label style | `label/sm` |
| Icon size | `icon/lg` (24px) |
| Height | 64px + `spacing/2` bottom safe area |

---

## 6. Figma File Structure

Organize the file with these pages:

```
Cover
Foundations
  - Color Palette (primitive swatches)
  - Typography Scale (all text styles displayed)
  - Spacing & Grid
  - Radius
  - Elevation & Glass
  - Icons
Components
  - Buttons (all variants + states)
  - Cards (event, venue, mini)
  - Chips & Badges
  - Inputs & Forms
  - Navigation (bottom bar, top bar)
  - Overlays (modal, sheet, toast)
  - Skeletons & Empty States
Patterns
  - Event List
  - Event Detail
  - Map View
  - Search & Filter
  - Onboarding Flow
Screens - Mobile B2C
Screens - Web B2C
Screens - Web B2B
Screens - Web Admin
```

---

## 7. Critical Rules for Figma Implementation

1. **Always bind variables** — never use raw hex values in components. Every fill, stroke, radius, and spacing must reference a variable.
2. **Use auto-layout everywhere** — no fixed positioning except for absolute overlays.
3. **Tonal layering for depth** — Level 0: `surface/default`, Level 1: `surface/container-low`, Level 2: `surface/container-lowest`, Level 3: Glass.
4. **No 1px borders** — use tonal shifts between adjacent surfaces or ghost borders (`outline/variant` at 15% opacity).
5. **Card separation** — always use `spacing/8` (32px) or `spacing/12` (48px) between cards. Never use divider lines.
6. **Gradients for primary buttons** — linear gradient from `brand/primary` to `brand/primary-container`.
7. **Dark mode** — switch the Colors collection mode; all components auto-adapt via variable aliases.
8. **Min tap target** — all interactive elements must be at least 44x44px.
9. **Label tokens are uppercase** — `label/md` and `label/sm` text styles use uppercase transform.
10. **Icon stroke** — 1.75px (lighter than default Lucide 2px) for refined aesthetic.

---

## 8. Breakpoints for Responsive Frames

| Name | Width | Target |
|---|---|---|
| Mobile | 390px | iPhone 15 / B2C primary |
| Tablet | 768px | iPad |
| Desktop | 1280px | B2B / Admin primary |
| Wide | 1536px | Dashboard layouts |

---

## 9. Map Pin Colors (12 Categories)

For map-related screens, use these distinct category colors:

| Pin | Hex | Category |
|---|---|---|
| 1 | `#4900cc` | Music |
| 2 | `#a8275a` | Nightlife |
| 3 | `#2e7d32` | Outdoor |
| 4 | `#e65100` | Food & Drink |
| 5 | `#0277bd` | Sports |
| 6 | `#8935b6` | Arts & Culture |
| 7 | `#00838f` | Workshops |
| 8 | `#ad1457` | Festivals |
| 9 | `#4e342e` | Markets |
| 10 | `#37474f` | Tech & Business |
| 11 | `#f9a825` | Family |
| 12 | `#546e7a` | Other |

---

## 10. Naming Convention Mapping

| Figma (slash groups) | Code (underscore) | Tailwind class |
|---|---|---|
| `brand/primary` | `primary` | `bg-primary`, `text-primary` |
| `surface/container-low` | `surface_container_low` | `bg-surface-container-low` |
| `spacing/4` | `space_4` | `p-4`, `gap-4` |
| `radius/xl` | `radius_xl` | `rounded-3xl` |
| `elevation/md` | `shadow_md` | `shadow-md` |
