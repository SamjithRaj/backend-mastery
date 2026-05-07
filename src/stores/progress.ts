import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProgressState, DailyTask } from "@/types/progress";

interface ProgressStore extends ProgressState {
  completeSection: (topicId: string, sectionId: string) => void;
  completeTopic: (topicId: string) => void;
  setQuizScore: (topicId: string, score: number) => void;
  setConfidence: (topicId: string, confidence: number) => void;
  addStudyTime: (minutes: number) => void;
  resetProgress: () => void;
}

const initialState: ProgressState = {
  completedTopics: [],
  completedSections: {},
  quizScores: {},
  topicConfidence: {},
  timeSpent: {},
  lastStudyDate: "",
  totalStudyMinutes: 0,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      ...initialState,

      completeSection: (topicId, sectionId) =>
        set((state) => {
          const existing = state.completedSections[topicId] || [];
          if (existing.includes(sectionId)) return state;
          return {
            completedSections: {
              ...state.completedSections,
              [topicId]: [...existing, sectionId],
            },
          };
        }),

      completeTopic: (topicId) =>
        set((state) => {
          if (state.completedTopics.includes(topicId)) return state;
          return {
            completedTopics: [...state.completedTopics, topicId],
          };
        }),

      setQuizScore: (topicId, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [topicId]: score },
        })),

      setConfidence: (topicId, confidence) =>
        set((state) => ({
          topicConfidence: {
            ...state.topicConfidence,
            [topicId]: confidence,
          },
        })),

      addStudyTime: (minutes) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          return {
            totalStudyMinutes: state.totalStudyMinutes + minutes,
            timeSpent: {
              ...state.timeSpent,
              [today]: (state.timeSpent[today] || 0) + minutes,
            },
            lastStudyDate: today,
          };
        }),

      resetProgress: () => set(initialState),
    }),
    { name: "progress-store" }
  )
);
