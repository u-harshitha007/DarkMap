# DarkMap — Dataset Documentation

This document describes the crime incident dataset used by DarkMap,
covering the schema, sample data, geographic coverage, and how to
extend or replace the dataset.

---

## Overview

DarkMap ships with a lightweight **sample dataset** of 10 crime incidents
spread across major Indian cities. This dataset is intentionally small —
it exists to demonstrate the application's full capabilities without
requiring external data sources.

The data lives in a single CSV file:

```
data/crime_data.csv
```

At startup (or on the first request), the `data_loader.py` module reads
this file and makes it available to the API.

---

## Schema Reference

| Column | Data Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Human-readable name for the incident (e.g. "Street Robbery") |
| `category` | `string` | ✅ | Crime type. Allowed values: `Robbery`, `Theft`, `Assault`, `Burglary`, `Vandalism` |
| `latitude` | `float` | ✅ | WGS-84 decimal latitude (e.g. `19.0760`) |
| `longitude` | `float` | ✅ | WGS-84 decimal longitude (e.g. `72.8777`) |
| `severity` | `string` | ✅ | Impact level. Allowed values: `high`, `medium`, `low` (lowercase) |
| `incident_date` | `datetime` | ✅ | ISO 8601 format: `YYYY-MM-DD HH:MM:SS` |

### Severity Values

| Value | Map Marker Colour | Meaning |
|---|---|---|
| `high` | 🔴 Red | Serious crime — violence, significant theft |
| `medium` | 🟡 Amber | Moderate crime — property damage, non-violent assault |
| `low` | 🟢 Green | Minor crime — vandalism, petty theft |

### Crime Categories

| Category | Description |
|---|---|
| `Robbery` | Theft involving force or threat |
| `Theft` | Non-violent property theft (vehicle, pickpocketing) |
| `Assault` | Physical or verbal attack on a person |
| `Burglary` | Breaking-and-entering into a property |
| `Vandalism` | Deliberate property damage (graffiti, etc.) |

---

## Full Sample Dataset

```csv
title,category,latitude,longitude,severity,incident_date
Street Robbery,Robbery,19.0760,72.8777,high,2024-01-15 22:30:00
Vehicle Theft,Theft,28.7041,77.1025,medium,2024-02-03 03:15:00
Assault Report,Assault,12.9716,77.5946,high,2024-03-10 19:45:00
Burglary,Burglary,22.5726,88.3639,medium,2024-04-22 01:20:00
Vandalism,Vandalism,17.3850,78.4867,low,2024-05-08 14:00:00
Chain Snatching,Robbery,13.0827,80.2707,high,2024-06-12 18:10:00
Pickpocketing,Theft,18.5204,73.8567,low,2024-07-04 11:45:00
Domestic Dispute,Assault,26.9124,75.7873,medium,2024-08-19 21:30:00
Warehouse Break-in,Burglary,23.0225,72.5714,high,2024-09-02 02:05:00
Graffiti Incident,Vandalism,21.1702,72.8311,low,2024-10-25 16:20:00
```

---

## Geographic Coverage

The sample data covers 10 major Indian cities:

| City | State | Coordinates |
|---|---|---|
| Mumbai | Maharashtra | 19.0760, 72.8777 |
| Delhi | Delhi NCR | 28.7041, 77.1025 |
| Bengaluru | Karnataka | 12.9716, 77.5946 |
| Kolkata | West Bengal | 22.5726, 88.3639 |
| Hyderabad | Telangana | 17.3850, 78.4867 |
| Chennai | Tamil Nadu | 13.0827, 80.2707 |
| Pune | Maharashtra | 18.5204, 73.8567 |
| Jaipur | Rajasthan | 26.9124, 75.7873 |
| Ahmedabad | Gujarat | 23.0225, 72.5714 |
| Surat | Gujarat | 21.1702, 72.8311 |

---

## Extending the Dataset

### Adding Rows to the CSV

Simply append rows to `data/crime_data.csv` following the schema above.
The application reads the file at request time — no restart needed.

```csv
ATM Fraud,Theft,28.6139,77.2090,medium,2024-11-01 09:00:00
```

### Replacing with a Real Dataset

1. Obtain a dataset with columns matching the schema above
2. Rename / transform columns to match: `title`, `category`, `latitude`, `longitude`, `severity`, `incident_date`
3. Ensure `severity` values are lowercase (`high`, `medium`, `low`)
4. Replace `data/crime_data.csv` with your file
5. Restart the backend (or rely on the automatic reload with `--reload`)

### Using a Database Instead of CSV

The SQLAlchemy models in `models.py` are already defined. To switch to
database-backed storage:

1. Implement proper CRUD functions in `crud.py`
2. Update `data_loader.py` to query the database via a session
3. Seed the database using `data_loader.py` at startup

For PostgreSQL, update `DATABASE_URL` in `database.py`:

```python
DATABASE_URL = "postgresql://user:password@localhost/darkmap"
```

---

## Data Privacy

> [!IMPORTANT]
> The sample data in this repository is **entirely fictional**.
> All incident titles, dates, and coordinates are fabricated for
> demonstration purposes only. Do not use this data for any
> real-world analysis.

---

*Back to [README](../README.md)*
