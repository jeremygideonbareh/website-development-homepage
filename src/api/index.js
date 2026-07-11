// ─── In-memory store (fallback when no D1 binding) ───────────────────────────
const memoryStore = []
let nextId = 1

const VALID_TIERS = ['The Velocity Build', 'The Growth Stack', 'The Apex Architecture']

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
  if (body.project_tier && !VALID_TIERS.includes(body.project_tier)) {
    errors.push({ loc: ['body', 'project_tier'], msg: `invalid tier, must be one of: ${VALID_TIERS.join(', ')}` })
  }
  return errors
}

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

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

async function storeLead(body, env) {
  const lead = {
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company?.trim() || null,
    project_tier: body.project_tier || null,
    message: body.message.trim(),
  }

  // D1 path — used when env.DB binding exists
  if (env.DB) {
    const { results } = await env.DB.prepare(
      `INSERT INTO leads (name, email, company, project_tier, message)
       VALUES (?, ?, ?, ?, ?)
       RETURNING id, name, email, company, project_tier, message, timestamp`
    ).bind(lead.name, lead.email, lead.company, lead.project_tier, lead.message).run()
    return results[0]
  }

  // In-memory fallback
  const id = nextId++
  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0]
  memoryStore.push({ id, ...lead, timestamp })
  return { id, ...lead, timestamp }
}

function verifyAuth(request, env) {
  const expected = env.INTERNAL_API_SECRET || ''
  if (!expected) return null // no secret configured — skip check
  const auth = request.headers.get('Authorization') || ''
  if (!auth.startsWith('Bearer ')) return { status: 401, body: { message: 'Missing or invalid authorization header' } }
  if (auth.slice(7) !== expected) return { status: 401, body: { message: 'Invalid authorization token' } }
  return null
}

export async function handleApi(request, env) {
  const url = new URL(request.url)
  const cors = corsHeaders(request, env)

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors })
  }

  // Health check
  if (url.pathname === '/health' && request.method === 'GET') {
    return json({ status: 'ok' }, 200, cors)
  }

  // POST /api/leads
  if (url.pathname === '/api/leads' && request.method === 'POST') {
    const authError = verifyAuth(request, env)
    if (authError) return json(authError.body, authError.status, cors)

    let body
    try { body = await request.json() } catch {
      return json({ message: 'Invalid JSON body' }, 400, cors)
    }

    const errors = validate(body)
    if (errors.length > 0) {
      return json({ message: 'Validation failed', details: errors }, 400, cors)
    }

    try {
      const lead = await storeLead(body, env)
      return json(lead, 201, cors)
    } catch (err) {
      return json({ message: 'Internal server error' }, 500, cors)
    }
  }

  return json({ message: 'Not Found' }, 404, cors)
}
