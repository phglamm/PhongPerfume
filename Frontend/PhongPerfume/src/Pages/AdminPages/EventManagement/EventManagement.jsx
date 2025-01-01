import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { route } from "../../../Routes";
import { useNavigate } from "react-router-dom";
import api from "../../../Config/api";

export default function EventManagement() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);

      try {
        const response = await api.get("Event");

        setEvents(response.data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const columns = [
    {
      title: "Event ID",
      dataIndex: "event_Id",
      key: "event_Id",
    },
    {
      title: "Event Poster",
      dataIndex: "event_Poster",
      key: "event_Poster",
      render: (url) => (
        <img src={url} alt="Event Poster" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Event Name",
      dataIndex: "event_Name",
      key: "event_Name",
    },
    {
      title: "Start Date",
      dataIndex: "event_Start",
      key: "event_Start",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "event_End",
      key: "event_End",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Voucher",
      dataIndex: "event_Voucher",
      key: "event_Voucher",
    },
    {
      title: "Discount",
      dataIndex: "event_Discount",
      key: "event_Discount",
      render: (value) => `${value}%`,
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
      dataSource={events}
      rowKey={(record) => record.event_Id}
    />
  );
}
