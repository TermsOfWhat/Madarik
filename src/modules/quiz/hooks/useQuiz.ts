import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  nextQuestion,
  setAnswer,
  updateTimeRemaining,
  submitQuiz,
} from "../store/quizSlice";
import {
  selectCurrentQuestion,
  selectTimeRemaining,
  selectAnswers,
  selectCurrentQuiz,
} from "../store/quizSelectors";
import { useAppDispatch } from "@src/modules/shared/store";

export const useQuiz = () => {
  const dispatch = useAppDispatch();
  const currentQuestion = useSelector(selectCurrentQuestion);
  const timeRemaining = useSelector(selectTimeRemaining);
  const answers = useSelector(selectAnswers);
  const currentQuiz = useSelector(selectCurrentQuiz);

  useEffect(() => {
    let timer: number;
    if (currentQuestion && timeRemaining > 0) {
      timer = window.setInterval(() => {
        dispatch(updateTimeRemaining(timeRemaining - 1));
      }, 1000);
    } else if (timeRemaining === 0 && currentQuestion) {
      if (
        currentQuiz &&
        currentQuestion.id ===
          currentQuiz.questions[currentQuiz.questions.length - 1].id
      ) {
        dispatch(submitQuiz());
      } else {
        dispatch(nextQuestion());
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, currentQuestion, dispatch, currentQuiz]);

  const handleAnswerSelect = useCallback(
    (questionId: string, selectedAnswers: string[]) => {
      dispatch(setAnswer({ questionId, answers: selectedAnswers }));
    },
    [dispatch]
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuiz && currentQuestion) {
      if (
        currentQuestion.id ===
        currentQuiz.questions[currentQuiz.questions.length - 1].id
      ) {
        dispatch(submitQuiz());
      } else {
        dispatch(nextQuestion());
      }
    }
  }, [dispatch, currentQuiz, currentQuestion]);

  const handleSubmitQuiz = useCallback(() => {
    dispatch(submitQuiz());
  }, [dispatch]);

  return {
    currentQuestion,
    timeRemaining,
    answers,
    handleAnswerSelect,
    handleNextQuestion,
    handleSubmitQuiz,
  };
};

export default useQuiz;
