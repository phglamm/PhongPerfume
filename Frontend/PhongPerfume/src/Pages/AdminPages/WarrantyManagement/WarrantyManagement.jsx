import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Config/api";

export default function WarrantyManagement() {
  const navigate = useNavigate();
  const [warranty, setWarranty] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWarrantys() {
      setLoading(true);

      try {
        const response = await api.get("Warranty");
        setWarranty(response.data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchWarrantys();
  }, []);

  const columns = [
    {
      title: "Warranty ID",
      dataIndex: "warranty_Id",
      key: "warranty_Id",
    },
    {
      title: "Warranty's Name",
      dataIndex: "warranty_Name",
      key: "warranty_Name",
      render: (url) => (
        <img src={url} alt="Event Poster" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Warranty's Description",
      dataIndex: "warranty_Description",
      key: "warranty_Description",
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
      dataSource={warranty}
      rowKey={(record) => record.warranty_Id}
    />
  );
}
