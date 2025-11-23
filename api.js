import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const updatePlanSection = (sessionId, sectionKey, instruction) => {
  return API.post("/session/plan/update", {
    session_id: sessionId,
    section_key: sectionKey,
    instruction: instruction
  });
};
