"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { StickyNote, Plus, Trash2, Search, BookOpen, Tag } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  tags: string[];
}

const defaultNotes: Note[] = [
  { id: "1", title: "TCP Handshake Key Points", content: "SYN → SYN-ACK → ACK\n\n- ISNs are randomized for security\n- SYN flood attacks exhaust server resources\n- TCP Fast Open sends data with SYN\n- TIME_WAIT prevents old packet interference\n- SO_REUSEADDR needed for quick server restarts", category: "networking", createdAt: new Date(), tags: ["TCP", "networking"] },
  { id: "2", title: "B+ Tree vs B Tree", content: "B+ Tree:\n- All data in leaf nodes\n- Leaves linked for range queries\n- Internal nodes only store keys\n- Better for disk-based storage (sequential reads)\n\nB Tree:\n- Data in all nodes\n- No leaf linking\n- Better for random access", category: "databases", createdAt: new Date(), tags: ["databases", "indexing"] },
  { id: "3", title: "Rate Limiting Algorithms", content: "1. Token Bucket — allows bursts, tokens refill at fixed rate\n2. Leaky Bucket — smooth output, requests queue\n3. Fixed Window — simple but edge-case bursts\n4. Sliding Window Log — precise but memory heavy\n5. Sliding Window Counter — good balance", category: "backend", createdAt: new Date(), tags: ["backend", "system design"] },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(defaultNotes[0]);
  const [search, setSearch] = useState("");

  const filtered = search ? notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())) : notes;

  const addNote = () => {
    const newNote: Note = { id: Date.now().toString(), title: "Untitled Note", content: "", category: "general", createdAt: new Date(), tags: [] };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (field: keyof Note, value: string) => {
    if (!selectedNote) return;
    const updated = { ...selectedNote, [field]: value };
    setSelectedNote(updated);
    setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6" style={{ height: "calc(100vh - 80px)" }}>
      {/* Sidebar */}
      <div className="w-72 shrink-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold gradient-text">Notes</h1>
          <button onClick={addNote} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.15)", color: "#6366f1" }}><Plus size={16} /></button>
        </div>
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="w-full pl-9 pr-3 py-2 rounded-lg text-xs outline-none" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }} />
        </div>
        <div className="flex-1 overflow-y-auto space-y-1">
          {filtered.map((note) => (
            <button key={note.id} onClick={() => setSelectedNote(note)} className="w-full text-left p-3 rounded-lg transition-all" style={{ background: selectedNote?.id === note.id ? "rgba(99,102,241,0.08)" : "transparent", border: `1px solid ${selectedNote?.id === note.id ? "rgba(99,102,241,0.15)" : "transparent"}` }}>
              <p className="text-xs font-semibold truncate" style={{ color: "var(--color-text-primary)" }}>{note.title}</p>
              <p className="text-[10px] truncate mt-0.5" style={{ color: "var(--color-text-muted)" }}>{note.content.slice(0, 60)}...</p>
              <div className="flex gap-1 mt-1">{note.tags.map((t) => (<span key={t} className="badge badge-indigo" style={{ fontSize: 8 }}>{t}</span>))}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 glass-card p-6 flex flex-col">
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <input value={selectedNote.title} onChange={(e) => updateNote("title", e.target.value)} className="text-lg font-bold bg-transparent outline-none flex-1" style={{ color: "var(--color-text-primary)" }} />
              <button onClick={() => deleteNote(selectedNote.id)} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--color-text-muted)" }}><Trash2 size={16} /></button>
            </div>
            <textarea value={selectedNote.content} onChange={(e) => updateNote("content", e.target.value)} className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed font-mono" style={{ color: "var(--color-text-secondary)" }} placeholder="Start writing..." />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <StickyNote size={40} className="mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
