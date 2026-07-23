from datetime import date
from typing import Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

import models
from data_loader import load_crime_incidents
from database import Base, engine
from schemas import CrimeIncidentRead, PaginatedIncidentsRead

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DarkMap",
    description="Visualizing Crime. Revealing Patterns.",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"project": "DarkMap", "status": "running"}


@app.get("/incidents", response_model=PaginatedIncidentsRead)
def get_incidents(
    category: Optional[str] = Query(default=None),
    severity: Optional[str] = Query(default=None),
    date_from: Optional[date] = Query(
        default=None,
        description="Inclusive start date (YYYY-MM-DD).",
    ),
    date_to: Optional[date] = Query(
        default=None,
        description="Inclusive end date (YYYY-MM-DD).",
    ),
    skip: int = Query(
        default=0,
        ge=0,
        description="Number of incidents to skip (offset).",
    ),
    limit: int = Query(
        default=0,
        ge=0,
        description="Maximum incidents to return. 0 means return all.",
    ),
):
    incidents = load_crime_incidents()

    if category:
        incidents = [
            i for i in incidents if i["category"].lower() == category.lower()
        ]

    if severity:
        incidents = [
            i for i in incidents if i["severity"] == severity.lower()
        ]

    if date_from:
        incidents = [
            i for i in incidents if i["incident_date"].date() >= date_from
        ]

    if date_to:
        incidents = [
            i for i in incidents if i["incident_date"].date() <= date_to
        ]

    total = len(incidents)

    # Apply pagination only when limit > 0
    if skip:
        incidents = incidents[skip:]
    if limit:
        incidents = incidents[:limit]

    return {"total": total, "skip": skip, "limit": limit, "incidents": incidents}
