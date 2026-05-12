import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: {
    id: string
    name: string
    email: string
  } | null
  setUser: (user: UserState['user']) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)

interface ProgressState {
  streaks: Record<string, number>
  totalHours: number
  problemsSolved: number
  projectsCompleted: number
  updateStreak: (category: string, days: number) => void
  addHours: (hours: number) => void
  addProblemSolved: () => void
  addProjectCompleted: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      streaks: {},
      totalHours: 0,
      problemsSolved: 0,
      projectsCompleted: 0,
      updateStreak: (category, days) =>
        set((state) => ({
          streaks: { ...state.streaks, [category]: days },
        })),
      addHours: (hours) =>
        set((state) => ({ totalHours: state.totalHours + hours })),
      addProblemSolved: () =>
        set((state) => ({ problemsSolved: state.problemsSolved + 1 })),
      addProjectCompleted: () =>
        set((state) => ({ projectsCompleted: state.projectsCompleted + 1 })),
    }),
    {
      name: 'progress-storage',
    }
  )
)

interface TimerState {
  isRunning: boolean
  seconds: number
  category: string
  start: (category: string) => void
  pause: () => void
  reset: () => void
  tick: () => void
}

export const useTimerStore = create<TimerState>((set) => ({
  isRunning: false,
  seconds: 0,
  category: '',
  start: (category) => set({ isRunning: true, category }),
  pause: () => set({ isRunning: false }),
  reset: () => set({ isRunning: false, seconds: 0, category: '' }),
  tick: () => set((state) => ({ seconds: state.seconds + 1 })),
}))
