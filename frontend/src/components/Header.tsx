'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
        isActive
          ? 'text-[var(--text-primary)] bg-[var(--bg-card-hover)]'
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-violet-400" />
      )}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-600/25 transition-all duration-500 group-hover:shadow-violet-500/40 group-hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
            <span className="absolute inset-0 rounded-xl border border-violet-400/30 animate-[ripple_3s_ease-out_infinite]" />
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
              Course<span className="text-violet-400">·</span>Job
            </span>
            <span className="block text-[10px] text-[var(--text-muted)] font-medium tracking-wider uppercase">
              Scoring System
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/forward">Forward</NavLink>
          <NavLink href="/reverse">Backward</NavLink>
          <div className="ml-1 h-5 w-px bg-[var(--border)]" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
