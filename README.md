# DarkMap

## Crime Intelligence and Geospatial Analytics Platform

DarkMap is a full-stack crime intelligence platform that visualizes crime incidents across India using interactive maps and analytics dashboards. The platform enables users to explore crime patterns, identify hotspots, analyze trends, and gain location-based insights through an intuitive web interface.

---

## Project Overview

DarkMap transforms raw crime datasets into meaningful visual intelligence by combining geospatial mapping, data analytics, and interactive filtering.

The system provides:

* Interactive crime visualization on an India map
* Crime severity analysis
* Category-based filtering
* Crime statistics dashboard
* Hotspot identification
* Data-driven insights

---

## Features

### Interactive Crime Map

* India-centered map visualization
* Location-based crime markers
* Interactive popups with incident details
* Severity-based color coding

### Analytics Dashboard

* Total incident count
* High severity crime count
* Most common crime category
* Crime distribution overview

### Filtering System

Users can filter incidents by:

* Crime Category
* Severity Level

Filters update both map and dashboard statistics dynamically.

### Responsive User Interface

* Dark theme design
* Mobile-friendly layout
* Modern dashboard interface
* Consistent user experience across devices

---
 
 
## Project Structure

```text
DarkMap/
│
├── backend/
│   ├── main.py
│   ├── data_loader.py
│   └── crime_data.csv
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PageShell.jsx
│   │   │   ├── DashboardCards.jsx
│   │   │   ├── CrimeFilters.jsx
│   │   │   └── CrimeMap.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── IndiaMapPage.jsx
│   │   │
│   │   └── utils/
│   │       └── crimeUtils.js
│
└── README.md
```

---

## API Endpoints

### Get All Incidents

```http
GET /incidents
```

### Filter by Category

```http
GET /incidents?category=Theft
```

### Filter by Severity

```http
GET /incidents?severity=High
```

---

## Installation and Setup

### Backend

```bash
cd backend

pip install fastapi uvicorn pandas

uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Current Implementation

### Phase 1

* Project setup
* Landing page
* FastAPI backend
* Crime dataset integration

### Phase 2

* Interactive India map
* Crime visualization markers
* Severity-based color coding
* Crime filters
* Dashboard analytics
* Statistics cards

---

## futher exploration

### Phase 3 – Crime Intelligence Dashboard

* Advanced analytics page
* Crime trend visualization
* Category distribution charts
* Severity distribution charts
* State-wise crime statistics
* Crime hotspot rankings

### Phase 4 – Predictive Analytics

* Machine learning integration
* Crime trend forecasting
* Risk prediction models
* Pattern detection

### Phase 5 – Advanced Geospatial Intelligence

* Heatmap visualization
* District-level analytics
* Location clustering
* Region comparison tools

### Phase 6 – Real-Time Intelligence Platform

* Live crime feeds
* Real-time alerts
* User authentication
* Incident reporting system
* Administrative dashboard

---
