'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import { cn } from '@/lib/utils'

function VisionLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const nextPath = searchParams.get('next') ?? '/vision'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const res = await fetch('/api/vision/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setError(data.error ?? 'Wrong password')
        setPending(false)
        return
      }
      router.replace(nextPath.startsWith('/') ? nextPath : '/vision')
      router.refresh()
    } catch {
      setError('Something went wrong')
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-base px-[var(--spacing-10)] py-[var(--spacing-12)]">
      <div className="w-full max-w-[400px] rounded-xl border border-stroke-neutral-translucent-weak bg-black p-[var(--spacing-8)]">
        <Typography variant="heading-lg" as="h1" className="mb-2 text-neutral-strong">
          Vision page
        </Typography>
        <p className={cn('mb-6 text-[15px] leading-snug text-neutral-subdued')}>
          Enter the password to continue.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-subdued">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-base border border-stroke-neutral-translucent-subdued bg-surface-base px-3 py-2 text-neutral-strong outline-none focus:border-stroke-neutral-translucent-moderate"
              disabled={pending}
            />
          </label>
          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" variant="primary" disabled={pending || !password}>
            {pending ? 'Checking…' : 'Continue'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function VisionLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface-base text-neutral-subdued">
          Loading…
        </div>
      }
    >
      <VisionLoginForm />
    </Suspense>
  )
}
