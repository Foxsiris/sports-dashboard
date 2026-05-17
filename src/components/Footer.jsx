import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          Данные: <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer">TheSportsDB</a>
          {' · '}
          <a href="https://jolpi.ca/ergast/f1" target="_blank" rel="noreferrer">Jolpica F1 API</a>
          {' · '}
          <a href="https://www.hltv.org/matches" target="_blank" rel="noreferrer">HLTV</a>
        </p>
        <p className="footer__small">
          Время указано в вашем часовом поясе. Это фан-проект, не официальный источник.
        </p>
      </div>
    </footer>
  )
}
