export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-600/10 border border-violet-500/10">
              <svg className="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              </svg>
            </div>
            <span className="text-xs text-[var(--text-muted)]">Course-Job Scoring System — Thesis Project</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { name: "Next.js", color: "text-[var(--text-secondary)]" },
              { name: "FastAPI", color: "text-emerald-500/70" },
              { name: "NumPy", color: "text-blue-500/70" },
              { name: "Tailwind", color: "text-cyan-500/70" },
            ].map((tech, i) => (
              <span key={tech.name} className="flex items-center gap-2">
                {i > 0 && <span className="text-[var(--text-muted)]">·</span>}
                <span className={`text-[11px] font-medium ${tech.color}`}>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
