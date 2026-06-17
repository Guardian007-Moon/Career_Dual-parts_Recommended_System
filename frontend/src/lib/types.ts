export interface JobRanking {
  role: string;
  score: number;
  raw_score: number;
  max_score: number;
}

export interface StudentSkill {
  skill: string;
  value: number;
}

export interface StudentGrade {
  input: string;
  numeric: number;
}

export interface ForwardResponse {
  rankings: JobRanking[];
  top_skills: StudentSkill[];
  courses_taken: number;
  student_grades: Record<string, StudentGrade>;
}

export interface GradeTarget {
  course: string;
  target: number;
  importance_pct: number;
  letter: string;
}

export interface ReverseResponse {
  role: string;
  regularization_lambda: number;
  residual_norm: number;
  total_grade_mass: number;
  fit_if_achieved: number;
  solver_status: number;
  solver_message: string;
  grade_targets: GradeTarget[];
  top_job_skills: StudentSkill[];
}

export interface CourseRecommendation {
  course: string;
  impact: number;
  impact_pct: number;
}

export interface SkillGap {
  skill: string;
  student_pct: number;
  importance_pct: number;
}

export interface BackwardResponse {
  role: string;
  fit_pct: number;
  raw_fit: number;
  max_fit: number;
  courses_taken: number;
  total_courses: number;
  recommendations: CourseRecommendation[];
  skill_gaps: SkillGap[];
  top_strengths: { skill: string; value: number }[];
}

export interface ApiError {
  detail: string;
}
