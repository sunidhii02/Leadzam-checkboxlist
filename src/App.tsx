import { useState } from 'react'
import './App.css'

const tasks = [
  { label: 'Connect a lead source', action: 'Open Integrations' },
  { label: 'Invite your team', action: 'Open Users' },
  { label: 'See every setting once', action: 'Open Settings' },
  { label: 'Add an active pipeline stage', action: 'Open Lead Stages' },
  { label: 'Find your leads', action: 'Open All Leads' },
  { label: 'Move a lead through your pipeline', action: 'Open All Leads' },
]

function App() {
  const [completed, setCompleted] = useState<boolean[]>(
    () => tasks.map(() => false),
  )
  const [isVisible, setIsVisible] = useState(true)
  const completedCount = completed.filter(Boolean).length

  if (!isVisible) return null

  return (
    <main className="page-shell">
      <section className="setup-panel" aria-label="Workspace setup checklist">
        <header className="panel-header">
          <div className="heading-row">
            <div>
              <h1>Finish setting up your workspace</h1>
              <p className="progress-label">{completedCount} of 6 done</p>
            </div>
            <button
              className="dismiss-button"
              type="button"
              aria-label="Dismiss setup checklist"
              onClick={() => setIsVisible(false)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 4 8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Setup progress"
            aria-valuemin={0}
            aria-valuemax={6}
            aria-valuenow={completedCount}
          >
            <span style={{ width: `${(completedCount / 6) * 100}%` }} />
          </div>
        </header>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li className="task-row" key={task.label}>
              <label className="task-label" htmlFor={`task-${index}`}>
                <input
                  className="task-checkbox"
                  id={`task-${index}`}
                  type="checkbox"
                  checked={completed[index]}
                  onChange={() =>
                  setCompleted((current) =>
                    current.map((value, taskIndex) =>
                      taskIndex === index ? !value : value,
                    ),
                  )
                }
                />
                <span className="task-check-indicator" aria-hidden="true">
                {completed[index] && (
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m3.5 8.2 3 3 6-6.2" />
                  </svg>
                )}
                </span>
                <span className={completed[index] ? 'is-complete' : undefined}>
                  {task.label}
                </span>
              </label>
              <a
                className="task-action"
                href="#"
                onClick={(event) => event.preventDefault()}
              >
                {task.action}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9m-4-4 4 4-4 4" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <footer className="panel-footer">
          <a href="#" onClick={(event) => event.preventDefault()}>
            See the full setup guide
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 4 4 4-4 4" />
            </svg>
          </a>
        </footer>
      </section>
    </main>
  )
}

export default App
