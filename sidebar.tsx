"use client"

import { Home, Code, Cpu, Server, FolderKanban, FileText, Briefcase, Settings, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'dsa', label: 'DSA Tracker', icon: Code },
  { id: 'cpp', label: 'C++ Mastery', icon: Cpu },
  { id: 'backend', label: 'Backend Engineering', icon: Server },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'interview', label: 'Interview Prep', icon: FileText },
  { id: 'applications', label: 'Job Tracker', icon: Briefcase },
]

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <aside className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Backend Mastery OS
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Your path to excellence</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                activeSection === item.id && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-all"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="font-medium">Toggle Theme</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-all">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
