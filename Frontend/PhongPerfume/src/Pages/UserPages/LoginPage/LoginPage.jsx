import React from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
import api from "../../../Config/Api";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/features/counterSlice";

const { Title } = Typography;
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await api.post("Authentication/login", values);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      const user = response.data.user;
      dispatch(login(user));
      if (user.role === "customer") {
        navigate(route.home);
      } else if (user.role === "admin") {
        navigate(`${route.admin}/${route.userManagement}`);
      }
      toast.success("Login Succesfully");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "24px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#8e44ad" }}>
          Welcome to Perfume Paradise
        </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "24px" }}
        >
          {/* Email Field */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your Username!",
              },
              //   {
              //     type: "email",
              //     message: "Please enter a valid email address!",
              //   },
            ]}
          >
            <Input placeholder="Enter your Username" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#8e44ad", borderColor: "#8e44ad" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
