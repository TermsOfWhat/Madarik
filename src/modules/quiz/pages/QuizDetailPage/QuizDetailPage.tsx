import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'antd';
import { fetchQuizById } from '../../api/quizApi';
import { setCurrentQuiz } from '../../store/quizSlice';
import {
  selectCurrentQuiz,
  selectIsSubmitted,
} from '../../store/quizSelectors';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';
import { useQuiz } from '../../hooks/useQuiz';

const QuizDetailPage: React.FC = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentQuiz = useSelector(selectCurrentQuiz);
  const isSubmitted = useSelector(selectIsSubmitted);
  const {
    currentQuestion,
    timeRemaining,
    answers,
    handleAnswerSelect,
    handleNextQuestion,
  } = useQuiz();

  useEffect(() => {
    const loadQuiz = async () => {
      if (quizId) {
        const quiz = await fetchQuizById(quizId);
        if (quiz) {
          dispatch(setCurrentQuiz(quiz));
        }
      }
    };
    loadQuiz();
  }, [quizId, dispatch]);

  useEffect(() => {
    if (isSubmitted) {
      navigate(`/quiz/${quizId}/results`);
    }
  }, [isSubmitted, navigate, quizId]);

  if (!currentQuiz || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{currentQuiz.title}</h1>
        <p className="text-gray-600">{currentQuiz.description}</p>
      </Card>

      <QuizQuestion
        question={currentQuestion}
        selectedAnswers={answers[currentQuestion.id] || []}
        timeRemaining={timeRemaining}
        onAnswerSelect={(selected) =>
          handleAnswerSelect(currentQuestion.id, selected)
        }
        onNext={handleNextQuestion}
        isLastQuestion={
          currentQuiz.questions.length ===
          Number(currentQuestion.id.replace('q', ''))
        }
      />
    </div>
  );
};

export default QuizDetailPage;
