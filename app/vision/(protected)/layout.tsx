import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  VISION_GATE_COOKIE,
  getVisionGateToken,
  isVisionGateConfigured,
} from '@/lib/vision-gate'

/** Node runtime reads env reliably on Vercel; complements Edge middleware if env is missing there. */
export const dynamic = 'force-dynamic'

export default async function ProtectedVisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!isVisionGateConfigured()) {
    if (process.env.NODE_ENV === 'development') {
      return children
    }
    redirect('/vision/login')
  }

  const expected = await getVisionGateToken()
  if (!expected) {
    redirect('/vision/login')
  }

  const cookie = cookies().get(VISION_GATE_COOKIE)?.value
  if (cookie !== expected) {
    redirect(`/vision/login?next=${encodeURIComponent('/vision')}`)
  }

  return children
}
