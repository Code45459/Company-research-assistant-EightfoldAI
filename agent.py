import uuid
import json
from typing import Dict

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import PromptTemplate

from langchain_community.chat_message_histories import ChatMessageHistory

from prompts import ACCOUNT_PLAN_SYSTEM_PROMPT


llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",   # fast & best for this workflow
    temperature=0.4
)


class ResearchSession:
    def __init__(self, company: str):
        self.id = str(uuid.uuid4())
        self.company = company
        self.history = ChatMessageHistory()
        self.plan = None


class CompanyResearchAgent:
    def __init__(self):
        self.sessions: Dict[str, ResearchSession] = {}

    def start(self, company: str):
        session = ResearchSession(company)
        self.sessions[session.id] = session

        welcome = (
            f"🔍 Starting research on **{company}**.\n"
            f"What would you like to explore first?\n"
            f"(competition, financials, hiring, products, leadership, risks, etc.)"
        )

        session.history.add_message(AIMessage(content=welcome))
        return session.id, welcome

    def chat(self, session_id: str, user_msg: str):
        session = self.sessions[session_id]

        session.history.add_message(HumanMessage(content=user_msg))
        recent = session.history.messages[-6:]
        reply = llm.invoke(recent)
        session.history.add_message(reply)

        return reply.content

    def generate_plan(self, session_id: str):
        session = self.sessions[session_id]

    # Prepare transcript text
        transcript = ""
        for msg in session.history.messages:
            role = "User" if isinstance(msg, HumanMessage) else "Assistant"
            transcript += f"{role}: {msg.content}\n"

    # Feed the entire plan prompt + transcript to the model
        full_prompt = ACCOUNT_PLAN_SYSTEM_PROMPT + "\n\nConversation transcript:\n" + transcript

        raw_output = llm.invoke([HumanMessage(content=full_prompt)]).content

        try:
            plan = json.loads(raw_output)
        except Exception:
        # Fallback if AI didn't return JSON (never break)
            plan = {
            "company_overview": raw_output,
            "products_services": "",
            "market_competition": "",
            "financials_growth": "",
            "technology_stack": "",
            "hiring_org": "",
            "decision_makers": "",
            "pain_points": "",
            "opportunities": "",
            "risks": "",
            "strategy_next_steps": "",
            }

        session.plan = plan
        return plan


    def update_plan(self, session_id: str, section: str, instruction: str):
        session = self.sessions[session_id]
        if session.plan is None:
            raise ValueError("Please generate plan first.")

        current = session.plan[section]
        prompt = (
            f"Rewrite ONLY this section:\n\n{current}\n\n"
            f"Instruction: {instruction}\n"
            f"Return only the rewritten Markdown paragraph."
        )

        updated = llm.invoke([HumanMessage(content=prompt)]).content
        session.plan[section] = updated

        return session.plan
