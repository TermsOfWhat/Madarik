import { lazy } from 'react';
import { QUIZ_PATHS } from './paths';
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout';
import AuthGuard from '@src/modules/shared/guards/AuthGuard';

const routes = [
  {
    exact: true,
    guard: AuthGuard,
    path: QUIZ_PATHS.TOPIC_QUIZ,
    component: lazy(() => import('../pages/QuizDetailPage')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: QUIZ_PATHS.TOPIC_QUIZ_RESULTS,
    component: lazy(() => import('../pages/QuizResultsPage')),
    layout: MainLayout,
  },
];

export default routes;
