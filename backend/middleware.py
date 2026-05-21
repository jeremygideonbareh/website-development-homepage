import time
from collections import defaultdict
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

# ─── In-memory rate limiter (local dev only) ─────────────────────────────────
#
# ⚠️  PRODUCTION SWAP: Replace this dict with Redis / Upstash KV.
#
#   import redis
#   r = redis.from_url(os.getenv("REDIS_URL"))
#
#   Then inside the middleware:
#     key = f"ratelimit:{client_ip}"
#     count = r.incr(key)
#     if count == 1:
#         r.expire(key, WINDOW_SECONDS)
#     if count > MAX_REQUESTS:
#         return JSONResponse(status_code=429, content={...})
#
# ─────────────────────────────────────────────────────────────────────────────

WINDOW_SECONDS = 10
MAX_REQUESTS = 5

# {ip: [(timestamp, ...), ...]}
rate_limit_store: dict[str, list[float]] = defaultdict(list)


class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        now = time.monotonic()

        # Prune expired entries outside the window
        rate_limit_store[client_ip] = [
            t for t in rate_limit_store[client_ip]
            if now - t < WINDOW_SECONDS
        ]

        if len(rate_limit_store[client_ip]) >= MAX_REQUESTS:
            return Response(
                status_code=429,
                media_type="application/json",
                content='{"error":"Too Many Requests","retry_after":' + str(WINDOW_SECONDS) + '}',
                headers={"Retry-After": str(WINDOW_SECONDS)},
            )

        rate_limit_store[client_ip].append(now)
        response = await call_next(request)
        return response
