/**
 * CitySearch — Part 2
 * Controlled search input. Accepts an optional resultCount prop to show
 * a live badge when a query is active. Map auto-zoom wired in Part 3.
 */
export default function CitySearch({ searchQuery, onSearchChange, resultCount }) {
  const showBadge = searchQuery.trim().length > 0 && resultCount !== undefined;

  return (
    <div className="relative w-full">
      {/* Search icon */}
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>

      <input
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search city, title, or category — e.g. Mumbai, Robbery, Theft…"
        aria-label="Search incidents by city, title, or category"
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 py-2.5 pl-9 pr-24 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30"
      />

      {/* Live result count badge */}
      {showBadge && (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              resultCount === 0
                ? "bg-red-500/15 text-red-400"
                : "bg-zinc-700 text-zinc-300"
            }`}
          >
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
        </span>
      )}
    </div>
  );
}
