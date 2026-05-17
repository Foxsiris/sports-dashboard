import { useEffect, useState } from 'react'
import './EventCard.css'

export default function EventCard({ item, accent }) {
  const { title, subtitle, location, dateISO, link, badge, meta } = item
  const [countdown, setCountdown] = useState(() => getCountdown(dateISO))

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown(dateISO)), 60_000)
    return () => clearInterval(t)
  }, [dateISO])

  const date = dateISO ? new Date(dateISO) : null
  const isPast = date && date.getTime() < Date.now()

  const body = (
    <article className={`card card--${accent} ${isPast ? 'card--past' : ''}`}>
      <div className="card__top">
        {badge && <span className="card__badge">{badge}</span>}
        {countdown && !isPast && (
          <span className={`card__countdown card__countdown--${accent}`}>{countdown}</span>
        )}
        {isPast && <span className="card__countdown card__countdown--past">завершено</span>}
      </div>

      <h3 className="card__title">{title}</h3>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}

      <div className="card__meta">
        {date && (
          <div className="card__row">
            <span className="card__icon">📅</span>
            <span>{formatDate(date)}</span>
          </div>
        )}
        {location && (
          <div className="card__row">
            <span className="card__icon">📍</span>
            <span>{location}</span>
          </div>
        )}
        {meta && meta.map((m, i) => (
          <div key={i} className="card__row">
            <span className="card__icon">{m.icon || '•'}</span>
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      {link && (
        <div className="card__footer">
          <span className="card__link">Подробнее →</span>
        </div>
      )}
    </article>
  )

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card__wrap">
      {body}
    </a>
  ) : (
    body
  )
}

function formatDate(d) {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const timeStr = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  if (sameDay(d, today)) return `Сегодня, ${timeStr}`
  if (sameDay(d, tomorrow)) return `Завтра, ${timeStr}`

  return d.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: d.getFullYear() === today.getFullYear() ? undefined : 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getCountdown(iso) {
  if (!iso) return null
  const target = new Date(iso).getTime()
  const diff = target - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  if (days > 0) return `через ${days}д ${hours}ч`
  if (hours > 0) return `через ${hours}ч ${minutes}м`
  return `через ${minutes}м`
}
