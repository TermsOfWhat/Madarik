import sharedRoutes from "./sharedRoutes";
import authRoutes from "../../auth/routes/routes";
import chatRoutes from "../../chat/routes/routes";
import dashboardRoutes from "../../dashboard/routes/routes";
import learningPathRoutes from "../../LearningPath/routes/routes";

import quizRoutes from "../../quiz/routes/routes";

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...chatRoutes,
  ...dashboardRoutes,
  ...learningPathRoutes,
  ...quizRoutes,
];

export default routes;
