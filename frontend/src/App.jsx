function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_50%)]" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-red-400/80">
          Crime Intelligence Platform
        </p>

        <h1 className="font-display text-5xl font-bold tracking-[0.2em] text-white sm:text-7xl md:text-8xl">
          DARKMAP
        </h1>

        <p className="mt-6 max-w-xl text-lg text-zinc-400 sm:text-xl">
          Visualizing Crime. Revealing Patterns.
        </p>

        <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        <p className="mt-8 max-w-md text-sm leading-relaxed text-zinc-500">
          Phase 1 foundation — mapping crime hotspots, geographic trends, and
          incident analytics.
        </p>
      </main>
    </div>
  )
}

export default App
