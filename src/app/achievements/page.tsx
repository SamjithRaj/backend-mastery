"use client";

import { motion } from "framer-motion";
import { useGamificationStore } from "@/stores/gamification";
import { Trophy, Star, Zap, Target, CheckCircle2 } from "lucide-react";

const allAchievements = [
  { id: "first-topic", title: "First Steps", description: "Complete your first topic", icon: "🎯", xpReward: 50, condition: "Complete 1 topic", color: "#6366f1" },
  { id: "five-topics", title: "Knowledge Seeker", description: "Complete 5 topics", icon: "📚", xpReward: 150, condition: "Complete 5 topics", color: "#06b6d4" },
  { id: "ten-topics", title: "Scholar", description: "Complete 10 topics", icon: "🎓", xpReward: 300, condition: "Complete 10 topics", color: "#10b981" },
  { id: "streak-3", title: "Consistent", description: "Maintain a 3-day streak", icon: "🔥", xpReward: 75, condition: "3-day streak", color: "#f97316" },
  { id: "streak-7", title: "On Fire", description: "Maintain a 7-day streak", icon: "🔥", xpReward: 200, condition: "7-day streak", color: "#f43f5e" },
  { id: "streak-30", title: "Unstoppable", description: "Maintain a 30-day streak", icon: "💎", xpReward: 500, condition: "30-day streak", color: "#8b5cf6" },
  { id: "quiz-perfect", title: "Perfect Score", description: "Get 100% on any quiz", icon: "💯", xpReward: 100, condition: "Perfect quiz score", color: "#f59e0b" },
  { id: "first-project", title: "Builder", description: "Complete your first project", icon: "🏗️", xpReward: 200, condition: "Complete 1 project", color: "#06b6d4" },
  { id: "first-lab", title: "Lab Rat", description: "Complete your first lab", icon: "🧪", xpReward: 100, condition: "Complete 1 lab", color: "#10b981" },
  { id: "level-5", title: "Rising Star", description: "Reach level 5", icon: "⭐", xpReward: 150, condition: "Reach level 5", color: "#f59e0b" },
  { id: "level-10", title: "Engineer", description: "Reach level 10", icon: "🔧", xpReward: 300, condition: "Reach level 10", color: "#6366f1" },
  { id: "all-networking", title: "Network Engineer", description: "Complete all networking topics", icon: "🌐", xpReward: 250, condition: "All networking topics", color: "#06b6d4" },
  { id: "all-databases", title: "Data Wizard", description: "Complete all database topics", icon: "🗄️", xpReward: 250, condition: "All database topics", color: "#10b981" },
  { id: "all-os", title: "Kernel Hacker", description: "Complete all OS topics", icon: "🖥️", xpReward: 250, condition: "All OS topics", color: "#8b5cf6" },
  { id: "study-10h", title: "Dedicated", description: "Study for 10 hours total", icon: "⏰", xpReward: 200, condition: "10 hours study time", color: "#06b6d4" },
  { id: "study-50h", title: "Committed", description: "Study for 50 hours total", icon: "💪", xpReward: 500, condition: "50 hours study time", color: "#f43f5e" },
];

const bossChallengeCatalog = [
  { id: "boss-1", title: "The Interviewer", description: "Answer 10 rapid-fire interview questions correctly under time pressure.", difficulty: 3, xpReward: 300, timeLimit: "10 min", prerequisite: "Level 5", icon: "🎤", color: "#f43f5e", unlocked: true },
  { id: "boss-2", title: "System Designer", description: "Design a complete URL shortener system with all components in 20 minutes.", difficulty: 4, xpReward: 500, timeLimit: "20 min", prerequisite: "Complete System Design path", icon: "🏛️", color: "#6366f1", unlocked: false },
  { id: "boss-3", title: "Debug Master", description: "Find and fix 5 concurrency bugs in a multi-threaded application.", difficulty: 5, xpReward: 750, timeLimit: "30 min", prerequisite: "Complete OS & Concurrency", icon: "🐛", color: "#f59e0b", unlocked: false },
  { id: "boss-4", title: "The Architect", description: "Design a distributed chat system handling 1M concurrent users.", difficulty: 5, xpReward: 1000, timeLimit: "45 min", prerequisite: "Complete Distributed Systems", icon: "👑", color: "#8b5cf6", unlocked: false },
];

export default function AchievementsPage() {
  const { achievements, xp, level } = useGamificationStore();
  const unlockedIds = new Set(achievements);
  const unlockedCount = unlockedIds.size;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Achievements & Boss Challenges</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Unlock achievements, earn bonus XP, and face boss challenges to prove your mastery.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2"><Trophy size={16} style={{ color: "#f59e0b" }} /><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Unlocked</span></div>
          <p className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>{unlockedCount}/{allAchievements.length}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2"><Zap size={16} style={{ color: "#f59e0b" }} /><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Bonus XP Earned</span></div>
          <p className="text-2xl font-bold" style={{ color: "#f59e0b" }}>{allAchievements.filter((a) => unlockedIds.has(a.id)).reduce((s, a) => s + a.xpReward, 0)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2"><Star size={16} style={{ color: "#6366f1" }} /><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Level</span></div>
          <p className="text-2xl font-bold" style={{ color: "#6366f1" }}>{level}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2"><Target size={16} style={{ color: "#f43f5e" }} /><span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Next Achievement</span></div>
          <p className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
            {allAchievements.find((a) => !unlockedIds.has(a.id))?.title || "All done!"}
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>🏆 Achievements</h2>
        <div className="grid grid-cols-4 gap-3">
          {allAchievements.map((achievement, i) => {
            const unlocked = unlockedIds.has(achievement.id);
            return (
              <motion.div key={achievement.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                className="glass-card p-4 text-center" style={{ opacity: unlocked ? 1 : 0.4 }}>
                <motion.span className="text-3xl block mb-2" animate={unlocked ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                  {unlocked ? achievement.icon : "🔒"}
                </motion.span>
                <p className="text-xs font-semibold mb-1" style={{ color: unlocked ? achievement.color : "var(--color-text-muted)" }}>{achievement.title}</p>
                <p className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>{achievement.description}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Zap size={10} style={{ color: "#f59e0b" }} />
                  <span className="text-[10px] font-bold" style={{ color: "#f59e0b" }}>+{achievement.xpReward}</span>
                </div>
                {unlocked && (
                  <div className="mt-2 flex items-center justify-center gap-1 text-[9px] font-bold" style={{ color: "#10b981" }}>
                    <CheckCircle2 size={10} /> UNLOCKED
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Boss Challenges */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>⚔️ Boss Challenges</h2>
        <p className="text-xs mb-4" style={{ color: "var(--color-text-tertiary)" }}>
          Timed challenges to test your mastery. Complete prerequisites to unlock.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {bossChallengeCatalog.map((boss, i) => (
            <motion.div key={boss.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card p-5" style={{ opacity: boss.unlocked ? 1 : 0.5 }}>
              <div className="flex items-start gap-4">
                <motion.div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  animate={boss.unlocked ? { boxShadow: [`0 0 20px ${boss.color}20`, `0 0 30px ${boss.color}40`, `0 0 20px ${boss.color}20`] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: `${boss.color}10`, border: `2px solid ${boss.color}30` }}>
                  {boss.unlocked ? boss.icon : "🔒"}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold" style={{ color: boss.unlocked ? boss.color : "var(--color-text-muted)" }}>{boss.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>{boss.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex gap-0.5">{Array.from({ length: boss.difficulty }).map((_, j) => (<Star key={j} size={9} fill={boss.color} style={{ color: boss.color }} />))}</span>
                    <span className="text-[10px] font-bold" style={{ color: "#f59e0b" }}>+{boss.xpReward} XP</span>
                    <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>⏱ {boss.timeLimit}</span>
                  </div>
                  {!boss.unlocked && (
                    <p className="text-[10px] mt-2" style={{ color: "var(--color-text-muted)" }}>🔒 {boss.prerequisite}</p>
                  )}
                  {boss.unlocked && (
                    <button className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold"
                      style={{ background: `linear-gradient(135deg, ${boss.color}, ${boss.color}cc)`, color: "white" }}>
                      Start Challenge ⚔️
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
