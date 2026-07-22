'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/** Cluster bounds from Figma grid 336:9111 (Isometric Cube nodes). */
const WORDMARK_STAGE = { width: 650, height: 374 } as const
/** Larger playfield so scatter stays on-canvas without flying into the copy below. */
const PLAY_STAGE = { width: 820, height: 520 } as const
const CUBE_SIZE = { width: 100, height: 116 } as const

const WORDMARK_OFFSET = {
  x: (PLAY_STAGE.width - WORDMARK_STAGE.width) / 2,
  y: (PLAY_STAGE.height - WORDMARK_STAGE.height) / 2,
} as const

/** Figma cluster origin — leftmost/topmost cube at (750, 87) in grid space. */
const FIGMA_ORIGIN = { x: 750, y: 87 } as const

type CubeId =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'

type CubePose = {
  left: number
  top: number
  rotate: number
}

type Cube = {
  id: CubeId
  src: string
  /** Wordmark home, in play-stage coordinates */
  home: CubePose
  drop: { x: string; y: string; r: string }
  kick: { x: string; y: string; r: string }
}

/** Absolute Figma positions → cluster-relative, then centered in play stage. */
function homeFromFigma(x: number, y: number): CubePose {
  return {
    left: x - FIGMA_ORIGIN.x + WORDMARK_OFFSET.x,
    top: y - FIGMA_ORIGIN.y + WORDMARK_OFFSET.y,
    rotate: 0,
  }
}

function cubeSrc(id: CubeId) {
  return `/cubes/cube-new${id}.png`
}

/**
 * Positions from Figma node 336:9111.
 * Named Isometric Cube01–09 → cube-new01–09.
 * Remaining Isometric Cube instances → cube-new10–16 (LTR / top-to-bottom).
 */
const CUBES: Cube[] = [
  // Top row
  {
    id: '16',
    src: cubeSrc('16'),
    home: homeFromFigma(800, 87),
    drop: { x: '6%', y: '-52%', r: '8deg' },
    kick: { x: '-20%', y: '-50%', r: '14deg' },
  },
  {
    id: '09',
    src: cubeSrc('09'),
    home: homeFromFigma(900, 87),
    drop: { x: '-4%', y: '-48%', r: '-10deg' },
    kick: { x: '-36%', y: '-44%', r: '-18deg' },
  },
  // Mid row
  {
    id: '10',
    src: cubeSrc('10'),
    home: homeFromFigma(750, 173.25),
    drop: { x: '-8%', y: '-56%', r: '-12deg' },
    kick: { x: '-48%', y: '-12%', r: '-22deg' },
  },
  {
    id: '08',
    src: cubeSrc('08'),
    home: homeFromFigma(850, 173.25),
    drop: { x: '4%', y: '-50%', r: '7deg' },
    kick: { x: '-10%', y: '-54%', r: '12deg' },
  },
  {
    id: '07',
    src: cubeSrc('07'),
    home: homeFromFigma(950, 173.25),
    drop: { x: '-2%', y: '-46%', r: '-6deg' },
    kick: { x: '14%', y: '-50%', r: '-10deg' },
  },
  {
    id: '06',
    src: cubeSrc('06'),
    home: homeFromFigma(1050, 173.25),
    drop: { x: '8%', y: '-54%', r: '10deg' },
    kick: { x: '36%', y: '-40%', r: '18deg' },
  },
  {
    id: '05',
    src: cubeSrc('05'),
    home: homeFromFigma(1150, 173.25),
    drop: { x: '10%', y: '-48%', r: '-8deg' },
    kick: { x: '48%', y: '-24%', r: '24deg' },
  },
  {
    id: '11',
    src: cubeSrc('11'),
    home: homeFromFigma(1250, 173.25),
    drop: { x: '5%', y: '-58%', r: '11deg' },
    kick: { x: '52%', y: '8%', r: '-16deg' },
  },
  // Lower mid row
  {
    id: '12',
    src: cubeSrc('12'),
    home: homeFromFigma(800, 259.5),
    drop: { x: '-6%', y: '-60%', r: '9deg' },
    kick: { x: '-44%', y: '28%', r: '20deg' },
  },
  {
    id: '01',
    src: cubeSrc('01'),
    home: homeFromFigma(900, 259.5),
    drop: { x: '2%', y: '-62%', r: '-7deg' },
    kick: { x: '-18%', y: '46%', r: '-14deg' },
  },
  {
    id: '04',
    src: cubeSrc('04'),
    home: homeFromFigma(1000, 259.5),
    drop: { x: '-4%', y: '-58%', r: '6deg' },
    kick: { x: '8%', y: '48%', r: '-12deg' },
  },
  {
    id: '03',
    src: cubeSrc('03'),
    home: homeFromFigma(1100, 259.5),
    drop: { x: '6%', y: '-64%', r: '-9deg' },
    kick: { x: '-4%', y: '52%', r: '16deg' },
  },
  {
    id: '02',
    src: cubeSrc('02'),
    home: homeFromFigma(1200, 259.5),
    drop: { x: '-8%', y: '-56%', r: '8deg' },
    kick: { x: '40%', y: '36%', r: '-20deg' },
  },
  {
    id: '13',
    src: cubeSrc('13'),
    home: homeFromFigma(1300, 259.5),
    drop: { x: '7%', y: '-60%', r: '-11deg' },
    kick: { x: '50%', y: '30%', r: '22deg' },
  },
  // Bottom row
  {
    id: '14',
    src: cubeSrc('14'),
    home: homeFromFigma(1150, 345.75),
    drop: { x: '-5%', y: '-66%', r: '10deg' },
    kick: { x: '16%', y: '56%', r: '-18deg' },
  },
  {
    id: '15',
    src: cubeSrc('15'),
    home: homeFromFigma(1250, 345.75),
    drop: { x: '3%', y: '-68%', r: '-8deg' },
    kick: { x: '42%', y: '50%', r: '26deg' },
  },
]

/** Paint back-to-front: higher in the isometric stack last. */
const PAINT_ORDER: CubeId[] = [
  '16',
  '09',
  '10',
  '08',
  '07',
  '06',
  '05',
  '11',
  '12',
  '01',
  '04',
  '03',
  '02',
  '13',
  '14',
  '15',
]

const PLAY_BOUNDS = {
  minLeft: 8,
  minTop: 8,
  maxLeft: PLAY_STAGE.width - CUBE_SIZE.width - 8,
  maxTop: PLAY_STAGE.height - CUBE_SIZE.height - 8,
} as const

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function distance(a: CubePose, b: CubePose) {
  return Math.hypot(a.left - b.left, a.top - b.top)
}

function nextScatterPose(current: CubePose): CubePose {
  let candidate: CubePose = current
  for (let attempt = 0; attempt < 12; attempt += 1) {
    candidate = {
      left: randomInRange(PLAY_BOUNDS.minLeft, PLAY_BOUNDS.maxLeft),
      top: randomInRange(PLAY_BOUNDS.minTop, PLAY_BOUNDS.maxTop),
      rotate: randomInRange(-28, 28),
    }
    if (distance(candidate, current) > 70) break
  }
  return candidate
}

export type AnniversaryCubesBehavior = 'returnHome' | 'scatterInBounds'

type AnniversaryCubesProps = {
  /**
   * `returnHome` — kick away on hover, ease back on leave (default).
   * `scatterInBounds` — start as wordmark; each hover jumps to a new spot inside the play area.
   */
  behavior?: AnniversaryCubesBehavior
}

export function AnniversaryCubes({ behavior = 'returnHome' }: AnniversaryCubesProps) {
  const scatterMode = behavior === 'scatterInBounds'
  const stage = scatterMode ? PLAY_STAGE : WORDMARK_STAGE

  const [settled, setSettled] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [kicked, setKicked] = useState<Partial<Record<CubeId, boolean>>>({})
  const [poses, setPoses] = useState<Record<CubeId, CubePose>>(() =>
    Object.fromEntries(CUBES.map((cube) => [cube.id, cube.home])) as Record<CubeId, CubePose>
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setSettled(true))
    })

    const introMs = media.matches ? 0 : PAINT_ORDER.length * 55 + 900
    const introTimer = window.setTimeout(() => setIntroDone(true), introMs)

    return () => {
      media.removeEventListener('change', sync)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(introTimer)
    }
  }, [])

  const scatterCube = (id: CubeId) => {
    if (reducedMotion) return
    setPoses((prev) => ({
      ...prev,
      [id]: nextScatterPose(prev[id]),
    }))
  }

  return (
    <div
      className={cn(
        'anniversary-cubes relative w-full',
        scatterMode ? 'max-w-[820px]' : 'max-w-[650px]'
      )}
      style={{ aspectRatio: `${stage.width} / ${stage.height}` }}
      role="img"
      aria-label="25 Years of Modding"
    >
      {CUBES.map((cube) => {
        const paintIndex = PAINT_ORDER.indexOf(cube.id)
        const pose = scatterMode
          ? poses[cube.id]
          : {
              left: cube.home.left - WORDMARK_OFFSET.x,
              top: cube.home.top - WORDMARK_OFFSET.y,
              rotate: 0,
            }
        const isKicked = !scatterMode && Boolean(kicked[cube.id])
        const hasLeftHome =
          scatterMode &&
          (Math.abs(pose.left - cube.home.left) > 1 || Math.abs(pose.top - cube.home.top) > 1)
        const delayMs =
          isKicked || hasLeftHome || reducedMotion || introDone ? 0 : paintIndex * 55

        return (
          <button
            key={cube.id}
            type="button"
            data-cube-id={cube.id}
            aria-label={`Cube ${cube.id}`}
            className={cn(
              'anniversary-cube absolute m-0 appearance-none border-0 bg-transparent p-0',
              'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cdfb27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f10]',
              settled && 'is-settled',
              isKicked && 'is-kicked',
              scatterMode && 'is-scatter-mode',
              scatterMode && hasLeftHome && 'is-scattered',
              reducedMotion && 'is-reduced'
            )}
            style={
              {
                left: `${(pose.left / stage.width) * 100}%`,
                top: `${(pose.top / stage.height) * 100}%`,
                width: `${(CUBE_SIZE.width / stage.width) * 100}%`,
                zIndex: isKicked || hasLeftHome ? 40 : paintIndex + 1,
                transitionDelay: `${delayMs}ms`,
                '--drop-x': cube.drop.x,
                '--drop-y': cube.drop.y,
                '--drop-r': cube.drop.r,
                '--kick-x': cube.kick.x,
                '--kick-y': cube.kick.y,
                '--kick-r': cube.kick.r,
                ...(scatterMode && settled
                  ? { transform: `translate(0, 0) rotate(${pose.rotate}deg)` }
                  : null),
              } as CSSProperties
            }
            onMouseEnter={() => {
              if (scatterMode) {
                if (!introDone) return
                scatterCube(cube.id)
                return
              }
              if (reducedMotion) return
              setKicked((prev) => ({ ...prev, [cube.id]: true }))
            }}
            onMouseLeave={() => {
              if (scatterMode) return
              setKicked((prev) => ({ ...prev, [cube.id]: false }))
            }}
            onFocus={() => {
              if (scatterMode) {
                if (!introDone) return
                scatterCube(cube.id)
                return
              }
              if (reducedMotion) return
              setKicked((prev) => ({ ...prev, [cube.id]: true }))
            }}
            onBlur={() => {
              if (scatterMode) return
              setKicked((prev) => ({ ...prev, [cube.id]: false }))
            }}
          >
            <img
              src={cube.src}
              alt=""
              width={CUBE_SIZE.width}
              height={CUBE_SIZE.height}
              className="pointer-events-none block h-auto w-full max-w-none select-none"
              draggable={false}
            />
          </button>
        )
      })}
    </div>
  )
}
