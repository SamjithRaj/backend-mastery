"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle2, Circle, AlertTriangle, Zap, ExternalLink, Github, Linkedin } from "lucide-react";
import { useState } from "react";

const resumeSections = [
  { id: "contact", title: "Contact Information", status: "done" as const, score: 95, tips: ["Include email, LinkedIn, GitHub, phone", "Use a professional email address"] },
  { id: "summary", title: "Professional Summary", status: "needs-work" as const, score: 60, tips: ["Keep it 2-3 lines", "Highlight backend/systems focus", "Mention key technologies", "Quantify where possible"] },
  { id: "skills", title: "Technical Skills", status: "done" as const, score: 85, tips: ["Group by category: Languages, Frameworks, Databases, Tools", "List most relevant first", "Include: C++, Python, PostgreSQL, Redis, Docker, Git"] },
  { id: "projects", title: "Projects", status: "needs-work" as const, score: 50, tips: ["Lead with impact/metrics", "Include Matching Engine, Mini Redis, LRU Cache", "Add tech stack used", "Describe architecture decisions", "Include GitHub links"] },
  { id: "experience", title: "Experience", status: "todo" as const, score: 0, tips: ["Include internships, freelance, open source", "Use STAR format", "Quantify impact"] },
  { id: "education", title: "Education", status: "done" as const, score: 90, tips: ["BTech CSE (AI/ML) — include GPA if strong", "Relevant coursework: OS, Networks, DBMS, DSA"] },
];

const interviewChecklist = [
  { category: "Backend", items: ["REST API design ✓", "Authentication (JWT/OAuth)", "Database optimization", "Caching strategies", "Rate limiting"] },
  { category: "System Design", items: ["URL Shortener", "Chat System", "Rate Limiter", "Load Balancer", "Key-Value Store"] },
  { category: "Systems", items: ["Process vs Thread", "Deadlock conditions", "Memory management", "TCP/IP networking", "Concurrency patterns"] },
];

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"resume" | "interview" | "linkedin">("resume");
  const totalScore = Math.round(resumeSections.reduce((s, r) => s + r.score, 0) / resumeSections.length);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1100px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Resume Center</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>Optimize your resume, prep for interviews, and build your professional presence.</p>
      </div>
      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "resume" as const, label: "Resume Review", icon: FileText },
          { id: "interview" as const, label: "Interview Readiness", icon: CheckCircle2 },
          { id: "linkedin" as const, label: "Profile Optimization", icon: Linkedin },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all" style={{ background: activeTab === tab.id ? "rgba(99,102,241,0.15)" : "var(--color-surface)", border: `1px solid ${activeTab === tab.id ? "rgba(99,102,241,0.3)" : "var(--color-border)"}`, color: activeTab === tab.id ? "#6366f1" : "var(--color-text-secondary)" }}>
            <tab.icon size={14} />{tab.label}
          </button>
        ))}
      </div>

      {activeTab === "resume" && (
        <div className="space-y-4">
          {/* Score */}
          <div className="glass-card p-6 flex items-center gap-6">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke={totalScore > 70 ? "#10b981" : totalScore > 40 ? "#f59e0b" : "#f43f5e"} strokeWidth="8" strokeLinecap="round" strokeDasharray={264} initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (totalScore / 100) * 264 }} transition={{ duration: 1.5, ease: "easeOut" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>{totalScore}%</p></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>Resume Score</h3>
              <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>Based on completeness and backend engineering best practices</p>
            </div>
          </div>
          {/* Sections */}
          {resumeSections.map((section) => (
            <div key={section.id} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                {section.status === "done" ? <CheckCircle2 size={18} style={{ color: "#10b981" }} /> : section.status === "needs-work" ? <AlertTriangle size={18} style={{ color: "#f59e0b" }} /> : <Circle size={18} style={{ color: "var(--color-text-muted)" }} />}
                <h3 className="text-sm font-semibold flex-1" style={{ color: "var(--color-text-primary)" }}>{section.title}</h3>
                <span className="text-xs font-bold" style={{ color: section.score > 70 ? "#10b981" : section.score > 30 ? "#f59e0b" : "#f43f5e" }}>{section.score}%</span>
              </div>
              <div className="progress-bar mb-3"><div className="h-full rounded-full" style={{ width: `${section.score}%`, background: section.score > 70 ? "#10b981" : section.score > 30 ? "#f59e0b" : "#f43f5e" }} /></div>
              <div className="space-y-1">{section.tips.map((tip, i) => (<p key={i} className="text-xs flex items-start gap-2" style={{ color: "var(--color-text-tertiary)" }}>💡 {tip}</p>))}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "interview" && (
        <div className="grid grid-cols-3 gap-4">
          {interviewChecklist.map((cat) => (
            <div key={cat.category} className="glass-card p-5">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>{cat.category}</h3>
              <div className="space-y-2">{cat.items.map((itm, i) => (
                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: itm.includes("✓") ? "#10b981" : "var(--color-text-tertiary)" }}>
                  {itm.includes("✓") ? <CheckCircle2 size={12} /> : <Circle size={12} />}{itm.replace(" ✓", "")}
                </div>
              ))}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "linkedin" && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>LinkedIn & GitHub Optimization</h3>
          {[
            { icon: Github, label: "GitHub", tips: ["Pin your best projects (Matching Engine, Redis Clone)", "Write detailed READMEs with architecture diagrams", "Maintain consistent commit history", "Add topics/tags to repos"] },
            { icon: Linkedin, label: "LinkedIn", tips: ["Headline: 'Backend Engineer | Systems Programming | C++ & Python'", "Add project descriptions with metrics", "Join backend engineering groups", "Write posts about what you're building"] },
          ].map((platform) => (
            <div key={platform.label} className="p-4 rounded-xl" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
              <div className="flex items-center gap-2 mb-3"><platform.icon size={16} style={{ color: "var(--color-accent-indigo)" }} /><p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{platform.label}</p></div>
              <div className="space-y-1">{platform.tips.map((tip, i) => (<p key={i} className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>• {tip}</p>))}</div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
