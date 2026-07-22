import { exportIncidentsToCsv } from "../utils/crimeUtils";

/**
 * ExportButton
 * Triggers a CSV download of the currently filtered incidents.
 * Disabled when there are no incidents to export.
 *
 * Props:
 *   incidents — the filtered incident array to export
 */
export default function ExportButton({ incidents }) {
  const count = incidents.length;
  const disabled = count === 0;

  function handleExport() {
    if (disabled) return;
    exportIncidentsToCsv(incidents);
  }

  return (
    <button
      onClick={handleExport}
      disabled={disabled}
      title={disabled ? "No incidents to export" : `Export ${count} incident${count === 1 ? "" : "s"} to CSV`}
      className={`flex items-center gap-2 rounded-md border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition
        ${
          disabled
            ? "cursor-not-allowed border-zinc-800 text-zinc-600"
            : "border-zinc-700 bg-zinc-900/70 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
        }`}
    >
      {/* Download icon */}
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
          d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5 5 5-5M12 15V3"
        />
      </svg>
      {disabled ? "Export CSV" : `Export ${count}`}
    </button>
  );
}
