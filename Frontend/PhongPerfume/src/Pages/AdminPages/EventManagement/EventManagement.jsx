import { Button, DatePicker, Image, Input, Modal, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { route } from "../../../Routes";
import { useNavigate } from "react-router-dom";
import api from "../../../Config/api";
import { toast } from "react-toastify";
import uploadFile from "../../../Components/Utils/uploadAppwrite";
import Form from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function EventManagement() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileListUpdate, setFileListUpdate] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpenUpdate, setPreviewOpenUpdate] = useState(false);
  const [previewImageUpdate, setPreviewImageUpdate] = useState("");
  const [previewTitleUpdate, setPreviewTitleUpdate] = useState("");

  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();
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
      render: (values) => (
        <>
          <Button
            onClick={() => handleDelete(values)}
            className="delete-button"
          >
            Delete
          </Button>
          <Button
            onClick={() => handleModalUpdate(values)}
            className="update-button"
          >
            Update
          </Button>
        </>
      ),
    },
  ];
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  const handlePreviewUpdate = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageUpdate(file.url || file.preview);
    setPreviewTitleUpdate(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewOpenUpdate(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const updatedFileList = await handleFileUpload(newFileList);
    setFileList(updatedFileList);
  };

  const handleChangeUpdate = async ({ fileList: newFileList }) => {
    const updatedFileList = await handleFileUpload(newFileList);
    setFileListUpdate(updatedFileList);
  };

  const handleFileUpload = async (newFileList) => {
    return await Promise.all(
      newFileList.map(async (file) => {
        if (file.status !== "done") {
          try {
            const url = await uploadFile(file.originFileObj);
            toast.success("File upload successfully");
            return { ...file, url, status: "done" };
          } catch (error) {
            console.error("Upload failed", error);
            toast.error("File upload failed");
            return { ...file, status: "error" };
          }
        }
        return file;
      })
    );
  };

  const handleModalAdd = () => setIsModalAddOpen(true);
  const handleModalUpdate = (event) => {
    console.log(event);
    setSelectedEvent(event);

    formUpdate.setFieldsValue({
      ...event,
      event_Start: dayjs(event.event_Start),
      event_End: dayjs(event.event_End),
    });
    setIsModalUpdateOpen(true);
  };

  const handleAdd = async (values) => {
    const imgURLs = fileList.map((file) => file.url);
    values.event_Poster = imgURLs[0];
    console.log(values);
    try {
      const response = await api.post("event", values);
      console.log(response.data);
      setEvents([...events, response.data]);
      toast.success("event added successfully");
      setIsModalAddOpen(false);
      formAdd.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to add event:", error);
      toast.error("Failed to add event");
    }
  };

  const handleUpdate = async (values) => {
    const imgURLs =
      fileListUpdate.length > 0
        ? fileListUpdate.map((file) => file.url)
        : [selectedEvent.event_Images];
    values.event_Images = imgURLs[0];
    try {
      const response = await api.put(`event/${selectedEvent.event_Id}`, values);
      console.log(response.data);
      setEvents(
        events.map((event) =>
          event.event_Id === selectedEvent.event_Id
            ? { ...event, ...values }
            : event
        )
      );
      toast.success("Updated successfully");
      setIsModalUpdateOpen(false);
      setSelectedEvent(null);
      setFileListUpdate([]);
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event");
    }
  };

  const handleDelete = (values) => {
    Modal.confirm({
      title: "Are you sure you want to delete this event?",
      onOk: async () => {
        try {
          await api.delete(`event/${values.event_Id}`);
          toast.success("event deleted successfully");
          setEvents(
            events.filter((event) => event.event_Id !== values.event_Id)
          );
        } catch (error) {
          toast.error("Failed to delete event");
        }
      },
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Button onClick={handleModalAdd}>Add event</Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={events}
        rowKey={(record) => record.event_Id}
      />
      <Modal
        title="Add event"
        visible={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        onOk={() => formAdd.submit()}
      >
        <Form form={formAdd} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="event_Name"
            label="event Name"
            rules={[{ required: true, message: "Please enter the event name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="event_Poster" label="event Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                src={previewImage}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: setPreviewOpen,
                }}
              />
            )}
          </Form.Item>
          <Form.Item
            name="event_Start"
            label="Event Start"
            rules={[
              { required: true, message: "Please select the event start date" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="event_End"
            label="Event End"
            rules={[
              { required: true, message: "Please select the event end date" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="event_Voucher"
            label="event Voucher"
            rules={[{ required: true, message: "Please enter the event name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="event_Discount"
            label="event Discount"
            rules={[
              { required: true, message: "Please enter the event Discount" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update event"
        visible={isModalUpdateOpen}
        onCancel={() => setIsModalUpdateOpen(false)}
        onOk={() => formUpdate.submit()}
      >
        <Form form={formUpdate} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="event_Name"
            label="event Name"
            rules={[{ required: true, message: "Please enter the event name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="event_Poster" label="event Images">
            <Upload
              listType="picture-card"
              fileList={fileListUpdate}
              onPreview={handlePreviewUpdate}
              onChange={handleChangeUpdate}
            >
              {fileListUpdate.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImageUpdate && (
              <Image
                src={previewImageUpdate}
                preview={{
                  visible: previewOpenUpdate,
                  onVisibleChange: setPreviewOpenUpdate,
                }}
              />
            )}
          </Form.Item>
          <Form.Item
            name="event_Start"
            label="Event Start"
            rules={[
              { required: true, message: "Please select the event start date" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="event_End"
            label="Event End"
            rules={[
              { required: true, message: "Please select the event end date" },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="event_Voucher"
            label="event Voucher"
            rules={[{ required: true, message: "Please enter the event name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="event_Discount"
            label="event Discount"
            rules={[
              { required: true, message: "Please enter the event Discount" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
