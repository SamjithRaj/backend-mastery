"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { topicsData } from "@/data/topics";
import { Clock, Zap, Star, BookOpen, Network, Cpu, Database, Globe, Code, Terminal, Container } from "lucide-react";

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  networking: { label: "Networking", icon: Network, color: "#6366f1" },
  os: { label: "Operating Systems", icon: Cpu, color: "#06b6d4" },
  databases: { label: "Databases", icon: Database, color: "#10b981" },
  distributed: { label: "Distributed Systems", icon: Globe, color: "#f59e0b" },
  backend: { label: "Backend", icon: Code, color: "#8b5cf6" },
  cpp: { label: "C++ Systems", icon: Terminal, color: "#f43f5e" },
  linux: { label: "Linux", icon: Terminal, color: "#22c55e" },
  devops: { label: "DevOps", icon: Container, color: "#0ea5e9" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TopicsPage() {
  const grouped = topicsData.reduce<Record<string, typeof topicsData>>((acc, topic) => {
    const cat = topic.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(topic);
    return acc;
  }, {});

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1200px] mx-auto space-y-8"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold gradient-text">Topic Explorer</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Deep-dive into backend engineering concepts with interactive animations and visual explanations.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Topics</p>
          <p className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>{topicsData.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Categories</p>
          <p className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>{Object.keys(grouped).length}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total XP Available</p>
          <p className="text-2xl font-bold" style={{ color: "var(--color-accent-amber)" }}>
            {topicsData.reduce((s, t) => s + t.xpReward, 0)}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Study Time</p>
          <p className="text-2xl font-bold" style={{ color: "var(--color-accent-cyan)" }}>
            {Math.round(topicsData.reduce((s, t) => s + t.estimatedMinutes, 0) / 60)}h
          </p>
        </div>
      </motion.div>

      {/* Topics by Category */}
      {Object.entries(grouped).map(([category, topics]) => {
        const config = categoryConfig[category] || { label: category, icon: BookOpen, color: "#6366f1" };
        const Icon = config.icon;
        return (
          <motion.div key={category} variants={item}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${config.color}15`, color: config.color }}
              >
                <Icon size={16} />
              </div>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                {config.label}
              </h2>
              <span className="text-xs ml-2" style={{ color: "var(--color-text-muted)" }}>
                {topics.length} topic{topics.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topics.map((topic) => (
                <Link key={topic.id} href={`/topics/${topic.id}`}>
                  <motion.div
                    className="glass-card gradient-border p-5 cursor-pointer group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold mb-1 group-hover:text-white transition-colors"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {topic.title}
                        </h3>
                        <p className="text-xs line-clamp-2" style={{ color: "var(--color-text-tertiary)" }}>
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                        <Clock size={11} /> {topic.estimatedMinutes}m
                      </div>
                      <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-accent-amber)" }}>
                        <Zap size={11} /> +{topic.xpReward} XP
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: topic.difficulty }).map((_, i) => (
                          <Star key={i} size={9} fill={config.color} style={{ color: config.color }} />
                        ))}
                      </div>
                      <div className="ml-auto flex gap-1 flex-wrap">
                        {topic.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="badge badge-indigo">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
