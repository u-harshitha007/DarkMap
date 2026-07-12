# DarkMap — API Reference

This document describes all REST API endpoints exposed by the DarkMap FastAPI backend.

- **Base URL (development):** `http://localhost:8000`
- **Interactive docs (Swagger UI):** `http://localhost:8000/docs`
- **Alternative docs (ReDoc):** `http://localhost:8000/redoc`
- **API version:** `0.1.0`

---

## Authentication

The current version of the API requires **no authentication**.  
All endpoints are publicly accessible.

---

## Quick Reference

| Method | Endpoint     | Purpose                                 |
| ------ | ------------ | --------------------------------------- |
| GET    | `/`          | Health check — returns server status    |
| GET    | `/incidents` | Retrieve crime incidents, with optional filters |

---

## Endpoints

---

### `GET /`

**Purpose:** Health-check endpoint. Confirms the server is running and returns the project name.

#### Example Request

```http
GET / HTTP/1.1
Host: localhost:8000
```

#### Response `200 OK`

```json
{
  "project": "DarkMap",
  "status": "running"
}
```

---

### `GET /incidents`

**Purpose:** Returns a list of all crime incidents loaded from the dataset. Supports optional filtering by crime category and/or severity level. Both filters may be combined and are applied with **AND** logic (i.e., only incidents matching *all* supplied filters are returned).

#### Query Parameters

| Parameter  | Type     | Required | Description                                          | Example    |
| ---------- | -------- | -------- | ---------------------------------------------------- | ---------- |
| `category` | `string` | No       | Filter by crime category (case-insensitive match)    | `Robbery`  |
| `severity` | `string` | No       | Filter by severity level (`high`, `medium`, `low`)   | `high`     |

> **Note:** Omitting both parameters returns all incidents with no filtering applied.

#### Example Requests

```bash
# All incidents (no filter)
curl http://localhost:8000/incidents

# Filter by category only
curl "http://localhost:8000/incidents?category=Robbery"

# Filter by severity only
curl "http://localhost:8000/incidents?severity=high"

# Combine category and severity (AND logic)
curl "http://localhost:8000/incidents?category=Theft&severity=medium"
```

#### Response `200 OK`

Returns a JSON array of incident objects. Returns an empty array (`[]`) when no incidents match the applied filters.

```json
[
  {
    "id": 1,
    "title": "Street Robbery",
    "category": "Robbery",
    "latitude": 19.076,
    "longitude": 72.8777,
    "severity": "high",
    "incident_date": "2024-01-15T22:30:00"
  },
  {
    "id": 2,
    "title": "Vehicle Theft",
    "category": "Theft",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "severity": "medium",
    "incident_date": "2024-02-03T03:15:00"
  }
]
```

#### Response Fields

| Field           | Type      | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| `id`            | `integer` | Unique incident identifier (primary key)                          |
| `title`         | `string`  | Human-readable incident name                                      |
| `category`      | `string`  | Crime category (e.g. `Robbery`, `Theft`, `Assault`)               |
| `latitude`      | `float`   | Geographic latitude in WGS-84 decimal degrees                     |
| `longitude`     | `float`   | Geographic longitude in WGS-84 decimal degrees                    |
| `severity`      | `string`  | Severity level — one of `high`, `medium`, or `low`               |
| `incident_date` | `string`  | Incident timestamp in ISO 8601 format (`YYYY-MM-DDTHH:MM:SS`)     |

#### Response `200 OK` — No Matches

```json
[]
```

---

## Error Handling

The API returns standard HTTP status codes:

| Status Code                  | Meaning                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| `200 OK`                     | Request succeeded                                            |
| `422 Unprocessable Entity`   | A query parameter value has an invalid type                  |
| `500 Internal Server Error`  | Unexpected server-side error                                 |

### Example `422` Error Response

Returned when a query parameter cannot be parsed (e.g. passing a non-string value where a string is expected):

```json
{
  "detail": [
    {
      "loc": ["query", "severity"],
      "msg": "value is not a valid string",
      "type": "type_error.str"
    }
  ]
}
```

---

## CORS Policy

The API allows cross-origin requests from the following origin:

```
http://localhost:5173
```

This matches the default Vite development server. To allow additional origins, update the `allow_origins` list in [`backend/main.py`](../backend/main.py).

---

## Rate Limiting

No rate limiting is currently implemented. This is suitable for local development.  
If deploying publicly, consider adding rate-limiting middleware (e.g. [`slowapi`](https://github.com/laurentS/slowapi)).

---

*Back to [README](../README.md)*
