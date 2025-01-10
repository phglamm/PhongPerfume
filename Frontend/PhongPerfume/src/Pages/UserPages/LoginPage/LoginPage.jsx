import React from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/features/counterSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../Config/firebase";
import api from "../../../Config/api";
import GoogleButton from "react-google-button";
import { Container } from "react-bootstrap";
import Cookies from "js-cookie";

const { Title } = Typography;
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await api.post("Authentication/login", values);
      console.log(response);
      // localStorage.setItem("accessToken", response.data?.token);
      // localStorage.setItem("refreshToken", response.data?.refreshToken);
      Cookies.set("accessToken", response.data?.token, {
        expires: 7,
        secure: true,
      }); // Expires in 7 days
      Cookies.set("refreshToken", response.data?.refreshToken, {
        expires: 7,
        secure: true,
      });
      const user = response.data?.user;
      dispatch(login(user));
      if (user.role === "customer") {
        navigate(route.home);
      } else if (user.role === "admin") {
        navigate(`${route.admin}/${route.userManagement}`);
      } else if (user.role === "shipper") {
        navigate(route.shipper);
      } else if (user.role === "staff") {
        navigate(route.staff);
      }
      toast.success("Login Succesfully");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  const handleLoginGG = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(result);
        const googleToken = await result.user.getIdToken(); // Get the Firebase token
        console.log(googleToken);
        const response = await api.post("Authentication/loginGoogle", {
          token: googleToken,
        });
        // console.log(response.data);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        localStorage.setItem("token", response.data.jwtToken);
        console.log("Logged in user:", response.data.user);

        // if (response.data.role === "CUSTOMER") {
        //   if (response.data.address || response.data.phone === null) {
        //     navigate(routes.home);
        //   } else navigate(routes.home);
        // }

        toast.success("Đăng Nhập Thành Công");
        dispatch(login(response.data.user));
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <Container>
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
            <GoogleButton
              style={{ width: "100%" }}
              type="dark" // can be light or dark
              onClick={() => {
                console.log("Google button clicked");
              }}
            />
          </Form>
        </div>
      </div>
    </Container>
  );
}
