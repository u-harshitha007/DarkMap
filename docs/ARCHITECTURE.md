# DarkMap — Architecture

This document describes the internal architecture of the DarkMap application,
covering the backend API, frontend UI, data flow, and component structure.

---

## System Overview

DarkMap follows a classic **client–server** architecture with a clear separation
between the data/logic layer (FastAPI backend) and the presentation layer
(React frontend).

```
┌───────────────────────────────────────────────────────────┐
│                        Browser                            │
│                                                           │
│        React 19 + Vite  (http://localhost:5173)           │
│                                                           │
│  ┌────────────────┐      ┌──────────────────────────────┐ │
│  │  LandingPage   │      │       IndiaMapPage           │ │
│  │  (hero screen) │      │  ┌──────────────────────┐   │ │
│  └────────────────┘      │  │   DashboardCards     │   │ │
│                          │  │   CrimeFilters       │   │ │
│                          │  │   CrimeMap (Leaflet) │   │ │
│                          │  └──────────────────────┘   │ │
│                          └──────────────┬───────────────┘ │
└─────────────────────────────────────────┼─────────────────┘
                                          │
                              HTTP GET /incidents
                              (JSON response)
                                          │
┌─────────────────────────────────────────▼─────────────────┐
│              FastAPI  (http://localhost:8000)              │
│                                                           │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────────┐   │
│  │ main.py  │   │ data_loader  │   │    crud.py      │   │
│  │ (routes) │──▶│ (CSV seeder) │   │  (DB queries)   │   │
│  └──────────┘   └──────────────┘   └────────┬────────┘   │
│        │                                     │            │
│        │         ┌──────────┐                │            │
│        └────────▶│models.py │◀───────────────┘            │
│                  │schemas.py│                             │
│                  └────┬─────┘                             │
│                       │                                   │
│               ┌───────▼──────┐                            │
│               │  database.py │                            │
│               │  (SQLite)    │                            │
│               └──────────────┘                            │
└───────────────────────────────────────────────────────────┘
```

---

## Backend Architecture

### Entry Point — `main.py`

- Creates the FastAPI application instance with metadata (`title`, `description`, `version`)
- Registers CORS middleware to allow requests from `localhost:5173`
- Defines two routes:
  - `GET /` — health-check endpoint
  - `GET /incidents` — main data endpoint with optional `category` and `severity` query parameters

### Data Layer

| File | Responsibility |
|---|---|
| `database.py` | Creates the SQLAlchemy `engine` and `SessionLocal` factory; defines `Base` |
| `models.py` | Declares the `CrimeIncident` ORM model (table: `crime_incidents`) |
| `schemas.py` | Pydantic schemas for API I/O: `CrimeIncidentBase`, `CrimeIncidentCreate`, `CrimeIncidentRead` |
| `crud.py` | Database helper functions for reading incident records |
| `data_loader.py` | Reads `../data/crime_data.csv` and returns a list of incident dicts for API responses |

### Database Schema

```sql
CREATE TABLE crime_incidents (
    id            INTEGER PRIMARY KEY,
    title         TEXT    NOT NULL,
    category      TEXT    NOT NULL,
    latitude      REAL    NOT NULL,
    longitude     REAL    NOT NULL,
    severity      TEXT    NOT NULL,  -- 'high' | 'medium' | 'low'
    incident_date TEXT    NOT NULL   -- ISO 8601 datetime string
);
```

### Request Lifecycle

```
Client request → FastAPI router (main.py)
                     │
                     ▼
             load_crime_incidents()   ← reads crime_data.csv
                     │
                     ▼
             Python-level filtering   ← category / severity params
                     │
                     ▼
             Pydantic validation      ← CrimeIncidentRead schema
                     │
                     ▼
             JSON HTTP response       → React frontend
```

---

## Frontend Architecture

### Routing — `App.jsx`

Uses React Router v7 with two routes:

| Path | Component |
|---|---|
| `/` | `LandingPage` |
| `/map` | `IndiaMapPage` |

### Component Hierarchy

```
App (Router)
├── LandingPage
│   └── (hero content, navigate to /map)
│
└── IndiaMapPage
    └── PageShell (nav bar + max-width container)
        ├── DashboardCards (total, high-severity, top category)
        ├── CrimeFilters   (category dropdown, severity dropdown)
        ├── Severity Legend (colour-coded spans)
        └── CrimeMap       (React-Leaflet map + markers)
```

### State Management

All state lives in `IndiaMapPage` — no global store is used:

| State | Type | Purpose |
|---|---|---|
| `allIncidents` | `array` | Raw API response — all incidents |
| `category` | `string` | Active category filter |
| `severity` | `string` | Active severity filter |
| `loading` | `boolean` | API loading state |
| `error` | `string` | API error message |

`filteredIncidents` is derived via `useMemo` to avoid redundant recomputation.

### Utilities — `crimeUtils.js`

| Export | Type | Purpose |
|---|---|---|
| `API_BASE_URL` | constant | Backend base URL (`http://localhost:8000`) |
| `SEVERITY_COLORS` | object | Maps severity strings to hex colour codes |
| `getMostCommonCategory` | function | Returns the mode category from an incident array |

---

## Data Flow (End-to-End)

```
crime_data.csv
     │
     │  (read at request time by data_loader.py)
     ▼
FastAPI /incidents
     │
     │  (HTTP GET with optional ?category=&severity= params)
     ▼
React useEffect → fetch()
     │
     │  (JSON array of CrimeIncidentRead objects)
     ▼
allIncidents state
     │
     │  (useMemo filter by active dropdowns)
     ▼
filteredIncidents
     │
     ├──▶ DashboardCards  (stats)
     ├──▶ CrimeFilters    (unique categories list)
     └──▶ CrimeMap        (Leaflet markers)
```

---

## Key Design Decisions

1. **No global state library** — The dataset is small enough that component-level
   state with memoisation is sufficient and keeps the codebase simple.

2. **CSV as source of truth** — The app reads directly from CSV at request time,
   making it trivial to update data without database migrations.

3. **Client-side filtering** — All incidents are fetched once and filtering is
   done in the browser, giving instant filter responses without extra API round-trips.

4. **SQLite** — Chosen for zero-config local development. Can be swapped for
   PostgreSQL with a single `DATABASE_URL` change in `database.py`.

---

*Back to [README](../README.md)*
