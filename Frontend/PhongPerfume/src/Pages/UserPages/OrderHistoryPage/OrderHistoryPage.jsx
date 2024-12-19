import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";

import api from "../../../Config/Api";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function OrderHistoryPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch order history when the component mounts
    async function fetchUserOrders() {
      const response = await api.get(`Order/OrderWithUser/${id}`);
      setOrders(response.data);
      console.log(response.data);
    }
    setLoading(true);
  }, []);

  // Define columns for the orders table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => viewOrderDetail(record.orderId)}>
          View Details
        </Button>
      ),
    },
  ];

  // Function to handle viewing order details
  const viewOrderDetail = (orderId) => {
    console.log(`Viewing details for order: ${orderId}`);
    // Redirect to order detail page or display a modal with order details
  };

  return (
    <Container>
      <div className="order-history-page">
        <h2>Order History</h2>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="orderId"
          loading={loading}
          pagination={false}
        />
      </div>
    </Container>
  );
}
