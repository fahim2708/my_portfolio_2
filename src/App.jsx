import { useCallback, useEffect, useState } from 'react'
import BootScreen from './components/BootScreen'
import DesktopIcon from './components/DesktopIcon'
import StartMenu from './components/StartMenu'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import { DESKTOP_ICONS, getApp } from './apps/registry.js'
import { profile } from './data/portfolio'
import './styles/win95.css'

const TASKBAR = 40

/** Lay the shortcuts out in columns, wrapping when they run out of desktop. */
function initialIconPositions() {
  const perCol = Math.max(1, Math.floor((window.innerHeight - TASKBAR - 20) / 104))
  return Object.fromEntries(
    DESKTOP_ICONS.map((ic, i) => [
      ic.id,
      { left: 6 + Math.floor(i / perCol) * 96, top: 4 + (i % perCol) * 104 },
    ]),
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [off, setOff] = useState(false)
  const [windows, setWindows] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [iconPos, setIconPos] = useState(initialIconPositions)
  const [topZ, setTopZ] = useState(10)

  const focus = useCallback((id) => {
    setActiveId(id)
    setTopZ((z) => {
      const next = z + 1
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w)))
      return next
    })
  }, [])

  const open = useCallback(
    (id) => {
      setStartOpen(false)
      const existing = windows.find((w) => w.id === id)
      if (existing) {
        focus(id)
        return
      }
      const app = getApp(id)
      if (!app) return

      const n = windows.length
      const w = Math.min(app.w, window.innerWidth - 24)
      const h = Math.min(app.h, window.innerHeight - TASKBAR - 24)
      const x = Math.max(12, Math.min(110 + n * 26, window.innerWidth - w - 12))
      const y = Math.max(8, Math.min(52 + n * 24, window.innerHeight - TASKBAR - h - 8))

      const next = topZ + 1
      setTopZ(next)
      setWindows((ws) => [
        ...ws,
        { id, title: app.title, icon: app.icon, x, y, w, h, z: next, minimized: false, maximized: false },
      ])
      setActiveId(id)
    },
    [windows, focus, topZ],
  )

  const close = useCallback(
    (id) => {
      setWindows((ws) => ws.filter((w) => w.id !== id))
      setActiveId((cur) => (cur === id ? null : cur))
    },
    [],
  )

  const minimize = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const toggleMax = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)))
  }, [])

  const move = useCallback((id, pos) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...pos } : w)))
  }, [])

  const onTaskClick = useCallback(
    (id) => {
      const w = windows.find((x) => x.id === id)
      if (!w) return
      if (w.minimized || activeId !== id) focus(id)
      else minimize(id)
    },
    [windows, activeId, focus, minimize],
  )

  const onStartPick = useCallback(
    (id) => {
      setStartOpen(false)
      if (id === 'shutdown') {
        setOff(true)
        return
      }
      open(id)
    },
    [open],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setStartOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (off) {
    return (
      <div id="shutdown">
        <div className="msg">
          It&apos;s now safe to turn off
          <br />
          your computer.
        </div>
        <button
          className="btn95"
          onClick={() => {
            setOff(false)
            setWindows([])
            setActiveId(null)
            setBooted(false)
          }}
        >
          Restart
        </button>
      </div>
    )
  }

  return (
    <>
      {!booted && (
        <BootScreen
          onDone={() => {
            setBooted(true)
            open('readme') // greet the visitor once the desktop is up
          }}
        />
      )}

      <main
        id="desk"
        onPointerDown={() => {
          setSelected(null)
          setStartOpen(false)
        }}
      >
        <div className="icons">
          {DESKTOP_ICONS.map((ic) => (
            <DesktopIcon
              key={ic.id}
              icon={ic.icon}
              label={ic.label}
              pos={iconPos[ic.id]}
              selected={selected === ic.id}
              onSelect={() => setSelected(ic.id)}
              onOpen={() => open(ic.id)}
              onMove={(pos) => setIconPos((p) => ({ ...p, [ic.id]: pos }))}
            />
          ))}
        </div>

        {windows.map((w) => {
          const app = getApp(w.id)
          if (!app) return null
          const { Body, props } = app
          return (
            <Window
              key={w.id}
              win={w}
              active={activeId === w.id}
              onFocus={focus}
              onClose={close}
              onMinimize={minimize}
              onToggleMax={toggleMax}
              onMove={move}
            >
              <Body open={open} {...props} />
            </Window>
          )
        })}
      </main>

      <StartMenu open={startOpen} onPick={onStartPick} />
      <Taskbar
        windows={windows}
        activeId={activeId}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((s) => !s)}
        onTaskClick={onTaskClick}
      />

      <h1 className="sr-only" style={{ position: 'absolute', left: -9999, top: -9999 }}>
        {profile.name} — {profile.role}
      </h1>
    </>
  )
}
