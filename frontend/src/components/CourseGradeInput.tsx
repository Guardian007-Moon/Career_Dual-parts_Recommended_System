'use client';

import { useState } from 'react';

interface CourseGradeInputProps {
  courses: string[];
  grades: Record<string, string>;
  onChange: (course: string, value: string) => void;
  onRemove: (course: string) => void;
  disabled?: boolean;
}

export default function CourseGradeInput({
  courses, grades, onChange, onRemove, disabled,
}: CourseGradeInputProps) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const available = courses.filter((c) => !(c in grades));

  const handleAdd = () => {
    if (selectedCourse && !(selectedCourse in grades)) {
      onChange(selectedCourse, '');
      setSelectedCourse('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2.5">
        <select
          className="modern-select flex-1 px-4 py-3 text-sm"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select a course...</option>
          {available.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          onClick={handleAdd}
          disabled={!selectedCourse || disabled}
          className="btn-primary px-6 py-3 text-sm shrink-0"
        >
          + Add
        </button>
      </div>

      {Object.entries(grades).length > 0 && (
        <div className="space-y-2 stagger-children">
          {Object.entries(grades).map(([course, value]) => (
            <div
              key={course}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] group"
            >
              <span className="flex-1 truncate text-sm font-medium text-[var(--text-secondary)]">
                {course}
              </span>
              <input
                className="modern-input w-28 px-3 py-2 text-sm text-center"
                placeholder="A or 85/100"
                value={value}
                onChange={(e) => onChange(course, e.target.value)}
                disabled={disabled}
              />
              <button
                onClick={() => onRemove(course)}
                disabled={disabled}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-500 opacity-40 group-hover:opacity-100 disabled:opacity-20"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-[var(--text-muted)]">
        Letter grades (A–F) or raw scores (e.g. 85/100, 14/20)
      </p>
    </div>
  );
}
