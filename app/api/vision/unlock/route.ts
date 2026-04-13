import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { VISION_GATE_COOKIE, getVisionGateToken, isVisionGateConfigured } from '@/lib/vision-gate'

export async function POST(request: Request) {
  if (!isVisionGateConfigured()) {
    return NextResponse.json({ error: 'Vision gate is not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const password = typeof body === 'object' && body !== null && 'password' in body ? (body as { password: unknown }).password : undefined
  if (typeof password !== 'string') {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  const expected = process.env['VISION_PAGE_PASSWORD'] ?? ''
  const a = Buffer.from(password, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = await getVisionGateToken()
  if (!token) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 503 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: VISION_GATE_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
