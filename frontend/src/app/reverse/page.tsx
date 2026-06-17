'use client';

import { useState, useEffect } from 'react';
import { fetchRoles, fetchSkills, postReverse } from '@/lib/api';
import type { ReverseResponse } from '@/lib/types';
import { SkillProfileChart } from '@/components/Tables';

const GRADE_COLORS: Record<string, string> = {
  A: 'text-emerald-400', 'A−': 'text-emerald-400',
  'B+': 'text-emerald-400', B: 'text-emerald-400', 'B−': 'text-amber-400',
  'C+': 'text-amber-400', C: 'text-amber-400', 'C−': 'text-amber-400',
  D: 'text-rose-400', 'D−': 'text-rose-400',
};

const GRADE_BG: Record<string, string> = {
  A: 'bg-emerald-500/15 border-emerald-500/20',
  'A−': 'bg-emerald-500/15 border-emerald-500/20',
  'B+': 'bg-emerald-500/10 border-emerald-500/15',
  B: 'bg-emerald-500/10 border-emerald-500/15',
  'B−': 'bg-amber-500/10 border-amber-500/15',
  'C+': 'bg-amber-500/10 border-amber-500/15',
  C: 'bg-amber-500/10 border-amber-500/15',
  'C−': 'bg-amber-500/10 border-amber-500/15',
  D: 'bg-rose-500/10 border-rose-500/15',
  'D−': 'bg-rose-500/10 border-rose-500/15',
};

const BAR_GRADIENT: Record<string, string> = {
  A: 'from-emerald-500 to-emerald-400',
  'A−': 'from-emerald-500 to-emerald-400',
  'B+': 'from-emerald-500 to-teal-400',
  B: 'from-emerald-400 to-teal-400',
  'B−': 'from-amber-400 to-amber-300',
  'C+': 'from-amber-400 to-amber-300',
  C: 'from-amber-400 to-yellow-300',
  'C−': 'from-amber-400 to-yellow-300',
  D: 'from-rose-400 to-rose-300',
  'D−': 'from-rose-400 to-rose-300',
};

const DEFAULT_BAR = 'from-violet-500 to-violet-400';

function letterClass(letter: string): string {
  return GRADE_COLORS[letter] || 'text-[var(--text-muted)]';
}

function letterBg(letter: string): string {
  return GRADE_BG[letter] || 'bg-[var(--bg-card)] border-[var(--border)]';
}

function barGrad(letter: string): string {
  return BAR_GRADIENT[letter] || DEFAULT_BAR;
}

/* ── Course Importance Row ── */

function CourseImportanceRow({ rank, course, importancePct, letter }: {
  rank: number; course: string; importancePct: number; letter: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-card)] transition-colors">
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
        rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-default'
      }`}>
        {rank}
      </span>
      <span className="flex-1 truncate text-sm text-[var(--text-secondary)] font-medium">
        {course}
      </span>
      <div className="h-2.5 w-28 overflow-hidden rounded-full bg-[var(--bg-card)] ring-1 ring-[var(--border)]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGrad(letter)} animate-bar-fill`}
          style={{ width: `${importancePct}%` }}
        />
      </div>
      <span className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-0.5 text-[11px] font-bold tabular-nums ${letterBg(letter)} ${letterClass(letter)} w-10`}>
        {letter}
      </span>
      <span className="w-14 text-right text-xs font-mono text-[var(--text-secondary)] tabular-nums">
        {importancePct}%
      </span>
    </div>
  );
}

/* ── Page ── */

export default function ReversePage() {
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [result, setResult] = useState<ReverseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchRoles()
      .then(setRoles)
      .catch(() => setError('Failed to load data. Is the backend running?'));
  }, []);

  const handleRun = async () => {
    if (!selectedRole) return;
    setLoading(true);
    setError('');
    try {
      const res = await postReverse(selectedRole);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
    }
    setLoading(false);
  };

  const displayTargets = result?.grade_targets ?? [];
  const visibleTargets = showAll ? displayTargets : displayTargets.filter((t) => t.importance_pct > 0).slice(0, 10);

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 animate-fade-in-down">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-600/5 border border-violet-500/15 shadow-lg shadow-violet-500/5">
          <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Reverse Mapping</h1>
          <p className="text-sm text-[var(--text-secondary)]">Discover which courses matter most for a target role.</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.05] px-5 py-4 text-sm text-rose-300 animate-fade-in flex items-center gap-3">
          <svg className="h-5 w-5 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      {/* Input card */}
      <div className="glass-card p-7 sm:p-8 space-y-7">
        <div>
          <label className="section-label mb-3 block">Target Role</label>
          <select
            className="modern-select w-full px-4 py-3 text-sm"
            value={selectedRole}
            onChange={(e) => { setSelectedRole(e.target.value); setResult(null); }}
          >
            <option value="">Select a role...</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRun}
            disabled={!selectedRole || loading}
            className="btn-primary px-7 py-3 text-sm flex items-center gap-2.5"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Computing...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.5 21l.5-.25m8-14.5l.5-.25M12 21V9" />
                </svg>
                Run Optimization
              </>
            )}
          </button>
          <button onClick={() => { setResult(null); setShowAll(false); }} disabled={loading} className="btn-ghost px-6 py-3 text-sm">
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Fit if achieved */}
          <div className="glow-card p-6 animate-fade-in-scale">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20">
                <span className="text-lg font-extrabold text-violet-400">{result.fit_if_achieved}</span>
                <span className="absolute -top-1 -right-1 text-[9px] text-[var(--text-muted)] font-semibold">%</span>
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Achieving these targets would give you{' '}
                  <span className={`font-bold ${result.fit_if_achieved >= 60 ? 'text-emerald-500' : result.fit_if_achieved >= 30 ? 'text-amber-500' : 'text-rose-500'}`}>
                    {result.fit_if_achieved}%
                  </span>{' '}
                  alignment with{' '}
                  <span className="font-bold gradient-text">{result.role}</span>.
                </p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  The top course sets the benchmark at A — others scale relative to it.
                </p>
              </div>
            </div>
          </div>

          {/* Course importance ranking */}
          <div className="glass-card p-7 sm:p-8">
            <div className="mb-6">
              <h2 className="section-label">Course Importance</h2>
              <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                {showAll
                  ? `All ${displayTargets.length} courses — sorted by importance`
                  : 'Top courses — sorted by importance for the role'}
              </p>
            </div>
            <div className="space-y-2.5 stagger-children">
              {visibleTargets.map((gt, i) => (
                <CourseImportanceRow
                  key={gt.course}
                  rank={i + 1}
                  course={gt.course}
                  importancePct={gt.importance_pct}
                  letter={gt.letter}
                />
              ))}
            </div>
            {displayTargets.length > 10 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 w-full rounded-xl border border-dashed border-[var(--border)] py-3 text-xs font-semibold text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)] transition-all"
              >
                {showAll
                  ? `Show top 10`
                  : `Show all ${displayTargets.length} courses`}
              </button>
            )}
          </div>

          {/* Top job skills */}
          {result.top_job_skills.length > 0 && (
            <div className="glass-card p-7 sm:p-8">
              <SkillProfileChart skills={result.top_job_skills} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}