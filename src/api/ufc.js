import { fetchJson, TSDB_BASE } from './client.js'

const UFC_LEAGUE_ID = '4443'

export async function fetchUFC() {
  const data = await fetchJson(`${TSDB_BASE}/eventsnextleague.php?id=${UFC_LEAGUE_ID}`)
  const events = data?.events || []
  const now = Date.now()

  return events
    .map((e) => {
      const iso = combineDateTime(e.dateEvent, e.strTime, e.strTimestamp)
      return {
        id: `ufc-${e.idEvent}`,
        title: e.strEvent || 'UFC Event',
        subtitle: e.strDescriptionEN ? truncate(e.strDescriptionEN, 110) : e.strSeason || '',
        location: e.strVenue
          ? [e.strVenue, e.strCountry].filter(Boolean).join(', ')
          : e.strCountry || '',
        dateISO: iso,
        badge: e.strLeague || 'UFC',
        link: 'https://www.ufc.com/events',
        ts: iso ? new Date(iso).getTime() : 0,
      }
    })
    .filter((e) => e.ts >= now - 12 * 3600 * 1000)
    .sort((a, b) => a.ts - b.ts)
    .slice(0, 8)
}

function combineDateTime(date, time, ts) {
  if (ts) return ts.includes('T') ? ts : `${ts}Z`
  if (!date) return null
  if (!time || time === '00:00:00') return `${date}T20:00:00Z`
  return `${date}T${time}Z`
}

function truncate(s, n) {
  if (!s) return ''
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}
