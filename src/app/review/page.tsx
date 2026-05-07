"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { RefreshCw, ThumbsUp, ThumbsDown, Meh, RotateCcw, Brain, Zap, BookOpen } from "lucide-react";

interface FlashCard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: number;
  nextReview: Date;
  interval: number;
  easeFactor: number;
}

const initialCards: FlashCard[] = [
  { id: "1", front: "What are the 4 conditions for deadlock?", back: "1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\nAll four must hold simultaneously.", category: "OS", difficulty: 3, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "2", front: "What is the difference between TCP and UDP?", back: "TCP: Reliable, ordered, connection-oriented (handshake), flow control\nUDP: Unreliable, unordered, connectionless, low overhead\n\nTCP: HTTP, SSH, email\nUDP: DNS, gaming, streaming, VoIP", category: "Networking", difficulty: 1, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "3", front: "What is a B+ Tree? Why not B Tree?", back: "B+ Tree: All data in leaf nodes, internal nodes only store keys.\nLeaves are linked for efficient range queries.\n\nWhy not B Tree? B Tree stores data in all nodes.\nB+ Tree has shallower depth (more keys per node) and better sequential access.", category: "Databases", difficulty: 2, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "4", front: "Explain CAP Theorem", back: "In a distributed system:\nC = Consistency (all nodes see same data)\nA = Availability (every request gets a response)\nP = Partition tolerance (system works despite network splits)\n\nP is required. Choose C or A during partitions.\nCP: MongoDB, HBase | AP: Cassandra, DynamoDB", category: "Distributed", difficulty: 3, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "5", front: "What does std::move() actually do?", back: "std::move() does NOT move anything!\nIt's a cast: converts an lvalue to an rvalue reference.\nThis tells the compiler: 'I'm done with this object, you can steal its resources.'\n\nThe actual move happens in the move constructor/assignment operator.", category: "C++", difficulty: 3, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "6", front: "ACID properties of transactions?", back: "Atomicity: All or nothing\nConsistency: Valid state → Valid state\nIsolation: Concurrent txns don't interfere\nDurability: Committed = permanent\n\nImplemented via: WAL (Write-Ahead Log), MVCC, 2PL", category: "Databases", difficulty: 2, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "7", front: "Token Bucket vs Sliding Window rate limiting?", back: "Token Bucket: Allows bursts. Tokens refill at fixed rate. Empty = reject.\nSliding Window: Count requests in rolling time window. More precise.\n\nToken Bucket better for APIs (allows bursts).\nSliding Window better for strict rate enforcement.", category: "Backend", difficulty: 2, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "8", front: "What is consistent hashing?", back: "Map servers and keys onto a ring (0 to 2^32).\nEach key assigned to next server clockwise.\n\nWhen adding/removing a server, only K/N keys remap (vs ALL keys with modulo).\n\nVirtual nodes improve distribution.\nUsed in: DynamoDB, Cassandra, Memcached.", category: "Distributed", difficulty: 3, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "9", front: "Container vs VM — key differences?", back: "Containers: Share host kernel, MB-sized, seconds to start\nVMs: Full OS per VM, GB-sized, minutes to start\n\nContainers: Process-level isolation via namespaces/cgroups\nVMs: Hardware-level isolation via hypervisor\n\nContainers lighter but less isolated.", category: "DevOps", difficulty: 1, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "10", front: "Process vs Thread — what's shared?", back: "Processes: Separate everything (code, data, heap, stack)\nCommunicate via IPC (pipes, sockets, shared memory)\n\nThreads: Share code, data, heap, file descriptors\nEach has own: stack, registers, thread-local storage\n\nThread switch cheaper (no TLB flush).", category: "OS", difficulty: 2, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "11", front: "What is MVCC?", back: "Multi-Version Concurrency Control\nEach write creates a new version of the row.\nReaders see a snapshot from their transaction start time.\nWriters don't block readers, readers don't block writers.\n\nUsed by: PostgreSQL, MySQL InnoDB\nKey benefit: High concurrency without excessive locking.", category: "Databases", difficulty: 3, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
  { id: "12", front: "HTTP/2 vs HTTP/1.1?", back: "HTTP/2 improvements:\n- Multiplexing: Multiple requests over single connection\n- Header compression (HPACK)\n- Server push\n- Binary framing (vs text)\n\nHTTP/1.1 issues:\n- One request per connection (HOL blocking)\n- Verbose text headers\n- No server push", category: "Networking", difficulty: 2, nextReview: new Date(), interval: 1, easeFactor: 2.5 },
];

export default function ReviewPage() {
  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = useMemo(() => [...new Set(cards.map((c) => c.category))], [cards]);
  const dueCards = useMemo(() => {
    const now = new Date();
    let filtered = cards.filter((c) => c.nextReview <= now);
    if (categoryFilter) filtered = filtered.filter((c) => c.category === categoryFilter);
    return filtered;
  }, [cards, categoryFilter]);

  const currentCard = dueCards[currentIndex];

  const handleResponse = (quality: number) => {
    if (!currentCard) return;
    setCards((prev) => prev.map((c) => {
      if (c.id !== currentCard.id) return c;
      let newEF = c.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (newEF < 1.3) newEF = 1.3;
      const newInterval = quality < 3 ? 1 : Math.round(c.interval * newEF);
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + newInterval);
      return { ...c, easeFactor: newEF, interval: newInterval, nextReview: nextDate };
    }));
    setFlipped(false);
    setReviewed((r) => r + 1);
    if (currentIndex < dueCards.length - 1) setCurrentIndex((i) => i + 1);
    else setCurrentIndex(0);
  };

  const reset = () => {
    setCards(initialCards);
    setCurrentIndex(0);
    setFlipped(false);
    setReviewed(0);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[900px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Spaced Repetition Review</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>Review flashcards using SM-2 algorithm. Difficult cards appear more often.</p>
        </div>
        <button onClick={reset} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-tertiary)" }}><RotateCcw size={16} /></button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><Brain size={14} style={{ color: "#6366f1" }} /><span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Due Now</span></div><p className="text-xl font-bold" style={{ color: "#6366f1" }}>{dueCards.length}</p></div>
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><RefreshCw size={14} style={{ color: "#06b6d4" }} /><span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Reviewed</span></div><p className="text-xl font-bold" style={{ color: "#06b6d4" }}>{reviewed}</p></div>
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><BookOpen size={14} style={{ color: "#10b981" }} /><span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Total Cards</span></div><p className="text-xl font-bold" style={{ color: "#10b981" }}>{cards.length}</p></div>
        <div className="stat-card"><div className="flex items-center gap-2 mb-1"><Zap size={14} style={{ color: "#f59e0b" }} /><span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>XP Earned</span></div><p className="text-xl font-bold" style={{ color: "#f59e0b" }}>{reviewed * 5}</p></div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setCategoryFilter(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ background: !categoryFilter ? "rgba(99,102,241,0.15)" : "var(--color-surface)", color: !categoryFilter ? "#6366f1" : "var(--color-text-secondary)", border: `1px solid ${!categoryFilter ? "rgba(99,102,241,0.3)" : "var(--color-border)"}` }}>
          All
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: categoryFilter === cat ? "rgba(99,102,241,0.15)" : "var(--color-surface)", color: categoryFilter === cat ? "#6366f1" : "var(--color-text-secondary)", border: `1px solid ${categoryFilter === cat ? "rgba(99,102,241,0.3)" : "var(--color-border)"}` }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Card */}
      {currentCard ? (
        <div className="perspective-1000">
          <motion.div onClick={() => setFlipped(!flipped)}
            className="glass-card p-8 cursor-pointer text-center" style={{ minHeight: 280 }}>
            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.div key="front" initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 90 }}
                  className="flex flex-col items-center justify-center h-full">
                  <span className="badge badge-indigo mb-4">{currentCard.category}</span>
                  <p className="text-lg font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>{currentCard.front}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Click to reveal answer</p>
                </motion.div>
              ) : (
                <motion.div key="back" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }}>
                  <span className="badge badge-cyan mb-4">Answer</span>
                  <div className="text-left">
                    {currentCard.back.split("\n").map((line, i) => (
                      <p key={i} className="text-sm leading-relaxed" style={{ color: line.startsWith("- ") || line.includes(":") ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: line.includes(":") ? 600 : 400, marginTop: line === "" ? 8 : 2 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Response buttons */}
          {flipped && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4 mt-4">
              <button onClick={() => handleResponse(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)", color: "#f43f5e" }}>
                <ThumbsDown size={14} /> Hard
              </button>
              <button onClick={() => handleResponse(3)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b" }}>
                <Meh size={14} /> Good
              </button>
              <button onClick={() => handleResponse(5)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
                <ThumbsUp size={14} /> Easy
              </button>
            </motion.div>
          )}

          <p className="text-center text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
            Card {currentIndex + 1} of {dueCards.length}
          </p>
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <span className="text-4xl block mb-4">🎉</span>
          <p className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>All caught up!</p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>No cards due for review. Come back later!</p>
          <button onClick={reset} className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, var(--color-accent-indigo), var(--color-accent-violet))", color: "white" }}>
            Reset & Review All
          </button>
        </div>
      )}
    </motion.div>
  );
}
