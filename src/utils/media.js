export function getMediaUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'
  return `${base}${path}`
}