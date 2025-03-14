import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { PATH } from "@src/modules/dashboard/routes/paths";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: PATH.DASHBOARD,
  },

  // {
  //   key: "roadmaps",
  //   label: "Roadmaps",
  //   icon: <BookOpen />,
  //   path: "/roadmaps",
  //   disabled: true,
  // },
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
