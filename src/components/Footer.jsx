export default function Footer() {
  const links = [
    { label: 'GitHub', href: 'https://github.com/Khizar-2027' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khizar-karge-79851b326/' },
    { label: 'Email', href: 'khizarkarge43@gmail.com' },
  ]

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-heading)',
        color: 'var(--accent)',
        fontSize: '1.1rem',
        letterSpacing: '2px',
        marginBottom: '1.5rem',
      }}>
        ⚔ KHIZAR
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '1px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >
            {l.label}
          </a>
        ))}
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        Designed & built by Khizar — {new Date().getFullYear()}
      </p>
    </footer>
  )
}