"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

const stages: PipelineStage[] = [
  { id: "client", label: "Client", icon: "💻", color: "#6366f1", description: "Browser sends HTTP request" },
  { id: "dns", label: "DNS", icon: "🌐", color: "#8b5cf6", description: "Domain resolved to IP address" },
  { id: "lb", label: "Load Balancer", icon: "⚖️", color: "#06b6d4", description: "Request routed to server instance" },
  { id: "middleware", label: "Middleware", icon: "🔗", color: "#0ea5e9", description: "Logging, CORS, rate limiting" },
  { id: "auth", label: "Auth", icon: "🔐", color: "#f59e0b", description: "JWT validation, permissions check" },
  { id: "handler", label: "Route Handler", icon: "📋", color: "#10b981", description: "Business logic executed" },
  { id: "db", label: "Database", icon: "🗄️", color: "#f43f5e", description: "Query executed, data retrieved" },
  { id: "response", label: "Response", icon: "📤", color: "#10b981", description: "JSON response sent to client" },
];

export default function ApiLifecycleAnimation() {
  const [activeStage, setActiveStage] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (direction === "forward") {
        if (activeStage >= stages.length - 1) {
          setDirection("backward");
          setActiveStage(stages.length - 2);
        } else {
          setActiveStage((s) => s + 1);
        }
      } else {
        if (activeStage <= 0) {
          setIsPlaying(false);
          setDirection("forward");
          setActiveStage(-1);
        } else {
          setActiveStage((s) => s - 1);
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying, activeStage, direction]);

  const reset = () => {
    setActiveStage(-1);
    setIsPlaying(false);
    setDirection("forward");
  };

  return (
    <div className="w-full rounded-xl p-6"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
          API Request Lifecycle
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-lg hover:bg-white/5"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <RotateCcw size={14} />
          </button>
          <button onClick={() => {
              if (activeStage === -1) setActiveStage(0);
              setIsPlaying(!isPlaying);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
            }}
          >
            {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Pipeline */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {stages.map((stage, i) => {
          const isActive = i === activeStage;
          const isPast = direction === "forward" ? i < activeStage : i > activeStage;
          const isFuture = !isActive && !isPast;

          return (
            <div key={stage.id} className="flex items-center">
              <motion.button
                onClick={() => { setActiveStage(i); setIsPlaying(false); setDirection("forward"); }}
                className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl transition-all min-w-[80px]"
                animate={{
                  background: isActive ? `${stage.color}15` : "transparent",
                  borderColor: isActive ? `${stage.color}40` : "transparent",
                  scale: isActive ? 1.05 : 1,
                  opacity: isFuture && activeStage >= 0 ? 0.4 : 1,
                }}
                style={{ border: "1px solid transparent" }}
              >
                <motion.span className="text-xl"
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {stage.icon}
                </motion.span>
                <span className="text-[10px] font-semibold whitespace-nowrap"
                  style={{ color: isActive ? stage.color : "var(--color-text-tertiary)" }}
                >
                  {stage.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: stage.color }}
                  />
                )}
              </motion.button>
              {i < stages.length - 1 && (
                <motion.div
                  className="w-4 h-px mx-0.5"
                  animate={{
                    background: isPast || isActive
                      ? direction === "forward" ? "#6366f1" : "#10b981"
                      : "rgba(255,255,255,0.06)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active stage details */}
      <AnimatePresence mode="wait">
        {activeStage >= 0 && (
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 rounded-lg"
            style={{
              background: `${stages[activeStage].color}08`,
              border: `1px solid ${stages[activeStage].color}20`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{stages[activeStage].icon}</span>
              <h4 className="text-sm font-bold" style={{ color: stages[activeStage].color }}>
                {stages[activeStage].label}
              </h4>
              <span className="badge badge-indigo">{direction === "forward" ? "REQUEST →" : "← RESPONSE"}</span>
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              {stages[activeStage].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
