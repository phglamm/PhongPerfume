import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { toast } from "react-toastify";
import api from "../../../Config/api";
import uploadFile from "../../../Components/Utils/uploadAppwrite";
import { PlusOutlined } from "@ant-design/icons";

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchBrand() {
      const response = await api.get("Brand");
      setBrands(response.data);
      console.log(response.data);
    }
    fetchBrand();
  }, []);

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

  const [isModalAddOpen, setisModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();

  function handleModalAdd() {
    setisModalAddOpen(true);
  }
  const handleOk = () => {
    formAdd.submit();
  };
  const handleAdd = async (values) => {
    console.log(values);
    const imgURLs = fileList.map((file) => file.url); // Collect all uploaded image URLs
    values.brand_images = imgURLs[0];
    try {
      // Validate form inputs
      console.log(values);
      // Call API to create a new brand
      const response = await api.post(`Brand`, values);
      console.log("Add response:", response);
      // Add the new brand to the state
      setBrands([...brands, response.data]);
      // Show success notification
      toast.success("Brand added successfully");
      // Close the modal
      setisModalAddOpen(false);
      // Reset the form fields
      formAdd.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to add brand:", error.response?.data || error);
      toast.error("Failed to add brand");
    }
  };

  async function handleDelete(values) {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this Brand ?",
        onOk: async () => {
          const response = await api.delete(`Brand/${values.brand_Id}`);
          console.log(response.data);
          toast.success("Delete Succesfully");
          setBrands(
            brands.filter((brand) => {
              return brand.brand_Id != values.brand_Id;
            })
          );
        },
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response);
    }
  }

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
    setPreviewOpen(true);
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
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formUpdate] = Form.useForm();
  const handleOkUpdate = () => {
    formUpdate.submit();
  };

  function handleModalUpdate(values) {
    setSelectedBrand(values); // Set the brand to be updated
    formUpdate.setFieldsValue(values); // Populate form with existing brand data
    setisModalUpdateOpen(true); // Open the modal
  }

  const handleUpdate = async (values) => {
    console.log(fileListUpdate);
    console.log(selectedBrand.brand_Images);
    if (fileListUpdate && fileListUpdate.length > 0) {
      const imagURLUpdate = fileListUpdate.map((file) => file.url);
      values.brand_Images = imagURLUpdate[0];
    } else {
      values.brand_Images = selectedBrand.brand_Images;
    }
    console.log(values);
    try {
      const response = await api.put(`Brand/${selectedBrand.brand_Id}`, values); // Call API to update
      console.log(response);
      toast.success("Updated successfully");
      setBrands(
        brands.map((brand) =>
          brand.brand_Id === selectedBrand.brand_Id
            ? { ...brand, ...values }
            : brand
        )
      );
      setisModalUpdateOpen(false); // Close modal
      setSelectedBrand(null); // Reset selected brand
      setFileListUpdate([]);
    } catch (error) {
      console.error("Failed to update brand:", error.response?.data || error);
      toast.error("Failed to update brand");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "brand_Id",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.brand_Id - b.brand_Id,
    },

    {
      title: "Brand's Name",
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
      title: "Brand's Image",
      dataIndex: "brand_Images",
      render: (value) => (
        <Image
          src={value}
          alt="value"
          style={{ width: 200, height: " 120px" }}
        />
      ),
    },
    {
      title: "Brand's Description",
      dataIndex: "brand_Description",
    },
    {
      title: "Perfumes",
      dataIndex: "perfumes",
      render: (perfumes) => (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {perfumes?.map((perfume, index) => (
            <li key={index} style={{ marginBottom: "4px" }}>
              {perfume}
            </li>
          ))}
        </ul>
      ),
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Button onClick={handleModalAdd}>Add Brand</Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={brands}
        onChange={onChange}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />

      <Modal
        title="Add Brand"
        visible={isModalAddOpen}
        onCancel={() => setisModalAddOpen(false)}
        onOk={handleOk}
      >
        <Form form={formAdd} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="brand_Name"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the brand name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="brand_Images" label="brand Images">
            <Upload
              className="label-form-image"
              maxCount={1}
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
            name="brand_Description"
            label="Brand Description"
            rules={[
              { required: true, message: "Please enter the brand description" },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Brand"
        visible={isModalUpdateOpen}
        onCancel={() => setisModalUpdateOpen(false)}
        onOk={handleOkUpdate}
      >
        <Form form={formUpdate} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="brand_Name"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the brand name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="brand_Images" label="Brand Images">
            <Upload
              className="label-form-image"
              maxCount={1}
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
            name="brand_Description"
            label="Brand Description"
            rules={[
              { required: true, message: "Please enter the brand description" },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
