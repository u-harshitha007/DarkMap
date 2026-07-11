# DarkMap — Installation Guide

This document provides detailed, step-by-step installation instructions
for setting up DarkMap in a local development environment.

---

## System Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| Operating System | Windows 10, macOS 12, Ubuntu 20.04 | Latest stable |
| Python | 3.11 | 3.12 |
| Node.js | 18 LTS | 20 LTS |
| npm | 9 | 10 |
| RAM | 4 GB | 8 GB |
| Disk Space | 500 MB | 1 GB |

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/DarkMap.git
cd DarkMap
```

---

## Step 2 — Backend Setup (FastAPI)

### 2.1 Navigate to the backend directory

```bash
cd backend
```

### 2.2 Create a Python virtual environment

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt once activated.

### 2.3 Install Python dependencies

```bash
pip install -r requirements.txt
```

This installs:
- `fastapi==0.115.6`
- `uvicorn[standard]==0.34.0`
- `sqlalchemy==2.0.36`
- `pydantic==2.10.3`

### 2.4 Start the backend server

```bash
uvicorn main:app --reload
```

Expected output:
```
INFO:     Will watch for changes in these directories: ['.../backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 2.5 Verify the backend

Open your browser and navigate to:
- `http://localhost:8000` — should return `{"project": "DarkMap", "status": "running"}`
- `http://localhost:8000/docs` — interactive Swagger UI
- `http://localhost:8000/incidents` — returns all crime incidents

---

## Step 3 — Frontend Setup (React + Vite)

Open a **new terminal window** (keep the backend running).

### 3.1 Navigate to the frontend directory

```bash
# From the project root
cd frontend
```

### 3.2 Install Node.js dependencies

```bash
npm install
```

This may take a minute on the first run as it installs all packages
from `package.json` including React, Vite, React-Leaflet, and TailwindCSS.

### 3.3 Start the Vite development server

```bash
npm run dev
```

Expected output:
```
  VITE v8.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3.4 Open DarkMap in your browser

Navigate to `http://localhost:5173` — you should see the DarkMap landing page.

---

## Running Both Services

For convenience, here's a quick-start summary assuming you're in the project root:

**Terminal 1 — Backend:**
```bash
cd backend
# activate venv first (see Step 2.2)
uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

---

## Troubleshooting

### Backend won't start — `ModuleNotFoundError`

Make sure you have activated your virtual environment before running `uvicorn`.

```bash
# Check if venv is active
which python   # macOS/Linux — should point inside venv/
where python   # Windows — should point inside venv\
```

### Frontend can't reach the backend — Network Error

Check that:
1. The backend is running at `http://localhost:8000`
2. No firewall rule is blocking port `8000`
3. The `allow_origins` in `main.py` includes `http://localhost:5173`

### `npm install` fails — Node version mismatch

Verify Node.js version:
```bash
node --version  # should be 18+
npm --version   # should be 9+
```

Use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or
[nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node versions.

### Map not loading — Leaflet CSS missing

This is usually caused by Leaflet marker icons not resolving. The `CrimeMap.jsx`
component imports Leaflet CSS directly. Make sure your network can reach CDN
resources, or add Leaflet CSS locally.

### Python version is 3.10 or below

FastAPI and Pydantic v2 require Python 3.11+. Please upgrade:
- **Windows:** Download from [python.org](https://python.org)
- **macOS:** `brew install python@3.12`
- **Ubuntu:** `sudo apt install python3.12`

---

## Environment Variables (Optional)

No `.env` file is required for local development. If you wish to
customise ports:

**Backend** — pass flags to Uvicorn:
```bash
uvicorn main:app --reload --port 8001
```

**Frontend** — create `frontend/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8001
```

Then update `crimeUtils.js` to read from `import.meta.env.VITE_API_BASE_URL`.

---

*Back to [README](../README.md)*
