export interface AnalyticsData {
  topic: {
    id: string;
    name: string;
    roadmapId: string;
    description: string;
    progress: number;
  };
  streak: number;
  completedModules: number;
  quizesTaken: number;
}

export interface IAnalyticsState {
  data: AnalyticsData | null;
  isLoading: boolean;
  error: string | null;
}
