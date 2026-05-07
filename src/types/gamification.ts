export type EngineerRank =
  | "Apprentice"
  | "Junior Engineer"
  | "Engineer"
  | "Senior Engineer"
  | "Staff Engineer"
  | "Principal Engineer";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpReward: number;
  condition: string;
}

export interface GamificationState {
  xp: number;
  level: number;
  rank: EngineerRank;
  streak: number;
  longestStreak: number;
  achievements: string[];
  dailyXpHistory: Record<string, number>;
  lastActivityDate: string;
}

export function getRankForLevel(level: number): EngineerRank {
  if (level <= 5) return "Apprentice";
  if (level <= 12) return "Junior Engineer";
  if (level <= 22) return "Engineer";
  if (level <= 34) return "Senior Engineer";
  if (level <= 44) return "Staff Engineer";
  return "Principal Engineer";
}

export function getXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function getLevelProgress(xp: number, level: number): number {
  const currentLevelXp = getXpForLevel(level);
  const prevLevelTotalXp = Array.from({ length: level - 1 }, (_, i) =>
    getXpForLevel(i + 1)
  ).reduce((a, b) => a + b, 0);
  const xpInCurrentLevel = xp - prevLevelTotalXp;
  return Math.min(xpInCurrentLevel / currentLevelXp, 1);
}
