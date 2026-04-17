'use client'

import { cn } from '@/lib/utils'
import { OrgDepartmentProvider } from './OrgDepartmentContext'
import { OrgPersonCard } from './OrgPersonCard'

const subTitle =
  'flex flex-1 items-center justify-center rounded-lg bg-[#2e1065] px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

const podTitle =
  'flex w-full items-center justify-center rounded-xl border border-stroke-neutral-translucent-weak bg-surface-low px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

export function Growth({ headingFontClass }: { headingFontClass: string }) {
  return (
    <OrgDepartmentProvider value="growth">
    <div className="flex w-[464px] shrink-0 flex-col gap-4">
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-[#7c3aed] bg-[#4c1d95] px-3 pb-2 pt-3">
        <p
          className={cn(
            'whitespace-nowrap text-[24px] font-medium leading-[1.5] text-violet-200',
            headingFontClass
          )}
        >
          Growth
        </p>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className={subTitle}>Monetisation</div>
        <div className={subTitle}>Ecosystems</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className={podTitle}>Pod</div>
        <div className="flex flex-row gap-4">
          <OrgPersonCard
            role="Tech lead"
            name="Rory C"
            shellClassName="border-2 border-[#ea580c] bg-surface-low"
          />
          <OrgPersonCard
            role="Product manager"
            name="In progress"
            variant="in-progress"
            shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
          />
          <OrgPersonCard
            role="Product designer"
            name="Edina?"
            shellClassName="border-2 border-[#6ee7b7] bg-surface-low"
          />
        </div>
        <div className="flex flex-row gap-4">
          <OrgPersonCard
            role="Frontend engineer"
            name="Ryan"
            shellClassName="border-2 border-[#ea580c] bg-surface-low"
          />
          <OrgPersonCard
            role="Backend engineer"
            name="James A"
            shellClassName="border-2 border-[#ea580c] bg-surface-low"
          />
          <OrgPersonCard
            role="QA engineer"
            name="Nathan"
            shellClassName="border-2 border-[#f83cfb] bg-surface-low"
          />
        </div>
        <div className="flex flex-row gap-4">
          <OrgPersonCard
            role="Growth manager"
            name="Rasmus"
            shellClassName="border-2 border-[#ea580c] bg-surface-low"
          />
          <OrgPersonCard
            role="Content creator"
            name="Sarah F"
            shellClassName="border-2 border-[#2dd4bf] bg-surface-low"
          />
          <OrgPersonCard
            role="Content creator"
            name="Jack E"
            shellClassName="border-2 border-[#2dd4bf] bg-surface-low"
          />
        </div>
        <div className="flex flex-row gap-4">
          <OrgPersonCard
            role="Content creator"
            name="Tristan"
            shellClassName="border-2 border-[#2dd4bf] bg-surface-low"
          />
          <OrgPersonCard
            role="Content creator"
            name="In progress"
            variant="in-progress"
            shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
          />
          <OrgPersonCard
            role="Community manager"
            name="Mike W"
            shellClassName="border-2 border-[#fdba74] bg-surface-low"
          />
        </div>
        <div className="flex flex-row gap-4">
          <OrgPersonCard
            role="Community manager"
            name="In progress"
            variant="in-progress"
            shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
          />
          <OrgPersonCard
            role="Community manager"
            name="In progress"
            variant="in-progress"
            shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
          />
        </div>
      </div>
    </div>
    </OrgDepartmentProvider>
  )
}
