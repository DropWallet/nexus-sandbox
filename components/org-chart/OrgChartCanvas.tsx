'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { OrgChartLegend } from './OrgChartLegend'

const BOARD_W = 3980
const BOARD_H = 1900

type OrgChartCanvasProps = {
  children: React.ReactNode
}

export function OrgChartCanvas({ children }: OrgChartCanvasProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(0.4)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [scale, setScale] = useState(0.4)
  const [useCssZoom, setUseCssZoom] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null)

  scaleRef.current = scale

  useLayoutEffect(() => {
    setUseCssZoom(
      typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('zoom', '1')
    )
  }, [])

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const fitInitial = () => {
      const { width, height } = el.getBoundingClientRect()
      const s = Math.min((width * 0.92) / BOARD_W, (height * 0.92) / BOARD_H, 0.55)
      setScale(s)
      scaleRef.current = s
      setX((width - BOARD_W * s) / 2)
      setY((height - BOARD_H * s) / 2)
    }
    fitInitial()
    const ro = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect()
      const s = scaleRef.current
      setX((width - BOARD_W * s) / 2)
      setY((height - BOARD_H * s) / 2)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
      const el = viewportRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const mx = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
      const my = Math.min(Math.max(0, e.clientY - rect.top), rect.height)
      const factor = Math.exp(-e.deltaY * 0.0012)
      const prev = scaleRef.current
      const next = Math.min(2.4, Math.max(0.12, prev * factor))
      if (next === prev) return
      scaleRef.current = next
      setScale(next)
      // Keep the board point under the cursor fixed (FigJam-style zoom-to-pointer).
      const ratio = next / prev
      setX((xv) => mx - ratio * (mx - xv))
      setY((yv) => my - ratio * (my - yv))
    } else {
      setX((v) => v - e.deltaX)
      setY((v) => v - e.deltaY)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    dragRef.current = { ox: x, oy: y, px: e.clientX, py: e.clientY }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d) return
    setX(d.ox + (e.clientX - d.px))
    setY(d.oy + (e.clientY - d.py))
  }

  const endDrag = (e: React.PointerEvent) => {
    dragRef.current = null
    setDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      ref={viewportRef}
      className="relative h-[100dvh] w-full touch-none overflow-hidden bg-surface-base select-none [&_*]:select-none"
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <OrgChartLegend />
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-[280px] rounded-lg border border-stroke-neutral-translucent-weak bg-surface-low/95 px-3 py-2 text-xs leading-snug text-neutral-subdued shadow-lg backdrop-blur-sm">
        Drag to pan. Use Ctrl (or ⌘) + scroll to zoom toward the pointer.
      </div>
      <div
        className="absolute left-0 top-0 origin-top-left will-change-transform"
        style={{
          width: BOARD_W,
          height: BOARD_H,
          transform: useCssZoom ? `translate3d(${x}px, ${y}px, 0)` : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          ...(useCssZoom ? { zoom: scale } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}
