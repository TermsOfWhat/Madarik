export interface IPathState {
  roadmap: Roadmap | null;
  topic: RoadmapTopic | null;
  isLoading: boolean;
  isTopicLoading: boolean;
  chapterQuiz: Record<string, QuizQuestion[]> | null;
  isQuizLoading: boolean;
  miniQuizResult: QuizSubmissionResponse | null;
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
  id: string;
  name: string;
  description: string;
  articles: Article[];
  isCompleted: boolean;
  quiz?: quizInChapter | null;
}

export type quizInChapter = {
  id: string;
  questions: {
    id: string;
    question: string;
    possibleAnswers: {
      id: string;
      answer: string;
      isCorrect: boolean;
    }[];
    explanation: string;
  }[];
};

export interface RoadmapTopic {
  id: string;
  name: string;
  chapters: Chapter[];
  progress: number;
  difficulty: string;
  chaptersCount: number;
}

export interface FetchRoadmapTopicParams {
  roadmapId: string;
  id: string;
}

interface QuizAnswer {
  id: string;
  answer: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  possibleAnswers: QuizAnswer[];
}

export interface FetchChapterQuizParams {
  roadmapId: string;
  topicId: string;
  chapterId: string;
}

export interface QuizSubmissionAnswer {
  question: string;
  yourAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
}

export interface QuizSubmissionResponse {
  numberOfQuestions: number;
  numberOfValidAnswers: number;
  submission: QuizSubmissionAnswer[];
}

export interface SubmitQuizParams {
  roadmapId: string;
  topicId: string;
  chapterId: string;
  answers: { questionId: string; answerId: string }[];
}