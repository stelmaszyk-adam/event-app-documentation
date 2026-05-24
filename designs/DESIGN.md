# Design System Specification: The Radiant Curator

## 1. Overview & Creative North Star
The creative North Star for this design system is **"The Radiant Curator."** 

Unlike standard event apps that rely on rigid grids and clinical lists, this system treats event discovery as a cinematic experience. It is designed to feel alive—kinetic, sophisticated, and deeply intentional. We break the "template" look by using aggressive typographic scale, asymmetrical layouts, and a "No-Line" philosophy that mimics the way light and shadow define physical objects. Every interaction should feel like flipping through a high-end digital lookbook where the UI recedes to let the energy of the events take center stage.

### Figma Foundations

- **Light Foundation:** [Figma — Light](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=2-5&t=70ljQRJQdMB3LkP3-0)
- **Dark Foundation:** [Figma — Dark](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=3-4314&t=70ljQRJQdMB3LkP3-0)

---

## 2. Colors & Tonal Foundation
This system abandons the concept of "neutral grey." To maintain a sophisticated, radiant energy, every color in the palette is infused with a violet/purple tint.

### The Core Palette
*   **Primary (`#4900cc` / `#6134e3`):** The engine of the system. Used for brand presence and high-intent actions.
*   **Secondary (`#8935b6` / `#8631b3`):** Used to signify discovery and creative exploration.
*   **Tertiary (`#880643` / `#a8275a`):** Reserved for high-energy highlights and urgent calls to action.
*   **Surface Foundation (`#fcf8ff`):** A warm, tinted white that feels more organic and premium than pure hex `#FFFFFF`.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   **Definition through Shift:** Separate sections using tonal shifts. For example, a horizontal scroll of events should sit on `surface_container_low`, while the main page background remains `surface`.
*   **Definition through Gradients:** Use soft gradients (e.g., `primary` to `primary_container`) to define the boundaries of buttons and interactive hero states.

### The "Glass & Gradient" Rule
To achieve a "Luminous" quality, use Glassmorphism for floating UI elements (like bottom navigation or filter chips).
*   **Recipe:** Use a semi-transparent version of `surface_container_lowest` (e.g., 70% opacity) combined with a `backdrop-filter: blur(20px)`. This ensures the vibrant event imagery bleeds through the UI, creating a sense of immersion.

---

## 3. Typography: Editorial Contrast
We use **Inter** not as a utility font, but as a design statement. The hierarchy relies on extreme contrast between massive display type and tight, functional metadata.

*   **Display (Large: 3.5rem / Medium: 2.75rem):** These are the "hooks." Use these for event titles and marquee headers. Tighten letter-spacing (-0.02em) to create a bold, authoritative look.
*   **Headline & Title (1.125rem – 2rem):** Used for section headers. These should feel intentional and spacious.
*   **Body (0.75rem – 1rem):** Clean, legible, and always tinted with `on_surface_variant` to ensure it never feels "stark black."
*   **Labels (0.6875rem – 0.75rem):** Used for metadata (dates, locations, price). These should often be all-caps with slight letter-spacing (+0.05em) to differentiate them from body copy.

---

## 4. Elevation & Depth
Traditional drop shadows are forbidden. We define depth through **Tonal Layering**.

### The Layering Principle
Think of the UI as layers of frosted glass stacked on paper.
1.  **Level 0 (Base):** `surface`
2.  **Level 1 (Sections):** `surface_container_low`
3.  **Level 2 (Cards):** `surface_container_lowest` (appears to "lift" because it is brighter).
4.  **Level 3 (Floating):** Glassmorphic containers with a `surface_tint` ambient glow.

### Ambient Shadows
If a floating element (like a FAB or a modal) requires a shadow for accessibility, use a **Tinted Ambient Shadow**:
*   **Color:** Use a 10% opacity version of `primary` or `on_surface`.
*   **Blur:** High (30px - 60px).
*   **Spread:** Negative (to keep it soft).

### The "Ghost Border" Fallback
If a container lacks sufficient contrast against a background, use a **Ghost Border**: `outline_variant` at 15% opacity. This provides a "suggestion" of a boundary without breaking the soft aesthetic.

---

## 5. Components

### Buttons
*   **Primary:** A kinetic gradient from `primary` (#4900cc) to `primary_container` (#6134e3). Roundedness: `full`. No border.
*   **Secondary (Glass):** Semi-transparent `surface_container_highest` with a backdrop blur. Text color is `primary`.
*   **Tertiary:** Transparent background with `primary` text. No container.

### Event Cards
*   **Style:** No borders. Use `xl` (1.5rem) corner radius. 
*   **Layout:** Image-dominant. Use a `secondary_container` gradient overlay on the bottom 30% of the image to ensure text legibility.
*   **Separation:** Use vertical whitespace (32px or 48px) instead of dividers.

### Selection Chips
*   **Unselected:** `surface_container_high` with `on_surface_variant` text.
*   **Selected:** `primary` background with `on_primary` text. Kinetic pop animation on tap.

### Input Fields
*   **Style:** `surface_container_low` fill. No bottom line.
*   **Focus State:** The fill shifts to `surface_container_highest` with a 2px `primary` "Ghost Border" (20% opacity).

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, a headline might have a larger left margin than the body text to create an editorial "ragged" look.
*   **Do** use the `tertiary` color (`#a8275a`) for small, high-impact details like "Live Now" indicators or "Selling Fast" badges.
*   **Do** allow images to bleed to the edges of the screen where possible.

### Don't
*   **Don't** use `#000000` or `#FFFFFF`. Always use the `on_surface` and `surface` tokens.
*   **Don't** use 1px dividers to separate list items. Use 16px of vertical padding and a subtle background shift between items if necessary.
*   **Don’t** use standard "Material" shadows. If it looks like a default shadow, it’s wrong.

---

## 7. Design Tokens

> These tokens are the single source of truth. They feed into `tailwind.config.ts` (web apps) and the NativeWind theme (mobile). See ARCHITECTURE.md §8 for the sharing strategy.

### 7.1 Color Tokens — Light Mode

#### Brand

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#4900cc` | Brand presence, high-intent actions, active states |
| `on_primary` | `#ffffff` | Text/icons on primary surfaces |
| `primary_container` | `#6134e3` | Gradient endpoint for primary buttons, hero backgrounds |
| `on_primary_container` | `#f0e6ff` | Text/icons on primary containers |
| `secondary` | `#8935b6` | Discovery, creative exploration, category accents |
| `on_secondary` | `#ffffff` | Text/icons on secondary surfaces |
| `secondary_container` | `#f3e5f9` | Card overlays, soft category backgrounds |
| `on_secondary_container` | `#3b1558` | Text on secondary containers |
| `tertiary` | `#a8275a` | Urgency badges ("Live Now", "Selling Fast"), highlights |
| `on_tertiary` | `#ffffff` | Text/icons on tertiary surfaces |
| `tertiary_container` | `#fce4ec` | Soft urgency backgrounds |
| `on_tertiary_container` | `#5c0a28` | Text on tertiary containers |

#### Surfaces (Violet-Tinted Neutrals)

| Token | Hex | Usage |
|---|---|---|
| `surface` | `#fcf8ff` | Page background (Level 0) |
| `surface_dim` | `#ddd6e5` | Muted backgrounds, disabled areas |
| `surface_bright` | `#fefbff` | Elevated bright surfaces |
| `surface_container_lowest` | `#ffffff` | Cards (Level 2), lifted containers |
| `surface_container_low` | `#f7f0fc` | Section backgrounds (Level 1) |
| `surface_container` | `#f1eaf7` | Default containers |
| `surface_container_high` | `#ebe4f2` | Unselected chips, subtle fills |
| `surface_container_highest` | `#e5deec` | Input focus fills, glass button fills |
| `surface_tint` | `#4900cc` | Tint reference for ambient glows (use at 6–10% opacity) |
| `on_surface` | `#1c1a22` | Primary text (never use `#000000`) |
| `on_surface_variant` | `#49454f` | Body text, secondary labels |

#### Outline

| Token | Hex | Usage |
|---|---|---|
| `outline` | `#7a757f` | High-contrast outlines (focus rings for accessibility) |
| `outline_variant` | `#cbc4d0` | Ghost borders (use at 15% opacity) |

#### Semantic / Feedback

| Token | Hex | Usage |
|---|---|---|
| `error` | `#d32f2f` | Validation errors, destructive actions |
| `on_error` | `#ffffff` | Text/icons on error surfaces |
| `error_container` | `#fce4ec` | Error background fills |
| `on_error_container` | `#5c1010` | Text on error containers |
| `success` | `#2e7d32` | Confirmations, completed states |
| `on_success` | `#ffffff` | Text/icons on success surfaces |
| `success_container` | `#e8f5e9` | Success background fills |
| `on_success_container` | `#1b4d1e` | Text on success containers |
| `warning` | `#f57c00` | Alerts, caution states |
| `on_warning` | `#ffffff` | Text/icons on warning surfaces |
| `warning_container` | `#fff3e0` | Warning background fills |
| `on_warning_container` | `#5c2e00` | Text on warning containers |
| `info` | `#6134e3` | Informational states (mirrors primary_container) |
| `on_info` | `#ffffff` | Text/icons on info surfaces |
| `info_container` | `#f0e6ff` | Info background fills |
| `on_info_container` | `#1c0066` | Text on info containers |

#### Map Pin Palette (12 Distinct, Colorblind-Safe)

| Token | Hex | Category Example |
|---|---|---|
| `map_pin_1` | `#4900cc` | Music |
| `map_pin_2` | `#a8275a` | Nightlife |
| `map_pin_3` | `#2e7d32` | Outdoor |
| `map_pin_4` | `#e65100` | Food & Drink |
| `map_pin_5` | `#0277bd` | Sports |
| `map_pin_6` | `#8935b6` | Arts & Culture |
| `map_pin_7` | `#00838f` | Workshops |
| `map_pin_8` | `#ad1457` | Festivals |
| `map_pin_9` | `#4e342e` | Markets |
| `map_pin_10` | `#37474f` | Tech & Business |
| `map_pin_11` | `#f9a825` | Family |
| `map_pin_12` | `#546e7a` | Other |

### 7.2 Color Tokens — Dark Mode

> Dark mode inverts the tonal hierarchy: surfaces become dark with violet tint, content colors brighten.

#### Brand (Dark)

| Token | Hex |
|---|---|
| `primary` | `#cfbcff` |
| `on_primary` | `#2d0080` |
| `primary_container` | `#4900cc` |
| `on_primary_container` | `#e9ddff` |
| `secondary` | `#e2b6f3` |
| `on_secondary` | `#4a1a6b` |
| `secondary_container` | `#6a2895` |
| `on_secondary_container` | `#f3e5f9` |
| `tertiary` | `#ffb2c5` |
| `on_tertiary` | `#5c0a28` |
| `tertiary_container` | `#880643` |
| `on_tertiary_container` | `#fce4ec` |

#### Surfaces (Dark)

| Token | Hex |
|---|---|
| `surface` | `#141218` |
| `surface_dim` | `#141218` |
| `surface_bright` | `#3b383e` |
| `surface_container_lowest` | `#0f0d13` |
| `surface_container_low` | `#1d1a22` |
| `surface_container` | `#211f26` |
| `surface_container_high` | `#2b2930` |
| `surface_container_highest` | `#36343b` |
| `surface_tint` | `#cfbcff` |
| `on_surface` | `#e6e1e6` |
| `on_surface_variant` | `#cbc4d0` |

#### Outline (Dark)

| Token | Hex |
|---|---|
| `outline` | `#958e99` |
| `outline_variant` | `#49454f` |

#### Semantic (Dark)

| Token | Hex |
|---|---|
| `error` | `#ffb4ab` |
| `on_error` | `#690005` |
| `error_container` | `#93000a` |
| `on_error_container` | `#ffdad6` |
| `success` | `#a5d6a7` |
| `on_success` | `#1b4d1e` |
| `success_container` | `#1b5e20` |
| `on_success_container` | `#c8e6c9` |
| `warning` | `#ffcc80` |
| `on_warning` | `#5c2e00` |
| `warning_container` | `#e65100` |
| `on_warning_container` | `#fff3e0` |

### 7.3 Typography Scale

> Font: **Inter** (variable, self-hosted via `next/font` on web, bundled on mobile).

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `display_lg` | `3.5rem` (56px) | 1.12 | 700 | `-0.02em` | Hero event titles, marquee headers |
| `display_md` | `2.75rem` (44px) | 1.14 | 700 | `-0.02em` | Secondary hero text |
| `display_sm` | `2.25rem` (36px) | 1.16 | 600 | `-0.015em` | Large section headers |
| `headline_lg` | `2rem` (32px) | 1.25 | 600 | `0` | Page titles |
| `headline_md` | `1.75rem` (28px) | 1.28 | 600 | `0` | Section titles |
| `headline_sm` | `1.5rem` (24px) | 1.33 | 600 | `0` | Sub-section titles |
| `title_lg` | `1.375rem` (22px) | 1.27 | 600 | `0` | Card titles |
| `title_md` | `1.125rem` (18px) | 1.33 | 500 | `+0.01em` | List item titles |
| `title_sm` | `1rem` (16px) | 1.375 | 500 | `+0.01em` | Compact titles |
| `body_lg` | `1rem` (16px) | 1.5 | 400 | `+0.015em` | Primary body text |
| `body_md` | `0.875rem` (14px) | 1.43 | 400 | `+0.015em` | Secondary body text |
| `body_sm` | `0.75rem` (12px) | 1.33 | 400 | `+0.02em` | Captions, tertiary text |
| `label_lg` | `0.875rem` (14px) | 1.43 | 500 | `+0.01em` | Button labels, nav items |
| `label_md` | `0.75rem` (12px) | 1.33 | 500 | `+0.05em` | Metadata (dates, locations, price) — ALL CAPS |
| `label_sm` | `0.6875rem` (11px) | 1.45 | 500 | `+0.05em` | Micro labels, badge text — ALL CAPS |

### 7.4 Spacing Scale

> 4px base unit. Use only these values — no arbitrary spacing.

| Token | Value | Tailwind Class |
|---|---|---|
| `space_0` | `0px` | `p-0` / `m-0` |
| `space_1` | `4px` | `p-1` / `m-1` |
| `space_2` | `8px` | `p-2` / `m-2` |
| `space_3` | `12px` | `p-3` / `m-3` |
| `space_4` | `16px` | `p-4` / `m-4` |
| `space_5` | `20px` | `p-5` / `m-5` |
| `space_6` | `24px` | `p-6` / `m-6` |
| `space_8` | `32px` | `p-8` / `m-8` |
| `space_10` | `40px` | `p-10` / `m-10` |
| `space_12` | `48px` | `p-12` / `m-12` |
| `space_16` | `64px` | `p-16` / `m-16` |
| `space_20` | `80px` | `p-20` / `m-20` |
| `space_24` | `96px` | `p-24` / `m-24` |

**Key spacers:**
- Card separation: `space_8` (32px) or `space_12` (48px) — never dividers.
- Section padding: `space_6` (24px) horizontal, `space_8` (32px) vertical.
- List item internal padding: `space_4` (16px).

### 7.5 Border Radius Scale

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `radius_none` | `0px` | `rounded-none` | Never used in this system |
| `radius_sm` | `0.5rem` (8px) | `rounded-lg` | Input fields, small containers |
| `radius_md` | `0.75rem` (12px) | `rounded-xl` | Chips, badges, thumbnails |
| `radius_lg` | `1rem` (16px) | `rounded-2xl` | Modals, sheets, medium cards |
| `radius_xl` | `1.5rem` (24px) | `rounded-3xl` | Event cards, hero containers |
| `radius_full` | `9999px` | `rounded-full` | Buttons, avatars, pills |

### 7.6 Elevation & Glassmorphism Tokens

#### Tinted Ambient Shadows

| Token | CSS Value | Usage |
|---|---|---|
| `shadow_none` | `none` | Default — most elements use tonal layering |
| `shadow_sm` | `0 4px 16px -2px rgba(73, 0, 204, 0.08)` | Subtle lift (FABs at rest) |
| `shadow_md` | `0 8px 30px -4px rgba(73, 0, 204, 0.10)` | Floating elements (tooltips, popovers) |
| `shadow_lg` | `0 16px 48px -8px rgba(73, 0, 204, 0.12)` | Modals, dialogs |
| `shadow_xl` | `0 24px 60px -12px rgba(73, 0, 204, 0.15)` | Full-screen overlays |

#### Glassmorphism Recipes

| Token | Property | Value |
|---|---|---|
| `glass_bg` | `background` | `surface_container_lowest` at 70% opacity |
| `glass_blur` | `backdrop-filter` | `blur(20px)` |
| `glass_border` | `border` | `1px solid outline_variant` at 10% opacity |
| `glass_bg_dark` | `background` | `surface_container` at 60% opacity (dark mode) |

**CSS recipe (light mode):**
```css
.glass {
  background: rgba(255, 255, 255, 0.70);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(203, 196, 208, 0.10);
}
```

### 7.7 Motion & Animation Tokens

| Token | Value | Usage |
|---|---|---|
| `duration_instant` | `100ms` | Micro-interactions (checkbox, toggle) |
| `duration_fast` | `200ms` | Hover states, color transitions |
| `duration_normal` | `300ms` | Layout shifts, card reveals |
| `duration_slow` | `500ms` | Page transitions, hero animations |
| `duration_cinematic` | `800ms` | Marquee entrance, splash transitions |
| `easing_standard` | `cubic-bezier(0.2, 0.0, 0, 1.0)` | General motion (Material 3 standard) |
| `easing_decelerate` | `cubic-bezier(0.0, 0.0, 0, 1.0)` | Elements entering the screen |
| `easing_accelerate` | `cubic-bezier(0.3, 0.0, 0.8, 0.15)` | Elements exiting the screen |
| `easing_pop` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Chip selection, like button, playful feedback |

**Reduced motion:** When `prefers-reduced-motion: reduce` is active, all durations collapse to `0ms` and transforms are disabled. Opacity transitions remain at `duration_fast`.

### 7.8 Breakpoints

| Token | Min Width | Target |
|---|---|---|
| `mobile` | `0px` | Mobile-first base (B2C primary) |
| `sm` | `640px` | Large phones, small tablets |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Small desktops (B2B, Admin primary) |
| `xl` | `1280px` | Standard desktops |
| `2xl` | `1536px` | Wide desktops, dashboards |

### 7.9 Icon System

| Property | Value |
|---|---|
| **Web icon set** | Lucide React (`lucide-react`) |
| **Mobile icon set** | `react-native-vector-icons` with Lucide mapping |
| **Default size** | `24px` (matches `space_6`) |
| **Size scale** | `16px` (sm), `20px` (md), `24px` (lg), `32px` (xl) |
| **Stroke width** | `1.75px` (slightly lighter than Lucide default of 2px for a refined feel) |
| **Color** | Inherits from parent text color via `currentColor` |

### 7.10 Accessibility Requirements

| Requirement | Specification |
|---|---|
| **Text contrast (normal)** | Minimum **4.5:1** against background (WCAG AA) |
| **Text contrast (large)** | Minimum **3:1** against background (WCAG AA) |
| **Interactive target size** | Minimum **44×44px** tap target (WCAG 2.5.5) |
| **Focus indicators** | `2px solid outline` token + `2px offset` — visible in both light and dark mode |
| **Reduced motion** | Respect `prefers-reduced-motion` (see §7.7) |
| **Color independence** | Never use color alone to convey meaning — pair with icons, text, or patterns |
| **Screen reader** | All interactive elements must have accessible labels |

**Verified contrast ratios (light mode):**
- `on_surface` (#1c1a22) on `surface` (#fcf8ff) → **16.8:1** ✓
- `on_surface_variant` (#49454f) on `surface` (#fcf8ff) → **7.5:1** ✓
- `on_primary` (#ffffff) on `primary` (#4900cc) → **8.2:1** ✓
- `on_tertiary` (#ffffff) on `tertiary` (#a8275a) → **5.1:1** ✓

---

## 8. Token Implementation Reference

> Quick reference for mapping tokens to Tailwind config.

```typescript
// design-tokens.ts — shared across all repos
export const colors = {
  primary: { DEFAULT: ‘#4900cc’, container: ‘#6134e3’ },
  secondary: { DEFAULT: ‘#8935b6’, container: ‘#f3e5f9’ },
  tertiary: { DEFAULT: ‘#a8275a’, container: ‘#fce4ec’ },
  surface: {
    DEFAULT: ‘#fcf8ff’,
    dim: ‘#ddd6e5’,
    bright: ‘#fefbff’,
    container: {
      lowest: ‘#ffffff’,
      low: ‘#f7f0fc’,
      DEFAULT: ‘#f1eaf7’,
      high: ‘#ebe4f2’,
      highest: ‘#e5deec’,
    },
    tint: ‘#4900cc’,
  },
  on: {
    surface: { DEFAULT: ‘#1c1a22’, variant: ‘#49454f’ },
    primary: ‘#ffffff’,
    secondary: ‘#ffffff’,
    tertiary: ‘#ffffff’,
  },
  outline: { DEFAULT: ‘#7a757f’, variant: ‘#cbc4d0’ },
  error: { DEFAULT: ‘#d32f2f’, container: ‘#fce4ec’ },
  success: { DEFAULT: ‘#2e7d32’, container: ‘#e8f5e9’ },
  warning: { DEFAULT: ‘#f57c00’, container: ‘#fff3e0’ },
  info: { DEFAULT: ‘#6134e3’, container: ‘#f0e6ff’ },
} as const;

export const borderRadius = {
  sm: ‘0.5rem’,
  md: ‘0.75rem’,
  lg: ‘1rem’,
  xl: ‘1.5rem’,
  full: ‘9999px’,
} as const;
```

---

## 9. Figma Token Architecture

> This section defines how tokens are structured in Figma using Variables, Text Styles, and Effect Styles. Follow this structure when building the Figma design file.

### 9.1 Variable Collections & Modes

Figma organizes tokens into **Collections**, each with **Modes** for theme variants.

| Collection | Modes | Purpose |
|---|---|---|
| **Primitives** | Single mode | Raw color scale — the foundational palette |
| **Colors** | Light, Dark | Semantic color aliases referencing Primitives |
| **Spacing** | Single mode | All spacing values (4px base) |
| **Radius** | Single mode | Border radius scale |
| **Numbers** | Single mode | Icon sizes, stroke widths, opacity values |

### 9.2 Primitive Color Scale

> The raw palette. Never use these directly in designs — always reference via the semantic "Colors" collection.

**Group: `purple/`**
| Variable | Hex |
|---|---|
| `purple/50` | `#f0e6ff` |
| `purple/100` | `#e0ccff` |
| `purple/200` | `#cfbcff` |
| `purple/300` | `#b399ff` |
| `purple/400` | `#8b66e6` |
| `purple/500` | `#6134e3` |
| `purple/600` | `#4900cc` |
| `purple/700` | `#3a00a3` |
| `purple/800` | `#2d0080` |
| `purple/900` | `#1c0066` |
| `purple/950` | `#0f0033` |

**Group: `magenta/`**
| Variable | Hex |
|---|---|
| `magenta/50` | `#fce4ec` |
| `magenta/100` | `#f8bbd0` |
| `magenta/200` | `#ffb2c5` |
| `magenta/300` | `#e57399` |
| `magenta/400` | `#c94a74` |
| `magenta/500` | `#a8275a` |
| `magenta/600` | `#880643` |
| `magenta/700` | `#6d0034` |
| `magenta/800` | `#5c0a28` |
| `magenta/900` | `#3e0019` |

**Group: `violet/`** (secondary)
| Variable | Hex |
|---|---|
| `violet/50` | `#f3e5f9` |
| `violet/100` | `#e2b6f3` |
| `violet/200` | `#cc8be6` |
| `violet/300` | `#b560d9` |
| `violet/400` | `#a040c8` |
| `violet/500` | `#8935b6` |
| `violet/600` | `#6a2895` |
| `violet/700` | `#4a1a6b` |
| `violet/800` | `#3b1558` |
| `violet/900` | `#250d38` |

**Group: `neutral/`** (violet-tinted)
| Variable | Hex |
|---|---|
| `neutral/0` | `#ffffff` |
| `neutral/50` | `#fcf8ff` |
| `neutral/100` | `#f7f0fc` |
| `neutral/150` | `#f1eaf7` |
| `neutral/200` | `#ebe4f2` |
| `neutral/250` | `#e5deec` |
| `neutral/300` | `#ddd6e5` |
| `neutral/400` | `#cbc4d0` |
| `neutral/500` | `#958e99` |
| `neutral/600` | `#7a757f` |
| `neutral/700` | `#49454f` |
| `neutral/800` | `#36343b` |
| `neutral/850` | `#2b2930` |
| `neutral/900` | `#211f26` |
| `neutral/920` | `#1d1a22` |
| `neutral/940` | `#1c1a22` |
| `neutral/950` | `#141218` |
| `neutral/970` | `#0f0d13` |

**Group: `red/`**
| Variable | Hex |
|---|---|
| `red/50` | `#ffdad6` |
| `red/100` | `#ffb4ab` |
| `red/200` | `#ff897a` |
| `red/500` | `#d32f2f` |
| `red/700` | `#93000a` |
| `red/900` | `#690005` |
| `red/950` | `#5c1010` |

**Group: `green/`**
| Variable | Hex |
|---|---|
| `green/50` | `#e8f5e9` |
| `green/100` | `#c8e6c9` |
| `green/200` | `#a5d6a7` |
| `green/500` | `#2e7d32` |
| `green/700` | `#1b5e20` |
| `green/900` | `#1b4d1e` |

**Group: `orange/`**
| Variable | Hex |
|---|---|
| `orange/50` | `#fff3e0` |
| `orange/100` | `#ffcc80` |
| `orange/500` | `#f57c00` |
| `orange/700` | `#e65100` |
| `orange/900` | `#5c2e00` |

### 9.3 Semantic Color Variables (with Modes)

> Collection: **Colors** — Mode 1: Light, Mode 2: Dark.
> All values are **aliases** referencing the Primitives collection.

| Variable Path | Light (alias) | Dark (alias) |
|---|---|---|
| **Brand** | | |
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
| **Surface** | | |
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
| **Outline** | | |
| `outline/default` | `{neutral/600}` | `{neutral/500}` |
| `outline/variant` | `{neutral/400}` | `{neutral/700}` |
| **Feedback** | | |
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

### 9.4 Spacing Variables

> Collection: **Spacing** — Single mode. Use `/` groups for clarity.

| Variable Path | Value |
|---|---|
| `spacing/0` | `0` |
| `spacing/1` | `4` |
| `spacing/2` | `8` |
| `spacing/3` | `12` |
| `spacing/4` | `16` |
| `spacing/5` | `20` |
| `spacing/6` | `24` |
| `spacing/8` | `32` |
| `spacing/10` | `40` |
| `spacing/12` | `48` |
| `spacing/16` | `64` |
| `spacing/20` | `80` |
| `spacing/24` | `96` |

**Variable scoping:** Apply to `Gap`, `Padding`, `Width`, `Height` (for fixed spacer frames).

### 9.5 Radius Variables

> Collection: **Radius** — Single mode.

| Variable Path | Value |
|---|---|
| `radius/none` | `0` |
| `radius/sm` | `8` |
| `radius/md` | `12` |
| `radius/lg` | `16` |
| `radius/xl` | `24` |
| `radius/full` | `9999` |

**Variable scoping:** Apply to `Corner Radius` only.

### 9.6 Number Variables

> Collection: **Numbers** — Single mode. Utility values for icons, strokes, opacity.

| Variable Path | Value | Scoping |
|---|---|---|
| `icon/sm` | `16` | Width, Height |
| `icon/md` | `20` | Width, Height |
| `icon/lg` | `24` | Width, Height |
| `icon/xl` | `32` | Width, Height |
| `stroke/thin` | `1` | Stroke weight |
| `stroke/default` | `1.75` | Stroke weight |
| `stroke/thick` | `2.5` | Stroke weight |
| `opacity/glass` | `0.70` | Opacity |
| `opacity/glass-dark` | `0.60` | Opacity |
| `opacity/ghost-border` | `0.15` | Opacity |
| `opacity/tint-glow` | `0.08` | Opacity |

### 9.7 Text Styles

> Typography is defined as **Text Styles** in Figma (not variables). Group with `/` naming.

| Style Name | Font | Weight | Size | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|---|
| `display/lg` | Inter | Bold (700) | 56 | 63 (112%) | -1.12 | None |
| `display/md` | Inter | Bold (700) | 44 | 50 (114%) | -0.88 | None |
| `display/sm` | Inter | SemiBold (600) | 36 | 42 (116%) | -0.54 | None |
| `headline/lg` | Inter | SemiBold (600) | 32 | 40 (125%) | 0 | None |
| `headline/md` | Inter | SemiBold (600) | 28 | 36 (128%) | 0 | None |
| `headline/sm` | Inter | SemiBold (600) | 24 | 32 (133%) | 0 | None |
| `title/lg` | Inter | SemiBold (600) | 22 | 28 (127%) | 0 | None |
| `title/md` | Inter | Medium (500) | 18 | 24 (133%) | +0.18 | None |
| `title/sm` | Inter | Medium (500) | 16 | 22 (137%) | +0.16 | None |
| `body/lg` | Inter | Regular (400) | 16 | 24 (150%) | +0.24 | None |
| `body/md` | Inter | Regular (400) | 14 | 20 (143%) | +0.21 | None |
| `body/sm` | Inter | Regular (400) | 12 | 16 (133%) | +0.24 | None |
| `label/lg` | Inter | Medium (500) | 14 | 20 (143%) | +0.14 | None |
| `label/md` | Inter | Medium (500) | 12 | 16 (133%) | +0.60 | Uppercase |
| `label/sm` | Inter | Medium (500) | 11 | 16 (145%) | +0.55 | Uppercase |

### 9.8 Effect Styles

> Shadows and blurs are **Effect Styles** in Figma.

| Style Name | Type | X | Y | Blur | Spread | Color |
|---|---|---|---|---|---|---|
| `elevation/sm` | Drop Shadow | 0 | 4 | 16 | -2 | `{purple/600}` @ 8% |
| `elevation/md` | Drop Shadow | 0 | 8 | 30 | -4 | `{purple/600}` @ 10% |
| `elevation/lg` | Drop Shadow | 0 | 16 | 48 | -8 | `{purple/600}` @ 12% |
| `elevation/xl` | Drop Shadow | 0 | 24 | 60 | -12 | `{purple/600}` @ 15% |
| `glass/blur` | Layer Blur | — | — | 20 | — | — |

### 9.9 Component-to-Token Mapping

> How core components bind to tokens in Figma. Apply variables directly to component properties.

#### Button / Primary

| Property | Token |
|---|---|
| Fill | `brand/primary` → `brand/primary-container` (gradient) |
| Text fill | `brand/on-primary` |
| Text style | `label/lg` |
| Corner radius | `radius/full` |
| Padding (H) | `spacing/6` |
| Padding (V) | `spacing/4` |
| Min height | 48px (accessibility target) |
| Effect | `elevation/sm` (on hover/press) |

#### Button / Secondary (Glass)

| Property | Token |
|---|---|
| Fill | `surface/container-highest` @ `opacity/glass` |
| Effect | `glass/blur` |
| Border | `outline/variant` @ `opacity/ghost-border` |
| Text fill | `brand/primary` |
| Text style | `label/lg` |
| Corner radius | `radius/full` |
| Padding (H) | `spacing/6` |
| Padding (V) | `spacing/4` |

#### Button / Tertiary

| Property | Token |
|---|---|
| Fill | None (transparent) |
| Text fill | `brand/primary` |
| Text style | `label/lg` |
| Padding (H) | `spacing/4` |
| Padding (V) | `spacing/3` |

#### Event Card

| Property | Token |
|---|---|
| Fill | `surface/container-lowest` |
| Corner radius | `radius/xl` |
| Image overlay | `brand/secondary-container` → transparent (gradient, bottom 30%) |
| Title text style | `title/lg` |
| Title text fill | `surface/on-surface` |
| Metadata text style | `label/md` |
| Metadata text fill | `surface/on-surface-variant` |
| Internal padding | `spacing/4` |
| Between cards | `spacing/8` or `spacing/12` |
| Effect | None (tonal layering only) |

#### Selection Chip

| Property | Token (Unselected) | Token (Selected) |
|---|---|---|
| Fill | `surface/container-high` | `brand/primary` |
| Text fill | `surface/on-surface-variant` | `brand/on-primary` |
| Text style | `label/lg` | `label/lg` |
| Corner radius | `radius/full` | `radius/full` |
| Padding (H) | `spacing/4` | `spacing/4` |
| Padding (V) | `spacing/2` | `spacing/2` |

#### Input Field

| Property | Token (Default) | Token (Focused) |
|---|---|---|
| Fill | `surface/container-low` | `surface/container-highest` |
| Border | None | `brand/primary` @ 20%, 2px |
| Text fill | `surface/on-surface` | `surface/on-surface` |
| Placeholder fill | `surface/on-surface-variant` | `surface/on-surface-variant` |
| Text style | `body/lg` | `body/lg` |
| Corner radius | `radius/sm` | `radius/sm` |
| Padding (H) | `spacing/4` | `spacing/4` |
| Padding (V) | `spacing/3` | `spacing/3` |

#### Bottom Navigation (Glass)

| Property | Token |
|---|---|
| Fill | `surface/container-lowest` @ `opacity/glass` |
| Effect | `glass/blur` |
| Border (top) | `outline/variant` @ `opacity/ghost-border` |
| Icon (inactive) fill | `surface/on-surface-variant` |
| Icon (active) fill | `brand/primary` |
| Label (inactive) style | `label/sm` |
| Label (active) style | `label/sm` |
| Icon size | `icon/lg` |
| Height | 64px (with `spacing/2` bottom safe area) |

### 9.10 Figma File Structure

> Recommended page organization for the Figma design file.

```
📄 Cover
📄 Foundations
    ├── Color Palette (primitive swatches)
    ├── Typography Scale (all text styles displayed)
    ├── Spacing & Grid
    ├── Radius
    ├── Elevation & Glass
    └── Icons
📄 Components
    ├── Buttons (all variants + states)
    ├── Cards (event, venue, mini)
    ├── Chips & Badges
    ├── Inputs & Forms
    ├── Navigation (bottom bar, top bar)
    ├── Overlays (modal, sheet, toast)
    └── Skeletons & Empty States
📄 Patterns
    ├── Event List
    ├── Event Detail
    ├── Map View
    ├── Search & Filter
    └── Onboarding Flow
📄 Screens — Mobile B2C
📄 Screens — Web B2C
📄 Screens — Web B2B
📄 Screens — Web Admin
```

### 9.11 Figma-to-Code Sync Workflow

| Step | Tool | Action |
|---|---|---|
| 1 | Figma Variables | Define all tokens as described above |
| 2 | Figma Token Studio (optional) | Export variables to `design-tokens.json` |
| 3 | Build script | Transform JSON → `design-tokens.ts` |
| 4 | Tailwind config | Import tokens into `tailwind.config.ts` |
| 5 | NativeWind | Same tokens feed the mobile theme |
| 6 | PR review | Compare Figma variable version against code tokens |

**Naming convention mapping:**

| Figma (slash groups) | Code (underscore) | Tailwind class |
|---|---|---|
| `brand/primary` | `primary` | `bg-primary`, `text-primary` |
| `surface/container-low` | `surface_container_low` | `bg-surface-container-low` |
| `spacing/4` | `space_4` | `p-4`, `gap-4` |
| `radius/xl` | `radius_xl` | `rounded-3xl` |
| `elevation/md` | `shadow_md` | `shadow-md` |