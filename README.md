# Company-research-assistant-EightfoldAI

🚀 AI Company Research & Account Plan Assistant

This project is an interactive AI agent that helps users research companies through natural conversation and automatically generates an Account Plan. The user can chat, request deeper research, download results as PDF, and even update specific sections of the generated plan.

✨ Key Features
| Feature                                               | Status |
| ----------------------------------------------------- | ------ |
| AI chat-based company research                        | ✔      |
| Structured JSON account plan generation               | ✔      |
| Section-wise plan update (rewrite only selected part) | ✔      |
| Dark / Light mode                                     | ✔      |
| Download account plan as PDF                          | ✔      |
| Gemini LLM via LangChain                              | ✔      |
| Fully modular FastAPI + React architecture            | ✔      |

🧠 How It Works
User → React UI → FastAPI backend → Gemini via LangChain → Returns insights / plans

System Workflow

1️⃣ User starts a research session with a company name
2️⃣ User asks research questions naturally via chat
3️⃣ AI collects information, highlights uncertainty, and refines research
4️⃣ User generates a full account plan in structured format
5️⃣ User can update any specific section with instructions
6️⃣ User downloads account plan as PDF

🏗 System Architecture
┌─────────────────────────────┐
│ React Frontend              │
│ • Chat UI                   │
│ • Plan viewer + updater     │
│ • PDF export                │
└──────────────▲──────────────┘
               │ Axios
               ▼
┌─────────────────────────────┐
│ FastAPI Backend             │
│ • Research endpoints        │
│ • Plan generation           │
│ • Section update            │
└──────────────▲──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ CompanyResearchAgent        │
│ • Session memory            │
│ • Chat history              │
│ • Plan state management     │
└──────────────▲──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Gemini via LangChain        │
│ • Natural conversation      │
│ • Research synthesis        │
│ • JSON plan generation      │
│ • Instruction-based rewrite │
└─────────────────────────────┘

🛠 Tech Stack
| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React, Axios, jsPDF, html2canvas |
| Styling  | CSS (chat bubbles + dark mode)   |
| Backend  | FastAPI                          |
| AI       | LangChain + Gemini 2.5 Flash     |
| State    | In-memory session object         |

📁 Project Structure
├── backend
│   ├── main.py               # FastAPI endpoints
│   ├── agent.py              # Research + plan logic
│   ├── models.py             # Pydantic schemas
│   └── requirements.txt
|
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── components
│   │   │   ├── ChatBox.jsx
│   │   │   └── PlanView.jsx
│   │   └── utils
│   │       └── formatter.js
│   └── styles.css

🚀 Running the Project
1️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at → http://localhost:8000

2️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs at → http://localhost:3000

🔥 Usage Instructions

1️⃣ Enter a company name and click Start Research
2️⃣ Chat naturally — ask questions like:

What are Apple's competitors?
Show me their growth opportunities.


3️⃣ Click Generate Account Plan
4️⃣ To update a plan section:

Example input: "Add Apple Vision Pro opportunities related to XR market"


5️⃣ Click Download as PDF to export final plan

🤖 Example Output Sections

Company Overview

Products & Services

Market Competition

Financials & Growth

Technology Stack

Hiring & Org Structure

Decision Makers

Pain Points

Opportunities

Risks

Strategy & Next Steps

🧩 Future Enhancements (Roadmap)

✔ Voice input for chat
✔ Auto-highlight updated plan sections
✔ Version history for account plan revisions
✔ Option to export to Word / PowerPoint

⭐ Contribution

Pull requests are welcome!
If you’d like to collaborate on this project → feel free to fork & contribute.

📄 License

This project is licensed under the MIT License — free for personal and commercial use.
