import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { resetQuiz } from '../../data/quizSlice';
import QuizResult from '@src/modules/quiz/components/QuizResult/QuizResult';
import LoadingDots from '@src/modules/shared/components/LoadingDots/LoadingDots';

const QuizResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roadmapId, topicId } = useParams();
  const { results, isLoading } = useAppSelector((state) => state.quiz);

  if (isLoading) {
    return (
      <LoadingDots 
        message={{
          title: "Processing Your Score..",
          subtitle: "We’re reviewing your answers—stay tuned!"
        }}
      />
    );
  }

  if (!results) {
    navigate(`/quiz/${roadmapId}/${topicId}`);
    return null;
  }

  const handleRetry = () => {
    dispatch(resetQuiz());
    navigate(`/roadmap/${roadmapId}/module/${topicId}`);
  };

  const handleRetryCurrentQuiz = () => {
    dispatch(resetQuiz());
    navigate(`/quiz/${roadmapId}/${topicId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <QuizResult 
        score={results.score}
        totalQuestions={results.totalQuestions}
        onRetry={handleRetry}
        onRetryCurrentQuiz={handleRetryCurrentQuiz}
      />
    </div>
  );
};

export default QuizResultsPage;
