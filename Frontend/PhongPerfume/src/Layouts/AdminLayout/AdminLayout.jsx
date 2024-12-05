import { Breadcrumb, Layout, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
const { Header, Content, Footer } = Layout;

import { useLocation } from "react-router-dom";
export default function AdminLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SidebarComponent />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <header></header>
          </Header>
          <Content
            style={{
              margin: "0 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Breadcrumb>
              {location.pathname.split("/").map((path, index, array) => (
                <Breadcrumb.Item key={path}>
                  {index === 0 ? path : <Link to={`/${path}`}>{path}</Link>}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>

            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Outlet style={{ flexGrow: 1 }} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
            DATSAN79 ©{new Date().getFullYear()} Created by DEMI
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
