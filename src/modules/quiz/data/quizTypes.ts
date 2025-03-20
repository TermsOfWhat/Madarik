export interface QuizQuestion {
  id: string;
  question: string;
  possibleAnswers: {
    id: string;
    answer: string;
  }[];
}

export interface QuizResponse {
  questions: QuizQuestion[];
  topic?: {
    name: string;
    description: string;
  };
}

export interface QuizAnswer {
  isCorrect: boolean;
  explanation: string | null;
}

export interface QuizResults {
  numberOfQuestions: number;
  numberOfCorrectAnswers: number;
  score: number;
  hasPassed: boolean;
}

export interface Topic {
  name: string;
  description: string;
}

export interface IQuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  results: QuizResults | null;
  currentAnswer: QuizAnswer | null;
  topic?: Topic;
  timeRemaining: number;
}

export interface SubmitQuizAnswerParams {
  roadmapId: string;
  topicId: string;
  questionId: string;
  answerId: string;
  selectedAnswers: string[];
}

export interface FetchQuizParams {
  roadmapId: string;
  topicId: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'single';
  options: QuizOption[];
  timeLimit: number;
}

export interface QuizQuestionProps {
  question: Question;
  selectedAnswers: string[];
  isLastQuestion: boolean;
  onAnswerSelect: (answers: string[]) => void;
  onNext: () => void;
  timeRemaining: number;
  isAnswered: boolean;
}
