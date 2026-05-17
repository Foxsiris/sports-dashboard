import EventCard from './EventCard.jsx'
import Skeleton from './Skeleton.jsx'
import './SportSection.css'

export default function SportSection({ id, title, subtitle, accent, state }) {
  const { items, loading, error } = state

  return (
    <section className={`section section--${accent}`} id={id}>
      <div className="section__head">
        <div>
          <h2 className="section__title">
            <span className={`section__chip chip--${accent}`}>{title}</span>
            <span className="section__sub">{subtitle}</span>
          </h2>
        </div>
        {!loading && !error && (
          <span className="section__count">
            {items.length} {pluralize(items.length, ['событие', 'события', 'событий'])}
          </span>
        )}
      </div>

      {loading && (
        <div className="grid">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      {error && (
        <div className="section__error">
          Не удалось загрузить данные: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="section__empty">Ближайших событий не найдено</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid">
          {items.map((it) => (
            <EventCard key={it.id} item={it} accent={accent} />
          ))}
        </div>
      )}
    </section>
  )
}

function pluralize(n, forms) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
