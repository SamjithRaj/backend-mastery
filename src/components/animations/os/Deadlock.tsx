"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const colors = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981"];

export default function DeadlockAnimation() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const maxSteps = 5;

  useEffect(() => {
    if (!playing || step >= maxSteps) { if (step >= maxSteps) setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1800);
    return () => clearTimeout(t);
  }, [playing, step]);

  const processes = [
    { id: "P1", x: 80, y: 50, wantsLock: "B", holdsLock: "A" },
    { id: "P2", x: 320, y: 50, wantsLock: "A", holdsLock: "B" },
  ];

  const locks = [
    { id: "A", x: 120, y: 180, holder: step >= 1 ? "P1" : null },
    { id: "B", x: 280, y: 180, holder: step >= 1 ? "P2" : null },
  ];

  return (
    <div className="w-full rounded-xl p-6" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>Deadlock Visualization</h3>
        <div className="flex gap-2">
          <button onClick={() => { setStep(0); setPlaying(false); }} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><RotateCcw size={14} /></button>
          <button onClick={() => { if (step >= maxSteps) setStep(0); setPlaying(!playing); }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
            style={{ background: playing ? "rgba(244,63,94,0.15)" : "rgba(99,102,241,0.15)", color: playing ? "#f43f5e" : "#6366f1" }}>
            {playing ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Play</>}
          </button>
        </div>
      </div>

      <div className="relative" style={{ height: 260 }}>
        {/* Processes */}
        {processes.map((proc, i) => (
          <motion.div key={proc.id} className="absolute flex flex-col items-center"
            style={{ left: proc.x, top: proc.y }}
            animate={{ scale: step >= 3 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: step >= 3 ? Infinity : 0 }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: `${colors[i]}15`, border: `2px solid ${colors[i]}`, color: colors[i],
                boxShadow: step >= 3 ? `0 0 20px ${colors[i]}30` : "none" }}>
              {proc.id}
            </div>
            <p className="text-[10px] mt-1 font-semibold" style={{ color: colors[i] }}>
              {step === 0 ? "Waiting" : step < 3 ? `Holds Lock ${proc.holdsLock}` : "BLOCKED!"}
            </p>
          </motion.div>
        ))}

        {/* Locks */}
        {locks.map((lock, i) => (
          <motion.div key={lock.id} className="absolute flex flex-col items-center"
            style={{ left: lock.x, top: lock.y }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: lock.holder ? `${colors[i]}20` : "rgba(255,255,255,0.05)",
                border: `2px solid ${lock.holder ? colors[i] : "rgba(255,255,255,0.1)"}`,
                color: lock.holder ? colors[i] : "var(--color-text-muted)" }}>
              🔒{lock.id}
            </div>
            {lock.holder && step >= 1 && (
              <p className="text-[9px] mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                Held by {lock.holder}
              </p>
            )}
          </motion.div>
        ))}

        {/* Arrows showing wants */}
        {step >= 2 && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute text-[10px] font-bold"
              style={{ left: 170, top: 120, color: "#f43f5e" }}>
              P1 wants Lock B →
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute text-[10px] font-bold"
              style={{ left: 170, top: 140, color: "#f43f5e" }}>
              ← P2 wants Lock A
            </motion.div>
          </>
        )}

        {/* Deadlock indicator */}
        {step >= 3 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-bold"
            style={{ top: 210, background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)",
              color: "#f43f5e", boxShadow: "0 0 30px rgba(244,63,94,0.15)" }}>
            🔴 DEADLOCK — Circular Wait!
          </motion.div>
        )}
      </div>

      <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {step === 0 && "Both processes need two locks to proceed."}
          {step === 1 && "P1 acquires Lock A. P2 acquires Lock B."}
          {step === 2 && "P1 tries to acquire Lock B (held by P2). P2 tries to acquire Lock A (held by P1)."}
          {step >= 3 && "Neither can proceed — each waits for the other. This is a deadlock! Fix: always acquire locks in the same order (A before B)."}
        </p>
      </div>
    </div>
  );
}
