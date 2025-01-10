import { useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Button,
  Divider,
  Modal,
  Form,
  Input,
  Upload,
  Image,
  Select,
} from "antd";
import { UserOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../../Redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import api from "../../../Config/api";
import uploadFile from "../../../Components/Utils/uploadAppwrite";

const { Content } = Layout;
const { Title, Text } = Typography;
export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formUpdate] = useForm();
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [fileListUpdate, setFileListUpdate] = useState([]);
  const [previewImageUpdate, setPreviewImageUpdate] = useState("");
  const [previewOpenUpdate, setPreviewOpenUpdate] = useState(false);

  const handleModalUpdate = () => {
    formUpdate.setFieldsValue(user);
    setIsModalUpdateOpen(true);
  };

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

  const handlePreviewUpdate = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageUpdate(file.url || file.preview);
    setPreviewOpenUpdate(true);
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

  const handleChangeUpdate = async ({ fileList: newFileList }) => {
    const updatedFileList = await handleFileUpload(newFileList);
    setFileListUpdate(updatedFileList);
  };

  const handleUpdate = async (values) => {
    const imgURLs =
      fileListUpdate.length > 0
        ? fileListUpdate.map((file) => file.url)
        : [user.user_avatar];
    values.user_avatar = imgURLs[0];
    console.log(values);
    try {
      const response = await api.put(
        `user/EditProfile/${user.user_Id}`,
        values
      );
      console.log(response.data);
      toast.success("Updated successfully");
      setIsModalUpdateOpen(false);
      setFileListUpdate([]);
      dispatch(login(response.data));
    } catch (error) {
      console.error("Failed to edit User:", error);
      toast.error("Failed to edit User");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Content
      style={{ pUpdateing: "20px", display: "flex", justifyContent: "center" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* User Avatar */}
        <Avatar
          size={120}
          src={user.user_avatar || null}
          icon={<UserOutlined />}
          style={{ marginBottom: 20 }}
        />
        <Title level={4}>{user.full_Name}</Title>
        <Text type="secondary">{user.email}</Text>
        <Divider />

        {/* Profile Details */}
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12}>
            <Text strong>Username</Text>
            <br />
            <Text>{user.username}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Fullname</Text>
            <br />
            <Text>{user.full_Name}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Gender</Text>
            <br />
            <Text>{user.gender ? "Male" : "Female"}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Phone</Text>
            <br />
            <Text>{user.phone}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Email</Text>
            <br />
            <Text>{user.email}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Address</Text>
            <br />
            <Text>{user.address}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong>Reward Points</Text>
            <br />
            <Text>{user.reward_point}</Text>
          </Col>
        </Row>
        <Divider />

        {/* Action Buttons */}
        <Button
          onClick={handleModalUpdate}
          icon={<EditOutlined />}
          style={{ marginRight: 10 }}
        >
          Edit Profile
        </Button>
      </Card>

      <Modal
        title="Edit Profile"
        visible={isModalUpdateOpen}
        onCancel={() => setIsModalUpdateOpen(false)}
        onOk={() => formUpdate.submit()}
      >
        <Form form={formUpdate} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="full_Name"
            label="Full Name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="user_avatar" label="Avatar">
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
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder="Select Gender">
              <Select.Option value={true}>Male</Select.Option>
              <Select.Option value={false}>Female</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
