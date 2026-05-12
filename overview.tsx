"use client"

import { useProgressStore } from '@/store'
import { Flame, Target, Clock, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function DashboardOverview() {
  const { streaks, totalHours, problemsSolved, projectsCompleted } = useProgressStore()

  const stats = [
    { label: 'Study Streak', value: streaks.overall || 0, suffix: 'days', icon: Flame, color: 'text-orange-500' },
    { label: 'Total Hours', value: totalHours, suffix: 'hrs', icon: Clock, color: 'text-blue-500' },
    { label: 'Problems Solved', value: problemsSolved, suffix: '', icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Projects Done', value: projectsCompleted, suffix: '', icon: Trophy, color: 'text-purple-500' },
  ]

  const todayTasks = [
    { id: 1, title: 'Solve 3 DSA problems', completed: false, category: 'DSA' },
    { id: 2, title: 'Read HTTP chapter', completed: false, category: 'Backend' },
    { id: 3, title: 'Work on HTTP server project', completed: false, category: 'Projects' },
  ]

  const weeklyGoals = [
    { label: 'DSA Problems', current: 12, target: 21, percentage: 57 },
    { label: 'Study Hours', current: 8, target: 15, percentage: 53 },
    { label: 'Project Progress', current: 35, target: 100, percentage: 35 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome back! 👋</h2>
        <p className="text-muted-foreground mt-1">Here's your progress overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold">
                  {stat.value}
                  <span className="text-lg text-muted-foreground ml-1">{stat.suffix}</span>
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Today's Tasks
            </h3>
            <span className="text-sm text-muted-foreground">0/{todayTasks.length}</span>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <div className="h-5 w-5 rounded border-2 border-muted-foreground"></div>
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.category}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Weekly Goals
          </h3>
          <div className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{goal.label}</span>
                  <span className="text-muted-foreground">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Motivation Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 rounded-xl p-6"
      >
        <p className="text-lg font-medium italic">
          "The only way to do great work is to love what you do."
        </p>
        <p className="text-sm text-muted-foreground mt-2">— Steve Jobs</p>
      </motion.div>
    </div>
  )
}
