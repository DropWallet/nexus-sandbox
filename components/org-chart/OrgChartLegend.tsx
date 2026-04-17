'use client'

import { cn } from '@/lib/utils'
import { ORG_LEGEND_ROWS } from './org-legend'

export function OrgChartLegend() {
  return (
    <aside
      className="pointer-events-auto fixed left-4 top-4 z-50 w-[min(220px,calc(100vw-2rem))] rounded-lg border border-stroke-neutral-translucent-weak bg-surface-low/95 p-3 shadow-lg backdrop-blur-sm"
      onPointerDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      aria-label="Department colour key"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-subdued">Key</p>
      <ul className="mt-2.5 max-h-[min(420px,calc(100dvh-6rem))] space-y-2 overflow-y-auto pr-0.5">
        {ORG_LEGEND_ROWS.map((row) => (
          <li key={row.label} className="flex items-center gap-2.5 text-sm leading-tight text-neutral-strong">
            <span className={cn('size-2.5 shrink-0 rounded-sm', row.swatchClass)} aria-hidden />
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
