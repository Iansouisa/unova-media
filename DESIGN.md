# UnovaMedia — Design System

Full reference for design decisions, tokens, components, and rules used across the site.

---

## 1. Color Palette

All colors are defined as CSS custom properties on `:root`.

### Dark Theme (Primary)

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-bg-dark` | `#231F20` | Page background, card backgrounds on light sections |
| `--color-bg-card` | `#2C2829` | Elevated card / section backgrounds |
| `--color-border` | `#3A3536` | All dividers, card borders in dark mode |
| `--color-text` | `#F5F3F4` | Primary body text in dark mode |
| `--color-accent` | `#D5D9E5` | Muted secondary text, decorative elements |
| `--color-accent-faded` | `rgba(213,217,229, 0.4)` | Inactive states (e.g. FAQ chevron) |
| `--color-accent-active` | `rgba(213,217,229, 0.8)` | Active/hover states |
| `--color-accent-glow` | `rgba(213,217,229, 0.10)` | Subtle glow tints |
| `--color-surface-subtle` | `rgba(213,217,229, 0.063)` | Very faint surface fills |

### Primary / CTA

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-primary` | `#2979FF` | Buttons, links, calendar events, icons |

### Accent Palette (Tags, Decorations)

These pastels are used on tag pills, decorative dashes, and accent moments. Each pairs with a specific dark foreground.

| Token | Hex | Paired foreground |
|---|---|---|
| `--color-cyan` | `#CCFAF4` | `#1a3d38` |
| `--color-lavender` | `#CCCEF8` | `--color-deep-purple` (`#1A1A4D`) |
| `--color-green` | `#CCF8CB` | `#1a3d1a` |
| `--color-cream` | `#E2DDD5` | `--color-bg-dark` |
| `--color-pink` | `#FFCBEF` | `--color-pink-text` (`#4D1A3D`) |

### Supporting

| Token | Hex | Usage |
|---|---|---|
| `--color-deep-purple` | `#1A1A4D` | Text on lavender backgrounds |
| `--color-pink-text` | `#4D1A3D` | Text on pink tag pills |
| `--color-gold` | `#F5A623` | Star ratings |
| `--color-muted-purple` | `#5A4A8A` | Stars on lavender review cards |
| `--color-bg-dark-dim` | `rgba(35,31,32, 0.35)` | Dimmed calendar dates |

---

## 2. Typography

### Fonts

| Role | Family | Weights |
|---|---|---|
| Body / UI | Inter | 300, 400, 500, 600, 700, 800 |
| Headings / Logo | Instrument Serif | Regular, Italic |

### Type Scale

| Element | Size | Line height | Letter spacing |
|---|---|---|---|
| `h1` | `clamp(48px, 8vw, 96px)` | `1.05` | `-0.02em` |
| `h2` | `clamp(36px, 6vw, 72px)` | `1.08` | `-0.02em` |
| `h2` (mobile <640px) | `40px` fixed | — | — |
| `h3` (process cards) | `24px` / `text-2xl` | `snug` | — |
| Body large | `18px` / `text-lg` | `relaxed` | — |
| Body small | `14px` / `text-sm` | `relaxed` | — |
| Labels / overlines | `12px` / `text-xs` | — | `widest` (`0.1em`) |
| Micro | `10px` / `text-[10px]` | — | — |

### Logo

```
<span font-family="Instrument Serif">
  <strong>Unova</strong>Media
</span>
```

Bold for "Unova", regular weight for "Media".

---

## 3. Spacing & Layout

### Container

Max width: `1200px`, centered with `mx-auto`, horizontal padding `px-6` (24px).

### Section Padding

- Standard: `py-28` (112px top/bottom)
- Mobile (<640px): overridden to `py-16` (64px) via `section { padding-top/bottom: 4rem }`

### Grid

- Two-column: `grid-cols-1 md:grid-cols-2 gap-10 md:gap-20`
- Process cards: `grid-cols-1 md:grid-cols-2 gap-5`
- Reviews: `flex-col md:flex-row gap-4`

### Rounded corners

- Cards / sections: `rounded-2xl` (16px)
- Section pill containers (process, reviews): `rounded-4xl` (32px) with `mx-4 md:mx-8`
- Tag pills: `rounded-md` (6px)
- Buttons: `rounded` via `border-radius: 12px` in `.btn-primary`
- Badge pills: `rounded-full`

---

## 4. Components

### 4.1 Primary CTA Button (`.btn-primary`)

```css
background: radial-gradient(120% 120% at 15% 20%, #7eb3ff 0%, #2979ff 45%, #1a5fd4 100%);
border: 1px solid rgba(255,255,255, 0.35);
border-radius: 12px;
box-shadow:
  0 4px 24px rgba(41,121,255, 0.35),
  inset -1px -1px 3px #1a5fd4,
  inset 1px 1px 4px rgba(255,255,255, 0.35);
```

Hover: lifts `translateY(-2px)`, brightens gradient, increases glow shadow.

Always paired with an arrow icon in a `w-6 h-6 rounded-full bg-white/20` circle.

### 4.2 Hero Badge Pill

```
bg: rgba(253,253,214, 0.12)
border: 1px solid rgba(253,253,214, 0.3)
color: --color-cream
```

`inline-flex`, `rounded-full`, `px-4 py-1.5`, `text-xs font-medium`.

### 4.3 Dark Card (process / reviews)

```
bg: --color-bg-dark
border: --color-border
border-radius: rounded-2xl
padding: p-8 (md:p-10 for reviews)
```

### 4.4 Glass Card (`.glass-card`)

Used on the guarantee calendar widget and "Who it's for" criteria cards.

```css
background: radial-gradient(120% 120% at 10% 15%,
  rgba(255,255,255,0.88) 0%,
  rgba(255,255,255,0.6) 35%,
  rgba(255,255,255,0.3) 70%,
  rgba(255,255,255,0.12) 100%
);
backdrop-filter: blur(12px) saturate(1.2);
border: 1px solid rgba(255,255,255,0.6);
box-shadow: layered drop shadows + white inner glow;
```

Only used on light (`--color-cream`) background sections.

### 4.5 Section Card with Gradient Background (process / reviews sections)

```
bg: bg-linear-to-b from-(--color-bg-card) to-transparent
rounded-4xl mx-4 md:mx-8
```

Creates a floating pill-shaped section visually distinct from the plain dark background.

### 4.6 Tag Pills (inside cards)

```
display: inline-block
font-size: text-xs
font-weight: font-semibold
padding: px-3 py-1
border-radius: rounded-md
```

Background and text color are always a pastel/dark pair from the accent palette. One unique color per card to differentiate steps or categories.

| Section | Color used |
|---|---|
| Week 1 | Cyan |
| Week 2 | Lavender |
| Weeks 3–4 | Green |
| Ongoing | White/35% on lavender |
| Stage | Pink |
| Product | Lavender |
| Sales | Cyan |
| Deal size | Green |

### 4.7 Overline Labels (`.overline-label`)

Uppercase tracking-widest `text-xs font-medium` labels above every section heading. Automatically wrap content in `[ ]` brackets via CSS `::before` / `::after` pseudo-elements.

```css
.overline-label::before { content: "[ "; }
.overline-label::after  { content: " ]"; }
```

Color: `text-(--color-accent)/60` on dark sections, `text-(--color-bg-dark)/50` on light sections.

### 4.8 Problem Section Dash List

Dashes styled in accent colors (`--color-pink`, `--color-cyan`, `--color-cream`), one per bullet. Items separated by `border-t border-(--color-border)` dividers, `py-8` each.

### 4.9 FAQ Accordion (`.faq-item`)

Built with native `<details>/<summary>`. Chevron SVG rotates 180° when open. Answer div transitions `max-height 0 → 300px` and `opacity 0 → 1`. Each chevron uses a different accent color (pink, cyan, cream, green, lavender cycling through questions).

### 4.10 Review Cards

Two variants:
- **Dark variant**: `--color-bg-dark` bg, `--color-border` border, gold stars, cyan quote mark `"`
- **Lavender variant**: `--color-lavender` bg, `#ababd8` border, muted-purple stars, muted-purple quote mark

Both share: `rounded-2xl`, quote mark at `text-6xl font-bold`, name/company in small text at bottom.

---

## 5. Texture & Visual Effects

### Grid Background (`.grid-bg`)

Faint 1px grid lines at `rgba(213,217,229,0.04)`. Overlaid with SVG fractal noise at 5% opacity for subtle grain.

### Grain Overlay (`.grain`)

SVG fractal noise `background-image` tiled at `300px × 300px`, 8% opacity. Applied via `::after` pseudo-element so it doesn't interfere with content.

### Animated Blob (`.hero-blob`)

700×700px radial gradient circle (`rgba(41,121,255,0.14)` → `rgba(213,217,229,0.12)` → transparent), `blur(80px)`. Drifts with `blobDrift` keyframe animation over 10s infinite.

### Cursor-Following Glow (`.hero-glow`)

500×500px radial gradient, `rgba(41,121,255,0.12)` center. Follows cursor position, fades in on `active` class. `opacity: 0` by default.

### Hero Section Glow Orb (guarantee section)

Static `aria-hidden` div: 520×520px radial gradient, `blur(32px)`, positioned absolute right-center behind the calendar widget.

---

## 6. Animation

### Hero Entrance (`.hero-line`)

Each hero element starts `opacity:0; translateY(40px)` and animates to visible via `heroReveal` keyframe.

```
Easing: cubic-bezier(0.16, 1, 0.3, 1)  /* spring-like */
Duration: 0.9s
```

Staggered delays:
- `.hero-line-1` — 0.05s (badge)
- `.hero-line-2` — 0.2s (h1 line 1)
- `.hero-line-3` — 0.4s (h1 line 2)
- `.hero-line-4` — 0.6s (subheadline)
- `.hero-line-5` — 0.75s (CTA)

### Scroll Reveal (`.reveal`)

```css
opacity: 0;
transform: translateY(30px);
transition: opacity 0.7s ease, transform 0.7s ease;
```

Becomes visible (`.visible` class added by JS IntersectionObserver). Stagger delays `.reveal-delay-1` through `.reveal-delay-4` add 0.1s–0.4s.

### Hero Fan Cards

3D perspective transforms for card fan layout:

```
.hero-card-left-2:  rotateY(25deg) rotateZ(-5deg) translateX(-20px) translateY(40px) scale(0.85)
.hero-card-left-1:  rotateY(15deg) rotateZ(-2deg) translateX(-10px) translateY(20px) scale(0.92)
.hero-card-center:  rotateY(0deg) scale(1)  ← z-index: 10
.hero-card-right-1: rotateY(-15deg) rotateZ(2deg) translateX(10px) translateY(20px) scale(0.92)
.hero-card-right-2: rotateY(-25deg) rotateZ(5deg) translateX(20px) translateY(40px) scale(0.85)
```

Perspective: `1000px` on all.

---

## 7. Light / Dark Section Rhythm

The page alternates between dark and cream/light sections to create visual rhythm:

| Section | Background |
|---|---|
| Header | Transparent / absolute overlay |
| Hero | `--color-bg-dark` |
| The Problem | `--color-bg-dark` |
| What to Expect | `--color-bg-card` gradient pill |
| The Guarantee | `--color-cream` |
| Who It's For | `--color-cream` |
| Why Us | `--color-bg-dark` |
| Reviews | `--color-bg-card` gradient pill |
| FAQ | `--color-bg-dark` |
| Contact | (follows dark) |
| Footer | (follows dark) |

On cream sections: all text shifts to `--color-bg-dark` (and opacity variants). On dark sections: text is `--color-text` (`#F5F3F4`) and `white/60`, `white/70` opacity variants.

---

## 8. Icons

Font Awesome 6.4.0 (CDN). Usage:
- `fa-solid fa-arrow-right` — CTA button arrow
- `fa-solid fa-star` — Review star ratings

---

## 9. Responsive Breakpoints

Tailwind defaults (`md` = 768px, `sm` = 640px). Key adaptations:

- Headings: fluid clamp sizing, `h2` hard-capped at `40px` on mobile
- Sections: `py-28` → `py-16` (4rem) on `<640px`
- Grids: all switch to single-column on mobile
- Reviews: `flex-col` on mobile, `flex-row` on `md+`
- Calendar / guarantee: column order swapped on mobile (`order-2 md:order-1`)

---

## 10. Design Principles

1. **Dark-first with intentional light breaks.** The default palette is near-black (`#231F20`). Cream sections act as visual pauses, not the norm.
2. **Typography does the heavy lifting.** Large Instrument Serif headings with tight tracking (`-0.02em`) at fluid sizes. Copy-to-hero ratio is high — headings are the design.
3. **Pastels as accents only.** Cyan, lavender, green, pink, cream appear on tags and decorative elements — never as dominant backgrounds in dark sections.
4. **Depth through shadow and blur, not flat color.** Glass cards, button inner glows, and blob effects create perceived depth without gradients fighting each other.
5. **Motion is purposeful.** Entrance animations on hero (spring easing, staggered) and subtle scroll reveals. No looping animations except the hero blob.
6. **Consistency in section structure.** Every section follows: overline label → heading → supporting content. No section breaks this pattern.
7. **Restraint on border-radius.** Cards are `rounded-2xl`. Section wrappers are `rounded-4xl`. Buttons are `12px`. Pills are `rounded-full`. Nothing in between.
