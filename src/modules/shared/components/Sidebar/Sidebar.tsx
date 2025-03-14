import { Layout, Menu } from "antd";
import { menuItems } from "../../constants/menuItems";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AddNewPath from "./components/AddNewPath/AddNewPath";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    const menuItem = menuItems.find((item) => item.key === key);
    if (menuItem?.path) {
      navigate(menuItem.path);
    }
  };

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md"
      style={siderStyle}
    >
      <div
        className="logo"
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      ></div>

      <AddNewPath />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname.split("/")[1]]}
        items={menuItems}
        selectedKeys={[location.pathname.split("/")[1]]}
        onClick={handleMenuClick}
        rootClassName="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;
