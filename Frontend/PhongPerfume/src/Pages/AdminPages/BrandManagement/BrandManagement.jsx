import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../Config/api";
import uploadFile from "../../../Components/Utils/uploadAppwrite";
import { PlusOutlined } from "@ant-design/icons";

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileListUpdate, setFileListUpdate] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpenUpdate, setPreviewOpenUpdate] = useState(false);
  const [previewImageUpdate, setPreviewImageUpdate] = useState("");
  const [previewTitleUpdate, setPreviewTitleUpdate] = useState("");

  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      try {
        const response = await api.get("Brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands");
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
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
  const handleModalUpdate = (brand) => {
    setSelectedBrand(brand);
    formUpdate.setFieldsValue(brand);
    setIsModalUpdateOpen(true);
  };

  const handleAdd = async (values) => {
    const imgURLs = fileList.map((file) => file.url);
    values.brand_images = imgURLs[0];
    try {
      const response = await api.post("Brand", values);
      setBrands([...brands, response.data]);
      toast.success("Brand added successfully");
      setIsModalAddOpen(false);
      formAdd.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Failed to add brand:", error);
      toast.error("Failed to add brand");
    }
  };

  const handleUpdate = async (values) => {
    const imgURLs =
      fileListUpdate.length > 0
        ? fileListUpdate.map((file) => file.url)
        : [selectedBrand.brand_Images];
    values.brand_Images = imgURLs[0];
    try {
      const response = await api.put(`Brand/${selectedBrand.brand_Id}`, values);
      console.log(response.data);
      setBrands(
        brands.map((brand) =>
          brand.brand_Id === selectedBrand.brand_Id
            ? { ...brand, ...values }
            : brand
        )
      );
      toast.success("Updated successfully");
      setIsModalUpdateOpen(false);
      setSelectedBrand(null);
      setFileListUpdate([]);
    } catch (error) {
      console.error("Failed to update brand:", error);
      toast.error("Failed to update brand");
    }
  };

  const handleDelete = (values) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Brand?",
      onOk: async () => {
        try {
          await api.delete(`Brand/${values.brand_Id}`);
          toast.success("Brand deleted successfully");
          setBrands(
            brands.filter((brand) => brand.brand_Id !== values.brand_Id)
          );
        } catch (error) {
          toast.error("Failed to delete brand");
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "brand_Id",
      sorter: (a, b) => a.brand_Id - b.brand_Id,
    },
    { title: "Brand's Name", dataIndex: "brand_Name" },
    {
      title: "Brand's Image",
      dataIndex: "brand_Images",
      render: (value) => (
        <Image
          src={value}
          alt="Brand Image"
          style={{ width: 200, height: 120 }}
        />
      ),
    },
    { title: "Brand's Description", dataIndex: "brand_Description" },
    {
      title: "Perfumes",
      dataIndex: "perfumes",
      render: (perfumes) => (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {perfumes?.map((perfume, index) => (
            <li key={index}>{perfume}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Button onClick={handleModalAdd}>Add Brand</Button>
      <Table loading={loading} columns={columns} dataSource={brands} />

      <Modal
        title="Add Brand"
        visible={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        onOk={() => formAdd.submit()}
      >
        <Form form={formAdd} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="brand_Name"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the brand name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="brand_Images" label="Brand Images">
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
        onCancel={() => setIsModalUpdateOpen(false)}
        onOk={() => formUpdate.submit()}
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
