import { useState } from "react";
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
  Image,
  Space,
} from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartItems } from "../../../Redux/features/cartSlice";
import api from "../../../Config/api";
import { order } from "../../../Redux/features/orderSlice";
import { selectUser } from "../../../Redux/features/counterSlice";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";

const { Step } = Steps;
const { Title, Text } = Typography;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);

  const totalAmount = cartItems.reduce((acc, item) => {
    const itemPrice =
      item.event_Id > 0
        ? item.price * (1 - item.event_Discount / 100)
        : item.price; // Use the sale price if there's an event discount, else use the original price

    return acc + itemPrice * item.quantity;
  }, 0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    message.success("Checkout successful!");
    values.order_Status = "Pending";
    values.total_Price = totalAmount;
    values.user_Id = user.user_Id;
    values.payment_Id = 1;
    values.warranty_Id = 1;
    values.orderItems = cartItems;
    console.log(values);
    try {
      const response = await api.post("Order", values);
      console.log(response.data);
      dispatch(order(response.data));
      navigate(`/${user?.username}/${route.ordersuccess}`);
      dispatch(clearCart());
    } catch (error) {
      navigate(`/${user?.username}/${route.orderfailed}`);
      message.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Row justify="center">
        <Col span={18}>
          <Card
            bordered={false}
            style={{
              borderRadius: "16px",
              boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              backgroundColor: "#ffffff",
            }}
          >
            <Steps
              current={currentStep}
              style={{ marginBottom: "30px" }}
              labelPlacement="vertical"
            >
              <Step title="Cart" icon={<ShoppingCartOutlined />} />
              <Step title="User Info" icon={<UserOutlined />} />
            </Steps>

            {currentStep === 0 && (
              <div>
                <Title
                  level={3}
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Your Shopping Cart
                </Title>
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    style={{ marginBottom: "15px" }}
                    bodyStyle={{ padding: "12px" }}
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        <Image
                          width={80}
                          src={item.perfume_images[0]}
                          alt={item.perfume_Name}
                          style={{ borderRadius: "8px" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Space direction="vertical" size={4}>
                          <Text strong>{item.perfume_Name}</Text>
                          <Text type="secondary">Brand: {item.brand_Name}</Text>
                          <Text>Size: {item.size}ml</Text>
                          <Text strong>
                            Price: $
                            {item.event_Id > 0
                              ? (
                                  item.price *
                                  (1 - item.event_Discount / 100)
                                ).toLocaleString()
                              : item.price.toLocaleString()}
                          </Text>
                          <Text>Quantity: {item.quantity}</Text>
                        </Space>
                      </Col>
                      <Col span={6} style={{ textAlign: "right" }}>
                        <Title level={4} style={{ marginTop: "15px" }}>
                          ${" "}
                          {item.event_Id > 0
                            ? (
                                item.price *
                                (1 - item.event_Discount / 100)
                              ).toLocaleString()
                            : item.price.toLocaleString()}
                        </Title>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Divider />
                <Row justify="end">
                  <Title level={4}>
                    Total:{" "}
                    <span style={{ color: "#52c41a" }}>
                      ${totalAmount.toLocaleString()}
                    </span>
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
                <Title
                  level={3}
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Your Information
                </Title>
                <Form.Item
                  name="order_customerName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="order_customerEmail"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address!",
                    },
                  ]}
                >
                  <Input placeholder="example@example.com" />
                </Form.Item>

                <Form.Item
                  name="order_customerPhone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input placeholder="123-456-7890" />
                </Form.Item>

                <Form.Item
                  name="order_Address"
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

                <Row justify="space-between" style={{ marginTop: "20px" }}>
                  <Button
                    type="default"
                    size="large"
                    onClick={prev}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #d9d9d9",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Previous Step
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => form.submit()}
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#1890ff",
                      borderColor: "#1890ff",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Submit Order
                  </Button>
                </Row>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
