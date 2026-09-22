import { useRef } from 'react'

export default function TiltSurface({ className = '', children, ...props }) {
  const ref = useRef(null)

  const onMove = (event) => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty('--tilt-x', `${(-y * 3.2).toFixed(2)}deg`)
    element.style.setProperty('--tilt-y', `${(x * 4.2).toFixed(2)}deg`)
    element.style.setProperty('--shine-x', `${((x + 0.5) * 100).toFixed(1)}%`)
    element.style.setProperty('--shine-y', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const onLeave = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--tilt-x', '0deg')
    element.style.setProperty('--tilt-y', '0deg')
    element.style.setProperty('--shine-x', '50%')
    element.style.setProperty('--shine-y', '50%')
  }

  return (
    <div
      ref={ref}
      className={`tilt-surface ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...props}
    >
      {children}
    </div>
  )
}
