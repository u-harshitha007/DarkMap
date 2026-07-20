import { formatIncidentDate, getCityForIncident, SEVERITY_COLORS } from "../utils/crimeUtils";

/**
 * SearchResults — Part 3
 * Renders the list of matching incidents.
 * Clicking a row calls onSelect(incident) to trigger map pan + highlight.
 * The currently selected incident is visually highlighted in the list.
 */
export default function SearchResults({
  incidents,
  searchQuery,
  selectedId,
  onSelect,
}) {
  if (!searchQuery.trim()) return null;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-lg shadow-black/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Search Results
        </p>
        <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
          {incidents.length} {incidents.length === 1 ? "incident" : "incidents"}
        </span>
      </div>

      {/* No results */}
      {incidents.length === 0 && (
        <div className="flex flex-col items-center gap-2 px-5 py-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <p className="text-sm font-medium text-zinc-400">
            No matching incidents found
          </p>
          <p className="text-xs text-zinc-600">
            Try a city name, crime title, or category
          </p>
        </div>
      )}

      {/* Results list */}
      {incidents.length > 0 && (
        <ul className="max-h-72 divide-y divide-zinc-800/60 overflow-y-auto">
          {incidents.map((incident) => {
            const city = getCityForIncident(incident);
            const dotColor = SEVERITY_COLORS[incident.severity];
            const isSelected = selectedId === incident.id;

            return (
              <li
                key={incident.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => onSelect(incident)}
                onKeyDown={(e) => e.key === "Enter" && onSelect(incident)}
                className={`flex cursor-pointer items-start gap-3 px-5 py-3.5 transition
                  ${
                    isSelected
                      ? "bg-red-500/10 ring-1 ring-inset ring-red-500/30"
                      : "hover:bg-zinc-800/40"
                  }`}
              >
                {/* Severity dot */}
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: dotColor }}
                  title={`${incident.severity} severity`}
                />

                <div className="min-w-0 flex-1">
                  {/* Title + city */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p
                      className={`truncate text-sm font-medium ${
                        isSelected ? "text-white" : "text-zinc-100"
                      }`}
                    >
                      {incident.title}
                    </p>
                    <span className="shrink-0 text-xs text-zinc-500">{city}</span>
                  </div>

                  {/* Category + date */}
                  <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-zinc-500">
                    <span>{incident.category}</span>
                    <span>{formatIncidentDate(incident.incident_date)}</span>
                  </div>
                </div>

                {/* "On map" indicator for selected row */}
                {isSelected && (
                  <span className="mt-1 shrink-0 text-xs font-medium text-red-400">
                    on map
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
