# Admin Photo Upload & Deep Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an admin panel for file-based photo uploads across all site sections, then run a deep review to verify nothing is broken.

**Architecture:** Two-part effort — (A) Backend API + Admin Frontend for file upload to replace hardcoded Unsplash URLs with uploaded photos stored in `photos/` directory, served via FastAPI static files. (B) Comprehensive deep review of every section including build, lint, visual inspection, and error checking.

**Tech Stack:** React 19, Vite 8, FastAPI (Python), Framer Motion, Tailwind CSS

## Global Constraints
- All photos currently use hardcoded Unsplash/Picsum URLs — must support file upload fallback
- No existing router — use state-based navigation (like `showAbout` pattern) for admin panel
- FastAPI backend runs on port 8000, Vite on port 5173 — configure CORS for both
- Uploaded photos stored in `photos/` directory at project root
- Must maintain backward compatibility — if API is unavailable, fall back to hardcoded URLs
- Zero tests exist — will add basic smoke tests
- Admin panel must be visually consistent with existing night/day theme
- Every photo slot across ALL components must be supported

---
---

## PART A: DEEP REVIEW & VERIFICATION

### Task 1: Run Build & Capture Baseline

**Files:**
- Build output: `npm run build`

- [ ] **Step 1: Run production build**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage"
npm run build 2>&1
```

Expected: Build succeeds. Capture any warnings (especially the 1.37 MB bundle warning).

- [ ] **Step 2: Run lint check**

```bash
npm run lint 2>&1
```

Expected: Clean lint output. Note any errors or warnings.

- [ ] **Step 3: Document baseline issues**

Record any build warnings, lint errors, or issues found. This is the baseline we'll check against later.

---

### Task 2: Audit All Components for Photo Usage

**Files:**
- Review: `src/App.jsx`
- Review: `src/components/AboutUs.jsx`
- Review: `src/components/ServicesSection.jsx`
- Review: `src/components/ExamplesPage.jsx`
- Review: `src/components/GalleryPhoto.jsx`
- Review: `src/components/BrowserFrame.jsx`
- Review: `src/components/ui/hero-ascii.tsx`
- Review: `src/components/ui/project-gallery.tsx`
- Review: `src/components/ui/services.tsx`
- Review: `src/components/ui/testimonials.tsx`
- Review: `src/components/ui/tech-stack.tsx`

**Interfaces:**
- Produces: Complete inventory of all photo/image URL slots in the codebase

- [ ] **Step 1: Catalog every hardcoded image URL**

Read each component and extract every image source URL. Organize by:
- Component name
- Variable/array name
- Index/key
- Where it renders
- The original URL

Record this in a structured format for use in the admin panel.

**Expected catalog:**

```
App.jsx:
  - cinematicPhotos[0]: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=85" → Philosophy section (right)
  - cinematicPhotos[1]: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=85" → Approach section (left)
  - cinematicPhotos[2]: "https://images.unsplash.com/photo-1481833761824-86256f2ba5c4?w=800&q=85" → Promise section (right)
  - cinematicPhotos[3]: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85" → (unused currently)
  - cinematicPhotos[4-8]: 5 photos → Photo interlude strip
  - cinematicPhotos[9]: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85" → CTA background

AboutUs.jsx:
  - galleryPhotos[0-4]: 5 photos → Hero cluster
  - galleryPhotos[5-6]: 2 photos → Story section
  - galleryPhotos[7]: 1 photo → Studio photo
  - galleryPhotos[8]: 1 photo → CTA background
  - projects[*].img: 12 picsum URLs → Project showcase cards

ServicesSection.jsx:
  - services[0].decor, services[1].decor, services[2].decor: 3 Unsplash URLs → Decor backgrounds
  - services[*].examples[*].img: 9 picsum URLs → Awwwards previews

ExamplesPage.jsx:
  - projects[*].image: 6 Unsplash URLs → Project cards
```

- [ ] **Step 2: Verify all imports are valid**

Check that every import in every component resolves to an actual file. Look for:
- `@/lib/utils` - exists
- `@/components/ui/button` - exists
- `@/components/LeadForm` - exists
- `@/components/GalleryPhoto` - exists
- etc.

- [ ] **Step 3: Check for dead code or broken references**

Review each component for:
- Unused imports
- Undefined variables being used
- Broken CSS class references
- Missing alt text on images (accessibility)

---

### Task 3: Test All Interactive Features

**Files:**
- Interactive: `open index.html` or `npm run dev`

- [ ] **Step 1: Start dev server**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage"
npm run dev 2>&1
```

Expected: Dev server starts on port 5173 without errors.

- [ ] **Step 2: Verify all navigation states**

Document that each navigation state works:
1. Home page (default) - Loader → Logo flash → Main content
2. About Us - Click "About Us" button → AboutUs.jsx renders
3. Back from About Us - Click "Back" → Home shows
4. Start a Project - Click "Start a Project" → ContactPage renders
5. Back from Contact - Click "Back" → Home shows
6. Booking Modal - Click "Book a Free Call" → BookingModal opens
7. Examples page (if accessible) - Verify it renders
8. Day/Night toggle - Verify theme switches

- [ ] **Step 3: Verify all animations and interactions**

Check that:
1. Scroll animations trigger (CharReveal, WordReveal, KineticText)
2. Photo entrance animations work (GalleryPhoto offset/rotate)
3. Services tilt cards respond to mouse movement
4. Awwwards preview modal opens on click
5. Horizontal scroll sections scroll properly
6. Stats counters animate on scroll
7. Lead form validates and submits
8. Theme toggle persists visual state

---

## PART B: BACKEND FILE UPLOAD API

### Task 4: Add Photo Upload Endpoints to FastAPI Backend

**Files:**
- Modify: `backend/main.py`
- Modify: `backend/schemas.py`
- Modify: `backend/models.py`
- Create: `backend/requirements.txt` (update if needed)

**Interfaces:**
- Consumes: Existing FastAPI app, SQLAlchemy setup
- Produces: `POST /api/admin/photos/upload` endpoint, `GET /api/admin/photos` endpoint, `GET /photos/{filename}` static serving

- [ ] **Step 1: Add photo storage model and schemas**

Add to `backend/models.py`:

```python
class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    slot_key = Column(String(255), unique=True, nullable=False, index=True)
    filename = Column(String(255), nullable=False)
    original_url = Column(String(1024), nullable=True)
    uploaded_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
```

Add to `backend/schemas.py`:

```python
from pydantic import BaseModel
from datetime import datetime

class PhotoResponse(BaseModel):
    slot_key: str
    filename: str
    original_url: str | None = None
    uploaded_at: datetime

    model_config = {"from_attributes": True}

class PhotoConfigResponse(BaseModel):
    photos: dict[str, str]  # slot_key -> photo URL or filename
```

- [ ] **Step 2: Add file upload endpoints to main.py**

Add to `backend/main.py` after existing code:

```python
import uuid
import shutil
from pathlib import Path
from fastapi import UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from models import Photo
from schemas import PhotoResponse

# ─── Photo storage directory ─────────────────────────────────────────────
PHOTO_DIR = Path(__file__).resolve().parent.parent / "photos"
PHOTO_DIR.mkdir(exist_ok=True)

# ─── Mount static file serving for photos ────────────────────────────────
app.mount("/photos", StaticFiles(directory=str(PHOTO_DIR)), name="photos")


@app.get("/api/admin/photos", response_model=dict)
def get_all_photos(db: Session = Depends(get_db)):
    """Get all photo configurations — returns mapping of slot_key -> URL."""
    photos = db.query(Photo).all()
    result = {}
    for p in photos:
        result[p.slot_key] = f"/photos/{p.filename}"
    return {"photos": result}


@app.post("/api/admin/photos/upload", response_model=PhotoResponse)
async def upload_photo(
    slot_key: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _auth: None = Depends(verify_internal_auth),
):
    """Upload a photo file for a specific slot key."""
    # Validate file type
    allowed_types = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"}
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")

    # Generate unique filename to prevent collisions
    ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    unique_name = f"{slot_key}_{uuid.uuid4().hex[:8]}.{ext}"
    file_path = PHOTO_DIR / unique_name

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Upsert photo record
    existing = db.query(Photo).filter(Photo.slot_key == slot_key).first()
    if existing:
        # Delete old file
        old_path = PHOTO_DIR / existing.filename
        if old_path.exists():
            old_path.unlink()
        existing.filename = unique_name
        existing.uploaded_at = datetime.now(timezone.utc)
    else:
        photo = Photo(
            slot_key=slot_key,
            filename=unique_name,
        )
        db.add(photo)

    db.commit()
    db.refresh(existing or photo)
    return existing or photo
```

- [ ] **Step 3: Add CORS support for the upload endpoint**

Verify the existing CORS middleware allows the Vite dev server origin. Update if needed in `backend/main.py`:

```python
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3002,http://localhost:5173").split(",")
```

- [ ] **Step 4: Test the backend starts correctly**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage\backend"
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Verify:
- `GET http://localhost:8000/health` returns `{"status": "ok"}`
- `GET http://localhost:8000/api/admin/photos` returns `{"photos": {}}`

- [ ] **Step 5: Test file upload with curl**

```bash
curl -X POST http://localhost:8000/api/admin/photos/upload \
  -H "Authorization: Bearer test-secret" \
  -F "slot_key=homepage_philosophy" \
  -F "file=@C:\path\to\test-image.jpg"
```

Expected: Returns the PhotoResponse with filename and timestamp.

---

### Task 5: Add Auth to Admin Endpoints

**Files:**
- Modify: `backend/main.py`

- [ ] **Step 1: Add admin auth dependency**

Add to `backend/main.py`:

```python
import secrets

# ─── Admin Auth ──────────────────────────────────────────────────────────
def verify_admin_auth(authorization: str | None = Header(None)):
    """Verify admin bearer token against configured secret."""
    admin_token = os.getenv("ADMIN_API_TOKEN", "")
    if not admin_token:
        return  # no token configured — allow in dev mode
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing authorization")
    token = authorization.removeprefix("Bearer ")
    if not secrets.compare_digest(token, admin_token):
        raise HTTPException(status_code=401, detail="Invalid token")
```

- [ ] **Step 2: Apply admin auth to upload endpoint**

```python
@app.post("/api/admin/photos/upload", response_model=PhotoResponse)
async def upload_photo(
    slot_key: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _auth: None = Depends(verify_admin_auth),
):
```

The `GET /api/admin/photos` endpoint remains unauthenticated (needed by the frontend).

---

## PART C: FRONTEND ADMIN PANEL

### Task 6: Create Photo Config Hook

**Files:**
- Create: `src/lib/usePhotoConfig.js`
- Modify: `src/lib/api.js`

**Interfaces:**
- Consumes: Backend `GET /api/admin/photos` endpoint
- Produces: `usePhotoConfig()` hook returning `{ photos: object, loading: boolean, error: Error|null }`

- [ ] **Step 1: Add photo config fetch function to api.js**

Add to `src/lib/api.js`:

```javascript
const ADMIN_API_BASE = 'http://localhost:8000'

export async function fetchPhotoConfig() {
  try {
    const res = await fetch(`${ADMIN_API_BASE}/api/admin/photos`)
    if (!res.ok) return { photos: {} }
    return await res.json()
  } catch {
    return { photos: {} }  // Fallback: no custom photos
  }
}

export async function uploadPhoto(slotKey, file, token) {
  const formData = new FormData()
  formData.append('slot_key', slotKey)
  formData.append('file', file)

  const res = await fetch(`${ADMIN_API_BASE}/api/admin/photos/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })

  if (!res.ok) {
    const error = new Error('Upload failed')
    error.status = res.status
    throw error
  }

  return await res.json()
}

export async function deletePhoto(slotKey, token) {
  const res = await fetch(`${ADMIN_API_BASE}/api/admin/photos/${slotKey}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error('Delete failed')
  return await res.json()
}
```

- [ ] **Step 2: Create usePhotoConfig hook**

Create `src/lib/usePhotoConfig.js`:

```javascript
import { useState, useEffect, useCallback } from 'react'
import { fetchPhotoConfig } from './api'

const ADMIN_API_BASE = 'http://localhost:8000'

export function usePhotoConfig() {
  const [photos, setPhotos] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPhotoConfig()
      setPhotos(data.photos || {})
    } catch (err) {
      setError(err)
      setPhotos({})
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  /**
   * Get the URL for a photo slot — returns uploaded photo URL if available,
   * otherwise returns the fallback URL.
   */
  const getPhotoUrl = useCallback((slotKey, fallbackUrl) => {
    const uploaded = photos[slotKey]
    if (uploaded) {
      return `${ADMIN_API_BASE}${uploaded}`
    }
    return fallbackUrl
  }, [photos])

  return { photos, loading, error, refresh, getPhotoUrl }
}
```

---

### Task 7: Create Admin Panel Component

**Files:**
- Create: `src/components/AdminPanel.jsx`
- Create: `src/components/PhotoUploadSlot.jsx`

**Interfaces:**
- Consumes: `usePhotoConfig()` hook, `uploadPhoto()` from api.js
- Produces: AdminPanel component with file upload UI for every photo slot

- [ ] **Step 1: Create PhotoUploadSlot component**

Create `src/components/PhotoUploadSlot.jsx`:

```jsx
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, Check, X, Loader2, Trash2 } from 'lucide-react'

export default function PhotoUploadSlot({
  slotKey,
  label,
  currentUrl,
  fallbackUrl,
  onUpload,
  onDelete,
  theme = 'night',
}) {
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef(null)

  const isDark = theme === 'night'

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setError(null)
  }

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    try {
      await onUpload(slotKey, file)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Remove this photo?')) return
    setError(null)
    try {
      await onDelete(slotKey)
      setPreview(null)
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  const displayUrl = preview || currentUrl || fallbackUrl

  return (
    <div
      className="rounded-xl border p-4 space-y-3"
      style={{
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      }}
    >
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium truncate" style={{ color: isDark ? '#F2F2F2' : '#1A1A1A' }}>
          {label}
        </label>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          color: isDark ? '#8A8A8A' : '#5A4A3A',
        }}>
          {slotKey}
        </span>
      </div>

      {/* Preview */}
      <div
        className="relative rounded-lg overflow-hidden border"
        style={{
          width: '100%',
          height: '120px',
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          background: isDark ? '#1A1817' : '#F5F0EB',
        }}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={label}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="size-8" style={{ color: isDark ? '#6A6A6A' : '#8A7A6A' }} />
          </div>
        )}
      </div>

      {/* File input */}
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={handleFileSelect}
          className="block w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:cursor-pointer"
          style={{
            color: isDark ? '#8A8A8A' : '#5A4A3A',
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={handleUpload}
          disabled={uploading || !fileRef.current?.files?.[0]}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-40"
          style={{
            background: isDark ? '#FF6B4A' : '#E85D3A',
            color: '#FFFFFF',
          }}
        >
          {uploading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : success ? (
            <Check className="size-3.5" />
          ) : (
            <Upload className="size-3.5" />
          )}
          {uploading ? 'Uploading...' : success ? 'Uploaded!' : 'Upload'}
        </motion.button>

        {(currentUrl || preview) && (
          <motion.button
            onClick={handleDelete}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center p-2 rounded-lg text-xs transition-colors"
            style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: '#EF4444',
            }}
          >
            <Trash2 className="size-3.5" />
          </motion.button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-400">
          <X className="size-3" />
          {error}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create AdminPanel component**

Create `src/components/AdminPanel.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Shield, RefreshCw } from 'lucide-react'
import PhotoUploadSlot from './PhotoUploadSlot'
import { uploadPhoto, deletePhoto, fetchPhotoConfig } from '../lib/api'

const ADMIN_API_BASE = 'http://localhost:8000'

const PHOTO_SLOTS = [
  // ── Homepage (App.jsx) ──
  { slotKey: 'homepage_philosophy', label: 'Homepage — Philosophy (right)', fallback: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=85' },
  { slotKey: 'homepage_approach', label: 'Homepage — Approach (left)', fallback: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=85' },
  { slotKey: 'homepage_promise', label: 'Homepage — Promise (right)', fallback: 'https://images.unsplash.com/photo-1481833761824-86256f2ba5c4?w=800&q=85' },
  { slotKey: 'homepage_interlude_1', label: 'Homepage — Photo Strip #1', fallback: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=85' },
  { slotKey: 'homepage_interlude_2', label: 'Homepage — Photo Strip #2', fallback: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=85' },
  { slotKey: 'homepage_interlude_3', label: 'Homepage — Photo Strip #3', fallback: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=85' },
  { slotKey: 'homepage_interlude_4', label: 'Homepage — Photo Strip #4', fallback: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=85' },
  { slotKey: 'homepage_interlude_5', label: 'Homepage — Photo Strip #5', fallback: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=85' },
  { slotKey: 'homepage_cta', label: 'Homepage — CTA Background', fallback: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85' },

  // ── About Us (AboutUs.jsx) ──
  { slotKey: 'about_hero_1', label: 'About Us — Hero Cluster #1', fallback: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=85' },
  { slotKey: 'about_hero_2', label: 'About Us — Hero Cluster #2', fallback: 'https://images.unsplash.com/photo-1518173946687-a36f968f7e1e?w=800&q=85' },
  { slotKey: 'about_hero_3', label: 'About Us — Hero Cluster #3', fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85' },
  { slotKey: 'about_hero_4', label: 'About Us — Hero Cluster #4', fallback: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=85' },
  { slotKey: 'about_hero_5', label: 'About Us — Hero Cluster #5', fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=85' },
  { slotKey: 'about_story_1', label: 'About Us — Story Workspace', fallback: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85' },
  { slotKey: 'about_story_2', label: 'About Us — Story Team', fallback: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=85' },
  { slotKey: 'about_studio', label: 'About Us — Studio Photo', fallback: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=85' },
  { slotKey: 'about_cta', label: 'About Us — CTA Background', fallback: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85' },

  // ── Services (ServicesSection.jsx) ──
  { slotKey: 'services_web_decor', label: 'Services — Web Dev Decor', fallback: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80' },
  { slotKey: 'services_ai_decor', label: 'Services — AI Decor', fallback: 'https://images.unsplash.com/photo-1518173946687-a36f968f7e1e?w=1600&q=80' },
  { slotKey: 'services_design_decor', label: 'Services — Design Decor', fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80' },

  // ── Examples (ExamplesPage.jsx) ──
  { slotKey: 'examples_project_1', label: 'Examples — Nova Bank', fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80' },
  { slotKey: 'examples_project_2', label: 'Examples — Velo E-Commerce', fallback: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80' },
  { slotKey: 'examples_project_3', label: 'Examples — Pulse Dashboard', fallback: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80' },
  { slotKey: 'examples_project_4', label: 'Examples — Orion SaaS', fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80' },
  { slotKey: 'examples_project_5', label: 'Examples — Zen Health', fallback: 'https://images.unsplash.com/photo-1613909207039-6b173b75525c?w=800&h=600&fit=crop&q=80' },
  { slotKey: 'examples_project_6', label: 'Examples — CryptoVault', fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80' },

  // ── About Us Projects (AboutUs.jsx) ──
  { slotKey: 'about_project_gods_creatures', label: 'About — Gods Creatures', fallback: 'https://picsum.photos/seed/gods-creatures/400/280' },
  { slotKey: 'about_project_pet_grooming', label: 'About — Pet Grooming', fallback: 'https://picsum.photos/seed/pet-grooming/400/280' },
  { slotKey: 'about_project_be_kind', label: 'About — Be Kind Bakery', fallback: 'https://picsum.photos/seed/be-kind-bakery/400/280' },
  { slotKey: 'about_project_crumbs', label: 'About — Crumbs Bakery', fallback: 'https://picsum.photos/seed/crumbs-bakery/400/280' },
  { slotKey: 'about_project_chelsea_spa', label: 'About — Chelsea Spa', fallback: 'https://picsum.photos/seed/chelsea-spa/400/280' },
  { slotKey: 'about_project_kiki', label: 'About — Kiki Portfolio', fallback: 'https://picsum.photos/seed/kiki-portfolio/400/280' },
  { slotKey: 'about_project_gym', label: 'About — Gym Website', fallback: 'https://picsum.photos/seed/gym-website/400/280' },
  { slotKey: 'about_project_apple_clone', label: 'About — Apple Clone', fallback: 'https://picsum.photos/seed/apple-clone/400/280' },
  { slotKey: 'about_project_trading_bot', label: 'About — Trading Bot', fallback: 'https://picsum.photos/seed/trading-bot/400/280' },
  { slotKey: 'about_project_support_agent', label: 'About — Support Agent', fallback: 'https://picsum.photos/seed/support-agent/400/280' },
  { slotKey: 'about_project_virtual_tapes', label: 'About — Virtual Tapes', fallback: 'https://picsum.photos/seed/virtual-tapes/400/280' },
  { slotKey: 'about_project_rogue_code', label: 'About — Rogue Code', fallback: 'https://picsum.photos/seed/rogue-code/400/280' },
]

export default function AdminPanel({ onBack, theme = 'night' }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [photoConfig, setPhotoConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const isDark = theme === 'night'

  const loadConfig = async () => {
    try {
      const data = await fetchPhotoConfig()
      setPhotoConfig(data.photos || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  const handleUpload = async (slotKey, file) => {
    const result = await uploadPhoto(slotKey, file, authToken)
    await loadConfig()
    return result
  }

  const handleDelete = async (slotKey) => {
    await deletePhoto(slotKey, authToken)
    await loadConfig()
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadConfig()
    setRefreshing(false)
  }

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-32" style={{ backgroundColor: isDark ? '#1A1817' : '#F5F0EB' }}>
        <div className="px-6 md:px-12 mx-auto max-w-md">
          <motion.button onClick={onBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm font-medium mb-12 transition-opacity hover:opacity-70"
            style={{ color: isDark ? '#FF6B4A' : '#E85D3A' }}>
            <ArrowLeft className="size-4" /> Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-8 text-center"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            }}
          >
            <Shield className="size-12 mx-auto mb-4" style={{ color: isDark ? '#FF6B4A' : '#E85D3A' }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: isDark ? '#F2F2F2' : '#1A1A1A' }}>
              Admin Access
            </h2>
            <p className="text-sm mb-6" style={{ color: isDark ? '#8A8A8A' : '#5A4A3A' }}>
              Enter your admin token to access photo management.
            </p>
            <input
              type="password"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              placeholder="Admin token..."
              className="w-full rounded-xl border px-4 py-3 text-sm mb-4 outline-none"
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                color: isDark ? '#F2F2F2' : '#1A1A1A',
              }}
            />
            <motion.button
              onClick={() => setIsAuthenticated(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{
                background: isDark ? '#FF6B4A' : '#E85D3A',
                color: '#FFFFFF',
              }}
            >
              <Lock className="size-4 inline mr-2" />
              Unlock Admin
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Admin panel
  return (
    <div className="min-h-screen pt-24 pb-32" style={{ backgroundColor: isDark ? '#1A1817' : '#F5F0EB' }}>
      <div className="px-6 md:px-12 mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.button onClick={onBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: isDark ? '#FF6B4A' : '#E85D3A' }}>
            <ArrowLeft className="size-4" /> Back to site
          </motion.button>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleRefresh}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border"
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                color: isDark ? '#8A8A8A' : '#5A4A3A',
              }}
            >
              <RefreshCw className={`size-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>
        </div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: isDark ? '#F2F2F2' : '#1A1A1A' }}>
            Photo Manager
          </h1>
          <p className="text-sm mt-2" style={{ color: isDark ? '#8A8A8A' : '#5A4A3A' }}>
            Upload custom photos for every section of the site. Supported: JPG, PNG, WebP, GIF, AVIF.
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Photo slots grouped by section */}
        {loading ? (
          <div className="text-center py-20" style={{ color: isDark ? '#8A8A8A' : '#5A4A3A' }}>
            Loading photos...
          </div>
        ) : (
          <>
            {/* Homepage Section */}
            <SectionGroup title="Homepage" slots={PHOTO_SLOTS.slice(0, 9)} photoConfig={photoConfig} handleUpload={handleUpload} handleDelete={handleDelete} isDark={isDark} />

            {/* About Us Section */}
            <SectionGroup title="About Us" slots={PHOTO_SLOTS.slice(9, 21)} photoConfig={photoConfig} handleUpload={handleUpload} handleDelete={handleDelete} isDark={isDark} />

            {/* Services Section */}
            <SectionGroup title="Services" slots={PHOTO_SLOTS.slice(21, 24)} photoConfig={photoConfig} handleUpload={handleUpload} handleDelete={handleDelete} isDark={isDark} />

            {/* Examples Section */}
            <SectionGroup title="Examples" slots={PHOTO_SLOTS.slice(24, 30)} photoConfig={photoConfig} handleUpload={handleUpload} handleDelete={handleDelete} isDark={isDark} />

            {/* About Projects Section */}
            <SectionGroup title="About Us — Project Cards" slots={PHOTO_SLOTS.slice(30)} photoConfig={photoConfig} handleUpload={handleUpload} handleDelete={handleDelete} isDark={isDark} />
          </>
        )}
      </div>
    </div>
  )
}

function SectionGroup({ title, slots, photoConfig, handleUpload, handleDelete, isDark }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4 pb-3 border-b" style={{
        color: isDark ? '#F2F2F2' : '#1A1A1A',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      }}>
        {title}
        <span className="text-xs font-normal ml-2" style={{ color: isDark ? '#6A6A6A' : '#8A7A6A' }}>
          ({slots.length} photos)
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <PhotoUploadSlot
            key={slot.slotKey}
            slotKey={slot.slotKey}
            label={slot.label}
            currentUrl={photoConfig[slot.slotKey] ? `${'http://localhost:8000'}${photoConfig[slot.slotKey]}` : null}
            fallbackUrl={slot.fallback}
            onUpload={handleUpload}
            onDelete={handleDelete}
            theme={isDark ? 'night' : 'day'}
          />
        ))}
      </div>
    </div>
  )
}
```

---

### Task 8: Integrate Admin Panel into App

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: AdminPanel component
- Produces: Admin route accessible via state toggle

- [ ] **Step 1: Add admin state to App**

In `src/App.jsx`, add:

```jsx
// After: const [showExamples, setShowExamples] = useState(false)
const [showAdmin, setShowAdmin] = useState(false)
```

- [ ] **Step 2: Import AdminPanel**

```jsx
// After existing imports
import AdminPanel from './components/AdminPanel'
```

- [ ] **Step 3: Add admin route rendering**

In `src/App.jsx`, add admin rendering before/after the existing conditional rendering:

```jsx
{showAdmin ? (
  <AdminPanel theme={theme} onBack={() => setShowAdmin(false)} />
) : showExamples ? (
  // ... existing
)}
```

- [ ] **Step 4: Add admin entry button in nav (hidden behind double-click or key combo)**

Add to the nav section in `src/App.jsx`:

```jsx
{/* Admin button — subtle, for site managers */}
<button
  onClick={() => { setShowAdmin(true); setShowContact(false); }}
  className="flex items-center gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-wider rounded-full transition-colors opacity-30 hover:opacity-60"
  style={{
    borderColor: p.border,
    color: p.dim,
    border: `1px dashed ${p.border}`,
  }}
  title="Admin (photo management)"
>
  Admin
</button>
```

---

### Task 9: Integrate Photo Config into Components

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/AboutUs.jsx`
- Modify: `src/components/ServicesSection.jsx`
- Modify: `src/components/ExamplesPage.jsx`

- [ ] **Step 1: Wrap App with PhotoConfigProvider**

Create `src/lib/PhotoConfigContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { fetchPhotoConfig } from './api'

const ADMIN_API_BASE = 'http://localhost:8000'

const PhotoConfigContext = createContext({
  getPhotoUrl: (slotKey, fallbackUrl) => fallbackUrl,
  refresh: () => {},
})

export function PhotoConfigProvider({ children }) {
  const [photos, setPhotos] = useState({})

  const load = useCallback(async () => {
    try {
      const data = await fetchPhotoConfig()
      setPhotos(data.photos || {})
    } catch {
      setPhotos({})
    }
  }, [])

  useEffect(() => { load() }, [load])

  const getPhotoUrl = useCallback((slotKey, fallbackUrl) => {
    const uploaded = photos[slotKey]
    if (uploaded) {
      return `${ADMIN_API_BASE}${uploaded}`
    }
    return fallbackUrl
  }, [photos])

  return (
    <PhotoConfigContext.Provider value={{ getPhotoUrl, refresh: load }}>
      {children}
    </PhotoConfigContext.Provider>
  )
}

export function usePhotoUrl() {
  return useContext(PhotoConfigContext)
}
```

- [ ] **Step 2: Wrap App component**

In `src/App.jsx`, wrap the return with `PhotoConfigProvider`:

```jsx
import { PhotoConfigProvider } from './lib/PhotoConfigContext'

// In the return:
<PhotoConfigProvider>
  <div className="min-h-screen" style={{ backgroundColor: p.bg }}>
    {/* ... all existing JSX ... */}
  </div>
</PhotoConfigProvider>
```

- [ ] **Step 3: Update App.jsx photos to use context**

In `src/App.jsx`, import `usePhotoUrl`:

```jsx
import { usePhotoUrl } from '../lib/PhotoConfigContext'
```

Then inside the App component, create the photo URLs dynamically:

```jsx
const { getPhotoUrl } = usePhotoUrl()

// Create dynamic photo arrays from context
const photos = cinematicPhotos.map((url, i) => {
  const keys = [
    'homepage_philosophy', 'homepage_approach', 'homepage_promise', null,
    'homepage_interlude_1', 'homepage_interlude_2', 'homepage_interlude_3',
    'homepage_interlude_4', 'homepage_interlude_5', 'homepage_cta'
  ]
  const key = keys[i]
  return key ? getPhotoUrl(key, url) : url
})
```

Replace all `cinematicPhotos[i]` references with `photos[i]`.

- [ ] **Step 4: Update AboutUs.jsx photos**

Similar pattern — import `usePhotoUrl`, create dynamic arrays:

```jsx
const { getPhotoUrl } = usePhotoUrl()

const photos = galleryPhotos.map((url, i) => {
  const keys = [
    'about_hero_1', 'about_hero_2', 'about_hero_3', 'about_hero_4', 'about_hero_5',
    'about_story_1', 'about_story_2', null, 'about_cta'
  ]
  const key = keys[i]
  return key ? getPhotoUrl(key, url) : url
})

const projectPhotos = projects.map((proj, i) => {
  const keys = [
    'about_project_gods_creatures', 'about_project_pet_grooming', 'about_project_be_kind',
    'about_project_crumbs', 'about_project_chelsea_spa', 'about_project_kiki',
    'about_project_gym', 'about_project_apple_clone', 'about_project_trading_bot',
    'about_project_support_agent', 'about_project_virtual_tapes', 'about_project_rogue_code'
  ]
  const key = keys[i]
  return key ? getPhotoUrl(key, proj.img) : proj.img
})
```

- [ ] **Step 5: Update ServicesSection.jsx**

```jsx
const { getPhotoUrl } = usePhotoUrl()

// Update decor images
const updatedServices = services.map((s, i) => {
  const decors = ['services_web_decor', 'services_ai_decor', 'services_design_decor']
  return {
    ...s,
    decor: getPhotoUrl(decors[i], s.decor),
  }
})
```

- [ ] **Step 6: Update ExamplesPage.jsx**

```jsx
const { getPhotoUrl } = usePhotoUrl()

const updatedProjects = projects.map((p, i) => {
  const keys = [
    'examples_project_1', 'examples_project_2', 'examples_project_3',
    'examples_project_4', 'examples_project_5', 'examples_project_6',
  ]
  return {
    ...p,
    image: getPhotoUrl(keys[i], p.image),
  }
})
```

---

## PART D: FINAL VERIFICATION

### Task 10: Update Backend Dependencies & Environment

**Files:**
- Create: `backend/.env` (from example)
- Modify: `backend/requirements.txt`

- [ ] **Step 1: Update requirements.txt**

Ensure `python-multipart` is in `backend/requirements.txt` for file upload support:

```
fastapi
uvicorn
sqlalchemy
pydantic[email]
python-dotenv
python-multipart
```

- [ ] **Step 2: Create backend environment**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage\backend"
pip install python-multipart
```

- [ ] **Step 3: Set up admin token**

Create or update `backend/.env`:

```
INTERNAL_API_SECRET=dev-secret-key
ADMIN_API_TOKEN=admin-dev-token-123
CORS_ORIGINS=http://localhost:3002,http://localhost:5173
```

---

### Task 11: Deep Review & End-to-End Verification

**Files:**
- Entire codebase

- [ ] **Step 1: Run production build**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage"
npm run build 2>&1
```

Expected: Build succeeds with no errors. Compare bundle size to baseline (currently ~1,375 kB JS, ~50.87 kB CSS).

- [ ] **Step 2: Run lint check**

```bash
npm run lint 2>&1
```

Expected: No errors.

- [ ] **Step 3: Start backend and test upload**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage\backend"
uvicorn main:app --reload --port 8000
```

Test upload with a real image file.

- [ ] **Step 4: Start frontend and test admin panel**

```bash
cd "C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage"
npm run dev
```

Navigate to the site, click the Admin button, log in with token, upload a test photo for each section.

- [ ] **Step 5: Visual review of every section**

Check each section of the site:
1. Homepage — brand story (philosophy, approach, promise)
2. Homepage — stats
3. Homepage — services
4. Homepage — photo interlude
5. Homepage — beam timeline
6. Homepage — why us section
7. Homepage — CTA
8. About Us — hero cluster
9. About Us — story section
10. About Us — stats
11. About Us — values
12. About Us — team
13. About Us — story continued
14. About Us — process
15. About Us — project showcase
16. About Us — CTA
17. Contact page
18. Examples page
19. Booking modal
20. Day/Night toggle on all pages

- [ ] **Step 6: Verify uploaded photos appear**

After uploading photos via admin panel, verify they appear in the correct locations on the site. Check:
- The uploaded image shows (not the Unsplash fallback)
- Aspect ratios are maintained
- Images load correctly on page refresh

- [ ] **Step 7: Verify fallback behavior**

Stop the backend server, restart the frontend, verify the site still works using fallback Unsplash URLs.

- [ ] **Step 8: Check for console errors**

Open browser DevTools console. Verify no:
- 404 errors for missing assets
- CORS errors
- React render errors
- API connection errors (expected when backend is down — should be caught gracefully)

---

## Files Summary

### Modified Files:
| File | Change |
|------|--------|
| `backend/main.py` | Add photo upload endpoints, static file serving, admin auth |
| `backend/models.py` | Add Photo model |
| `backend/schemas.py` | Add PhotoResponse schema |
| `backend/requirements.txt` | Add python-multipart |
| `src/App.jsx` | Add admin panel route, admin button in nav, PhotoConfigProvider |
| `src/lib/api.js` | Add fetchPhotoConfig, uploadPhoto, deletePhoto functions |
| `src/components/AboutUs.jsx` | Dynamic photo URLs from context |
| `src/components/ServicesSection.jsx` | Dynamic photo URLs from context |
| `src/components/ExamplesPage.jsx` | Dynamic photo URLs from context |

### Created Files:
| File | Purpose |
|------|---------|
| `src/components/AdminPanel.jsx` | Admin panel with authentication and photo upload UI |
| `src/components/PhotoUploadSlot.jsx` | Individual photo upload slot component |
| `src/lib/PhotoConfigContext.jsx` | React context for dynamic photo URLs |
| `backend/.env` | Environment variables (admin token, CORS) |

---

## Dependencies Between Tasks

```
Task 1 ──► Task 2 ──► Task 3
  │                       │
  └───────────────────────┘
          (baseline)

Task 4 ──► Task 5
  │           │
  └───────────┘
      (backend API)

Task 6 ──► Task 7
  │           │
  └───────────┘
  (hooks + components)

Task 8 ──► Task 9
  │           │
  └───────────┘
  (integration)

Task 10 ──► Task 11
  │            │
  └────────────┘
  (verification)
```

**Sequential dependencies:**
- Task 4-5 (backend) must complete before Task 6-7 (frontend hooks) which depend on API shape
- Task 6-7 must complete before Task 8-9 (integration into App)
- Task 10 must complete before Task 11 (verification)
- Tasks 1-3 (review) are independent and can run in parallel with Tasks 4-10

---

## Plan complete. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
