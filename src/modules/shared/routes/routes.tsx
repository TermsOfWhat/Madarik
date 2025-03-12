import sharedRoutes from "./sharedRoutes";
import authRoutes from "../../auth/routes/routes";
import chatRoutes from "../../chat/routes/routes";
import dashboardRoutes from "../../dashboard/routes/routes";

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...chatRoutes,
  ...dashboardRoutes,
];

export default routes;
