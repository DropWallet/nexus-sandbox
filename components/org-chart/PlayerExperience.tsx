'use client'

import { cn } from '@/lib/utils'
import { OrgDepartmentProvider } from './OrgDepartmentContext'
import { OrgPersonCard } from './OrgPersonCard'

const subTitle =
  'flex flex-1 items-center justify-center rounded-lg bg-[#172554] px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

const podTitle =
  'flex w-full items-center justify-center rounded-xl border border-stroke-neutral-translucent-weak bg-surface-low px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

export function PlayerExperience({ headingFontClass }: { headingFontClass: string }) {
  return (
    <OrgDepartmentProvider value="player">
    <div className="flex w-[944px] shrink-0 flex-col gap-4">
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-[#60a5fa] bg-[#1e3a8a] px-3 pb-2 pt-3">
        <p
          className={cn(
            'whitespace-nowrap text-[24px] font-medium leading-[1.5] text-blue-200',
            headingFontClass
          )}
        >
          Player experience
        </p>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className={subTitle}>Activation</div>
        <div className={subTitle}>Retention</div>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-[464px] flex-col gap-4">
          <div className={podTitle}>Pod</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Tech lead"
              name="Jack R"
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
              name="Laurence"
              shellClassName="border-2 border-[#6ee7b7] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Frontend engineer"
              name="Rich"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="Gabriel"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="Elle"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Backend engineer"
              name="Hugo"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="App engineer"
              name="Tim"
              shellClassName="border-2 border-[#3f3cfb] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="App engineer"
              name="Adrian"
              shellClassName="border-2 border-[#3f3cfb] bg-surface-low"
            />
            <OrgPersonCard
              role="App engineer"
              name="Vitalii"
              shellClassName="border-2 border-[#3f3cfb] bg-surface-low"
            />
            <OrgPersonCard
              role="QA engineer"
              name="Chris"
              shellClassName="border-2 border-[#f83cfb] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Content creator"
              name="Jack E"
              shellClassName="border-2 border-[#2dd4bf] bg-surface-low"
            />
            <OrgPersonCard
              role="Community manager"
              name="Mark"
              shellClassName="border-2 border-[#fdba74] bg-surface-low"
            />
          </div>
        </div>
        <div className="flex w-[464px] flex-col gap-4">
          <div className={podTitle}>Pod</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Tech lead"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="Product manager"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="Product designer"
              name="Stefan"
              shellClassName="border-2 border-[#6ee7b7] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Frontend engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="Hugo"
              name="Gabriel"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Backend engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="App engineer"
              name="Florian"
              shellClassName="border-2 border-[#3f3cfb] bg-surface-low"
            />
            <OrgPersonCard
              role="App engineer"
              name="Seweryn"
              shellClassName="border-2 border-[#3f3cfb] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="App engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="Content creator"
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
    </div>
    </OrgDepartmentProvider>
  )
}
