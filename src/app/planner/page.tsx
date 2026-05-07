"use client";

import { motion } from "framer-motion";
import { usePlannerStore } from "@/stores/planner";
import { useGamificationStore } from "@/stores/gamification";
import {
  Clock, Zap, CheckCircle2, Circle, Target, Flame, Timer,
  BookOpen, Code, RefreshCw, HelpCircle, FolderKanban, Swords,
} from "lucide-react";
import { useState, useEffect } from "react";

const typeIcons: Record<string, React.ElementType> = {
  learn: BookOpen,
  practice: Code,
  review: RefreshCw,
  quiz: HelpCircle,
  project: FolderKanban,
  interview: Swords,
};

const typeColors: Record<string, string> = {
  learn: "#6366f1",
  practice: "#06b6d4",
  review: "#10b981",
  quiz: "#f59e0b",
  project: "#8b5cf6",
  interview: "#f43f5e",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { addStudyMinutes } = usePlannerStore();

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Timer size={16} style={{ color: "var(--color-accent-cyan)" }} />
        <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Study Timer
        </h3>
      </div>
      <div className="text-center">
        <motion.p
          className="text-4xl font-bold font-mono mb-4"
          style={{ color: "var(--color-text-primary)" }}
          animate={{ scale: isActive ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        >
          {formatTime(seconds)}
        </motion.p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{
              background: isActive ? "rgba(244,63,94,0.15)" : "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
              color: isActive ? "#f43f5e" : "white",
              border: isActive ? "1px solid rgba(244,63,94,0.3)" : "none",
            }}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              const mins = Math.floor(seconds / 60);
              if (mins > 0) addStudyMinutes(mins);
              setSeconds(0);
              setIsActive(false);
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ color: "var(--color-text-tertiary)", border: "1px solid var(--color-border)" }}
          >
            Reset
          </button>
        </div>
        {seconds > 0 && (
          <p className="text-[10px] mt-2" style={{ color: "var(--color-text-muted)" }}>
            {Math.floor(seconds / 60)} min studied
          </p>
        )}
      </div>
    </div>
  );
}

export default function PlannerPage() {
  const { dailyTasks, completeTask, completedTaskIds, studyMinutesToday, generateDailyTasks } = usePlannerStore();
  const { addXp, updateStreak, streak } = useGamificationStore();

  const completedCount = dailyTasks.filter((t) => t.completed).length;
  const totalMinutes = dailyTasks.reduce((s, t) => s + t.estimatedMinutes, 0);
  const completedMinutes = dailyTasks.filter((t) => t.completed).reduce((s, t) => s + t.estimatedMinutes, 0);
  const totalXp = dailyTasks.reduce((s, t) => s + t.xpReward, 0);

  const handleComplete = (taskId: string, xpReward: number) => {
    completeTask(taskId);
    addXp(xpReward);
    updateStreak();
  };

  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1200px] mx-auto space-y-6"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Daily Planner</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {dayNames[today.getDay()]}, {monthNames[today.getMonth()]} {today.getDate()} — 2 hours of focused learning
          </p>
        </div>
        <button onClick={generateDailyTasks}
          className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
          style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
        >
          <RefreshCw size={14} /> Regenerate
        </button>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} style={{ color: "var(--color-accent-indigo)" }} />
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Tasks</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            {completedCount}/{dailyTasks.length}
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} style={{ color: "var(--color-accent-cyan)" }} />
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Time</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            {completedMinutes}/{totalMinutes}m
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} style={{ color: "var(--color-accent-amber)" }} />
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP Today</span>
          </div>
          <p className="text-xl font-bold" style={{ color: "var(--color-accent-amber)" }}>
            {dailyTasks.filter((t) => t.completed).reduce((s, t) => s + t.xpReward, 0)}/{totalXp}
          </p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-orange-500" />
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Streak</span>
          </div>
          <p className="text-xl font-bold text-orange-500">{streak} days</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Tasks */}
        <motion.div variants={item} className="col-span-2 space-y-3">
          <p className="text-[10px] font-semibold tracking-wider" style={{ color: "var(--color-text-muted)" }}>
            TODAY&apos;S SCHEDULE
          </p>
          {dailyTasks.map((task, i) => {
            const Icon = typeIcons[task.type] || BookOpen;
            const color = typeColors[task.type] || "#6366f1";
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 flex items-center gap-4"
                style={{ opacity: task.completed ? 0.5 : 1 }}
              >
                <button
                  onClick={() => !task.completed && handleComplete(task.id, task.xpReward)}
                  className="shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 size={22} style={{ color: "var(--color-accent-emerald)" }} />
                  ) : (
                    <Circle size={22} style={{ color: "var(--color-text-muted)" }} className="hover:text-white transition-colors" />
                  )}
                </button>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${color}15`, color }}
                >
                  <Icon size={18} />
                </div>
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
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
                    <Clock size={11} /> {task.estimatedMinutes}m
                  </span>
                  <span className="text-xs flex items-center gap-1 font-semibold" style={{ color: "var(--color-accent-amber)" }}>
                    <Zap size={11} /> +{task.xpReward}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={item} className="space-y-4">
          <StudyTimer />

          {/* Progress Ring */}
          <div className="glass-card p-5 text-center">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
              Daily Progress
            </h3>
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="url(#gradient)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - (completedCount / dailyTasks.length) * 264 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                  {Math.round((completedCount / dailyTasks.length) * 100)}%
                </p>
              </div>
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              {completedCount} of {dailyTasks.length} tasks complete
            </p>
          </div>

          {/* Weekly View */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
              This Week
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                const isToday = i === (today.getDay() + 6) % 7;
                const isPast = i < (today.getDay() + 6) % 7;
                return (
                  <div key={i} className="text-center">
                    <p className="text-[10px] mb-1" style={{ color: "var(--color-text-muted)" }}>{day}</p>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-[10px] font-bold"
                      style={{
                        background: isToday ? "rgba(99,102,241,0.15)" : isPast ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.02)",
                        border: isToday ? "1px solid rgba(99,102,241,0.3)" : "1px solid var(--color-border)",
                        color: isToday ? "#6366f1" : isPast ? "#10b981" : "var(--color-text-muted)",
                      }}
                    >
                      {isPast ? "✓" : isToday ? "•" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
