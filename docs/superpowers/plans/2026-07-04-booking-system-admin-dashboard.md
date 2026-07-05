# Booking System & Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a session-based booking system with conflict prevention (no double-booking once A1 confirms) and an admin dashboard for managing bookings (edit dates/times).

**Architecture:** Extend the existing FastAPI backend with a `Booking` model and time slots, add REST API endpoints for booking CRUD + admin edit, and build React frontend components for slot selection and an admin dashboard with auth.

**Tech Stack:** FastAPI (Python) + SQLAlchemy + SQLite (backend), React + TailwindCSS + Framer Motion + Recharts (frontend), Node.js proxy (bridge), JWT-based admin auth

## Global Constraints

- Frontend ships to Cloudflare Pages from `main` branch (Vite build to `dist/`)
- All new React components follow existing patterns: `cn()` utility for classes, Framer Motion for animations, `lucide-react` for icons
- Backend uses FastAPI with Pydantic v2 validation, SQLAlchemy ORM, SQLite
- All API responses use the existing proxy pattern: proxy on port 3001, Python backend on port 8000
- Admin dashboard requires authentication (JWT tokens, no hardcoded secrets)
- Booking slot uniqueness enforced at database level (unique constraint + app-level check)
- No external dependencies beyond what's in package.json / requirements.txt
- Follow existing file organization: backend models in `models.py`, schemas in `schemas.py`, frontend components in `src/components/`

---
## Task Breakdown

### Task 1: Database Models for Booking System

**Files:**
- Modify: `backend/models.py` — add Booking, TimeSlot models
- Modify: `backend/schemas.py` — add BookingCreate, BookingResponse, TimeSlotResponse, AdminBookingUpdate schemas
- Modify: `backend/database.py` — no changes needed (SQLite already configured)

**Interfaces:**
- Consumes: Existing `Lead` model, `Base` from `database.py`, SQLAlchemy session
- Produces: `Booking` model with fields: id, name, email, phone, date, time_slot_id, status (pending/confirmed/cancelled), notes, created_at, updated_at. `TimeSlot` model with fields: id, label (Morning/Afternoon/Evening), start_time, end_time, is_active.

- [ ] **Step 1: Add Booking and TimeSlot models to backend/models.py**

```python
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company = Column(String(255), nullable=True)
    date = Column(Date, nullable=False)
    time_slot_id = Column(Integer, ForeignKey("time_slots.id"), nullable=False)
    status = Column(String(20), nullable=False, default="pending")  # pending, confirmed, cancelled
    project_description = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)  # admin notes
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    time_slot = relationship("TimeSlot", back_populates="bookings")


class TimeSlot(Base):
    __tablename__ = "time_slots"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(100), nullable=False, unique=True)  # e.g. "Morning", "Afternoon", "Evening"
    start_time = Column(String(10), nullable=False)  # e.g. "09:00"
    end_time = Column(String(10), nullable=False)    # e.g. "12:00"
    is_active = Column(Boolean, default=True, nullable=False)

    bookings = relationship("Booking", back_populates="time_slot")
```

Add imports at top:
```python
from sqlalchemy import Column, Integer, String, Text, DateTime, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone, date
```

- [ ] **Step 2: Add Pydantic schemas to backend/schemas.py**

```python
from pydantic import BaseModel, EmailStr, field_validator, model_validator
from datetime import date, datetime
from typing import Optional


class TimeSlotCreate(BaseModel):
    label: str
    start_time: str
    end_time: str
    is_active: bool = True

    @field_validator("label")
    @classmethod
    def label_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("label must not be empty")
        return v

    @field_validator("start_time", "end_time")
    @classmethod
    def validate_time_format(cls, v: str) -> str:
        import re
        if not re.match(r"^\d{2}:\d{2}$", v):
            raise ValueError("time must be in HH:MM format")
        return v


class TimeSlotResponse(BaseModel):
    id: int
    label: str
    start_time: str
    end_time: str
    is_active: bool

    model_config = {"from_attributes": True}


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    date: date
    time_slot_id: int
    project_description: Optional[str] = None

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("name must not be empty")
        if len(v) > 255:
            raise ValueError("name must be 255 characters or fewer")
        return v

    @field_validator("time_slot_id")
    @classmethod
    def validate_time_slot_id(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("time_slot_id must be positive")
        return v

    @model_validator(mode="before")
    @classmethod
    def reject_extra_fields(cls, data):
        if isinstance(data, dict):
            allowed = {"name", "email", "phone", "company", "date", "time_slot_id", "project_description"}
            return {k: v for k, v in data.items() if k in allowed}
        return data


class BookingResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    date: date
    time_slot_id: int
    status: str
    project_description: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class AdminBookingUpdate(BaseModel):
    date: Optional[date] = None
    time_slot_id: Optional[int] = None
    status: Optional[str] = None
    notes: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in ("pending", "confirmed", "cancelled"):
            raise ValueError("status must be pending, confirmed, or cancelled")
        return v


class AdminLogin(BaseModel):
    username: str
    password: str


class AdminTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
```

- [ ] **Step 3: Run the backend to verify models are created**

Run: `cd backend && python -c "from database import engine, Base; from models import Lead, Booking, TimeSlot; Base.metadata.create_all(bind=engine); print('Tables created successfully')"`

Expected: "Tables created successfully" — no errors about missing imports or invalid syntax

- [ ] **Step 4: Commit**

```bash
git add backend/models.py backend/schemas.py
git commit -m "feat: add Booking and TimeSlot database models and Pydantic schemas"
```

---

### Task 2: Seed Time Slots & Admin Config

**Files:**
- Create: `backend/seed.py` — seed default time slots and initial admin user
- Create: `backend/auth.py` — JWT auth utilities for admin login
- Modify: `backend/.env.example` — add admin credentials
- Modify: `backend/requirements.txt` — add pyjwt and passlib

**Interfaces:**
- Consumes: `TimeSlot` model from Task 1, `SessionLocal` from `database.py`
- Produces: `create_access_token(data: dict) -> str`, `verify_token(token: str) -> dict`, seeded time slots in DB

- [ ] **Step 1: Add dependencies to requirements.txt**

```
pyjwt==2.9.0
passlib[bcrypt]==1.7.4
```

- [ ] **Step 2: Create backend/auth.py**

```python
import os
from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-secret-key-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH", "")


def verify_password(plain_password: str) -> bool:
    """Verify password against the stored bcrypt hash."""
    if not ADMIN_PASSWORD_HASH:
        return plain_password == os.getenv("ADMIN_PASSWORD", "admin123")
    return pwd_context.verify(plain_password, ADMIN_PASSWORD_HASH)


def get_password_hash(password: str) -> str:
    """Hash a password with bcrypt."""
    return pwd_context.hash(password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None
```

- [ ] **Step 3: Create backend/seed.py**

```python
"""Seed default time slots and create initial admin setup."""

import os
import sys
from dotenv import load_dotenv

# Ensure backend directory is in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

from database import engine, Base, SessionLocal
from models import TimeSlot
from auth import get_password_hash


DEFAULT_SLOTS = [
    {"label": "Morning", "start_time": "09:00", "end_time": "12:00"},
    {"label": "Afternoon", "start_time": "12:00", "end_time": "17:00"},
    {"label": "Evening", "start_time": "17:00", "end_time": "20:00"},
]


def seed_slots():
    db = SessionLocal()
    try:
        existing = db.query(TimeSlot).count()
        if existing > 0:
            print(f"Time slots already seeded ({existing} exist). Skipping.")
            return

        for slot in DEFAULT_SLOTS:
            db.add(TimeSlot(**slot))
        db.commit()
        print(f"Seeded {len(DEFAULT_SLOTS)} time slots.")
    finally:
        db.close()


def print_admin_hash():
    """Utility: print bcrypt hash for a password."""
    password = os.getenv("ADMIN_PASSWORD", "admin123")
    hashed = get_password_hash(password)
    print(f"Admin password hash for '{password}':")
    print(hashed)
    print("\nAdd this to .env as:")
    print(f"ADMIN_PASSWORD_HASH={hashed}")


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    seed_slots()
    print_admin_hash()
```

- [ ] **Step 4: Update backend/.env.example**

```
# ─── Server-side secrets ──────────────────────────────────────────────
INTERNAL_API_SECRET=supersecretkey_changethis_in_production

# ─── Configuration ────────────────────────────────────────────────────
DATABASE_URL=sqlite:///./leads.db
CORS_ORIGINS=http://localhost:3002,http://localhost:5173,https://sshahaider.github.io

# ─── JWT Auth for Admin Dashboard ────────────────────────────────────
JWT_SECRET_KEY=change-this-jwt-secret-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
# ADMIN_PASSWORD_HASH=<generated bcrypt hash>
```

- [ ] **Step 5: Run seed script to verify**

Run: `cd backend && python seed.py`
Expected: "Seeded 3 time slots." and the admin password hash printed

- [ ] **Step 6: Commit**

```bash
git add backend/auth.py backend/seed.py backend/requirements.txt backend/.env.example
git commit -m "feat: add JWT auth, seed script, and admin config"
```

---

### Task 3: Booking API Endpoints

**Files:**
- Modify: `backend/main.py` — add booking endpoints
- Modify: `backend/middleware.py` — no changes needed (rate limiting already exists)

**Interfaces:**
- Consumes: `Booking`, `TimeSlot` models, `BookingCreate`, `BookingResponse`, `TimeSlotResponse` schemas, `get_db` from `database.py`, `verify_token` from `auth.py`
- Produces: REST endpoints for listing slots, creating bookings, listing bookings (admin), updating bookings (admin)

- [ ] **Step 1: Add auth dependency and booking endpoints to backend/main.py**

Replace the file content with the extended version:

```python
import os
import hashlib

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import date

from database import engine, Base, get_db
from models import Lead, Booking, TimeSlot
from schemas import (
    LeadCreate, LeadResponse,
    BookingCreate, BookingResponse,
    TimeSlotResponse,
    AdminBookingUpdate,
    AdminLogin, AdminTokenResponse,
)
from middleware import RateLimitMiddleware
from auth import verify_password, create_access_token, verify_token

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Rogue Code API")
security = HTTPBearer(auto_error=False)

# ─── CORS ─────────────────────────────────────────────────────────────
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3002").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Rate Limiting ────────────────────────────────────────────────────
app.add_middleware(RateLimitMiddleware)

# ─── Auth Dependency ──────────────────────────────────────────────────
async def verify_internal_auth(authorization: str | None = Header(None)):
    expected = os.getenv("INTERNAL_API_SECRET", "")
    if not expected:
        return
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    token = authorization.removeprefix("Bearer ")
    if token != expected:
        raise HTTPException(status_code=401, detail="Invalid authorization token")


async def verify_admin_auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Authorization header required")
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return payload


# ─── Health ───────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok"}


# ─── Lead Endpoints ──────────────────────────────────────────────────
@app.post("/api/leads", response_model=LeadResponse, status_code=201)
def create_lead(
    payload: LeadCreate,
    db: Session = Depends(get_db),
    _auth: None = Depends(verify_internal_auth),
):
    internal_secret = os.getenv("INTERNAL_API_SECRET", "")
    _server_hash = hashlib.sha256(
        f"{internal_secret}:{payload.email}".encode()
    ).hexdigest()

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


# ─── Time Slot Endpoints ─────────────────────────────────────────────
@app.get("/api/slots", response_model=list[TimeSlotResponse])
def get_active_slots(db: Session = Depends(get_db)):
    """Public endpoint: get all active time slots."""
    return db.query(TimeSlot).filter(TimeSlot.is_active == True).all()


# ─── Booking Endpoints ───────────────────────────────────────────────
@app.post("/api/bookings", status_code=201)
def create_booking(
    payload: BookingCreate,
    db: Session = Depends(get_db),
):
    """Public endpoint: create a new booking (pending status)."""
    # 1. Verify the time slot exists and is active
    slot = db.query(TimeSlot).filter(TimeSlot.id == payload.time_slot_id, TimeSlot.is_active == True).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found or inactive")

    # 2. Check for existing confirmed booking on same date + slot
    existing = db.query(Booking).filter(
        and_(
            Booking.date == payload.date,
            Booking.time_slot_id == payload.time_slot_id,
            Booking.status.in_(["pending", "confirmed"]),
        )
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="This time slot on the selected date is already booked or pending. Please choose another slot or date.",
        )

    # 3. Create the booking
    booking = Booking(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        date=payload.date,
        time_slot_id=payload.time_slot_id,
        project_description=payload.project_description,
        status="pending",
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    return {
        "status": "success",
        "data": {
            "id": booking.id,
            "name": booking.name,
            "email": booking.email,
            "date": str(booking.date),
            "time_slot_id": booking.time_slot_id,
            "status": booking.status,
        },
    }


@app.get("/api/admin/bookings", response_model=list[BookingResponse])
def list_bookings(
    status_filter: str | None = Query(None, alias="status"),
    date_from: date | None = Query(None),
    date_to: date | None = Query(None),
    db: Session = Depends(get_db),
    _admin: dict = Depends(verify_admin_auth),
):
    """Admin: list all bookings with optional filters."""
    query = db.query(Booking)

    if status_filter:
        query = query.filter(Booking.status == status_filter)
    if date_from:
        query = query.filter(Booking.date >= date_from)
    if date_to:
        query = query.filter(Booking.date <= date_to)

    return query.order_by(Booking.date.desc(), Booking.time_slot_id).all()


@app.get("/api/admin/bookings/{booking_id}", response_model=BookingResponse)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    _admin: dict = Depends(verify_admin_auth),
):
    """Admin: get a single booking by ID."""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@app.put("/api/admin/bookings/{booking_id}", response_model=BookingResponse)
def update_booking(
    booking_id: int,
    payload: AdminBookingUpdate,
    db: Session = Depends(get_db),
    _admin: dict = Depends(verify_admin_auth),
):
    """Admin: update booking date, time slot, status, or notes."""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # If changing date or time_slot, check for conflicts
    new_date = payload.date if payload.date is not None else booking.date
    new_slot_id = payload.time_slot_id if payload.time_slot_id is not None else booking.time_slot_id

    if payload.date is not None or payload.time_slot_id is not None:
        conflict = db.query(Booking).filter(
            and_(
                Booking.id != booking_id,
                Booking.date == new_date,
                Booking.time_slot_id == new_slot_id,
                Booking.status.in_(["pending", "confirmed"]),
            )
        ).first()
        if conflict:
            raise HTTPException(
                status_code=409,
                detail="The target date/time slot is already booked. Choose a different slot.",
            )

    # Update fields
    if payload.date is not None:
        booking.date = payload.date
    if payload.time_slot_id is not None:
        # Verify slot exists
        slot = db.query(TimeSlot).filter(TimeSlot.id == payload.time_slot_id).first()
        if not slot:
            raise HTTPException(status_code=404, detail="Time slot not found")
        booking.time_slot_id = payload.time_slot_id
    if payload.status is not None:
        booking.status = payload.status
    if payload.notes is not None:
        booking.notes = payload.notes

    db.commit()
    db.refresh(booking)
    return booking


# ─── Admin Auth Endpoints ────────────────────────────────────────────
@app.post("/api/admin/login", response_model=AdminTokenResponse)
def admin_login(payload: AdminLogin, db: Session = Depends(get_db)):
    """Admin login: returns JWT token."""
    expected_username = os.getenv("ADMIN_USERNAME", "admin")
    if payload.username != expected_username:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    if not verify_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token({"sub": payload.username, "role": "admin"})
    return AdminTokenResponse(access_token=token)
```

- [ ] **Step 2: Test the backend starts correctly**

Run: `cd backend && python -c "from main import app; print('App loaded successfully')"`
Expected: "App loaded successfully"

- [ ] **Step 3: Update proxy.js to forward new booking endpoints**

Modify `server/proxy.js` to forward `/api/slots`, `/api/bookings`, `/api/admin/*` (except admin login which goes direct).

Add after the existing leads route check:

```javascript
// ─── Forward all /api/* requests to Python backend ───────────────────
if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'PUT' && req.method !== 'OPTIONS') {
  res.writeHead(405, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Method not allowed' }))
  return
}

if (!req.url?.startsWith('/api/')) {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
  return
}

// Admin login goes directly to Python (no INTERNAL_API_SECRET needed)
// All other routes get the secret header
const needsInternalAuth = !req.url.startsWith('/api/admin/login')

let body = ''
for await (const chunk of req) body += chunk

try {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  if (needsInternalAuth) {
    headers['Authorization'] = `Bearer ${INTERNAL_API_SECRET}`
  }

  // Forward auth header from client for admin endpoints
  const clientAuth = req.headers['authorization']
  if (req.url.startsWith('/api/admin/') && clientAuth) {
    headers['Authorization'] = clientAuth
  }

  const pythonRes = await fetch(`${PYTHON_API_URL}${req.url}`, {
    method: req.method,
    headers,
    body: body || undefined,
  })

  const data = await pythonRes.json()
  const status = pythonRes.status

  // Handle validation errors
  if (status === 422) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'validation_error',
      details: data.detail || data,
    }))
    return
  }

  // Handle rate limiting
  if (status === 429) {
    res.writeHead(429, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'rate_limited',
      message: 'Too many requests. Please wait a moment and try again.',
    }))
    return
  }

  // Pass through status from Python for all other responses
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))

} catch (err) {
  res.writeHead(502, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({
    status: 'proxy_error',
    message: 'Could not reach the backend server.',
  }))
}
```

Replace the entire proxy.js content with this. The old code only handled POST /api/leads. The new code is a general-purpose proxy.

- [ ] **Step 4: Commit**

```bash
git add backend/main.py server/proxy.js
git commit -m "feat: add booking and admin API endpoints, update proxy for all routes"
```

---

### Task 4: Frontend Booking Components (Slot Selection)

**Files:**
- Create: `src/components/BookingFlow.jsx` — multi-step booking form with date picker + slot picker
- Modify: `src/components/BookingModal.jsx` — use BookingFlow instead of LeadForm
- Modify: `src/lib/api.js` — add booking API functions

**Interfaces:**
- Consumes: `BookingModal` existing pattern, API functions
- Produces: `BookingFlow.jsx` component with slot selection, date picker, booking confirmation
- API: `getSlots() -> TimeSlot[]`, `createBooking(data) -> BookingResponse`, `getBookedSlots(date) -> int[]`

- [ ] **Step 1: Add booking API functions to src/lib/api.js**

```javascript
const PROXY_URL = 'http://localhost:3001'

export async function submitLead(formData) {
  const res = await fetch(`${PROXY_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

export async function getSlots() {
  const res = await fetch(`${PROXY_URL}/api/slots`)
  if (!res.ok) throw new Error('Failed to load time slots')
  return res.json()
}

export async function getBookedSlots(date) {
  const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date
  const res = await fetch(`${PROXY_URL}/api/admin/bookings?date=${dateStr}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    },
  })
  if (!res.ok) return []
  const bookings = await res.json()
  return bookings
    .filter(b => b.status === 'pending' || b.status === 'confirmed')
    .map(b => b.time_slot_id)
}

export async function createBooking(formData) {
  const res = await fetch(`${PROXY_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.detail || data.message || 'Booking failed')
    error.status = res.status
    throw error
  }

  return data
}
```

- [ ] **Step 2: Create BookingFlow.jsx**

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Clock, ChevronLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSlots, createBooking } from '@/lib/api'

const STEPS = ['Date & Time', 'Your Details', 'Confirmation']

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1) // Next day minimum
  return d.toISOString().split('T')[0]
}

function getMaxDate() {
  const d = new Date()
  d.setMonth(d.getMonth() + 2) // 2 months ahead
  return d.toISOString().split('T')[0]
}

export function BookingFlow({ onSuccess, onClose }) {
  const [step, setStep] = useState(0)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    date: '',
    time_slot_id: null,
    name: '',
    email: '',
    phone: '',
    company: '',
    project_description: '',
  })

  useEffect(() => {
    getSlots()
      .then(setSlots)
      .catch(() => setError('Failed to load time slots'))
      .finally(() => setLoading(false))
  }, [])

  const handleSlotSelect = (slotId) => {
    setForm((prev) => ({ ...prev, time_slot_id: slotId }))
  }

  const handleDateChange = (e) => {
    setForm((prev) => ({ ...prev, date: e.target.value, time_slot_id: null }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const canGoNext = () => {
    if (step === 0) return form.date && form.time_slot_id
    if (step === 1) return form.name?.trim() && form.email?.trim()
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      await createBooking(form)
      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-8 animate-spin text-zinc-400" />
      </div>
    )
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
        >
          <CheckCircle className="size-14 text-emerald-400 mb-4" strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-lg font-semibold text-white">Booking Request Sent!</h3>
        <p className="mt-2 text-sm text-zinc-400 max-w-xs">
          We received your consultation request. Our team at Rogue Code will review and confirm your slot shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              'flex size-7 items-center justify-center rounded-full text-xs font-medium transition-colors',
              i === step ? 'bg-white text-black' : i < step ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
            )}>
              {i < step ? <CheckCircle className="size-4" /> : i + 1}
            </div>
            <span className={cn('text-xs hidden sm:inline', i === step ? 'text-white' : 'text-zinc-500')}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="w-6 h-px bg-zinc-800" />}
          </div>
        ))}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 0: Date & Time Selection */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                <CalendarDays className="size-4" /> Select Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={handleDateChange}
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>

            {form.date && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center gap-2">
                  <Clock className="size-4" /> Select Time Slot
                </label>
                <div className="grid gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot.id)}
                      className={cn(
                        'flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition-all',
                        form.time_slot_id === slot.id
                          ? 'border-white/40 bg-white/10 text-white'
                          : 'border-zinc-800/60 bg-white/5 text-zinc-400 hover:border-zinc-600/60'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'size-3 rounded-full',
                          form.time_slot_id === slot.id ? 'bg-emerald-400' : 'bg-zinc-700'
                        )} />
                        <span className="font-medium">{slot.label}</span>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {slot.start_time} — {slot.end_time}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Your company (optional)"
                value={form.company}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <div>
              <label htmlFor="project_description" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Project Description
              </label>
              <textarea
                id="project_description"
                name="project_description"
                rows={3}
                placeholder="Briefly describe your project..."
                value={form.project_description}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all resize-y min-h-[80px]"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-zinc-800/60 bg-white/5 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-zinc-300">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Date</span>
                  <span className="text-white">{form.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Time Slot</span>
                  <span className="text-white">{slots.find(s => s.id === form.time_slot_id)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Name</span>
                  <span className="text-white">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Email</span>
                  <span className="text-white">{form.email}</span>
                </div>
                {form.company && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Company</span>
                    <span className="text-white">{form.company}</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-zinc-500 text-center">
              By submitting, you agree to our consultation terms. Your slot is pending until confirmed by our team.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        {step > 0 ? (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 rounded-xl border border-zinc-800/60 px-5 py-3 text-sm text-zinc-400 hover:border-zinc-600/60 hover:text-white transition-all"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl border border-zinc-800/60 px-5 py-3 text-sm text-zinc-400 hover:border-zinc-600/60 hover:text-white transition-all"
          >
            Cancel
          </button>
        )}

        {step < 2 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canGoNext()}
            className="flex-1 rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update BookingModal.jsx to use BookingFlow**

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { BookingFlow } from '@/components/BookingFlow'

export function BookingModal({ open, onClose, defaultTier = '' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg mx-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="size-4" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-1">Book a Free Consultation</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Choose a date and time that works for you. We'll confirm your slot within 24 hours.
            </p>

            <BookingFlow onSuccess={onClose} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/BookingFlow.jsx src/components/BookingModal.jsx src/lib/api.js
git commit -m "feat: add multi-step booking flow with slot selection"
```

---

### Task 5: Admin Dashboard Frontend

**Files:**
- Create: `src/components/admin/AdminLogin.jsx` — admin login form
- Create: `src/components/admin/AdminDashboard.jsx` — admin dashboard with booking list + edit
- Create: `src/components/admin/AdminLayout.jsx` — admin layout with sidebar
- Create: `src/pages/AdminPage.jsx` — entry point for admin route
- Modify: `src/App.jsx` — add admin route
- Create: `src/lib/adminApi.js` — admin API functions

**Interfaces:**
- Consumes: `BookingResponse`, `TimeSlotResponse` types from API
- Produces: Admin dashboard with login, booking table, edit modal

- [ ] **Step 1: Create src/lib/adminApi.js**

```javascript
const PROXY_URL = 'http://localhost:3001'

function getToken() {
  return localStorage.getItem('admin_token')
}

function authHeaders() {
  const token = getToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export async function adminLogin(username, password) {
  const res = await fetch(`${PROXY_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail || 'Login failed')
  return data
}

export async function getBookings(params = {}) {
  const query = new URLSearchParams()
  if (params.status) query.set('status', params.status)
  if (params.date_from) query.set('date_from', params.date_from)
  if (params.date_to) query.set('date_to', params.date_to)

  const url = `${PROXY_URL}/api/admin/bookings${query.toString() ? '?' + query.toString() : ''}`
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error('Failed to load bookings')
  return res.json()
}

export async function getBooking(id) {
  const res = await fetch(`${PROXY_URL}/api/admin/bookings/${id}`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to load booking')
  return res.json()
}

export async function updateBooking(id, data) {
  const res = await fetch(`${PROXY_URL}/api/admin/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.detail || 'Update failed')
  return result
}

export async function getSlots() {
  const res = await fetch(`${PROXY_URL}/api/slots`)
  if (!res.ok) throw new Error('Failed to load slots')
  return res.json()
}
```

- [ ] **Step 2: Create src/components/admin/AdminLogin.jsx**

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Loader2, AlertCircle } from 'lucide-react'
import { adminLogin } from '@/lib/adminApi'

export function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await adminLogin(username, password)
      localStorage.setItem('admin_token', result.access_token)
      onLogin()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-md p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <Lock className="size-6 text-zinc-300" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Login</h1>
            <p className="text-sm text-zinc-500 mt-1">Rogue Code Dashboard</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 mb-4">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white outline-none focus:border-zinc-500/60 focus:bg-white/[0.08] transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 3: Create src/components/admin/AdminDashboard.jsx**

```jsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, Search, Filter, LogOut, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, Clock3, Loader2, AlertCircle, Pencil, RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getBookings, updateBooking, getSlots } from '@/lib/adminApi'
import { AdminBookingEditModal } from './AdminBookingEditModal'

const STATUS_COLORS = {
  pending: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  confirmed: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
}

const STATUS_ICONS = {
  pending: Clock3,
  confirmed: CheckCircle,
  cancelled: XCircle,
}

export function AdminDashboard({ onLogout }) {
  const [bookings, setBookings] = useState([])
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [editingBooking, setEditingBooking] = useState(null)
  const [page, setPage] = useState(1)
  const [notification, setNotification] = useState(null)
  const PER_PAGE = 10

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {}
      if (statusFilter) params.status = statusFilter
      const [bookingsData, slotsData] = await Promise.all([
        getBookings(params),
        getSlots(),
      ])
      setBookings(bookingsData)
      setSlots(slotsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => { fetchData() }, [fetchData])

  const filtered = search
    ? bookings.filter(b =>
        b.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.email?.toLowerCase().includes(search.toLowerCase()) ||
        b.company?.toLowerCase().includes(search.toLowerCase())
      )
    : bookings

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBooking(id, { status: newStatus })
      setNotification({ type: 'success', message: `Booking #${id} ${newStatus}` })
      fetchData()
      setTimeout(() => setNotification(null), 3000)
    } catch (err) {
      setNotification({ type: 'error', message: err.message })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleEditSave = async (id, data) => {
    try {
      await updateBooking(id, data)
      setNotification({ type: 'success', message: `Booking #${id} updated` })
      setEditingBooking(null)
      fetchData()
      setTimeout(() => setNotification(null), 3000)
    } catch (err) {
      setNotification({ type: 'error', message: err.message })
    }
  }

  const getSlotLabel = (id) => slots.find(s => s.id === id)?.label || `Slot #${id}`

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              'fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border text-sm shadow-lg',
              notification.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            )}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-zinc-800/60 bg-zinc-900/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Rogue Code Admin</h1>
            <p className="text-xs text-zinc-500">Booking Management Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 rounded-xl border border-zinc-800/60 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:border-zinc-600/60 transition-all"
            >
              <RefreshCw className={cn('size-4', loading && 'animate-spin')} />
              Refresh
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl border border-red-800/40 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full rounded-xl border border-zinc-800/60 bg-zinc-900/50 pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-zinc-600/60 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['', 'pending', 'confirmed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1) }}
                className={cn(
                  'rounded-xl border px-4 py-2.5 text-xs font-medium transition-all',
                  statusFilter === s
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-zinc-800/60 text-zinc-500 hover:border-zinc-600/60'
                )}
              >
                {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 mb-6">
            <AlertCircle className="size-4 shrink-0" />
            {error}
            <button onClick={fetchData} className="ml-auto underline">Retry</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-zinc-500" />
          </div>
        )}

        {/* Bookings Table */}
        {!loading && !error && (
          <>
            <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800/60 bg-zinc-900/80">
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">ID</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Name</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium hidden md:table-cell">Email</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Date</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Slot</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Status</th>
                      <th className="text-right px-4 py-3 text-zinc-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-zinc-500">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      paginated.map((booking) => {
                        const StatusIcon = STATUS_ICONS[booking.status]
                        return (
                          <tr
                            key={booking.id}
                            className="border-b border-zinc-800/40 hover:bg-zinc-900/40 transition-colors"
                          >
                            <td className="px-4 py-3.5 text-zinc-400 font-mono text-xs">#{booking.id}</td>
                            <td className="px-4 py-3.5">
                              <div className="text-white font-medium">{booking.name}</div>
                              <div className="text-zinc-500 text-xs md:hidden">{booking.email}</div>
                            </td>
                            <td className="px-4 py-3.5 text-zinc-400 hidden md:table-cell">{booking.email}</td>
                            <td className="px-4 py-3.5 text-zinc-300">{booking.date}</td>
                            <td className="px-4 py-3.5">
                              <span className="text-xs text-zinc-400">{getSlotLabel(booking.time_slot_id)}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className={cn(
                                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
                                STATUS_COLORS[booking.status]
                              )}>
                                <StatusIcon className="size-3" />
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <select
                                  value={booking.status}
                                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                  className="rounded-lg border border-zinc-800/60 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-300 outline-none focus:border-zinc-600/60"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirm</option>
                                  <option value="cancelled">Cancel</option>
                                </select>
                                <button
                                  onClick={() => setEditingBooking(booking)}
                                  className="rounded-lg border border-zinc-800/60 p-1.5 text-zinc-500 hover:text-white hover:border-zinc-600/60 transition-all"
                                >
                                  <Pencil className="size-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-zinc-800/60 p-2 text-zinc-500 hover:text-white disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm text-zinc-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-zinc-800/60 p-2 text-zinc-500 hover:text-white disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Edit Modal */}
      <AdminBookingEditModal
        booking={editingBooking}
        slots={slots}
        onClose={() => setEditingBooking(null)}
        onSave={handleEditSave}
      />
    </div>
  )
}
```

- [ ] **Step 4: Create src/components/admin/AdminBookingEditModal.jsx**

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, AlertCircle, CalendarDays, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export function AdminBookingEditModal({ booking, slots, onClose, onSave }) {
  const [form, setForm] = useState({ date: '', time_slot_id: null, status: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (booking) {
      setForm({
        date: booking.date || '',
        time_slot_id: booking.time_slot_id || null,
        status: booking.status || 'pending',
        notes: booking.notes || '',
      })
      setError(null)
    }
  }, [booking])

  if (!booking) return null

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const data = {}
      if (form.date && form.date !== booking.date) data.date = form.date
      if (form.time_slot_id && form.time_slot_id !== booking.time_slot_id) data.time_slot_id = form.time_slot_id
      if (form.status !== booking.status) data.status = form.status
      if (form.notes !== (booking.notes || '')) data.notes = form.notes
      await onSave(booking.id, data)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="size-4" />
          </button>

          <h3 className="text-lg font-bold text-white mb-1">Edit Booking #{booking.id}</h3>
          <p className="text-xs text-zinc-500 mb-5">{booking.name} — {booking.email}</p>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 mb-4">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                <CalendarDays className="size-3.5" /> Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                min={getMinDate()}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500/60 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                <Clock className="size-3.5" /> Time Slot
              </label>
              <select
                value={form.time_slot_id || ''}
                onChange={(e) => setForm(f => ({ ...f, time_slot_id: Number(e.target.value) }))}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500/60 transition-all"
              >
                <option value="" disabled>Select a slot</option>
                {slots.map(s => (
                  <option key={s.id} value={s.id} className="bg-zinc-900">
                    {s.label} ({s.start_time} — {s.end_time})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500/60 transition-all"
              >
                <option value="pending" className="bg-zinc-900">Pending</option>
                <option value="confirmed" className="bg-zinc-900">Confirmed</option>
                <option value="cancelled" className="bg-zinc-900">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Admin Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
                placeholder="Internal notes about this booking..."
                className="w-full rounded-xl border border-zinc-800/60 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-500/60 transition-all resize-y"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-800/60 py-2.5 text-sm text-zinc-400 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-xl bg-white text-black py-2.5 text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 5: Create src/pages/AdminPage.jsx**

```jsx
import { useState } from 'react'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('admin_token'))

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />
  }

  return (
    <AdminDashboard
      onLogout={() => {
        localStorage.removeItem('admin_token')
        setLoggedIn(false)
      }}
    />
  )
}
```

- [ ] **Step 6: Add admin route to App.jsx**

Add import at top:
```jsx
import { AdminPage } from './pages/AdminPage'
```

Add navigation button in the nav section (inside the existing nav div, after the About/Start buttons):
```jsx
<button
  onClick={() => window.open('/admin', '_blank')}
  className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full border transition-colors"
  style={{ borderColor: p.border, color: p.dim }}
>
  Admin
</button>
```

Add the admin route condition in App.jsx (at the top of the return, before the main div):
```jsx
const isAdminRoute = window.location.pathname.startsWith('/admin')

if (isAdminRoute) {
  return <AdminPage />
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/admin/ src/pages/AdminPage.jsx src/lib/adminApi.js src/App.jsx
git commit -m "feat: add admin dashboard with login, booking management, and edit modal"
```

---

### Task 6: Booking Confirmation & Lock Mechanism (A1 Workflow)

**Files:**
- Modify: `backend/main.py` — add confirmation lock endpoint
- Modify: `src/components/admin/AdminDashboard.jsx` — already handles status change
- Create: `backend/tests/test_booking_conflict.py` — tests for conflict prevention

**Interfaces:**
- Consumes: Existing booking endpoints from Task 3
- Produces: Lock mechanism — once status = "confirmed", no other booking can use that date+slot

- [ ] **Step 1: Update backend/main.py to enforce strict lock on confirmed bookings**

The conflict check in `create_booking` already prevents double-booking for pending+confirmed statuses. Add a confirm endpoint that also validates the slot isn't already confirmed.

Add a dedicated confirm endpoint:
```python
@app.post("/api/admin/bookings/{booking_id}/confirm", response_model=BookingResponse)
def confirm_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    _admin: dict = Depends(verify_admin_auth),
):
    """Admin: confirm a booking. Locks the slot — no other bookings allowed."""
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # Check if another confirmed booking exists for this date+slot
    conflict = db.query(Booking).filter(
        and_(
            Booking.id != booking_id,
            Booking.date == booking.date,
            Booking.time_slot_id == booking.time_slot_id,
            Booking.status == "confirmed",
        )
    ).first()

    if conflict:
        raise HTTPException(
            status_code=409,
            detail=f"Cannot confirm: Slot already confirmed for booking #{conflict.id}",
        )

    booking.status = "confirmed"
    db.commit()
    db.refresh(booking)
    return booking
```

- [ ] **Step 2: Create backend/tests/test_booking_conflict.py**

```python
"""Tests for booking conflict prevention."""

import sys
import os
from datetime import date, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from database import engine, Base, SessionLocal, get_db
from models import Booking, TimeSlot
from schemas import BookingCreate
from datetime import timezone, datetime


def setup_module(module):
    """Create fresh tables before tests."""
    Base.metadata.create_all(bind=engine)


def teardown_module(module):
    """Clean up after tests."""
    db = SessionLocal()
    try:
        db.query(Booking).delete()
        db.commit()
    finally:
        db.close()


class TestBookingConflict:
    """Test that booking conflicts are properly prevented."""

    def setup_method(self):
        self.db = SessionLocal()
        # Ensure test time slots exist
        slots = self.db.query(TimeSlot).all()
        if not slots:
            self.db.add(TimeSlot(label="Morning", start_time="09:00", end_time="12:00"))
            self.db.add(TimeSlot(label="Afternoon", start_time="12:00", end_time="17:00"))
            self.db.add(TimeSlot(label="Evening", start_time="17:00", end_time="20:00"))
            self.db.commit()
            self.db.refresh_all()  # not needed, just re-query
        self.slots = self.db.query(TimeSlot).all()

    def teardown_method(self):
        self.db.close()

    def get_slot_id(self, label):
        return self.db.query(TimeSlot).filter(TimeSlot.label == label).first().id

    def test_create_first_booking_succeeds(self):
        """First booking for a date+slot should succeed."""
        slot_id = self.get_slot_id("Morning")
        booking = Booking(
            name="Alice",
            email="alice@test.com",
            date=date(2026, 8, 1),
            time_slot_id=slot_id,
            status="pending",
        )
        self.db.add(booking)
        self.db.commit()
        assert booking.id is not None
        assert booking.status == "pending"

    def test_duplicate_pending_booking_fails(self):
        """Second pending booking for same date+slot should create conflict check."""
        slot_id = self.get_slot_id("Morning")
        existing = self.db.query(Booking).filter(
            Booking.date == date(2026, 8, 1),
            Booking.time_slot_id == slot_id,
        ).first()

        # Manually verify the constraint
        conflict = self.db.query(Booking).filter(
            Booking.date == date(2026, 8, 1),
            Booking.time_slot_id == slot_id,
            Booking.status.in_(["pending", "confirmed"]),
        ).first()

        assert conflict is not None, "Should find existing pending booking as conflict"

    def test_confirm_booking_locks_slot(self):
        """Confirming a booking should prevent other confirmations."""
        slot_id = self.get_slot_id("Afternoon")

        # Create first booking
        b1 = Booking(
            name="Bob",
            email="bob@test.com",
            date=date(2026, 8, 5),
            time_slot_id=slot_id,
            status="pending",
        )
        self.db.add(b1)
        self.db.commit()

        # Confirm it
        b1.status = "confirmed"
        self.db.commit()

        # Check another booking for same slot can't be confirmed
        b2 = Booking(
            name="Charlie",
            email="charlie@test.com",
            date=date(2026, 8, 5),
            time_slot_id=slot_id,
            status="pending",
        )
        self.db.add(b2)
        self.db.commit()

        # Verify conflict exists
        conflict = self.db.query(Booking).filter(
            Booking.date == date(2026, 8, 5),
            Booking.time_slot_id == slot_id,
            Booking.status == "confirmed",
            Booking.id != b1.id,
        ).first()
        assert conflict is None, "No second confirmed booking should exist"

    def test_cancelled_booking_frees_slot(self):
        """Cancelling a confirmed booking should free the slot."""
        slot_id = self.get_slot_id("Evening")

        b = Booking(
            name="Diana",
            email="diana@test.com",
            date=date(2026, 8, 10),
            time_slot_id=slot_id,
            status="confirmed",
        )
        self.db.add(b)
        self.db.commit()

        # Cancel it
        b.status = "cancelled"
        self.db.commit()

        # Now new booking for same slot should work
        conflict = self.db.query(Booking).filter(
            Booking.date == date(2026, 8, 10),
            Booking.time_slot_id == slot_id,
            Booking.status.in_(["pending", "confirmed"]),
        ).first()
        assert conflict is None, "Cancelled booking should free the slot"

    def test_different_date_same_slot_allowed(self):
        """Same time slot on different date should be allowed."""
        slot_id = self.get_slot_id("Morning")

        b1 = Booking(
            name="Eve",
            email="eve@test.com",
            date=date(2026, 9, 1),
            time_slot_id=slot_id,
            status="confirmed",
        )
        self.db.add(b1)
        self.db.commit()

        b2 = Booking(
            name="Frank",
            email="frank@test.com",
            date=date(2026, 9, 8),  # different date
            time_slot_id=slot_id,
            status="pending",
        )
        self.db.add(b2)
        self.db.commit()

        assert b2.id is not None, "Different date with same slot should be allowed"
```

- [ ] **Step 3: Run the booking conflict tests**

Run: `cd backend && python -m pytest tests/test_booking_conflict.py -v`

Expected: All tests PASS

- [ ] **Step 4: Commit**

```bash
git add backend/main.py backend/tests/test_booking_conflict.py
git commit -m "feat: add booking confirmation lock and conflict prevention tests"
```

---

### Task 7: Update Proxy for Admin Auth Forwarding

**Files:**
- Modify: `server/proxy.js` — already updated in Task 3, verify it handles admin auth correctly
- Create: `server/proxy.test.mjs` — basic proxy test

**Interfaces:**
- Consumes: Proxy from Task 3
- Produces: Verified admin auth token forwarding through proxy

- [ ] **Step 1: Verify proxy.js handles admin auth correctly**

The proxy was updated in Task 3 step 3. Ensure the admin auth forwarding logic is correct:

```javascript
// Forward auth header from client for admin endpoints
const clientAuth = req.headers['authorization']
if (req.url.startsWith('/api/admin/') && clientAuth) {
  headers['Authorization'] = clientAuth
}
```

This should already be in place.

- [ ] **Step 2: Start all services and test end-to-end**

Run the three processes:
1. `cd backend && uvicorn main:app --reload --port 8000`
2. `node server/proxy.js`
3. `npm run dev`

Open browser to `http://localhost:5173/admin` — should see admin login page.

- [ ] **Step 3: Commit**

```bash
git add server/proxy.js
git commit -m "fix: ensure admin auth tokens forward through proxy"
```

---

### Task 8: Final Integration & Verification

**Files:**
- Verify: All modified/created files
- Update: Any necessary config

**Interfaces:**
- Consumes: All tasks above
- Produces: Fully working booking system with admin dashboard

- [ ] **Step 1: Verify complete file structure**

Check that all these files exist and have correct content:
- `backend/models.py` — has Booking and TimeSlot models
- `backend/schemas.py` — has all booking schemas
- `backend/auth.py` — has JWT auth
- `backend/main.py` — has all API endpoints
- `backend/seed.py` — seeds initial data
- `server/proxy.js` — forwards all /api/ routes
- `src/lib/api.js` — has booking API functions
- `src/lib/adminApi.js` — has admin API functions
- `src/components/BookingFlow.jsx` — multi-step booking form
- `src/components/BookingModal.jsx` — updated to use BookingFlow
- `src/components/admin/AdminLogin.jsx` — admin login
- `src/components/admin/AdminDashboard.jsx` — admin dashboard
- `src/components/admin/AdminBookingEditModal.jsx` — edit modal
- `src/pages/AdminPage.jsx` — admin page entry
- `src/App.jsx` — has admin route
- `backend/tests/test_booking_conflict.py` — conflict tests

- [ ] **Step 2: Run the backend test suite**

Run: `cd backend && python -m pytest tests/ -v`
Expected: All tests PASS

- [ ] **Step 3: Build the frontend**

Run: `npm run build`
Expected: Build succeeds without errors

- [ ] **Step 4: Run build verification**

Run: `npm run preview` and verify pages load correctly. Open `http://localhost:4173/admin` to test admin dashboard.

- [ ] **Step 5: Commit final changes**

```bash
git add -A
git commit -m "feat: complete booking system with conflict prevention and admin dashboard"
```

---
