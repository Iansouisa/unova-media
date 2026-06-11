# UnovaMedia — Design System

Full reference for design decisions, tokens, components, and rules used across the site.

---

## 1. Color Palette

All colors are defined as Tailwind `@theme` tokens in `src/style.css`.

### Base

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-bgdark` | `#231f20` | Dark section text, light-section text |
| `--color-bgcard` | `#ffffff` | Card backgrounds |
| `--color-bordr` | `#e0d9d2` | All borders and dividers |
| `--color-textc` | `#1c1a1b` | Default body text |
| `--color-accent` | `#6b6470` | Muted secondary text |
| `--color-primary` | `#2979ff` | Buttons, links, dot indicator |

Page background (body): `#faf8f5` (warm off-white, set in `body` — not a theme token).

### Accent Palette (Tags, Dash Accents)

| Token | Hex | Paired foreground |
|---|---|---|
| `--color-cyan2` | `#aaf5ee` | `--color-deeppurple` |
| `--color-lavender` | `#cccef8` | `--color-deeppurple` |
| `--color-greenp` | `#ccf8cb` | `--color-deeppurple` |
| `--color-cream` | `#e2ddd5` | `--color-bgdark` |
| `--color-pink2` | `#ffcbef` | `--color-pinktxt` |

### Supporting

| Token | Hex | Usage |
|---|---|---|
| `--color-deeppurple` | `#1a1a4d` | Text on lavender/cyan/green tags |
| `--color-pinktxt` | `#4d1a3d` | Text on pink tags |

Star ratings use `#f5a623` (inline, not a theme token). Dark sections use `#272324` as the background (inline on `.dark-section`, not a token).

---

## 2. Typography

### Fonts

| Role | Family | Weights |
|---|---|---|
| Body / UI | Inter | 300, 400, 500, 600, 700, 800 |
| Headings / Logo / Quotes | Instrument Serif | Regular, Italic |

### Type Scale

| Element | Size | Line height | Notes |
|---|---|---|---|
| `h1` | `clamp(48px, 8vw, 96px)` | `1.05` | tracking-tight, font-normal |
| `h2` | `clamp(36px, 6vw, 72px)` | `1.08` | tracking-tight, font-normal |
| `h2` (mobile ≤640px) | `40px` fixed | — | — |
| `h3` | `text-2xl` | `leading-snug` | font-normal |
| Body | `text-lg` (`18px`) | `1.55` | font-sans |
| Process card body | `text-[15px]` | `leading-relaxed` | muted `rgba(35,31,32,0.65)` |
| Labels / overlines | `text-xs` (`12px`) | — | uppercase, `letter-spacing: 0.1em` |
| Tag pills | `text-[11px]` | — | uppercase, `letter-spacing: 0.08em` |

`h1 em` and `h2 em` are italic (used for colored inline emphasis in the hero).

### Logo

```
<a class="font-serif text-[22px] -tracking-[0.01em]">
  <strong class="font-bold">Unova</strong>Media
</a>
```

Bold for "Unova", regular weight for "Media", Instrument Serif.

---

## 3. Spacing & Layout

### Container

`.container-x`: `max-w-[1200px] mx-auto px-6 relative z-[2]`

### Section Padding

`.section-y`: `py-28` (112px). Mobile (≤640px): `py-16` (64px).

### Grids

- Two-column asymmetric: `md:grid-cols-[1fr_1.2fr]` or `md:grid-cols-[1.2fr_1fr]` with `gap-10 md:gap-20`
- Process cards: `sm:grid-cols-2 gap-5`
- Reviews: `md:grid-cols-[1fr_1.35fr] gap-10`

### Rounded Corners

| Context | Value |
|---|---|
| Cards | `rounded-2xl` (16px) |
| Pill sections | `rounded-[32px]` |
| Buttons | `rounded-lg` |
| Badges / dots | `rounded-full` |
| Tag pills | `rounded-full` |

---

## 4. Components

### 4.1 Primary CTA Button (`.btn-primary`)

```css
background: #2979ff;
box-shadow: 0 2px 8px rgba(41, 121, 255, 0.3);
border-radius: rounded-lg;
padding: px-6 py-3.5;
font-size: text-[15px];
```

Hover: `translateY(-2px)`, background `#1a5fd4`, shadow `0 4px 16px rgba(41,121,255,0.4)`.

Always paired with an `.arrow` span: `w-6 h-6 rounded-full bg-white/25`.

### 4.2 Sticky CTA (`.sticky-cta`)

Fixed floating button: `top-5 right-5 z-50`. Same blue as `.btn-primary`. Hidden by default (`opacity:0`, `pointer-events:none`, `translateY(-8px)`). Transitions in via `.visible` class (added by JS after scroll). `.ready` class enables the transition (added after a short delay to prevent flash on load).

### 4.3 Hero Badge (`.hero-badge`)

```
background: rgba(35,31,32,0.06)
border: 1px solid rgba(35,31,32,0.15)
color: rgba(35,31,32,0.6)
```

`inline-flex`, `rounded-full`, `px-4 py-1.5`, `text-xs`. Contains a `.dot`: `w-1.5 h-1.5 rounded-full bg-primary`.

### 4.4 Card (`.glass-card` / `.process-card`)

Both classes share identical styles:

```css
background: --color-bgcard (white)
border: 1px solid --color-bordr
border-radius: rounded-2xl
padding: p-8
box-shadow: 0 2px 12px rgba(0,0,0,0.06)
```

Inside `.dark-section`, `.glass-card` overrides to: `bg: rgba(245,243,244,0.05)`, `border: rgba(245,243,244,0.1)`, `box-shadow: none`.

### 4.5 Fit Card (`.fit-card`)

No own background — used as a modifier alongside `.glass-card`. Text inside: `font-serif text-xl leading-snug text-bgdark`. Inside `.dark-section`: text overrides to `#f5f3f4`.

### 4.6 Pill Section (`.pill-section`)

```css
background: linear-gradient(to bottom, #f0ece6, rgba(250,248,245,0));
border-radius: rounded-[32px];
margin: mx-4 md:mx-8;
```

### 4.7 Tag Pills (`.tag`)

```
display: inline-block
font-size: text-[11px]
font-weight: font-semibold
padding: px-3 py-1
border-radius: rounded-full
uppercase, letter-spacing: 0.08em
```

| Variant | Background | Text |
|---|---|---|
| `.tag-cyan` | `--color-cyan2` | `--color-deeppurple` |
| `.tag-lavender` | `--color-lavender` | `--color-deeppurple` |
| `.tag-green` | `--color-greenp` | `--color-deeppurple` |
| `.tag-pink` | `--color-pink2` | `--color-pinktxt` |

Usage by section:

| Section | Tag |
|---|---|
| Week 1 | Cyan |
| Week 2 | Lavender |
| Weeks 3–4 | Green |

### 4.8 Overline Label (`.overline`)

`text-xs font-medium uppercase mb-6`, `letter-spacing: 0.1em`, `color: rgba(35,31,32,0.45)`.

No `::before` / `::after` brackets — text content is written directly in HTML.

### 4.9 Problem Section Dash List

Each item: `grid grid-cols-[48px_1fr] gap-5 py-8 border-t border-bordr items-start`. The colored accent is a `<span class="h-0.5 w-8 mt-4 rounded">` using inline Tailwind bg classes:

| Bullet | Color |
|---|---|
| 1 | `bg-pink2` |
| 2 | `bg-cyan2` |
| 3 | `bg-cream` |

Text: `font-serif text-[22px] leading-snug`.

### 4.10 Review Card (`.review`)

`rounded-2xl p-8 relative flex flex-col gap-4`

| Variant | Background | Text |
|---|---|---|
| `.review-dark` | `--color-bgcard` + `border-bordr` | `--color-bgdark` |
| `.review-lavender` | `--color-lavender` | `--color-deeppurple` |

Shared: `.quote` — `font-serif text-7xl leading-none absolute top-4 right-6 opacity-20`. `.stars` — `text-sm flex gap-0.5 color:#f5a623`. `.body` — `font-sans text-lg leading-snug`. `.who` — `text-sm opacity-70 mt-auto`.

Inside `.dark-section`, `.who` overrides to `rgba(245,243,244,0.55)` and `.quote` to `opacity:0.15`.

### 4.11 FAQ Accordion (`.faq-item`)

Built with native `<details>/<summary>`. `border-t border-bordr py-6`. Last item also gets `border-b`.

Summary: `list-none cursor-pointer flex justify-between items-center gap-4 font-sans text-lg`. The `.chev` span (`fa-chevron-down`) rotates 180° when open via `[open] .chev { transform: rotate(180deg) }`.

Answer: `.faq-answer` transitions height (`transition: height 0.3s ease`), controlled by JS. `.faq-answer-inner` has `pt-4`.

### 4.12 About Avatar (`.about-avatar`)

`w-28 h-28 rounded-full overflow-hidden border-4 border-bordr`, `box-shadow: 0 4px 20px rgba(0,0,0,0.1)`. Image inside: `w-full h-full object-cover`.

---

## 5. Animation

### Scroll Reveal (`.reveal`)

```css
opacity: 0;
transition: opacity 0.7s ease;
```

`.visible` class (added by IntersectionObserver in JS) sets `opacity: 1`. No translateY — fade only.

---

## 6. Section Structure

The page sections in order:

| Section | Background | Class |
|---|---|---|
| Header / Nav | Transparent overlay | absolute, no section class |
| Hero | `#faf8f5` (body default) | no section class |
| Problem | `#faf8f5` (body default) | `section-y` |
| What to Expect | `#f0ece6` → transparent gradient | `section-y pill-section` |
| Reviews | `#272324` dark | `dark-section py-28` |
| FAQ | `#f0ece6` → transparent gradient | `section-y pill-section mt-10` |
| About | `#faf8f5` (body default) | `section-y` |
| Contact / Booking | `#faf8f5` (body default) | `section-y` |
| Footer | `#faf8f5` (body default) | `container-x` wrapper |

---

## 7. Icons

Font Awesome 6.4.0 (CDN). Usage:
- `fa-solid fa-arrow-right` — CTA button arrow
- `fa-solid fa-star` — Review star ratings
- `fa-solid fa-chevron-down` — FAQ accordion chevron

---

## 8. Responsive Breakpoints

Tailwind defaults (`md` = 768px, `sm` = 640px). Key adaptations:

- `h2`: hard-capped at `40px` on `≤640px`
- `.section-y`: `py-28` → `py-16` on `≤640px`
- All grids collapse to single column below `sm` or `md`
- FAQ: heading column uses `max-md:order-first` to appear above questions on mobile
- `.pill-section`: `mx-4` on mobile, `md:mx-8` on desktop

---

## 9. Design Principles

1. **Warm neutral base, not pure dark.** The default background is `#faf8f5` (warm off-white). Dark sections (`#272324`) are used sparingly for contrast — the site is light-first.
2. **Typography does the heavy lifting.** Large Instrument Serif headings with tight tracking at fluid sizes. Headings are the design.
3. **Pastels as accents only.** Cyan, lavender, green, pink appear on tags and dash accents — never as dominant section backgrounds.
4. **Depth through shadow, not gradients.** Cards use a subtle `0 2px 12px rgba(0,0,0,0.06)` shadow. No complex multi-layer glows.
5. **Motion is purposeful and minimal.** Only scroll-triggered fade-in (`.reveal`). No entrance animations, looping animations, or 3D transforms.
6. **Consistency in section structure.** Sections alternate between default, pill-gradient, and dark backgrounds to create rhythm.
7. **Restraint on border-radius.** Cards are `rounded-2xl`. Pill sections are `rounded-[32px]`. Buttons are `rounded-lg`. Badges are `rounded-full`. Nothing in between.
