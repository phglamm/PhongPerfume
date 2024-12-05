import {
  HomeOutlined,
  ShopOutlined,
  AppstoreAddOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, Dropdown, Button } from "antd";
import { route } from "../../Routes";
import { logout, selectUser } from "../../Redux/features/counterSlice";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "antd";
const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;
export default function HeaderComponent() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const screens = useBreakpoint();

  const currentURI = location.pathname;
  const [selectedKey, setSelectedKey] = useState(currentURI);

  useEffect(() => {
    setSelectedKey(currentURI);
  }, [currentURI]);

  function getItem(label, key, icon, children, onClick) {
    return {
      key,
      icon,
      children,
      label: onClick ? (
        <span onClick={onClick}>{label}</span>
      ) : (
        <Link to={key}>{label}</Link>
      ),
    };
  }

  const [items, setItems] = useState([]);

  useEffect(() => {
    const userItems = user
      ? [
          getItem(user.username, user.username, <UserOutlined />, [
            getItem("Profile", `${user.username}/profile`, <UserOutlined />),
            getItem("Cart", `${user.username}/cart`, <ShoppingCartOutlined />),
          ]),
          getItem("Logout", "/logout", <LogoutOutlined />, null, () => {
            localStorage.removeItem("token");
            dispatch(logout());
          }),
        ]
      : [getItem("Login", route.login), getItem("Register", route.register)];

    setItems([
      getItem("Home", route.home, <HomeOutlined />),
      getItem("Shop", route.shop, <ShopOutlined />, [
        getItem("Men's Perfumes", `${route.shop}/men`, <AppstoreAddOutlined />),
        getItem(
          "Women's Perfumes",
          `${route.shop}/women`,
          <AppstoreAddOutlined />
        ),
        getItem(
          "Unisex Perfumes",
          `${route.shop}/unisex`,
          <AppstoreAddOutlined />
        ),
      ]),
      getItem("About Us", route.about, <InfoCircleOutlined />),
      getItem("Contact", route.contact, <PhoneOutlined />),
      ...userItems,
    ]);
  }, [user]);

  const handleMenuClick = (e) => {
    const { key } = e;
    if (key === "/logout") {
      return;
    }
    setSelectedKey(key);
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: screens.md ? "0 50px" : "0 20px",
      }}
    >
      <Title
        level={screens.md ? 4 : 5}
        style={{
          margin: 0,
          color: "#8e44ad",
          flex: screens.md ? "0 1 auto" : "1",
        }}
      >
        Perfume Paradise
      </Title>
      {screens.md ? (
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{
            flexGrow: 1,
            justifyContent: "end",
            backgroundColor: "transparent",
            borderBottom: "none",
          }}
          items={items}
        />
      ) : (
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <Button icon={<MenuOutlined />} />
        </Dropdown>
      )}
    </Header>
  );
}
