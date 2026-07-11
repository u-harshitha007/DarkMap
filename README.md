<div align="center">

# 🗺️ DarkMap

### *Visualizing Crime. Revealing Patterns.*

A full-stack crime-intelligence web application that plots geo-tagged incidents across
Indian cities on an interactive map — with real-time filtering by category and severity.

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Dataset Information](#-dataset-information)
- [Installation Guide](#-installation-guide)
- [Usage](#-usage)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 About

**DarkMap** is a portfolio-grade, full-stack web application that visualises crime
incidents across major Indian cities. It pairs a **FastAPI** REST backend — which
serves filtered incident data from a SQLite database — with a **React + React-Leaflet**
frontend that renders colour-coded markers on an interactive map.

The project demonstrates:

- Clean separation of concerns between API layer and UI layer
- RESTful query-parameter filtering
- Dynamic map rendering with clustered severity indicators
- Modern React patterns (hooks, memoisation, component composition)
- Production-ready project layout with complete documentation

---

## ✨ Features

| Feature | Details |
|---|---|
| 🗺️ **Interactive India Map** | Powered by Leaflet; pan, zoom, and click markers |
| 🔴 **Severity Colour Coding** | High (red), Medium (amber), Low (green) markers |
| 🔎 **Real-time Filtering** | Filter by crime category and/or severity via dropdowns |
| 📊 **Dashboard Cards** | At-a-glance stats: total incidents, high-severity count, most common category |
| ⚡ **Fast API** | FastAPI auto-generates interactive docs at `/docs` |
| 📱 **Responsive Layout** | Works across desktop and tablet viewports |
| 🌑 **Dark UI Theme** | Zinc-based dark colour palette — easy on the eyes |

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Role |
|---|---|---|
| Python | 3.11+ | Runtime |
| FastAPI | 0.115.6 | REST API framework |
| Uvicorn | 0.34.0 | ASGI server |
| SQLAlchemy | 2.0.36 | ORM / database toolkit |
| Pydantic | 2.10.3 | Data validation & serialisation |
| SQLite | Built-in | Lightweight database |

### Frontend

| Technology | Version | Role |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| React-Leaflet | 5.x | Map component wrapper |
| Leaflet.js | 1.9.x | Core mapping library |
| TailwindCSS | 4.x | Utility-first styling |
| React Router | 7.x | Client-side routing |

---

## 🏗 Architecture

```
┌───────────────────────────────────────────────────────┐
│                      Browser                          │
│                                                       │
│   React + Vite (localhost:5173)                       │
│   ┌──────────────┐  ┌───────────┐  ┌───────────────┐ │
│   │ LandingPage  │  │IndiaMap   │  │ CrimeFilters  │ │
│   │              │  │Page       │  │ DashboardCards│ │
│   └──────────────┘  └─────┬─────┘  └───────────────┘ │
│                           │ fetch /incidents           │
└───────────────────────────┼───────────────────────────┘
                            │ HTTP (JSON)
┌───────────────────────────▼───────────────────────────┐
│              FastAPI Backend (localhost:8000)          │
│                                                       │
│   GET /           → health check                      │
│   GET /incidents  → filtered crime incidents          │
│                                                       │
│   ┌────────────┐   ┌──────────────┐  ┌─────────────┐ │
│   │  main.py   │   │  data_loader │  │  crud.py    │ │
│   │  (routes)  │──▶│  (CSV→DB)    │  │  (queries)  │ │
│   └────────────┘   └──────────────┘  └──────┬──────┘ │
│                                             │        │
│                                    ┌────────▼──────┐ │
│                                    │  SQLite DB    │ │
│                                    │ darkmap.db    │ │
│                                    └───────────────┘ │
└───────────────────────────────────────────────────────┘
```

For a detailed architecture document see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 📂 Folder Structure

```
DarkMap/
├── backend/                  # FastAPI application
│   ├── main.py               # App entry point & route definitions
│   ├── models.py             # SQLAlchemy ORM models
│   ├── schemas.py            # Pydantic request/response schemas
│   ├── crud.py               # Database query helpers
│   ├── database.py           # DB engine & session factory
│   ├── data_loader.py        # CSV → database seeding
│   ├── requirements.txt      # Python dependencies
│   └── darkmap.db            # SQLite database (git-ignored)
│
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── CrimeMap.jsx         # Leaflet map wrapper
│   │   │   ├── CrimeFilters.jsx     # Category / severity dropdowns
│   │   │   ├── DashboardCards.jsx   # Stat summary cards
│   │   │   └── PageShell.jsx        # Layout shell (nav + container)
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Hero / welcome screen
│   │   │   └── IndiaMapPage.jsx     # Main map dashboard page
│   │   ├── utils/
│   │   │   └── crimeUtils.js        # Shared constants & helpers
│   │   ├── App.jsx           # Router configuration
│   │   └── main.jsx          # React DOM entry point
│   ├── public/               # Static assets
│   ├── index.html            # HTML shell
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Node dependencies
│
├── data/
│   └── crime_data.csv        # Seed dataset (10 Indian city incidents)
│
├── docs/                     # Extended documentation
│   ├── ARCHITECTURE.md       # Deep-dive architecture guide
│   ├── DATASET.md            # Dataset schema & extension guide
│   ├── API.md                # API endpoint reference
│   ├── INSTALLATION.md       # Detailed installation guide
│   └── CONTRIBUTING.md       # Contribution guidelines
│
├── assets/
│   └── screenshots/          # UI screenshots (add yours here)
│
├── .gitignore
├── LICENSE
└── README.md                 # ← You are here
```

---

## 📊 Dataset Information

The seed dataset lives at [`data/crime_data.csv`](data/crime_data.csv).

### Schema

| Column | Type | Description |
|---|---|---|
| `title` | string | Human-readable incident name |
| `category` | string | Crime type (Robbery, Theft, Assault, Burglary, Vandalism) |
| `latitude` | float | WGS-84 latitude |
| `longitude` | float | WGS-84 longitude |
| `severity` | string | `high` / `medium` / `low` |
| `incident_date` | datetime | ISO 8601 timestamp of the incident |

### Cities Covered (Sample Data)

Mumbai, Delhi, Bengaluru, Kolkata, Hyderabad, Chennai, Pune, Jaipur, Ahmedabad, Surat

### Sample Rows

```csv
title,category,latitude,longitude,severity,incident_date
Street Robbery,Robbery,19.0760,72.8777,high,2024-01-15 22:30:00
Vehicle Theft,Theft,28.7041,77.1025,medium,2024-02-03 03:15:00
Assault Report,Assault,12.9716,77.5946,high,2024-03-10 19:45:00
```

For full dataset documentation see [`docs/DATASET.md`](docs/DATASET.md).

---

## 🚀 Installation Guide

### Prerequisites

| Requirement | Version |
|---|---|
| Python | 3.11 or higher |
| Node.js | 18 or higher |
| npm | 9 or higher |
| Git | Any recent version |

### 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/DarkMap.git
cd DarkMap
```

### 2 — Set Up the Backend

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

The API will be available at **http://localhost:8000**.
Interactive Swagger docs: **http://localhost:8000/docs**.

### 3 — Set Up the Frontend

Open a **new terminal** from the project root:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the dev server
npm run dev
```

The React app will be available at **http://localhost:5173**.

For a more detailed guide (including troubleshooting) see [`docs/INSTALLATION.md`](docs/INSTALLATION.md).

---

## 📖 Usage

1. **Start the backend** (`uvicorn main:app --reload` from `backend/`)
2. **Start the frontend** (`npm run dev` from `frontend/`)
3. Open **http://localhost:5173** in your browser
4. The landing page displays the project hero screen — click **"View Map"** to enter the dashboard
5. On the **India Crime Map** page:
   - Use the **Category** dropdown to filter by crime type
   - Use the **Severity** dropdown to filter by severity level
   - Click any **coloured marker** on the map to see incident details
   - Watch the **Dashboard Cards** update in real time as you filter

### API Quick Reference

```bash
# All incidents
GET http://localhost:8000/incidents

# Filter by category
GET http://localhost:8000/incidents?category=Robbery

# Filter by severity
GET http://localhost:8000/incidents?severity=high

# Combine filters
GET http://localhost:8000/incidents?category=Theft&severity=medium
```

Full API reference: [`docs/API.md`](docs/API.md)

---

## 🔮 Future Roadmap

| Priority | Feature |
|---|---|
| 🟥 High | Replace sample CSV with a real open-data crime dataset |
| 🟥 High | Add user authentication for admin-level incident management |
| 🟧 Medium | Implement heatmap layer (Leaflet.heat) alongside marker view |
| 🟧 Medium | Add date-range filtering (start date / end date) |
| 🟧 Medium | Paginate `/incidents` endpoint for large datasets |
| 🟩 Low | Export filtered results as CSV / PDF |
| 🟩 Low | Add city-level search / geocoding |
| 🟩 Low | Mobile-responsive layout improvements |
| 🟩 Low | Unit tests for FastAPI routes and React components |
| 🟩 Low | Docker Compose setup for one-command launch |

---

## 🤝 Contributing

Contributions are welcome! Please read [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) for
the full guidelines. The short version:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your fork: `git push origin feature/your-feature-name`
5. **Open** a Pull Request against `main`

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Harshitha](https://github.com/harshitha)

*DarkMap — Visualizing Crime. Revealing Patterns.*

</div>
