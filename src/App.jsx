import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import SportSection from './components/SportSection.jsx'
import Footer from './components/Footer.jsx'
import { fetchCS2 } from './api/cs2.js'
import { fetchF1 } from './api/f1.js'
import { fetchUFC } from './api/ufc.js'

const TABS = [
  { id: 'all', label: 'Все' },
  { id: 'cs2', label: 'CS2' },
  { id: 'f1', label: 'Formula 1' },
  { id: 'ufc', label: 'UFC' },
]

function App() {
  const [tab, setTab] = useState('all')
  const [cs2, setCs2] = useState({ items: [], loading: true, error: null })
  const [f1, setF1] = useState({ items: [], loading: true, error: null })
  const [ufc, setUfc] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    let alive = true
    const load = async (fn, setter) => {
      try {
        const items = await fn()
        if (alive) setter({ items, loading: false, error: null })
      } catch (e) {
        if (alive) setter({ items: [], loading: false, error: e?.message || 'Ошибка загрузки' })
      }
    }
    load(fetchCS2, setCs2)
    load(fetchF1, setF1)
    load(fetchUFC, setUfc)
    return () => {
      alive = false
    }
  }, [])

  const sections = useMemo(
    () => [
      { id: 'cs2', title: 'CS2', subtitle: 'Ближайшие турниры', accent: 'cs2', state: cs2 },
      { id: 'f1', title: 'Formula 1', subtitle: 'Ближайшие гонки', accent: 'f1', state: f1 },
      { id: 'ufc', title: 'UFC', subtitle: 'Ближайшие бои', accent: 'ufc', state: ufc },
    ],
    [cs2, f1, ufc],
  )

  const visible = tab === 'all' ? sections : sections.filter((s) => s.id === tab)

  return (
    <div className="app">
      <Header tabs={TABS} activeTab={tab} onTab={setTab} />
      <main className="container">
        {visible.map((s) => (
          <SportSection key={s.id} {...s} />
        ))}
      </main>
      <Footer />
    </div>
  )
}

export default App
