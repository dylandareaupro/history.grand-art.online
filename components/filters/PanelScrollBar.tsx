'use client'

import { useEffect, useCallback, useRef, useState } from 'react'

interface PanelScrollBarProps {
  color: 'blue' | 'teal' | 'orange'
  containerRef: { current: HTMLDivElement | null }
}

export function PanelScrollBar({ color, containerRef }: PanelScrollBarProps) {
  const [thumb, setThumb] = useState({ top: 0, height: 100 })
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScrollTop = useRef(0)

  const progressColor =
    color === 'blue' ? 'bg-[#0088ff]' : color === 'teal' ? 'bg-[#008f83]' : 'bg-[#f57200]'

  const updateThumb = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight <= clientHeight) {
      setThumb({ top: 0, height: 100 })
      return
    }
    const height = (clientHeight / scrollHeight) * 100
    const top = (scrollTop / scrollHeight) * 100
    setThumb({ top, height })
  }, [containerRef])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    updateThumb()
    el.addEventListener('scroll', updateThumb, { passive: true })
    const ro = new ResizeObserver(updateThumb)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateThumb)
      ro.disconnect()
    }
  }, [containerRef, updateThumb])

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    if (isDragging.current) return
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return
    const rect = track.getBoundingClientRect()
    const ratio = (e.clientY - rect.top) / rect.height
    container.scrollTop = ratio * container.scrollHeight
  }

  function handleThumbMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    isDragging.current = true
    dragStartY.current = e.clientY
    dragStartScrollTop.current = containerRef.current?.scrollTop ?? 0

    function onMouseMove(e: MouseEvent) {
      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return
      const delta = e.clientY - dragStartY.current
      const trackHeight = track.getBoundingClientRect().height
      container.scrollTop = dragStartScrollTop.current + (delta / trackHeight) * container.scrollHeight
    }

    function onMouseUp() {
      // Defer resetting so the click handler sees isDragging = true
      setTimeout(() => { isDragging.current = false }, 0)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      className="relative self-stretch shrink-0 w-[2px] rounded-[24px] bg-white/30 cursor-pointer"
    >
      <div
        className={`absolute left-0 right-0 rounded-[24px] ${progressColor} cursor-grab active:cursor-grabbing transition-none`}
        style={{ top: `${thumb.top}%`, height: `${thumb.height}%` }}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  )
}
