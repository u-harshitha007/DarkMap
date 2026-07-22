import { useEffect, useMemo, useState } from "react";

import CitySearch from "../components/CitySearch";
import CrimeFilters from "../components/CrimeFilters";
import CrimeMap from "../components/CrimeMap";
import DashboardCards from "../components/DashboardCards";
import ExportButton from "../components/ExportButton";
import PageShell from "../components/PageShell";
import SearchResults from "../components/SearchResults";
import {
  API_BASE_URL,
  getMostCommonCategory,
  searchIncidents,
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
  const [searchQuery, setSearchQuery] = useState("");

  // focusTarget: { id, lat, lng } of incident to pan/highlight, or null
  const [focusTarget, setFocusTarget] = useState(null);

  // Heatmap toggle
  const [showHeatmap, setShowHeatmap] = useState(false);

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
    return [...new Set(allIncidents.map((i) => i.category))].sort();
  }, [allIncidents]);

  // Base filter: category + severity + date range
  const filteredIncidents = useMemo(() => {
    const fromTs = dateFrom ? new Date(dateFrom).getTime() : null;
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

  // Search layer: applied on top of filteredIncidents
  const searchResults = useMemo(
    () => searchIncidents(filteredIncidents, searchQuery),
    [filteredIncidents, searchQuery],
  );

  // Auto-focus the first search result whenever the results list changes
  useEffect(() => {
    if (searchResults.length > 0) {
      const first = searchResults[0];
      setFocusTarget({ id: first.id, lat: first.latitude, lng: first.longitude });
    } else {
      // No results or search cleared — reset map to India overview
      setFocusTarget(null);
    }
  }, [searchResults]);

  // Handle manual row selection from the results list
  function handleSelectIncident(incident) {
    setFocusTarget({ id: incident.id, lat: incident.latitude, lng: incident.longitude });
  }

  // When the search bar is cleared, also reset the focus
  function handleSearchChange(value) {
    setSearchQuery(value);
    if (!value.trim()) setFocusTarget(null);
  }

  const highSeverityCases = filteredIncidents.filter(
    (i) => i.severity === "high",
  ).length;

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

        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Severity legend */}
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

          {/* Heatmap toggle + Export */}
          <div className="flex items-center gap-2">
            <ExportButton incidents={filteredIncidents} />

            <button
              onClick={() => setShowHeatmap((prev) => !prev)}
            className={`flex items-center gap-2 rounded-md border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition
              ${
                showHeatmap
                  ? "border-red-500/60 bg-red-500/15 text-red-300 hover:bg-red-500/25"
                  : "border-zinc-700 bg-zinc-900/70 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
          >
            {/* Flame icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 18.657A8 8 0 0 1 6.343 7.343m0 0A8 8 0 1 1 17.657 18.657m0 0L21 21M9 9c0 2 1 3.5 3 4.5"
              />
            </svg>
            {showHeatmap ? "Heatmap On" : "Heatmap"}
            </button>
          </div>
        </div>

        {/* City / title / category search */}
        <CitySearch
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          resultCount={searchQuery.trim() ? searchResults.length : undefined}
        />

        {/* Clickable results list — selecting a row pans the map */}
        <SearchResults
          incidents={searchResults}
          searchQuery={searchQuery}
          selectedId={focusTarget?.id ?? null}
          onSelect={handleSelectIncident}
        />

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

        {!loading && !error && (
          <CrimeMap
            incidents={filteredIncidents}
            focusTarget={focusTarget}
            showHeatmap={showHeatmap}
          />
        )}
      </div>
    </PageShell>
  );
}
