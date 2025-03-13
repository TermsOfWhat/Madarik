export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  image?: string;
  type: 'single' | 'multiple';
  options: Option[];
  timeLimit: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  totalTime: number;
  passingScore: number;
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, string[]>;
  timeSpent: number;
  score: number;
  completed: boolean;
  timestamp: string;
}

export interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestion: number;
  answers: Record<string, string[]>;
  timeRemaining: number;
  isSubmitted: boolean;
  score: number | null;
  loading: boolean;
  error: string | null;
}
