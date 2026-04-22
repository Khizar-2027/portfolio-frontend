import { Link, useLocation } from 'react-router-dom'

const sectionLogos = {
  intro:   '⚔',
  skills:  '◈',
  work:    '{}',
  contact: '✦',
}

const sections = ['intro', 'skills', 'work', 'contact']
const sectionLabels = ['INTRO', 'SKILLS', 'WORK', 'CONTACT']

export default function Navbar({ activeSection }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Regular navbar for inner pages
  if (!isHome) {
    const linkStyle = (path) => ({
      color: pathname === path ? 'var(--accent)' : '#aaa',
      textDecoration: 'none',
      fontSize: '0.9rem',
      letterSpacing: '1px',
      borderBottom: pathname === path ? '1px solid var(--accent)' : '1px solid transparent',
      paddingBottom: '2px',
      transition: 'color 0.2s',
    })

    return (
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        background: 'rgba(15,14,12,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
      }}>
        <Link to="/" style={{
          color: 'var(--accent)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 'bold',
          letterSpacing: '3px',
          fontSize: '1rem',
        }}>
          ⚔ KHIZAR
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={linkStyle('/')}>Home</Link>
          <Link to="/about" style={linkStyle('/about')}>About</Link>
          <Link to="/projects" style={linkStyle('/projects')}>Projects</Link>
          <Link to="/contact" style={linkStyle('/contact')}>Contact</Link>
        </div>
      </nav>
    )
  }

  // Home page navbar — animated squares
  const currentLogo = sectionLogos[activeSection] || '⚔'

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        background: 'rgba(15,14,12,0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
      }}>

        {/* Animated logo — changes symbol per section */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--accent)',
          fontSize: '1.1rem',
          letterSpacing: '3px',
          fontWeight: 'bold',
        }}>
          <span
            key={currentLogo}
            style={{
              display: 'inline-block',
              animation: 'logoSwap 0.4s ease forwards',
            }}
          >
            {currentLogo}
          </span>
          <span style={{ marginLeft: '8px', fontSize: '0.85rem' }}>KHIZAR</span>
        </div>

        {/* 6 square boxes — active one expands */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {sections.map((sec, i) => {
            const isActive = activeSection === sec
            return (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '32px',
                  width: isActive ? 'auto' : '32px',
                  minWidth: '32px',
                  padding: isActive ? '0 14px' : '0',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-light)'}`,
                  borderRadius: '4px',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'transparent',
                  fontSize: '0.7rem',
                  letterSpacing: '1.5px',
                  fontFamily: 'var(--font-heading)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {isActive ? sectionLabels[i] : ''}
              </a>
            )
          })}

          {/* 2 extra decorative squares */}
          {[0, 1].map(i => (
            <div key={`dec-${i}`} style={{
              width: '32px',
              height: '32px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              opacity: 0.35,
            }} />
          ))}
        </div>
      </nav>

      {/* Flowing animated divider line */}
      <div style={{
        position: 'fixed',
        top: '70px',
        left: 0,
        right: 0,
        height: '1px',
        overflow: 'hidden',
        zIndex: 99,
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, var(--accent) 30%, var(--accent-hover) 50%, var(--accent) 70%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'flowLine 2.5s linear infinite',
          opacity: 0.6,
        }} />
      </div>

      <style>{`
        @keyframes flowLine {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes logoSwap {
          0%   { opacity: 0; transform: translateY(-8px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}