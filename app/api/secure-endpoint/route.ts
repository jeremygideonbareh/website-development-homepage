import { NextResponse } from 'next/server'
import { z } from 'zod'

// ─── Strict Zod schema ──────────────────────────────────────────────────────
const secureSchema = z.object({
  email: z.string().email('Invalid email format'),
  message: z.string().max(100, 'Message must be 100 characters or fewer'),
  count: z.number(),
})

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  // 1. Parse & validate incoming JSON
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    )
  }

  const parsed = secureSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { email, message, count } = parsed.data

  // 2. Securely access server-side secret (NEVER sent to client)
  const internalSecret = process.env.INTERNAL_API_SECRET ?? ''

  // 3. Simulate some server-side work using the secret
  //    (e.g., call an upstream API, sign a token, etc.)
  const _serverOnlyHash = crypto
    .createHash('sha256')
    .update(`${internalSecret}:${email}:${count}`)
    .digest('hex')

  // 4. Return a clean response — the secret is completely absent
  return NextResponse.json(
    {
      status: 'ok',
      received: { email, message, count },
      // ⚠️  Notice: internalSecret is NOT included here.
      //     Only fields you explicitly add will reach the client.
    },
    { status: 200 }
  )
}

// Allow OPTIONS for CORS pre-flight (if needed)
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}
