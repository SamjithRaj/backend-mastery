"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { roadmapNodes, roadmapEdges, learningPaths } from "@/data/roadmap";
import {
  Lock,
  Play,
  CheckCircle2,
  Clock,
  Zap,
  Star,
  X,
  ChevronRight,
} from "lucide-react";

const statusColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  locked: {
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.05)",
    text: "#4a4a5e",
    glow: "none",
  },
  available: {
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.25)",
    text: "#6366f1",
    glow: "0 0 20px rgba(99,102,241,0.15)",
  },
  "in-progress": {
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.3)",
    text: "#06b6d4",
    glow: "0 0 25px rgba(6,182,212,0.2)",
  },
  completed: {
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.3)",
    text: "#10b981",
    glow: "0 0 20px rgba(16,185,129,0.15)",
  },
};

const statusIcons: Record<string, React.ReactNode> = {
  locked: <Lock size={14} />,
  available: <Play size={14} />,
  "in-progress": <Play size={14} />,
  completed: <CheckCircle2 size={14} />,
};

function SkillNodeComponent({ data }: NodeProps) {
  const nodeData = data as Record<string, unknown>;
  const status = (nodeData.status as string) || "locked";
  const colors = statusColors[status];

  return (
    <div
      className="relative"
      style={{ cursor: status === "locked" ? "not-allowed" : "pointer" }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: status === "locked" ? 0.5 : 1 }}
        whileHover={status !== "locked" ? { scale: 1.05, y: -2 } : {}}
        transition={{ duration: 0.3 }}
        className="rounded-xl p-4 min-w-[180px]"
        style={{
          background: colors.bg,
          border: `1.5px solid ${colors.border}`,
          boxShadow: colors.glow,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{nodeData.icon as string}</span>
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ color: colors.text }}
          >
            {statusIcons[status]}
          </div>
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: colors.text }}>
          {nodeData.label as string}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
            <Clock size={10} />
            <span className="text-[10px]">{nodeData.hours as number}h</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "var(--color-accent-amber)" }}>
            <Zap size={10} />
            <span className="text-[10px]">+{nodeData.xp as number}</span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: nodeData.difficulty as number }).map((_, i) => (
              <Star key={i} size={8} fill={colors.text} style={{ color: colors.text }} />
            ))}
          </div>
        </div>
        {status !== "locked" && (
          <div className="progress-bar mt-3">
            <div
              className="progress-bar-fill"
              style={{
                width: status === "completed" ? "100%" : status === "in-progress" ? "35%" : "0%",
                background: status === "completed"
                  ? "linear-gradient(90deg, #10b981, #34d399)"
                  : "linear-gradient(90deg, #06b6d4, #22d3ee)",
              }}
            />
          </div>
        )}
      </motion.div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

const nodeTypes = { skillNode: SkillNodeComponent };

export default function RoadmapPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<(typeof roadmapNodes)[0] | null>(null);

  const filteredNodeIds = selectedPath
    ? learningPaths.find((p) => p.id === selectedPath)?.nodeIds || []
    : null;

  const nodes: Node[] = useMemo(
    () =>
      roadmapNodes.map((node) => ({
        id: node.id,
        type: "skillNode",
        position: node.position,
        data: {
          label: node.title,
          icon: node.icon,
          status: node.status,
          hours: node.estimatedHours,
          xp: node.xpReward,
          difficulty: node.difficulty,
          nodeId: node.id,
        },
        style: {
          opacity: filteredNodeIds && !filteredNodeIds.includes(node.id) ? 0.2 : 1,
          transition: "opacity 0.3s ease",
        },
      })),
    [filteredNodeIds]
  );

  const edges: Edge[] = useMemo(
    () =>
      roadmapEdges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: "default",
        animated: true,
        style: {
          stroke: "rgba(255,255,255,0.08)",
          strokeWidth: 2,
          opacity:
            filteredNodeIds &&
            (!filteredNodeIds.includes(edge.source) || !filteredNodeIds.includes(edge.target))
              ? 0.1
              : 1,
        },
      })),
    [filteredNodeIds]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const found = roadmapNodes.find((n) => n.id === node.id);
    if (found && found.status !== "locked") setSelectedNode(found);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold gradient-text">Skill Tree</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Your personalized learning roadmap. Click nodes to explore modules.
        </p>
      </div>

      {/* Path Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setSelectedPath(null)}
          className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: !selectedPath ? "rgba(99,102,241,0.15)" : "var(--color-surface)",
            border: `1px solid ${!selectedPath ? "rgba(99,102,241,0.3)" : "var(--color-border)"}`,
            color: !selectedPath ? "var(--color-accent-indigo)" : "var(--color-text-secondary)",
          }}
        >
          All Paths
        </button>
        {learningPaths.map((path) => (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path.id === selectedPath ? null : path.id)}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: selectedPath === path.id ? `${path.color}20` : "var(--color-surface)",
              border: `1px solid ${selectedPath === path.id ? `${path.color}50` : "var(--color-border)"}`,
              color: selectedPath === path.id ? path.color : "var(--color-text-secondary)",
            }}
          >
            {path.title}
          </button>
        ))}
      </div>

      {/* Skill Tree */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          height: "calc(100vh - 280px)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-primary)",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="rgba(255,255,255,0.03)"
          />
          <Controls />
        </ReactFlow>
      </div>

      {/* Node Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[400px] z-50 p-6 overflow-y-auto"
            style={{
              background: "var(--color-bg-secondary)",
              borderLeft: "1px solid var(--color-border)",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedNode.icon}</span>
                <h2 className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                  {selectedNode.title}
                </h2>
              </div>
              <button onClick={() => setSelectedNode(null)} className="p-1 rounded-md hover:bg-white/5">
                <X size={18} style={{ color: "var(--color-text-tertiary)" }} />
              </button>
            </div>

            <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
              {selectedNode.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="stat-card">
                <p className="text-[10px] mb-1" style={{ color: "var(--color-text-muted)" }}>
                  DIFFICULTY
                </p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14}
                      fill={i < selectedNode.difficulty ? "#f59e0b" : "transparent"}
                      style={{ color: i < selectedNode.difficulty ? "#f59e0b" : "var(--color-text-muted)" }}
                    />
                  ))}
                </div>
              </div>
              <div className="stat-card">
                <p className="text-[10px] mb-1" style={{ color: "var(--color-text-muted)" }}>
                  ESTIMATED TIME
                </p>
                <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                  {selectedNode.estimatedHours}h
                </p>
              </div>
              <div className="stat-card">
                <p className="text-[10px] mb-1" style={{ color: "var(--color-text-muted)" }}>
                  XP REWARD
                </p>
                <p className="text-lg font-bold" style={{ color: "var(--color-accent-amber)" }}>
                  +{selectedNode.xpReward}
                </p>
              </div>
              <div className="stat-card">
                <p className="text-[10px] mb-1" style={{ color: "var(--color-text-muted)" }}>
                  INTERVIEW
                </p>
                <span className={`badge badge-${selectedNode.interviewRelevance === "critical" ? "rose" : selectedNode.interviewRelevance === "high" ? "amber" : "cyan"}`}>
                  {selectedNode.interviewRelevance}
                </span>
              </div>
            </div>

            <h3 className="text-xs font-semibold mb-3" style={{ color: "var(--color-text-muted)" }}>
              SUBTOPICS
            </h3>
            <div className="space-y-2 mb-6">
              {selectedNode.subtopics.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {sub.completed ? (
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent-emerald)" }} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border" style={{ borderColor: "var(--color-text-muted)" }} />
                  )}
                  <span className="text-sm flex-1" style={{ color: "var(--color-text-secondary)" }}>
                    {sub.title}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                    {sub.estimatedMinutes}m
                  </span>
                </div>
              ))}
            </div>

            <button
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
                color: "white",
              }}
            >
              Start Learning <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
