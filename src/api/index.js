import { sendLeadEmail, sendAutoReply } from './email'

const VALID_TIERS = ['The Velocity Build', 'The Growth Stack', 'The Apex Architecture']

const ALLOWED_MIME_TYPES = [
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain', 'image/png', 'image/jpeg', 'image/jpg',
  'application/zip', 'application/x-zip-compressed',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_FILES = 5
const MAX_BODY_SIZE = 5 * 1024 * 1024
const RATE_LIMIT_WINDOW = 60000
const RATE_LIMIT_MAX = 10

const rateLimitStore = new Map()
const authTokens = new Map()
const crypto = globalThis.crypto

function corsHeaders(request, env) {
  const allowed = (env.CORS_ORIGINS || 'https://rogue.codes,https://www.rogue.codes').split(',')
  const reqOrigin = request.headers.get('Origin') || ''
  const origin = allowed.includes(reqOrigin) ? reqOrigin : (allowed[0] || '*')
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'X-XSS-Protection': '0',
  }
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function checkRateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const key = `${ip}:${new URL(request.url).pathname}`
  const now = Date.now()

  if (!rateLimitStore.has(key)) rateLimitStore.set(key, [])

  const timestamps = rateLimitStore.get(key).filter(t => now - t < RATE_LIMIT_WINDOW)

  if (timestamps.length >= RATE_LIMIT_MAX) return false

  timestamps.push(now)
  rateLimitStore.set(key, timestamps)
  return true
}

function verifyAuth(request, env, ctx) {
  const expected = env.INTERNAL_API_SECRET || ''
  if (!expected) return null
  const auth = request.headers.get('Authorization') || ''
  if (!auth.startsWith('Bearer ')) return { status: 401, body: { message: 'Missing or invalid authorization header' } }
  const token = auth.slice(7)

  if (token.startsWith('sess_')) {
    const stored = authTokens.get(token)
    if (!stored || stored.expires < Date.now()) {
      authTokens.delete(token)
      return { status: 401, body: { message: 'Session expired or invalid' } }
    }
    return null
  }

  if (!constantTimeEqual(token, expected)) return { status: 401, body: { message: 'Invalid authorization token' } }
  return null
}

function validate(body) {
  const errors = []
  if (!body.name || !body.name.trim()) {
    errors.push({ loc: ['body', 'name'], msg: 'name must not be empty' })
  } else if (body.name.trim().length > 255) {
    errors.push({ loc: ['body', 'name'], msg: 'name must be 255 characters or fewer' })
  }
  if (!body.email || !body.email.trim()) {
    errors.push({ loc: ['body', 'email'], msg: 'email must not be empty' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.push({ loc: ['body', 'email'], msg: 'invalid email format' })
  }
  if (!body.message || !body.message.trim()) {
    errors.push({ loc: ['body', 'message'], msg: 'message must not be empty' })
  } else if (body.message.trim().length > 5000) {
    errors.push({ loc: ['body', 'message'], msg: 'message must be 5000 characters or fewer' })
  }
  if (body.phone && !/^[+\d][\d\s\-().]{6,20}$/.test(body.phone.trim())) {
    errors.push({ loc: ['body', 'phone'], msg: 'invalid phone format' })
  }
  if (body.project_tier && !VALID_TIERS.includes(body.project_tier)) {
    errors.push({ loc: ['body', 'project_tier'], msg: `invalid tier, must be one of: ${VALID_TIERS.join(', ')}` })
  }
  return errors
}

async function storeLead(body, env) {
  const lead = {
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company?.trim() || null,
    phone: body.phone?.trim() || null,
    project_tier: body.project_tier || null,
    message: body.message.trim(),
    files: body.files || null,
  }

  if (env.DB) {
    const { results } = await env.DB.prepare(
      `INSERT INTO leads (name, email, company, phone, project_tier, message, files)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       RETURNING id, name, email, company, phone, project_tier, message, files, timestamp`
    ).bind(lead.name, lead.email, lead.company, lead.phone, lead.project_tier, lead.message, lead.files).run()
    return results[0]
  }
  return lead
}

async function parseBody(request) {
  const ct = request.headers.get('Content-Type') || ''
  const contentLength = parseInt(request.headers.get('Content-Length') || '0', 10)

  if (contentLength > MAX_BODY_SIZE) {
    throw new Error('Request body too large')
  }

  if (ct.includes('multipart/form-data')) {
    const formData = await request.formData()
    const files = []
    for (const [key, value] of formData.entries()) {
      if (key === 'files' && value instanceof File) {
        if (files.length >= MAX_FILES) break
        if (value.size > MAX_FILE_SIZE) continue
        if (!ALLOWED_MIME_TYPES.includes(value.type)) continue
        const buffer = await value.arrayBuffer()
        const bytes = new Uint8Array(buffer)
        let binary = ''
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
        files.push({ name: value.name, type: value.type, size: value.size, data: btoa(binary) })
      }
    }
    return {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      project_tier: formData.get('project_tier'),
      message: formData.get('message'),
      files: files.length > 0 ? JSON.stringify(files.map(f => ({ name: f.name, type: f.type, size: f.size }))) : null,
    }
  }

  const text = await request.text()
  if (text.length > MAX_BODY_SIZE) throw new Error('Request body too large')
  return JSON.parse(text)
}

function corsPreflight(request) {
  const headers = corsHeaders(request, { CORS_ORIGINS: '' })
  return new Response(null, { status: 204, headers })
}

function generateSessionId() {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  let id = 'sess_'
  for (let i = 0; i < bytes.length; i++) id += bytes[i].toString(36).padStart(2, '0')
  return id
}

export async function handleApi(request, env, ctx = {}) {
  const url = new URL(request.url)
  const cors = { ...corsHeaders(request, env), ...securityHeaders() }
  const rateLimited = !url.pathname.startsWith('/api/auth')

  if (request.method === 'OPTIONS') return corsPreflight(request)

  if (rateLimited && !checkRateLimit(request)) {
    return json({ message: 'Too many requests. Try again later.' }, 429, cors)
  }

  if (url.pathname === '/health' && request.method === 'GET') {
    return json({ status: 'ok' }, 200, cors)
  }

  if (url.pathname === '/api/auth' && request.method === 'POST') {
    let body
    try { body = await request.json() } catch { return json({ message: 'Invalid JSON' }, 400, cors) }

    const adminPassword = env.ADMIN_PASSWORD || ''
    const salesPassword = env.SALES_PASSWORD || ''
    const password = body.password || ''

    let role = null
    if (constantTimeEqual(password, adminPassword)) role = 'admin'
    else if (constantTimeEqual(password, salesPassword)) role = 'sales'

    if (!role) return json({ message: 'Invalid password' }, 401, cors)

    const token = generateSessionId()
    authTokens.set(token, { role, expires: Date.now() + 86400000 })
    if (authTokens.size > 1000) {
      for (const [key, val] of authTokens) {
        if (val.expires < Date.now()) authTokens.delete(key)
      }
    }
    return json({ token }, 200, cors)
  }

  if (url.pathname === '/api/leads' && request.method === 'GET') {
    const authError = verifyAuth(request, env, ctx)
    if (authError) return json(authError.body, authError.status, cors)

    try {
      let leads
      if (env.DB) {
        const { results } = await env.DB.prepare(
          'SELECT id, name, email, company, phone, project_tier, message, files, timestamp FROM leads ORDER BY id DESC'
        ).all()
        leads = results
      } else {
        leads = []
      }
      return json({ leads }, 200, cors)
    } catch (err) {
      return json({ message: 'Internal server error' }, 500, cors)
    }
  }

  if (url.pathname === '/api/leads' && request.method === 'POST') {
    const authError = verifyAuth(request, env, ctx)
    if (authError) return json(authError.body, authError.status, cors)

    let body
    try { body = await parseBody(request) } catch {
      return json({ message: 'Invalid request body' }, 400, cors)
    }

    const errors = validate(body)
    if (errors.length > 0) {
      return json({ message: 'Validation failed', details: errors }, 400, cors)
    }

    try {
      const lead = await storeLead(body, env)
      ctx.waitUntil?.(sendLeadEmail(lead, env))
      ctx.waitUntil?.(sendAutoReply({ email: lead.email, name: lead.name }, env))
      return json(lead, 201, cors)
    } catch (err) {
      return json({ message: 'Internal server error' }, 500, cors)
    }
  }

  if (url.pathname === '/api/auto-reply' && request.method === 'POST') {
    let body
    try { body = await request.json() } catch {
      return json({ message: 'Invalid JSON' }, 400, cors)
    }

    if (!body.email || !body.name) {
      return json({ message: 'email and name are required' }, 400, cors)
    }

    const result = await sendAutoReply({ email: body.email, name: body.name }, env)
    if (result.sent) {
      return json({ message: 'Auto-reply sent', id: result.id }, 200, cors)
    }
    return json({ message: 'Auto-reply skipped', reason: result.reason }, 202, cors)
  }

  return json({ message: 'Not Found' }, 404, cors)
}
