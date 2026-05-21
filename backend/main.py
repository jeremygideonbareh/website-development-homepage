import os
import hashlib

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import Lead
from schemas import LeadCreate, LeadResponse
from middleware import RateLimitMiddleware

# Load environment variables from .env file
load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ApexAI Leads API")

# ─── Auth Dependency: validates the proxy's secret ───────────────────────────
async def verify_internal_auth(authorization: str | None = Header(None)):
    expected = os.getenv("INTERNAL_API_SECRET", "")
    if not expected:
        return  # no secret configured — skip check (dev mode)
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    token = authorization.removeprefix("Bearer ")
    if token != expected:
        raise HTTPException(status_code=401, detail="Invalid authorization token")

# ─── CORS (outermost) ────────────────────────────────────────────────────────
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3002").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Rate Limiting ──────────────────────────────────────────────────────────
app.add_middleware(RateLimitMiddleware)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/leads", response_model=LeadResponse, status_code=201)
def create_lead(
    payload: LeadCreate,
    db: Session = Depends(get_db),
    _auth: None = Depends(verify_internal_auth),
):
    # ─── Security Layer 3: Secure API Key Handling ───────────────────────────
    # Access the server-side secret — it NEVER leaves this function.
    internal_secret = os.getenv("INTERNAL_API_SECRET", "")

    # Demonstrate server-side usage (e.g., signing, upstream auth, etc.)
    _server_hash = hashlib.sha256(
        f"{internal_secret}:{payload.email}".encode()
    ).hexdigest()
    # ^ This hash is used internally only. The raw secret is never in the response.

    lead = Lead(
        name=payload.name,
        email=payload.email,
        company=payload.company,
        project_tier=payload.project_tier,
        message=payload.message,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead
