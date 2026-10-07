import { useEffect, useState } from 'react'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])
  return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export default function Taskbar({ windows, activeId, startOpen, onToggleStart, onTaskClick }) {
  const time = useClock()

  return (
    <nav id="taskbar" className="out" aria-label="Taskbar">
      <button
        id="start"
        type="button"
        className={startOpen ? 'on' : ''}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onToggleStart}
        aria-expanded={startOpen}
      >
        <span className="flag" aria-hidden="true">
          ▚
        </span>
        Start
      </button>

      <div className="tasks">
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`taskbtn${w.id === activeId && !w.minimized ? ' active' : ''}`}
            onClick={() => onTaskClick(w.id)}
            title={w.title}
          >
            <span aria-hidden="true">{w.icon}</span>
            <span className="tl">{w.title}</span>
          </button>
        ))}
      </div>

      <div id="tray">
        <span className="ico" aria-hidden="true" title="Connected">
          🌐
        </span>
        <span className="ico" aria-hidden="true" title="Volume">
          🔊
        </span>
        <span id="clock" title="Local time">
          {time}
        </span>
      </div>
    </nav>
  )
}
