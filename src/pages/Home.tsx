import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { fetchRoutes } from '../api/routes'
import type { RouteItem } from '../api/routes'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()
  const [data, setData] = useState<RouteItem[]>([])
  const [query, setQuery] = useState('')
  const guidesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    void fetchRoutes().then(setData)
  }, [])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.shortDescription.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q)
    )
  }, [data, query])

  const guides = [
    { name: 'Антон', city: 'Иркутск', spec: 'Хайкинг', rating: 4.8, tg: '@anton_guide', ig: '@baikal.pro', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Anton' },
    { name: 'Марина', city: 'Петропавловск‑Камчатский', spec: 'Фотограф', rating: 5.0, tg: '@marina_kam', ig: '@volcano_mr', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Marina' },
    { name: 'Георгий', city: 'Казбеги', spec: 'Road trip', rating: 4.6, tg: '@geo_kaz', ig: '@caucasus.walks', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=George' },
    { name: 'Ольга', city: 'Сочи', spec: 'Горные лыжи', rating: 4.9, tg: '@olga_ski', ig: '@sochi.ski', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Olga' },
    { name: 'Иван', city: 'Архыз', spec: 'Off-road', rating: 4.7, tg: '@ivan_offroad', ig: '@arhyz.drive', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ivan' },
    { name: 'Дарья', city: 'Алтай', spec: 'Хайкинг', rating: 4.8, tg: '@daria_altai', ig: '@altai.trips', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Daria' },
    { name: 'Алексей', city: 'Карелия', spec: 'Каякинг', rating: 4.5, tg: '@alex_karelia', ig: '@karelia.north', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alexey' },
    { name: 'Нина', city: 'Мурманск', spec: 'Northern lights', rating: 5.0, tg: '@nina_aurora', ig: '@aurora.hunt', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nina' },
    { name: 'Рустам', city: 'Дагестан', spec: 'Каньоны', rating: 4.7, tg: '@rustam_dag', ig: '@dag.canyons', img: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rustam' }
  ]

  const scrollGuidesBy = (dx: number) => {
    if (guidesRef.current) guidesRef.current.scrollBy({ left: dx, behavior: 'smooth' })
  }

  return (
    <main className="container" style={{ padding: '16px 0' }}>
      {/* Hero */}
      <section className="card" style={{ overflow: 'hidden', position: 'relative', marginBottom: 24, padding: 0 }}>
        <div style={{ position: 'relative', height: 320, background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbVUatVfN0T8wxV-M9qTwwlDQX3qX5L3pFhA&s) center/cover no-repeat' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <h1 style={{ color: 'white', margin: 0, fontSize: 36, textAlign: 'center' }}>{t('home.heroTitle')}</h1>
          </div>
        </div>
      </section>

      {/* Top routes */}
      <h2 style={{ margin: '16px 0' }}>{t('home.sections.topRoutes')}</h2>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, listStyle: 'none', padding: 0 }}>
        {filtered
          .slice()
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4)
          .map((route) => (
          <li key={route.id} className="card" style={{ overflow: 'hidden' }}>
            <Link to={`/routes/${route.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <img src={route.images[0]} alt={route.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h2 style={{ fontSize: 18, margin: 0 }}>{route.name}</h2>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {typeof route.difficulty === 'number' && (
                      <span
                        className="chip"
                        style={{
                          background: route.difficulty >= 8 ? 'var(--danger-soft)' : route.difficulty >= 5 ? 'var(--warning-soft)' : 'var(--success-soft)'
                        }}
                      >
                        {t('difficulty')}: {route.difficulty}
                      </span>
                    )}
                    <span className="chip">⭐ {route.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--muted)', margin: 0 }}>{route.shortDescription}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Ads */}
      <h2 style={{ margin: '24px 0 12px' }}>{t('home.sections.ads')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(260px, 1fr))', gap: 12 }}>
        {[
          {
            title: 'iFix Mobile',
            text: 'Ремонт телефонов. Быстро и качественно.',
            img: 'https://sunfixmobile.ee/wp-content/uploads/2022/05/1.jpg'
          },
          {
            title: 'Gusto',
            text: 'Лучшие рестораны города — бронируй столик.',
            img: 'https://lh3.googleusercontent.com/3FtdIrk7JtToIwQN0iaDqdZ-_oS9KIN9kfQPD6diHpHjptakCleWZMCJ1k9Ri5JLBUuwbfa7-GCGCr6Il-9LQ2g=w971-h641-l80-e31'
          },
          {
            title: 'OutdoorPro',
            text: 'Снаряжение для треккинга со скидкой.',
            img: 'https://7veter.ru/upload/delight.webpconverter/upload/medialibrary/9e1/l4krb7e4qpq04thvhtgl9ll84m68gw45.jpg.webp?169087047786534'
          }
        ].map((ad, idx) => (
          <div
            key={ad.title}
            className="card"
            style={{ overflow: 'hidden', gridColumn: idx === 0 ? '1 / -1' as any : undefined }}
          >
            <img src={ad.img} alt={ad.title} style={{ width: '100%', height: idx === 0 ? 220 : 160, objectFit: 'cover' }} />
            <div style={{ padding: 12 }}>
              <strong>{ad.title}</strong>
              <div style={{ color: 'var(--muted)' }}>{ad.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Guides */}
      <h2 style={{ margin: '24px 0 12px' }}>{t('home.sections.guides')}</h2>
      <div style={{ position: 'relative' }}>
        <button aria-label="prev" className="btn ghost" onClick={() => scrollGuidesBy(-360)} style={{ position: 'absolute', left: 0, top: '40%', zIndex: 5 }}>
          ←
        </button>
        <div style={{ overflow: 'hidden' }}>
          <div ref={guidesRef} style={{ display: 'flex', gap: 12, padding: '4px 4px', overflowX: 'auto', scrollBehavior: 'smooth' }}>
            {guides.map((g) => (
              <div key={g.name} className="card" style={{ overflow: 'hidden', minWidth: 260 }}>
                <img src={g.img} alt={g.name} style={{ width: '100%', height: 180, objectFit: 'cover', background: '#f3f4f6' }} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700 }}>{g.name}</div>
                    <span className="chip">⭐ {g.rating.toFixed(1)}</span>
                  </div>
                  <div style={{ color: 'var(--muted)' }}>{g.city} • {g.spec}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href="#" className="chip">TG: {g.tg}</a>
                    <a href="#" className="chip">IG: {g.ig}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button aria-label="next" className="btn ghost" onClick={() => scrollGuidesBy(360)} style={{ position: 'absolute', right: 0, top: '40%', zIndex: 5 }}>
          →
        </button>
      </div>

      {/* Activities */}
      <h2 style={{ margin: '24px 0 12px' }}>{t('home.sections.activities')}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {[
          'hiking', 'running', 'roadBiking', 'walking', 'driving', 'offroad', 'crossCountrySkiing', 'alpineSkiing', 'snowboarding'
        ].map((k) => (
          <button key={k} className="btn ghost">{t(`activities.${k}`)}</button>
        ))}
      </div>

      {/* Search input moved below activities */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ width: 'min(820px, 100%)', margin: '0 auto' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('home.searchPlaceholder') as string}
            className="input"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* All routes including top */}
      <h2 style={{ margin: '16px 0' }}>{t('home.title')}</h2>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, listStyle: 'none', padding: 0 }}>
        {filtered.map((route) => (
          <li key={route.id} className="card" style={{ overflow: 'hidden' }}>
            <Link to={`/routes/${route.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <img src={route.images[0]} alt={route.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h2 style={{ fontSize: 18, margin: 0 }}>{route.name}</h2>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {typeof route.difficulty === 'number' && (
                      <span
                        className="chip"
                        style={{
                          background: route.difficulty >= 8 ? 'var(--danger-soft)' : route.difficulty >= 5 ? 'var(--warning-soft)' : 'var(--success-soft)'
                        }}
                      >
                        {t('difficulty')}: {route.difficulty}
                      </span>
                    )}
                    <span className="chip">⭐ {route.rating.toFixed(1)}</span>
                  </div>
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


