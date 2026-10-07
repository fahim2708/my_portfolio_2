import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'

const STEPS = [
  'Detecting hardware…',
  'Loading Laravel modules…',
  'Mounting React runtime…',
  'Connecting to MySQL…',
  'Restoring desktop…',
]

export default function BootScreen({ onDone }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const finished = useRef(false)

  const finish = useRef(() => {
    if (finished.current) return
    finished.current = true
    setDone(true)
    setTimeout(onDone, 500)
  })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish.current()
      return
    }
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i + 1), 420 * (i + 1)))
    const end = setTimeout(() => finish.current(), 420 * STEPS.length + 500)
    const skip = () => finish.current()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(end)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [])

  const pct = Math.round((step / STEPS.length) * 100)

  return (
    <div id="boot" className={done ? 'done' : ''}>
      <div className="logo">{profile.os}</div>
      <div className="tag">{profile.role.toUpperCase()}</div>
      <div className="barwrap in">
        <div className="bar" style={{ width: `${pct}%` }} />
      </div>
      <div className="msg">{step === 0 ? `Starting ${profile.os}…` : STEPS[Math.min(step, STEPS.length) - 1]}</div>
      <div className="skip">CLICK OR PRESS ANY KEY TO SKIP</div>
    </div>
  )
}
