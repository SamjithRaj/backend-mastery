import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DailyTask } from "@/types/progress";

interface PlannerStore {
  dailyTasks: DailyTask[];
  completedTaskIds: string[];
  currentDate: string;
  studyMinutesToday: number;
  completeTask: (taskId: string) => void;
  generateDailyTasks: () => void;
  resetDay: () => void;
  addStudyMinutes: (minutes: number) => void;
}

const defaultTasks: DailyTask[] = [
  {
    id: "daily-1",
    title: "Study TCP/IP Networking",
    type: "learn",
    topicId: "tcp-handshake",
    estimatedMinutes: 30,
    completed: false,
    xpReward: 50,
    description:
      "Learn about TCP 3-way handshake, connection states, and reliability mechanisms",
  },
  {
    id: "daily-2",
    title: "Practice: Thread Synchronization",
    type: "practice",
    topicId: "threads-vs-processes",
    estimatedMinutes: 25,
    completed: false,
    xpReward: 40,
    description: "Implement mutex-based synchronization for a shared counter",
  },
  {
    id: "daily-3",
    title: "Review: B+ Tree Operations",
    type: "review",
    topicId: "bplus-tree",
    estimatedMinutes: 20,
    completed: false,
    xpReward: 30,
    description: "Review insert, delete, and search operations in B+ Trees",
  },
  {
    id: "daily-4",
    title: "Quiz: API Design Patterns",
    type: "quiz",
    topicId: "api-lifecycle",
    estimatedMinutes: 15,
    completed: false,
    xpReward: 35,
    description:
      "Test your knowledge on REST API best practices and design patterns",
  },
  {
    id: "daily-5",
    title: "System Design: Rate Limiter",
    type: "interview",
    topicId: "rate-limiter",
    estimatedMinutes: 30,
    completed: false,
    xpReward: 60,
    description:
      "Design a distributed rate limiter - token bucket vs sliding window",
  },
];

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set, get) => ({
      dailyTasks: defaultTasks,
      completedTaskIds: [],
      currentDate: new Date().toISOString().split("T")[0],
      studyMinutesToday: 0,

      completeTask: (taskId) =>
        set((state) => {
          if (state.completedTaskIds.includes(taskId)) return state;
          return {
            completedTaskIds: [...state.completedTaskIds, taskId],
            dailyTasks: state.dailyTasks.map((t) =>
              t.id === taskId ? { ...t, completed: true } : t
            ),
          };
        }),

      generateDailyTasks: () =>
        set(() => ({
          dailyTasks: defaultTasks.map((t) => ({ ...t, completed: false })),
          completedTaskIds: [],
          currentDate: new Date().toISOString().split("T")[0],
        })),

      resetDay: () =>
        set(() => ({
          completedTaskIds: [],
          studyMinutesToday: 0,
          dailyTasks: defaultTasks.map((t) => ({ ...t, completed: false })),
        })),

      addStudyMinutes: (minutes) =>
        set((state) => ({
          studyMinutesToday: state.studyMinutesToday + minutes,
        })),
    }),
    { name: "planner-store" }
  )
);
