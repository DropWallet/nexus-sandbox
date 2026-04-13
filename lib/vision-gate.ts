/**
 * Stateless gate for /vision: cookie value = HMAC-SHA256(VISION_AUTH_SECRET, VISION_PAGE_PASSWORD).
 * Same token is recomputed in middleware (Edge) and set after unlock in the API route.
 */
export const VISION_GATE_COOKIE = 'vision_gate'

function base64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!)
  const b64 = btoa(binary)
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Bracket access avoids Next/Edge replacing `process.env.FOO` with build-time values (empty on Vercel Edge). */
function visionAuthSecret(): string | undefined {
  return process.env['VISION_AUTH_SECRET']
}

function visionPagePassword(): string | undefined {
  return process.env['VISION_PAGE_PASSWORD']
}

export async function getVisionGateToken(): Promise<string | null> {
  const secret = visionAuthSecret()
  const password = visionPagePassword()
  if (!secret || !password) return null
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(password))
  return base64Url(new Uint8Array(sig))
}

export function isVisionGateConfigured(): boolean {
  return Boolean(visionAuthSecret() && visionPagePassword())
}
