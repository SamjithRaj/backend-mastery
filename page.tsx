"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { DashboardOverview } from '@/components/dashboard/overview'
import { DSATracker } from '@/components/dsa/tracker'
import { CPPMastery } from '@/components/cpp/mastery'
import { BackendRoadmap } from '@/components/backend/roadmap'
import { ProjectsSection } from '@/components/projects/section'
import { InterviewPrep } from '@/components/interview/prep'
import { ApplicationTracker } from '@/components/applications/tracker'
import { StudyTimer } from '@/components/study/timer'
import { CommandMenu } from '@/components/command-menu'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'dsa':
        return <DSATracker />
      case 'cpp':
        return <CPPMastery />
      case 'backend':
        return <BackendRoadmap />
      case 'projects':
        return <ProjectsSection />
      case 'interview':
        return <InterviewPrep />
      case 'applications':
        return <ApplicationTracker />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 max-w-7xl">
          {renderContent()}
        </div>
      </main>

      <StudyTimer />
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />
    </div>
  )
}
