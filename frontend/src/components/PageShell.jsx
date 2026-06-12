import { Link } from "react-router-dom";

export default function PageShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_50%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-400/80">
              Crime Intelligence Platform
            </p>
            <h1 className="font-display text-2xl font-bold tracking-[0.2em] text-white sm:text-3xl">
              DARKMAP
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Visualizing Crime. Revealing Patterns.
            </p>
          </div>

          <nav className="flex gap-3">
            <Link
              to="/"
              className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/map"
              className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:border-red-400 hover:bg-red-500/20"
            >
              India Map
            </Link>
          </nav>
        </header>

        {children}
      </div>
    </div>
  );
}
