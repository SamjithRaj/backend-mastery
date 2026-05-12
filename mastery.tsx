"use client"

import { useState } from 'react'
import { cppMasteryContent } from '@/data/cpp-mastery'
import { Cpu, BookOpen, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export function CPPMastery() {
  const [selectedTopic, setSelectedTopic] = useState<string>('pointers')

  const topics = Object.entries(cppMasteryContent)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Cpu className="h-8 w-8 text-primary" />
          C++ Mastery
        </h2>
        <p className="text-muted-foreground mt-1">Master C++ from fundamentals to advanced concepts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topics Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {topics.map(([key, topic]) => (
            <button
              key={key}
              onClick={() => setSelectedTopic(key)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedTopic === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card hover:bg-accent'
              }`}
            >
              <h4 className="font-semibold">{topic.title}</h4>
              <div className={`text-xs mt-1 px-2 py-1 rounded inline-block ${
                topic.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
                topic.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {topic.difficulty}
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={selectedTopic}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].title}
              </h3>
              <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].difficulty === 'easy'
                  ? 'bg-green-500/20 text-green-500'
                  : cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].difficulty === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].difficulty}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>
                {cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].content}
              </ReactMarkdown>
            </div>

            {/* Quiz Section */}
            {cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].quiz && (
              <div className="mt-8 pt-8 border-t">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Practice Quiz
                </h4>
                <div className="space-y-6">
                  {cppMasteryContent[selectedTopic as keyof typeof cppMasteryContent].quiz?.map((q, idx) => (
                    <div key={idx} className="bg-secondary/50 rounded-lg p-4">
                      <p className="font-medium mb-3">{idx + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, oidx) => (
                          <button
                            key={oidx}
                            className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-all"
                          >
                            <span className="font-mono mr-2">({String.fromCharCode(65 + oidx)})</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress Tracker */}
          <div className="bg-card border rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Your Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Concepts Mastered</span>
                <span className="text-muted-foreground">0 / {topics.length}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
