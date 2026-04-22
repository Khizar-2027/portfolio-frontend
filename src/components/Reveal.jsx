import useScrollReveal from '../hooks/useScrollReveal'

export default function Reveal({ children, delay = 0, direction = 'up' }) {
  const [ref, visible] = useScrollReveal()

  const transforms = {
    up: 'translateY(30px)',
    left: 'translateX(-30px)',
    right: 'translateX(30px)',
    none: 'none',
  }

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}