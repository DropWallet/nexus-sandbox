# Vortex Landing Page — Developer Handover Spec

**Document version:** 1.0  
**Last updated:** March 2025  
**Handover type:** Code-as-reference (no Figma)

---

## 1. Executive Summary

This document provides a complete specification for implementing the **Vortex landing page** in the Nexus Mods production codebase. The design has been built in a reference Next.js project and is being handed over as **code + assets** rather than Figma. A bundled project folder accompanies this spec for the developer to use as the source of truth.

**Critical requirement:** All theme tokens (colors, spacing, typography) must be mapped to your production design system. Do not copy hex values or arbitrary numbers—use your existing semantic tokens.

---

## 2. Scope & Deliverables

| Deliverable | Description |
|-------------|-------------|
| **Vortex landing page** | Full marketing/landing page for the Vortex mod manager |
| **Route** | `/vortex` (or equivalent in your routing structure) |
| **Responsive** | Mobile-first, breakpoints: xs (450px), sm (640px), md (768px), lg (1024px), xl (1280px) |
| **Theme support** | Dark theme (primary), light theme (tokens must invert for both) |

---

## 3. Reference Implementation Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Font:** Inter (sans-serif)

Your production stack may differ. Adapt the implementation to your architecture; the structure, content, and token usage should remain the same.

---

## 4. Page Structure (Top to Bottom)

### 4.1 Layout Shell

```
┌─────────────────────────────────────────────────────────┐
│  Existing site navigation (use production nav as-is)     │
├─────────────────────────────────────────────────────────┤
│  main (pt-14, relative z-10)                             │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Hero Section                                       ││
│  │  Games Carousel Section                             ││
│  │  Transform Section (4 feature blocks + CTA)          ││
│  │  Get Started Resources Section                      ││
│  │  Popular Communities Section                        ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 4.2 Hero Section

- **Background:** Page uses `bg-surface-base`; hero sits on top of page background.
- **Optional:** Unicorn Studio WebGL scene (aspect 1920/799) — *only if your project supports WebGL/Unicorn Studio.* If not, omit or replace with a static gradient/hero image.
- **Content:**
  - Title (h1): `"Vortex is the easiest way to manage your mods, so you can spend more time playing."`
  - CTA button: "Download for Windows" with Windows icon → `https://www.nexusmods.com/site/mods/1`
- **Hero image frame:**
  - Raycast-style frame with gradient border ring.
  - Two animated gradient glows (blue/green) behind the frame.
  - Inner container: `bg-surface-base`, rounded corners.
  - Screenshot image: aspect ratio 1207/542, `object-cover object-top`.
  - Gradient overlay fades to `surface-base` at bottom.
- **Hero image asset:** `hero-image.png` or `hero-app.png` (Vortex app screenshot).

### 4.3 Games Section

- **Headline:** "Over 500 games supported"
- **Carousel:** Infinite horizontal scroll (right-to-left), game cover artwork.
- **Game tiles:** 80px wide, aspect 400/600, rounded, bordered.
- **Hover:** Border lightens, subtle white overlay.
- **Gradient border:** 1px horizontal line below carousel with fade at edges.

### 4.4 Transform Section ("Your games, reimagined.")

Four alternating feature blocks:

| Block | Title | Content | Image | Layout |
|-------|-------|---------|-------|--------|
| 1 | Manage your mods effortlessly | Install and organise your mods with ease... | image-manage.png | Text left, image right |
| 2 | Install mods and collections with 1-click | Easily install curated mod lists... | image-collections.png | Image left, text right |
| 3 | All your games in one place | Vortex supports over 500 games... | image-games.png | Text left, image right |
| 4 | Never run outdated mods again | See available updates instantly... | image-safety.png | Image left, text right |

**Block structure:**
- Container: `bg-surface-low`, rounded-lg, padding.
- Image container: `bg-surface-mid` (blocks 1–3), `bg-surface-base` (block 4).
- Image: positioned with inset padding, rounded corners, drop shadow.
- Text: Pictogram icon, heading, body, link with arrow.

**Download CTA block:**
- Animated gradient border (orange/amber).
- Background: radial gradient + `surface-low`.
- "Download Vortex now" + "Join millions of gamers..." + "Download for Windows" button.

### 4.5 Get Started Resources Section

- **Title:** "Get started with these resources"
- **Three cards:** YouTube, Vortex Wiki, Discord
- **Skyrim guide card:** Large card with game art, tiled texture background, "View guide" button.

### 4.6 Popular Communities Section

- **Title:** "Popular communities"
- **Four cards:** Skyrim SE, Cyberpunk 2077, Fallout 4, Baldur's Gate 3
- Each card: game thumbnail, title, mods/collections count, Mods + Collections buttons

---

## 5. Theme Token Mapping (Critical)

**Map these reference tokens to your production design system.** Do not hardcode hex values.

### 5.1 Surface Colors

| Reference Token | Usage | Production Mapping |
|-----------------|-------|---------------------|
| `surface-base` | Page background, hero image container, modal backgrounds | Your base surface |
| `surface-low` | Section blocks, cards, CTA background | Your elevated surface |
| `surface-mid` | Image containers, hover states | Your mid surface |
| `surface-high` | (if used) | Your high surface |
| `surface-translucent-low` | Translucent overlays, buttons on dark cards | rgba(255,255,255,0.05) on dark |

### 5.2 Text / Neutral Colors

| Reference Token | Usage | Production Mapping |
|-----------------|-------|---------------------|
| `neutral-strong` | Primary text, headings | Your primary text |
| `neutral-moderate` | Hover states, secondary emphasis | Your secondary text |
| `neutral-subdued` | Body text, muted content | Your tertiary text |
| `neutral-weak` | De-emphasized text | Your weakest text |
| `neutral-inverted` | Text on primary buttons | Your inverted text |

### 5.3 Translucent Text (for dark backgrounds)

| Reference Token | Usage | Production Mapping |
|-----------------|-------|---------------------|
| `text-translucent-strong` | Primary text on dark | rgba(255,255,255,0.95) |
| `text-translucent-moderate` | Secondary text on dark | rgba(255,255,255,0.7) |
| `text-translucent-subdued` | Muted text on dark | rgba(255,255,255,0.5) |

### 5.4 Primary (Brand) Colors

| Reference Token | Usage | Production Mapping |
|-----------------|-------|---------------------|
| `primary-moderate` | Primary buttons, links, accents | Your primary brand |
| `primary-strong` | Button hover | Your primary hover |
| `primary-subdued` | (if used) | Your primary subdued |

### 5.5 Stroke / Border

| Reference Token | Usage | Production Mapping |
|-----------------|-------|---------------------|
| `stroke-neutral-translucent-weak` | Light borders | rgba(255,255,255,0.1) |
| `stroke-neutral-translucent-subdued` | Default card borders | rgba(255,255,255,0.2) |
| `stroke-neutral-translucent-moderate` | Hover borders | rgba(255,255,255,0.3) |

### 5.6 Spacing

Use `var(--spacing-N)` or your equivalent spacing scale:

- `--spacing-2`: 8px  
- `--spacing-3`: 12px  
- `--spacing-4`: 16px  
- `--spacing-5`: 20px  
- `--spacing-6`: 24px  
- `--spacing-8`: 32px  
- `--spacing-10`: 40px  
- `--spacing-14`: 56px  
- `--spacing-16`: 64px  
- `--spacing-20`: 80px  
- `--spacing-24`: 96px  

### 5.7 Typography Scale

| Variant | Size | Line Height | Weight |
|---------|------|-------------|--------|
| heading-md | 30px | 1.25 | 600 |
| heading-lg | 36px | 1.25 | 600 |
| heading-sm | 24px | 1.25 | 600 |
| heading-xs | 18px | 1.25 | 600 |
| body-xl | 18px | 1.5 | 400 |
| body-xl-semibold | 18px | 1.5 | 600 |
| body-lg | 16px | 1.5 | 400 |
| body-lg-semibold | 16px | 1.5 | 600 |
| body-md | 14px | 1.5 | 400 |

### 5.8 Border Radius

- `rounded-base`: 4px  
- `rounded-lg`: 8px  
- `rounded-xl`: 12px  
- `rounded-2xl`: 16px  

---

## 6. Custom CSS / Animations

These must be ported or adapted to your production stylesheet:

### 6.1 Hero Frame

- **Outer frame:** Gradient border ring, subtle inset shadow.
- **Inner frame:** Gradient border, subtle glow.
- **Glow animations:** Blue and green radial gradients alternate (8s ease-in-out infinite).

### 6.2 Games Carousel

- **Animation:** `translateX` from 0 to -50% (duplicated content for seamless loop).
- **Duration:** 120s linear infinite.
- **Pause on hover:** `animation-play-state: paused`
- **Mask:** Gradient fade at left/right edges (transparent → black 12%–72%).

### 6.3 Download CTA

- **Border:** Animated gradient (orange/amber) 4s linear infinite.
- **Background:** Radial gradient + surface-low.

### 6.4 Blur / Fade-in Entry

- **Animation:** `blur-fade-in` — blur(10px) → none, opacity 0 → 1, translateY(8px) → 0.
- **Duration:** 0.8s ease-out.
- **Stagger:** 0s, 0.1s, 0.2s, 1s, 1.15s for different sections.

### 6.5 Reduced Motion

- Respect `prefers-reduced-motion: reduce` — disable CTA border animation.

---

## 7. Asset Checklist

Ensure these assets are available in your production CDN or static folder:

| Asset | Purpose |
|-------|---------|
| hero-image.png / hero-app.png | Hero screenshot |
| image-manage.png | Manage mods block |
| image-collections.png | Collections block |
| image-games.png | Games block |
| image-safety.png | Updates block |
| game-image01.png … game-image16.webp | Games carousel |
| game-image02.png, 03, 04, 05 | Popular community thumbnails |
| mod-pictogram.svg | Mods icon |
| Pictogram-collections.svg | Collections icon |
| pictogram-games.svg | Games icon |
| pictogram-downloads.svg | Downloads icon |
| windows.svg | Windows download icon |
| arrow_forward.svg | Link arrow |
| texture-bg.png | Skyrim card tiled texture |

---

## 8. Links & URLs

| Element | URL |
|---------|-----|
| Download for Windows | https://www.nexusmods.com/site/mods/1 |
| Learn how to get started | https://wiki.nexusmods.com/index.php/Category:Vortex |
| Browse Collections | https://www.nexusmods.com/collections?sort=downloads |
| Browse Games | https://www.nexusmods.com/games |
| YouTube | https://www.youtube.com/@NexusMods |
| Vortex Wiki | https://wiki.nexusmods.com/index.php/Vortex |
| Discord | https://discord.gg/nexusmods |
| Skyrim guide | (Your Skyrim guide URL) |
| Game mods/collections | e.g. https://www.nexusmods.com/skyrimspecialedition/mods/ |

---

## 9. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Single column, stacked blocks, centered hero title |
| sm (640px) | Hero title left-aligned, larger heading |
| md (768px) | Two-column blocks, image/text alternation |
| lg (1024px) | Full layout, image widths 684px |
| xl (1280px) | Max-width 1268px container, gradient overlay extends |

---

## 10. Accessibility

- Use semantic HTML: `main`, `section`, `h1`, `h2`. Use your existing site navigation—do not build a custom nav for this page.
- All links: `target="_blank"` + `rel="noopener noreferrer"` where external.
- Images: descriptive `alt` text.
- Buttons/links: `focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2`.
- Decorative elements: `aria-hidden`.

---

## 11. Optional vs Required

| Element | Required? | Notes |
|---------|-----------|-------|
| Hero WebGL (Unicorn Studio) | No | Replace with static hero or omit if not supported |
| Hero image | Yes | Vortex app screenshot |
| All four transform blocks | Yes | |
| Games carousel | Yes | |
| Popular communities | Yes | |
| Skyrim guide card | Yes | Update URL to production route |

---

## 12. Claude Implementation Prompt

Use the following prompt when handing this to Claude (or similar AI) to build the page in your production codebase:

---

**PROMPT: Build Vortex Landing Page from Reference**

```
I need you to implement the Vortex landing page in our production codebase using the reference implementation provided.

**Context:**
- Reference project: [attach or paste the bundled project folder / key files]
- Key files: app/vortex/page.tsx, app/globals.css (theme tokens, animations), components

**Instructions:**
1. **Token mapping:** Map all theme tokens from the reference to our production design system. Do NOT copy hex values. Use our semantic tokens (surface-base, surface-low, primary-moderate, neutral-strong, etc.).

2. **Structure:** Match the page structure exactly:
   - Hero section (title, CTA, hero image in frame)
   - Games carousel section
   - Transform section (4 feature blocks + Download CTA)
   - Get started resources (3 cards + Skyrim guide card)
   - Popular communities (4 game cards)

3. **Components:** Use our existing Typography, Button, Link, and layout components. Use our existing site navigation—do not build or port a custom nav. Adapt the reference markup to our patterns.

4. **Assets:** Reference assets are in the vortex folder. Use our CDN or static path for equivalent assets.

5. **Animations:** Port the blur-fade-in, games carousel, hero glow, and CTA border animations. Respect prefers-reduced-motion.

6. **Responsive:** Match breakpoints (xs, sm, md, lg, xl) and layout behavior.

7. **Skip:** The HeroUnicornScene (WebGL) — omit or replace with a static gradient/hero if we don't support it.

8. **Links:** Use the URLs from the spec (Nexus Mods, Vortex download, wiki, Discord, etc.).

**Output:** Implement the page in the correct route. Use our existing site navigation—do not build or modify the nav for this page. Ensure the page integrates with our layout (e.g. main content offset below fixed nav if applicable).
```

---

## 13. Handover Checklist

- [ ] Reference project folder attached to ticket
- [ ] Asset pack (vortex images) included in bundle
- [ ] Production token mapping documented (or shared design system link)
- [ ] Route confirmed (e.g. `/vortex`)
- [ ] Skyrim guide URL updated for production
- [ ] QA: Visual parity with reference
- [ ] QA: Responsive breakpoints
- [ ] QA: Reduced motion
- [ ] QA: All links functional

---

## 14. Contact & Questions

For questions about design intent, token mapping, or content, contact the product/design owner. For technical questions about the reference implementation, refer to the bundled code and this spec.
