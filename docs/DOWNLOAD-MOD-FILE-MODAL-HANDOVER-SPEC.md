# Download Mod File Modal — Developer Handover Spec

**Document version:** 1.0  
**Last updated:** March 2025  
**Figma source:** [Mod-Upload-Form](https://www.figma.com/design/n73aYm56Z857ksQzzpqz3c/Mod-Upload-Form?node-id=3741-29918&m=dev)

---

## 1. Executive Summary

This document provides a complete specification for implementing the **Download Mod File** modal in the Nexus Mods production codebase. The modal informs users about **required dependencies** (other mods needed for the current mod to work) before they proceed to download. It acts as a safety check and convenience layer, with distinct flows for **Member (free)** vs **Premium** users, and **Vortex** vs **Manual** download paths.

**Critical requirement:** Use your production design system tokens. Do not copy hex values—map to semantic tokens (surface-base, primary-moderate, etc.).

---

## 2. Scope & Deliverables

| Deliverable | Description |
|-------------|-------------|
| **Download Mod File modal** | Modal overlay triggered when user initiates a mod download |
| **Trigger** | From mod page "Download manually" or "Install with Vortex" actions |
| **States** | Member + Vortex, Member + Manual, Premium + Vortex, Premium + Manual |
| **Responsive** | Mobile-first; modal scales within viewport, list scrolls when many dependencies |
| **Theme** | Dark theme primary; light theme via token inversion |

---

## 3. User Journeys (Product Logic)

### 3.1 Member (Free) + Vortex

1. User clicks download → modal opens.
2. **Banner:** "Get 1-click downloads as a Premium member. [Get Premium]" (purple/upsell).
3. **Required files list:** Shows dependencies with status icons (Vortex logo or download icon).
4. User must manually fulfill each dependency (opens file page, downloads).
5. **Checkbox:** "I understand I've downloaded the file correctly for these mods."
6. **Primary CTA:** "Download" enabled only after checkbox is checked.
7. **Footer CTA:** "Want to try our Vortex tool for the best experience? [Find out more]"

### 3.2 Member (Free) + Manual

1. Same as above; user is taken to standard file download page when clicking download.
2. After download starts, user can return to modal to complete flow for other requirements.
3. Modal is **interim UI** before reaching actual download page.

### 3.3 Premium + Vortex

1. User clicks download → modal opens.
2. **Banner:** "Set to download in Vortex at Nexus Mods" (no upsell).
3. **1-click downloads:** Downloads start immediately without leaving modal.
4. Required files list shows Vortex status (e.g. Vortex logo) per dependency.
5. Checkbox + Download CTA same as Member flow.
6. No "Want to try Vortex" footer (user already using Vortex).

### 3.4 Premium + Manual

1. Similar to Premium + Vortex but manual download path.
2. No upsell banner; 1-click downloads from modal.

---

## 4. Component Structure

### 4.1 Modal Container

```
┌─────────────────────────────────────────────────────────────┐
│  Header: "Download mod file"                    [X Close]    │
├─────────────────────────────────────────────────────────────┤
│  Main mod info                                              │
│  [Mod name, e.g. "Jonghyuk and Spanner - SBV Add-on NPCs"]  │
│  [Download] (primary button)                                │
├─────────────────────────────────────────────────────────────┤
│  Status banner (Member: Premium upsell | Premium: Vortex)    │
├─────────────────────────────────────────────────────────────┤
│  Required files (n)                    [Download all]       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Thumbnail] Mod name              [Status icon]     │   │
│  │  [Thumbnail] Mod name              [Status icon]     │   │
│  │  ... (scrollable if 8+)                             │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ☐ I understand I've downloaded the file correctly...       │
│  [Download] (enabled when checked)                          │
│  [Want to try Vortex? Find out more] (Member + Manual only)  │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Header

- **Title:** "Download mod file" — Typography heading-sm or heading-xs, neutral-strong.
- **Close button:** X icon, top-right. `aria-label="Close"`. Closes modal on click; modal can be dismissed at any stage.

### 4.3 Main Mod Info

- **Mod name:** e.g. "Jonghyuk and Spanner - SBV Add-on NPCs" — body-lg or body-xl, neutral-strong.
- **Primary Download button:** Orange (primary-moderate), full-width or prominent. Triggers main mod download.

### 4.4 Dependency Count Banner

- **Copy:** "1 additional file is required for this mod to work correctly." (or plural: "n additional files...")
- **Style:** Info/warning banner; bg-info-weak or similar, text-info-moderate. Non-intrusive.

### 4.5 Premium Upsell Banner (Member only)

- **Copy:** "Get 1-click downloads as a Premium member. [Get Premium]"
- **Style:** Purple; bg-surface-translucent-low with purple accent, or dedicated premium token.
- **Link:** "Get Premium" → Premium signup/upgrade URL.

### 4.6 Vortex Status Banner (Premium only)

- **Copy:** "Set to download in Vortex at Nexus Mods"
- **Style:** Neutral/info; text-translucent-moderate or similar.

### 4.7 Required Files List

- **Header:** "Required files (n)" — heading-xs, neutral-strong.
- **Download all button:** Secondary style. *Note: PM checking feasibility for Stage 1; may be removed if not feasible.*
- **File cards:** Each row:
  - Thumbnail image (small, e.g. 48×48 or 64×64, rounded).
  - Mod name (body-md, neutral-strong).
  - Status/action icon: Vortex logo (if set in Vortex) or download icon (if manual/not yet downloaded).
- **Scroll:** If 8+ items, list area scrolls; header and footer remain fixed.

### 4.8 Acknowledgment Checkbox

- **Label:** "I understand I've downloaded the file correctly for these mods."
- **Logic:** Primary "Download" button is disabled until checked. On check, enable button.

### 4.9 Footer CTA (Member + Manual only)

- **Copy:** "Want to try our Vortex tool for the best experience? [Find out more]"
- **Link:** Vortex landing or download page.

---

## 5. Theme Token Mapping

Use your production design system. Map as follows:

| Element | Token |
|---------|-------|
| Modal background | `surface-base` or `surface-low` |
| Modal border | `stroke-neutral-translucent-weak` |
| Primary text | `neutral-strong` |
| Secondary text | `neutral-subdued` or `neutral-moderate` |
| Primary button | `primary-moderate` / `primary-strong` (hover) |
| Secondary button | `button-secondary-filled` or equivalent |
| Premium upsell banner | Purple accent (info or custom premium token) |
| Dependency count banner | `info-weak` bg, `info-moderate` text |
| File card background | `surface-mid` or `surface-low` |
| Thumbnail border | `stroke-neutral-translucent-weak` |

### 5.1 Spacing

- Modal padding: `spacing-6` (24px).
- Gap between sections: `spacing-4` to `spacing-6`.
- File card padding: `spacing-3`.
- List max-height: ~320px for scroll (or 8 items × ~48px).

### 5.2 Typography

| Element | Variant |
|---------|---------|
| Modal title | heading-sm or heading-xs |
| Mod name | body-xl or body-lg |
| Banner text | body-md |
| File name | body-md |
| Checkbox label | body-md |
| Footer CTA | body-sm |

### 5.3 Border Radius

- Modal: `rounded-lg` or `rounded-xl`.
- Thumbnails: `rounded-base`.
- Buttons: `rounded-base`.

---

## 6. Interaction & State

### 6.1 Modal Open/Close

- **Open:** Triggered by download action (Vortex or Manual) from mod page.
- **Close:** X button, click outside (optional), Escape key.
- **Focus trap:** When open, focus stays within modal; Tab cycles through interactive elements.

### 6.2 Checkbox → Download Enable

- Checkbox unchecked → Primary Download disabled (or hidden).
- Checkbox checked → Primary Download enabled.

### 6.3 No Dependencies

- If mod has **no** required dependencies, either:
  - Do not show modal; proceed directly to download, or
  - Show simplified modal with only main mod + Download (no list, no checkbox).

*Clarify with PM for edge case.*

### 6.4 Tracked Dependencies

- **Stage 1:** Do **not** show "tracked" dependencies. Keep initial experience simple.
- Only show **required** (hard) dependencies.

---

## 7. Data Requirements

### 7.1 Props / API Shape (Suggested)

```ts
interface DownloadModFileModalProps {
  isOpen: boolean
  onClose: () => void
  mod: {
    id: string
    name: string
    downloadUrl: string
  }
  requiredFiles: Array<{
    id: string
    name: string
    thumbnailUrl: string
    downloadUrl: string
    status: 'vortex' | 'manual' | 'downloaded'  // or similar
  }>
  userTier: 'member' | 'premium'
  downloadMethod: 'vortex' | 'manual'
}
```

### 7.2 Derived UI

- `requiredFiles.length` → "n additional file(s) required" copy.
- `userTier === 'member'` → Show Premium upsell banner.
- `userTier === 'premium'` → Show Vortex status banner.
- `downloadMethod === 'manual' && userTier === 'member'` → Show "Want to try Vortex?" footer.

---

## 8. Assets & Icons

| Asset | Purpose |
|-------|---------|
| Vortex logo | Status icon for "set in Vortex" |
| Download icon | Status/action for manual download |
| Close (X) icon | Modal close |
| Checkbox (unchecked/checked) | Acknowledgment |

Use existing Nexus Mods iconography. Check `Icon` component or design system for available icons.

---

## 9. Links & URLs

| Element | URL (placeholder) |
|---------|-------------------|
| Get Premium | `/premium` or production Premium signup |
| Find out more (Vortex) | `https://www.nexusmods.com/site/mods/1` or Vortex landing |
| Download (main mod) | From `mod.downloadUrl` |
| Download (dependency) | From `requiredFile.downloadUrl` |

---

## 10. Accessibility

- **Focus trap:** When modal opens, focus first focusable element (or close button). Trap focus inside modal.
- **Escape:** Close modal on Escape key.
- **aria-modal="true"** and **role="dialog"** on modal container.
- **aria-labelledby** pointing to modal title.
- **aria-describedby** for dependency count if helpful.
- Checkbox: proper `label` association, keyboard operable.
- All links: `target="_blank"` + `rel="noopener noreferrer"` where external.

---

## 11. Optional vs Required

| Element | Required? | Notes |
|---------|-----------|-------|
| "Download all" button | No | PM checking feasibility; omit for Stage 1 if not feasible |
| Click-outside-to-close | Optional | UX preference |
| Tracked dependencies | No | Not in Stage 1 |
| Light theme | Yes | Via token inversion |

---

## 12. Implementation Prompt (for AI / Developer)

Use the following when handing to a frontend developer or AI:

---

**PROMPT: Build Download Mod File Modal**

```
Implement the Download Mod File modal from the Figma design and this spec.

**Figma:** https://www.figma.com/design/n73aYm56Z857ksQzzpqz3c/Mod-Upload-Form?node-id=3741-29918&m=dev

**Instructions:**
1. **Tokens:** Use our design system tokens (surface-base, primary-moderate, neutral-strong, etc.). No hardcoded hex values.

2. **Structure:** Modal with header (title + close), main mod info + Download button, status banner (Member upsell or Premium Vortex), required files list (scrollable), acknowledgment checkbox, primary Download (enabled when checked), optional footer CTA for Member + Manual.

3. **Logic:** 
   - userTier (member/premium) and downloadMethod (vortex/manual) drive which banners and footer show.
   - Checkbox must be checked to enable primary Download.
   - Modal closes on X or Escape.

4. **Components:** Use our existing Button, Typography, Icon. Create a reusable Modal/Dialog wrapper if we don't have one. Use our mod-page patterns for consistency.

5. **Data:** Accept mod + requiredFiles + userTier + downloadMethod as props. Wire to real API when available; use mock data for now.

6. **Accessibility:** Focus trap, Escape to close, aria-modal, proper labels.

7. **Responsive:** Modal scales; list scrolls when many dependencies (e.g. max-height 320px).
```

---

## 13. Handover Checklist

- [ ] Figma link shared with developer
- [ ] This spec attached to ticket
- [ ] Production token mapping confirmed (or design system link)
- [ ] API/data shape agreed with backend (or mock for Stage 1)
- [ ] "Download all" feasibility confirmed (include or omit)
- [ ] QA: All four user journeys (Member/Premium × Vortex/Manual)
- [ ] QA: Checkbox enable/disable
- [ ] QA: Focus trap, Escape, screen reader
- [ ] QA: Responsive, scroll behavior

---

## 14. Contact & Questions

For design intent, copy, or product logic, contact the product owner. For technical questions about the spec, refer to this document and the Figma file.
