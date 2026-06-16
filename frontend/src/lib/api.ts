const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function fetchCourses(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/courses`);
  const data = await res.json();
  return data.courses;
}

export async function fetchRoles(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/roles`);
  const data = await res.json();
  return data.roles;
}

export async function fetchSkills(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/skills`);
  const data = await res.json();
  return data.skills;
}

export async function postForward(
  grades: Record<string, string>
): Promise<import('./types').ForwardResponse> {
  const res = await fetch(`${API_BASE}/api/forward`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grades }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Forward mapping failed');
  }
  return res.json();
}

export async function postReverse(
  role: string
): Promise<import('./types').ReverseResponse> {
  const res = await fetch(`${API_BASE}/api/reverse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Reverse mapping failed');
  }
  return res.json();
}

export async function postBackward(
  grades: Record<string, string>,
  role: string
): Promise<import('./types').BackwardResponse> {
  const res = await fetch(`${API_BASE}/api/backward`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grades, role }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Backward mapping failed');
  }
  return res.json();
}
