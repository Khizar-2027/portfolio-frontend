import Reveal from '../components/Reveal'
import { Link } from 'react-router-dom'

const stack = [
  "Python",
  "FastAPI",
  "Django",
  "Django REST Framework",
  "React",
  "JavaScript",
  "PostgreSQL",
  "MySQL",
  "SQLAlchemy",
  "Tailwind CSS",
  "Git",
];

export default function About() {
  return (
    <div style={{ paddingTop: '80px', maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 5rem' }}>

      {/* Heading */}
      <Reveal>
        <p style={{ color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>
          About me
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '3rem', lineHeight: 1.2 }}>
          Hey, I'm Khizar.
        </h1>
      </Reveal>

      {/* Bio */}
      <Reveal delay={100}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2.5rem',
          lineHeight: 1.9,
          color: 'var(--text-secondary)',
          fontSize: '1rem',
        }}>
          <p style={{ marginBottom: '1rem' }}>
            I'm a full-stack developer focused on building modern web applications with{" "}
            <span style={{ color: 'var(--accent)' }}>FastAPI</span>,{" "}
            <span style={{ color: 'var(--accent)' }}>Django</span>, and{" "}
            <span style={{ color: 'var(--accent)' }}>React</span>.
            I enjoy designing clean backend architectures, building REST APIs, and
            creating products that solve real-world problems.
          </p>

          <p style={{ marginBottom: '1rem' }}>
            Recently I've been building SaaS applications featuring authentication,
            role-based access control, drag-and-drop Kanban boards, file uploads,
            email workflows, and PostgreSQL databases. I'm always looking for ways
            to write cleaner code and better software.
          </p>

          <p>
            I'm currently looking for software engineering internships where I can
            contribute, learn from experienced developers, and continue growing as a
            backend-focused full-stack engineer.
          </p>
        </div>
      </Reveal>

      {/* Stack */}
      <Reveal delay={200}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
          Tech I work with
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '3rem' }}>
          {stack.map((s, i) => (
            <Reveal key={s} delay={i * 50}>
              <span style={{
                padding: '0.4rem 1rem',
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
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* What I build */}
      <Reveal delay={300}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
          What I build
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {[
              {
                title: "Full-Stack Applications",
                desc: "Building complete web applications using FastAPI, Django, React, and PostgreSQL.",
              },
              {
                title: "REST APIs",
                desc: "Designing secure APIs with authentication, authorization, validation, and database integration.",
              },
              {
                title: "Backend Systems",
                desc: "Developing scalable backend architectures, business logic, file handling, and background tasks.",
              },
              {
                title: "Modern UI",
                desc: "Creating responsive interfaces with React and Tailwind CSS focused on usability.",
              },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1.25rem',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal delay={400}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Want to work together?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            I'm currently looking for Software Engineering and Full-Stack internships.
            If you'd like to collaborate or discuss an opportunity, I'd love to hear
            from you.
          </p>
          <Link to="/contact" style={{
            padding: '0.8rem 2rem',
            background: 'var(--accent)',
            color: '#000',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            Let's talk
          </Link>
        </div>
      </Reveal>

    </div>
  )
}