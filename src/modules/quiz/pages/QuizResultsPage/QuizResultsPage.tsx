import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectScore, selectCurrentQuiz } from '../../store/quizSelectors';
import { resetQuiz } from '../../store/quizSlice';
import QuizResult from '../../components/QuizResult/QuizResult';
import LoadingDots from '@src/modules/shared/components/LoadingDots/LoadingDots';
import { useAppDispatch } from '@src/modules/shared/store';

const QuizResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const score = useSelector(selectScore);
  const currentQuiz = useSelector(selectCurrentQuiz);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentQuiz || score === null) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, [currentQuiz, score, navigate]);

  const handleRetryCurrentQuiz = () => {
    dispatch(resetQuiz());
    navigate(`/quiz/${currentQuiz?.id}`);
  };

  if (isLoading) {
    return (
      <LoadingDots 
        message={{
          title: "Calculating Results",
          subtitle: "Just a moment while we analyze your performance..."
        }}
      />
    );
  }

  if (!currentQuiz || score === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <QuizResult
        score={score}
        totalQuestions={currentQuiz.questions.length}
        onRetry={() => navigate('/')}
        onRetryCurrentQuiz={handleRetryCurrentQuiz}
      />
    </div>
  );
};

export default QuizResultsPage;
