export async function fetchJson(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      Accept: 'application/json',
      ...(opts.headers || {}),
    },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json()
}

export const TSDB_BASE = 'https://www.thesportsdb.com/api/v1/json/3'
