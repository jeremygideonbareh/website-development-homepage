const PROXY_URL = import.meta.env.VITE_API_URL || '/api/leads'
const API_SECRET = import.meta.env.VITE_INTERNAL_API_SECRET || ''

export async function submitLead(formData) {
  const headers = { 'Content-Type': 'application/json' }
  if (API_SECRET) headers['Authorization'] = `Bearer ${API_SECRET}`

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(formData),
  })

  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong.')
    error.status = res.status
    error.details = data.details || null
    error.statusCode = data.status
    throw error
  }

  return data
}
