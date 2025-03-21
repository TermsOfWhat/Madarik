import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BookOpen } from "lucide-react";

import { PATH } from "@src/modules/dashboard/routes/paths";
import { PATH as ROADMAPS_PATH } from "@src/modules/roadmaps/routes/paths";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: PATH.DASHBOARD,
  },

  {
    key: "roadmaps",
    label: "Roadmaps",
    icon: <BookOpen />,
    path: ROADMAPS_PATH.ROADMAPS,
  },
  // {
  //   key: "competetive-quiz",
  //   label: "Competetive Quiz",
  //   icon: <Brain />,
  //   path: "/competetive-quiz",
  //   disabled: true,
  // },
];

export const userMenuItems = [
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
    path: "/profile",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingOutlined />,
    path: "/settings",
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
    type: "logout",
  },
];
