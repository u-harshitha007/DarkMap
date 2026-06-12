import { Link } from "react-router-dom";

import PageShell from "../components/PageShell";

export default function LandingPage() {
  return (
    <PageShell>
      <main className="flex flex-1 flex-col items-center justify-center py-16 text-center">
        <h2 className="font-display text-4xl font-bold tracking-[0.15em] text-white sm:text-5xl">
          Crime Analytics Dashboard
        </h2>

        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Explore incident hotspots across India with interactive markers,
          severity insights, and live filtering.
        </p>

        <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        <Link
          to="/map"
          className="mt-10 rounded-md border border-red-500/40 bg-red-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:border-red-400 hover:bg-red-500/20"
        >
          Open India Map
        </Link>
      </main>
    </PageShell>
  );
}
