"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function ContextSwitchAnimation() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || step >= 6) { if (step >= 6) setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [playing, step]);

  const regs = ["RAX", "RBX", "RIP", "RSP"];
  const p1Vals = ["0x42", "0xFF", "0x1A00", "0x7F00"];
  const p2Vals = ["0x13", "0x88", "0x2B00", "0x8F00"];

  return (
    <div className="w-full rounded-xl p-6" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>Context Switch</h3>
        <div className="flex gap-2">
          <button onClick={() => { setStep(0); setPlaying(false); }} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><RotateCcw size={14} /></button>
          <button onClick={() => { if (step >= 6) setStep(0); setPlaying(!playing); }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))" }}>
            {playing ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4" style={{ minHeight: 240 }}>
        {/* Process A PCB */}
        <div className="rounded-xl p-4" style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)" }}>
          <p className="text-xs font-bold mb-3" style={{ color: "#6366f1" }}>Process A {step < 2 ? "(RUNNING)" : "(SAVED)"}</p>
          <div className="space-y-1.5">
            {regs.map((reg, i) => (
              <motion.div key={reg} className="flex items-center gap-2 px-2 py-1 rounded text-[10px] font-mono"
                animate={{ background: step === 1 ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.05)", scale: step === 1 ? 1.02 : 1 }}
                style={{ color: "#6366f1" }}>
                <span className="w-8 font-semibold">{reg}</span>
                <span>{p1Vals[i]}</span>
                {step === 1 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] ml-auto">SAVING</motion.span>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CPU */}
        <div className="flex flex-col items-center justify-center">
          <motion.div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl"
            animate={{ borderColor: step < 2 ? "#6366f1" : step < 5 ? "#f59e0b" : "#06b6d4", boxShadow: `0 0 25px ${step < 2 ? "rgba(99,102,241,0.2)" : step < 5 ? "rgba(245,158,11,0.2)" : "rgba(6,182,212,0.2)"}` }}
            style={{ background: "rgba(255,255,255,0.03)", border: "2px solid" }}>
            ⚡
          </motion.div>
          <p className="text-xs font-bold mt-2" style={{ color: step < 2 ? "#6366f1" : step < 5 ? "#f59e0b" : "#06b6d4" }}>
            {step < 2 ? "Running A" : step < 5 ? "Switching..." : "Running B"}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>
            {["A running", "Save A registers", "Flush TLB", "Load B PCB", "Restore B registers", "B running", "B executing"][step]}
          </p>
        </div>

        {/* Process B PCB */}
        <div className="rounded-xl p-4" style={{ background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)" }}>
          <p className="text-xs font-bold mb-3" style={{ color: "#06b6d4" }}>Process B {step >= 5 ? "(RUNNING)" : "(WAITING)"}</p>
          <div className="space-y-1.5">
            {regs.map((reg, i) => (
              <motion.div key={reg} className="flex items-center gap-2 px-2 py-1 rounded text-[10px] font-mono"
                animate={{ background: step === 4 ? "rgba(6,182,212,0.2)" : "rgba(6,182,212,0.05)", scale: step === 4 ? 1.02 : 1 }}
                style={{ color: "#06b6d4" }}>
                <span className="w-8 font-semibold">{reg}</span>
                <span>{p2Vals[i]}</span>
                {step === 4 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] ml-auto">LOADING</motion.span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost indicator */}
      <div className="mt-4 p-3 rounded-lg flex items-center gap-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
        <div>
          <p className="text-[10px] font-semibold" style={{ color: "var(--color-text-muted)" }}>DIRECT COST</p>
          <p className="text-xs font-bold" style={{ color: "#f59e0b" }}>~1-10 μs</p>
        </div>
        <div className="h-6 w-px" style={{ background: "var(--color-border)" }} />
        <div>
          <p className="text-[10px] font-semibold" style={{ color: "var(--color-text-muted)" }}>INDIRECT COST</p>
          <p className="text-xs font-bold" style={{ color: "#f43f5e" }}>Cache pollution</p>
        </div>
        <div className="h-6 w-px" style={{ background: "var(--color-border)" }} />
        <p className="text-xs flex-1" style={{ color: "var(--color-text-tertiary)" }}>Thread switches are cheaper (no TLB flush)</p>
      </div>
    </div>
  );
}
