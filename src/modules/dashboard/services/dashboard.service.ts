import { DashboardData } from "../types";
import { BookMarked, Flame, PlayCircle } from "lucide-react";

// Mock data with more realistic content
const mockDashboardData: DashboardData = {
  currentCourse: {
    id: "react-state",
    name: "State Management in React",
    progress: 65,
    totalModules: 12,
    completedModules: 7,
    description: "Master modern state management techniques in React applications, from local state to global solutions.",
    lastAccessedAt: new Date().toISOString(),
  },
  stats: [
    { label: "Learning Streak", value: "7 days", icon: Flame, color: "#f97316" },
    { label: "Modules Completed", value: "9", icon: BookMarked, color: "#3b82f6" },
    { label: "Quizzes Taken", value: "5", icon: PlayCircle, color: "#8b5cf6" },
  ],
  roadmaps: [
    {
      id: "frontend",
      name: "Frontend Developer",
      description: "Master modern frontend technologies and frameworks",
      modules: 12,
      estimatedTime: "3 months",
      level: "Beginner to Intermediate",
    },
    {
      id: "backend",
      name: "Backend Developer",
      description: "Learn server-side programming and database management",
      modules: 10,
      estimatedTime: "2.5 months",
      level: "Intermediate",
    },
    {
      id: "fullstack",
      name: "Full Stack JavaScript",
      description: "Become proficient in both frontend and backend JavaScript development",
      modules: 15,
      estimatedTime: "4 months",
      level: "Intermediate to Advanced",
    },
    {
      id: "devops",
      name: "DevOps Engineer",
      description: "Master CI/CD, containerization, and cloud infrastructure",
      modules: 8,
      estimatedTime: "2 months",
      level: "Advanced",
    }
  ],
};

export async function fetchDashboardData(): Promise<DashboardData> {
  // Simulate API delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockDashboardData;
} 