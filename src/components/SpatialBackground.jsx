import { useEffect, useRef } from 'react'

function seededRandom(seed) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

const cubeEdges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

function rotatePoint(point, yaw, pitch, roll = 0) {
  let { x, y, z } = point

  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const x1 = x * cy - z * sy
  const z1 = x * sy + z * cy
  x = x1
  z = z1

  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  const y1 = y * cp - z * sp
  const z2 = y * sp + z * cp
  y = y1
  z = z2

  const cr = Math.cos(roll)
  const sr = Math.sin(roll)
  return {
    x: x * cr - y * sr,
    y: x * sr + y * cr,
    z,
  }
}

function project(point, width, height, fov) {
  const depth = point.z + 24
  if (depth <= 1) return null
  const scale = fov / depth
  return {
    x: width / 2 + point.x * scale,
    y: height / 2 + point.y * scale,
    scale,
    depth,
  }
}

function cubeVertices(size) {
  const s = size / 2
  return [
    { x: -s, y: -s, z: -s }, { x: s, y: -s, z: -s },
    { x: s, y: s, z: -s }, { x: -s, y: s, z: -s },
    { x: -s, y: -s, z: s }, { x: s, y: -s, z: s },
    { x: s, y: s, z: s }, { x: -s, y: s, z: s },
  ]
}

export default function SpatialBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rng = seededRandom(82)
    const points = Array.from({ length: 66 }, () => ({
      x: (rng() - 0.5) * 24,
      y: (rng() - 0.5) * 17,
      z: (rng() - 0.5) * 17,
      size: 0.7 + rng() * 1.4,
    }))

    const cubes = [
      { x: -7.8, y: -2.7, z: 0.2, size: 4.8, speed: 0.34, phase: 0.2 },
      { x: 7.2, y: 2.2, z: -2.4, size: 3.5, speed: -0.27, phase: 1.5 },
      { x: 1.4, y: -5.6, z: -5.4, size: 2.6, speed: 0.2, phase: 2.4 },
    ]

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    let scrollProgress = 0
    let lastTime = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event) => {
      targetX = (event.clientX / Math.max(width, 1) - 0.5) * 2
      targetY = (event.clientY / Math.max(height, 1) - 0.5) * 2
    }

    const onPointerLeave = () => {
      targetX = 0
      targetY = 0
    }

    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      scrollProgress = window.scrollY / max
    }

    const drawCube = (cube, time, yaw, pitch, fov) => {
      const verts = cubeVertices(cube.size).map((vertex) => {
        const local = rotatePoint(
          vertex,
          time * cube.speed + cube.phase + yaw * 0.6,
          time * cube.speed * 0.72 + pitch * 0.6,
          time * cube.speed * 0.22,
        )
        const world = {
          x: local.x + cube.x,
          y: local.y + cube.y,
          z: local.z + cube.z,
        }
        return project(world, width, height, fov)
      })

      context.lineWidth = 1
      cubeEdges.forEach(([a, b]) => {
        const start = verts[a]
        const end = verts[b]
        if (!start || !end) return
        const alpha = Math.max(0.055, Math.min(0.23, 0.26 - (start.depth + end.depth) * 0.004))
        context.strokeStyle = `rgba(103, 232, 249, ${alpha})`
        context.beginPath()
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.stroke()
      })
    }

    const render = (timestamp = 0) => {
      const time = timestamp * 0.001
      const dt = Math.min((timestamp - lastTime) / 1000 || 0.016, 0.05)
      lastTime = timestamp

      pointerX += (targetX - pointerX) * Math.min(1, dt * 4.5)
      pointerY += (targetY - pointerY) * Math.min(1, dt * 4.5)

      context.clearRect(0, 0, width, height)

      const fov = Math.min(width, height) * 0.88
      const baseYaw = (reduceMotion ? 0.14 : time * 0.035) + pointerX * 0.15 + scrollProgress * 0.13
      const basePitch = -0.08 + pointerY * -0.1 + Math.sin(scrollProgress * Math.PI) * 0.04

      const projected = points.map((point, index) => {
        const rotated = rotatePoint(
          point,
          baseYaw + Math.sin(index * 0.7 + time * 0.12) * 0.014,
          basePitch,
        )
        rotated.y += (scrollProgress - 0.5) * 1.5
        return { original: point, projected: project(rotated, width, height, fov), rotated }
      })

      for (let i = 0; i < projected.length; i += 1) {
        const a = projected[i]
        if (!a.projected) continue
        for (let j = i + 1; j < projected.length; j += 1) {
          const b = projected[j]
          if (!b.projected) continue
          const dx = a.rotated.x - b.rotated.x
          const dy = a.rotated.y - b.rotated.y
          const dz = a.rotated.z - b.rotated.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (distance > 4.15) continue

          const alpha = (1 - distance / 4.15) * 0.13
          context.strokeStyle = `rgba(94, 234, 212, ${alpha})`
          context.lineWidth = 0.7
          context.beginPath()
          context.moveTo(a.projected.x, a.projected.y)
          context.lineTo(b.projected.x, b.projected.y)
          context.stroke()
        }
      }

      projected.forEach(({ original, projected: p }) => {
        if (!p) return
        const depthFade = Math.max(0.08, Math.min(0.5, 1 - (p.depth - 11) / 26))
        const radius = Math.max(0.6, original.size * p.scale * 0.025)
        context.fillStyle = `rgba(165, 243, 252, ${depthFade})`
        context.beginPath()
        context.arc(p.x, p.y, radius, 0, Math.PI * 2)
        context.fill()
      })

      cubes.forEach((cube) => drawCube(cube, reduceMotion ? 0.8 : time, baseYaw, basePitch, fov))

      if (!reduceMotion) raf = window.requestAnimationFrame(render)
    }

    resize()
    onScroll()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reduceMotion) render(0)
    else raf = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="spatial-background" aria-hidden="true" />
}
