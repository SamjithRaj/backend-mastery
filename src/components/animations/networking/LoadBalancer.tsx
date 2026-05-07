"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const algorithms = ["Round Robin", "Least Connections", "Random"] as const;
type Algo = (typeof algorithms)[number];

interface Server { id: string; label: string; connections: number; color: string; }
interface Req { id: number; targetServer: string; }

export default function LoadBalancerAnimation() {
  const [algo, setAlgo] = useState<Algo>("Round Robin");
  const [servers, setServers] = useState<Server[]>([
    { id: "s1", label: "Server 1", connections: 0, color: "#6366f1" },
    { id: "s2", label: "Server 2", connections: 0, color: "#06b6d4" },
    { id: "s3", label: "Server 3", connections: 0, color: "#10b981" },
  ]);
  const [requests, setRequests] = useState<Req[]>([]);
  const [running, setRunning] = useState(false);
  const [rrIndex, setRrIndex] = useState(0);

  const pickServer = useCallback((): string => {
    if (algo === "Round Robin") {
      const srv = servers[rrIndex % servers.length].id;
      setRrIndex((i) => i + 1);
      return srv;
    }
    if (algo === "Least Connections") {
      return servers.reduce((min, s) => (s.connections < min.connections ? s : min), servers[0]).id;
    }
    return servers[Math.floor(Math.random() * servers.length)].id;
  }, [algo, servers, rrIndex]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const target = pickServer();
      setRequests((r) => [...r.slice(-5), { id: Date.now(), targetServer: target }]);
      setServers((s) => s.map((srv) => srv.id === target ? { ...srv, connections: srv.connections + 1 } : srv));
    }, 1000);
    return () => clearInterval(t);
  }, [running, pickServer]);

  const reset = () => { setRunning(false); setRequests([]); setRrIndex(0); setServers((s) => s.map((srv) => ({ ...srv, connections: 0 }))); };
  const total = servers.reduce((s, srv) => s + srv.connections, 0);

  return (
    <div className="w-full rounded-xl p-6" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>Load Balancer</h3>
        <div className="flex gap-2">
          {algorithms.map((a) => (
            <button key={a} onClick={() => { setAlgo(a); reset(); }}
              className="px-3 py-1 rounded-md text-[10px] font-semibold"
              style={{ background: algo === a ? "rgba(99,102,241,0.15)" : "transparent", color: algo === a ? "#6366f1" : "var(--color-text-muted)", border: `1px solid ${algo === a ? "rgba(99,102,241,0.3)" : "var(--color-border)"}` }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6" style={{ minHeight: 180 }}>
        {/* Clients */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl">💻</div>
          <p className="text-[10px] font-semibold" style={{ color: "var(--color-text-muted)" }}>Clients</p>
          <p className="text-xs font-bold" style={{ color: "var(--color-text-primary)" }}>{total} req</p>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex items-center"><div className="w-full h-px" style={{ background: "rgba(255,255,255,0.1)" }} /></div>

        {/* Load Balancer */}
        <motion.div className="w-16 h-16 rounded-xl flex items-center justify-center text-xl"
          animate={{ boxShadow: running ? "0 0 20px rgba(99,102,241,0.2)" : "none" }}
          style={{ background: "rgba(99,102,241,0.1)", border: "1.5px solid rgba(99,102,241,0.25)" }}>
          ⚖️
        </motion.div>

        {/* Arrows */}
        <div className="flex-1 flex items-center"><div className="w-full h-px" style={{ background: "rgba(255,255,255,0.1)" }} /></div>

        {/* Servers */}
        <div className="space-y-2">
          {servers.map((srv) => (
            <motion.div key={srv.id} className="flex items-center gap-2 px-3 py-2 rounded-lg"
              animate={{ background: requests.length > 0 && requests[requests.length - 1]?.targetServer === srv.id ? `${srv.color}15` : "rgba(255,255,255,0.02)" }}
              style={{ border: `1px solid ${srv.color}20` }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{ background: `${srv.color}20`, color: srv.color }}>🖥</div>
              <div>
                <p className="text-[10px] font-semibold" style={{ color: srv.color }}>{srv.label}</p>
                <p className="text-[9px]" style={{ color: "var(--color-text-muted)" }}>{srv.connections} conn</p>
              </div>
              <div className="w-12 h-1.5 rounded-full ml-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                <motion.div className="h-full rounded-full" animate={{ width: total > 0 ? `${(srv.connections / Math.max(total, 1)) * 100}%` : "0%" }}
                  style={{ background: srv.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-4 justify-center">
        <button onClick={reset} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><RotateCcw size={14} /></button>
        <button onClick={() => setRunning(!running)}
          className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          style={{ background: running ? "rgba(244,63,94,0.15)" : "rgba(16,185,129,0.15)", color: running ? "#f43f5e" : "#10b981" }}>
          {running ? <><Pause size={12} /> Stop</> : <><Play size={12} /> Start</>}
        </button>
      </div>
    </div>
  );
}
