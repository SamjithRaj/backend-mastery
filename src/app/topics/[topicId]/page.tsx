"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getTopicById } from "@/data/topics";
import { Clock, Zap, Star, ArrowLeft, CheckCircle2, Circle, BookOpen, Lightbulb, Eye, Code, AlertTriangle, HelpCircle, PenTool, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useProgressStore } from "@/stores/progress";
import { useGamificationStore } from "@/stores/gamification";

// Dynamic imports for animations
const TcpHandshake = dynamic(() => import("@/components/animations/networking/TcpHandshake"), { ssr: false });
const ThreadsVsProcesses = dynamic(() => import("@/components/animations/os/ThreadsVsProcesses"), { ssr: false });
const BPlusTree = dynamic(() => import("@/components/animations/databases/BPlusTree"), { ssr: false });
const ConsistentHashing = dynamic(() => import("@/components/animations/distributed/ConsistentHashing"), { ssr: false });
const RateLimiter = dynamic(() => import("@/components/animations/backend/RateLimiter"), { ssr: false });
const ApiLifecycle = dynamic(() => import("@/components/animations/backend/ApiLifecycle"), { ssr: false });
const DnsResolution = dynamic(() => import("@/components/animations/networking/DnsResolution"), { ssr: false });
const Deadlock = dynamic(() => import("@/components/animations/os/Deadlock"), { ssr: false });
const ContextSwitch = dynamic(() => import("@/components/animations/os/ContextSwitch"), { ssr: false });
const CacheHitMiss = dynamic(() => import("@/components/animations/backend/CacheHitMiss"), { ssr: false });
const LoadBalancer = dynamic(() => import("@/components/animations/networking/LoadBalancer"), { ssr: false });

const animationMap: Record<string, React.ComponentType> = {
  "tcp-handshake": TcpHandshake,
  "threads-vs-processes": ThreadsVsProcesses,
  "bplus-tree": BPlusTree,
  "consistent-hashing": ConsistentHashing,
  "rate-limiter": RateLimiter,
  "api-lifecycle": ApiLifecycle,
  "dns-resolution": DnsResolution,
  "deadlock": Deadlock,
  "context-switch": ContextSwitch,
  "cache-hit-miss": CacheHitMiss,
  "load-balancer": LoadBalancer,
};

const sectionIcons: Record<string, React.ElementType> = {
  intuition: Lightbulb,
  analogy: BookOpen,
  visual: Eye,
  technical: Code,
  "deep-dive": BookOpen,
  simulation: Eye,
  "code-walkthrough": Code,
  mistakes: AlertTriangle,
  interview: HelpCircle,
  "mini-task": PenTool,
  quiz: HelpCircle,
  summary: FileText,
};

const sectionColors: Record<string, string> = {
  intuition: "#6366f1",
  analogy: "#8b5cf6",
  visual: "#06b6d4",
  technical: "#0ea5e9",
  "deep-dive": "#10b981",
  simulation: "#06b6d4",
  "code-walkthrough": "#f59e0b",
  mistakes: "#f43f5e",
  interview: "#f59e0b",
  "mini-task": "#10b981",
  quiz: "#6366f1",
  summary: "#8b5cf6",
};

export default function TopicDetailPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const topic = getTopicById(topicId);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const { completeSection, completedSections } = useProgressStore();
  const { addXp } = useGamificationStore();

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-96">
        <p style={{ color: "var(--color-text-tertiary)" }}>Topic not found</p>
      </div>
    );
  }

  const sections = topic.sections;
  const activeSection = sections[activeSectionIndex];
  const completedIds = completedSections[topicId] || [];

  const handleCompleteSection = () => {
    completeSection(topicId, activeSection.id);
    addXp(Math.floor(topic.xpReward / sections.length));
    if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    }
  };

  const quizScore = topic.quiz.length > 0
    ? topic.quiz.filter((q) => quizAnswers[q.id] === q.correctIndex).length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1200px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/topics" className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            {topic.title}
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <Clock size={12} /> {topic.estimatedMinutes}m
            </div>
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-accent-amber)" }}>
              <Zap size={12} /> +{topic.xpReward} XP
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: topic.difficulty }).map((_, i) => (
                <Star key={i} size={10} fill="#f59e0b" style={{ color: "#f59e0b" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Section Nav */}
        <div className="col-span-1 space-y-1">
          <p className="text-[10px] font-semibold tracking-wider mb-3 px-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            SECTIONS
          </p>
          {sections.map((section, i) => {
            const Icon = sectionIcons[section.type] || BookOpen;
            const color = sectionColors[section.type] || "#6366f1";
            const isActive = i === activeSectionIndex;
            const isCompleted = completedIds.includes(section.id);

            return (
              <button key={section.id}
                onClick={() => setActiveSectionIndex(i)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all text-xs"
                style={{
                  background: isActive ? `${color}12` : "transparent",
                  color: isActive ? color : "var(--color-text-secondary)",
                  borderLeft: isActive ? `2px solid ${color}` : "2px solid transparent",
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} style={{ color: "var(--color-accent-emerald)" }} />
                ) : (
                  <Icon size={14} />
                )}
                <span className="flex-1 truncate">{section.title}</span>
              </button>
            );
          })}

          {/* Quiz link */}
          {topic.quiz.length > 0 && (
            <>
              <div className="h-px my-3" style={{ background: "var(--color-border)" }} />
              <button
                onClick={() => setActiveSectionIndex(-1)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs"
                style={{
                  background: activeSectionIndex === -1 ? "rgba(99,102,241,0.12)" : "transparent",
                  color: activeSectionIndex === -1 ? "#6366f1" : "var(--color-text-secondary)",
                }}
              >
                <HelpCircle size={14} />
                <span>Quiz ({topic.quiz.length}Q)</span>
              </button>
            </>
          )}

          {/* Progress */}
          <div className="mt-4 p-3 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
            <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--color-text-muted)" }}>
              PROGRESS
            </p>
            <div className="progress-bar mb-1">
              <div className="progress-bar-fill" style={{ width: `${(completedIds.length / sections.length) * 100}%` }} />
            </div>
            <p className="text-[10px]" style={{ color: "var(--color-text-tertiary)" }}>
              {completedIds.length}/{sections.length} sections
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-3">
          {activeSectionIndex >= 0 && activeSection ? (
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  {(() => {
                    const Icon = sectionIcons[activeSection.type] || BookOpen;
                    return <Icon size={18} style={{ color: sectionColors[activeSection.type] }} />;
                  })()}
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {activeSection.title}
                  </h2>
                  <span className="badge badge-indigo ml-2">{activeSection.type}</span>
                </div>

                {/* Animation */}
                {activeSection.animationId && animationMap[activeSection.animationId] && (
                  <div className="mb-6">
                    {(() => {
                      const AnimComponent = animationMap[activeSection.animationId!];
                      return <AnimComponent />;
                    })()}
                  </div>
                )}

                {/* Content */}
                <div className="prose-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {activeSection.content.split("\n\n").map((para, i) => (
                    <div key={i} className="mb-4">
                      {para.startsWith("## ") ? (
                        <h3 className="text-base font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                          {para.replace("## ", "")}
                        </h3>
                      ) : para.startsWith("### ") ? (
                        <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
                          {para.replace("### ", "")}
                        </h4>
                      ) : para.startsWith("**Q") ? (
                        <div className="p-3 rounded-lg mb-2" style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.1)" }}>
                          <p className="text-xs leading-relaxed whitespace-pre-wrap">{para}</p>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{para}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Code Snippet */}
                {activeSection.codeSnippet && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg"
                      style={{ background: "rgba(0,0,0,0.5)", borderBottom: "1px solid var(--color-border)" }}
                    >
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: "#f43f5e" }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
                      </div>
                      <span className="text-[10px] font-mono ml-2" style={{ color: "var(--color-text-muted)" }}>
                        {activeSection.language || "code"}
                      </span>
                    </div>
                    <pre className="code-block rounded-t-none">
                      <code className="text-xs">{activeSection.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Mark complete */}
                <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <button
                    onClick={() => setActiveSectionIndex(Math.max(0, activeSectionIndex - 1))}
                    disabled={activeSectionIndex === 0}
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-30"
                    style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleCompleteSection}
                    className="px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
                    style={{
                      background: completedIds.includes(activeSection.id)
                        ? "rgba(16,185,129,0.15)"
                        : "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
                      color: completedIds.includes(activeSection.id) ? "#10b981" : "white",
                    }}
                  >
                    {completedIds.includes(activeSection.id) ? (
                      <><CheckCircle2 size={14} /> Completed</>
                    ) : (
                      <>Mark Complete & Continue</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Quiz Section */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--color-text-primary)" }}>
                🧠 Knowledge Check
              </h2>
              <div className="space-y-6">
                {topic.quiz.map((q, qi) => (
                  <div key={q.id} className="p-4 rounded-xl" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                    <p className="text-sm font-medium mb-3" style={{ color: "var(--color-text-primary)" }}>
                      {qi + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const isSelected = quizAnswers[q.id] === oi;
                        const isCorrect = showQuizResults && oi === q.correctIndex;
                        const isWrong = showQuizResults && isSelected && oi !== q.correctIndex;
                        return (
                          <button key={oi}
                            onClick={() => !showQuizResults && setQuizAnswers((a) => ({ ...a, [q.id]: oi }))}
                            className="w-full text-left px-4 py-2.5 rounded-lg text-xs transition-all"
                            style={{
                              background: isCorrect ? "rgba(16,185,129,0.1)" : isWrong ? "rgba(244,63,94,0.1)" : isSelected ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)",
                              border: `1px solid ${isCorrect ? "rgba(16,185,129,0.3)" : isWrong ? "rgba(244,63,94,0.3)" : isSelected ? "rgba(99,102,241,0.3)" : "var(--color-border)"}`,
                              color: isCorrect ? "#10b981" : isWrong ? "#f43f5e" : "var(--color-text-secondary)",
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showQuizResults && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs mt-2 p-2 rounded-md"
                        style={{ background: "rgba(255,255,255,0.02)", color: "var(--color-text-tertiary)" }}
                      >
                        💡 {q.explanation}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {showQuizResults ? `Score: ${quizScore}/${topic.quiz.length}` : `${Object.keys(quizAnswers).length}/${topic.quiz.length} answered`}
                </p>
                <button
                  onClick={() => {
                    if (showQuizResults) {
                      setQuizAnswers({});
                      setShowQuizResults(false);
                    } else {
                      setShowQuizResults(true);
                      addXp(quizScore * 20);
                    }
                  }}
                  disabled={!showQuizResults && Object.keys(quizAnswers).length < topic.quiz.length}
                  className="px-5 py-2 rounded-lg text-xs font-semibold disabled:opacity-40"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
                    color: "white",
                  }}
                >
                  {showQuizResults ? "Retry Quiz" : "Submit Answers"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
