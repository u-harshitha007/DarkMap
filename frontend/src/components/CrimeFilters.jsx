export default function CrimeFilters({
  categories,
  category,
  severity,
  dateFrom,
  dateTo,
  onCategoryChange,
  onSeverityChange,
  onDateFromChange,
  onDateToChange,
}) {
  function handleReset() {
    onCategoryChange("");
    onSeverityChange("");
    onDateFromChange("");
    onDateToChange("");
  }

  const hasActiveFilters = category || severity || dateFrom || dateTo;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category */}
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          Category
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500/60"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {/* Severity */}
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          Severity
          <select
            value={severity}
            onChange={(event) => onSeverityChange(event.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500/60"
          >
            <option value="">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        {/* Date From */}
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          From Date
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => onDateFromChange(event.target.value)}
            max={dateTo || undefined}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500/60 [color-scheme:dark]"
          />
        </label>

        {/* Date To */}
        <label className="flex flex-col gap-2 text-sm text-zinc-400">
          To Date
          <input
            type="date"
            value={dateTo}
            onChange={(event) => onDateToChange(event.target.value)}
            min={dateFrom || undefined}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-red-500/60 [color-scheme:dark]"
          />
        </label>
      </div>

      {/* Reset button — only visible when any filter is active */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="rounded-md border border-zinc-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
