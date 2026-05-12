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

const fallbackReply =
  "FitBot could not complete the live AI response. Keep this set pain-free, reduce the pace, and retry in a moment.";

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
    let receivedText = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/fitbot/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: controller.signal,
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

        for (const event of events) {
          const line = event.split("\n").find((item) => item.startsWith("data:"));
          if (!line) continue;

          const rawPayload = line.replace("data:", "").trim();
          if (!rawPayload || rawPayload === "[DONE]") continue;

          let payload;
          try {
            payload = JSON.parse(rawPayload);
          } catch (_error) {
            continue;
          }

          if (payload.sessionId) setSessionId(payload.sessionId);
          if (payload.type === "delta") {
            receivedText = true;
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
        }
      }

      if (!receivedText) {
        setMessages((current) => {
          const next = [...current];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: fallbackReply };
          return next;
        });
      }
    } catch (error) {
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        const message =
          error.name === "AbortError"
            ? "FitBot took too long to respond. Try a shorter prompt or use a quick action."
            : error.message || fallbackReply;
        next[next.length - 1] = { ...last, content: message };
        return next;
      });
    } finally {
      clearTimeout(timeoutId);
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
