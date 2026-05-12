"use client"

import { useState } from 'react'
import { dsaRoadmap } from '@/data/dsa-roadmap'
import { CheckCircle2, Circle, Star, ExternalLink, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export function DSATracker() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [showTheory, setShowTheory] = useState(false)

  const categories = Object.entries(dsaRoadmap)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">DSA Tracker</h2>
        <p className="text-muted-foreground mt-1">Master data structures and algorithms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic List */}
        <div className="lg:col-span-1 space-y-3">
          {categories.map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => {
                setSelectedTopic(key)
                setShowTheory(false)
              }}
              whileHover={{ scale: 1.02 }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedTopic === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card hover:bg-accent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-sm opacity-80 mt-1">
                    {category.topics.reduce((sum, t) => sum + t.problems.length, 0)} problems
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  category.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
                  category.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {category.difficulty}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Problems List */}
        <div className="lg:col-span-2 space-y-4">
          {selectedTopic ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{dsaRoadmap[selectedTopic as keyof typeof dsaRoadmap].title}</h3>
                <button
                  onClick={() => setShowTheory(!showTheory)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  {showTheory ? 'Hide Theory' : 'Show Theory'}
                </button>
              </div>

              {showTheory ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border rounded-xl p-6 prose prose-invert max-w-none"
                >
                  <ReactMarkdown>{dsaRoadmap[selectedTopic as keyof typeof dsaRoadmap].theory}</ReactMarkdown>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {dsaRoadmap[selectedTopic as keyof typeof dsaRoadmap].topics.map((topic, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-card border rounded-xl p-6"
                    >
                      <h4 className="text-lg font-semibold mb-4">{topic.name}</h4>
                      <div className="space-y-2">
                        {topic.problems.map((problem, pidx) => (
                          <div
                            key={pidx}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              <div>
                                <p className="font-medium flex items-center gap-2">
                                  {problem.title}
                                  {problem.blind75 && (
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  )}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
                                    problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                                    'bg-red-500/20 text-red-500'
                                  }`}>
                                    {problem.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <a
                              href={problem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Select a topic to get started</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose from the list on the left to see problems and theory
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
