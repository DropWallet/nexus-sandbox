'use client'

import { cn } from '@/lib/utils'
import { OrgDepartmentProvider } from './OrgDepartmentContext'
import { OrgPersonCard } from './OrgPersonCard'

const branchTitle =
  'flex min-w-0 flex-1 items-center justify-center bg-[#431407] px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

const podTitle =
  'flex w-full items-center justify-center rounded-xl border border-stroke-neutral-translucent-weak bg-surface-low px-3 pb-2 pt-3 text-[18px] font-semibold leading-[1.25] text-[rgba(255,255,255,0.7)]'

export function Platform({ headingFontClass }: { headingFontClass: string }) {
  return (
    <OrgDepartmentProvider value="platform">
    <div className="flex w-[1264px] shrink-0 flex-col gap-4">
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-[#fb923c] bg-[#7c2d12] px-3 pb-2 pt-3">
        <p
          className={cn(
            'whitespace-nowrap text-[24px] font-medium leading-[1.5] text-orange-200',
            headingFontClass
          )}
        >
          Platform
        </p>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className={branchTitle}>Platform engineering</div>
        <div className={branchTitle}>Platform product</div>
      </div>
      <div className="flex flex-row items-start gap-4">
        {/* Platform engineering pod */}
        <div className="flex w-[304px] flex-col gap-4">
          <div className={podTitle}>Platform engineering</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Head of PE"
              name="Dean"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Infrastructure architect"
              name="Joe"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Platform engineer"
              name="Mike G"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
            <OrgPersonCard
              role="Platform engineer"
              name="Josh C"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Platform engineer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="IT support specialist"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
          </div>
        </div>
        {/* Trust & safety */}
        <div className="flex w-[304px] flex-col gap-4">
          <div className={podTitle}>Trust &amp; safety</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role={'Trust & safety'}
              name="Charlie"
              shellClassName="border-2 border-[#47fc2b] bg-surface-low"
            />
            <OrgPersonCard
              role="Customer support"
              name="Dom"
              shellClassName="border-2 border-[#47fc2b] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Customer support"
              name="Kurtis"
              shellClassName="border-2 border-[#47fc2b] bg-surface-low"
            />
            <OrgPersonCard
              role="Customer support"
              name="David"
              shellClassName="border-2 border-[#47fc2b] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Customer support"
              name="Adam"
              shellClassName="border-2 border-[#47fc2b] bg-surface-low"
            />
            <OrgPersonCard
              role="Community manager"
              name="Max"
              shellClassName="border-2 border-[#fdba74] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Community manager"
              name="Mark"
              shellClassName="border-2 border-[#fdba74] bg-surface-low"
            />
          </div>
        </div>
        {/* Business services */}
        <div className="flex w-[304px] flex-col gap-4">
          <div className={podTitle}>Business services</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Business operations"
              name="Russel"
              shellClassName="border-2 border-[#d5fc2b] bg-surface-low"
            />
            <OrgPersonCard
              role="Exec assistant"
              name="Britt"
              shellClassName="border-2 border-[#d5fc2b] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Office Manager"
              name="Julie"
              shellClassName="border-2 border-[#d5fc2b] bg-surface-low"
            />
            <OrgPersonCard
              role="Finance manager"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Talent Acquisition"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
          </div>
        </div>
        {/* Orange box pod */}
        <div className="flex w-[304px] flex-col gap-4">
          <div className={podTitle}>Orange box pod</div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Product manager"
              name="Luke"
              shellClassName="border-2 border-[#60a5fa] bg-surface-low"
            />
            <OrgPersonCard
              role="Tech lead"
              name="Rory J"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
            />
          </div>
          <div className="flex flex-row gap-4">
            <OrgPersonCard
              role="Product designer"
              name="In progress"
              variant="in-progress"
              shellClassName="border-2 border-dashed border-stroke-neutral-translucent-moderate bg-transparent"
            />
            <OrgPersonCard
              role="Backend engineer"
              name="Toby"
              shellClassName="border-2 border-[#ea580c] bg-surface-low"
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
              role="QA engineer"
              name="Marcin"
              shellClassName="border-2 border-[#f83cfb] bg-surface-low"
            />
          </div>
        </div>
      </div>
    </div>
    </OrgDepartmentProvider>
  )
}
