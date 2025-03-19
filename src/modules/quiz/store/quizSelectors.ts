import { RootState } from "@src/modules/shared/store";
import { createSelector } from '@reduxjs/toolkit';

export const selectQuestions = (state: RootState) => state.quiz.questions;
export const selectCurrentQuestion = createSelector(
  [(state: RootState) => state.quiz.questions, 
   (state: RootState) => state.quiz.currentQuestionIndex],
  (questions, index) => questions[index] || null
);
export const selectAnswers = (state: RootState) => state.quiz.answers;
export const selectTimeRemaining = (state: RootState) => state.quiz.timeRemaining;
export const selectResults = (state: RootState) => state.quiz.results;