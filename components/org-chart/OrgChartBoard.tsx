import { cn } from '@/lib/utils'
import { CreatorExperience } from './CreatorExperience'
import { Growth } from './Growth'
import { Leadership } from './Leadership'
import { Platform } from './Platform'
import { PlayerExperience } from './PlayerExperience'

type OrgChartBoardProps = {
  headingFontClass: string
}

export function OrgChartBoard({ headingFontClass }: OrgChartBoardProps) {
  return (
    <div
      className={cn(
        'box-border min-h-[1538px] w-[3980px] bg-surface-base pb-24 pl-[122px] pr-[122px] pt-16 text-neutral-strong antialiased'
      )}
    >
      <h1
        className={cn(
          'text-center text-[32px] font-medium leading-[1.2] tracking-tight text-neutral-strong',
          headingFontClass
        )}
      >
        Nexus Mods Org Chart — 2026
      </h1>
      <div className="mt-14 flex justify-center">
        <Leadership headingFontClass={headingFontClass} />
      </div>
      <div className="mt-[47px] flex w-full flex-row flex-nowrap justify-center gap-10">
        <CreatorExperience headingFontClass={headingFontClass} />
        <PlayerExperience headingFontClass={headingFontClass} />
        <Growth headingFontClass={headingFontClass} />
        <Platform headingFontClass={headingFontClass} />
      </div>
    </div>
  )
}
