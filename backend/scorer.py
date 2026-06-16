import csv
import numpy as np
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'data'
C_FILE = DATA_DIR / 'course_skill_pivot_86.csv'
J_FILE = DATA_DIR / 'role_skill_pivot_filtered_86.csv'

GRADE_MAP = {'A': 1.0, 'B': 0.75, 'C': 0.50, 'D': 0.25, 'F': 0.0}
NUM_TO_GRADE = {v: k for k, v in GRADE_MAP.items()}

class Scorer:
    def __init__(self):
        self.course_names, self.skill_names, self.C = self._load_matrix(
            C_FILE, 'Course_Name', {'Course_Code', 'Course_Name'}
        )
        self.role_names, _, J_raw = self._load_matrix(
            J_FILE, 'Role', {'Role', 'Job Count'}
        )
        self.J = np.array([row / (np.linalg.norm(row) + 1e-10) for row in J_raw])

    def _load_matrix(self, path, row_key, col_skip):
        with open(path) as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        col_names = [c for c in reader.fieldnames if c not in col_skip]
        row_names = []
        data = []
        for r in rows:
            row_names.append(r[row_key])
            data.append([float(r[c]) / 100.0 for c in col_names])
        return row_names, col_names, np.array(data)

    def parse_grade(self, raw):
        if raw is None:
            return 0.0
        raw = str(raw).strip()
        if '/' in raw:
            score, max_score = raw.split('/', 1)
            val = float(score) / float(max_score)
            return max(0.0, min(1.0, val))
        return GRADE_MAP.get(raw.upper(), 0.0)

    def _cosine_sim(self, a, b):
        denom = np.linalg.norm(a) * np.linalg.norm(b)
        return float(np.dot(a, b) / denom) if denom != 0 else 0.0

    def forward(self, grades_dict):
        g = np.zeros(len(self.course_names))
        for cn, grade in grades_dict.items():
            if cn in self.course_names:
                idx = self.course_names.index(cn)
                g[idx] = self.parse_grade(grade)

        p = self.C.T @ g
        max_p = self.C.T @ np.ones(len(self.course_names))

        results = []
        for j in range(len(self.role_names)):
            raw = float(np.dot(p, self.J[j]))
            mf = float(np.dot(max_p, self.J[j]))
            fit_pct = round(raw / mf * 100, 1) if mf > 0 else 0.0
            results.append({
                'role': self.role_names[j],
                'score': fit_pct,
                'raw_score': round(raw, 4),
                'max_score': round(mf, 4),
            })
        results.sort(key=lambda x: -x['score'])

        top_skills = sorted(
            zip(self.skill_names, p),
            key=lambda x: -x[1]
        )[:10]
        top_skills_list = [
            {'skill': s, 'value': round(float(v), 4)}
            for s, v in top_skills
        ]

        return {
            'rankings': results,
            'top_skills': top_skills_list,
            'courses_taken': len(grades_dict),
            'student_grades': {
                cn: {'input': raw, 'numeric': round(float(g[self.course_names.index(cn)]), 4)}
                for cn, raw in grades_dict.items() if cn in self.course_names
            }
        }

    def reverse(self, target_role):
        if target_role not in self.role_names:
            raise ValueError(f"Unknown role: {target_role}. Available: {self.role_names}")

        job_idx = self.role_names.index(target_role)
        target = self.J[job_idx]

        course_scores = []
        for i, cn in enumerate(self.course_names):
            sim = self._cosine_sim(self.C[i], target)
            if sim > 0.001:
                course_scores.append({
                    'course': cn,
                    'similarity': round(sim, 4),
                })
        course_scores.sort(key=lambda x: -x['similarity'])

        job_skills = sorted(
            zip(self.skill_names, target),
            key=lambda x: -x[1]
        )[:10]
        top_job_skills_list = [
            {'skill': s, 'value': round(float(v), 4)}
            for s, v in job_skills
        ]

        return {
            'role': target_role,
            'top_similarity': round(course_scores[0]['similarity'] if course_scores else 0, 4),
            'courses': course_scores,
            'top_job_skills': top_job_skills_list
        }

    def backward(self, grades_dict, target_role):
        if target_role not in self.role_names:
            raise ValueError(f"Unknown role: {target_role}. Available: {self.role_names}")

        job_idx = self.role_names.index(target_role)
        J_j = self.J[job_idx]

        g = np.zeros(len(self.course_names))
        taken_courses = set()
        for cn, grade in grades_dict.items():
            if cn in self.course_names:
                idx = self.course_names.index(cn)
                g[idx] = self.parse_grade(grade)
                taken_courses.add(cn)

        p = self.C.T @ g
        max_p = self.C.T @ np.ones(len(self.course_names))

        raw_fit = float(np.dot(p, J_j))
        max_fit = float(np.dot(max_p, J_j))
        fit_pct = round(raw_fit / max_fit * 100, 1) if max_fit > 0 else 0.0

        max_j = float(max(J_j))
        max_p_skill = float(np.max(max_p)) if np.max(max_p) > 0 else 1.0

        recommendations = []
        for i, cn in enumerate(self.course_names):
            if cn in taken_courses:
                continue
            impact = float(np.dot(self.C[i], J_j))
            if impact < 0.001:
                continue
            impact_pct = round(impact / max_fit * 100, 1) if max_fit > 0 else 0.0
            recommendations.append({
                'course': cn,
                'impact': round(impact, 4),
                'impact_pct': impact_pct,
            })
        recommendations.sort(key=lambda x: -x['impact'])

        skill_gaps = []
        job_skills = sorted(
            zip(self.skill_names, J_j),
            key=lambda x: -x[1]
        )[:10]
        for skill, importance in job_skills:
            student_val = float(p[self.skill_names.index(skill)])
            student_norm = round(student_val / max_p_skill * 100, 1)
            imp_pct = round(float(importance) / max_j * 100, 1) if max_j > 0 else 0
            skill_gaps.append({
                'skill': skill,
                'student_pct': student_norm,
                'importance_pct': imp_pct,
            })

        top_strengths_list = []
        if np.max(p) > 0:
            top_strengths = sorted(
                zip(self.skill_names, p),
                key=lambda x: -x[1]
            )[:5]
            top_strengths_list = [
                {'skill': s, 'value': round(float(v), 4)}
                for s, v in top_strengths
            ]

        return {
            'role': target_role,
            'fit_pct': fit_pct,
            'raw_fit': round(raw_fit, 4),
            'max_fit': round(max_fit, 4),
            'courses_taken': len(taken_courses),
            'total_courses': len(self.course_names),
            'recommendations': recommendations,
            'skill_gaps': skill_gaps,
            'top_strengths': top_strengths_list,
        }
