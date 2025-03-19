import { Layout, Menu } from 'antd';
import { menuItems } from '../../constants/menuItems';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddNewPath from './components/AddNewPath/AddNewPath';
import logo from '../../assets/logo2.svg';

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
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          marginTop: '1rem',
        }}
      >
        <img src={logo} style={{}} />
      </div>

      <AddNewPath />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname.split('/')[1]]}
        items={menuItems}
        selectedKeys={[location.pathname.split('/')[1]]}
        onClick={handleMenuClick}
        rootClassName="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;
