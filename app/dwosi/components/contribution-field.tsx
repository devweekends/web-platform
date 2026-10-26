"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { DWOSI_THEME_ATTR } from "../theme"

/**
 * A living, pixel-art contribution graph drawn on a canvas. Cells "commit"
 * at random and fade out, and light up under the cursor on precise pointers.
 *
 * - "background" fills a section behind its content, stays quiet inside the
 *   `focus` ellipse and fades at the edges.
 * - "panel" fills a box like a GitHub contribution graph: seven rows, one per
 *   day of the week, revealed left to right like time passing.
 *
 * Pauses when off-screen and draws a single still frame for reduced motion.
 */

interface ContributionFieldProps {
  className?: string
  mode?: "background" | "panel"
  /** Quiet area behind the content, as fractions of the canvas size (background mode) */
  focus?: { x: number; y: number; rx: number; ry: number }
  /** Fade the top edge too; the bottom edge always fades (background mode) */
  fadeTop?: boolean
}

const BACKGROUND_CELL = 10
const BACKGROUND_GAP = 4
const PANEL_ROWS = 7
const PANEL_GAP = 6
const DECAY_SECONDS = 1.4
const FRAME_MS = 1000 / 30

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/** Seeded random so the resting pattern is stable between renders */
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function ContributionField({
  className,
  mode = "background",
  focus = { x: 0.5, y: 0.45, rx: 0.34, ry: 0.42 },
  fadeTop = false,
}: ContributionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { x: focusX, y: focusY, rx: focusRx, ry: focusRy } = focus

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !host || !ctx) return

    const panel = mode === "panel"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const commitsPerCellPerSecond = panel ? 0.03 : 0.01
    const roundCells = panel && typeof ctx.roundRect === "function"

    let width = 0
    let height = 0
    let cell = BACKGROUND_CELL
    let pitch = BACKGROUND_CELL + BACKGROUND_GAP
    let cols = 0
    let rows = 0
    let originX = 0
    let originY = 0
    let quiet = new Float32Array(0)
    let edge = new Float32Array(0)
    let weight = new Float32Array(0)
    let rest = new Float32Array(0)
    let heat = new Float32Array(0)
    let delay = new Float32Array(0)
    let brandColor = ""
    let emptyColor = ""
    let emptyAlpha = 0.05
    let frame = 0
    let lastFrame = 0
    let start = performance.now()
    let onScreen = true

    const readColors = () => {
      const root = document.documentElement
      const styles = getComputedStyle(root)
      const light = root.getAttribute(DWOSI_THEME_ATTR) === "light"
      brandColor = `hsl(${styles.getPropertyValue("--brand").trim()})`
      emptyColor = `hsl(${styles.getPropertyValue("--foreground").trim()})`
      emptyAlpha = panel ? (light ? 0.08 : 0.1) : light ? 0.05 : 0.07
    }

    const layout = () => {
      const rect = host.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (panel) {
        cell = Math.max(8, Math.floor((height - PANEL_GAP * (PANEL_ROWS - 1)) / PANEL_ROWS))
        pitch = cell + PANEL_GAP
        rows = PANEL_ROWS
        cols = Math.max(1, Math.floor((width + PANEL_GAP) / pitch))
        originY = (height - (rows * pitch - PANEL_GAP)) / 2
        originX = (width - (cols * pitch - PANEL_GAP)) / 2
      } else {
        cell = BACKGROUND_CELL
        pitch = BACKGROUND_CELL + BACKGROUND_GAP
        cols = Math.ceil(width / pitch)
        rows = Math.ceil(height / pitch)
        originY = 0
        originX = (width - (cols * pitch - BACKGROUND_GAP)) / 2
      }

      const count = cols * rows
      quiet = new Float32Array(count)
      edge = new Float32Array(count)
      weight = new Float32Array(count)
      rest = new Float32Array(count)
      heat = new Float32Array(count)
      delay = new Float32Array(count)

      // On narrow screens the content spans the full width, so widen the quiet area
      const rx = width < 640 ? Math.max(focusRx, 0.6) : focusRx
      const random = seededRandom(cols * 7919 + rows)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          const roll = random()

          if (panel) {
            quiet[i] = 1
            edge[i] = 1
            // Busier than a background, like a real summer of contributions
            rest[i] = roll > 0.88 ? 0.95 : roll > 0.72 ? 0.7 : roll > 0.52 ? 0.45 : roll > 0.34 ? 0.22 : 0
            delay[i] = (col / cols) * 0.9 + random() * 0.1
          } else {
            const x = (originX + col * pitch + cell / 2) / width
            const y = (row * pitch + cell / 2) / height
            const distance = Math.hypot((x - focusX) / rx, (y - focusY) / focusRy)
            // `quiet` dims cells behind the content, `edge` fades the section edges to nothing
            quiet[i] = 0.06 + 0.94 * smoothstep(0.6, 1.25, distance)
            edge[i] = smoothstep(1, 0.6, y) * (fadeTop ? smoothstep(0, 0.3, y) : 1)
            // Resting levels, like a contribution graph: mostly empty, a few busy days
            rest[i] = roll > 0.975 ? 0.8 : roll > 0.94 ? 0.55 : roll > 0.88 ? 0.3 : 0
            delay[i] = distance * 0.35 + random() * 0.15
          }
          weight[i] = quiet[i] * edge[i]
        }
      }
    }

    const fillCell = (x: number, y: number) => {
      if (roundCells) {
        ctx.beginPath()
        ctx.roundRect(x, y, cell, cell, 3)
        ctx.fill()
      } else {
        ctx.fillRect(x, y, cell, cell)
      }
    }

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000
      ctx.clearRect(0, 0, width, height)

      // Two passes so the fill color only changes once per frame
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? emptyColor : brandColor
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const i = row * cols + col
            const reveal = reduceMotion ? 1 : smoothstep(delay[i], delay[i] + 0.25, elapsed)
            if (reveal <= 0) continue

            const level = Math.max(rest[i] * weight[i], heat[i])
            const lit = level >= 0.04
            if (lit !== (pass === 1)) continue

            ctx.globalAlpha = lit
              ? (0.15 + 0.75 * level) * (0.25 + 0.75 * quiet[i]) * edge[i] * reveal
              : emptyAlpha * (0.4 + 0.6 * quiet[i]) * edge[i] * reveal
            fillCell(originX + col * pitch, originY + row * pitch)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const step = (seconds: number) => {
      const decay = Math.exp(-seconds / DECAY_SECONDS)
      const chance = commitsPerCellPerSecond * seconds
      for (let i = 0; i < heat.length; i++) {
        heat[i] *= decay
        if (Math.random() < chance * weight[i]) heat[i] = Math.max(heat[i], 0.5 + Math.random() * 0.5)
      }
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (!onScreen || now - lastFrame < FRAME_MS) return
      step(Math.min((now - lastFrame) / 1000, 0.1))
      lastFrame = now
      draw(now)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const col = Math.floor((event.clientX - rect.left - originX) / pitch)
      const row = Math.floor((event.clientY - rect.top - originY) / pitch)
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const r = row + dr
          const c = col + dc
          if (r < 0 || c < 0 || r >= rows || c >= cols) continue
          const i = r * cols + c
          heat[i] = Math.max(heat[i], dr === 0 && dc === 0 ? 1 : dr === 0 || dc === 0 ? 0.6 : 0.35)
        }
      }
    }

    readColors()
    layout()

    const resizeObserver = new ResizeObserver(() => {
      layout()
      if (reduceMotion) draw(performance.now())
    })
    resizeObserver.observe(host)

    const themeObserver = new MutationObserver(() => {
      readColors()
      if (reduceMotion) draw(performance.now())
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: [DWOSI_THEME_ATTR] })

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
    })
    visibilityObserver.observe(canvas)

    if (reduceMotion) {
      draw(performance.now())
    } else {
      start = performance.now()
      lastFrame = start
      frame = requestAnimationFrame(loop)
      if (finePointer) host.addEventListener("pointermove", onPointerMove)
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      visibilityObserver.disconnect()
      host.removeEventListener("pointermove", onPointerMove)
    }
  }, [mode, focusX, focusY, focusRx, focusRy, fadeTop])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}
