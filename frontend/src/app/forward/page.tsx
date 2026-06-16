'use client';

import { useState, useEffect } from 'react';
import { fetchCourses, postForward } from '@/lib/api';
import type { ForwardResponse } from '@/lib/types';
import CourseGradeInput from '@/components/CourseGradeInput';
import { JobRankingTable, SkillProfileChart } from '@/components/Tables';

export default function ForwardPage() {
  const [courses, setCourses] = useState<string[]>([]);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ForwardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch(() => setError('Failed to load courses. Is the backend running?'));
  }, []);

  const handleRun = async () => {
    if (Object.keys(grades).length === 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await postForward(grades);
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

  const top = result?.rankings[0];

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 animate-fade-in-down">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-600/5 border border-violet-500/15 shadow-lg shadow-violet-500/5">
          <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Forward Mapping</h1>
          <p className="text-sm text-[var(--text-secondary)]">Enter your grades to discover your best-fit job roles.</p>
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
      <div className="glass-card p-7 sm:p-8">
        <h2 className="section-label mb-5">Your Grades</h2>
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
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleRun}
            disabled={Object.keys(grades).length === 0 || loading}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Run Forward Mapping
              </>
            )}
          </button>
          <button onClick={handleReset} disabled={loading} className="btn-ghost px-6 py-3 text-sm">
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Insight banner */}
          {top && (
            <div className="glow-card p-6 animate-fade-in-scale">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 animate-pulse-glow">
                  <svg className="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Top Match: {top.role}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Your skill profile aligns <span className="text-violet-500 font-semibold">{top.score}%</span> with {top.role}.
                    {result.rankings[1] && (
                      <> Also a strong match with <span className="text-blue-500 font-medium">{result.rankings[1].role}</span> ({result.rankings[1].score}%).</>
                    )}
                    {' '}Weakest: <span className="text-[var(--text-secondary)]">{result.rankings[result.rankings.length - 1].role}</span> ({result.rankings[result.rankings.length - 1].score}%).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rankings */}
          <div className="glass-card p-7 sm:p-8">
            <JobRankingTable rankings={result.rankings} />
          </div>

          {/* Skills */}
          <div className="glass-card p-7 sm:p-8">
            <SkillProfileChart skills={result.top_skills} />
          </div>
        </div>
      )}
    </div>
  );
}
