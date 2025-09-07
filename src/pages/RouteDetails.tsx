import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { fetchRouteById } from '../api/routes'
import type { RouteItem } from '../api/routes'
import { useTranslation } from 'react-i18next'

function RouteDetails() {
  const { routeId } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [route, setRoute] = useState<RouteItem | undefined>(undefined)
  const [favorite, setFavorite] = useState<boolean>(false)

  useEffect(() => {
    if (routeId) void fetchRouteById(routeId).then((r) => {
      setRoute(r)
      const fav = localStorage.getItem(`fav:${r?.id}`) === '1'
      setFavorite(fav)
    })
  }, [routeId])

  const mapUrl = useMemo(() => {
    if (!route) return '#'
    return `https://www.openstreetmap.org/?mlat=${route.coords.lat}&mlon=${route.coords.lng}#map=12/${route.coords.lat}/${route.coords.lng}`
  }, [route])

  if (!route) {
    return (
      <main style={{ padding: 16 }}>
        <p>{t('route.notFound')}</p>
        <Link to="/">{t('route.backHome')}</Link>
      </main>
    )
  }

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: route?.name, text: route?.shortDescription, url })
      } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied')
    }
  }

  const toggleFavorite = () => {
    if (!route) return
    const next = !favorite
    setFavorite(next)
    localStorage.setItem(`fav:${route.id}`, next ? '1' : '0')
  }

  return (
    <main className="container" style={{ padding: '16px 0' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ borderRadius: 6 }}>← Назад</button>
          <h1 style={{ margin: 0 }}>{route.name}</h1>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>{route.location} • ⭐ {route.rating.toFixed(1)} • {route.author}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={share}>Поделиться</button>
          <button onClick={toggleFavorite}>{favorite ? '★ В избранном' : '☆ В избранное'}</button>
          <a href={mapUrl} target="_blank" rel="noreferrer"><button>Открыть в карте</button></a>
        </div>
      </header>

      <nav style={{ position: 'sticky', top: 0, background: 'var(--bg)', padding: '8px 0', borderBottom: '1px solid var(--border)', zIndex: 10, marginBottom: 16, display: 'flex', gap: 12 }}>
        <a href="#desc" onClick={(e) => { e.preventDefault(); document.getElementById('desc')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Описание</a>
        <a href="#map" onClick={(e) => { e.preventDefault(); document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Карта</a>
        <a href="#reviews" onClick={(e) => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Отзывы</a>
        <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>Особенности</a>
      </nav>

      <section className="hero card" style={{ marginBottom: 16 }}>
        <img src={route.images[0]} alt={route.name} />
        <div className="overlay" />
        <div className="content">
          <div className="chip" style={{ marginBottom: 8 }}>⭐ {route.rating.toFixed(1)}</div>
          <h1 style={{ margin: 0 }}>{route.name}</h1>
          <div style={{ color: '#d1d5db' }}>{route.location} • {route.author}</div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>Длина</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{route.stats.lengthKm} km</div>
        </div>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>Набор высоты</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{route.stats.elevationGainM} m</div>
        </div>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>Время</div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{route.stats.estimatedTimeH.toFixed(2)} h</div>
        </div>
      </section>

      <section id="desc" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Описание</h2>
        <p>{route.description}</p>
      </section>

      <section id="map" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Координаты и карта</h2>
        <div style={{ color: 'var(--muted)', marginBottom: 8 }}>lat: {route.coords.lat}, lng: {route.coords.lng}</div>
        <iframe
          title="map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${route.coords.lng-0.1}%2C${route.coords.lat-0.1}%2C${route.coords.lng+0.1}%2C${route.coords.lat+0.1}&layer=mapnik&marker=${route.coords.lat}%2C${route.coords.lng}`}
          style={{ width: '100%', height: 360, border: '1px solid var(--border)', borderRadius: 8 }}
        />
      </section>

      <section id="reviews" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Отзывы</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {route.reviews.map((r, idx) => (
            <li key={idx} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{r.user}</strong>
                <span>⭐ {r.rating}</span>
              </div>
              <p style={{ margin: '6px 0 0 0' }}>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="features" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Особенности маршрута</h2>
        <ul>
          {route.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default RouteDetails


