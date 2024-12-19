import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Form,
  Image,
  Input,
  Modal,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { toast } from "react-toastify";
import "./PerfumeManagement.scss";
import uploadFile from "../../../Components/Utils/uploadAppwrite";
import api from "../../../Config/api";
export default function PerfumeManagement() {
  const [perfumes, setPerfumes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchPerfume() {
      const response = await api.get("Perfume");
      setPerfumes(response.data);
      console.log(response.data);
    }
    fetchPerfume();
  }, []);
  const [isModalAddOpen, setisModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();

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

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
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

  const handleChange = async ({ fileList: newFileList }) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (file.status !== "done") {
          try {
            const url = await uploadFile(file.originFileObj); // Upload the file and get the URL
            return { ...file, url, status: "done" }; // Update the file status and add the URL
          } catch (error) {
            console.error("Upload failed", error);
            toast.error("File upload failed");
            return { ...file, status: "error" }; // Set status to error on failure
          }
        }
        return file; // Keep already uploaded files as-is
      })
    );

    setFileList(updatedFileList);
    toast.success("Files uploaded successfully");
  };

  function handleModalAdd() {
    setisModalAddOpen(true);
  }
  const handleOk = () => {
    formAdd.submit();
  };

  const handleAdd = async (values) => {
    // Validate form inputs
    console.log(values);
    const imgURLs = fileList.map((file) => file.url); // Collect all uploaded image URLs
    values.perfume_images = imgURLs;

    try {
      // Call API to create a new brand
      const response = await api.post(`Perfume`, values);
      console.log("Add response:", response);
      // Add the new brand to the state
      setPerfumes([...perfumes, response.data]);
      // Show success notification
      toast.success("Perfume added successfully");
      // Close the modal
      setisModalAddOpen(false);
      // Reset the form fields
      formAdd.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to add Perfume:", error.response?.data || error);
      toast.error("Failed to add Perfume");
    }
  };

  async function handleDelete(values) {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this Perfume ?",
        onOk: async () => {
          const response = await api.delete(`Perfume/${values.perfume_Id}`);
          console.log(response.data);
          toast.success("Delete Succesfully");
          setPerfumes(
            perfumes.filter((perfume) => {
              return perfume.perfume_Id != values.perfume_Id;
            })
          );
        },
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "perfume_Id",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.perfume_Id - b.perfume_Id,
      defaultSortOrder: "descend",
    },

    {
      title: "Perfume's Name",
      dataIndex: "perfume_Name",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: [
        {
          text: "Gucci",
          value: "Gucci",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      onFilter: (value, record) => record.brand_Name.indexOf(value) === 0,
    },
    {
      title: "Perfume's Description",
      dataIndex: "perfume_Description",
    },
    {
      title: "Perfume's Type",
      dataIndex: "perfume_Type",
    },
    {
      title: "Perfumes 's Images",
      dataIndex: "perfume_images",
      render: (perfumes) => (
        <>
          <Carousel
            afterChange={onChange}
            className="carousel"
            style={{ width: "200px" }}
          >
            {perfumes.map((perfume, index) => (
              <Image key={index} src={perfume} alt="value" />
            ))}
          </Carousel>
        </>
      ),
    },
    {
      title: "Perfume's Size",
      dataIndex: "size",
    },
    {
      title: "Perfume's Stocks",
      dataIndex: "stocks",
    },
    {
      title: "Perfume's Price",
      dataIndex: "price",
    },
    {
      title: "Perfume's Brand",
      dataIndex: "brand_Name",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: [
        {
          text: "Gucci",
          value: "Gucci",
        },
        {
          text: "Le Labo",
          value: "Le Labo",
        },
      ],
      onFilter: (value, record) => record.brand_Name.indexOf(value) === 0,
    },
    {
      title: "Action",
      render: (values) => {
        return (
          <>
            <Button
              onClick={(e) => {
                handleDelete(values);
              }}
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
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [fileListUpdate, setFileListUpdate] = useState([]);
  const [previewOpenUpdate, setPreviewOpenUpdate] = useState(false);
  const [previewImageUpdate, setPreviewImageUpdate] = useState("");
  const [previewTitleUpdate, setPreviewTitleUpdate] = useState("");
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

  const handleChangeUpdate = async ({ fileList: newFileList }) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (file.status !== "done") {
          try {
            const url = await uploadFile(file.originFileObj); // Upload the file and get the URL
            return { ...file, url, status: "done" }; // Update the file status and add the URL
          } catch (error) {
            console.error("Upload failed", error);
            toast.error("File upload failed");
            return { ...file, status: "error" }; // Set status to error on failure
          }
        }
        return file; // Keep already uploaded files as-is
      })
    );

    setFileListUpdate(updatedFileList);
    toast.success("Files uploaded successfully");
  };

  const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [formUpdate] = Form.useForm();
  const handleOkUpdate = () => {
    formUpdate.submit();
  };

  async function handleModalUpdate(values) {
    setSelectedPerfume(values); // Set the brand to be updated
    formUpdate.setFieldsValue(values); // Populate form with existing brand data
    setisModalUpdateOpen(true); // Open the modal
  }

  const handleUpdate = async (values) => {
    console.log(fileListUpdate);
    console.log(selectedPerfume.perfume_images);
    if (fileListUpdate && fileListUpdate.length > 0) {
      const imagURLUpdate = fileListUpdate.map((file) => file.url);
      values.perfume_images = imagURLUpdate;
    } else {
      values.perfume_images = selectedPerfume.perfume_images;
    }
    console.log(values);
    try {
      const response = await api.put(
        `Perfume/${selectedPerfume.perfume_Id}`,
        values
      ); // Call API to update
      console.log(response.data);
      toast.success("Updated successfully");
      setPerfumes(
        perfumes.map((perfume) =>
          perfume.perfume_Id === selectedPerfume.perfume_Id
            ? { ...perfume, ...values }
            : perfume
        )
      );
      setisModalUpdateOpen(false); // Close modal
      setSelectedPerfume(null); // Reset selected brand
      setFileListUpdate([]);
    } catch (error) {
      console.error("Failed to update Perfume:", error.response?.data || error);
      toast.error("Failed to update Perfume");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Button onClick={handleModalAdd}>Add Perfume</Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={perfumes}
        onChange={onChange}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      <Modal
        title="Add Perfumes"
        visible={isModalAddOpen}
        onCancel={() => setisModalAddOpen(false)}
        onOk={handleOk}
      >
        <Form form={formAdd} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="perfume_Name"
            label="Perfume Name"
            rules={[
              { required: true, message: "Please enter the perfume name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="perfume_Description"
            label="Perfume Description"
            rules={[
              {
                required: true,
                message: "Please enter the perfume description",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="perfume_Type"
            label="Perfume Type"
            rules={[
              { required: true, message: "Please enter the perfume type" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="perfume_images" label="Perfume Images">
            <Upload
              className="label-form-image"
              maxCount={8}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
          <Form.Item
            name="size"
            label="Size (ml)"
            rules={[
              { required: true, message: "Please enter the perfume size" },
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="stocks"
            label="Stocks"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="brand_Id"
            label="Brand ID"
            rules={[{ required: true, message: "Please select the brand ID" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Perfumes"
        visible={isModalUpdateOpen}
        onCancel={() => setisModalUpdateOpen(false)}
        onOk={handleOkUpdate}
      >
        <Form form={formUpdate} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="perfume_Name"
            label="Perfume Name"
            rules={[
              { required: true, message: "Please enter the perfume name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="perfume_Description"
            label="Perfume Description"
            rules={[
              {
                required: true,
                message: "Please enter the perfume description",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="perfume_Type"
            label="Perfume Type"
            rules={[
              { required: true, message: "Please enter the perfume type" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="perfume_images" label="Perfume Images">
            <Upload
              className="label-form-image"
              maxCount={8}
              listType="picture-card"
              fileList={fileListUpdate}
              onPreview={handlePreviewUpdate}
              onChange={handleChangeUpdate}
            >
              {fileListUpdate.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImageUpdate && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpenUpdate,
                  onVisibleChange: (visible) => setPreviewOpenUpdate(visible),
                  afterOpenChange: (visible) =>
                    !visible && setPreviewImageUpdate(""),
                }}
                src={previewImageUpdate}
              />
            )}
          </Form.Item>
          <Form.Item
            name="size"
            label="Size (ml)"
            rules={[
              { required: true, message: "Please enter the perfume size" },
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="stocks"
            label="Stocks"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="brand_Id"
            label="Brand ID"
            rules={[{ required: true, message: "Please select the brand ID" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
