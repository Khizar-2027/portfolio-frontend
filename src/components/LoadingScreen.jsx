import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('visible') // visible → fading → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 1800)
    const t2 = setTimeout(() => onDone(), 2300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: phase === 'fading' ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: phase === 'fading' ? 'none' : 'all',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        color: 'var(--accent)',
        fontSize: '2rem',
        letterSpacing: '6px',
        fontWeight: 700,
        marginBottom: '2rem',
        animation: 'loadPulse 1.5s ease-in-out infinite',
      }}>
        ⚔ KHIZAR
      </div>

      {/* Progress bar */}
      <div style={{
        width: '160px',
        height: '1px',
        background: 'var(--border)',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'var(--accent)',
          animation: 'loadBar 1.8s ease forwards',
        }} />
      </div>

      <style>{`
        @keyframes loadPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes loadBar {
          0%   { width: 0%; }
          60%  { width: 80%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}