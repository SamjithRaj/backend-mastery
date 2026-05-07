export interface ProgressState {
  completedTopics: string[];
  completedSections: Record<string, string[]>;
  quizScores: Record<string, number>;
  topicConfidence: Record<string, number>;
  timeSpent: Record<string, number>;
  lastStudyDate: string;
  totalStudyMinutes: number;
}

export interface DailyTask {
  id: string;
  title: string;
  type: "learn" | "practice" | "review" | "quiz" | "project" | "interview";
  topicId?: string;
  estimatedMinutes: number;
  completed: boolean;
  xpReward: number;
  description: string;
}
