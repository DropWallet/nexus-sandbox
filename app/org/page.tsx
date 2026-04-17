import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { OrgChartBoard } from '@/components/org-chart/OrgChartBoard'
import { OrgChartCanvas } from '@/components/org-chart/OrgChartCanvas'

export const metadata: Metadata = {
  title: 'Org chart | Nexus Mods',
  description: 'Nexus Mods organisation chart for 2026.',
}

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
})

export default function OrgPage() {
  return (
    <OrgChartCanvas>
      <OrgChartBoard headingFontClass={interTight.className} />
    </OrgChartCanvas>
  )
}
