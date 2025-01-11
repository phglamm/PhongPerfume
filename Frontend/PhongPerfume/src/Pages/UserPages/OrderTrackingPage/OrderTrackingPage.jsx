import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Table, Tag, Image, Divider } from "antd";
import api from "../../../Config/api";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    // Fetch order history when the component mounts
    async function fetchOrderById() {
      try {
        setLoading(true);
        const response = await api.get(`Order/${id}`);
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order history", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderById();
  }, []);
  const columns = [
    {
      title: "Product Image",
      dataIndex: "perfume_images",
      key: "perfume_images",
      render: (images) => <Image width={80} src={images[0]} alt="Product" />,
    },
    {
      title: "Product Name",
      dataIndex: "perfume_Name",
      key: "perfume_Name",
    },
    {
      title: "Description",
      dataIndex: "perfume_Description",
      key: "perfume_Description",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => `${size} ml`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <>
          {record.event_Id > 0 ? (
            <>
              <span className="original-price">
                ${record.price.toLocaleString()}
              </span>
              <span className="sale-price">
                $
                {(
                  record.price *
                  (1 - record.event_Discount / 100)
                ).toLocaleString()}
              </span>
            </>
          ) : (
            <span className="original-price">
              ${record.price.toLocaleString()}
            </span>
          )}
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Brand",
      dataIndex: "brand_Name",
      key: "brand_Name",
    },
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Card
        bordered={false}
        style={{
          borderRadius: "16px",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>Order Tracking</Title>
          </Col>
          <Col span={12}>
            <Card title="Order Details" bordered={false}>
              <p>
                <Text strong>Order ID:</Text> {order.order_Id}
              </p>
              <p>
                <Text strong>Date:</Text>{" "}
                {new Date(order.order_Date).toLocaleDateString()}
              </p>
              <p>
                <Text strong>Status:</Text>{" "}
                <Tag
                  color={order.order_Status === "Pending" ? "orange" : "green"}
                >
                  {order.order_Status}
                </Tag>
              </p>
              <p>
                <Text strong>Total Price:</Text> $
                {order.total_Price?.toLocaleString()}
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Customer Information" bordered={false}>
              <p>
                <Text strong>Name:</Text> {order.order_customerName}
              </p>
              <p>
                <Text strong>Email:</Text> {order.order_customerEmail}
              </p>
              <p>
                <Text strong>Phone:</Text> {order.order_customerPhone}
              </p>
              <p>
                <Text strong>Address:</Text> {order.order_Address}
              </p>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Order Items" bordered={false}>
              <Table
                columns={columns}
                loading={loading}
                dataSource={order.orderItems}
                rowKey={(record) => record.perfume_Id}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Event Information" bordered={false}>
              <p>
                <Text strong>Event Name:</Text>
                {order.orderItems?.map((oi) => (
                  <>{" " + oi.event_Name + ""}</>
                ))}
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Discount Information" bordered={false}>
              <p>
                <Text strong>Perfume:</Text>{" "}
                {order.orderItems?.map((oi) => (
                  <>{" " + oi.perfume_Name + " "}</>
                ))}
              </p>
              <p>
                <Text strong>Discount Rate:</Text>{" "}
                {order.orderItems?.map((oi) => (
                  <>{" " + oi.event_Discount + "% "}</>
                ))}
              </p>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Warranty Information" bordered={false}>
              <p>
                <Text strong>Warranty Name:</Text> {order.warranty_Name}
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Payment Information" bordered={false}>
              <p>
                <Text strong>Payment Method:</Text> {order.payment_Method}
              </p>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
