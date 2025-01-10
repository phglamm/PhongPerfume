import React, { useEffect, useState } from "react";
import api from "../../../Config/api";
import {
  Button,
  Card,
  Carousel,
  Col,
  Pagination,
  Row,
  Select,
  Slider,
  Spin,
} from "antd";
import { Option } from "antd/es/mentions";
import Meta from "antd/es/card/Meta";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { route } from "../../../Routes";

export default function ShopSearchPage() {
  const { pageNumber = 1 } = useParams(); // Get the page number from the URL, default to 1
  const pageSize = 3; // Items per page
  const [perfumes, setPerfumes] = useState([]); // All perfumes data (unfiltered)
  const [filteredPerfumes, setFilteredPerfumes] = useState([]); // Filtered perfumes data
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filters, setFilters] = useState({
    brand: null,
    type: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Loading state
  const searchParams = new URLSearchParams(location.search); // Get URL query parameters
  const searchQuery = searchParams.get("search") || ""; // Get search query from the URL

  // const searchQuery = location.state?.searchQuery || ""; // If not passed, default to empty string

  const handlePageChange = (pageNumber) => {
    navigate(
      `/${route.shop}/search/page/${pageNumber}?search=${encodeURIComponent(
        searchQuery.trim()
      )}`
    );
  };
  // Fetch all perfumes when component mounts or search query changes
  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      try {
        // const response = await api.get(
        //   `Perfume/search?search=${encodeURIComponent(searchQuery.trim())}`
        // );
        const response = await api.get(`Perfume/search`, {
          params: {
            search: encodeURIComponent(searchQuery.trim()),
          },
        });
        // Store all fetched perfumes in state
        setPerfumes(response.data);

        setFilteredPerfumes(response.data); // Initially, no filters applied
      } catch (error) {
        console.error("Error fetching perfumes:", error);
        setPerfumes([]);
        setFilteredPerfumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, [searchQuery]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters to all perfumes and reset pagination to the first page
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

  // Clear filters and reset pagination
  const clearFilters = () => {
    setFilters({
      brand: null,
      type: null,
    });
    setPriceRange([0, 50000]);
    setFilteredPerfumes(perfumes); // Reset to original (unfiltered) data
  };
  const currentPerfumes = filteredPerfumes.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
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
          {currentPerfumes.length > 0 ? (
            <>
              {currentPerfumes.map((perfume) => (
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
                            <p>Brand: {perfume.brand_Name}</p>
                            <p>
                              Stock:{" "}
                              {perfume.stocks > 0 ? (
                                <span style={{ color: "green" }}>In Stock</span>
                              ) : (
                                <span style={{ color: "red" }}>
                                  Out of Stock
                                </span>
                              )}
                            </p>
                          </>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </>
          ) : (
            <p>No Perfumes Found</p>
          )}
        </Row>
      )}

      <Pagination
        current={parseInt(pageNumber)}
        pageSize={pageSize}
        total={filteredPerfumes.length}
        onChange={handlePageChange}
      />
    </Container>
  );
}
