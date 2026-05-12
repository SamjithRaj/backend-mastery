"use client"

import { useState, useEffect } from 'react'
import { useTimerStore } from '@/store'
import { Play, Pause, RotateCcw, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function StudyTimer() {
  const { isRunning, seconds, category, start, pause, reset, tick } = useTimerStore()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, tick])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Floating Timer Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Clock className="h-6 w-6" />
      </motion.button>

      {/* Expanded Timer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-card border rounded-xl shadow-2xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Study Timer</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold font-mono mb-2">
                {formatTime(seconds)}
              </div>
              {category && (
                <div className="text-sm text-muted-foreground">
                  Studying: <span className="text-primary font-medium">{category}</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {!isRunning ? (
                <button
                  onClick={() => start('General')}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  <Play className="h-4 w-4" />
                  Start
                </button>
              ) : (
                <button
                  onClick={pause}
                  className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                >
                  <Pause className="h-4 w-4" />
                  Pause
                </button>
              )}
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Study Category</label>
              <select
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={category}
                onChange={(e) => start(e.target.value)}
              >
                <option value="General">General</option>
                <option value="DSA">Data Structures & Algorithms</option>
                <option value="C++">C++ Programming</option>
                <option value="Backend">Backend Engineering</option>
                <option value="Projects">Projects</option>
                <option value="Interview Prep">Interview Prep</option>
              </select>
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Today</p>
                  <p className="font-semibold">2h 30m</p>
                </div>
                <div>
                  <p className="text-muted-foreground">This Week</p>
                  <p className="font-semibold">12h 15m</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
