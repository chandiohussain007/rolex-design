# Rolex Day-Date Luxury Watch Showcase — Frontend Implementation Plan

A premium scrollytelling website inspired by Rolex's brand identity, featuring scroll-driven 3D-like transitions, parallax effects, interactive hotspots, and a product configurator.

## Sections Breakdown (from screenshots)

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero — Clean Watch** | Off-white background, centered floating watch, no text overlay yet |
| 2 | **Hero — OYSTERS PERPETUAL** | Giant dark-green typography "OYSTERS PERPETUAL" behind the watch, parallax depth effect. Bottom bar: "Elegant. Precious. Prestigious." |
| 3 | **Hero — Exploded View** | Satellite watch components float outward (bezel, movement, caseback) with pill-shaped labels ("Exclusive Innovation", "Day-Date 40", "Green Dial", "Calibre 3255") |
| 4 | **Transition to Green** | Background fades from off-white to deep Rolex green. Watch on leather pillow starts entering. "Our Models" + "PURE BRILLIANCE" text appears |
| 5 | **Product Configurator** | Full view — large watch on black leather pillow (left), "PURE BRILLIANCE" heading + model grid (right) with 2 alternate watches with prices |
| 6-7 | **Configurator — Swap** | Clicking alternate models swaps the main watch (rose gold/diamond variant shown). Smooth fade-slide micro-animation |
| 8 | **Macro Close-Up (Dark)** | Full-bleed extreme close-up of the green dial on dark charcoal fabric background |
| 9 | **Interactive Hotspots** | Same macro view but with labeled pointer lines: "The President bracelet", "Fluted bezel", "Green Dial", "Day date", "Yellow gold dial", "Calibre 3255", "Brilliant-cut diamonds" |
| 10 | **Watch on Pillow** | Watch resting on black pillow with green Rolex box base, off-white background with light shadow |
| 11-12 | **Box Reveal** | Watch slides into the iconic green Rolex box — lid open, gold crown logo visible. Box closes with the watch inside |
| 13 | **Closing Statement** | Off-white background with large dark-green bold text: "TURNING EVERY DAY INTO A PROMISE FOR THE FUTURE." Small watch-in-box image embedded inline |

---

## Proposed Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 14** (App Router) | SSR for fast media loads, file-based routing |
| Styling | **Tailwind CSS v3** | As specified by user — utility-first, responsive breakpoints |
| Animation | **GSAP + ScrollTrigger** | Core scrollytelling engine — scroll-linked transitions, parallax, pinning |
| Smooth Scroll | **Lenis** | Buttery scroll feel required for GSAP animations |
| Typography | **Google Fonts** — Syne (headings), Inter (body) | Matches the bold geometric + clean minimal aesthetic |
| Assets | **High-res PNG layers** | Pseudo-3D parallax depth via layered images + GSAP transforms |

> [!IMPORTANT]
> **Asset Generation**: Since we don't have the actual Rolex product photography, I will generate high-quality watch images using the `generate_image` tool to create realistic placeholder assets that match the design aesthetic (gold watch with green dial, leather pillow, watch box, etc.).

---

## Proposed Changes

### 1. Project Initialization

#### [NEW] Next.js Project Setup
- Initialize Next.js 14 with App Router using `npx create-next-app`
- Install dependencies: `gsap`, `@studio-freight/lenis` (or `lenis`), `@gsap/react`
- Configure Tailwind with custom color palette

---

### 2. Design System & Global Styles

#### [NEW] `tailwind.config.js`
- Custom colors: Rolex Green `#0D422B`, Champagne `#F7F5F0`, Onyx `#1A1A1A`, Slate `#606266`, Gold `#C5A059`
- Custom fonts: Syne, Inter
- Custom spacing and breakpoints for luxury layout

#### [NEW] `app/globals.css`
- Import Google Fonts
- Lenis smooth scroll styles
- Custom scrollbar styling
- Base typography resets
- GSAP animation utility classes

---

### 3. Asset Generation

#### [NEW] `public/assets/` directory
Generate using `generate_image` tool:
- `watch-hero.png` — Gold Day-Date with green dial, front view, transparent/clean background
- `watch-pillow.png` — Watch on black leather pillow
- `watch-brown.png` — Rose gold/brown dial variant
- `watch-black.png` — Black dial variant  
- `watch-macro.png` — Extreme close-up of green dial
- `watch-box-open.png` — Watch in open green Rolex box
- `watch-box-closed.png` — Closed green Rolex box
- `watch-components/` — Bezel, caseback, movement cutaway images
- `rolex-crown.png` — Rolex crown logo

---

### 4. Layout & Navigation

#### [NEW] `app/layout.js`
- Root layout with Syne + Inter font loading
- Metadata for SEO
- Lenis smooth scroll provider wrapper

#### [NEW] `components/Navbar.js`
- Fixed top navbar with:
  - Hamburger menu icon + "Menu" text (left)
  - Rolex crown logo (center)
  - Search icon + "Learn More" green CTA button (right)
- Transparent background, content adapts color based on scroll section (light/dark)

---

### 5. Page Sections (Components)

#### [NEW] `components/HeroSection.js`
- **Phase 1**: Clean centered watch on off-white background
- **Phase 2**: Giant "OYSTERS PERPETUAL" text fades in behind watch (z-index layering), parallax on mouse move
- **Phase 3**: Component parts fly outward with pill labels
- Bottom ticker: "Elegant. Precious. Prestigious."
- GSAP ScrollTrigger pins this section and drives all 3 phases

#### [NEW] `components/ProductShowcase.js`
- Background transitions from off-white → Rolex green
- Left: Large featured watch on leather pillow (60% width)
- Right sidebar:
  - "Our models" subtitle
  - "PURE BRILLIANCE" headline (bold Syne)
  - Arrow navigation button
  - 2-card grid of alternate models with name + price
- Click handlers swap main watch with fade-slide animation (GSAP Flip or crossfade)

#### [NEW] `components/MacroSection.js`
- Full-bleed section with dark charcoal/fabric background
- Extreme close-up watch image, scroll-driven zoom
- Interactive hotspot labels with thin pointer lines:
  - "The President bracelet", "Fluted bezel", "Green Dial", "Day date", "Yellow gold dial", "Calibre 3255", "Brilliant-cut diamonds"
- Labels animate in sequentially on scroll

#### [NEW] `components/BoxReveal.js`
- Multi-phase scroll animation:
  1. Watch on pillow with box base
  2. Watch slides into open box
  3. Box lid closes
- Off-white background with natural shadow/light effects
- GSAP ScrollTrigger with pin + scrub

#### [NEW] `components/ClosingStatement.js`
- Large bold dark-green text: "TURNING EVERY DAY INTO A PROMISE FOR THE FUTURE."
- Small watch-in-box image embedded inline between words
- Text animates in word-by-word on scroll
- Off-white background

---

### 6. Animation Infrastructure

#### [NEW] `lib/animations.js`
- GSAP ScrollTrigger registration and configuration
- Lenis ↔ GSAP ScrollTrigger integration (RAF sync)
- Reusable animation presets:
  - `parallaxEffect()` — mouse-driven parallax
  - `fadeSlide()` — entrance animation
  - `pinAndScrub()` — section pinning helper

#### [NEW] `components/SmoothScroll.js`
- Client component wrapper that initializes Lenis
- Syncs Lenis with GSAP's ScrollTrigger ticker
- Handles cleanup on unmount

---

### 7. Main Page Assembly

#### [NEW] `app/page.js`
- Assembles all sections in order:
  1. `<HeroSection />`
  2. `<ProductShowcase />`
  3. `<MacroSection />`
  4. `<BoxReveal />`
  5. `<ClosingStatement />`
- Wraps in `<SmoothScroll>` provider

---

## Color Palette Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `rolex-green` | `#0D422B` | Brand panels, CTAs, text accents |
| `champagne` | `#F7F5F0` | Canvas backgrounds, whitespace |
| `onyx` | `#1A1A1A` | Hero typography, headings |
| `slate` | `#606266` | Body copy, labels, borders |
| `gold` | `#C5A059` | Hover accents, premium details |
| `charcoal` | `#2A2A2A` | Macro section dark background |

---

## Verification Plan

### Automated Tests
- `npm run build` — Ensure production build succeeds with no errors
- `npm run dev` — Run dev server and verify all sections render

### Manual Verification
- Scroll through entire page verifying:
  - Hero parallax text + watch depth effect
  - Exploded view labels animate in
  - Background color transition (off-white → green)
  - Product configurator swaps watches smoothly
  - Macro hotspot labels appear on scroll
  - Box reveal animation sequences correctly
  - Closing statement text animates word-by-word
- Test responsive behavior at 1440px, 1024px, 768px viewports
- Verify smooth scrolling via Lenis is active

---

## Open Questions

> [!IMPORTANT]
> 1. **Tailwind CSS version**: You mentioned Tailwind CSS in the tech stack. Should I use **Tailwind CSS v3** (stable, widely supported) or **Tailwind CSS v4** (latest)? I'll default to v3 unless you specify otherwise.

> [!NOTE]
> 2. **Asset fidelity**: Since I'll be generating watch images with AI, they will be high-quality but not actual Rolex product photography. Is this acceptable for this implementation, or do you have actual watch images you'd like to provide?

> [!NOTE]
> 3. **Mobile responsiveness**: The video appears to show a desktop-first design. Should I also build full mobile-responsive layouts, or is desktop-only sufficient for now?
