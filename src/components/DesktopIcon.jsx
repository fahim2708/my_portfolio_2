import { useCallback, useEffect, useRef, useState } from 'react'

const isMobile = () => window.matchMedia('(max-width:760px)').matches

/**
 * A desktop shortcut. Drag it around the desktop; a click without movement
 * opens the window it points at (works for both mouse and touch).
 */
export default function DesktopIcon({ icon, label, pos, selected, onSelect, onOpen, onMove }) {
  const [dragging, setDragging] = useState(false)
  const drag = useRef(null)

  const handleMove = useCallback(
    (e) => {
      const d = drag.current
      if (!d) return
      if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 4) {
        d.moved = true
        setDragging(true)
      }
      if (!d.moved) return
      onMove({
        left: Math.max(0, Math.min(e.clientX - d.dx, window.innerWidth - 94)),
        top: Math.max(0, Math.min(e.clientY - d.dy, window.innerHeight - 110)),
      })
    },
    [onMove],
  )

  const endDrag = useCallback(() => {
    const d = drag.current
    drag.current = null
    setDragging(false)
    if (d && !d.moved) onOpen()
  }, [onOpen])

  useEffect(() => {
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [handleMove, endDrag])

  const start = (e) => {
    e.stopPropagation()
    onSelect()
    if (isMobile()) {
      drag.current = { moved: false, sx: e.clientX, sy: e.clientY }
      return
    }
    drag.current = {
      moved: false,
      sx: e.clientX,
      sy: e.clientY,
      dx: e.clientX - pos.left,
      dy: e.clientY - pos.top,
    }
  }

  return (
    <button
      type="button"
      className={`dicon${selected ? ' sel' : ''}${dragging ? ' dragging' : ''}`}
      style={{ left: pos.left, top: pos.top }}
      onPointerDown={start}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
    >
      <span className="g" aria-hidden="true">
        {icon}
      </span>
      <span className="lb">{label}</span>
    </button>
  )
}
