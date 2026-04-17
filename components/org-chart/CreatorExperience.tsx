'use client'

import { cn } from '@/lib/utils'
import { OrgDepartmentProvider } from './OrgDepartmentContext'
import { OrgPersonCard } from './OrgPersonCard'

const subTitle =
  'flex flex-1 items-center justify-center rounded-lg bg-[#042f2e] px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

const podTitle =
  'flex w-full items-center justify-center rounded-xl border border-stroke-neutral-translucent-weak bg-surface-low px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

export function CreatorExperience({ headingFontClass }: { headingFontClass: string }) {
  return (
    <OrgDepartmentProvider value="creator">
    <div className="flex w-[944px] shrink-0 flex-col gap-4">
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-[#2dd4bf] bg-[#134e4a] px-3 pb-2 pt-3">
        <p
          className={cn(
            'whitespace-nowrap text-[24px] font-medium leading-[1.5] text-teal-200',
            headingFontClass
          )}
        >
          Creator experience
        </p>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className={subTitle}>Win creators and communities</div>
        <div className={subTitle}>Keep existing creators happy & healthy</div>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-[464px] flex-col gap-4">
          <div className={podTitle}>Pod</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Tech lead"
              name="Josh D"
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
              name="Cam"
              shellClassName="border-2 border-[#6ee7b7] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Frontend engineer"
              name="Tom N"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="Ashley"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="Name"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Backend engineer"
              name="Elle"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="App engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="QA engineer"
              name="Michael F"
              shellClassName="border-2 border-[#f83cfb] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Content creator"
              name="Sarah F"
              shellClassName="border-2 border-[#2dd4bf] bg-surface-low"
            />
            <OrgPersonCard
              role="Community manager"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
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
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
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
              role="Backend engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
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
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="QA engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
          </div>
          <div className="flex flex-row gap-4">
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
