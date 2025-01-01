import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../Config/api";
import {
  Descriptions,
  Image,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Spin,
  Button,
  Tag,
} from "antd";
import ReactImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/features/cartSlice";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
const { Title, Text } = Typography;
import "./DetailPage.scss";
export default function DetailPage() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [perfumeImages, setPerfumeImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchPerfumeDetail() {
      try {
        const response = await api.get(`Perfume/PerfumeWithBrandName/${id}`);
        console.log(response.data);
        setPerfume(response.data);
        setPerfumeImages(response.data.perfume_images);
        console.log(response.data.perfume_images);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setLoading(false);
      }
    }
    fetchPerfumeDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!perfume) {
    return <Text type="danger">Failed to load perfume details.</Text>;
  }

  const images = perfumeImages.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  const handleAddToCart = () => {
    dispatch(addToCart(perfume));
    toast.success("Add to Cart");
  };
  return (
    <Container>
      <div style={{ padding: "30px" }}>
        <Row gutter={[16, 16]}>
          {/* Left Column: Image Gallery */}
          <Col xs={24} md={15}>
            <Card
              style={{
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <Image.PreviewGroup>
                <ReactImageGallery items={images} />
              </Image.PreviewGroup>
            </Card>
          </Col>

          {/* Right Column: Product Details */}
          <Col xs={24} md={9}>
            <Card
              style={{
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#fafafa",
              }}
            >
              <Row gutter={[16, 16]}>
                {/* Perfume Info */}
                <Col span={24}>
                  <Title level={2} style={{ marginBottom: "10px" }}>
                    {perfume.perfume_Name}
                  </Title>
                  <Tag color="blue">{perfume.perfume_Type}</Tag>
                  <Divider />
                  <Text strong>Description:</Text>
                  <p>{perfume.perfume_Description}</p>
                </Col>

                {/* Perfume Details */}
                <Col span={12}>
                  <Text strong>Size:</Text>
                  <p>{perfume.size || "N/A"}</p>
                </Col>
                <Col span={12}>
                  <Text strong>Stock:</Text>
                  <p>{perfume.stocks}</p>
                </Col>
                <Col span={12}>
                  <Text strong>Price:</Text>
                  <p style={{ color: "#d4380d", fontSize: "18px" }}>
                    ${perfume.price.toLocaleString()}
                  </p>
                </Col>
                <Col span={12}>
                  <Text strong>Brand:</Text>
                  <p>{perfume.brand_Name}</p>
                </Col>
              </Row>

              {/* Action Buttons */}
              <Divider />
              <Row justify="center" gutter={[16, 16]}>
                <Col>
                  <Button type="primary" size="large" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </Col>
                <Col>
                  <Button type="default" size="large">
                    Back to Shop
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
