import sharedRoutes from "./sharedRoutes";
import authRoutes from "../../auth/routes/routes";
import chatRoutes from "../../chat/routes/routes";

const routes = [...sharedRoutes, ...authRoutes, ...chatRoutes];

export default routes;
