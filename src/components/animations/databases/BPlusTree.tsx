"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  keys: number[];
  children: TreeNode[];
  isLeaf: boolean;
  highlight?: boolean;
}

function buildSampleTree(values: number[]): TreeNode {
  // Simplified B+ tree visualization for the ordered set of values
  if (values.length <= 3) {
    return { keys: values, children: [], isLeaf: true };
  }

  if (values.length <= 6) {
    const mid = Math.floor(values.length / 2);
    return {
      keys: [values[mid]],
      children: [
        { keys: values.slice(0, mid), children: [], isLeaf: true },
        { keys: values.slice(mid), children: [], isLeaf: true },
      ],
      isLeaf: false,
    };
  }

  const third = Math.floor(values.length / 3);
  const twoThird = Math.floor((2 * values.length) / 3);
  return {
    keys: [values[third], values[twoThird]],
    children: [
      { keys: values.slice(0, third), children: [], isLeaf: true },
      { keys: values.slice(third, twoThird), children: [], isLeaf: true },
      { keys: values.slice(twoThird), children: [], isLeaf: true },
    ],
    isLeaf: false,
  };
}

function TreeNodeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const bgColor = node.isLeaf ? "rgba(16,185,129,0.08)" : "rgba(99,102,241,0.08)";
  const borderColor = node.isLeaf ? "rgba(16,185,129,0.25)" : "rgba(99,102,241,0.25)";
  const textColor = node.isLeaf ? "#10b981" : "#6366f1";

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: depth * 0.2, type: "spring", stiffness: 200 }}
        className="flex items-center gap-0.5 rounded-lg px-2 py-1.5"
        style={{ background: bgColor, border: `1.5px solid ${borderColor}` }}
      >
        {node.keys.map((key, i) => (
          <motion.span
            key={`${key}-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: depth * 0.2 + i * 0.05 }}
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
            style={{
              background: `${textColor}20`,
              color: textColor,
            }}
          >
            {key}
          </motion.span>
        ))}
      </motion.div>
      {node.children.length > 0 && (
        <div className="flex gap-4 mt-4 relative">
          {/* Connection lines */}
          <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-px h-4"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          {node.children.map((child, i) => (
            <div key={i} className="relative">
              <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-px h-4"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <TreeNodeView node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BPlusTreeAnimation() {
  const [values, setValues] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");

  const tree = buildSampleTree([...values].sort((a, b) => a - b));

  const addValue = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && !values.includes(num) && values.length < 12) {
      setValues((prev) => [...prev, num]);
      setInputValue("");
    }
  };

  const presets = [
    { label: "Small Tree", values: [10, 20, 30] },
    { label: "Medium Tree", values: [5, 10, 15, 20, 25, 30] },
    { label: "Large Tree", values: [3, 7, 10, 15, 20, 25, 30, 35, 40] },
  ];

  return (
    <div className="w-full rounded-xl p-6"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
          B+ Tree Visualization
        </h3>
        <div className="flex items-center gap-2">
          {presets.map((preset) => (
            <button key={preset.label} onClick={() => setValues(preset.values)}
              className="px-3 py-1 rounded-md text-[10px] font-semibold transition-all hover:bg-white/5"
              style={{ color: "var(--color-text-tertiary)", border: "1px solid var(--color-border)" }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tree visualization */}
      <div className="flex justify-center py-8" style={{ minHeight: 200 }}>
        <AnimatePresence mode="wait">
          <motion.div key={values.join("-")} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TreeNodeView node={tree} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Leaf pointer chain */}
      <div className="flex items-center justify-center gap-1 mb-6">
        <p className="text-[10px] mr-2" style={{ color: "var(--color-text-muted)" }}>Leaf chain:</p>
        {[...values].sort((a, b) => a - b).map((v, i) => (
          <motion.div key={v} className="flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
              style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
            >
              {v}
            </span>
            {i < values.length - 1 && (
              <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>→</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addValue()}
          placeholder="Insert value..."
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
          }}
        />
        <button onClick={addValue}
          className="px-4 py-2 rounded-lg text-xs font-semibold"
          style={{
            background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))",
            color: "white",
          }}
        >
          Insert
        </button>
        <button onClick={() => setValues([10, 20, 30])}
          className="px-3 py-2 rounded-lg text-xs font-semibold"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-tertiary)",
          }}
        >
          Reset
        </button>
      </div>

      <div className="mt-4 p-3 rounded-lg"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          <span className="font-semibold">B+ Tree: </span>
          All data stored in <span style={{ color: "#10b981" }}>leaf nodes</span> (green).{" "}
          <span style={{ color: "#6366f1" }}>Internal nodes</span> (purple) only store keys for navigation.{" "}
          Leaf nodes are linked for efficient range queries.
        </p>
      </div>
    </div>
  );
}
