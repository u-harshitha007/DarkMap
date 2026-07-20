# DarkMap

A full-stack crime analytics dashboard that visualises geo-tagged incidents across Indian cities on an interactive map. Filter by category, severity, and date range in real time.

![Tech Stack](https://img.shields.io/badge/Python-3.11+-blue?style=flat-square) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?style=flat-square) ![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square)

---

## Overview

DarkMap pairs a **FastAPI** REST backend with a **React + Vite** frontend to turn structured crime data into an explorable geospatial interface. Incidents are rendered as severity-coded circle markers on a Leaflet map. A filter panel lets users narrow down by crime category, severity level, and date range — with the map and dashboard cards updating instantly.

---

## Features

- **Interactive Leaflet Map** — pan, zoom, click markers for incident details
- **Severity-coded Markers** — red (high), amber (medium), green (low)
- **City Search** — search by city, incident title, or category; map auto-pans and zooms to the first match with animated `flyTo`
- **Highlighted Marker** — the focused incident renders with a larger radius and white border so it stands out clearly
- **Clickable Search Results** — each result row is selectable; clicking any row re-pans the map to that specific incident
- **Four-way Filter Panel** — filter by category, severity, from-date, and to-date simultaneously
- **Reset Filters Button** — one click to clear all active filters
- **Live Dashboard Cards** — total incidents, high-severity count, most common category — all reactive to active filters
- **Date Range Label** — active date range displayed inline on the page heading
- **50-incident Dataset** — realistic sample data across 10 major Indian cities, spanning Jan–Dec 2024
- **FastAPI with Swagger UI** — auto-generated interactive API docs at `/docs`
- **Dark UI** — dark colour scheme built for map-heavy interfaces

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Python | 3.11+ | Runtime |
| FastAPI | 0.115.6 | REST API framework |
| Uvicorn | 0.34.0 | ASGI server |
| SQLAlchemy | 2.0.36 | ORM and database toolkit |
| Pydantic | 2.10.3 | Data validation and serialisation |
| SQLite | Built-in | Embedded relational database |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI component framework |
| Vite | 8.x | Build tool and dev server |
| React-Leaflet | 5.x | React wrapper for Leaflet |
| Leaflet.js | 1.9.x | Core mapping library |
| TailwindCSS | 4.x | Utility-first CSS framework |
| React Router | 7.x | Client-side routing |

---

## Project Structure

```
DarkMap/
├── backend/
│   ├── main.py           # Routes, CORS, query param filtering (category, severity, date_from, date_to)
│   ├── models.py         # SQLAlchemy ORM model — CrimeIncident
│   ├── schemas.py        # Pydantic schemas — CrimeIncidentBase, CrimeIncidentRead
│   ├── crud.py           # Database query helpers
│   ├── database.py       # SQLAlchemy engine and session factory
│   ├── data_loader.py    # Reads crime_data.csv and returns incident dicts
│   └── requirements.txt  # Python dependencies
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── CrimeMap.jsx        # Leaflet map — markers, highlight, flyTo controller
│       │   ├── CrimeFilters.jsx    # Category, severity, from-date, to-date filters + reset
│       │   ├── CitySearch.jsx      # Search input with live result count badge
│       │   ├── SearchResults.jsx   # Clickable results list with severity dots and city labels
│       │   ├── DashboardCards.jsx  # Summary stat cards (total, high-severity, top category)
│       │   └── PageShell.jsx       # Nav bar and layout wrapper
│       ├── pages/
│       │   ├── LandingPage.jsx     # Hero / entry screen
│       │   └── IndiaMapPage.jsx    # Main dashboard — state, filtering logic, layout
│       ├── utils/
│       │   └── crimeUtils.js       # API_BASE_URL, SEVERITY_COLORS, CITY_COORDINATES, helpers
│       ├── App.jsx                 # React Router route config
│       └── main.jsx                # React DOM entry point
│
├── data/
│   └── crime_data.csv    # 50 sample incidents across 10 Indian cities (Jan–Dec 2024)
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATASET.md
│   ├── INSTALLATION.md
│   └── CONTRIBUTING.md
│
└── README.md
```

---

## Architecture

```
Browser  (React + Vite — localhost:5173)
    │
    │  GET /incidents?category=&severity=&date_from=&date_to=
    │
FastAPI  (localhost:8000)
    │
    ├── data_loader.py  →  reads crime_data.csv
    ├── Python-level filtering  (category / severity / date range)
    └── Pydantic validation  →  JSON response
```

All state lives in `IndiaMapPage`. `filteredIncidents` is derived via `useMemo` — no global store needed at this scale.

Full breakdown: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## API Reference

Base URL: `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

### `GET /incidents`

Returns all incidents. All parameters are optional and combine with AND logic.

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by crime category (case-insensitive) |
| `severity` | string | `high`, `medium`, or `low` |
| `date_from` | date | Inclusive start date — `YYYY-MM-DD` |
| `date_to` | date | Inclusive end date — `YYYY-MM-DD` |

```bash
# All incidents
curl http://localhost:8000/incidents

# High-severity robberies in Q1 2024
curl "http://localhost:8000/incidents?category=Robbery&severity=high&date_from=2024-01-01&date_to=2024-03-31"
```

Full reference: [docs/API.md](docs/API.md)

---

## Dataset

50 fictional incidents across 10 Indian cities — Mumbai, Delhi, Bengaluru, Kolkata, Hyderabad, Chennai, Pune, Jaipur, Ahmedabad, and Surat.  
5 categories: `Robbery`, `Theft`, `Assault`, `Burglary`, `Vandalism`  
3 severity levels: `high`, `medium`, `low`  
Date range: January 2024 – December 2024

Schema reference: [docs/DATASET.md](docs/DATASET.md)

---

## Installation

**Prerequisites:** Python 3.11+, Node.js 18+, npm 9+

### 1. Clone

```bash
git clone https://github.com/u-harshitha007/DarkMap.git
cd DarkMap
```

### 2. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

API running at `http://localhost:8000`

### 3. Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

App running at `http://localhost:5173`

For platform-specific troubleshooting: [docs/INSTALLATION.md](docs/INSTALLATION.md)

---

## Usage

1. Start the backend (`uvicorn main:app --reload` inside `backend/`)
2. Start the frontend (`npm run dev` inside `frontend/`)
3. Open `http://localhost:5173`
4. Go to **India Map** from the landing page
5. Use the **search bar** to find incidents by city, title, or category — the map auto-pans to the first match
6. Click any row in the results list to jump directly to that incident on the map
7. Use the filter panel to narrow by category, severity, or date range
8. The map markers and dashboard cards update instantly with every filter change
9. Hit **Reset Filters** to clear everything

---

## Roadmap

| Status | Item |
|---|---|
| ✅ Done | Interactive Leaflet map with severity markers |
| ✅ Done | Category and severity filtering |
| ✅ Done | Dashboard summary cards |
| ✅ Done | Date-range filtering (API + UI) |
| ✅ Done | 50-incident dataset across Indian cities |
| ✅ Done | City search with map auto-pan, marker highlight, and results list |
| 🔲 Planned | Heatmap layer (Leaflet.heat) |
| 🔲 Planned | Paginate `/incidents` for large datasets |
| 🔲 Planned | User authentication for admin access |
| 🔲 Planned | Export filtered results to CSV |
| 🔲 Planned | Docker Compose for one-command setup |
| 🔲 Planned | Unit tests for API routes and React components |

---

 
 
