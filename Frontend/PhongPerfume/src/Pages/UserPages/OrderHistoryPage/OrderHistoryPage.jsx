import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";

import api from "../../../Config/Api";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/features/counterSlice";
import { route } from "../../../Routes";

export default function OrderHistoryPage() {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch order history when the component mounts
    async function fetchUserOrders() {
      try {
        setLoading(true);
        const response = await api.get(`Order/OrderFromUser/${user.user_Id}`);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch order history", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserOrders();
  }, []);

  // Define columns for the orders table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_Id",
      key: "order_Id",
    },
    {
      title: "Date",
      dataIndex: "order_Date",
      key: "order_Date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "order_Status",
      key: "order_Status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Total",
      dataIndex: "total_Price",
      key: "total_Price",
      render: (value) => value.toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        // <Button type="link" onClick={() => viewOrderDetail(record.orderId)}>
        //   View Details
        // </Button>
        <Button
          type="link"
          onClick={() => navigate(`/${route.ordertracking}/${record.order_Id}`)}
        >
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
