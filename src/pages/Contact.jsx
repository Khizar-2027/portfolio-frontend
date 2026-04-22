import { useState } from 'react'
import API from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    setLoading(true)
    try {
      await API.post('/contact/', form)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      alert('Error sending message')
    }
    setLoading(false)
  }

  return (
    <div style={{ paddingTop: '80px', padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Contact
      </h1>

      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: '2rem'
      }}>
        Let’s work together.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <input name="name" placeholder="Your name" value={form.name} onChange={handle}
          style={inputStyle} />

        <input name="email" placeholder="Your email" value={form.email} onChange={handle}
          style={inputStyle} />

        <textarea name="message" rows="5" placeholder="Your message"
          value={form.message} onChange={handle}
          style={inputStyle} />

        {sent && (
          <p style={{ color: '#00ff88' }}>Message sent successfully!</p>
        )}

        <button onClick={submit} disabled={loading}
          style={{
            padding: '0.8rem',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>

      </div>
    </div>
  )
}

const inputStyle = {
  padding: '0.8rem',
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  color: 'white'
}