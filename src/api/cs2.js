import { fetchJson, TSDB_BASE } from './client.js'

const CS_LEAGUE_IDS = ['4608', '4431']

export async function fetchCS2() {
  const results = await Promise.allSettled(
    CS_LEAGUE_IDS.map((id) =>
      fetchJson(`${TSDB_BASE}/eventsnextleague.php?id=${id}`).catch(() => null),
    ),
  )

  const now = Date.now()
  const all = []
  for (const r of results) {
    if (r.status !== 'fulfilled' || !r.value) continue
    const events = r.value?.events || []
    for (const e of events) {
      const iso = combineDateTime(e.dateEvent, e.strTime, e.strTimestamp)
      all.push({
        id: `cs2-${e.idEvent}`,
        title: e.strEvent || 'CS2 Match',
        subtitle: e.strLeague || e.strSeason || '',
        location: [e.strVenue, e.strCountry].filter(Boolean).join(', '),
        dateISO: iso,
        badge: 'CS2',
        link: 'https://www.hltv.org/matches',
        ts: iso ? new Date(iso).getTime() : 0,
      })
    }
  }

  let upcoming = all
    .filter((e) => e.ts >= now - 6 * 3600 * 1000)
    .sort((a, b) => a.ts - b.ts)
    .slice(0, 9)

  if (upcoming.length === 0) {
    upcoming = await fetchCS2Fallback()
  }

  return upcoming
}

async function fetchCS2Fallback() {
  try {
    const data = await fetchJson(
      `${TSDB_BASE}/searchevents.php?e=Counter-Strike`,
    )
    const events = data?.event || []
    const now = Date.now()
    return events
      .map((e) => {
        const iso = combineDateTime(e.dateEvent, e.strTime, e.strTimestamp)
        return {
          id: `cs2-fb-${e.idEvent}`,
          title: e.strEvent,
          subtitle: e.strLeague || '',
          location: [e.strVenue, e.strCountry].filter(Boolean).join(', '),
          dateISO: iso,
          badge: 'CS2',
          link: 'https://www.hltv.org/matches',
          ts: iso ? new Date(iso).getTime() : 0,
        }
      })
      .filter((e) => e.ts >= now - 6 * 3600 * 1000)
      .sort((a, b) => a.ts - b.ts)
      .slice(0, 9)
  } catch {
    return []
  }
}

function combineDateTime(date, time, ts) {
  if (ts) return ts.includes('T') ? ts : `${ts}Z`
  if (!date) return null
  if (!time || time === '00:00:00') return `${date}T18:00:00Z`
  return `${date}T${time}Z`
}
