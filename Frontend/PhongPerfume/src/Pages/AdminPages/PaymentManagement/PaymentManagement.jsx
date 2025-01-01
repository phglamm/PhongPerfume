import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Config/api";

export default function PaymentManagement() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPayment() {
      setLoading(true);

      try {
        const response = await api.get("Payment");
        setPayments(response.data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchPayment();
  }, []);

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "payment_Id",
      key: "payment_Id",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_Method",
      key: "payment_Method",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => navigate(`/event/details/${record.event_Id}`)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(`/event/details/${record.event_Id}`)}
          >
            Update
          </Button>
        </>
      ),
    },
  ];
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={payments}
      rowKey={(record) => record.payment_Id}
    />
  );
}
