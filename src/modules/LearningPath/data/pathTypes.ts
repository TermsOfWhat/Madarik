export interface IPathState {
  roadmap: Roadmap | null;
  topic: RoadmapTopic | null;
  isLoading: boolean;
  isTopicLoading: boolean;
}

// Node types
interface Position {
  x: number;
  y: number;
}

interface NodeStyle {
  backgroundColor?: string;
  border?: string;
  color?: string;
  [key: string]: any;
}

interface NodeData {
  label: string;
}

interface FlowNode {
  id: string;
  type: "mainTopic" | "subTopic";
  position: Position;
  data: NodeData;
  style: NodeStyle | null;
}

// Edge types
interface EdgeStyle {
  stroke?: string;
  [key: string]: any;
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: "smoothstep" | "straight";
  animated: boolean;
  style: EdgeStyle | null;
}

// FlowChart structure
interface FlowChart {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

// Roadmap structure
export interface Roadmap {
  id: string;
  name: string;
  description: string;
  flowChart: FlowChart;
}

// Input parameters for the thunk
export interface FetchRoadmapParams {
  message: string;
}

export interface Article {
  name: string;
  estimatedTime: string;
  url: string;
  author: string;
}

export interface Chapter {
  name: string;
  description: string;
  articles: Article[];
}

export interface RoadmapTopic {
  id: string;
  name: string;
  chapters: Chapter[];
}

export interface FetchRoadmapTopicParams {
  roadmapId: string;
  id: string;
}
