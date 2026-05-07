"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Zap, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "mentor";
  content: string;
  timestamp: Date;
}

const starterPrompts = [
  "Explain how TCP handles packet loss",
  "What's the difference between mutex and semaphore?",
  "How does consistent hashing work?",
  "Review my API design for a URL shortener",
  "Explain CAP theorem with examples",
  "How do B+ trees handle insertions?",
];

const mentorResponses: Record<string, string> = {
  default: "Great question! Let me break this down for you.\n\nAs a senior engineer, I'd approach this by first understanding the fundamentals, then diving into implementation details.\n\nWhat specific aspect would you like me to focus on? I can cover:\n1. Core concepts and intuition\n2. Implementation patterns\n3. Common pitfalls\n4. Interview-ready explanations",
  tcp: "**TCP Packet Loss Recovery**\n\nTCP handles packet loss through several mechanisms:\n\n1. **Sequence Numbers**: Every byte is numbered, so the receiver knows what's missing\n2. **ACK Timeout**: If sender doesn't get ACK within RTO (Retransmission Timeout), it resends\n3. **Fast Retransmit**: 3 duplicate ACKs trigger immediate retransmission without waiting for timeout\n4. **Selective ACK (SACK)**: Receiver tells sender exactly which segments are missing\n\nThe key insight: TCP treats the network as unreliable and builds reliability on top. This is why it's slower than UDP but guarantees delivery.\n\nWant me to dive deeper into congestion control algorithms?",
  mutex: "**Mutex vs Semaphore — The Key Difference**\n\n**Mutex** (Mutual Exclusion):\n- Binary lock: locked or unlocked\n- OWNERSHIP: only the thread that locked can unlock\n- Used for: protecting critical sections\n\n**Semaphore**:\n- Counter-based: can allow N concurrent accesses\n- NO OWNERSHIP: any thread can signal\n- Used for: limiting concurrency, producer-consumer\n\n**Mental Model:**\n- Mutex = bathroom key (one person, same person returns it)\n- Semaphore = parking lot (N spots, anyone can leave)\n\nCommon mistake: using semaphore(1) as mutex. They're semantically different — mutex has priority inversion handling.",
};

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "mentor", content: "Hey Engineer! 👋 I'm your AI mentor — think of me as a senior backend engineer who's been through the trenches.\n\nI can help you with:\n• Explaining complex concepts simply\n• Reviewing your architecture decisions\n• Debugging tricky issues\n• Interview preparation\n• Project guidance\n\nWhat would you like to dive into?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    const lower = input.toLowerCase();
    let response = mentorResponses.default;
    if (lower.includes("tcp") || lower.includes("packet")) response = mentorResponses.tcp;
    if (lower.includes("mutex") || lower.includes("semaphore")) response = mentorResponses.mutex;
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "mentor", content: response, timestamp: new Date() }]);
    }, 800);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[900px] mx-auto flex flex-col" style={{ height: "calc(100vh - 80px)" }}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold gradient-text">AI Mentor</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>Your personal senior engineer. Ask anything about backend systems.</p>
      </div>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: msg.role === "mentor" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(6,182,212,0.15)" }}>
              {msg.role === "mentor" ? <Bot size={16} className="text-white" /> : <User size={16} style={{ color: "#06b6d4" }} />}
            </div>
            <div className="max-w-[75%] rounded-xl px-4 py-3" style={{ background: msg.role === "mentor" ? "var(--color-surface)" : "rgba(99,102,241,0.08)", border: `1px solid ${msg.role === "mentor" ? "var(--color-border)" : "rgba(99,102,241,0.15)"}` }}>
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: line.startsWith("**") ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: line.startsWith("**") ? 600 : 400, marginTop: line === "" ? 8 : 1 }}>{line.replace(/\*\*/g, "")}</p>
              ))}
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>
      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {starterPrompts.map((prompt) => (
            <button key={prompt} onClick={() => { setInput(prompt); }} className="px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <Sparkles size={10} className="inline mr-1" style={{ color: "#6366f1" }} />{prompt}
            </button>
          ))}
        </div>
      )}
      {/* Input */}
      <div className="flex gap-3 items-center">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask your mentor anything..." className="flex-1 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }} />
        <button onClick={sendMessage} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))" }}>
          <Send size={16} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
