import csv
from datetime import datetime
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "crime_data.csv"


def load_crime_incidents():
    incidents = []

    with DATA_PATH.open(encoding="utf-8", newline="") as csv_file:
        reader = csv.DictReader(csv_file)
        for index, row in enumerate(reader, start=1):
            incidents.append(
                {
                    "id": index,
                    "title": row["title"],
                    "category": row["category"],
                    "latitude": float(row["latitude"]),
                    "longitude": float(row["longitude"]),
                    "severity": row["severity"].lower(),
                    "incident_date": datetime.fromisoformat(row["incident_date"]),
                }
            )

    return incidents
