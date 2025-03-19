import { createSlice } from "@reduxjs/toolkit";
import { IQuizState } from "./quizTypes";
import { fetchTopicQuiz, submitQuizAnswer, fetchQuizResults } from "./quizThunk";

const initialState: IQuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  isLoading: false,
  error: null,
  results: null,
  currentAnswer: null,
  topic: undefined,
  timeRemaining: 20
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.currentAnswer = null;
        state.timeRemaining = 20;
      }
    },
    updateTimeRemaining: (state, action) => {
      state.timeRemaining = Math.max(0, action.payload);
    },
    resetQuiz: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopicQuiz.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTopicQuiz.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload.questions;
      state.topic = {
        name: action.payload.topic?.name || 'Quiz',
        description: action.payload.topic?.description || 'Test your knowledge on this topic'
      };
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.results = null;
      state.currentAnswer = null;
      state.timeRemaining = 20;
    });
    builder.addCase(fetchTopicQuiz.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch quiz";
    });

    builder.addCase(submitQuizAnswer.pending, (state) => {
      state.error = null;
    });
    builder.addCase(submitQuizAnswer.fulfilled, (state, action) => {
      const currentQuestionId = state.questions[state.currentQuestionIndex].id;
      state.currentAnswer = action.payload;
      state.answers = {
        ...state.answers,
        [currentQuestionId]: action.meta.arg.answerId
      };
    });
    builder.addCase(submitQuizAnswer.rejected, (state, action) => {
      state.error = action.error.message || "Failed to submit answer";
    });

    builder.addCase(fetchQuizResults.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchQuizResults.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload;
    });
    builder.addCase(fetchQuizResults.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch results";
    });
  },
  
});

export const { nextQuestion, updateTimeRemaining, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer; 