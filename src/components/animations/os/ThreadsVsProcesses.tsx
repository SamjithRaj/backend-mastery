"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const processColors = ["#6366f1", "#06b6d4", "#f59e0b"];

export default function ThreadsVsProcessesAnimation() {
  const [view, setView] = useState<"process" | "thread">("process");

  return (
    <div className="w-full rounded-xl p-6"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Threads vs Processes
        </h3>
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
          <button onClick={() => setView("process")}
            className="px-4 py-1.5 text-xs font-semibold transition-all"
            style={{
              background: view === "process" ? "rgba(99,102,241,0.15)" : "transparent",
              color: view === "process" ? "#6366f1" : "var(--color-text-tertiary)",
            }}
          >
            Processes
          </button>
          <button onClick={() => setView("thread")}
            className="px-4 py-1.5 text-xs font-semibold transition-all"
            style={{
              background: view === "thread" ? "rgba(6,182,212,0.15)" : "transparent",
              color: view === "thread" ? "#06b6d4" : "var(--color-text-tertiary)",
            }}
          >
            Threads
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "process" ? (
          <motion.div
            key="process"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-2 gap-4"
            style={{ minHeight: 280 }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl p-4"
                style={{
                  background: `${processColors[i]}08`,
                  border: `1.5px solid ${processColors[i]}30`,
                }}
              >
                <p className="text-xs font-bold mb-3" style={{ color: processColors[i] }}>
                  Process {i + 1} (PID: {1000 + i})
                </p>
                <div className="space-y-2">
                  {["Code", "Data", "Heap", "Stack"].map((seg) => (
                    <motion.div
                      key={seg}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.3 + Math.random() * 0.3, duration: 0.5 }}
                      className="rounded-md px-3 py-1.5 text-[10px] font-mono font-semibold"
                      style={{
                        background: `${processColors[i]}15`,
                        color: processColors[i],
                        border: `1px solid ${processColors[i]}20`,
                      }}
                    >
                      {seg} Segment
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] mt-3" style={{ color: "var(--color-text-muted)" }}>
                  ↑ Separate memory space
                </p>
              </motion.div>
            ))}
            <div className="col-span-2 p-3 rounded-lg text-center"
              style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.15)" }}
            >
              <p className="text-xs" style={{ color: "#f43f5e" }}>
                ❌ Processes do NOT share memory — communication requires IPC (pipes, sockets, shared memory)
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thread"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ minHeight: 280 }}
          >
            <motion.div
              className="rounded-xl p-4"
              style={{
                background: "rgba(6,182,212,0.05)",
                border: "1.5px solid rgba(6,182,212,0.2)",
              }}
            >
              <p className="text-xs font-bold mb-3" style={{ color: "#06b6d4" }}>
                Process (PID: 1000)
              </p>
              {/* Shared memory */}
              <div className="mb-3 space-y-2">
                {["Code (shared)", "Data (shared)", "Heap (shared)"].map((seg) => (
                  <motion.div
                    key={seg}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="rounded-md px-3 py-1.5 text-[10px] font-mono font-semibold"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      color: "#10b981",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    ✅ {seg}
                  </motion.div>
                ))}
              </div>
              {/* Per-thread stacks */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((t) => (
                  <motion.div
                    key={t}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + t * 0.1, type: "spring" }}
                    className="rounded-lg p-2 text-center"
                    style={{
                      background: `${processColors[t - 1]}10`,
                      border: `1px solid ${processColors[t - 1]}25`,
                    }}
                  >
                    <p className="text-[10px] font-bold" style={{ color: processColors[t - 1] }}>
                      Thread {t}
                    </p>
                    <p className="text-[9px] font-mono mt-1" style={{ color: "var(--color-text-muted)" }}>
                      Own Stack
                    </p>
                    <p className="text-[9px] font-mono" style={{ color: "var(--color-text-muted)" }}>
                      Own Registers
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="mt-3 p-3 rounded-lg text-center"
              style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
            >
              <p className="text-xs" style={{ color: "#10b981" }}>
                ✅ Threads share code, data, and heap — only stack and registers are separate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
