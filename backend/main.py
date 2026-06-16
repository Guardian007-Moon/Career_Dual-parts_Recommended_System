from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

from scorer import Scorer

app = FastAPI(title="Course-Job Scoring API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

scorer = Scorer()

class ForwardRequest(BaseModel):
    grades: Dict[str, str]

class ReverseRequest(BaseModel):
    role: str

class BackwardRequest(BaseModel):
    grades: Dict[str, str]
    role: str

@app.get("/api/courses")
def get_courses():
    return {"courses": scorer.course_names}

@app.get("/api/roles")
def get_roles():
    return {"roles": scorer.role_names}

@app.get("/api/skills")
def get_skills():
    return {"skills": scorer.skill_names}

@app.post("/api/forward")
def forward(req: ForwardRequest):
    try:
        result = scorer.forward(req.grades)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/reverse")
def reverse(req: ReverseRequest):
    try:
        result = scorer.reverse(req.role)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/backward")
def backward(req: BackwardRequest):
    try:
        result = scorer.backward(req.grades, req.role)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
