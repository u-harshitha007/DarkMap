# DarkMap

A full-stack web application for visualising geo-tagged crime incidents across Indian cities on an interactive map, with server-side data management and client-side filtering by category and severity.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Dataset Information](#dataset-information)
- [Installation](#installation)
- [Usage](#usage)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Project Overview

DarkMap is a full-stack web application that transforms structured crime incident data into an interactive geospatial interface. The application pairs a FastAPI REST backend — which manages data persistence and exposes a filterable API — with a React frontend that renders incidents as severity-coded markers on a Leaflet map.

The project demonstrates practical integration of a Python API layer with a modern JavaScript frontend, REST-based query filtering, and component-driven UI design.

---

## Problem Statement

Raw crime data is typically available in tabular formats that are difficult to interpret spatially. Analysts and policymakers benefit from visual tools that allow them to explore incident distribution, identify geographic patterns, and filter by relevant attributes such as crime type or severity. DarkMap addresses this by providing a lightweight, browser-based interface for geospatial crime exploration.

---

## Objectives

- Provide a clear geospatial view of crime incidents across major Indian cities.
- Allow users to filter incidents by crime category and severity level in real time.
- Expose incident data through a well-defined REST API.
- Maintain a clean separation between the data layer, API layer, and presentation layer.
- Serve as a reproducible reference implementation for full-stack geospatial applications.

---

## Key Features

- **Interactive Map** — Leaflet-based map centred on India, supporting pan and zoom.
- **Severity-coded Markers** — Incidents are colour-coded by severity: high (red), medium (amber), and low (green).
- **Real-time Filtering** — Dropdowns filter visible markers by crime category and severity without a page reload.
- **Dashboard Summary** — Cards display total incident count, high-severity count, and the most frequent crime category for the active filter state.
- **REST API with Auto-generated Docs** — FastAPI provides a `/docs` endpoint with interactive Swagger UI out of the box.
- **Dark UI Theme** — Interface uses a dark colour scheme suitable for map-centric applications.

---

## System Architecture

The application follows a standard client-server architecture. The React frontend communicates with the FastAPI backend over HTTP. All data resides in a SQLite database seeded from a CSV file at startup.

```
Browser (React + Vite — localhost:5173)
    |
    |   HTTP GET /incidents?category=...&severity=...
    |
FastAPI Backend (localhost:8000)
    |
    |-- main.py         (route definitions, CORS middleware)
    |-- data_loader.py  (reads crime_data.csv, returns incident dicts)
    |-- models.py       (SQLAlchemy ORM model: CrimeIncident)
    |-- schemas.py      (Pydantic schemas: CrimeIncidentBase, CrimeIncidentRead)
    |-- crud.py         (database query helpers)
    |-- database.py     (SQLAlchemy engine and session factory)
    |
SQLite Database (darkmap.db)
```

**Request lifecycle:**

1. The frontend sends a `GET /incidents` request with optional `category` and `severity` query parameters.
2. FastAPI reads the CSV via `data_loader.py`, applies Python-level filtering, and returns a JSON array validated against the `CrimeIncidentRead` Pydantic schema.
3. The frontend stores the response in component state and derives filtered views using `useMemo`, passing the result to the map and dashboard components.

For a detailed breakdown, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Technology Stack

### Backend

| Technology  | Version  | Purpose                        |
|-------------|----------|--------------------------------|
| Python      | 3.11+    | Runtime                        |
| FastAPI     | 0.115.6  | REST API framework             |
| Uvicorn     | 0.34.0   | ASGI server                    |
| SQLAlchemy  | 2.0.36   | ORM and database toolkit       |
| Pydantic    | 2.10.3   | Data validation and serialisation |
| SQLite      | Built-in | Embedded relational database   |

### Frontend

| Technology    | Version | Purpose                     |
|---------------|---------|-----------------------------|
| React         | 19.x    | UI component framework      |
| Vite          | 8.x     | Build tool and dev server   |
| React-Leaflet | 5.x     | React wrapper for Leaflet   |
| Leaflet.js    | 1.9.x   | Core mapping library        |
| TailwindCSS   | 4.x     | Utility-first CSS framework |
| React Router  | 7.x     | Client-side routing         |

---

## Project Structure

```
DarkMap/
├── backend/
│   ├── main.py               # Application entry point and route definitions
│   ├── models.py             # SQLAlchemy ORM model (CrimeIncident)
│   ├── schemas.py            # Pydantic request/response schemas
│   ├── crud.py               # Database query helpers
│   ├── database.py           # Engine and session factory
│   ├── data_loader.py        # CSV-to-dict loader used by the API
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CrimeMap.jsx          # Leaflet map with severity markers
│   │   │   ├── CrimeFilters.jsx      # Category and severity filter dropdowns
│   │   │   ├── DashboardCards.jsx    # Summary statistics cards
│   │   │   └── PageShell.jsx         # Navigation bar and layout container
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Application entry screen
│   │   │   └── IndiaMapPage.jsx      # Primary map dashboard
│   │   ├── utils/
│   │   │   └── crimeUtils.js         # API base URL, severity colour map, helpers
│   │   ├── App.jsx                   # Route configuration
│   │   └── main.jsx                  # React DOM entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── data/
│   └── crime_data.csv        # Seed dataset (10 incidents across Indian cities)
│
├── docs/
│   ├── ARCHITECTURE.md       # Detailed architecture documentation
│   ├── DATASET.md            # Dataset schema and extension guide
│   ├── API.md                # API endpoint reference
│   ├── INSTALLATION.md       # Platform-specific installation guide
│   └── CONTRIBUTING.md       # Contribution workflow and guidelines
│
├── assets/
│   └── screenshots/          # UI screenshots
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Dataset Information

The application is seeded from `data/crime_data.csv`. The file contains 10 sample incidents distributed across major Indian cities.

### Schema

| Column          | Type     | Description                                              |
|-----------------|----------|----------------------------------------------------------|
| `title`         | string   | Descriptive name of the incident                         |
| `category`      | string   | Crime type: Robbery, Theft, Assault, Burglary, Vandalism |
| `latitude`      | float    | WGS-84 decimal latitude                                  |
| `longitude`     | float    | WGS-84 decimal longitude                                 |
| `severity`      | string   | Severity level: `high`, `medium`, or `low`               |
| `incident_date` | datetime | Timestamp in ISO 8601 format (YYYY-MM-DD HH:MM:SS)       |

### Sample Data

```csv
title,category,latitude,longitude,severity,incident_date
Street Robbery,Robbery,19.0760,72.8777,high,2024-01-15 22:30:00
Vehicle Theft,Theft,28.7041,77.1025,medium,2024-02-03 03:15:00
Assault Report,Assault,12.9716,77.5946,high,2024-03-10 19:45:00
```

Cities represented: Mumbai, Delhi, Bengaluru, Kolkata, Hyderabad, Chennai, Pune, Jaipur, Ahmedabad, Surat.

For the full dataset reference, see [docs/DATASET.md](docs/DATASET.md).

---

## Installation

### Prerequisites

| Requirement | Minimum Version |
|-------------|-----------------|
| Python      | 3.11            |
| Node.js     | 18 LTS          |
| npm         | 9               |
| Git         | Any             |

### 1. Clone the Repository

```bash
git clone https://github.com/u-harshitha007/DarkMap.git
cd DarkMap
```

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.  
Interactive documentation (Swagger UI): `http://localhost:8000/docs`.

### 3. Frontend Setup

Open a separate terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

For a platform-specific guide including troubleshooting, see [docs/INSTALLATION.md](docs/INSTALLATION.md).

---

## Usage

1. Start the backend server (`uvicorn main:app --reload` from `backend/`).
2. Start the frontend dev server (`npm run dev` from `frontend/`).
3. Open `http://localhost:5173` in a browser.
4. Navigate from the landing page to the India Crime Map dashboard.
5. Use the Category and Severity dropdowns to filter the visible incidents.
6. The dashboard cards and map update in real time based on the active filters.

### API Reference

```
GET /                                       # Health check
GET /incidents                              # All incidents
GET /incidents?category=Robbery             # Filter by category (case-insensitive)
GET /incidents?severity=high                # Filter by severity
GET /incidents?category=Theft&severity=low  # Combined filter
```

Full endpoint documentation: [docs/API.md](docs/API.md).

---

## Future Roadmap

| Priority | Item                                                      |
|----------|-----------------------------------------------------------|
| High     | Integrate a real open-data crime dataset                  |
| High     | Add user authentication for administrative access         |
| Medium   | Implement a heatmap layer using Leaflet.heat               |
| Medium   | Add date-range filtering to the API and UI                |
| Medium   | Paginate the `/incidents` endpoint for large datasets     |
| Low      | Export filtered results to CSV or PDF                     |
| Low      | Add city-level geocoding and search                       |
| Low      | Write unit tests for API routes and React components      |
| Low      | Add a Docker Compose configuration for one-command setup  |

---

## Contributing

Contributions are welcome. Please read [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the full workflow. In brief:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m "feat: description"`
4. Push to your fork and open a Pull Request against `main`.

---

 
