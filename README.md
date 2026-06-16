# Course-Job Scoring App

Full-stack application for the Course-Job Scoring System.

## Architecture

```
course-job-app/
├── backend/          # FastAPI (Python)
│   ├── main.py       # API endpoints
│   ├── scorer.py     # Math: forward + reverse mapping
│   └── data/         # C and J matrices (CSV)
└── frontend/         # Next.js (TypeScript + Tailwind)
    └── src/
        ├── app/          # Pages
        ├── components/   # Reusable UI
        └── lib/          # API client + types
```

## Run Locally

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/courses` | List all 28 courses |
| GET | `/api/roles` | List all 4 job roles |
| GET | `/api/skills` | List all 86 skills |
| POST | `/api/forward` | Grades → job rankings |
| POST | `/api/reverse` | Target job → expected grades |

## Deploy

- **Frontend:** Push to GitHub → Vercel (free, connect repo)
- **Backend:** Push to GitHub → Render (free tier) or Railway

Set `NEXT_PUBLIC_API_URL` to your deployed backend URL.
