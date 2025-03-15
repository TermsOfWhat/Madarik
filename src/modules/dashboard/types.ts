import { IconType } from "lucide-react";

export interface CourseProgress {
  id: string;
  name: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  description: string;
  lastAccessedAt: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  icon: IconType;
  color: string;
}

export interface LearningRoadmap {
  id: string;
  name: string;
  description: string;
  modules: number;
  estimatedTime: string;
  level: string;
}

export interface DashboardData {
  currentCourse: CourseProgress;
  stats: DashboardStat[];
  roadmaps: LearningRoadmap[];
} 