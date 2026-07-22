export const API_BASE_URL = "http://127.0.0.1:8000";

export const SEVERITY_COLORS = {
  low: "#EAB308",
  medium: "#F97316",
  high: "#EF4444",
};

export function formatIncidentDate(dateString) {
  return new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getMostCommonCategory(incidents) {
  if (!incidents.length) {
    return "N/A";
  }

  const counts = incidents.reduce((accumulator, incident) => {
    accumulator[incident.category] = (accumulator[incident.category] || 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts).sort((left, right) => right[1] - left[1])[0][0];
}

// ---------------------------------------------------------------------------
// City coordinate lookup
// Keys are "lat,lng" strings matching the dataset values exactly.
// Used to reverse-map an incident's coordinates to a human-readable city name.
// ---------------------------------------------------------------------------
export const CITY_COORDINATES = {
  "19.076,72.8777": "Mumbai",
  "28.7041,77.1025": "Delhi",
  "12.9716,77.5946": "Bengaluru",
  "22.5726,88.3639": "Kolkata",
  "17.385,78.4867": "Hyderabad",
  "13.0827,80.2707": "Chennai",
  "18.5204,73.8567": "Pune",
  "26.9124,75.7873": "Jaipur",
  "23.0225,72.5714": "Ahmedabad",
  "21.1702,72.8311": "Surat",
  // Additional coordinates present in the expanded dataset
  "28.6139,77.209": "Delhi",
  "28.5562,77.1": "Delhi",
  "18.922,72.8347": "Mumbai",
};

/**
 * Returns the city name for a given incident based on its coordinates.
 * Falls back to "Unknown" if the coordinates are not in the lookup table.
 */
export function getCityForIncident(incident) {
  const key = `${incident.latitude},${incident.longitude}`;
  return CITY_COORDINATES[key] ?? "Unknown";
}

/**
 * Filters an incidents array by a free-text search query.
 * Matches against: city name, incident title, and category.
 * Returns all incidents when query is empty or whitespace.
 */
export function searchIncidents(incidents, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return incidents;

  return incidents.filter((incident) => {
    const city = getCityForIncident(incident).toLowerCase();
    return (
      city.includes(trimmed) ||
      incident.title.toLowerCase().includes(trimmed) ||
      incident.category.toLowerCase().includes(trimmed)
    );
  });
}

// ---------------------------------------------------------------------------
// CSV Export
// ---------------------------------------------------------------------------

/**
 * Converts an array of incidents to a CSV string and triggers a browser download.
 * Exported columns: id, title, category, severity, city, latitude, longitude, incident_date
 * Filename: darkmap-incidents-YYYY-MM-DD.csv
 */
export function exportIncidentsToCsv(incidents) {
  if (!incidents.length) return;

  const today = new Date().toISOString().slice(0, 10);
  const filename = `darkmap-incidents-${today}.csv`;

  const headers = [
    "id",
    "title",
    "category",
    "severity",
    "city",
    "latitude",
    "longitude",
    "incident_date",
  ];

  const escapeCell = (value) => {
    const str = String(value ?? "");
    // Wrap in quotes if the value contains a comma, quote, or newline
    return str.includes(",") || str.includes('"') || str.includes("\n")
      ? `"${str.replace(/"/g, '""')}"`
      : str;
  };

  const rows = incidents.map((incident) => [
    incident.id,
    incident.title,
    incident.category,
    incident.severity,
    getCityForIncident(incident),
    incident.latitude,
    incident.longitude,
    new Date(incident.incident_date).toISOString(),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCell).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
