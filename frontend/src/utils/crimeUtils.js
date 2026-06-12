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
