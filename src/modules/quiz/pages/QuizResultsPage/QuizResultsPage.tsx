import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectScore, selectCurrentQuiz } from '../../store/quizSelectors';
import { resetQuiz } from '../../store/quizSlice';
import QuizResult from '../../components/QuizResult/QuizResult';

const QuizResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector(selectScore);
  const currentQuiz = useSelector(selectCurrentQuiz);

  if (!currentQuiz || score === null) {
    navigate('/');
    return null;
  }

  const handleRetryCurrentQuiz = () => {
    dispatch(resetQuiz());
    navigate(`/quiz/${currentQuiz.id}`);
  };

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
