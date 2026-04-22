import { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'
import { getMediaUrl } from '../utils/media'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    API.get('/projects/').then(res => setProjects(res.data))
  }, [])

  return (
    <div style={{ paddingTop: '80px', padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Projects
      </h1>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        A collection of things I've built.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {projects.map(p => (
          <Link key={p.id} to={`/projects/${p.slug}`} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'block',
            transition: 'all 0.2s ease'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,169,106,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Thumbnail */}
            {p.thumbnail ? (
              <img
                src={getMediaUrl(p.thumbnail)}
                alt={p.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '200px',
                background: 'var(--bg-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', color: 'var(--text-muted)',
              }}>
                { }
              </div>
            )}

            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>{p.title}</h3>

              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                lineHeight: 1.6,
              }}>
                {p.short_description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {p.skills.map(s => (
                  <span key={s.id} style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    background: 'var(--accent-soft)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}