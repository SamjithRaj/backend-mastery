"use client"

import { useState } from 'react'
import { projectGuides } from '@/data/projects'
import { FolderKanban, Code, CheckCircle2, Circle, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string>('http-server')

  const projects = Object.entries(projectGuides)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FolderKanban className="h-8 w-8 text-primary" />
          Projects
        </h2>
        <p className="text-muted-foreground mt-1">Build real-world projects to solidify your skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project List */}
        <div className="lg:col-span-1 space-y-3">
          {projects.map(([key, project]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedProject(key)}
              whileHover={{ scale: 1.02 }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedProject === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card hover:bg-accent'
              }`}
            >
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm opacity-80 mt-1">{project.description}</p>
              <div className={`text-xs mt-2 px-2 py-1 rounded inline-block ${
                project.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
                project.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {project.difficulty}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Project Details */}
        <motion.div
          key={selectedProject}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Header */}
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">
                  {projectGuides[selectedProject as keyof typeof projectGuides].title}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {projectGuides[selectedProject as keyof typeof projectGuides].description}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                projectGuides[selectedProject as keyof typeof projectGuides].difficulty === 'easy'
                  ? 'bg-green-500/20 text-green-500'
                  : projectGuides[selectedProject as keyof typeof projectGuides].difficulty === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {projectGuides[selectedProject as keyof typeof projectGuides].difficulty}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {projectGuides[selectedProject as keyof typeof projectGuides].skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Architecture */}
            {projectGuides[selectedProject as keyof typeof projectGuides].architecture && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Architecture</h4>
                <div className="prose prose-invert max-w-none bg-secondary/30 rounded-lg p-4">
                  <ReactMarkdown>
                    {projectGuides[selectedProject as keyof typeof projectGuides].architecture}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Implementation */}
          {projectGuides[selectedProject as keyof typeof projectGuides].implementation && (
            <div className="bg-card border rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Implementation Guide
              </h4>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>
                  {projectGuides[selectedProject as keyof typeof projectGuides].implementation}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Features/Algorithms */}
          {projectGuides[selectedProject as keyof typeof projectGuides].features && (
            <div className="bg-card border rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectGuides[selectedProject as keyof typeof projectGuides].features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projectGuides[selectedProject as keyof typeof projectGuides].algorithms && (
            <div className="bg-card border rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4">Algorithms Covered</h4>
              <div className="space-y-2">
                {projectGuides[selectedProject as keyof typeof projectGuides].algorithms?.map((algo, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Circle className="h-4 w-4 text-primary" />
                    <span className="font-medium">{algo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optimizations */}
          {projectGuides[selectedProject as keyof typeof projectGuides].optimizations && (
            <div className="bg-card border rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4">Optimization Tips</h4>
              <div className="space-y-2">
                {projectGuides[selectedProject as keyof typeof projectGuides].optimizations?.map((opt, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                    <span className="text-primary font-bold">→</span>
                    <span className="text-sm">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Status */}
          <div className="bg-card border rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Your Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                  Not Started
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Completion</span>
                <span className="text-muted-foreground">0%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium">
                Start Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
