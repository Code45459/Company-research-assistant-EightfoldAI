import { useState } from "react";
import { API } from "../api";
import { autoFormatResponse } from "../utils/formatter";

export default function ChatBox({ sessionId, onStructuredReply }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    setMessages((m) => [...m, { role: "user", content: input }]);

    const res = await API.post("/session/chat", {
      session_id: sessionId,
      message: input,
    });

    let reply = res.data.reply;
    setInput("");

    try {
      const structured = JSON.parse(reply);
      onStructuredReply(structured);
      setMessages((m) => [...m, { role: "assistant", content: "(Structured response displayed below)" }]);
      return;
    } catch {}

    const formatted = autoFormatResponse(reply);
    setMessages((m) => [...m, { role: "assistant", content: formatted, isHtml: true }]);
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.role}`}>
            {msg.isHtml
              ? <span dangerouslySetInnerHTML={{ __html: msg.content }} />
              : msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />
        <button className="primary-btn send-btn" onClick={send}>Send</button>
      </div>
    </div>
  );
}
