import { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Skeleton from '../components/Skeleton'

// Typewriter hook
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    setDisplay(word.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

function SectionDivider({ label }) {
  return (
    <div style={{
      padding: '0 2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      <span style={{
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        letterSpacing: '3px',
        fontFamily: 'var(--font-heading)',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  )
}

export default function Home({ setActiveSection }) {
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const titles = ['Full Stack Developer', 'Building cool stuff, one bug at a time', 'Available for work', 'Debugging my way to greatness']
  const typed = useTypewriter(titles)

  useEffect(() => {
    Promise.all([
      API.get('/skills/'),
      API.get('/projects/?featured=true'),
    ]).then(([s, p]) => {
      setSkills(s.data)
      setProjects(p.data)
      setLoading(false)
    })
  }, [])

  // Tells Navbar which section is currently visible
  useEffect(() => {
    const sectionIds = ['intro', 'skills', 'work', 'contact']
    const observers = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.45 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [setActiveSection])

  return (
    <div style={{ paddingTop: '71px' }}>

      {/* ── INTRO ── */}
      <section id="intro" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>

          <Reveal delay={0}>
            <p style={{
              color: 'var(--accent)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              letterSpacing: '3px',
              fontFamily: 'var(--font-heading)',
              minHeight: '1.4em',
            }}>
              {typed}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: 'var(--accent)',
                marginLeft: '3px',
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
              }} />
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: '1.05',
              marginBottom: '1.5rem',
              letterSpacing: '-1px',
            }}>
              Hi, I'm<br />
              <span style={{ color: 'var(--accent)' }}>Khizar.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              fontSize: '1.05rem',
              marginBottom: '2.5rem',
              lineHeight: 1.8,
            }}>
              I build web apps, mostly before the bugs win,
              Simple to use, hard to ignore, and built with a bit of personality.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '0.85rem 1.8rem',
                  background: 'var(--accent)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-heading)',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                View Work
              </button>
              <Link to="/contact" style={{
                padding: '0.85rem 1.8rem',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                fontFamily: 'var(--font-heading)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                Contact
              </Link>
              <Link to="/about" style={{
                padding: '0.85rem 1.8rem',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                fontFamily: 'var(--font-heading)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                About Me
              </Link>
            </div>
          </Reveal>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.4,
          }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--text-muted)' }}>SCROLL</span>
            <div style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }} />
          </div>

        </div>
      </section>

      <SectionDivider label="SKILLS" />

      {/* ── SKILLS ── */}
      <section id="skills" style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>

          <Reveal>
            <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              WHAT I KNOW
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Skills & Stack</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '0.95rem', maxWidth: '500px', lineHeight: 1.7 }}>
              Technologies I use to build real, production-ready products.
            </p>
          </Reveal>

          {/* What I build cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.2rem',
            marginBottom: '3rem',
          }}>
            {[
              { icon: '⚙', title: 'Web Apps', desc: 'Projects built with Django and React' },
              { icon: '⚡', title: 'APIs', desc: 'Backend endpoints for forms and data' },
              { icon: '◈', title: 'Frontend Development', desc: 'Building pages and interactive components' },
              { icon: '▣', title: 'Problem Solving', desc: 'Breaking problems into simple working parts' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(201,169,106,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Skill tags from backend */}
          <Reveal delay={200}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '1.25rem' }}>TECH</h3>
          </Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {loading
              ? Array(8).fill(0).map((_, i) => <Skeleton key={i} width="80px" height="36px" borderRadius="20px" />)
              : skills.map((s, i) => (
                <Reveal key={s.id} delay={i * 50}>
                  <span style={{
                    padding: '0.5rem 1.1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-card)',
                    display: 'block',
                    transition: 'border-color 0.2s, color 0.2s',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  >
                    {s.name}
                  </span>
                </Reveal>
              ))
            }
          </div>
        </div>
      </section>

      <SectionDivider label="WORK" />

      {/* ── WORK ── */}
      <section id="work" style={{
        minHeight: '80vh',
        padding: '6rem 2rem',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <Reveal>
            <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              WHAT I'VE BUILT
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Featured Work</h2>
              <Link to="/projects" style={{ fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                ALL PROJECTS →
              </Link>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {loading
              ? Array(2).fill(0).map((_, i) => <Skeleton key={i} width="100%" height="200px" borderRadius="12px" />)
              : projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 120}>
                  <Link to={`/projects/${p.slug}`} style={{
                    padding: '1.75rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    display: 'block',
                    transition: 'all 0.28s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)'
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(201,169,106,0.12)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '1px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
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
                  </Link>
                </Reveal>
              ))
            }
          </div>
        </div>
      </section>

      <SectionDivider label="CONTACT" />

      {/* ── CONTACT CTA ── */}
      <section id="contact" style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
      }}>
        <div style={{ maxWidth: '680px', width: '100%', textAlign: 'center' }}>
          <Reveal>
            <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              LET'S WORK TOGETHER
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Have a project in mind?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.8 }}>
              I'm currently available for freelance work. If you have an idea you want to bring to life, I'd love to hear about it.
            </p>
            <Link to="/contact" style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '0.95rem',
              letterSpacing: '1px',
              fontFamily: 'var(--font-heading)',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Get In Touch
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}