# Skyrim Getting Started Guide — Developer Handover Spec

**Document version:** 1.0  
**Last updated:** March 2025  
**Handover type:** Code-as-reference (no Figma)  
**Reference page:** `skyrim-guide2`

---

## 1. Executive Summary

This document provides a complete specification for implementing the **Skyrim Getting Started Guide** in the Nexus Mods production codebase. The design has been built in a reference Next.js project and is being handed over as **code + assets** rather than Figma. A bundled project folder accompanies this spec for the developer to use as the source of truth.

**Critical requirement:** All theme tokens (colors, spacing, typography) must be mapped to your production design system. Do not copy hex values or arbitrary numbers—use your existing semantic tokens.

---

## 2. Scope & Deliverables

| Deliverable | Description |
|-------------|-------------|
| **Skyrim Getting Started Guide** | Step-by-step modding guide for Skyrim Special Edition using Vortex |
| **Route** | `/skyrim-guide` or equivalent (e.g. `/games/skyrimspecialedition/guides/getting-started`) |
| **Responsive** | Mobile-first, breakpoints: xs (450px), sm (640px), md (768px), lg (1024px) |
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
│  main (pt-14 for fixed nav offset)                       │
│  max-w-[1024px] mx-auto                                  │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Breadcrumb                                          ││
│  ├─────────────────────────────────────────────────────┤│
│  │  Two-column layout (sm+):                            ││
│  │  ┌──────────────────────┬──────────────────────────┐ ││
│  │  │  Left: Main content   │  Right: Quick links +    │ ││
│  │  │  - Mobile: Steps     │  Discord block (md+)     │ ││
│  │  │    dropdown          │  - Sticky sidebar        │ ││
│  │  │  - Title             │                         │ ││
│  │  │  - Section content   │                         │ ││
│  │  │  - Prev/Next nav     │                         │ ││
│  │  └──────────────────────┴──────────────────────────┘ ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 4.2 Breadcrumb

- **Items:** All games → Skyrim Special Edition → Guides → Getting started
- **Last item:** No href (current page)
- **Behavior:** On mobile (≤768px), collapse to "First > … > Last" when >2 items
- **Use:** Your existing breadcrumb component if available; otherwise implement per reference

### 4.3 Quick Links (Steps Sidebar)

- **Desktop (md+):** Sticky sidebar, max-width 232px, `top-6` (or `top-24` on lg)
- **Mobile:** Collapsible dropdown below nav, sticky `top-24`, toggle button with chevron
- **Content:** Numbered list of 8 steps (see Section 5)
- **Active state:** Current step uses `text-primary-moderate`
- **Links:** `#${sectionId}` for in-page navigation
- **Persistence:** Store last-viewed section in `localStorage` (key: `skyrim-guide2-section`)

### 4.4 Discord Community Block (Sidebar)

- **Placement:** Below quick links, `spacing-4` gap, only visible when sidebar is visible (md+)
- **Content:** "Join our Discord community to get help and chat to other modders."
- **Link:** `https://discord.gg/nexusmods`
- **Styling:** `bg: rgba(83, 102, 251, 0.16)`, `border: 1px solid rgba(83, 102, 251, 0.48)`, rounded-lg, padding spacing-3
- **Text:** "Join our Discord" underlined, `text-translucent-strong`; body `text-translucent-moderate`
- **Icon:** Discord SVG 20×20, `text-translucent-moderate` default, `text-translucent-strong` on hover

---

## 5. Guide Sections (8 Steps)

| Step | ID | Label |
|------|-----|-------|
| 1 | setup | Setup and requirements |
| 2 | install-vortex | Install Vortex |
| 3 | add-skyrim-to-vortex | Add Skyrim to Vortex |
| 4 | install-address-library | Install Address Library |
| 5 | install-engine-fixes | Install Engine Fixes |
| 6 | install-skyui | Install SkyUI |
| 7 | install-ussep | Install USSEP |
| 8 | wrapping-up | Wrapping up |

### 5.1 Section Content Structure

Each section (except wrapping-up) follows:

- **Step label:** "step N" (uppercase, primary-moderate)
- **Heading:** Section label (heading-sm, neutral-strong)
- **Body:** Typography body-xl, neutral-subdued
- **GuideImage blocks:** Image + optional caption
- **CTA buttons:** Primary style (bg-primary-moderate, text-neutral-inverted)
- **StepNavControls:** Previous / Next buttons at bottom

### 5.2 Step 1: Setup and requirements

- Introduction paragraph
- Image: `section1-original-vs-skyui.png` (Original Skyrim UI vs SkyUI)
- "What you'll achieve" bullet list
- "Requirements" list with checkmarks (Steam/GOG links)

### 5.3 Step 2: Install Vortex

- Download Vortex CTA → `https://www.nexusmods.com/site/mods/1`
- Images: `section2-image1.png` … `section2-image4.png` (installation, account linking)

### 5.4 Step 3: Add Skyrim to Vortex

- Images: `section2-image5.png` … `section2-image10.png` (game selection, SKSE install)
- **GuideInfoBlock:** "What is SKSE?" (info/callout)
- Links: Steam, GOG, Nexus Premium

### 5.5 Step 4: Install Address Library

- CTA: Get Address Library → `https://www.nexusmods.com/skyrimspecialedition/mods/32444`
- Images: `section3-image1.png`, `section3-image2.png`

### 5.6 Step 5: Install Engine Fixes

- CTA: Get Engine Fixes → `https://www.nexusmods.com/skyrimspecialedition/mods/17230`
- Images: `section4-image1.png`, `section4-image2.png`, `section4-image3.png`

### 5.7 Step 6: Install SkyUI

- CTA: Get SkyUI → `https://www.nexusmods.com/skyrimspecialedition/mods/12604`
- Images: `section5-image1.png`, `section5-image2.png`, `section5-image3.png`

### 5.8 Step 7: Install USSEP

- CTA: Get patch → `https://www.nexusmods.com/skyrimspecialedition/mods/18975`
- Optional DLC section: Creation Club patches
- Images: `section6-image1.png`, `section6-image3.png`, `section6-image4.png`, `section6-image5.png`

### 5.9 Step 8: Wrapping up

- Summary text
- **Collections:** 3 collection cards (HS Player Homes, JK's All-in-one, Community Shaders)
- **Discord communities:** 3 community cards (Modding Linked, xEdit, Aetherius Modding) — placeholder hrefs

---

## 6. Components

### 6.1 GuideInfoBlock

- **Usage:** Info/callout boxes (e.g. "What is SKSE?")
- **Styling:** `bg-blue-950`, `border-info-subdued`, rounded-base, padding spacing-3
- **Icon:** Info circle SVG, `text-white/70`
- **Title:** body-md-semibold, white/95
- **Body:** neutral-subdued, `[&_strong]:text-neutral-moderate`

### 6.2 GuideImage

- **Props:** src, alt, caption (optional)
- **Container:** `bg-surface-mid`, rounded-lg, padding spacing-2
- **Image:** Rounded, `border-stroke-neutral-translucent-weak`
- **Caption:** body-sm, neutral-subdued

### 6.3 StepNavControls

- **Layout:** Flex, gap-4, Previous (left) / Next (right)
- **Buttons:** Card style, `bg-surface-low`, bordered, hover states
- **Content:** "Previous" / "Next" label + section name (hidden on xs)
- **ArrowCircle:** Circular icon, hover inverts colors

### 6.4 QuickLinksList

- **Role:** navigation, aria-label="Steps"
- **Items:** Step number + label, link to `#${id}`
- **Active:** `text-primary-moderate`; inactive: `text-neutral-subdued` hover `text-neutral-moderate`

---

## 7. Theme Token Mapping (Critical)

**Map these reference tokens to your production design system.**

### 7.1 Surface

| Token | Usage |
|-------|-------|
| surface-base | Page background |
| surface-low | Cards, quick links, step nav buttons |
| surface-mid | Guide image containers, collection cards |
| surface-high | Collection card hover |
| surface-translucent-low | Mobile steps toggle hover |

### 7.2 Text / Neutral

| Token | Usage |
|-------|-------|
| neutral-strong | Headings, primary text, links |
| neutral-moderate | Secondary text, hover, emphasis |
| neutral-subdued | Body text, captions |
| primary-moderate | Step labels, active quick link, CTAs |

### 7.3 Translucent (Discord block)

| Token | Usage |
|-------|-------|
| text-translucent-strong | "Join our Discord" (underlined), icon hover |
| text-translucent-moderate | Body text, icon default |

### 7.4 Semantic

| Token | Usage |
|-------|-------|
| info-subdued | GuideInfoBlock border |
| success-moderate | Requirement checkmarks |
| stroke-neutral-translucent-* | Borders |

### 7.5 Spacing

Use `var(--spacing-N)` or equivalent: 1, 2, 3, 4, 6, 10, 14.

---

## 8. Asset Checklist

| Asset | Purpose |
|-------|---------|
| section1-original-vs-skyui.png | Step 1 intro |
| section2-image1.png … section2-image10.png | Steps 2–3 (Vortex, Skyrim, SKSE) |
| section3-image1.png, section3-image2.png | Step 4 (Address Library) |
| section4-image1.png … section4-image3.png | Step 5 (Engine Fixes) |
| section5-image1.png … section5-image3.png | Step 6 (SkyUI) |
| section6-image1.png, section6-image3.png … section6-image5.png | Step 7 (USSEP) |
| section7-collection1.png … section7-collection3.png | Step 8 collections |

---

## 9. Links & URLs

| Element | URL |
|---------|-----|
| Download Vortex | https://www.nexusmods.com/site/mods/1 |
| Steam Skyrim | https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/ |
| GOG Skyrim | https://www.gog.com/en/game/the_elder_scrolls_v_skyrim_special_edition |
| Nexus Premium | https://users.nexusmods.com/account/billing/premium |
| Address Library | https://www.nexusmods.com/skyrimspecialedition/mods/32444 |
| Engine Fixes | https://www.nexusmods.com/skyrimspecialedition/mods/17230 |
| SkyUI | https://www.nexusmods.com/skyrimspecialedition/mods/12604 |
| USSEP | https://www.nexusmods.com/skyrimspecialedition/mods/18975 |
| Discord | https://discord.gg/nexusmods |
| Collection: HS Player Homes | https://www.nexusmods.com/games/skyrimspecialedition/collections/i9gfac |
| Collection: JK's All-in-one | https://www.nexusmods.com/games/skyrimspecialedition/collections/sklk3h |
| Collection: Community Shaders | https://www.nexusmods.com/games/skyrimspecialedition/collections/62eesj |

---

## 10. Responsive Behavior

| Breakpoint | Quick Links | Layout |
|------------|-------------|--------|
| Mobile | Dropdown below nav, collapsible | Single column |
| sm (640px) | Same | Single column |
| md (768px) | Sticky sidebar right | Two columns |
| lg (1024px) | Same, top-24 | Same |

---

## 11. Accessibility

- Use semantic HTML: `main`, `nav`, `h1`, `h2`, `h3`, `section`.
- Use your existing site navigation—do not build or modify the nav for this page.
- Quick links: `role="navigation"`, `aria-label="Steps"`.
- Mobile toggle: `aria-expanded`, `aria-controls`, `aria-labelledby`.
- All external links: `target="_blank"` + `rel="noopener noreferrer"`.
- Images: descriptive `alt` text.
- Focus: `focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2`.

---

## 12. Claude Implementation Prompt

Use the following prompt when handing this to Claude (or similar AI) to build the page in your production codebase:

---

**PROMPT: Build Skyrim Getting Started Guide from Reference**

```
I need you to implement the Skyrim Getting Started Guide (skyrim-guide2) in our production codebase using the reference implementation provided.

**Context:**
- Reference project: [attach or paste the bundled project folder / key files]
- Key files: app/skyrim-guide2/page.tsx, components/GuideImage.tsx, components/Breadcrumb.tsx

**Instructions:**
1. **Token mapping:** Map all theme tokens from the reference to our production design system. Do NOT copy hex values. Use our semantic tokens (surface-base, surface-low, primary-moderate, neutral-strong, etc.).

2. **Structure:** Match the page structure exactly:
   - Breadcrumb (All games > Skyrim SE > Guides > Getting started)
   - Two-column layout: main content left, quick links + Discord block right (md+)
   - Mobile: collapsible Steps dropdown, then main content
   - 8 guide sections with step nav (Previous/Next)
   - Section content: step label, heading, body, GuideImage blocks, CTAs

3. **Components:** Use our existing Typography, Link, and layout components. Use our existing site navigation—do not build or port a custom nav. Implement or adapt GuideImage, Breadcrumb, GuideInfoBlock, StepNavControls, QuickLinksList per reference.

4. **State:** Persist active section in localStorage (key: skyrim-guide2-section or equivalent). Restore on load.

5. **Assets:** Reference assets are in /guides/. Use our CDN or static path.

6. **Links:** Use the URLs from the spec (Nexus Mods, Vortex, mod pages, Discord, collections).

7. **Discord block:** In sidebar only (md+), below quick links. Styling: rgba(83,102,251,0.16) bg, translucent text tokens.

**Output:** Implement the page in the correct route. Use our existing site navigation. Ensure it integrates with our layout (e.g. main content offset below fixed nav if applicable).
```

---

## 13. Handover Checklist

- [ ] Reference project folder attached to ticket
- [ ] Asset pack (guides images) included in bundle
- [ ] Production token mapping documented
- [ ] Route confirmed
- [ ] Breadcrumb items/hrefs updated for production
- [ ] Discord community hrefs updated (currently placeholders)
- [ ] QA: All 8 steps render correctly
- [ ] QA: Quick links navigation works
- [ ] QA: Mobile dropdown works
- [ ] QA: localStorage persistence works
- [ ] QA: Responsive breakpoints

---

## 14. Contact & Questions

For questions about design intent, token mapping, or content, contact the product/design owner. For technical questions about the reference implementation, refer to the bundled code and this spec.
