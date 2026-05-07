"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

interface Step {
  id: number;
  label: string;
  description: string;
  clientState: string;
  serverState: string;
  packet: {
    from: "client" | "server";
    label: string;
    flags: string;
    color: string;
  } | null;
}

const steps: Step[] = [
  {
    id: 0,
    label: "Initial State",
    description: "Client wants to establish a connection. Server is listening on a port.",
    clientState: "CLOSED",
    serverState: "LISTEN",
    packet: null,
  },
  {
    id: 1,
    label: "Step 1: SYN",
    description:
      "Client sends a SYN segment with a random Initial Sequence Number (ISN). This is like saying \"Hey, I want to connect! My starting number is X.\"",
    clientState: "SYN_SENT",
    serverState: "LISTEN",
    packet: { from: "client", label: "SYN", flags: "SYN=1, seq=100", color: "#6366f1" },
  },
  {
    id: 2,
    label: "Step 2: SYN-ACK",
    description:
      "Server responds with SYN-ACK, acknowledging the client's SYN and sending its own ISN. \"Got it! My starting number is Y, and I acknowledge your X+1.\"",
    clientState: "SYN_SENT",
    serverState: "SYN_RCVD",
    packet: { from: "server", label: "SYN-ACK", flags: "SYN=1, ACK=1, seq=300, ack=101", color: "#06b6d4" },
  },
  {
    id: 3,
    label: "Step 3: ACK",
    description:
      "Client sends final ACK, confirming it received the server's SYN-ACK. \"Confirmed! I acknowledge your Y+1. Connection established!\"",
    clientState: "ESTABLISHED",
    serverState: "SYN_RCVD",
    packet: { from: "client", label: "ACK", flags: "ACK=1, seq=101, ack=301", color: "#10b981" },
  },
  {
    id: 4,
    label: "Connected!",
    description:
      "Both sides are now in ESTABLISHED state. They can exchange data reliably. The handshake took 1.5 round-trip times (RTT).",
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    packet: null,
  },
];

export default function TcpHandshakeAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 2000);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const step = steps[currentStep];

  const stateColor = (state: string) => {
    if (state === "ESTABLISHED") return "#10b981";
    if (state === "CLOSED" || state === "LISTEN") return "#636380";
    return "#06b6d4";
  };

  return (
    <div className="w-full rounded-xl p-6"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
          TCP 3-Way Handshake
        </h3>
        <div className="flex items-center gap-1">
          {steps.map((_, i) => (
            <button key={i} onClick={() => { setCurrentStep(i); setIsPlaying(false); }}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === currentStep ? "var(--color-accent-indigo)" : "rgba(255,255,255,0.1)",
                transform: i === currentStep ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Animation Area */}
      <div className="relative" style={{ height: 280 }}>
        {/* Client */}
        <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center">
          <motion.div
            className="w-24 rounded-xl p-3 text-center"
            style={{
              background: "linear-gradient(180deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04))",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
            animate={{
              boxShadow: step.clientState === "ESTABLISHED"
                ? "0 0 30px rgba(16,185,129,0.2)"
                : "none",
              borderColor: step.clientState === "ESTABLISHED"
                ? "rgba(16,185,129,0.3)"
                : "rgba(99,102,241,0.2)",
            }}
          >
            <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-lg"
              style={{ background: "rgba(99,102,241,0.15)" }}
            >
              💻
            </div>
            <p className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Client
            </p>
          </motion.div>
          <div className="flex-1 w-px my-2" style={{ background: "rgba(255,255,255,0.06)" }} />
          <motion.div
            className="px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wide"
            animate={{ color: stateColor(step.clientState) }}
            style={{
              background: `${stateColor(step.clientState)}15`,
              border: `1px solid ${stateColor(step.clientState)}30`,
            }}
          >
            {step.clientState}
          </motion.div>
        </div>

        {/* Server */}
        <div className="absolute right-8 top-0 bottom-0 flex flex-col items-center">
          <motion.div
            className="w-24 rounded-xl p-3 text-center"
            style={{
              background: "linear-gradient(180deg, rgba(6,182,212,0.12), rgba(6,182,212,0.04))",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
            animate={{
              boxShadow: step.serverState === "ESTABLISHED"
                ? "0 0 30px rgba(16,185,129,0.2)"
                : "none",
              borderColor: step.serverState === "ESTABLISHED"
                ? "rgba(16,185,129,0.3)"
                : "rgba(6,182,212,0.2)",
            }}
          >
            <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-lg"
              style={{ background: "rgba(6,182,212,0.15)" }}
            >
              🖥️
            </div>
            <p className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Server
            </p>
          </motion.div>
          <div className="flex-1 w-px my-2" style={{ background: "rgba(255,255,255,0.06)" }} />
          <motion.div
            className="px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wide"
            animate={{ color: stateColor(step.serverState) }}
            style={{
              background: `${stateColor(step.serverState)}15`,
              border: `1px solid ${stateColor(step.serverState)}30`,
            }}
          >
            {step.serverState}
          </motion.div>
        </div>

        {/* Packet Animation */}
        <AnimatePresence mode="wait">
          {step.packet && (
            <motion.div
              key={step.id}
              className="absolute top-1/2 -translate-y-1/2"
              initial={{
                x: step.packet.from === "client" ? 140 : 440,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                x: step.packet.from === "client" ? 440 : 140,
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap"
                style={{
                  background: `${step.packet.color}20`,
                  border: `1.5px solid ${step.packet.color}60`,
                  color: step.packet.color,
                  boxShadow: `0 0 20px ${step.packet.color}30`,
                }}
              >
                <p className="text-sm mb-0.5">{step.packet.label}</p>
                <p className="text-[10px] font-mono opacity-70">{step.packet.flags}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connection established effect */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="px-6 py-3 rounded-xl text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#10b981",
                boxShadow: "0 0 40px rgba(16,185,129,0.15)",
              }}
            >
              ✅ Connection Established!
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Step Info */}
      <div className="mt-6 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
          {step.label}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {step.description}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
          className="p-2 rounded-lg transition-colors hover:bg-white/5"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <RotateCcw size={16} />
        </button>
        <button onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          className="p-2 rounded-lg transition-colors hover:bg-white/5"
          style={{ color: "var(--color-text-tertiary)" }}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => {
            if (currentStep >= steps.length - 1) { setCurrentStep(0); }
            setIsPlaying(!isPlaying);
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
            boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
          }}
        >
          {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
        </button>
        <button onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          className="p-2 rounded-lg transition-colors hover:bg-white/5"
          style={{ color: "var(--color-text-tertiary)" }}
          disabled={currentStep === steps.length - 1}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
