import { RootState } from "../../shared/store";

export const selectQuizzes = (state: RootState) => state.quiz.quizzes;
export const selectCurrentQuiz = (state: RootState) => state.quiz.currentQuiz;
export const selectCurrentQuestion = (state: RootState) => {
  const quiz = state.quiz.currentQuiz;
  return quiz?.questions[state.quiz.currentQuestion];
};
export const selectAnswers = (state: RootState) => state.quiz.answers;
export const selectTimeRemaining = (state: RootState) =>
  state.quiz.timeRemaining;
export const selectIsSubmitted = (state: RootState) => state.quiz.isSubmitted;
export const selectScore = (state: RootState) => state.quiz.score;
