"use client"

import { useState } from 'react'
import { backendRoadmap } from '@/data/backend-roadmap'
import { Server, BookOpen, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export function BackendRoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<string>('http')

  const topics = Object.entries(backendRoadmap)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Server className="h-8 w-8 text-primary" />
          Backend Engineering Roadmap
        </h2>
        <p className="text-muted-foreground mt-1">Learn backend engineering from scratch</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topics List */}
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
              <div className={`text-xs mt-2 px-2 py-1 rounded inline-block ${
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
                {backendRoadmap[selectedTopic as keyof typeof backendRoadmap].title}
              </h3>
              <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                backendRoadmap[selectedTopic as keyof typeof backendRoadmap].difficulty === 'easy'
                  ? 'bg-green-500/20 text-green-500'
                  : backendRoadmap[selectedTopic as keyof typeof backendRoadmap].difficulty === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {backendRoadmap[selectedTopic as keyof typeof backendRoadmap].difficulty}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>
                {backendRoadmap[selectedTopic as keyof typeof backendRoadmap].content}
              </ReactMarkdown>
            </div>

            {/* Resources */}
            {backendRoadmap[selectedTopic as keyof typeof backendRoadmap].resources && (
              <div className="mt-8 pt-8 border-t">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Recommended Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {backendRoadmap[selectedTopic as keyof typeof backendRoadmap].resources?.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group"
                    >
                      <span className="font-medium">{resource.title}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="bg-card border rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Your Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Topics Completed</span>
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
