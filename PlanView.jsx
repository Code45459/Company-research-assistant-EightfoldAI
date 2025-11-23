import { useState } from "react";
import { updatePlanSection } from "../api";

export default function PlanView({ plan, sessionId, onPlanUpdated }) {
  const [selectedSection, setSelectedSection] = useState(null);
  const [instruction, setInstruction] = useState("");

  if (!plan) return null;

  const handleUpdate = async (key) => {
  if (!instruction.trim()) return;
  const res = await updatePlanSection(sessionId, key, instruction);
  onPlanUpdated(res.data);   // backend returns updated plan
  setInstruction("");
  setSelectedSection(null);
};


  return (
    <div id="plan-container" className="plan-section">
      <h2>📄 Account Plan</h2>

      {Object.entries(plan).map(([key, val]) => (
        <div key={key} className="plan-card">
          <div className="plan-title">
            📌 {key.replace(/_/g, " ").toUpperCase()}
          </div>
          <div dangerouslySetInnerHTML={{ __html: val }} />

          <button
            className="update-btn"
            onClick={() => setSelectedSection(selectedSection === key ? null : key)}
          >
            ✏ Update Section
          </button>

          {selectedSection === key && (
            <div className="update-box">
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Describe what to update"
              />
              <button className="primary-btn" onClick={() => handleUpdate(key)}>
                Save Update
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
