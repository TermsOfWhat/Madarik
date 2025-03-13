import sharedRoutes from './sharedRoutes';
import authRoutes from '../../auth/routes/routes';
import chatRoutes from '../../chat/routes/routes';
import dashboardRoutes from '../../dashboard/routes/routes';
import quizRoutes from '../../quiz/routes/routes';

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...chatRoutes,
  ...dashboardRoutes,
  ...quizRoutes,
];

export default routes;
