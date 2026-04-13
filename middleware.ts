import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { VISION_GATE_COOKIE, getVisionGateToken, isVisionGateConfigured } from '@/lib/vision-gate'

function isVisionLandingPath(pathname: string): boolean {
  return pathname === '/vision' || pathname === '/vision/'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isVisionLandingPath(pathname)) {
    return NextResponse.next()
  }

  const isDev = process.env['NODE_ENV'] === 'development'

  if (!isVisionGateConfigured()) {
    if (isDev) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/vision/login', request.url))
  }

  const expected = await getVisionGateToken()
  if (!expected) {
    return NextResponse.redirect(new URL('/vision/login', request.url))
  }

  const cookie = request.cookies.get(VISION_GATE_COOKIE)?.value
  if (cookie === expected) {
    return NextResponse.next()
  }

  const login = new URL('/vision/login', request.url)
  login.searchParams.set('next', '/vision')
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/vision', '/vision/'],
}
