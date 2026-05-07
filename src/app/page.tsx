"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  Target,
  Clock,
  BookOpen,
  Map,
  FlaskConical,
  Swords,
  BarChart3,
  Bot,
  ChevronRight,
  TrendingUp,
  Trophy,
  Star,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { useGamificationStore } from "@/stores/gamification";
import { useProgressStore } from "@/stores/progress";
import { usePlannerStore } from "@/stores/planner";
import { getLevelProgress } from "@/types/gamification";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const quickActions = [
  { href: "/roadmap", label: "Skill Tree", desc: "View your learning path", icon: Map, color: "#6366f1" },
  { href: "/topics", label: "Learn Topics", desc: "Interactive concepts", icon: BookOpen, color: "#8b5cf6" },
  { href: "/labs", label: "Practice Labs", desc: "Hands-on coding", icon: FlaskConical, color: "#06b6d4" },
  { href: "/interview", label: "Interview Prep", desc: "Ace your interviews", icon: Swords, color: "#f59e0b" },
  { href: "/analytics", label: "Analytics", desc: "Track your progress", icon: BarChart3, color: "#10b981" },
  { href: "/mentor", label: "AI Mentor", desc: "Get guidance", icon: Bot, color: "#f43f5e" },
];

const recentActivity = [
  { label: "Completed TCP Handshake module", time: "2 hours ago", xp: 50 },
  { label: "Scored 90% on Networking quiz", time: "Yesterday", xp: 35 },
  { label: "Started B+ Tree deep dive", time: "Yesterday", xp: 10 },
  { label: "Completed Linux basics", time: "2 days ago", xp: 200 },
];

export default function Dashboard() {
  const { xp, level, rank, streak, longestStreak } = useGamificationStore();
  const { completedTopics, totalStudyMinutes } = useProgressStore();
  const { dailyTasks, completedTaskIds } = usePlannerStore();
  const progress = getLevelProgress(xp, level);
  const completedToday = dailyTasks.filter((t) => t.completed).length;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl p-8"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 50%, rgba(6,182,212,0.04) 100%)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <motion.h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {greeting}, Engineer 👋
              </motion.h1>
              <p className="text-base mb-6" style={{ color: "var(--color-text-secondary)" }}>
                Keep building. Every line of code matters. You&apos;re on your way to mastery.
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
                    }}
                  >
                    {level}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {rank}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
                      Level {level}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={18} style={{ color: "var(--color-accent-indigo)" }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                      {xp.toLocaleString()} XP
                    </p>
                    <div className="w-32 h-1.5 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--color-accent-indigo), var(--color-accent-violet))" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Flame size={20} className="text-orange-500" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-bold text-orange-500">{streak} day streak</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
                        Best: {longestStreak} days
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        {[
          { label: "Topics Completed", value: completedTopics.length, icon: BookOpen, color: "#6366f1" },
          { label: "Total Study Time", value: `${Math.floor(totalStudyMinutes / 60)}h ${totalStudyMinutes % 60}m`, icon: Clock, color: "#06b6d4" },
          { label: "Today's Tasks", value: `${completedToday}/${dailyTasks.length}`, icon: Target, color: "#10b981" },
          { label: "Current Streak", value: `${streak} days`, icon: Flame, color: "#f59e0b" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                <stat.icon size={18} />
              </div>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                {stat.label}
              </p>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Today's Missions */}
        <motion.div variants={item} className="col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Target size={18} style={{ color: "var(--color-accent-cyan)" }} />
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Today&apos;s Missions
              </h2>
            </div>
            <Link href="/planner" className="text-xs flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: "var(--color-accent-indigo)" }}
            >
              View planner <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {dailyTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/[0.02]"
                style={{
                  border: "1px solid var(--color-border)",
                  opacity: task.completed ? 0.5 : 1,
                }}
              >
                {task.completed ? (
                  <CheckCircle2 size={20} style={{ color: "var(--color-accent-emerald)" }} />
                ) : (
                  <Circle size={20} style={{ color: "var(--color-text-muted)" }} />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{
                    color: task.completed ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                    textDecoration: task.completed ? "line-through" : "none",
                  }}>
                    {task.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge badge-indigo">{task.type}</span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                    <Clock size={12} />
                    {task.estimatedMinutes}m
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-accent-amber)" }}>
                    <Zap size={12} />
                    +{task.xpReward}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={item} className="space-y-6">
          {/* Recent Activity */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} style={{ color: "var(--color-accent-emerald)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Recent Activity
              </h3>
            </div>
            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: "var(--color-accent-indigo)" }}
                  />
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      {act.label}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                        {act.time}
                      </span>
                      <span className="text-[10px] font-semibold" style={{ color: "var(--color-accent-amber)" }}>
                        +{act.xp} XP
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} style={{ color: "var(--color-accent-amber)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Next Milestone
              </h3>
            </div>
            <div className="p-4 rounded-xl" style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02))",
              border: "1px solid rgba(245,158,11,0.15)",
            }}>
              <div className="flex items-center gap-3">
                <Star size={28} style={{ color: "var(--color-accent-amber)" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    First Module Complete
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                    Complete any topic module to unlock
                  </p>
                  <p className="text-xs font-bold mt-1" style={{ color: "var(--color-accent-amber)" }}>
                    +100 XP Reward
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Grid */}
      <motion.div variants={item}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.06 }}
            >
              <Link href={action.href}>
                <div className="glass-card gradient-border p-5 cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${action.color}15`, color: action.color }}
                    >
                      <action.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                        {action.label}
                      </h3>
                      <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
