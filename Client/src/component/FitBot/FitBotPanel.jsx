import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../api/axiosInstance";
import "./fitbot.css";

const quickPrompts = [
  "I'm feeling tired today",
  "Alternative for knee pain",
  "Make this home workout only",
  "Reduce intensity for this set",
];

const FitBotPanel = ({ workoutContext }) => {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I can adapt your active workout using your profile, AI plan, and current exercise.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [streaming, setStreaming] = useState(false);

  const sendMessage = async (message) => {
    const cleanMessage = message.trim();
    if (!cleanMessage || streaming) return;

    setMessages((current) => [...current, { role: "user", content: cleanMessage }, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/fitbot/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: cleanMessage, sessionId, workoutContext }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "FitBot is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        events.forEach((event) => {
          const line = event.split("\n").find((item) => item.startsWith("data:"));
          if (!line) return;

          const payload = JSON.parse(line.replace("data:", "").trim());
          if (payload.sessionId) setSessionId(payload.sessionId);
          if (payload.type === "delta") {
            setMessages((current) => {
              const next = [...current];
              const last = next[next.length - 1];
              next[next.length - 1] = { ...last, content: `${last.content}${payload.text}` };
              return next;
            });
          }
          if (payload.type === "error") {
            throw new Error(payload.message);
          }
        });
      }
    } catch (error) {
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: error.message };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  if (!user?.isPremium) {
    return (
      <aside className="fitbot-panel locked">
        <span>FitBot</span>
        <h2>Premium live coaching</h2>
        <p>Upgrade to ask FitBot for fatigue adjustments, pain-aware substitutions, and home/gym swaps during workouts.</p>
        <Link to="/membership">Unlock FitBot</Link>
      </aside>
    );
  }

  return (
    <aside className="fitbot-panel">
      <div className="fitbot-heading">
        <div>
          <span>FitBot</span>
          <h2>Live workout coach</h2>
        </div>
        <small>{workoutContext?.phase || "workout"}</small>
      </div>

      <div className="fitbot-messages">
        {messages.map((message, index) => (
          <div className={`fitbot-message ${message.role}`} key={`${message.role}-${index}`}>
            {message.content || "Thinking..."}
          </div>
        ))}
      </div>

      <div className="fitbot-prompts">
        {quickPrompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={streaming}>
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="fitbot-form"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(input);
        }}
      >
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask FitBot to adapt this workout..." />
        <button type="submit" disabled={streaming}>Send</button>
      </form>
    </aside>
  );
};

export default FitBotPanel;
