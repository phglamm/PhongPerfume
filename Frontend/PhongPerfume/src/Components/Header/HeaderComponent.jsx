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
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, Dropdown, Button, Input, Col } from "antd";
import { route } from "../../Routes";
import { logout, selectUser } from "../../Redux/features/counterSlice";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "antd";
const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;
import "./HeaderComponent.scss";
import { clearCart } from "../../Redux/features/cartSlice";
import api from "../../Config/api";
import Cookies from "js-cookie";

export default function HeaderComponent() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const currentURI = location.pathname;
  const [selectedKey, setSelectedKey] = useState(currentURI);
  const [searchQuery, setSearchQuery] = useState("");

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
            getItem(
              "Profile",
              `${user.username}/${route.profile}`,
              <UserOutlined />
            ),
            getItem(
              "Cart",
              `${user.username}/${route.cart}`,
              <ShoppingCartOutlined />
            ),
            getItem(
              "Orders",
              `${user.username}/${route.orderHistory}`,
              <ShoppingCartOutlined />
            ),
          ]),
          getItem("Logout", route.login, <LogoutOutlined />, null, () => {
            // localStorage.removeItem("accessToken");
            // localStorage.removeItem("refreshToken");
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");

            dispatch(clearCart());
            navigate(`/${route.login}`);
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
    setSelectedKey(key); // Update the selected key immediately
    if (key === "/logout") {
      return;
    }
  };
  const handleSearch = async () => {
    navigate(
      `${route.shop}/search?search=${encodeURIComponent(searchQuery.trim())}`
    );
  };
  return (
    <>
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
            color: "#dc0719",
            flex: screens.md ? "0 1 auto" : "1",
          }}
        >
          Perfume Paradise
        </Title>

        <Input
          placeholder="Search perfumes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={handleSearch}
          suffix={
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            />
          }
          style={{
            marginLeft: 10,
            width: "auto",
            maxWidth: screens.md ? "300px" : "100%",
          }}
        />

        {screens.md ? (
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick} // Handle menu click
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
    </>
  );
}
