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

const { Title } = Typography;
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await api.post("Authentication/login", values);
      console.log(response);
      localStorage.setItem("accessToken", response.data?.token);
      localStorage.setItem("refreshToken", response.data?.refreshToken);

      const user = response.data?.user;
      dispatch(login(user));
      if (user.role === "customer") {
        navigate(route.home);
      } else if (user.role === "admin") {
        navigate(`${route.admin}/${route.userManagement}`);
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
          <div className="google-btn-container">
            <button onClick={handleLoginGG} className="google-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              Đăng nhập bằng Google
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
