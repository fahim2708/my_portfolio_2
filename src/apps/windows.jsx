import {
  about,
  contact,
  experience,
  experienceSubtitle,
  profile,
  projects,
  projectsSubtitle,
  skills,
  skillsSubtitle,
  stats,
} from '../data/portfolio'

/* ---------------- shared bits ---------------- */

function Menu({ items }) {
  return (
    <div className="wmenu">
      {items.map((m) => (
        <span key={m}>
          <u>{m[0]}</u>
          {m.slice(1)}
        </span>
      ))}
    </div>
  )
}

function Status({ left, right }) {
  return (
    <div className="statusbar">
      <div className="grow">{left}</div>
      {right ? <div>{right}</div> : null}
    </div>
  )
}

function Title({ children, sub }) {
  return (
    <h2 className="wtitle">
      {children}
      {sub ? <span className="wsub">{sub}</span> : null}
    </h2>
  )
}

/* ---------------- README ---------------- */

export function Readme({ open }) {
  return (
    <>
      <Menu items={['File', 'Edit', 'Help']} />
      <div className="wbody white doc">
        <div className="row" style={{ marginBottom: 14 }}>
          <div className="avatar-fallback">{profile.initials}</div>
          <div style={{ flex: '1 1 240px', minWidth: 0 }}>
            <Title sub={`${profile.role} · ${profile.currentRole}`}>Hi, I&apos;m {profile.name}.</Title>
            <p className="lead" style={{ marginBottom: 0 }}>
              {profile.tagline}
            </p>
          </div>
        </div>
        <p>{profile.lead}</p>
        <p style={{ marginBottom: 8 }}>
          <b>Click anything on the desktop</b> to open it — or use the Start menu. Windows drag, minimise
          and maximise like it&apos;s 1995.
        </p>
        <div className="btnrow">
          <button className="btn95" onClick={() => open('work')}>
            View my work →
          </button>
          <button className="btn95" onClick={() => open('contact')}>
            Get in touch
          </button>
        </div>
      </div>
      <Status left={`${profile.os} ${profile.version}`} right="Ready" />
    </>
  )
}

/* ---------------- About ---------------- */

export function About() {
  return (
    <>
      <Menu items={['File', 'Edit', 'View', 'Help']} />
      <div className="wbody doc">
        <Title sub={about.subtitle}>About Me</Title>
        <div className="stats">
          {stats.map((s) => (
            <div className="stat in" key={s.label}>
              <b>{s.number}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <hr />
        <h3>Currently</h3>
        <p style={{ marginBottom: 0 }}>
          {profile.currentRole} at {experience[0].company} — working across {profile.stack.join(', ')}.
        </p>
      </div>
      <Status left={`${about.paragraphs.length} paragraphs`} right={profile.name} />
    </>
  )
}

/* ---------------- Skills ---------------- */

export function Skills() {
  const total = skills.reduce((n, g) => n + g.items.length, 0)
  return (
    <>
      <Menu items={['File', 'View', 'Help']} />
      <div className="wbody doc">
        <Title sub={skillsSubtitle}>Skills &amp; Tools</Title>
        {skills.map((g) => (
          <div className="skillgrp" key={g.title}>
            <h3>{g.title}</h3>
            <div className="skills">
              {g.items.map((it) => (
                <span key={it}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Status left={`${skills.length} categories`} right={`${total} items`} />
    </>
  )
}

/* ---------------- Experience ---------------- */

export function Experience() {
  return (
    <>
      <Menu items={['File', 'View', 'Help']} />
      <div className="wbody doc">
        <Title sub={experienceSubtitle}>Experience</Title>
        {experience.map((job) => (
          <article className="cvjob in" key={job.company}>
            <div className="cvhead">
              <div>
                <div className="cvrole">{job.role}</div>
                <div className="cvco">{job.company}</div>
              </div>
              <div className="cvwhen">{job.date}</div>
            </div>
            <ul>
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Status left={`${experience.length} roles`} right="Reverse chronological" />
    </>
  )
}

/* ---------------- Selected Work (folder) ---------------- */

export function Work({ open }) {
  return (
    <>
      <Menu items={['File', 'Edit', 'View', 'Help']} />
      <div className="folder in">
        {projects.map((p) => (
          <button className="fitem" key={p.id} onClick={() => open(`project:${p.id}`)}>
            <span className="g" aria-hidden="true">
              {p.icon}
            </span>
            <span className="lb">
              {p.title}
              <small>{p.tags[0]}</small>
            </span>
          </button>
        ))}
      </div>
      <Status left={projectsSubtitle} right={`${projects.length} object(s)`} />
    </>
  )
}

/* ---------------- Project detail ---------------- */

export function Project({ project: p }) {
  return (
    <>
      <Menu items={['File', 'View', 'Help']} />
      <div className="wbody doc pmeta">
        <span className="cat">{p.category}</span>
        <Title>{p.title}</Title>
        <p>{p.description}</p>
        <h3>What it does</h3>
        <ul className="pbul">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <table className="pspec in">
          <tbody>
            <tr>
              <td>Stack</td>
              <td>{p.tags.join(' · ')}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>Full-stack engineer — architecture, backend modules, APIs</td>
            </tr>
          </tbody>
        </table>
        {p.private ? (
          <div className="plock">
            <span aria-hidden="true">🔒</span>
            <span>Client work — the source repository and live demo are private.</span>
          </div>
        ) : null}
      </div>
      <Status left={p.title} right={`${p.tags.length} technologies`} />
    </>
  )
}

/* ---------------- Contact ---------------- */

export function Contact() {
  return (
    <>
      <Menu items={['File', 'Help']} />
      <div className="wbody doc">
        <Title>{contact.heading}</Title>
        <p>{contact.body}</p>
        <div className="field">
          <label htmlFor="c-email">E-mail</label>
          <span className="val" id="c-email">
            {profile.email}
          </span>
        </div>
        <div className="field">
          <label htmlFor="c-li">LinkedIn</label>
          <span className="val" id="c-li">
            linkedin.com/in/in-fahim
          </span>
        </div>
        <div className="field">
          <label htmlFor="c-gh">GitHub</label>
          <span className="val" id="c-gh">
            github.com/fahim2708
          </span>
        </div>
        <div className="btnrow">
          <a className="btn95" href={`mailto:${profile.email}`} style={{ textAlign: 'center' }}>
            Send E-mail
          </a>
          <a className="btn95" href={profile.linkedin} target="_blank" rel="noreferrer" style={{ textAlign: 'center' }}>
            LinkedIn ↗
          </a>
          <a className="btn95" href={profile.github} target="_blank" rel="noreferrer" style={{ textAlign: 'center' }}>
            GitHub ↗
          </a>
        </div>
      </div>
      <Status left="Open to roles & freelance" right={profile.email} />
    </>
  )
}

/* ---------------- My Computer ---------------- */

export function Computer() {
  return (
    <>
      <Menu items={['File', 'View', 'Help']} />
      <div className="wbody doc">
        <Title sub="System properties">My Computer</Title>
        <table className="pspec in">
          <tbody>
            <tr>
              <td>System</td>
              <td>
                {profile.os} {profile.version}
              </td>
            </tr>
            <tr>
              <td>Registered</td>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{profile.currentRole}</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>{profile.stack.join(' / ')}</td>
            </tr>
            <tr>
              <td>Uptime</td>
              <td>{stats[0].number} years</td>
            </tr>
          </tbody>
        </table>
        <div className="stats">
          {stats.map((s) => (
            <div className="stat in" key={s.label}>
              <b>{s.number}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Status left="System properties" right="OK" />
    </>
  )
}

/* ---------------- Resume.txt (Notepad) ---------------- */

const resumeText = [
  profile.name.toUpperCase(),
  profile.role,
  `${profile.email}  |  ${profile.linkedin}  |  ${profile.github}`,
  '',
  '='.repeat(60),
  'SUMMARY',
  '='.repeat(60),
  about.paragraphs[0],
  '',
  '='.repeat(60),
  'EXPERIENCE',
  '='.repeat(60),
  ...experience.flatMap((j) => [`${j.role} — ${j.company}`, `  ${j.date}`, ...j.bullets.map((b) => `  * ${b}`), '']),
  '='.repeat(60),
  'SKILLS',
  '='.repeat(60),
  ...skills.map((g) => `${g.title}: ${g.items.join(', ')}`),
  '',
  '='.repeat(60),
  'SELECTED PROJECTS',
  '='.repeat(60),
  ...projects.flatMap((p) => [`${p.title} (${p.category})`, `  ${p.tags.join(', ')}`, '']),
].join('\n')

export function Resume() {
  return (
    <>
      <Menu items={['File', 'Edit', 'Search', 'Help']} />
      <pre className="notepad">{resumeText}</pre>
      <Status left="Resume.txt" right={`${resumeText.split('\n').length} lines`} />
    </>
  )
}

