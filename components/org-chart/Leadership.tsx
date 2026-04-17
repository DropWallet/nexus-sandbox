'use client'

import { cn } from '@/lib/utils'
import { OrgDepartmentProvider } from './OrgDepartmentContext'
import { OrgPersonCard } from './OrgPersonCard'

function SectionBar({
  children,
  headingFontClass,
}: {
  children: React.ReactNode
  headingFontClass: string
}) {
  return (
    <div className="flex w-full items-center justify-center rounded-xl border border-stroke-neutral-translucent-weak bg-surface-low px-3 pb-2 pt-3">
      <span
        className={cn(
          'whitespace-nowrap text-[24px] font-medium leading-[1.5] text-neutral-strong',
          headingFontClass
        )}
      >
        {children}
      </span>
    </div>
  )
}

export function Leadership({ headingFontClass }: { headingFontClass: string }) {
  return (
    <OrgDepartmentProvider value="leadership">
    <div className="flex w-[1104px] shrink-0 flex-col items-center gap-[47px]">
      <div className="flex w-[464px] flex-col gap-4">
        <SectionBar headingFontClass={headingFontClass}>C-Suite</SectionBar>
        <div className="flex w-full flex-row gap-4">
          <OrgPersonCard
            role="CEO"
            name="Victor"
            logoSrc="/org/chosen.svg"
            shellClassName="border-2 border-stroke-neutral-translucent-weak bg-surface-low"
          />
          <OrgPersonCard
            role="CEO"
            name="Marinus"
            logoSrc="/org/chosen.svg"
            shellClassName="border-2 border-stroke-neutral-translucent-weak bg-surface-low"
          />
          <OrgPersonCard
            role="General manager"
            name="Greg"
            logoSrc="/org/nexus-logo.svg"
            shellClassName="border-2 border-stroke-neutral-translucent-weak bg-surface-low"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <SectionBar headingFontClass={headingFontClass}>Directors</SectionBar>
        <div className="flex w-full flex-row flex-wrap gap-4">
          <OrgPersonCard
            role="Data director"
            name="Dennis"
            logoSrc="/org/chosen.svg"
            shellClassName="border-2 border-[#ea580c] bg-surface-low"
          />
          <OrgPersonCard
            role="Finance director"
            name="Alexander"
            logoSrc="/org/chosen.svg"
            shellClassName="border-2 border-[#d5fc2b] bg-surface-low"
          />
          <OrgPersonCard
            role="Product director"
            name="Lyra"
            logoSrc="/org/nexus-logo.svg"
            shellClassName="border-2 border-[#60a5fa] bg-surface-low"
          />
          <OrgPersonCard
            role="Product director"
            name="Sonya"
            logoSrc="/org/nexus-logo.svg"
            shellClassName="border-2 border-[#60a5fa] bg-surface-low"
          />
          <OrgPersonCard
            role="Design director"
            name="Stevie"
            logoSrc="/org/nexus-logo.svg"
            shellClassName="border-2 border-[#6ee7b7] bg-surface-low"
          />
          <OrgPersonCard
            role={'People & Culture director'}
            name="Em"
            logoSrc="/org/nexus-logo.svg"
            shellClassName="border-2 border-[#d5fc2b] bg-surface-low"
          />
          <OrgPersonCard
            role="Commercial Director"
            name="In progress"
            variant="in-progress"
            logoSrc="/org/nexus-logo.svg"
            shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
          />
        </div>
      </div>
    </div>
    </OrgDepartmentProvider>
  )
}
