export type Category =
  | "networking"
  | "os"
  | "databases"
  | "distributed"
  | "backend"
  | "cpp"
  | "linux"
  | "devops";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type NodeStatus = "locked" | "available" | "in-progress" | "completed";

export type InterviewRelevance = "low" | "medium" | "high" | "critical";

export type LearningPath =
  | "backend-engineer"
  | "systems-engineer"
  | "low-latency"
  | "distributed-systems";

export interface SubTopic {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  estimatedHours: number;
  prerequisites: string[];
  subtopics: SubTopic[];
  xpReward: number;
  interviewRelevance: InterviewRelevance;
  status: NodeStatus;
  projectsUnlocked: string[];
  paths: LearningPath[];
  icon: string;
  position: { x: number; y: number };
}

export interface RoadmapEdge {
  source: string;
  target: string;
}
