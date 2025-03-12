import { Layout } from "antd";
import Sidebar from "../../components/Sidebar/Sidebar";

// import { useAppDispatch } from "../../store";
// import { logout } from "@src/modules/auth/data/authThunk";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const dispatch = useAppDispatch();

  // const handleUserMenuClick = ({ key }: { key: string }) => {
  //   if (key === "logout") {
  //     dispatch(logout());
  //   }
  // };

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sidebar />
      <Layout>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: "10px",
            margin: "16px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

// {/* <Header
// style={{
//   padding: 0,
//   background: "#fff",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// }}
// >
// <div style={{ display: "flex", alignItems: "center" }}>
//   {/* <Space>
//     {pathname !== "/configuration" && <AccountConnect />}
//     <CreatePost />
//   </Space> */}
//   hi
// </div>
// {/* <Dropdown
//   menu={{
//     items: userMenuItems as MenuProps["items"],
//     onClick: handleUserMenuClick,
//   }}
//   placement="bottomRight"
// >
//   <Avatar style={{ marginRight: 24, cursor: "pointer" }} />
// </Dropdown> */}
// </Header> */}
