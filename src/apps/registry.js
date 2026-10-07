import { projects } from '../data/portfolio'
import { About, Computer, Contact, Experience, Project, Readme, Resume, Skills, Work } from './windows'

const APPS = {
  readme: { title: 'Welcome — README.txt', icon: '👋', w: 620, h: 480, Body: Readme },
  about: { title: 'About Me', icon: '📝', w: 600, h: 500, Body: About },
  skills: { title: 'Skills & Tools', icon: '🛠️', w: 560, h: 500, Body: Skills },
  experience: { title: 'Experience', icon: '💼', w: 640, h: 540, Body: Experience },
  work: { title: 'Selected Work', icon: '🗂️', w: 560, h: 380, Body: Work },
  contact: { title: 'Contact Me', icon: '✉️', w: 540, h: 440, Body: Contact },
  computer: { title: 'My Computer', icon: '🖥️', w: 540, h: 470, Body: Computer },
  resume: { title: 'Resume.txt — Notepad', icon: '📄', w: 620, h: 520, Body: Resume },
}

/** Resolve a window id to its chrome + body component. Ids may be `project:<slug>`. */
export function getApp(id) {
  if (id.startsWith('project:')) {
    const p = projects.find((x) => x.id === id.slice('project:'.length))
    if (!p) return null
    return {
      title: `${p.title} — Properties`,
      icon: p.icon,
      w: 600,
      h: 500,
      Body: Project,
      props: { project: p },
    }
  }
  return APPS[id] ?? null
}

export const DESKTOP_ICONS = [
  { id: 'work', icon: '🗂️', label: 'Selected Work' },
  { id: 'about', icon: '📝', label: 'About Me' },
  { id: 'experience', icon: '💼', label: 'Experience' },
  { id: 'skills', icon: '🛠️', label: 'Skills & Tools' },
  { id: 'computer', icon: '🖥️', label: 'My Computer' },
  { id: 'resume', icon: '📄', label: 'Resume.txt' },
  { id: 'contact', icon: '✉️', label: 'Contact Me' },
]
