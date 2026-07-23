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


class PaginatedIncidentsRead(BaseModel):
    """Paginated wrapper returned by GET /incidents."""
    total: int           # total matching incidents (before pagination)
    skip: int            # offset applied
    limit: int           # page size applied (0 = all)
    incidents: list[CrimeIncidentRead]
