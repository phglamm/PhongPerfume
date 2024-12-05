import { Button, Carousel, Form, Image, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../Config/Api";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { toast } from "react-toastify";
import "./PerfumeManagement.scss";
export default function PerfumeManagement() {
  const [perfumes, setPerfumes] = useState([]);
  const navigate = useNavigate();
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

  function handleModalAdd() {
    setisModalAddOpen(true);
  }
  const handleAdd = async () => {
    try {
      // Validate form inputs
      const values = await formAdd.validateFields();
      console.log(values);
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

  const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [formUpdate] = Form.useForm();
  async function handleModalUpdate(values) {
    setSelectedPerfume(values); // Set the brand to be updated
    formUpdate.setFieldsValue(values); // Populate form with existing brand data
    setisModalUpdateOpen(true); // Open the modal
  }

  const handleUpdate = async () => {
    try {
      const updatedPerfume = await formUpdate.validateFields(); // Validate form inputs
      await api.put(`Perfume/${selectedPerfume.perfume_Id}`, updatedPerfume); // Call API to update
      toast.success("Updated successfully");
      setPerfumes(
        perfumes.map((perfume) =>
          perfume.perfume_Id === selectedPerfume.perfume_Id
            ? { ...perfume, ...updatedPerfume }
            : perfume
        )
      );
      setisModalUpdateOpen(false); // Close modal
      setSelectedPerfume(null); // Reset selected brand
    } catch (error) {
      console.error("Failed to update Perfume:", error.response?.data || error);
      toast.error("Failed to update Perfume");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "perfume_Id",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.brand_Id - b.brand_Id,
      defaultSortOrder: "ascend",
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
              <Image
                key={index}
                src={perfume}
                alt="value"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100px",
                  objectFit: "contain",
                }}
              />
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
  return (
    <div>
      <Button onClick={handleModalAdd}>Add Brand</Button>
      <Table
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
        onOk={handleAdd}
      >
        <Form form={formAdd} layout="vertical">
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
          {/* <Form.Item
            name="perfume_images"
            label="Perfume Images"
            rules={[
              {
                required: true,
                message: "Please enter at least one image URL",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Enter image URLs separated by commas"
            />
          </Form.Item> */}
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
        onOk={handleUpdate}
      >
        <Form form={formUpdate} layout="vertical">
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
          <Form.Item
            name="perfume_images"
            label="Perfume Images"
            rules={[
              {
                required: true,
                message: "Please enter at least one image URL",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Enter image URLs separated by commas"
            />
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
