import { BookOpen, BookMarked, Clock, Flame, PlayCircle } from "lucide-react";

export const COURSE_PROGRESS = [
  {
    id: "react",
    name: "React Fundamentals",
    progress: 65,
    totalModules: 12,
    completedModules: 7,
  },
  {
    id: "nextjs",
    name: "Next.js Mastery",
    progress: 30,
    totalModules: 10,
    completedModules: 3,
  },
  {
    id: "typescript",
    name: "TypeScript Deep Dive",
    progress: 10,
    totalModules: 12,
    completedModules: 1,
  },
] as const;

export const LEARNING_ROADMAPS = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Master modern frontend technologies and frameworks",
    modules: 12,
    estimatedTime: "3 months",
    level: "Beginner to Intermediate",
  },
] as const;

export const DASHBOARD_STATS = [
  { label: "Learning Streak", value: "7 days", icon: Flame, color: "#f97316" },
  {
    label: "Modules Completed",
    value: "9",
    icon: BookMarked,
    color: "#3b82f6",
  },
  { label: "Quizzes Taken", value: "5", icon: PlayCircle, color: "#8b5cf6" },
] as const; 