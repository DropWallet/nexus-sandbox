'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Fills the cqw-sized pill box from the parent. */
function OrbitPillImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
      className="pointer-events-none block h-full w-full max-w-none object-contain select-none"
      aria-hidden
    />
  )
}

const INNER_NODES = [
  { src: '/vision/node-player.svg', alt: 'Players' },
  { src: '/vision/node-launcher.svg', alt: 'Launcher' },
  { src: '/vision/node-creator.svg', alt: 'Creators' },
  { src: '/vision/node-market.svg', alt: 'Market' },
] as const

const OUTER_NODES = [
  { src: '/vision/node-publishers.svg', alt: 'Publishers' },
  { src: '/vision/node-identity-layer.svg', alt: 'Identity layer' },
  { src: '/vision/node-content.svg', alt: 'Content' },
  { src: '/vision/node-game-servers.svg', alt: 'Game servers' },
] as const

const INNER_DURATION_SEC = 110
const OUTER_DURATION_SEC = 85

const PILL_W = 66
const PILL_H = 48
const LOGO_PX = 48

/** Design width (px) — orbit math is defined against this; live size uses cqw so it tracks the real box. */
const BASE_W = 614

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * translate() offsets using cqw so positions match `rotate(θ) translateY(-r)` at any width with no resize flash.
 * 100cqw = full diagram width; kx = -100*sin(θ)*r/BASE_W positions the orbit in cqw units.
 */
function pillTransform(angleDeg: number, radiusDesignPx: number): string {
  const rad = (angleDeg * Math.PI) / 180
  const kx = (-100 * Math.sin(rad) * radiusDesignPx) / BASE_W
  const ky = (-100 * Math.cos(rad) * radiusDesignPx) / BASE_W
  return `translate(calc(-50% + ${kx}cqw), calc(-50% + ${ky}cqw))`
}

const R_INNER = 144
const R_OUTER = 224
const RING_INNER = 288
const RING_OUTER = 448

type OrbitNodesProps = {
  radiusDesignPx: number
  reverse: boolean
  durationSec: number
  nodes: readonly { src: string; alt: string }[]
  startDeg: number
  stepDeg: number
  reducedMotion: boolean
  className?: string
}

function OrbitNodes({
  radiusDesignPx,
  reverse,
  durationSec,
  nodes,
  startDeg,
  stepDeg,
  reducedMotion,
  className,
}: OrbitNodesProps) {
  const spinStyle = reducedMotion
    ? undefined
    : ({
        animation: `vision-orbit-spin ${durationSec}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
      } as const)

  const counterStyle = reducedMotion
    ? undefined
    : ({
        animation: `vision-orbit-spin ${durationSec}s linear infinite`,
        animationDirection: reverse ? 'normal' : 'reverse',
      } as const)

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-visible',
        className
      )}
      style={spinStyle}
    >
      {nodes.map((node, i) => {
        const angleDeg = startDeg + i * stepDeg
        return (
          <div
            key={node.src}
            className="absolute left-1/2 top-1/2 z-[1] flex items-center justify-center"
            style={{
              width: `calc(${PILL_W} * 100cqw / ${BASE_W})`,
              height: `calc(${PILL_H} * 100cqw / ${BASE_W})`,
              transform: pillTransform(angleDeg, radiusDesignPx),
            }}
          >
            <div
              className="relative flex h-full w-full items-center justify-center"
              style={counterStyle}
            >
              <OrbitPillImg src={node.src} alt="" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function VisionOrbitDiagram() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div
      className={cn(
        'vision-orbit-diagram relative mx-auto w-full max-w-[1012px]',
        /* Vertical space ≈ 75% of unscaled 614×448 (448×0.75=336); inner uses scale-75 */
        'aspect-[614/336] flex min-h-[160px] items-center justify-center overflow-visible sm:min-h-[200px]'
      )}
      role="img"
      aria-label="Diagram: Nexus launcher at the centre with inner orbit Players, Launcher, Creators, Market and outer orbit Publishers, Identity layer, Content, Game servers."
    >
      {/* Orbit + rings at 75% scale; logo stays full size (sibling, not inside this wrapper). */}
      <div
        className={cn(
          'relative w-full max-w-[1012px] origin-center scale-75 [container-type:inline-size]',
          'aspect-[614/448]'
        )}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3f3f3f]/70"
          style={{
            width: `calc(${RING_OUTER} * 100cqw / ${BASE_W})`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3f3f3f]/70"
          style={{
            width: `calc(${RING_INNER} * 100cqw / ${BASE_W})`,
          }}
          aria-hidden
        />

        <OrbitNodes
          className="z-[1]"
          radiusDesignPx={R_OUTER}
          reverse
          durationSec={OUTER_DURATION_SEC}
          nodes={OUTER_NODES}
          startDeg={-45}
          stepDeg={90}
          reducedMotion={reducedMotion}
        />

        <OrbitNodes
          className="z-[2]"
          radiusDesignPx={R_INNER}
          reverse={false}
          durationSec={INNER_DURATION_SEC}
          nodes={INNER_NODES}
          startDeg={-90}
          stepDeg={90}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/vision/logo-diagram.svg"
          alt=""
          width={LOGO_PX}
          height={LOGO_PX}
          className="h-12 w-12 shrink-0 select-none"
          priority
        />
      </div>
    </div>
  )
}
