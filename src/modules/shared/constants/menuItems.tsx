import {
  RobotOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  CodeOutlined,
  TrophyFilled,
} from "@ant-design/icons";

export const menuItems = [
  // {
  //   key: "posts",
  //   label: "Posts",
  //   icon: <HomeOutlined />,
  //   path: "/posts",
  // },
  // {
  //   key: "schedule",
  //   label: "Schedule",
  //   icon: <CalendarOutlined />,
  //   path: "/schedule",
  //   disabled: true,
  // },
  {
    key: "chat",
    label: "Chat",
    icon: <RobotOutlined />,
    path: "/chat",
  },

  {
    key: "learningPath",
    label: "Learning Path",
    icon: <ThunderboltOutlined />,
    path: "/learning-path",
    disabled: true,
  },

  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",
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

  {
    key: "configuration",
    label: "Configuration",
    icon: <SettingOutlined />,
    path: "/configuration",
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
