/**
 *  Proxy Server — bridges the React UI to the FastAPI backend.
 *
 *  The frontend NEVER hits the Python server directly.
 *  All requests go through this proxy, which:
 *   1. Receives form data from the client
 *   2. Attaches the INTERNAL_API_SECRET header
 *   3. Forwards to the (potentially private) FastAPI backend
 *   4. Sanitizes errors before returning to the client
 *
 *  Usage (run alongside `npm run dev`):
 *    node server/proxy.js
 */

import http from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Load .env from the backend folder ────────────────────────────────────────
function loadEnv(path) {
  if (!existsSync(path)) return {}
  const env = {}
  for (const line of readFileSync(path, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

const env = {
  ...loadEnv(resolve(__dirname, '../backend/.env')),
  ...process.env,  // shell env vars override
}

const PYTHON_API_URL = env.PYTHON_API_URL || 'http://localhost:8000'
const INTERNAL_API_SECRET = env.INTERNAL_API_SECRET || ''
const PROXY_PORT = Number(env.PROXY_PORT) || 3001

if (!INTERNAL_API_SECRET) {
  console.warn('⚠ WARNING: INTERNAL_API_SECRET is not set. The proxy will still forward requests.')
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== 'POST' || !req.url?.startsWith('/api/leads')) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  let body = ''
  for await (const chunk of req) body += chunk

  try {
    const pythonRes = await fetch(`${PYTHON_API_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INTERNAL_API_SECRET}`,
      },
      body,
    })

    const data = await pythonRes.json()
    const status = pythonRes.status

    if (status === 422) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'validation_error',
        details: data.detail || data,
      }))
      return
    }

    if (status === 429) {
      res.writeHead(429, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'rate_limited',
        message: 'Too many requests. Please wait a moment and try again.',
      }))
      return
    }

    if (status >= 400) {
      res.writeHead(status, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'error',
        message: data.detail?.[0]?.msg || 'Something went wrong.',
      }))
      return
    }

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'success', data }))

  } catch (err) {
    res.writeHead(502, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'proxy_error',
      message: 'Could not reach the backend server.',
    }))
  }
})

server.listen(PROXY_PORT, () => {
  console.log(`✓ Proxy server running on http://localhost:${PROXY_PORT}`)
  console.log(`  Forwarding to Python backend at ${PYTHON_API_URL}`)
})
