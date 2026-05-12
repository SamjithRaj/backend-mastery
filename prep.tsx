"use client"

import { useState } from 'react'
import { FileText, Brain, Code, Database, Network, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const interviewCategories = {
  backend: {
    title: "Backend Engineering",
    icon: Code,
    questions: [
      "Explain the difference between REST and GraphQL",
      "How does HTTP/2 improve on HTTP/1.1?",
      "What is the CAP theorem?",
      "Explain database indexing and its trade-offs",
      "How would you design a rate limiter?",
      "What is connection pooling and why is it important?",
      "Explain vertical vs horizontal scaling",
      "What are the different types of load balancers?"
    ]
  },
  os: {
    title: "Operating Systems",
    icon: Brain,
    questions: [
      "Explain the difference between process and thread",
      "What is a context switch?",
      "Describe virtual memory and paging",
      "What is a deadlock and how can you prevent it?",
      "Explain different CPU scheduling algorithms",
      "What is the difference between mutex and semaphore?",
      "How does virtual memory work?",
      "What is thrashing?"
    ]
  },
  database: {
    title: "Database Systems",
    icon: Database,
    questions: [
      "Explain ACID properties",
      "What are database indexes and how do they work?",
      "Difference between SQL and NoSQL databases",
      "What is database normalization?",
      "Explain different types of joins",
      "What is a transaction and how is it managed?",
      "Explain database sharding",
      "What is eventual consistency?"
    ]
  },
  networking: {
    title: "Computer Networks",
    icon: Network,
    questions: [
      "Explain the TCP 3-way handshake",
      "What is the difference between TCP and UDP?",
      "How does DNS work?",
      "Explain the OSI model layers",
      "What is a subnet mask?",
      "How does HTTPS encryption work?",
      "What is NAT and why is it used?",
      "Explain how cookies work"
    ]
  },
  behavioral: {
    title: "Behavioral Questions",
    icon: Users,
    questions: [
      "Tell me about a challenging project you worked on",
      "Describe a time when you had to debug a difficult issue",
      "How do you handle disagreements with team members?",
      "Tell me about a time you had to learn a new technology quickly",
      "How do you prioritize tasks when everything is urgent?",
      "Describe a situation where you improved system performance",
      "What's your approach to code reviews?",
      "How do you stay updated with new technologies?"
    ]
  }
}

export function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState<string>('backend')

  const categories = Object.entries(interviewCategories)
  const currentCategory = interviewCategories[selectedCategory as keyof typeof interviewCategories]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          Interview Preparation
        </h2>
        <p className="text-muted-foreground mt-1">Master common interview questions and concepts</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(([key, category]) => {
          const Icon = category.icon
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedCategory === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border hover:bg-accent'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{category.title}</span>
            </button>
          )
        })}
      </div>

      {/* Questions List */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {currentCategory.questions.map((question, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">{question}</p>
                <button className="mt-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  Practice Answer →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mock Interview */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-2">Mock Interview Mode</h3>
        <p className="text-muted-foreground mb-4">
          Practice with AI-powered mock interviews to build confidence
        </p>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium">
          Start Mock Interview
        </button>
      </div>

      {/* Study Tips */}
      <div className="bg-card border rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Interview Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Technical Questions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Think out loud while solving</li>
              <li>• Ask clarifying questions</li>
              <li>• Consider edge cases</li>
              <li>• Discuss trade-offs</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Behavioral Questions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use the STAR method</li>
              <li>• Be specific with examples</li>
              <li>• Show learning and growth</li>
              <li>• Be honest and authentic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
