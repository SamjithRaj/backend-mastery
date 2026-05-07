export interface TopicSection {
  id: string;
  type:
    | "intuition"
    | "analogy"
    | "visual"
    | "technical"
    | "deep-dive"
    | "simulation"
    | "code-walkthrough"
    | "code"
    | "mistakes"
    | "interview"
    | "mini-task"
    | "quiz"
    | "summary";
  title: string;
  content: string;
  codeSnippet?: string;
  language?: string;
  animationId?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Topic {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: number;
  estimatedMinutes: number;
  sections: TopicSection[];
  quiz: QuizQuestion[];
  xpReward: number;
  prerequisites: string[];
  tags: string[];
}
