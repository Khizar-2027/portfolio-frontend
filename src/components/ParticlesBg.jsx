import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { initParticlesEngine } from '@tsparticles/react'
import { loadStarsPreset } from '@tsparticles/preset-stars'
import { useEffect, useState } from 'react'

export default function ParticlesBg() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadStarsPreset(engine)
    }).then(() => setInit(true))
  }, [])

  const options = {
    preset: 'stars',
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 60 },
      color: { value: '#c9a96a' },
      opacity: { value: 0.2 },
      size: { value: { min: 0.5, max: 2 } },
      move: { enable: true, speed: 0.2 },
    },
  }

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}