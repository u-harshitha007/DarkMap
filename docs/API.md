# DarkMap — API Reference

This document describes all available REST API endpoints exposed by
the DarkMap FastAPI backend.

**Base URL (development):** `http://localhost:8000`

**Interactive docs:** `http://localhost:8000/docs` (Swagger UI)

**Alternative docs:** `http://localhost:8000/redoc` (ReDoc)

---

## Authentication

The current version of the API requires **no authentication**.
All endpoints are publicly accessible.

---

## Endpoints

---

### `GET /`

Health-check endpoint. Returns the application name and running status.

#### Request

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

Returns a list of crime incidents, optionally filtered by category and/or severity.

#### Request

```http
GET /incidents HTTP/1.1
Host: localhost:8000
```

#### Query Parameters

| Parameter | Type | Required | Description | Example |
|---|---|---|---|---|
| `category` | `string` | ❌ | Filter by crime category (case-insensitive) | `Robbery` |
| `severity` | `string` | ❌ | Filter by severity level (case-insensitive) | `high` |

#### Example Requests

```bash
# All incidents
curl http://localhost:8000/incidents

# Filter by category
curl "http://localhost:8000/incidents?category=Robbery"

# Filter by severity
curl "http://localhost:8000/incidents?severity=high"

# Combine filters
curl "http://localhost:8000/incidents?category=Theft&severity=medium"
```

#### Response `200 OK`

Returns a JSON array of incident objects.

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

| Field | Type | Description |
|---|---|---|
| `id` | `integer` | Unique identifier |
| `title` | `string` | Human-readable incident name |
| `category` | `string` | Crime category |
| `latitude` | `float` | WGS-84 latitude |
| `longitude` | `float` | WGS-84 longitude |
| `severity` | `string` | `high` / `medium` / `low` |
| `incident_date` | `string` | ISO 8601 datetime string |

#### Response `200 OK` — Empty (no matches)

```json
[]
```

---

## Error Handling

The API returns standard HTTP status codes:

| Status Code | Meaning |
|---|---|
| `200 OK` | Request succeeded |
| `422 Unprocessable Entity` | Invalid query parameter type |
| `500 Internal Server Error` | Unexpected server error |

### Example Error Response (`422`)

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

The API allows cross-origin requests from:

```
http://localhost:5173
```

This is the default Vite dev server origin. To allow other origins,
update the `allow_origins` list in `main.py`.

---

## Rate Limiting

No rate limiting is currently applied. This is appropriate for
local development. If deploying publicly, add rate limiting middleware.

---

*Back to [README](../README.md)*
