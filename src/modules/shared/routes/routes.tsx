import sharedRoutes from "./sharedRoutes";
import authRoutes from "../../auth/routes/routes";
import chatRoutes from "../../chat/routes/routes";
import dashboardRoutes from "../../dashboard/routes/routes";
import learningPathRoutes from "../../LearningPath/routes/routes";

import quizRoutes from "../../quiz/routes/routes";
import moduleRoutes from "../../ModuleDetails/routes/routes";

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...chatRoutes,
  ...dashboardRoutes,
  ...learningPathRoutes,
  ...quizRoutes,
  ...moduleRoutes,
];

export default routes;
