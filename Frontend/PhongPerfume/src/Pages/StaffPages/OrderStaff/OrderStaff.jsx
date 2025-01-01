import React, { useEffect, useState } from "react";
import api from "../../../Config/api";
import { Button, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { Container } from "react-bootstrap";

export default function OrderStaff() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);

      try {
        const response = await api.get("Order");
        const filteredOrders = response.data.filter(
          (order) =>
            order.order_Status === "Pending" ||
            order.order_Status === "Processed" ||
            order.order_Status === "To Ship"
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, []);

  async function handleUpdateStatus(values) {
    let updateStatus;
    if (values.order_Status == "Pending") {
      updateStatus = "Processed";
    } else if (values.order_Status == "Processed") {
      updateStatus = "To Ship";
    } else if (values.order_Status == "To Ship") {
      updateStatus = "Shipping";
    } else if (values.order_Status == "Shipping") {
      updateStatus = "Delivered";
    }
    try {
      const response = await api.put(
        `/Order/UpdateOrderStatus/${values.order_Id}?updateorderstatus=${updateStatus}`
      );
      console.log(response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_Id === values.order_Id
            ? { ...order, order_Status: updateStatus }
            : order
        )
      );
    } catch (error) {
      console.log(error.response.data);
    }
  }
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
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Processed", value: "Processed" },
        { text: "To Ship", value: "To Ship" },
      ],
      onFilter: (value, record) => record.order_Status === value,
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
        <>
          {record.order_Status == "To Ship" ? (
            <>Waiting for Shipper</>
          ) : (
            <>
              <Button type="primary" onClick={() => handleUpdateStatus(record)}>
                Update Status
              </Button>
            </>
          )}
          <Button
            type="primary"
            onClick={() =>
              navigate(`/${route.ordertracking}/${record.order_Id}`)
            }
          >
            View Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Table
        loading={loading}
        columns={columns}
        dataSource={orders}
        rowKey={(record) => record.order_Id}
      />
    </Container>
  );
}
