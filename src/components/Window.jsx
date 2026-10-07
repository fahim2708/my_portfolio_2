import { useCallback, useEffect, useRef } from 'react'

const isMobile = () => window.matchMedia('(max-width:760px)').matches

export default function Window({
  win,
  active,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
  children,
}) {
  const drag = useRef(null)

  const handleMove = useCallback(
    (e) => {
      if (!drag.current) return
      const { dx, dy } = drag.current
      const maxX = window.innerWidth - 80
      const maxY = window.innerHeight - 80
      onMove(win.id, {
        x: Math.min(Math.max(e.clientX - dx, -win.w + 120), maxX),
        y: Math.min(Math.max(e.clientY - dy, 0), maxY),
      })
    },
    [onMove, win.id, win.w],
  )

  const endDrag = useCallback(() => {
    drag.current = null
    document.body.classList.remove('dragging-window')
  }, [])

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

  const startDrag = (e) => {
    onFocus(win.id)
    if (win.maximized || isMobile()) return
    if (e.target.closest('.tbtn')) return
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y }
    document.body.classList.add('dragging-window')
  }

  const cls = [
    'window',
    'out',
    win.minimized ? 'min' : '',
    win.maximized ? 'max' : '',
    active ? '' : 'blur',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={cls}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      onPointerDown={() => onFocus(win.id)}
      role="dialog"
      aria-label={win.title}
    >
      <header className="titlebar" onPointerDown={startDrag} onDoubleClick={() => onToggleMax(win.id)}>
        <span className="tg" aria-hidden="true">
          {win.icon}
        </span>
        <span className="ti">{win.title}</span>
        <span className="tbtns">
          <button className="tbtn" onClick={() => onMinimize(win.id)} aria-label="Minimize" title="Minimize">
            _
          </button>
          <button className="tbtn" onClick={() => onToggleMax(win.id)} aria-label="Maximize" title="Maximize">
            {win.maximized ? '❐' : '□'}
          </button>
          <button className="tbtn" onClick={() => onClose(win.id)} aria-label="Close" title="Close">
            &times;
          </button>
        </span>
      </header>
      {children}
    </section>
  )
}
