export default function CrimeFilters({
  categories,
  category,
  severity,
  onCategoryChange,
  onSeverityChange,
}) {
  return (
    <div className="grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 sm:grid-cols-2">
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
    </div>
  );
}
