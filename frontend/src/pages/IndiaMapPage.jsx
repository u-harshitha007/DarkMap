import { useEffect, useMemo, useState } from "react";

import CitySearch from "../components/CitySearch";
import CrimeFilters from "../components/CrimeFilters";
import CrimeMap from "../components/CrimeMap";
import DashboardCards from "../components/DashboardCards";
import PageShell from "../components/PageShell";
import {
  API_BASE_URL,
  getMostCommonCategory,
  SEVERITY_COLORS,
} from "../utils/crimeUtils";

export default function IndiaMapPage() {
  const [allIncidents, setAllIncidents] = useState([]);
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Part 1: search state — functionality wired in Part 2
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchIncidents() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/incidents`);

        if (!response.ok) {
          throw new Error("Failed to load crime incidents.");
        }

        const data = await response.json();
        setAllIncidents(data);
      } catch (fetchError) {
        setError(fetchError.message);
        setAllIncidents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(allIncidents.map((incident) => incident.category))].sort();
  }, [allIncidents]);

  const filteredIncidents = useMemo(() => {
    const fromTs = dateFrom ? new Date(dateFrom).getTime() : null;
    // Set dateTo to end-of-day so the selected day is fully inclusive
    const toTs = dateTo ? new Date(dateTo + "T23:59:59").getTime() : null;

    return allIncidents.filter((incident) => {
      const matchesCategory = category
        ? incident.category.toLowerCase() === category.toLowerCase()
        : true;

      const matchesSeverity = severity
        ? incident.severity === severity.toLowerCase()
        : true;

      const incidentTs = new Date(incident.incident_date).getTime();
      const matchesFrom = fromTs !== null ? incidentTs >= fromTs : true;
      const matchesTo = toTs !== null ? incidentTs <= toTs : true;

      return matchesCategory && matchesSeverity && matchesFrom && matchesTo;
    });
  }, [allIncidents, category, severity, dateFrom, dateTo]);

  const highSeverityCases = filteredIncidents.filter(
    (incident) => incident.severity === "high",
  ).length;

  // Derive the active date range label for UI feedback
  const dateRangeLabel = useMemo(() => {
    if (!dateFrom && !dateTo) return null;
    const fmt = (d) =>
      new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    if (dateFrom && dateTo) return `${fmt(dateFrom)} – ${fmt(dateTo)}`;
    if (dateFrom) return `From ${fmt(dateFrom)}`;
    return `Until ${fmt(dateTo)}`;
  }, [dateFrom, dateTo]);

  return (
    <PageShell>
      <div className="space-y-6 pb-8">
        <section>
          <h2 className="text-xl font-semibold text-white">India Crime Map</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Incident markers colored by severity across Indian cities.
            {dateRangeLabel && (
              <span className="ml-2 text-red-400/80">{dateRangeLabel}</span>
            )}
          </p>
        </section>

        <DashboardCards
          totalIncidents={filteredIncidents.length}
          highSeverityCases={highSeverityCases}
          mostCommonCategory={getMostCommonCategory(filteredIncidents)}
        />

        <CrimeFilters
          categories={categories}
          category={category}
          severity={severity}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onCategoryChange={setCategory}
          onSeverityChange={setSeverity}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
        />

        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] text-zinc-400">
          {Object.entries(SEVERITY_COLORS).map(([level, color]) => (
            <span key={level} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              {level}
            </span>
          ))}
        </div>

        {/* City search — Part 1: UI only, map pan wired in Part 2 */}
        <CitySearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {loading && (
          <p className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 text-zinc-400">
            Loading crime incidents...
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
            {error} Make sure the backend is running at {API_BASE_URL}.
          </p>
        )}

        {!loading && !error && <CrimeMap incidents={filteredIncidents} />}      </div>
    </PageShell>
  );
}
