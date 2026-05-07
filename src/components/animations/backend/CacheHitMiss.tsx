"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

interface CacheEntry { key: string; value: string; ttl: number; }
interface RequestResult { id: number; key: string; hit: boolean; }

export default function CacheHitMissAnimation() {
  const [cache, setCache] = useState<CacheEntry[]>([]);
  const [results, setResults] = useState<RequestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const maxCache = 4;
  const keys = ["user:1", "user:2", "user:3", "user:1", "user:4", "user:1", "user:5", "user:2"];

  const processNext = useCallback(() => {
    if (counter >= keys.length) { setRunning(false); return; }
    const key = keys[counter];
    const hit = cache.some((e) => e.key === key);
    setResults((r) => [...r.slice(-6), { id: Date.now(), key, hit }]);
    if (!hit) {
      setCache((c) => {
        const newCache = [...c, { key, value: `data_${key}`, ttl: 30 }];
        if (newCache.length > maxCache) return newCache.slice(1);
        return newCache;
      });
    }
    setCounter((c) => c + 1);
  }, [counter, cache]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(processNext, 1200);
    return () => clearTimeout(t);
  }, [running, processNext]);

  const reset = () => { setCache([]); setResults([]); setCounter(0); setRunning(false); };
  const hits = results.filter((r) => r.hit).length;
  const total = results.length;

  return (
    <div className="w-full rounded-xl p-6" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>Cache Hit / Miss</h3>
        <div className="flex gap-2">
          <button onClick={reset} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><RotateCcw size={14} /></button>
          <button onClick={() => { if (counter >= keys.length) reset(); setRunning(!running); }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            style={{ background: running ? "rgba(244,63,94,0.15)" : "rgba(16,185,129,0.15)", color: running ? "#f43f5e" : "#10b981" }}>
            {running ? <><Pause size={12} /> Stop</> : <><Play size={12} /> Start</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4" style={{ minHeight: 200 }}>
        {/* Request Queue */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>REQUEST QUEUE</p>
          <div className="space-y-1">
            {keys.map((key, i) => (
              <motion.div key={i} className="px-3 py-1.5 rounded-md text-xs font-mono"
                animate={{ opacity: i < counter ? 0.3 : i === counter ? 1 : 0.6, scale: i === counter ? 1.05 : 1,
                  background: i === counter ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)" }}
                style={{ border: `1px solid ${i === counter ? "rgba(99,102,241,0.2)" : "var(--color-border)"}`, color: "var(--color-text-secondary)" }}>
                GET {key} {i < counter && (results[i]?.hit ? "✅" : "❌")}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cache */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>CACHE ({cache.length}/{maxCache})</p>
          <div className="space-y-1">
            <AnimatePresence>
              {cache.map((entry) => (
                <motion.div key={entry.key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="px-3 py-1.5 rounded-md text-xs font-mono"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", color: "#10b981" }}>
                  {entry.key} → {entry.value}
                </motion.div>
              ))}
            </AnimatePresence>
            {cache.length === 0 && <p className="text-xs py-4 text-center" style={{ color: "var(--color-text-muted)" }}>Empty</p>}
          </div>
        </div>

        {/* Stats */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>STATS</p>
          <div className="space-y-2">
            <div className="stat-card"><p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Hit Rate</p>
              <p className="text-lg font-bold" style={{ color: "#10b981" }}>{total > 0 ? Math.round((hits / total) * 100) : 0}%</p>
            </div>
            <div className="stat-card"><p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Hits</p>
              <p className="text-lg font-bold" style={{ color: "#10b981" }}>{hits}</p>
            </div>
            <div className="stat-card"><p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Misses</p>
              <p className="text-lg font-bold" style={{ color: "#f43f5e" }}>{total - hits}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          <span className="font-semibold">Cache-Aside Pattern: </span>Check cache first. On miss, fetch from DB and store in cache. LRU eviction when cache is full ({maxCache} entries).
        </p>
      </div>
    </div>
  );
}
