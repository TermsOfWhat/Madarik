import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QUIZ_PATHS } from './paths';
import QuizListPage from '../pages/QuizListPage';
import QuizDetailPage from '../pages/QuizDetailPage';
import QuizResultsPage from '../pages/QuizResultsPage';

const QuizRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={QUIZ_PATHS.LIST} element={<QuizListPage />} />
        <Route path={QUIZ_PATHS.DETAIL} element={<QuizDetailPage />} />
        <Route path={QUIZ_PATHS.RESULTS} element={<QuizResultsPage />} />
        <Route path="*" element={<Navigate to={QUIZ_PATHS.LIST} replace />} />
      </Routes>
    </Router>
  );
};

export default QuizRoutes;
