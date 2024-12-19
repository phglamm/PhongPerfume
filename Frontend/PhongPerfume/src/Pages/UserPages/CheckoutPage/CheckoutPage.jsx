import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Steps,
  Col,
  Row,
  message,
  Typography,
  Divider,
  Modal,
  Image,
} from "antd";
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../Redux/features/cartSlice";
// import "antd/dist/antd.css";

const { Step } = Steps;
const { Title, Text } = Typography;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    message.success("Checkout successful!");
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentStep(0);
  };

  return (
    <div style={{ padding: "30px 20px", backgroundColor: "#f5f5f5" }}>
      <Row justify="center">
        <Col span={16}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Steps
              current={currentStep}
              size="small"
              style={{ marginBottom: "20px" }}
            >
              <Step title="Cart" icon={<ShoppingCartOutlined />} />
              <Step title="User Info" icon={<UserOutlined />} />
              <Step title="Payment" icon={<CreditCardOutlined />} />
              <Step title="Complete" icon={<CheckCircleOutlined />} />
            </Steps>

            {currentStep === 0 && (
              <div>
                <Title level={3}>Your Cart</Title>
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    style={{ marginBottom: "15px" }}
                    bodyStyle={{ padding: "12px" }}
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        {/* Replacing Avatar with product image */}
                        <Image
                          width={64}
                          src={item.perfume_images[0]}
                          alt={item.perfume_Name}
                        />
                      </Col>
                      <Col span={12}>
                        <Title level={4}>{item.perfume_Name}</Title>
                        <Text>Brand: {item.brand_Name}</Text>
                        <div>
                          <Text>Size: {item.size}ml</Text>
                        </div>
                        <div>
                          <Text strong>Price: ${item.price}</Text>
                        </div>
                        <div>
                          {/* Display quantity of the item */}
                          <Text>Quantity: {item.quantity}</Text>
                        </div>
                      </Col>
                      <Col span={6} style={{ textAlign: "right" }}>
                        <Title level={4} style={{ marginTop: "15px" }}>
                          ${(item.price * item.quantity).toLocaleString()}
                        </Title>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Divider />
                <Row justify="end">
                  <Title level={4}>
                    Total: ${totalAmount.toLocaleString()}
                  </Title>
                </Row>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={next}
                  style={{ marginTop: "20px" }}
                >
                  Proceed to User Info
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ padding: "20px" }}
              >
                <Title level={3}>Your Information</Title>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address!",
                    },
                  ]}
                >
                  <Input placeholder="johndoe@example.com" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Shipping Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your shipping address!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="123 Main St, City, Country"
                    rows={4}
                  />
                </Form.Item>

                <Button type="primary" size="large" htmlType="submit" block>
                  Proceed to Payment
                </Button>
              </Form>
            )}

            {currentStep === 2 && (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ padding: "20px" }}
              >
                <Title level={3}>Payment Information</Title>

                <Form.Item
                  name="cardholder"
                  label="Cardholder's Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the cardholder's name!",
                    },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="cardNumber"
                  label="Card Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card number!",
                    },
                  ]}
                >
                  <Input placeholder="1234 5678 9876 5432" />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="expirationDate"
                      label="Expiration Date"
                      rules={[
                        {
                          required: true,
                          message: "Please input the expiration date!",
                        },
                      ]}
                    >
                      <Input placeholder="MM/YY" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="cvv"
                      label="CVV"
                      rules={[
                        { required: true, message: "Please input the CVV!" },
                      ]}
                    >
                      <Input prefix={<LockOutlined />} placeholder="CVV" />
                    </Form.Item>
                  </Col>
                </Row>

                <Button type="primary" size="large" htmlType="submit" block>
                  Confirm Payment
                </Button>
              </Form>
            )}

            {currentStep === 3 && (
              <div>
                <Title level={3} style={{ textAlign: "center" }}>
                  Order Complete
                </Title>
                <Text strong style={{ display: "block", marginBottom: "20px" }}>
                  Thank you for your purchase! Your order will be processed
                  shortly.
                </Text>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleModalClose}
                >
                  Close
                </Button>
              </div>
            )}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {currentStep > 0 && (
                <Button style={{ marginRight: "8px" }} onClick={prev}>
                  Previous
                </Button>
              )}
              {currentStep < 3 && (
                <Button type="primary" onClick={next}>
                  Next
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Order Confirmation"
        visible={isModalVisible}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            OK
          </Button>,
        ]}
        onCancel={handleModalClose}
      >
        <Text>Your order has been placed successfully!</Text>
      </Modal>
    </div>
  );
}
