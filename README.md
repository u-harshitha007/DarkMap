# DarkMap

## Crime Intelligence and Geospatial Analytics Platform

DarkMap is a full-stack web application that helps visualize and analyze crime incidents across India using interactive maps and analytics. The goal of the project is to transform raw crime data into meaningful insights through geospatial visualization, filtering, and dashboards.

It allows users to explore crime patterns, identify hotspots, and analyze incidents based on crime category and severity.

---

## Features

### Interactive Crime Map

* Interactive India map
* Location-based crime markers
* Popups displaying incident details
* Severity-based marker colors

### Analytics Dashboard

* Total number of incidents
* High severity crime count
* Most common crime category
* Crime distribution overview

### Smart Filtering

Users can filter crime data by:

* Crime Category
* Severity Level

The dashboard and map update instantly based on the selected filters.

### Responsive Interface

* Dark themed UI
* Mobile responsive design
* Interactive dashboard
* Clean and intuitive user experience

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Leaflet / React Leaflet
* CSS

### Backend

* FastAPI
* Python
* Pandas

### Dataset

* CSV-based crime dataset

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
│   │
│   │── components/
│   │   ├── DashboardCards.jsx
│   │   ├── CrimeFilters.jsx
│   │   ├── CrimeMap.jsx
│   │   └── PageShell.jsx
│   │
│   │── pages/
│   │   ├── LandingPage.jsx
│   │   └── IndiaMapPage.jsx
│   │
│   │── utils/
│   │   └── crimeUtils.js
│
└── README.md
```

---

## API Endpoints

### Get all crime incidents

```http
GET /incidents
```

### Filter by crime category

```http
GET /incidents?category=Theft
```

### Filter by severity

```http
GET /incidents?severity=High
```

---

## Getting Started

### Backend

```bash
cd backend

pip install fastapi uvicorn pandas

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Current Features

* Interactive crime visualization
* FastAPI REST API
* Dynamic crime filtering
* Dashboard statistics
* Severity-based visualization
* Category-wise filtering
* India-focused map interface

---

## Future Improvements

* Crime trend analytics
* Interactive charts
* State-wise comparison
* District-level insights
* Heatmap visualization
* Crime hotspot detection
* Machine learning based crime prediction
* User authentication
* Incident reporting portal
* Admin dashboard
* Real-time crime data integration

---

## Learning Outcomes

This project helped me understand:

* Building REST APIs using FastAPI
* Working with real-world datasets using Pandas
* Integrating frontend and backend
* Interactive map visualization
* Dashboard development
* Data filtering and analytics
* Full-stack application development

---

## Future Vision

DarkMap is designed as the foundation for a larger crime intelligence platform. Future versions will include predictive analytics, real-time crime monitoring, geospatial intelligence, and AI-powered insights to support data-driven decision making.

