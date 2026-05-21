import assert from 'node:assert'

const BASE = 'http://localhost:3000/api/secure-endpoint'
const PASS = '\x1b[32m✓ PASS\x1b[0m'
const FAIL = '\x1b[31m✗ FAIL\x1b[0m'

// ─── Test A: The Zod Shield ─────────────────────────────────────────────────
async function testZodShield() {
  console.log('\n── Test A: Zod Validation Shield ──')

  const malformedPayload = {
    email: 'not-an-email',   // bad format
    // message is missing
    count: 'not-a-number',   // wrong type
    extraField: 'should be stripped',
  }

  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(malformedPayload),
  })

  const json = await res.json()

  assert.strictEqual(res.status, 400, `Expected 400, got ${res.status}`)
  assert.ok(json.details, 'Expected validation error details')
  assert.ok(json.details.email, 'Expected email field error')
  assert.ok(json.details.message, 'Expected message field error')
  assert.ok(json.details.count, 'Expected count field error')

  console.log(`${PASS}  Malformed payload rejected with 400 + field errors`)
}

// ─── Test B: The API Leak Test ──────────────────────────────────────────────
async function testApiLeak() {
  console.log('\n── Test B: Secret Leak Prevention ──')

  const validPayload = {
    email: 'test@example.com',
    message: 'Hello from the stress test',
    count: 42,
  }

  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validPayload),
  })

  const json = await res.json()
  const bodyStr = JSON.stringify(json)

  assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`)
  assert.ok(!bodyStr.includes('INTERNAL_API_SECRET'), 'Response must not contain secret name')
  assert.ok(!bodyStr.includes('supersecretkey'), 'Response must not contain secret value')

  console.log(`${PASS}  200 OK returned — no secrets leaked to client`)
}

// ─── Test C: DDoS Simulation ────────────────────────────────────────────────
async function testRateLimit() {
  console.log('\n── Test C: Rate-Limit DDoS Simulation ──')

  const validPayload = { email: 'ddos@test.com', message: 'ratelimit test', count: 1 }
  const results = []

  // Fire 8 requests in parallel
  const promises = Array.from({ length: 8 }, () =>
    fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    }).then((r) => r.status)
  )

  const statuses = await Promise.all(promises)
  statuses.forEach((s, i) => results.push({ req: i + 1, status: s }))

  const allowed = results.filter((r) => r.status === 200)
  const blocked = results.filter((r) => r.status === 429)

  assert.ok(allowed.length <= 5, `Expected ≤5 allowed, got ${allowed.length}`)
  assert.ok(blocked.length >= 3, `Expected ≥3 blocked, got ${blocked.length}`)

  results.forEach((r) => {
    const icon = r.status === 200 ? PASS : r.status === 429 ? PASS : FAIL
    console.log(`  ${icon}  Request ${r.req} → ${r.status}`)
  })

  console.log(`${PASS}  ${allowed.length} allowed, ${blocked.length} blocked (429)`)
}

// ─── Runner ─────────────────────────────────────────────────────────────────
;(async () => {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   OWASP Security Layer Stress Test       ║')
  console.log('╚══════════════════════════════════════════╝')

  try {
    await testZodShield()
    await testApiLeak()
    await testRateLimit()

    console.log('\n\x1b[36mAll tests passed.\x1b[0m')
  } catch (err) {
    console.error(`\n${FAIL}  ${err.message}`)
    process.exit(1)
  }
})()
