import { useEffect, useState } from 'react'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        borderRadius: '9999px',
        width: 44,
        height: 44,
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}

export default ScrollTopButton


