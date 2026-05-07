"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

interface Request {
  id: number;
  status: "pending" | "allowed" | "rejected";
  y: number;
}

export default function RateLimiterAnimation() {
  const [tokens, setTokens] = useState(5);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [requestCounter, setRequestCounter] = useState(0);
  const maxTokens = 5;
  const refillRate = 1;

  const addRequest = useCallback(() => {
    setRequestCounter((c) => c + 1);
    setRequests((prev) => [
      ...prev.slice(-8),
      { id: Date.now(), status: "pending", y: Math.random() * 60 },
    ]);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const requestInterval = setInterval(addRequest, 800);
    const refillInterval = setInterval(() => {
      setTokens((t) => Math.min(maxTokens, t + refillRate));
    }, 2000);

    return () => {
      clearInterval(requestInterval);
      clearInterval(refillInterval);
    };
  }, [isRunning, addRequest]);

  useEffect(() => {
    if (requests.length === 0) return;
    const last = requests[requests.length - 1];
    if (last.status !== "pending") return;

    const timer = setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) => {
          if (r.id !== last.id) return r;
          if (tokens > 0) {
            setTokens((t) => t - 1);
            return { ...r, status: "allowed" };
          }
          return { ...r, status: "rejected" };
        })
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [requests, tokens]);

  const reset = () => {
    setTokens(5);
    setRequests([]);
    setIsRunning(false);
    setRequestCounter(0);
  };

  return (
    <div className="w-full rounded-xl p-6"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Token Bucket Rate Limiter
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-lg hover:bg-white/5"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <RotateCcw size={14} />
          </button>
          <button onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            style={{
              background: isRunning ? "rgba(244,63,94,0.15)" : "rgba(16,185,129,0.15)",
              color: isRunning ? "#f43f5e" : "#10b981",
              border: `1px solid ${isRunning ? "rgba(244,63,94,0.3)" : "rgba(16,185,129,0.3)"}`,
            }}
          >
            {isRunning ? <><Pause size={12} /> Stop</> : <><Play size={12} /> Start</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6" style={{ minHeight: 200 }}>
        {/* Token Bucket */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
            TOKEN BUCKET
          </p>
          <div className="rounded-xl p-4 text-center"
            style={{
              background: "rgba(99,102,241,0.05)",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <div className="flex justify-center gap-2 mb-3">
              {Array.from({ length: maxTokens }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 rounded-full"
                  animate={{
                    background: i < tokens ? "#6366f1" : "rgba(255,255,255,0.05)",
                    scale: i < tokens ? 1 : 0.8,
                    boxShadow: i < tokens ? "0 0 10px rgba(99,102,241,0.4)" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </div>
            <p className="text-lg font-bold" style={{ color: "var(--color-accent-indigo)" }}>
              {tokens}/{maxTokens}
            </p>
            <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>
              Refills 1 token/2s
            </p>
          </div>
        </div>

        {/* Request Flow */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
            INCOMING REQUESTS
          </p>
          <div className="relative rounded-xl p-2 overflow-hidden"
            style={{
              minHeight: 160,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--color-border)",
            }}
          >
            <AnimatePresence>
              {requests.slice(-6).map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-1.5 mb-1 rounded-md text-[10px] font-semibold"
                  style={{
                    background:
                      req.status === "allowed"
                        ? "rgba(16,185,129,0.1)"
                        : req.status === "rejected"
                        ? "rgba(244,63,94,0.1)"
                        : "rgba(255,255,255,0.03)",
                    color:
                      req.status === "allowed"
                        ? "#10b981"
                        : req.status === "rejected"
                        ? "#f43f5e"
                        : "var(--color-text-tertiary)",
                  }}
                >
                  <span>{req.status === "allowed" ? "✅" : req.status === "rejected" ? "❌" : "⏳"}</span>
                  <span>Request</span>
                  <span className="ml-auto">{req.status.toUpperCase()}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats */}
        <div>
          <p className="text-[10px] font-semibold tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
            STATS
          </p>
          <div className="space-y-3">
            <div className="stat-card">
              <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Total Requests</p>
              <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                {requests.length}
              </p>
            </div>
            <div className="stat-card">
              <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Allowed</p>
              <p className="text-lg font-bold" style={{ color: "#10b981" }}>
                {requests.filter((r) => r.status === "allowed").length}
              </p>
            </div>
            <div className="stat-card">
              <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Rejected</p>
              <p className="text-lg font-bold" style={{ color: "#f43f5e" }}>
                {requests.filter((r) => r.status === "rejected").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          <span className="font-semibold">Token Bucket Algorithm: </span>
          A bucket holds up to {maxTokens} tokens. Each request consumes 1 token. Tokens refill at a fixed rate.
          When the bucket is empty, requests are rejected. This allows controlled bursts while maintaining an average rate.
        </p>
      </div>
    </div>
  );
}
