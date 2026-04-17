/** Pillar context for in-progress / neutral cards (no accent hex). */
// Department key + border accents: Figma Vision — Frame 28 / node 50-5653 (child of org frame 45-1745).
export type OrgDepartmentKey = 'leadership' | 'creator' | 'player' | 'growth' | 'platform'

const PILLAR_LABEL: Record<OrgDepartmentKey, string> = {
  leadership: 'Leadership',
  creator: 'Creator experience',
  player: 'Player experience',
  growth: 'Growth',
  platform: 'Platform',
}

const PILLAR_SWATCH: Record<OrgDepartmentKey, string> = {
  leadership: 'bg-zinc-400 ring-1 ring-inset ring-white/15',
  creator: 'bg-[#2dd4bf]',
  player: 'bg-[#60a5fa]',
  growth: 'bg-[#7c3aed]',
  platform: 'bg-[#fb923c]',
}

/**
 * Figma key order (50:5653). Hexes match Vision swatches / card borders for tooltips.
 * Engineering orange · Product sky blue · Designer mint · Content designer cyan ·
 * Community peach · QA pink · App indigo · Trust & safety lime · Business ops chartreuse.
 */
export const ORG_LEGEND_ROWS: readonly { label: string; swatchClass: string }[] = [
  { label: 'Engineering', swatchClass: 'bg-[#ea580c]' },
  { label: 'Product', swatchClass: 'bg-[#60a5fa]' },
  { label: 'Designer', swatchClass: 'bg-[#6ee7b7]' },
  { label: 'Content designer', swatchClass: 'bg-[#2dd4bf]' },
  { label: 'Community', swatchClass: 'bg-[#fdba74]' },
  { label: 'QA', swatchClass: 'bg-[#f83cfb]' },
  { label: 'App', swatchClass: 'bg-[#3f3cfb]' },
  { label: 'Trust & safety', swatchClass: 'bg-[#47fc2b]' },
  { label: 'Business ops', swatchClass: 'bg-[#d5fc2b]' },
]

const ACCENT_BY_HEX: Record<string, { label: string; swatchClass: string }> = {}
for (const row of ORG_LEGEND_ROWS) {
  const m = row.swatchClass.match(/#([0-9a-f]{6})/i)
  if (!m) continue
  const hex = `#${m[1].toLowerCase()}`
  ACCENT_BY_HEX[hex] = row
}

export function pillarTooltipMeta(key: OrgDepartmentKey) {
  return { label: PILLAR_LABEL[key], swatchClass: PILLAR_SWATCH[key] }
}

export function parseCardAccentHex(shellClassName: string): string | null {
  const m = shellClassName.match(/border-\[#([0-9a-fA-F]{6})\]/i)
  if (!m) return null
  return `#${m[1].toLowerCase()}`
}

export function accentTooltipFromShell(shellClassName: string): { label: string; swatchClass: string } | null {
  const hex = parseCardAccentHex(shellClassName)
  if (!hex) return null
  const row = ACCENT_BY_HEX[hex]
  if (row) return { label: row.label, swatchClass: row.swatchClass }
  return { label: 'Team', swatchClass: `bg-[${hex}]` }
}
