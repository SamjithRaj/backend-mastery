import type { Topic } from "@/types/topic";
import { networkingTopics } from "./topics/networking";
import { osTopics } from "./topics/os";
import { databaseTopics } from "./topics/databases";
import { backendTopics } from "./topics/backend";
import { distributedTopics } from "./topics/distributed";
import { cppTopics, linuxTopics, devopsTopics } from "./topics/systems";

export const topicsData: Topic[] = [
  ...networkingTopics,
  ...osTopics,
  ...databaseTopics,
  ...backendTopics,
  ...distributedTopics,
  ...cppTopics,
  ...linuxTopics,
  ...devopsTopics,
];

export function getTopicById(id: string): Topic | undefined {
  return topicsData.find((t) => t.id === id);
}

export function getTopicsByCategory(category: string): Topic[] {
  return topicsData.filter((t) => t.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(topicsData.map((t) => t.category))];
}
