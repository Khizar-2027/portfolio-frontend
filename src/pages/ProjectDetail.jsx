import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../api'
import { getMediaUrl } from '../utils/media'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => {
    API.get(`/projects/${slug}/`).then(res => setProject(res.data))
  }, [slug])

  if (!project) return (
    <p style={{ paddingTop: '80px', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
      Loading...
    </p>
  )

  return (
    <div style={{ paddingTop: '80px', padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>

      <Link to="/projects" style={{
        color: 'var(--accent)',
        fontSize: '0.9rem',
        marginBottom: '2rem',
        display: 'inline-block',
        letterSpacing: '1px',
      }}>
        ← Back to projects
      </Link>

      {/* Thumbnail */}
      {project.thumbnail && (
        <img
          src={getMediaUrl(project.thumbnail)}
          alt={project.title}
          style={{
            width: '100%',
            borderRadius: '10px',
            marginBottom: '2rem',
            marginTop: '1rem',
            border: '1px solid var(--border)',
            display: 'block',
            maxHeight: '420px',
            objectFit: 'cover',
          }}
        />
      )}

      <h1 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>
        {project.title}
      </h1>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
        {project.short_description}
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {project.skills.map(s => (
          <span key={s.id} style={{
            fontSize: '0.8rem',
            padding: '4px 12px',
            border: '1px solid var(--border-light)',
            borderRadius: '20px',
            color: 'var(--accent)',
            background: 'var(--accent-soft)',
          }}>
            {s.name}
          </span>
        ))}
      </div>

      <div style={{
        color: 'var(--text-secondary)',
        lineHeight: 1.9,
        marginBottom: '2.5rem',
        fontSize: '0.975rem',
        whiteSpace: 'pre-line',
      }}>
        {project.full_description}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" style={{
            padding: '0.75rem 1.6rem',
            background: 'var(--accent)',
            color: '#000',
            borderRadius: '6px',
            fontWeight: '700',
            fontSize: '0.9rem',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            Live Site
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" style={{
            padding: '0.75rem 1.6rem',
            border: '1px solid var(--border-light)',
            borderRadius: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            GitHub
          </a>
        )}
      </div>

    </div>
  )
}