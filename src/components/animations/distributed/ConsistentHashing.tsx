"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeItem {
  id: string;
  label: string;
  angle: number;
  color: string;
}

interface KeyItem {
  id: string;
  label: string;
  angle: number;
  assignedNode: string;
}

const initialNodes: NodeItem[] = [
  { id: "n1", label: "Server A", angle: 30, color: "#6366f1" },
  { id: "n2", label: "Server B", angle: 150, color: "#06b6d4" },
  { id: "n3", label: "Server C", angle: 270, color: "#10b981" },
];

const initialKeys: KeyItem[] = [
  { id: "k1", label: "user:1", angle: 60, assignedNode: "n2" },
  { id: "k2", label: "user:2", angle: 180, assignedNode: "n3" },
  { id: "k3", label: "user:3", angle: 310, assignedNode: "n1" },
  { id: "k4", label: "user:4", angle: 100, assignedNode: "n2" },
  { id: "k5", label: "user:5", angle: 220, assignedNode: "n3" },
];

function getPosition(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: 150 + radius * Math.cos(rad), y: 150 + radius * Math.sin(rad) };
}

export default function ConsistentHashingAnimation() {
  const [nodes, setNodes] = useState(initialNodes);
  const [keys] = useState(initialKeys);
  const [showNewNode, setShowNewNode] = useState(false);
  const radius = 120;
  const keyRadius = 95;

  const newNode: NodeItem = { id: "n4", label: "Server D", angle: 200, color: "#f59e0b" };

  const getNodeColor = (nodeId: string) => {
    const all = showNewNode ? [...nodes, newNode] : nodes;
    return all.find((n) => n.id === nodeId)?.color || "#636380";
  };

  const getAssignment = (keyAngle: number): string => {
    const all = showNewNode ? [...nodes, newNode] : nodes;
    const sorted = [...all].sort((a, b) => a.angle - b.angle);
    for (const node of sorted) {
      if (node.angle >= keyAngle) return node.id;
    }
    return sorted[0].id;
  };

  return (
    <div className="w-full rounded-xl p-6"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Consistent Hashing Ring
        </h3>
        <button
          onClick={() => setShowNewNode(!showNewNode)}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: showNewNode ? "rgba(244,63,94,0.15)" : "rgba(245,158,11,0.15)",
            color: showNewNode ? "#f43f5e" : "#f59e0b",
            border: `1px solid ${showNewNode ? "rgba(244,63,94,0.3)" : "rgba(245,158,11,0.3)"}`,
          }}
        >
          {showNewNode ? "Remove Server D" : "+ Add Server D"}
        </button>
      </div>

      <div className="flex gap-8 items-start">
        {/* Ring */}
        <div className="relative" style={{ width: 300, height: 300 }}>
          {/* Circle */}
          <svg width="300" height="300" className="absolute inset-0">
            <circle cx="150" cy="150" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {/* Tick marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const p = getPosition(angle, radius);
              return (
                <circle key={angle} cx={p.x} cy={p.y} r="1.5" fill="rgba(255,255,255,0.1)" />
              );
            })}
          </svg>

          {/* Nodes on ring */}
          {nodes.map((node) => {
            const pos = getPosition(node.angle, radius);
            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{ left: pos.x - 16, top: pos.y - 16 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: `${node.color}30`,
                    border: `2px solid ${node.color}`,
                    color: node.color,
                    boxShadow: `0 0 12px ${node.color}30`,
                  }}
                >
                  {node.label[7]}
                </div>
                <span className="text-[9px] mt-0.5 whitespace-nowrap" style={{ color: node.color }}>
                  {node.label}
                </span>
              </motion.div>
            );
          })}

          {/* New node */}
          <AnimatePresence>
            {showNewNode && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute flex flex-col items-center"
                style={{ left: getPosition(newNode.angle, radius).x - 16, top: getPosition(newNode.angle, radius).y - 16 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: `${newNode.color}30`,
                    border: `2px solid ${newNode.color}`,
                    color: newNode.color,
                    boxShadow: `0 0 15px ${newNode.color}40`,
                  }}
                >
                  D
                </div>
                <span className="text-[9px] mt-0.5 whitespace-nowrap" style={{ color: newNode.color }}>
                  {newNode.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keys on ring */}
          {keys.map((key) => {
            const pos = getPosition(key.angle, keyRadius);
            const assignedTo = getAssignment(key.angle);
            const nodeColor = getNodeColor(assignedTo);
            const changed = showNewNode && assignedTo !== key.assignedNode;
            return (
              <motion.div
                key={key.id}
                className="absolute"
                style={{ left: pos.x - 10, top: pos.y - 10 }}
                animate={{
                  boxShadow: changed ? `0 0 10px ${nodeColor}50` : "none",
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-bold"
                  animate={{
                    background: `${nodeColor}20`,
                    borderColor: `${nodeColor}50`,
                    color: nodeColor,
                  }}
                  style={{ border: "1px solid" }}
                >
                  {key.label.split(":")[1]}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend & Info */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-[10px] font-semibold tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
              KEY ASSIGNMENTS
            </p>
            <div className="space-y-2">
              {keys.map((key) => {
                const assignedTo = getAssignment(key.angle);
                const allNodes = showNewNode ? [...nodes, newNode] : nodes;
                const node = allNodes.find((n) => n.id === assignedTo);
                const changed = showNewNode && assignedTo !== key.assignedNode;
                return (
                  <motion.div key={key.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs"
                    animate={{
                      background: changed ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.02)",
                      borderColor: changed ? "rgba(245,158,11,0.2)" : "var(--color-border)",
                    }}
                    style={{ border: "1px solid" }}
                  >
                    <span className="font-mono font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {key.label}
                    </span>
                    <span style={{ color: "var(--color-text-muted)" }}>→</span>
                    <span className="font-semibold" style={{ color: node?.color }}>
                      {node?.label}
                    </span>
                    {changed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] font-bold ml-auto"
                        style={{ color: "#f59e0b" }}
                      >
                        REMAPPED
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {showNewNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg"
              style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}
            >
              <p className="text-xs" style={{ color: "#f59e0b" }}>
                ⚡ Only ~K/N keys remapped! Most keys stay on their original server.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          <span className="font-semibold">Consistent Hashing: </span>
          Servers and keys are mapped onto a ring. Each key is assigned to the next server clockwise.
          When a server is added/removed, only keys between it and the previous server are affected.
        </p>
      </div>
    </div>
  );
}
