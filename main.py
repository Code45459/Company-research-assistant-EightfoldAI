from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent import CompanyResearchAgent

app = FastAPI()
agent = CompanyResearchAgent()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class StartRequest(BaseModel):
    company: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


class PlanRequest(BaseModel):
    session_id: str


class UpdateRequest(BaseModel):
    session_id: str
    section: str
    instruction: str


@app.post("/session/start")
def start(req: StartRequest):
    session_id, reply = agent.start(req.company)
    return {"session_id": session_id, "message": reply}


@app.post("/session/chat")
def chat(req: ChatRequest):
    reply = agent.chat(req.session_id, req.message)
    return {"reply": reply}


@app.post("/session/plan")
def plan(req: PlanRequest):
    return agent.generate_plan(req.session_id)


@app.post("/session/plan/update")
def update(req: UpdateRequest):
    return agent.update_plan(req.session_id, req.section, req.instruction)
