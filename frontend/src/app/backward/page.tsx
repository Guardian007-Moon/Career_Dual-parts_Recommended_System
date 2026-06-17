'use client';

import { useState, useEffect } from 'react';
import { fetchCourses, fetchRoles, postBackward } from '@/lib/api';
import type { BackwardResponse } from '@/lib/types';
import CourseGradeInput from '@/components/CourseGradeInput';

/* ── Circular Fit Gauge ── */

function FitGauge({ pct }: { pct: number }) {
  const gradient = pct >= 60
    ? '#34d399'
    : pct >= 30
    ? '#fbbf24'
    : '#fb7185';
  const colorClass = pct >= 60
    ? 'text-emerald-500'
    : pct >= 30
    ? 'text-amber-500'
    : 'text-rose-500';
  const glowClass = pct >= 60
    ? 'shadow-emerald-500/10'
    : pct >= 30
    ? 'shadow-amber-500/10'
    : 'shadow-rose-500/10';

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={`glass-card p-8 flex flex-col sm:flex-row items-center gap-8 shadow-2xl ${glowClass}`}>
      <div className="relative shrink-0">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--bg-card)" strokeWidth="8" />
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={gradient}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-bar-fill"
            style={{ filter: `drop-shadow(0 0 6px ${gradient}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold ${colorClass} animate-count-up`}>
            {pct}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">% fit</span>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Career Alignment</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {pct >= 60
            ? "Excellent alignment! You're on the right track. The recommendations below can push you even further."
            : pct >= 30
            ? "Good foundation. Focus on the recommended courses below to significantly boost your profile."
            : "There's room for growth. The courses below are hand-picked to close your skill gaps fastest."}
        </p>
        <div className="mt-4 flex items-center gap-2 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: gradient }} />
            vs perfect match
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Skill Gap Bar ── */

function SkillGapBar({ skill, studentPct, importancePct }: {
  skill: string; studentPct: number; importancePct: number;
}) {
  const gap = Math.max(0, importancePct - studentPct);
  const hasGap = gap > 20;

  return (
    <div className="space-y-2.5 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[var(--text-secondary)]">{skill}</span>
        {hasGap && (
          <span className="rounded-lg bg-rose-500/10 border border-rose-500/15 px-2.5 py-0.5 text-[10px] font-bold text-rose-500">
            Gap: {gap.toFixed(0)}%
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5 text-[11px] text-[var(--text-muted)]">
          <span className="w-10 shrink-0 text-right font-semibold">You</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-card)] ring-1 ring-[var(--border)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 animate-bar-fill"
              style={{ width: `${studentPct}%` }}
            />
          </div>
          <span className="w-9 text-right font-mono text-[var(--text-secondary)] text-[11px]">{studentPct.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-[var(--text-muted)]">
          <span className="w-10 shrink-0 text-right font-semibold">Need</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-card)] ring-1 ring-[var(--border)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 animate-bar-fill"
              style={{ width: `${importancePct}%`, animationDelay: "120ms" }}
            />
          </div>
          <span className="w-9 text-right font-mono text-[var(--text-secondary)] text-[11px]">{importancePct.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */

export default function BackwardPage() {
  const [courses, setCourses] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState('');
  const [result, setResult] = useState<BackwardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetchCourses().then(setCourses),
      fetchRoles().then(setRoles),
    ]).catch(() => setError('Failed to load data. Is the backend running?'));
  }, []);

  const handleRun = async () => {
    if (!selectedRole || Object.keys(grades).length === 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await postBackward(grades, selectedRole);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
    }
    setLoading(false);
  };

  const handleReset = () => {
    setGrades({});
    setResult(null);
    setError('');
  };

  const showResults = result && Object.keys(grades).length > 0;

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 animate-fade-in-down">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-600/5 border border-blue-500/15 shadow-lg shadow-blue-500/5">
          <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.5 21l.5-.25m8-14.5l.5-.25M12 21V9" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Backward Mapping</h1>
          <p className="text-sm text-[var(--text-secondary)]">Pick a target role and get personalized course recommendations.</p>
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
          <label className="section-label mb-3 block">Your Grades</label>
          <CourseGradeInput
            courses={courses}
            grades={grades}
            onChange={(course, value) => setGrades((prev) => ({ ...prev, [course]: value }))}
            onRemove={(course) => {
              const next = { ...grades };
              delete next[course];
              setGrades(next);
              setResult(null);
            }}
            disabled={loading}
          />
        </div>

        <div className="border-t border-[var(--border)]" />

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
            disabled={!selectedRole || Object.keys(grades).length === 0 || loading}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                Get Recommendations
              </>
            )}
          </button>
          <button onClick={handleReset} disabled={loading} className="btn-ghost px-6 py-3 text-sm">
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Summary */}
          <div className="glow-card p-6 animate-fade-in-scale">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              You&apos;ve taken <span className="font-bold text-[var(--text-primary)]">{result.courses_taken}</span> of{' '}
              <span className="font-bold text-[var(--text-primary)]">{result.total_courses}</span> courses.
              Current alignment with{' '}
              <span className="font-bold gradient-text">{result.role}</span>:{' '}
              <span className={`font-bold ${result.fit_pct >= 60 ? 'text-emerald-500' : result.fit_pct >= 30 ? 'text-amber-500' : 'text-rose-500'}`}>
                {result.fit_pct}%
              </span>.
            </p>
          </div>

          {/* Fit gauge */}
          <FitGauge pct={result.fit_pct} />

          {/* Recommended courses */}
          <div className="glass-card p-7 sm:p-8">
            <div className="mb-6">
              <h2 className="section-label">Recommended Courses</h2>
              <p className="mt-1.5 text-xs text-[var(--text-muted)]">Sorted by skill profile similarity to the target role</p>
            </div>
            <div className="space-y-2.5 stagger-children">
              {result.recommendations.slice(0, 10).map((rec, i) => (
                <div key={rec.course} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-card)] transition-colors">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                    i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-default'
                  }`}>
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate text-sm text-[var(--text-secondary)] font-medium">
                    {rec.course}
                  </span>
                  <div className="h-2.5 w-24 overflow-hidden rounded-full bg-[var(--bg-card)] ring-1 ring-[var(--border)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 animate-bar-fill"
                      style={{ width: `${Math.min(100, rec.impact_pct)}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-xs font-mono text-violet-500 tabular-nums font-semibold">
                    +{rec.impact_pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill gap analysis */}
          <div className="glass-card p-7 sm:p-8">
            <div className="mb-6">
              <h2 className="section-label">Skill Gap Analysis</h2>
              <p className="mt-1.5 text-xs text-[var(--text-muted)]">Your current level vs what {result.role} requires</p>
            </div>
            <div className="space-y-3">
              {result.skill_gaps.slice(0, 6).map((g) => (
                <SkillGapBar key={g.skill} skill={g.skill} studentPct={g.student_pct} importancePct={g.importance_pct} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}