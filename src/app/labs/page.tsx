"use client";

import { motion } from "framer-motion";
import { FlaskConical, Lock, Clock, Zap, Star, Code, ChevronRight } from "lucide-react";
import Link from "next/link";

const labs = [
  { id: "http-server", title: "Build a Mini HTTP Server", description: "Parse HTTP requests, handle routes, serve responses from scratch.", difficulty: 2, estimatedMinutes: 60, xpReward: 150, status: "available" as const, tags: ["networking", "HTTP", "sockets"], color: "#6366f1" },
  { id: "thread-pool", title: "Build a Thread Pool", description: "Create a fixed-size thread pool with task queue and worker threads.", difficulty: 3, estimatedMinutes: 45, xpReward: 120, status: "available" as const, tags: ["concurrency", "threads", "C++"], color: "#06b6d4" },
  { id: "redis-cache", title: "Simulate Redis Caching", description: "Implement GET/SET/DEL/TTL commands with an in-memory key-value store.", difficulty: 2, estimatedMinutes: 50, xpReward: 130, status: "available" as const, tags: ["caching", "Redis", "data structures"], color: "#10b981" },
  { id: "load-balancer", title: "Build a Load Balancer", description: "Implement round-robin, least connections, and weighted routing algorithms.", difficulty: 3, estimatedMinutes: 55, xpReward: 140, status: "locked" as const, tags: ["networking", "system design"], color: "#f59e0b" },
  { id: "rate-limiter-lab", title: "Implement a Rate Limiter", description: "Build token bucket and sliding window rate limiters with tests.", difficulty: 2, estimatedMinutes: 40, xpReward: 100, status: "available" as const, tags: ["backend", "algorithms"], color: "#8b5cf6" },
  { id: "pub-sub", title: "Build a Pub/Sub System", description: "Create a publish-subscribe messaging system with topic-based routing.", difficulty: 3, estimatedMinutes: 50, xpReward: 130, status: "locked" as const, tags: ["messaging", "distributed"], color: "#f43f5e" },
  { id: "url-shortener", title: "Build a URL Shortener", description: "Design and implement a URL shortening service with Base62 encoding.", difficulty: 2, estimatedMinutes: 45, xpReward: 110, status: "locked" as const, tags: ["backend", "databases"], color: "#0ea5e9" },
  { id: "matching-engine", title: "Build a Matching Engine", description: "Implement a limit order book with price-time priority matching.", difficulty: 4, estimatedMinutes: 90, xpReward: 250, status: "locked" as const, tags: ["low-latency", "finance", "C++"], color: "#f59e0b" },
];

export default function LabsPage() {
  const available = labs.filter((l) => l.status === "available").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Interactive Labs</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>Hands-on coding challenges. Build real systems from scratch in guided or challenge mode.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Labs</p><p className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>{labs.length}</p></div>
        <div className="stat-card"><p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Available</p><p className="text-2xl font-bold" style={{ color: "#10b981" }}>{available}</p></div>
        <div className="stat-card"><p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total XP</p><p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>{labs.reduce((s, l) => s + l.xpReward, 0)}</p></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {labs.map((lab, i) => (
          <motion.div key={lab.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card gradient-border p-5" style={{ opacity: lab.status === "locked" ? 0.5 : 1 }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${lab.color}15`, color: lab.color }}>
                {lab.status === "locked" ? <Lock size={18} /> : <FlaskConical size={18} />}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{lab.title}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{lab.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-text-muted)" }}><Clock size={10} /> {lab.estimatedMinutes}m</span>
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: "#f59e0b" }}><Zap size={10} /> +{lab.xpReward}</span>
                  <span className="flex gap-0.5">{Array.from({ length: lab.difficulty }).map((_, j) => (<Star key={j} size={8} fill={lab.color} style={{ color: lab.color }} />))}</span>
                </div>
                <div className="flex gap-1.5 mt-2">{lab.tags.map((t) => (<span key={t} className="badge badge-indigo">{t}</span>))}</div>
              </div>
            </div>
            {lab.status === "available" && (
              <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))", color: "white" }}>
                Start Lab <ChevronRight size={14} />
              </button>
            )}
            {lab.status === "locked" && (
              <div className="mt-4 py-2 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>🔒 Complete prerequisites to unlock</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
