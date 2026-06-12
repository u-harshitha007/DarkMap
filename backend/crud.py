from sqlalchemy.orm import Session

import models
import schemas


def get_crime_incident(db: Session, incident_id: int):
    return (
        db.query(models.CrimeIncident)
        .filter(models.CrimeIncident.id == incident_id)
        .first()
    )


def get_crime_incidents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CrimeIncident).offset(skip).limit(limit).all()


def create_crime_incident(db: Session, incident: schemas.CrimeIncidentCreate):
    db_incident = models.CrimeIncident(**incident.model_dump())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident
