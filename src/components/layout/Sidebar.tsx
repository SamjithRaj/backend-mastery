"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  CalendarDays,
  BookOpen,
  FlaskConical,
  FolderKanban,
  BarChart3,
  Bot,
  StickyNote,
  FileText,
  Swords,
  Flame,
  Zap,
  ChevronLeft,
  ChevronRight,
  Trophy,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { useGamificationStore } from "@/stores/gamification";
import { getLevelProgress } from "@/types/gamification";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, section: "main" },
  { href: "/roadmap", label: "Roadmap", icon: Map, section: "main" },
  { href: "/planner", label: "Daily Planner", icon: CalendarDays, section: "main" },
  { href: "/topics", label: "Topics", icon: BookOpen, section: "learn" },
  { href: "/labs", label: "Labs", icon: FlaskConical, section: "learn" },
  { href: "/projects", label: "Projects", icon: FolderKanban, section: "learn" },
  { href: "/review", label: "Spaced Review", icon: RefreshCw, section: "learn" },
  { href: "/interview", label: "Interview Prep", icon: Swords, section: "prep" },
  { href: "/resume", label: "Resume Center", icon: FileText, section: "prep" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, section: "track" },
  { href: "/achievements", label: "Achievements", icon: Trophy, section: "track" },
  { href: "/mentor", label: "AI Mentor", icon: Bot, section: "track" },
  { href: "/notes", label: "Notes", icon: StickyNote, section: "track" },
];

const sections = [
  { key: "main", label: "CORE" },
  { key: "learn", label: "LEARN" },
  { key: "prep", label: "PREPARE" },
  { key: "track", label: "TRACK" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { xp, level, rank, streak } = useGamificationStore();
  const progress = getLevelProgress(xp, level);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col border-r overflow-hidden"
      style={{
        background: "var(--color-bg-secondary)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
                }}
              >
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                  SysForge
                </h1>
                <p className="text-[10px] font-medium" style={{ color: "var(--color-text-tertiary)" }}>
                  Engineering Mastery
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section) => {
          const items = navItems.filter((item) => item.section === section.key);
          return (
            <div key={section.key}>
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-semibold tracking-widest mb-2 px-3"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {section.label}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-1">
                {items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`sidebar-link ${isActive ? "active" : ""}`}
                      title={collapsed ? item.label : undefined}
                      style={collapsed ? { justifyContent: "center", padding: "10px" } : {}}
                    >
                      <Icon size={18} />
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* XP / Level */}
      <div className="px-3 pb-4 border-t pt-4" style={{ borderColor: "var(--color-border)" }}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
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
                      {xp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-1">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-xs font-bold text-orange-500">{streak}</span>
                  </div>
                )}
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
                }}
              >
                {level}
              </div>
              {streak > 0 && (
                <div className="flex items-center gap-0.5">
                  <Flame size={12} className="text-orange-500" />
                  <span className="text-[10px] font-bold text-orange-500">{streak}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
