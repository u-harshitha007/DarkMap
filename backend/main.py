from typing import Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

import models
from data_loader import load_crime_incidents
from database import Base, engine
from schemas import CrimeIncidentRead

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DarkMap",
    description="Visualizing Crime. Revealing Patterns.",
    version="0.1.0",
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


@app.get("/incidents", response_model=list[CrimeIncidentRead])
def get_incidents(
    category: Optional[str] = Query(default=None),
    severity: Optional[str] = Query(default=None),
):
    incidents = load_crime_incidents()

    if category:
        incidents = [
            incident
            for incident in incidents
            if incident["category"].lower() == category.lower()
        ]

    if severity:
        incidents = [
            incident
            for incident in incidents
            if incident["severity"] == severity.lower()
        ]

    return incidents
