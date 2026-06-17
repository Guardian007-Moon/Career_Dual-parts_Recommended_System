import Link from "next/link";

/* ── SVG Illustrations ── */

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto h-64 sm:h-80 animate-float-slow">
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Central orb */}
        <circle cx="200" cy="150" r="40" fill="url(#orbGrad)" opacity="0.8">
          <animate attributeName="r" values="38;42;38" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="150" r="55" stroke="url(#orbStroke)" strokeWidth="0.5" opacity="0.4" fill="none">
          <animate attributeName="r" values="52;58;52" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="150" r="70" stroke="url(#orbStroke)" strokeWidth="0.3" opacity="0.2" fill="none">
          <animate attributeName="r" values="68;75;68" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Orbiting nodes */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="20s" repeatCount="indefinite" />
          <circle cx="200" cy="80" r="8" fill="#8b5cf6" opacity="0.8" />
          <circle cx="280" cy="170" r="6" fill="#60a5fa" opacity="0.7" />
          <circle cx="130" cy="200" r="5" fill="#34d399" opacity="0.6" />
        </g>

        {/* Connection lines */}
        <line x1="200" y1="150" x2="200" y2="80" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="150" x2="280" y2="170" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="150" x2="130" y2="200" stroke="#34d399" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite" />
        </line>

        {/* Floating particles */}
        <circle cx="100" cy="100" r="2" fill="#a78bfa" opacity="0.4">
          <animate attributeName="cy" values="100;90;100" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="120" r="1.5" fill="#60a5fa" opacity="0.3">
          <animate attributeName="cy" values="120;110;120" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="240" r="2" fill="#34d399" opacity="0.3">
          <animate attributeName="cy" values="240;230;240" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="220" r="1.5" fill="#fbbf24" opacity="0.3">
          <animate attributeName="cy" values="220;210;220" dur="4.5s" repeatCount="indefinite" />
        </circle>

        {/* Small orbiting dots */}
        <circle cx="200" cy="150" r="3" fill="#c4b5fd" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="12s" repeatCount="indefinite" />
        </circle>

        <defs>
          <radialGradient id="orbGrad" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
          <linearGradient id="orbStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ForwardIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-16 h-16">
      <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#cardGrad1)" />
      <rect x="22" y="25" width="55" height="8" rx="4" fill="#8b5cf6" opacity="0.7" />
      <rect x="22" y="40" width="76" height="6" rx="3" fill="#60a5fa" opacity="0.4" />
      <rect x="22" y="52" width="65" height="6" rx="3" fill="#34d399" opacity="0.35" />
      <rect x="22" y="64" width="50" height="6" rx="3" fill="#fbbf24" opacity="0.3" />
      <circle cx="90" cy="85" r="18" fill="#8b5cf6" opacity="0.2" />
      <path d="M82 85l5 5 11-11" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="cardGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(139,92,246,0.08)" />
          <stop offset="100%" stopColor="rgba(96,165,250,0.04)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BackwardIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-16 h-16">
      <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#cardGrad2)" />
      <circle cx="60" cy="55" r="22" stroke="#60a5fa" strokeWidth="3" opacity="0.3" />
      <path d="M60 33 A22 22 0 0 1 78 68" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M42 75l8 8 18-18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="25" y="90" width="70" height="6" rx="3" fill="#8b5cf6" opacity="0.2" />
      <defs>
        <linearGradient id="cardGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(96,165,250,0.08)" />
          <stop offset="100%" stopColor="rgba(52,211,153,0.04)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReverseIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-16 h-16">
      <rect x="10" y="10" width="100" height="100" rx="20" fill="url(#cardGrad3)" />
      <path d="M30 85l20-25 15 10 25-35" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="30" cy="85" r="4" fill="#8b5cf6" />
      <circle cx="50" cy="60" r="4" fill="#a78bfa" />
      <circle cx="65" cy="70" r="4" fill="#c4b5fd" />
      <circle cx="90" cy="35" r="4" fill="#ddd6fe" />
      <rect x="22" y="95" width="60" height="5" rx="2.5" fill="#8b5cf6" opacity="0.15" />
      <defs>
        <linearGradient id="cardGrad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(167,139,250,0.08)" />
          <stop offset="100%" stopColor="rgba(139,92,246,0.04)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Page ── */

export default function Home() {
  return (
    <div className="space-y-20">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-6 pb-8">
        {/* Glow orbs */}
        <div className="glow-orb -top-32 left-1/4 h-80 w-80 bg-violet-600/15 glow-orb-animated" />
        <div className="glow-orb top-20 right-1/5 h-64 w-64 bg-blue-500/10 glow-orb-animated" style={{ animationDelay: "2s" }} />
        <div className="glow-orb bottom-0 left-1/2 h-48 w-48 bg-emerald-500/8 glow-orb-animated" style={{ animationDelay: "4s" }} />

        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/15 bg-violet-500/[0.05] px-4 py-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              <span className="text-[11px] font-semibold text-violet-300 tracking-wide uppercase">Vector Space Model Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08]">
              <span className="text-[var(--text-primary)]">Your grades.</span>
              <br />
              <span className="gradient-text">Your career path.</span>
            </h1>

            <p className="mx-auto lg:mx-0 mt-6 max-w-md text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              A smart scoring system that maps your academic performance
              to real job roles — and shows you exactly how to improve.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Link href="/forward" className="btn-primary px-8 py-3.5 text-sm flex items-center gap-2.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                Try Forward Mapping
              </Link>
              <Link href="/reverse" className="btn-ghost px-8 py-3.5 text-sm flex items-center gap-2.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.5 21l.5-.25m8-14.5l.5-.25M12 21V9" />
                </svg>
                Try Reverse Mapping
              </Link>
              <Link href="/backward" className="btn-ghost px-8 py-3.5 text-sm flex items-center gap-2.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                Try Backward Mapping
              </Link>
            </div>
          </div>

          {/* Right — Illustration */}
          <div className="hidden lg:block animate-fade-in-scale" style={{ animationDelay: "200ms" }}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURE CARDS ═══════════════ */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <Link href="/forward" className="glass-card group p-8 cursor-pointer">
          <div className="flex items-start gap-5">
            <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <ForwardIllustration />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1.5">Forward Mapping</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Enter your grades and discover which job roles best match your skill profile. Get ranked results with fit percentages.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-all group-hover:text-violet-400 group-hover:gap-3">
                Get started
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        <Link href="/reverse" className="glass-card group p-8 cursor-pointer">
          <div className="flex items-start gap-5">
            <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <ReverseIllustration />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1.5">Reverse Mapping</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Pick a target job role and use optimization to discover which courses matter most — with recommended grade targets for each.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-500 transition-all group-hover:text-purple-400 group-hover:gap-3">
                Get started
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        <Link href="/backward" className="glass-card group p-8 cursor-pointer sm:col-span-2 lg:col-span-1">
          <div className="flex items-start gap-5">
            <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <BackwardIllustration />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1.5">Backward Mapping</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Pick a dream role and get personalized course recommendations to close your skill gaps with impact scores.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition-all group-hover:text-blue-400 group-hover:gap-3">
                Get started
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ═══════════════ HOW TO USE ═══════════════ */}
      <section className="animate-fade-in-up" style={{ animationDelay: "350ms" }}>
        <div className="text-center mb-14">
          <span className="section-label mb-3 block">Get started in minutes</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">How to use it</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto">Two powerful tools to help you navigate your academic-to-career journey.</p>
        </div>

        {/* ── Forward Mapping Steps ── */}
        <div className="glass-card p-8 sm:p-10 mb-6 group">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/15">
              <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Forward Mapping</h3>
              <p className="text-sm text-[var(--text-secondary)]">Discover which careers match your grades.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Add your courses",
                desc: "Select courses from the dropdown and enter your grades. Use letter grades (A–F) or raw scores like 85/100.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
                color: "violet",
              },
              {
                step: "02",
                title: "Run the analysis",
                desc: "Click 'Run Forward Mapping' to compute your skill profile using the Course-Skill matrix and cosine similarity.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                color: "blue",
              },
              {
                step: "03",
                title: "See your matches",
                desc: "View ranked job roles with fit percentages. Your top match is highlighted along with your strongest skills.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                ),
                color: "emerald",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    item.color === 'violet' ? 'bg-violet-500/15 text-violet-500 border border-violet-500/20' :
                    item.color === 'blue' ? 'bg-blue-500/15 text-blue-500 border border-blue-500/20' :
                    'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {item.step}
                  </span>
                  <span className={`${
                    item.color === 'violet' ? 'text-violet-500' :
                    item.color === 'blue' ? 'text-blue-500' :
                    'text-emerald-500'
                  }`}>
                    {item.icon}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{item.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/forward" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-all hover:text-violet-400 hover:gap-3 group/link">
              Try Forward Mapping
              <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Backward Mapping Steps ── */}
        <div className="glass-card p-8 sm:p-10 group">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/15">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.5 21l.5-.25m8-14.5l.5-.25M12 21V9" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Backward Mapping</h3>
              <p className="text-sm text-[var(--text-secondary)]">Find the best courses for your dream role.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Enter your grades",
                desc: "Add the courses you've already taken along with the grades you received. This builds your current skill profile.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
                color: "blue",
              },
              {
                step: "02",
                title: "Pick a target role",
                desc: "Choose one of the 4 available job roles you're aiming for. The system will compare your profile against that role's requirements.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                color: "violet",
              },
              {
                step: "03",
                title: "Get recommendations",
                desc: "See your fit score, recommended courses ranked by impact, and a skill gap analysis showing where to improve.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "emerald",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    item.color === 'violet' ? 'bg-violet-500/15 text-violet-500 border border-violet-500/20' :
                    item.color === 'blue' ? 'bg-blue-500/15 text-blue-500 border border-blue-500/20' :
                    'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {item.step}
                  </span>
                  <span className={`${
                    item.color === 'violet' ? 'text-violet-500' :
                    item.color === 'blue' ? 'text-blue-500' :
                    'text-emerald-500'
                  }`}>
                    {item.icon}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{item.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/reverse" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition-all hover:text-blue-400 hover:gap-3 group/link">
              Try Backward Mapping
              <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ REVERSE MAPPING STEPS ═══════════════ */}
      <section className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        {/* ── Reverse Mapping Steps ── */}
        <div className="glass-card p-8 sm:p-10 group">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/15">
              <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.5 21l.5-.25m8-14.5l.5-.25M12 21V9" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Reverse Mapping</h3>
              <p className="text-sm text-[var(--text-secondary)]">Find the best courses for your dream role.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Pick a target role",
                desc: "Choose one of the 4 available job roles you're aiming for. The system will analyze which skills that role requires most.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                color: "purple",
              },
              {
                step: "02",
                title: "Run the optimization",
                desc: "Click 'Run Optimization' to solve the inverse problem — finding the ideal grade vector that best matches the role's skill profile.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                color: "violet",
              },
              {
                step: "03",
                title: "See course priorities",
                desc: "View all 28 courses ranked by importance, with recommended grade targets. The top course sets the benchmark — others scale relative to it.",
                icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "emerald",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    item.color === 'purple' ? 'bg-purple-500/15 text-purple-500 border border-purple-500/20' :
                    item.color === 'violet' ? 'bg-violet-500/15 text-violet-500 border border-violet-500/20' :
                    'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {item.step}
                  </span>
                  <span className={`${
                    item.color === 'purple' ? 'text-purple-500' :
                    item.color === 'violet' ? 'text-violet-500' :
                    'text-emerald-500'
                  }`}>
                    {item.icon}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{item.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/reverse" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-500 transition-all hover:text-purple-400 hover:gap-3 group/link">
              Try Reverse Mapping
              <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
        {[
          { label: "Courses", value: "28", icon: "📚", color: "from-violet-500/10 to-violet-600/5", border: "border-violet-500/10", text: "text-violet-500" },
          { label: "Skills", value: "86", icon: "🧠", color: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/10", text: "text-blue-500" },
          { label: "Job Roles", value: "4", icon: "💼", color: "from-emerald-500/10 to-emerald-600/5", border: "border-emerald-500/10", text: "text-emerald-500" },
          { label: "Data Points", value: "2.4K", icon: "📊", color: "from-amber-500/10 to-amber-600/5", border: "border-amber-500/10", text: "text-amber-500" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-6 text-center group hover:scale-[1.03] transition-transform duration-300">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-extrabold ${stat.text}`}>{stat.value}</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)] font-medium">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
