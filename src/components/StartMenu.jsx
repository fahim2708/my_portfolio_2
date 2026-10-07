import { profile } from '../data/portfolio'

const ITEMS = [
  { id: 'about', icon: '📝', label: 'About Me' },
  { id: 'work', icon: '🗂️', label: 'Selected Work' },
  { id: 'experience', icon: '💼', label: 'Experience' },
  { id: 'skills', icon: '🛠️', label: 'Skills & Tools' },
  { id: 'computer', icon: '🖥️', label: 'My Computer' },
  { id: 'resume', icon: '📄', label: 'Resume.txt' },
  { sep: true },
  { id: 'contact', icon: '✉️', label: 'Contact Me' },
  { id: 'shutdown', icon: '⏻', label: 'Shut Down…' },
]

export default function StartMenu({ open, onPick }) {
  return (
    <div id="startmenu" className={`out${open ? ' on' : ''}`} onPointerDown={(e) => e.stopPropagation()}>
      <div className="side" aria-hidden="true">
        {profile.os}
      </div>
      <ul>
        {ITEMS.map((it, i) =>
          it.sep ? (
            <li key={`sep${i}`} className="sep" style={{ padding: 0 }} aria-hidden="true" />
          ) : (
            <li key={it.id} onClick={() => onPick(it.id)}>
              <span className="g" aria-hidden="true">
                {it.icon}
              </span>
              {it.label}
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
