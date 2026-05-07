"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

const steps = [
  { id: 0, label: "Browser Cache", icon: "💻", desc: "Check if domain was recently resolved and cached locally.", result: "MISS", color: "#f43f5e" },
  { id: 1, label: "OS Cache", icon: "🖥️", desc: "Check operating system DNS cache (/etc/hosts).", result: "MISS", color: "#f43f5e" },
  { id: 2, label: "Recursive Resolver", icon: "🔄", desc: "ISP's DNS resolver starts the lookup process.", result: "QUERY", color: "#6366f1" },
  { id: 3, label: "Root Server", icon: "🌐", desc: "Root server says: '.com domains? Ask the .com TLD server.'", result: "REFERRAL", color: "#f59e0b" },
  { id: 4, label: "TLD Server (.com)", icon: "📋", desc: "TLD server says: 'example.com? Ask ns1.example.com.'", result: "REFERRAL", color: "#f59e0b" },
  { id: 5, label: "Authoritative Server", icon: "✅", desc: "Authoritative server returns: 'example.com → 93.184.216.34'", result: "ANSWER", color: "#10b981" },
  { id: 6, label: "Cached & Returned", icon: "⚡", desc: "IP cached at each level. Browser can now connect!", result: "RESOLVED", color: "#10b981" },
];

export default function DnsResolutionAnimation() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || current >= steps.length - 1) { if (current >= steps.length - 1) setPlaying(false); return; }
    const t = setTimeout(() => setCurrent((s) => s + 1), 1500);
    return () => clearTimeout(t);
  }, [playing, current]);

  return (
    <div className="w-full rounded-xl p-6" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>DNS Resolution</h3>
        <div className="flex gap-1">{steps.map((_, i) => (<div key={i} className="w-2 h-2 rounded-full" style={{ background: i <= current ? "#6366f1" : "rgba(255,255,255,0.1)" }} />))}</div>
      </div>
      <div className="space-y-2" style={{ minHeight: 260 }}>
        {steps.map((step, i) => (
          <motion.div key={step.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: i <= current ? 1 : 0.2, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: i === current ? `${step.color}10` : "transparent", border: i === current ? `1px solid ${step.color}30` : "1px solid transparent" }}
          >
            <span className="text-lg w-8 text-center">{step.icon}</span>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: i <= current ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>{step.label}</p>
              {i <= current && <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>{step.desc}</p>}
            </div>
            {i <= current && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${step.color}20`, color: step.color }}>{step.result}</span>}
            {i < current && i < steps.length - 1 && <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>→</span>}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => { setCurrent(0); setPlaying(false); }} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><RotateCcw size={14} /></button>
        <button onClick={() => setCurrent((s) => Math.max(0, s - 1))} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><ChevronLeft size={16} /></button>
        <button onClick={() => { if (current >= steps.length - 1) setCurrent(0); setPlaying(!playing); }}
          className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))" }}>
          {playing ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
        </button>
        <button onClick={() => setCurrent((s) => Math.min(steps.length - 1, s + 1))} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
