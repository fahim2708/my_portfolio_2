# FahimOS — a Windows 95 desktop portfolio

A portfolio for **Mollah Fahim Ul Islam**, Full Stack Software Engineer, built as a
clickable Windows 95 desktop rather than a scrolling one-pager.

- **Design** follows [nahidhasan.online](https://nahidhasan.online/) ("NahidOS") — the retro-OS
  résumé concept, its Win95 palette (`#c0c0c0` face, `#000082` title bar, `#0a8a8a` desktop),
  Tahoma/MS Sans Serif UI type, and the raised/inset bevel system.
- **Content** is taken from [fahimphp.netlify.app](https://fahimphp.netlify.app/) — bio, stats,
  skills, experience, projects and contact details, reproduced verbatim.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle into dist/
npm run lint
```

## How it works

The whole site is one desktop. `App.jsx` is the window manager: it owns the list of open
windows, their geometry and z-order, and passes callbacks down to the chrome components.

```
src/
  App.jsx                  window manager: open/close/focus/minimise/maximise/drag
  data/portfolio.js        all content, in one place
  apps/
    registry.js            window id -> title, icon, default size, body component
    windows.jsx            the window bodies (About, Skills, Experience, Work, …)
  components/
    BootScreen.jsx         "Starting FahimOS…" boot sequence (skippable)
    DesktopIcon.jsx        draggable shortcut; a click without movement opens it
    Window.jsx             title bar, minimise/maximise/close, pointer dragging
    Taskbar.jsx            Start button, task buttons, tray + clock
    StartMenu.jsx          Start menu with the vertical banner
  styles/win95.css         the design system — `.out`/`.in` bevels build everything
```

Adding a window means adding a component to `apps/windows.jsx` and one line to `APPS` in
`apps/registry.js`; add it to `DESKTOP_ICONS` to give it a desktop shortcut.

### Notes

- **Bevels.** `.out` (raised) and `.in` (inset) are the two primitives — buttons, windows,
  the taskbar and chips are all built from them, exactly as the reference does it.
- **Mobile.** Under 760px the desktop stops being a desktop: windows lose absolute
  positioning and stack full-width, icons become a grid, and the page scrolls normally.
- **Project links.** The source portfolio ships `#` placeholders for every demo/repo link,
  so those are rendered as a "client work — source private" note instead of dead links.
# my_portfolio_2
