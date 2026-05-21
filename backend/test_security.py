import asyncio
import json
import sys
import httpx

# Test through the proxy (the real secure path)
BASE = "http://localhost:3001"
PASS = "[PASS]"
FAIL = "[FAIL]"


async def test_zod_shield():
    print("\n-- Test A: Pydantic Validation Shield --")

    malformed = {
        "email": "not-an-email",
        "count": "not-a-number",
        "extraField": "should be dropped",
    }

    async with httpx.AsyncClient() as client:
        res = await client.post(f"{BASE}/api/leads", json=malformed)
        body = res.json()

    # Proxy converts FastAPI's 422 into a 400 with sanitized error payload
    assert res.status_code == 400, f"Expected 400, got {res.status_code}"
    assert body.get("status") == "validation_error", "Expected validation_error status"
    assert body.get("details") is not None, "Expected validation error details"
    print(f"{PASS}  Malformed payload rejected with 400 + field errors")
    print(f"       Errors: {json.dumps(body.get('details', body), indent=2)}")


async def test_api_leak():
    print("\n-- Test B: Secret Leak Prevention --")

    valid = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello from the stress test",
        "project_tier": "The Velocity Build",
    }

    async with httpx.AsyncClient() as client:
        res = await client.post(f"{BASE}/api/leads", json=valid)
        body = res.json()
        body_str = json.dumps(body)

    # Proxy returns status=201 with { status: "success", data: { lead fields } }
    assert res.status_code == 201, f"Expected 201, got {res.status_code}"
    assert body.get("status") == "success", "Expected success status"
    assert body.get("data") is not None, "Expected data payload"
    data = body["data"]
    assert "INTERNAL_API_SECRET" not in body_str, "Response must not contain secret name"
    assert "supersecretkey" not in body_str, "Response must not contain secret value"
    assert "id" in data, "Response must contain lead id"
    assert "name" in data, "Response must contain lead name"
    print(f"{PASS}  201 Created returned -- no secrets leaked to client")


async def test_rate_limit():
    print("\n-- Test C: Rate-Limit DDoS Simulation --")

    valid = {
        "name": "DDoS Test",
        "email": "ddos@test.com",
        "message": "ratelimit test",
    }

    async with httpx.AsyncClient() as client:
        tasks = [client.post(f"{BASE}/api/leads", json=valid) for _ in range(8)]
        responses = await asyncio.gather(*tasks)

    statuses = [r.status_code for r in responses]
    allowed = statuses.count(201)
    blocked = statuses.count(429)

    for i, s in enumerate(statuses, 1):
        icon = PASS if s in (201, 429) else FAIL
        print(f"  {icon}  Request {i} -> {s}")

    assert allowed <= 5, f"Expected <=5 allowed, got {allowed}"
    assert blocked >= 3, f"Expected >=3 blocked, got {blocked}"
    print(f"{PASS}  {allowed} allowed, {blocked} blocked (429)")


async def main():
    print("=" * 48)
    print("  OWASP Security Layer Stress Test (FastAPI)")
    print("=" * 48)

    try:
        await test_zod_shield()
        await test_api_leak()
        await test_rate_limit()
        print("\nAll tests passed.")
    except AssertionError as e:
        print(f"\n{FAIL}  {e}")
        sys.exit(1)
    except httpx.ConnectError:
        print(f"\n{FAIL}  Cannot connect to {BASE} -- is the server running?")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
