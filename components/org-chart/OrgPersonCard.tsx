'use client'

import { cn } from '@/lib/utils'
import { accentTooltipFromShell, pillarTooltipMeta } from './org-legend'
import { useOrgDepartment } from './OrgDepartmentContext'

const DEFAULT_ORG_LOGO = '/org/nexus-logo.svg'

type OrgPersonCardProps = {
  role: string
  name: string
  /** Figma “filled” vs dashed “In progress” cards */
  variant?: 'filled' | 'in-progress'
  showLogo?: boolean
  /** Overrides the default Nexus Mods mark (`/org/nexus-logo.svg`), e.g. `/org/chosen.svg`. */
  logoSrc?: string
  /** Full shell styles from Figma (border, bg, layout) */
  shellClassName: string
}

export function OrgPersonCard({
  role,
  name,
  variant = 'filled',
  showLogo = true,
  logoSrc,
  shellClassName,
}: OrgPersonCardProps) {
  const isProgress = variant === 'in-progress'
  const pillarKey = useOrgDepartment()
  const accent = accentTooltipFromShell(shellClassName)
  const pillar = pillarKey ? pillarTooltipMeta(pillarKey) : null
  const tip = accent ?? pillar

  const src =
    !showLogo ? null : logoSrc != null && logoSrc !== '' ? logoSrc : DEFAULT_ORG_LOGO
  const mark =
    src != null ? (
      <img
        src={src}
        alt=""
        className={cn('h-6 w-6 shrink-0 object-contain', isProgress && 'opacity-45')}
      />
    ) : null

  const roleClass = cn(
    'w-full min-w-0 leading-[1.2]',
    isProgress ? 'text-neutral-weak' : 'text-neutral-subdued'
  )

  const roleBlock =
    tip != null ? (
      <span className="group/role relative flex w-full justify-center">
        <p className={cn(roleClass, 'cursor-default')}>{role}</p>
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-1/2 z-[80] -translate-x-1/2',
            'bottom-[calc(100%+6px)]',
            'opacity-0 transition-opacity duration-150',
            'group-hover/role:opacity-100',
            'max-w-[min(240px,70vw)]'
          )}
        >
          <span className="flex items-center gap-2 rounded-md border border-stroke-neutral-translucent-weak bg-surface-low/98 px-2.5 py-1.5 text-left text-xs font-medium leading-snug text-neutral-strong shadow-xl backdrop-blur-sm">
            <span className={cn('size-2.5 shrink-0 rounded-sm', tip.swatchClass)} aria-hidden />
            <span className="whitespace-normal">{tip.label}</span>
          </span>
        </span>
      </span>
    ) : (
      <p className={roleClass}>{role}</p>
    )

  return (
    <div
      className={cn(
        'flex h-[107px] w-[144px] flex-col items-center gap-2 rounded-xl px-3 pb-2 pt-3 text-center text-[14px]',
        shellClassName
      )}
    >
      {mark}
      <div className="flex w-full flex-col items-center not-italic">
        {roleBlock}
        <p
          className={cn(
            'whitespace-nowrap font-semibold leading-[1.5]',
            isProgress ? 'text-neutral-subdued' : 'text-neutral-strong'
          )}
        >
          {name}
        </p>
      </div>
    </div>
  )
}
