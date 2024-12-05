import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../Config/Api";
import { useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { toast } from "react-toastify";

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBrand() {
      const response = await api.get("Brand");
      setBrands(response.data);
      console.log(response.data);
    }
    fetchBrand();
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

  const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formUpdate] = Form.useForm();
  function handleModalUpdate(values) {
    setSelectedBrand(values); // Set the brand to be updated
    formUpdate.setFieldsValue(values); // Populate form with existing brand data
    setisModalUpdateOpen(true); // Open the modal
  }

  const handleUpdate = async () => {
    try {
      const updatedBrand = await formUpdate.validateFields(); // Validate form inputs
      const response = await api.put(
        `Brand/${selectedBrand.brand_Id}`,
        updatedBrand
      ); // Call API to update
      console.log(response);
      toast.success("Updated successfully");
      setBrands(
        brands.map((brand) =>
          brand.brand_Id === selectedBrand.brand_Id
            ? { ...brand, ...updatedBrand }
            : brand
        )
      );
      setisModalUpdateOpen(false); // Close modal
      setSelectedBrand(null); // Reset selected brand
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
      defaultSortOrder: "ascend",
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
  return (
    <div>
      <Button onClick={handleModalAdd}>Add Brand</Button>
      <Table
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
        onOk={handleAdd}
      >
        <Form form={formAdd} layout="vertical">
          <Form.Item
            name="brand_Name"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the brand name" }]}
          >
            <Input />
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
        onOk={handleUpdate}
      >
        <Form form={formUpdate} layout="vertical">
          <Form.Item
            name="brand_Name"
            label="Brand Name"
            rules={[{ required: true, message: "Please enter the brand name" }]}
          >
            <Input />
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
