import React from "react";
import { Layout, Form, Input, Button, Typography, Radio } from "antd";
import { toast } from "react-toastify";
import api from "../../Config/api";

const { Title } = Typography;

export default function RegisterPage() {
  const onFinish = async (values) => {
    console.log("Registration details:", values);
    try {
      values.Role = "customer";
      values.reward_point = 0;
      const response = await api.post("Authentication/register", values);
      console.log(response);
      toast.success("Register Succesfully");
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
        padding: "5%",
        // height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "24px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#8e44ad" }}>
          Register for Perfume Paradise
        </Title>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "24px" }}
        >
          {/* Full Name Field */}
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[
              {
                required: true,
                message: "Please enter your full name!",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          {/* Gender Field */}
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Phone Field */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Phone number must contain only digits!",
              },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Address Field */}
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter your address" rows={2} />
          </Form.Item>

          {/* Username Field */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username!",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
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
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          {/* Register Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#8e44ad", borderColor: "#8e44ad" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
