import './Header.css'

export default function Header({ tabs, activeTab, onTab }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__logo">
            <span className="dot dot--cs2" />
            <span className="dot dot--f1" />
            <span className="dot dot--ufc" />
          </div>
          <div>
            <h1 className="header__title">Sports Dashboard</h1>
            <p className="header__subtitle">CS2 · Formula 1 · UFC — всё ближайшее в одном месте</p>
          </div>
        </div>
        <nav className="header__tabs" aria-label="Фильтр">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tab ${activeTab === t.id ? 'tab--active' : ''}`}
              onClick={() => onTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
