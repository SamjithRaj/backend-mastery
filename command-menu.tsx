"use client"

import { useEffect, useState } from 'react'
import { Search, Home, Code, Cpu, Server, FolderKanban, FileText, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CommandMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const commands = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: Home, category: 'Navigation' },
  { id: 'dsa', label: 'Go to DSA Tracker', icon: Code, category: 'Navigation' },
  { id: 'cpp', label: 'Go to C++ Mastery', icon: Cpu, category: 'Navigation' },
  { id: 'backend', label: 'Go to Backend Roadmap', icon: Server, category: 'Navigation' },
  { id: 'projects', label: 'Go to Projects', icon: FolderKanban, category: 'Navigation' },
  { id: 'interview', label: 'Go to Interview Prep', icon: FileText, category: 'Navigation' },
  { id: 'applications', label: 'Go to Job Tracker', icon: Briefcase, category: 'Navigation' },
]

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!open) setSearch('')
  }, [open])

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Command Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg"
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs bg-secondary rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                <div className="space-y-1">
                  {filteredCommands.map((cmd) => {
                    const Icon = cmd.icon
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          setOpen(false)
                          // Handle command execution
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-all text-left"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">{cmd.label}</p>
                          <p className="text-xs text-muted-foreground">{cmd.category}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  No results found
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>Ctrl+K to toggle</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
