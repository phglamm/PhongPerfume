import { Button, Card, Carousel, Col, Row, Select, Slider, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../../../Config/api";
import { Link } from "react-router-dom";
import { route } from "../../../Routes";
import "./ShopWomenPage.scss";
export default function ShopWomenPage() {
  const [perfumes, setPerfumes] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filters, setFilters] = useState({
    brand: null,
    type: null,
  });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    async function fetchPerfumes() {
      try {
        const response = await api.get("Perfume");
        setPerfumes(response.data);
        const filterPerfumes = response.data
          .filter(
            (perfume) =>
              perfume.perfume_For === "Women" ||
              perfume.perfume_For === "Unisex"
          )
          .sort((a, b) => b.perfume_Id - a.perfume_Id);
        setPerfumes(filterPerfumes);
        setFilteredPerfumes(filterPerfumes);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    fetchPerfumes();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setLoading(true); // Show loader while applying filters

    setTimeout(() => {
      let filtered = perfumes;

      if (filters.brand) {
        filtered = filtered.filter((item) => item.brand_Name === filters.brand);
      }

      if (filters.type) {
        filtered = filtered.filter(
          (item) => item.perfume_Type === filters.type
        );
      }

      filtered = filtered.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );

      setFilteredPerfumes(filtered);
      setLoading(false); // Hide loader after filters are applied
    }, 500); // Simulate a delay for demonstration
  };

  const clearFilters = () => {
    setFilters({
      brand: null,
      type: null,
    });
    setPriceRange([0, 50000]);
    setFilteredPerfumes(perfumes);
  };
  return (
    <Container style={{ padding: "20px" }}>
      {/* Filter Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Select
            value={filters.brand}
            allowClear
            placeholder="Select Brand"
            style={{ width: "100%" }}
            onChange={(value) => handleFilterChange("brand", value)}
          >
            {Array.from(new Set(perfumes.map((item) => item.brand_Name))).map(
              (brand) => (
                <Option key={brand} value={brand}>
                  {brand}
                </Option>
              )
            )}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={filters.type}
            allowClear
            placeholder="Select Type"
            style={{ width: "100%" }}
            onChange={(value) => handleFilterChange("type", value)}
          >
            {Array.from(new Set(perfumes.map((item) => item.perfume_Type))).map(
              (type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              )
            )}
          </Select>
        </Col>
        <Col span={8}>
          <Slider
            range
            min={0}
            max={50000}
            step={1000}
            value={priceRange}
            onChange={setPriceRange}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={applyFilters} block>
            Apply
          </Button>
        </Col>
        <Col span={2}>
          <Button onClick={clearFilters} block>
            Clear
          </Button>
        </Col>
      </Row>

      {/* Perfume Cards Section */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredPerfumes.map((perfume) => (
            <Col key={perfume.perfume_Id} xs={24} sm={12} md={8} lg={6}>
              <Link to={`/${route.perfumes}/${perfume.perfume_Id}`}>
                <Card
                  cover={
                    <Carousel autoplay>
                      {perfume.perfume_images.map((img, index) => (
                        <img
                          className="card-images"
                          key={index}
                          src={img}
                          alt={perfume.perfume_Name}
                        />
                      ))}
                    </Carousel>
                  }
                >
                  <Meta
                    title={perfume.perfume_Name}
                    description={
                      <>
                        <p>{perfume.perfume_Description}</p>
                        <p>Type: {perfume.perfume_Type}</p>
                        <p>Price: {perfume.price.toLocaleString()} VND</p>
                        <p>
                          Stock:{" "}
                          {perfume.stocks > 0 ? (
                            <span style={{ color: "green" }}>In Stock</span>
                          ) : (
                            <span style={{ color: "red" }}>Out of Stock</span>
                          )}
                        </p>
                      </>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
