import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizState, Quiz, Question } from '../types/quiz.types';

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  currentQuestion: 0,
  answers: {},
  timeRemaining: 20,
  isSubmitted: false,
  score: null,
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz>) => {
      state.currentQuiz = action.payload;
      state.currentQuestion = 0;
      state.answers = {};
      state.timeRemaining = 20;
      state.isSubmitted = false;
      state.score = null;
    },
    nextQuestion: (state) => {
      if (state.currentQuiz && state.currentQuestion < state.currentQuiz.questions.length - 1) {
        state.currentQuestion += 1;
        state.timeRemaining = 20;
      }
    },
    setAnswer: (state, action: PayloadAction<{ questionId: string; answers: string[] }>) => {
      state.answers[action.payload.questionId] = action.payload.answers;
    },
    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },
    submitQuiz: (state) => {
      if (!state.currentQuiz) return;

      let correctAnswers = 0;
      let totalQuestions = state.currentQuiz.questions.length;

      state.currentQuiz.questions.forEach((question: Question) => {
        const userAnswers = state.answers[question.id] || [];
        const correctOptions = question.options
          .filter(option => option.isCorrect)
          .map(option => option.id);

        if (
          userAnswers.length === correctOptions.length &&
          userAnswers.every(answer => correctOptions.includes(answer))
        ) {
          correctAnswers++;
        }
      });

      state.score = (correctAnswers / totalQuestions) * 100;
      state.isSubmitted = true;
    },
    resetQuiz: (state) => {
      state.currentQuiz = null;
      state.currentQuestion = 0;
      state.answers = {};
      state.timeRemaining = 20;
      state.isSubmitted = false;
      state.score = null;
    },
  },
});

export const {
  setQuizzes,
  setCurrentQuiz,
  nextQuestion,
  setAnswer,
  updateTimeRemaining,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;