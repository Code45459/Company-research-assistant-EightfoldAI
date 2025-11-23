import { useState } from "react";
import { API } from "./api";
import ChatBox from "./components/ChatBox";
import PlanView from "./components/PlanView";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./styles.css";

export default function App() {
  const [company, setCompany] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [plan, setPlan] = useState(null);
  const [dark, setDark] = useState(false);

  const startSession = async () => {
    const res = await API.post("/session/start", { company });
    setSessionId(res.data.session_id);
  };

  const generatePlan = async () => {
    const res = await API.post("/session/plan", { session_id: sessionId });
    setPlan(res.data);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("plan-container");
    const canvas = await html2canvas(element, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, width, height);
    pdf.save(`${company}_Account_Plan.pdf`);
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <button className="dark-toggle" onClick={() => setDark(!dark)}>
        {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className="title">🤖 AI Company Research Assistant</h1>

      {!sessionId && (
        <div className="start-card">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
          />
          <button className="primary-btn" onClick={startSession}>Start Research</button>
        </div>
      )}

      {sessionId && (
        <>
          <ChatBox sessionId={sessionId} onStructuredReply={setPlan} />

          <button className="primary-btn gen-btn" onClick={generatePlan}>
            Generate Account Plan
          </button>

          {plan && (
            <>
              <PlanView
                plan={plan}
                sessionId={sessionId}
                onPlanUpdated={setPlan}
              />
              <button className="primary-btn" onClick={downloadPDF}>
                ⬇ Download as PDF
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
