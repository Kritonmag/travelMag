import { Link } from 'react-router-dom'
import { useTheme } from '../theme'
import { useTranslation } from 'react-i18next'

function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()

  const switchLanguage = () => {
    const next = i18n.language === 'ru' ? 'en' : 'ru'
    void i18n.changeLanguage(next)
    localStorage.setItem('lng', next)
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid var(--border)'
    }} className="container">
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--fg)', fontWeight: 800, fontSize: 18 }}>
        {t('navbar.brand')}
      </Link>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link to="/" className="btn ghost">{t('navbar.home')}</Link>
        <button onClick={switchLanguage} className="btn ghost" style={{ width: 44, justifyContent: 'center' }}>
          {i18n.language === 'ru' ? 'EN' : 'RU'}
        </button>
        <button onClick={toggleTheme} className="btn ghost" style={{ width: 44, justifyContent: 'center' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default NavBar


