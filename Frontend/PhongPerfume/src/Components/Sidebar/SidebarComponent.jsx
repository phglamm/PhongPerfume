import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  ToolOutlined,
  PayCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { route } from "../../Routes";
export default function SidebarComponent() {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const [collapsed, setCollapsed] = useState(false);

  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const role = "admin";

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    if (role === "admin") {
      setItems([
        getItem("Manager Users", route.userManagement, <UserOutlined />),
        getItem(
          "Manage Perfumes",
          route.perfumeManagement,
          <ShoppingCartOutlined />
        ),
        getItem(
          "Manager Brands",
          route.brandManagement,
          <AppstoreAddOutlined />
        ),
        getItem("Manager Events", route.eventManagement, <CalendarOutlined />),
        getItem("Manage Orders", route.orderManagement, <ShoppingOutlined />),
        getItem(
          "Manager Warrantys",
          route.warrantyManagement,
          <ToolOutlined />
        ),
        getItem(
          "Manager Payments",
          route.paymentManagement,
          <PayCircleOutlined />
        ),
        getItem("Back to Home", "/", <HomeOutlined />),
      ]);
    }
    // getItem("Statistics", "statistics", <BarChartOutlined />, [
    //   getItem("Club 1", "statistics"),
    //   getItem("Club 2", "stats-club-2"),
    //   getItem("Club 3", "stats-club-3"),
    //   getItem("All Clubs", "all-clubs"),
    // ]),
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["profile"]}
        mode="inline"
        selectedKeys={currentURI}
        openKeys={openKeys}
        onOpenChange={handleSubMenuOpen}
      >
        {items.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((subItem) => (
                <Menu.Item
                  key={subItem.key}
                  onClick={(e) => handleSelectKey(e.keyPath[1])}
                >
                  <Link to={`/admin/${subItem.key}`}>{subItem.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              {/* <Link to={`/admin/${item.key}`}>{item.label}</Link> */}
              <Link to={item.key === "/" ? "/" : `/admin/${item.key}`}>
                {item.label}
              </Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
}
