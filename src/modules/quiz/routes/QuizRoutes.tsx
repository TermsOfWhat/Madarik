import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QUIZ_PATHS } from './paths';
import QuizDetailPage from '../pages/QuizDetailPage';
import QuizResultsPage from '../pages/QuizResultsPage';

const QuizRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={QUIZ_PATHS.TOPIC_QUIZ} element={<QuizDetailPage />} />
      <Route path={QUIZ_PATHS.TOPIC_QUIZ_RESULTS} element={<QuizResultsPage />} />
      <Route path="/quiz/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default QuizRoutes;
