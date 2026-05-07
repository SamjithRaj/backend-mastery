"use client";

import { motion } from "framer-motion";
import { useGamificationStore } from "@/stores/gamification";
import { useProgressStore } from "@/stores/progress";
import { getLevelProgress, getXpForLevel } from "@/types/gamification";
import {
  BarChart3, Flame, Zap, Target, Clock, TrendingUp, Star, Award,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell,
} from "recharts";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const skillRadarData = [
  { skill: "Networking", value: 35, fullMark: 100 },
  { skill: "OS", value: 20, fullMark: 100 },
  { skill: "Databases", value: 40, fullMark: 100 },
  { skill: "Distributed", value: 15, fullMark: 100 },
  { skill: "Backend", value: 45, fullMark: 100 },
  { skill: "C++", value: 25, fullMark: 100 },
  { skill: "Linux", value: 30, fullMark: 100 },
  { skill: "DevOps", value: 10, fullMark: 100 },
];

const weeklyData = [
  { day: "Mon", minutes: 120, xp: 180 },
  { day: "Tue", minutes: 90, xp: 130 },
  { day: "Wed", minutes: 110, xp: 160 },
  { day: "Thu", minutes: 95, xp: 140 },
  { day: "Fri", minutes: 130, xp: 200 },
  { day: "Sat", minutes: 105, xp: 150 },
  { day: "Sun", minutes: 0, xp: 0 },
];

const topicConfidenceData = [
  { topic: "HTTP/REST", confidence: 70, color: "#6366f1" },
  { topic: "TCP/IP", confidence: 45, color: "#06b6d4" },
  { topic: "SQL", confidence: 60, color: "#10b981" },
  { topic: "Caching", confidence: 30, color: "#f59e0b" },
  { topic: "Auth", confidence: 55, color: "#8b5cf6" },
  { topic: "Linux", confidence: 40, color: "#22c55e" },
];

export default function AnalyticsPage() {
  const { xp, level, rank, streak, longestStreak, achievements } = useGamificationStore();
  const { completedTopics, totalStudyMinutes } = useProgressStore();
  const progress = getLevelProgress(xp, level);
  const nextLevelXp = getXpForLevel(level);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold gradient-text">Analytics</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Track your progress, identify weak areas, and celebrate wins.
        </p>
      </motion.div>

      {/* Top Stats */}
      <motion.div variants={item} className="grid grid-cols-5 gap-4">
        {[
          { label: "Total XP", value: xp.toLocaleString(), icon: Zap, color: "#f59e0b" },
          { label: "Level", value: level, icon: Star, color: "#6366f1" },
          { label: "Current Streak", value: `${streak} days`, icon: Flame, color: "#f97316" },
          { label: "Topics Done", value: completedTopics.length, icon: Target, color: "#10b981" },
          { label: "Study Time", value: `${Math.floor(totalStudyMinutes / 60)}h`, icon: Clock, color: "#06b6d4" },
        ].map((stat) => (
          <motion.div key={stat.label} className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={16} style={{ color: stat.color }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{stat.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Level Progress */}
      <motion.div variants={item} className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))" }}
            >
              {level}
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>{rank}</p>
              <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                {xp.toLocaleString()} / {(xp + Math.round(nextLevelXp * (1 - progress))).toLocaleString()} XP to Level {level + 1}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Best Streak</p>
              <p className="text-lg font-bold text-orange-500">{longestStreak}</p>
            </div>
            <div className="text-center">
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Achievements</p>
              <p className="text-lg font-bold" style={{ color: "var(--color-accent-amber)" }}>{achievements.length}</p>
            </div>
          </div>
        </div>
        <div className="progress-bar" style={{ height: 10 }}>
          <motion.div
            className="progress-bar-fill"
            style={{ height: "100%" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Skill Radar */}
        <motion.div variants={item} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} style={{ color: "var(--color-accent-indigo)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Skill Radar
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillRadarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "#636380", fontSize: 11 }} />
              <Radar
                dataKey="value"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Study Time */}
        <motion.div variants={item} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} style={{ color: "var(--color-accent-cyan)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Weekly Study Time
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#636380", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#636380", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#16161d",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#f0f0f3",
                }}
              />
              <Area type="monotone" dataKey="minutes" stroke="#6366f1" fill="url(#colorMinutes)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Topic Confidence */}
        <motion.div variants={item} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} style={{ color: "var(--color-accent-emerald)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Topic Confidence
            </h3>
          </div>
          <div className="space-y-4">
            {topicConfidenceData.map((topic) => (
              <div key={topic.topic}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    {topic.topic}
                  </span>
                  <span className="text-xs font-bold" style={{ color: topic.color }}>
                    {topic.confidence}%
                  </span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: topic.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Heatmap */}
        <motion.div variants={item} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame size={16} className="text-orange-500" />
            <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Activity Heatmap
            </h3>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 35 }).map((_, i) => {
              const intensity = Math.random();
              const hasActivity = intensity > 0.3;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className="w-full aspect-square rounded-sm"
                  style={{
                    background: hasActivity
                      ? `rgba(99,102,241,${0.15 + intensity * 0.5})`
                      : "rgba(255,255,255,0.02)",
                    border: hasActivity
                      ? `1px solid rgba(99,102,241,${0.1 + intensity * 0.2})`
                      : "1px solid rgba(255,255,255,0.03)",
                  }}
                  title={hasActivity ? `${Math.round(intensity * 120)}min studied` : "No activity"}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-1 mt-3">
            <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Less</span>
            {[0.05, 0.2, 0.35, 0.5, 0.7].map((opacity) => (
              <div key={opacity} className="w-3 h-3 rounded-sm"
                style={{ background: `rgba(99,102,241,${opacity})` }}
              />
            ))}
            <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>More</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
