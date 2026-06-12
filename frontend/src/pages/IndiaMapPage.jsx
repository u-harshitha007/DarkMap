import { useEffect, useMemo, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return allIncidents.filter((incident) => {
      const matchesCategory = category
        ? incident.category.toLowerCase() === category.toLowerCase()
        : true;
      const matchesSeverity = severity
        ? incident.severity === severity.toLowerCase()
        : true;

      return matchesCategory && matchesSeverity;
    });
  }, [allIncidents, category, severity]);

  const highSeverityCases = filteredIncidents.filter(
    (incident) => incident.severity === "high",
  ).length;

  return (
    <PageShell>
      <div className="space-y-6 pb-8">
        <section>
          <h2 className="text-xl font-semibold text-white">India Crime Map</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Incident markers colored by severity across Indian cities.
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
          onCategoryChange={setCategory}
          onSeverityChange={setSeverity}
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

        {!loading && !error && <CrimeMap incidents={filteredIncidents} />}
      </div>
    </PageShell>
  );
}
