'use client';

import { useState } from 'react';

/* ── Progress Bar ── */

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  suffix?: string;
  size?: 'sm' | 'md';
  delay?: number;
}

function ProgressBar({ label, value, maxValue = 1, color, suffix = '', size = 'sm', delay = 0 }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const barColor = color || (
    pct > 60 ? 'from-emerald-400 to-emerald-500'
    : pct > 30 ? 'from-amber-400 to-amber-500'
    : 'from-rose-400 to-rose-500'
  );
  const height = size === 'md' ? 'h-3' : 'h-2';

  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-sm text-[var(--text-secondary)] font-medium leading-snug">{label}</span>
      <div className={`min-w-20 flex-1 ${height} rounded-full bg-[var(--bg-card)] ring-1 ring-[var(--border)] overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} animate-bar-fill`}
          style={{ width: `${pct}%`, animationDelay: `${delay}ms` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-xs font-mono text-[var(--text-secondary)] tabular-nums font-semibold">
        {value.toFixed(1)}{suffix}
      </span>
    </div>
  );
}

/* ── Job Ranking Table ── */

interface JobRankingTableProps {
  rankings: { role: string; score: number }[];
}

export function JobRankingTable({ rankings }: JobRankingTableProps) {
  const maxScore = Math.max(...rankings.map((r) => r.score));

  return (
    <div className="space-y-5">
      <div>
        <h3 className="section-label">Job Rankings</h3>
        <p className="mt-1.5 text-xs text-[var(--text-muted)]">
          Fit percentage — how aligned your profile is with each role
        </p>
      </div>
      <div className="space-y-3 stagger-children">
        {rankings.map((r, i) => {
          const pct = maxScore > 0 ? Math.max(0, Math.min(100, (r.score / maxScore) * 100)) : 0;
          const barColor = pct > 60
            ? 'from-emerald-400 to-emerald-500'
            : pct > 30
            ? 'from-amber-400 to-amber-500'
            : 'from-rose-400 to-rose-500';
          return (
            <div key={r.role} className="p-2 rounded-xl hover:bg-[var(--bg-card)] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                  i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-default'
                }`}>
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 text-sm text-[var(--text-secondary)] font-medium leading-snug">{r.role}</span>
                <span className="shrink-0 text-xs font-mono text-[var(--text-secondary)] tabular-nums font-semibold">
                  {r.score.toFixed(1)}%
                </span>
              </div>
              <div className="ml-10 h-3 rounded-full bg-[var(--bg-card)] ring-1 ring-[var(--border)] overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barColor} animate-bar-fill`}
                  style={{ width: `${pct}%`, animationDelay: `${i * 80}ms` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Skill Profile Chart ── */

interface SkillProfileProps {
  skills: { skill: string; value: number }[];
}

export function SkillProfileChart({ skills }: SkillProfileProps) {
  const maxVal = Math.max(...skills.map((s) => s.value));
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? skills : skills.slice(0, 5);

  return (
    <div className="space-y-5">
      <h3 className="section-label">Top Skills in Profile</h3>
      <div className="space-y-2.5">
        {displayed.map((s, i) => (
          <ProgressBar key={s.skill} label={s.skill} value={s.value} maxValue={maxVal} delay={i * 60} />
        ))}
      </div>
      {skills.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-violet-500 transition-colors duration-200 hover:text-violet-400 flex items-center gap-1.5"
        >
          {showAll ? (
            <>Show less <span className="text-[10px]">↑</span></>
          ) : (
            <>Show all {skills.length} skills <span className="text-[10px]">↓</span></>
          )}
        </button>
      )}
    </div>
  );
}
