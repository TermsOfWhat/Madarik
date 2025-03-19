import { Fragment, lazy } from "react";
import MainLayout from "@src/modules/shared/layout/MainLayout/MainLayout";
import AuthGuard from "@src/modules/shared/guards/AuthGuard";
import { PATH } from "./paths";

const routes = [
  {
    exact: true,
    path: PATH.ROADMAPS,
    component: lazy(() => import('../Roadmaps')),
    guard: AuthGuard,
    layout: MainLayout,
  }
];

export default routes; 