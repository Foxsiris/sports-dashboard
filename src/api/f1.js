import { fetchJson } from './client.js'

const JOLPICA = 'https://api.jolpi.ca/ergast/f1'

export async function fetchF1() {
  const year = new Date().getFullYear()
  const data = await fetchJson(`${JOLPICA}/${year}.json`)
  const races = data?.MRData?.RaceTable?.Races || []
  const now = Date.now()

  const upcoming = races
    .map((r) => {
      const iso = toISO(r.date, r.time)
      return {
        id: `f1-${year}-${r.round}`,
        title: r.raceName,
        subtitle: `Раунд ${r.round} · ${r.Circuit?.circuitName || ''}`,
        location: [r.Circuit?.Location?.locality, r.Circuit?.Location?.country]
          .filter(Boolean)
          .join(', '),
        dateISO: iso,
        badge: `Сезон ${year}`,
        link: r.url,
        ts: iso ? new Date(iso).getTime() : 0,
      }
    })
    .filter((r) => r.ts >= now - 6 * 3600 * 1000)
    .sort((a, b) => a.ts - b.ts)
    .slice(0, 6)

  return upcoming
}

function toISO(date, time) {
  if (!date) return null
  if (!time) return `${date}T00:00:00Z`
  return `${date}T${time}`
}
