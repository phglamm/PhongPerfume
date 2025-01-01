import { useEffect, useState } from "react";
import { Button, Image, Input, Modal, Table, Form, Select } from "antd";
import api from "../../../Config/api";
import { toast } from "react-toastify";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await api.get("User");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleAdd = async (values) => {
    try {
      const response = await api.post("User", values);
      setUsers([...users, response.data]);
      toast.success("User added successfully");
      setIsModalAddOpen(false);
      formAdd.resetFields();
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error("Failed to add user");
    }
  };

  const handleDelete = async (userId) => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this user?",
        onOk: async () => {
          await api.delete(`User/${userId}`);
          setUsers(users.filter((user) => user.user_Id !== userId));
          toast.success("User deleted successfully");
        },
      });
    } catch (error) {
      console.error("Failed to delete user", error);
      toast.error("Failed to delete user");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await api.put(`User/${selectedUser.user_Id}`, values);
      setUsers(
        users.map((user) =>
          user.user_Id === selectedUser.user_Id ? { ...user, ...values } : user
        )
      );
      toast.success("User updated successfully");
      setIsModalUpdateOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "user_Id",
      sorter: (a, b) => a.user_Id - b.user_Id,
    },
    {
      title: "Full Name",
      dataIndex: "full_Name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Reward Points",
      dataIndex: "reward_point",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (user) => (
        <>
          <Button
            onClick={() => {
              setSelectedUser(user);
              formUpdate.setFieldsValue(user);
              setIsModalUpdateOpen(true);
            }}
          >
            Update
          </Button>
          <Button onClick={() => handleDelete(user.user_Id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalAddOpen(true)}>
        Add User
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        rowKey="user_Id"
      />

      <Modal
        title="Add User"
        visible={isModalAddOpen}
        onCancel={() => setIsModalAddOpen(false)}
        onOk={() => formAdd.submit()}
      >
        <Form form={formAdd} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="full_Name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role" }]}
          >
            <Select>
              <Select.Option value="customer">Customer</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update User"
        visible={isModalUpdateOpen}
        onCancel={() => setIsModalUpdateOpen(false)}
        onOk={() => formUpdate.submit()}
      >
        <Form form={formUpdate} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="full_Name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role" }]}
          >
            <Select>
              <Select.Option value="customer">Customer</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
