"use client";

import { motion } from "framer-motion";
import { FolderKanban, Lock, Clock, Zap, Star, ChevronRight, GitBranch, Layers } from "lucide-react";

const tiers = [
  {
    tier: 1, label: "Tier 1 — Foundation", color: "#6366f1",
    projects: [
      { id: "http-server", title: "HTTP Server", description: "Build a fully functional HTTP server from scratch with routing, middleware, and static file serving.", difficulty: 2, hours: 15, xpReward: 300, status: "available", milestones: 5 },
      { id: "redis-clone", title: "Redis Clone", description: "Implement core Redis commands — GET, SET, DEL, TTL, EXPIRE — with persistence.", difficulty: 3, hours: 20, xpReward: 400, status: "available", milestones: 6 },
      { id: "cache-system", title: "Cache System", description: "Build an LRU/LFU cache with eviction policies and TTL support.", difficulty: 2, hours: 10, xpReward: 250, status: "available", milestones: 4 },
      { id: "chat-server", title: "Chat Server", description: "Real-time WebSocket chat with rooms, private messages, and user presence.", difficulty: 3, hours: 18, xpReward: 350, status: "locked", milestones: 5 },
    ],
  },
  {
    tier: 2, label: "Tier 2 — Intermediate", color: "#06b6d4",
    projects: [
      { id: "distributed-cache", title: "Distributed Cache", description: "Multi-node cache with consistent hashing, replication, and failure handling.", difficulty: 4, hours: 30, xpReward: 500, status: "locked", milestones: 7 },
      { id: "url-shortener-proj", title: "URL Shortener", description: "Full-stack URL shortener with analytics, custom aliases, and rate limiting.", difficulty: 3, hours: 20, xpReward: 400, status: "locked", milestones: 6 },
      { id: "kafka-clone", title: "Kafka Clone", description: "Message broker with topics, partitions, consumer groups, and persistence.", difficulty: 4, hours: 35, xpReward: 600, status: "locked", milestones: 8 },
      { id: "load-balancer-proj", title: "Load Balancer", description: "L4/L7 load balancer with health checks, sticky sessions, and circuit breaking.", difficulty: 4, hours: 25, xpReward: 500, status: "locked", milestones: 6 },
    ],
  },
  {
    tier: 3, label: "Tier 3 — Advanced", color: "#f59e0b",
    projects: [
      { id: "trading-engine", title: "Trading Engine", description: "Low-latency matching engine with order book, price-time priority, and FIX protocol.", difficulty: 5, hours: 50, xpReward: 800, status: "locked", milestones: 10 },
      { id: "task-scheduler", title: "Distributed Task Scheduler", description: "Distributed cron with task queuing, retries, dead-letter queues, and monitoring.", difficulty: 5, hours: 40, xpReward: 700, status: "locked", milestones: 8 },
      { id: "analytics-engine", title: "Real-Time Analytics Engine", description: "Stream processing engine for real-time event aggregation and dashboards.", difficulty: 5, hours: 45, xpReward: 750, status: "locked", milestones: 9 },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Project Builder</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>Build real-world systems with guided milestones, architecture diagrams, and stretch goals.</p>
      </div>
      {tiers.map((tier) => (
        <div key={tier.tier}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${tier.color}15`, color: tier.color }}>{tier.tier}</div>
            <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{tier.label}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tier.projects.map((proj, i) => (
              <motion.div key={proj.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5" style={{ opacity: proj.status === "locked" ? 0.5 : 1 }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${tier.color}15`, color: tier.color }}>
                    {proj.status === "locked" ? <Lock size={18} /> : <FolderKanban size={18} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{proj.title}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{proj.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-text-muted)" }}><Clock size={10} /> {proj.hours}h</span>
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: "#f59e0b" }}><Zap size={10} /> +{proj.xpReward}</span>
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-text-muted)" }}><GitBranch size={10} /> {proj.milestones} milestones</span>
                      <span className="flex gap-0.5">{Array.from({ length: proj.difficulty }).map((_, j) => (<Star key={j} size={8} fill={tier.color} style={{ color: tier.color }} />))}</span>
                    </div>
                  </div>
                </div>
                {proj.status === "available" && (
                  <button className="w-full mt-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)`, color: "white" }}>Start Project <ChevronRight size={14} /></button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
