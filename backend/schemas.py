from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CrimeIncidentBase(BaseModel):
    title: str
    category: str
    latitude: float
    longitude: float
    severity: str
    incident_date: datetime


class CrimeIncidentCreate(CrimeIncidentBase):
    pass


class CrimeIncidentRead(CrimeIncidentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
