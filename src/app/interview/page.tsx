"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swords, ChevronRight, Clock, Star, Zap, Code, Database, Network, Globe, Cpu, CheckCircle2, Lightbulb } from "lucide-react";

const categories = [
  { id: "backend", label: "Backend", icon: Code, color: "#6366f1" },
  { id: "databases", label: "Databases", icon: Database, color: "#10b981" },
  { id: "networking", label: "Networking", icon: Network, color: "#06b6d4" },
  { id: "system-design", label: "System Design", icon: Globe, color: "#f59e0b" },
  { id: "os", label: "OS & Concurrency", icon: Cpu, color: "#8b5cf6" },
];

const questions = [
  { id: "q1", category: "backend", title: "Design a Rate Limiter", difficulty: 3, type: "System Design", estimatedMinutes: 30, xpReward: 80, question: "Design a distributed rate limiter. Consider token bucket vs sliding window tradeoffs.", hints: ["Start single-server then scale", "Redis for atomic counters", "Handle race conditions"], sampleAnswer: "Use token bucket with Redis. Key: rate_limit:{user}:{window}. Use MULTI/EXEC for atomicity. Consistent hashing for Redis sharding.", tags: ["API", "scaling", "Redis"] },
  { id: "q2", category: "system-design", title: "Design a URL Shortener", difficulty: 2, type: "System Design", estimatedMinutes: 25, xpReward: 60, question: "Design a URL shortening service. Handle 100M URLs and 1B redirects/month.", hints: ["Base62 encoding", "Read-heavy workload", "Cache popular URLs"], sampleAnswer: "Base62 encode auto-increment ID. PostgreSQL + Redis cache. 302 redirects for analytics. CDN for geo-distribution.", tags: ["system design", "caching"] },
  { id: "q3", category: "databases", title: "Explain Database Indexing", difficulty: 2, type: "Conceptual", estimatedMinutes: 15, xpReward: 40, question: "How do indexes work? Clustered vs non-clustered? When to avoid?", hints: ["B+ tree structure", "Write amplification", "Column order in composites"], sampleAnswer: "B+ tree maintaining sorted refs. Clustered = physical order (1 per table). Non-clustered = separate structure. Avoid on small tables or write-heavy columns.", tags: ["SQL", "indexing"] },
  { id: "q4", category: "networking", title: "TCP vs UDP Tradeoffs", difficulty: 1, type: "Conceptual", estimatedMinutes: 10, xpReward: 30, question: "Compare TCP and UDP. When choose each?", hints: ["Reliability vs speed", "Head-of-line blocking", "QUIC uses UDP"], sampleAnswer: "TCP: reliable, ordered (HTTP, SSH). UDP: fast, no guarantees (DNS, gaming, streaming). QUIC builds reliability on UDP.", tags: ["TCP", "UDP"] },
  { id: "q5", category: "os", title: "Explain Deadlock Conditions", difficulty: 3, type: "Conceptual", estimatedMinutes: 15, xpReward: 45, question: "Four conditions for deadlock? Prevention strategies?", hints: ["Coffman conditions", "Lock ordering", "Wait-for graphs"], sampleAnswer: "4 conditions: mutual exclusion, hold&wait, no preemption, circular wait. Prevent via lock ordering or timeout. Detect via wait-for graph cycles.", tags: ["OS", "concurrency"] },
  { id: "q6", category: "system-design", title: "Design WhatsApp", difficulty: 4, type: "System Design", estimatedMinutes: 40, xpReward: 100, question: "Design real-time chat. 1-on-1, groups, read receipts, 500M DAU.", hints: ["WebSockets", "Fan-out on write vs read", "Message ordering"], sampleAnswer: "WebSocket servers + Kafka queues + Cassandra storage. Redis for presence. Fan-out on write for small groups. Snowflake IDs for ordering.", tags: ["system design", "WebSockets"] },
];

export default function InterviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const filtered = selectedCategory ? questions.filter((q) => q.category === selectedCategory) : questions;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Interview Prep</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>Practice backend & system design interview questions with hints and sample answers.</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setSelectedCategory(null)} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: !selectedCategory ? "rgba(99,102,241,0.15)" : "var(--color-surface)", border: `1px solid ${!selectedCategory ? "rgba(99,102,241,0.3)" : "var(--color-border)"}`, color: !selectedCategory ? "#6366f1" : "var(--color-text-secondary)" }}>All ({questions.length})</button>
        {categories.map((cat) => (<button key={cat.id} onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)} className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: selectedCategory === cat.id ? `${cat.color}15` : "var(--color-surface)", border: `1px solid ${selectedCategory === cat.id ? `${cat.color}40` : "var(--color-border)"}`, color: selectedCategory === cat.id ? cat.color : "var(--color-text-secondary)" }}><cat.icon size={14} /> {cat.label}</button>))}
      </div>
      <div className="space-y-4">
        {filtered.map((q, i) => {
          const isExp = expandedQ === q.id;
          const catColor = categories.find((c) => c.id === q.category)?.color || "#6366f1";
          return (
            <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-card overflow-hidden">
              <button onClick={() => setExpandedQ(isExp ? null : q.id)} className="w-full p-5 flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${catColor}15`, color: catColor }}><Swords size={18} /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{q.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="badge badge-indigo">{q.type}</span>
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-text-muted)" }}><Clock size={10} /> {q.estimatedMinutes}m</span>
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-accent-amber)" }}><Zap size={10} /> +{q.xpReward}</span>
                    <span className="flex gap-0.5">{Array.from({ length: q.difficulty }).map((_, j) => (<Star key={j} size={9} fill="#f59e0b" style={{ color: "#f59e0b" }} />))}</span>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: "var(--color-text-muted)", transform: isExp ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {isExp && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-5 space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{q.question}</p>
                  </div>
                  <div className="flex gap-2">{q.tags.map((tag) => (<span key={tag} className="badge badge-cyan">{tag}</span>))}</div>
                  <button onClick={() => setShowHints((s) => ({ ...s, [q.id]: !s[q.id] }))} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#f59e0b" }}><Lightbulb size={14} />{showHints[q.id] ? "Hide Hints" : `Show Hints (${q.hints.length})`}</button>
                  {showHints[q.id] && <div className="space-y-1 pl-5">{q.hints.map((h, hi) => (<p key={hi} className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>💡 {h}</p>))}</div>}
                  <button onClick={() => setShowAnswer((s) => ({ ...s, [q.id]: !s[q.id] }))} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#10b981" }}><CheckCircle2 size={14} />{showAnswer[q.id] ? "Hide Answer" : "Show Sample Answer"}</button>
                  {showAnswer[q.id] && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl text-xs leading-relaxed" style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)", color: "var(--color-text-secondary)" }}>{q.sampleAnswer}</motion.div>}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
