import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type GamificationState,
  getRankForLevel,
  getXpForLevel,
} from "@/types/gamification";

interface GamificationStore extends GamificationState {
  addXp: (amount: number) => void;
  updateStreak: () => void;
  unlockAchievement: (id: string) => void;
  resetGamification: () => void;
}

const initialState: GamificationState = {
  xp: 0,
  level: 1,
  rank: "Apprentice",
  streak: 0,
  longestStreak: 0,
  achievements: [],
  dailyXpHistory: {},
  lastActivityDate: "",
};

function calculateLevel(totalXp: number): number {
  let level = 1;
  let xpNeeded = 0;
  while (true) {
    xpNeeded += getXpForLevel(level);
    if (totalXp < xpNeeded) break;
    level++;
    if (level > 50) break;
  }
  return level;
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set) => ({
      ...initialState,

      addXp: (amount) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          const newXp = state.xp + amount;
          const newLevel = calculateLevel(newXp);
          return {
            xp: newXp,
            level: newLevel,
            rank: getRankForLevel(newLevel),
            dailyXpHistory: {
              ...state.dailyXpHistory,
              [today]: (state.dailyXpHistory[today] || 0) + amount,
            },
            lastActivityDate: today,
          };
        }),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];

          if (state.lastActivityDate === today) return state;

          const newStreak =
            state.lastActivityDate === yesterday ? state.streak + 1 : 1;

          return {
            streak: newStreak,
            longestStreak: Math.max(newStreak, state.longestStreak),
            lastActivityDate: today,
          };
        }),

      unlockAchievement: (id) =>
        set((state) => {
          if (state.achievements.includes(id)) return state;
          return {
            achievements: [...state.achievements, id],
          };
        }),

      resetGamification: () => set(initialState),
    }),
    { name: "gamification-store" }
  )
);
