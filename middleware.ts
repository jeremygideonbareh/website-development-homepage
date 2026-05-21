import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── In-memory rate limiter (local dev only) ────────────────────────────────
//
// ⚠️  PRODUCTION SWAP: Replace this Map with Upstash Redis or Vercel KV.
//
//   import { Redis } from '@upstash/redis'
//   const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!,
//                             token: process.env.UPSTASH_REDIS_REST_TOKEN! })
//
//   Then inside the middleware, use:
//     const key = `ratelimit:${ip}`
//     const count = await redis.incr(key)
//     if (count === 1) await redis.expire(key, 10)   // 10-second window
//     if (count > 5) return new NextResponse(...)
//
// ─────────────────────────────────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 10_000   // 10 seconds
const MAX_REQUESTS = 5     // 5 requests per window

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ??
             request.headers.get('x-real-ip') ??
             '127.0.0.1'

  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return NextResponse.next()
  }

  record.count += 1

  if (record.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too Many Requests', retryAfter: Math.ceil((record.resetAt - now) / 1000) },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((record.resetAt - now) / 1000)) } }
    )
  }

  return NextResponse.next()
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*',
}
