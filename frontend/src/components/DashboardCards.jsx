export default function DashboardCards({
  totalIncidents,
  highSeverityCases,
  mostCommonCategory,
}) {
  const cards = [
    {
      label: "Total Incidents",
      value: totalIncidents,
      accent: "text-white",
    },
    {
      label: "High Severity Cases",
      value: highSeverityCases,
      accent: "text-red-400",
    },
    {
      label: "Most Common Category",
      value: mostCommonCategory,
      accent: "text-orange-300",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg shadow-black/20 backdrop-blur-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {card.label}
          </p>
          <p className={`mt-3 text-2xl font-semibold ${card.accent}`}>
            {card.value}
          </p>
        </article>
      ))}
    </div>
  );
}
