import {
  ThunderboltOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  CodeOutlined,
  TrophyFilled,
} from "@ant-design/icons";
import { PATH } from "@src/modules/dashboard/routes/paths";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: PATH.DASHBOARD,
  },

  {
    key: "learningPath",
    label: "Learning Path",
    icon: <ThunderboltOutlined />,
    path: "/learning-path",
    disabled: true,
  },

  {
    key: "exercises",
    label: "Exercises",
    icon: <CodeOutlined />,
    path: "/exercises",
    disabled: true,
  },
  {
    key: "Leaderboard",
    label: "Leaderboard",
    icon: <TrophyFilled />,
    path: "/leaderboard",
    disabled: true,
  },

  {
    key: "Community",
    label: "Community",
    icon: <UserOutlined />,
    path: "/community",
    disabled: true,
  },
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
