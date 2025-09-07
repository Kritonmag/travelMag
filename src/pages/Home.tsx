import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchRoutes } from '../api/routes'
import type { RouteItem } from '../api/routes'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()
  const [data, setData] = useState<RouteItem[]>([])

  useEffect(() => {
    void fetchRoutes().then(setData)
  }, [])
  return (
    <main className="container" style={{ padding: '16px 0' }}>
      <h1 style={{ marginBottom: 16 }}>{t('home.title')}</h1>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, listStyle: 'none', padding: 0 }}>
        {data.map((route) => (
          <li key={route.id} className="card" style={{ overflow: 'hidden' }}>
            <Link to={`/routes/${route.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <img src={route.images[0]} alt={route.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h2 style={{ fontSize: 18, margin: 0 }}>{route.name}</h2>
                  <span className="chip">⭐ {route.rating.toFixed(1)}</span>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0 }}>{route.shortDescription}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home


