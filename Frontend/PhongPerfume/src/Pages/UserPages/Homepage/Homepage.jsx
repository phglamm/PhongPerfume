import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { route } from "../../../Routes";
import api from "../../../Config/Api";
import ImageGallery from "react-image-gallery";
import { Col, Container, Row } from "react-bootstrap";
import "./Homepage.scss";
import { Card, Carousel } from "antd";
import ReactImageGallery from "react-image-gallery";
import CarouselComponent from "../../../Components/CarouselComponent/CarouselComponent";

export default function Homepage() {
  const [brands, setBrands] = useState([]);
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    async function fetchBrand() {
      const response = await api.get("Brand");
      setBrands(response.data);
      console.log(response.data);
    }

    async function fetchNewArrivals() {
      const response = await api.get("Perfume");
      const filterPerfumes = response.data.sort(
        (a, b) => b.perfume_Id - a.perfume_Id
      );
      console.log(filterPerfumes);
      setPerfumes(filterPerfumes);
      console.log(response.data);
    }

    fetchBrand();
    fetchNewArrivals();
  }, []);

  const imagesPoster = [
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_3.jpg?v=6655",
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_2.jpg?v=6655",
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=6655",
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=6655",
  ];

  const imagesBrand = [
    "https://theme.hstatic.net/1000340570/1000964732/14/banner_brand_image_section_03.jpg?v=6745",
    "https://theme.hstatic.net/1000340570/1000964732/14/banner_brand_image_section_01.jpg?v=6745",
    "https://theme.hstatic.net/1000340570/1000964732/14/banner_brand_image_section_02.jpg?v=6745",
    "https://theme.hstatic.net/1000340570/1000964732/14/banner_brand_image_section_03.jpg?v=6745",
  ];
  return (
    <>
      <Container fluid>
        <CarouselComponent images={imagesPoster} />
      </Container>
      <Container>
        <h4 className="annouce-text">Thương Hiệu</h4>
        <Row className="brand-section">
          <Col xs={6} className="brand-section-first">
            <CarouselComponent images={imagesBrand} />
          </Col>
          <Col xs={6} className="brand-section-second">
            <div className="brand_images">
              {brands.map((brand) => (
                <img src={brand.brand_Images} alt="" key={brand.brand_Id} />
              ))}
            </div>
          </Col>
        </Row>

        <h4 className="annouce-text">New Arrivals</h4>
        <div className="new-arrivals-scroller">
          {perfumes.map((perfume) => (
            <Link
              to={`${route.perfumes}/${perfume.perfume_Id}`}
              key={perfume.perfume_Id}
            >
              <Card
                key={perfume.perfume_Id}
                hoverable
                className="new-arrival-card"
                cover={
                  <img
                    alt={perfume.perfume_Name}
                    src={perfume.perfume_images[0]}
                  />
                }
              >
                <Card.Meta
                  title={perfume.perfume_Name}
                  description={`$${perfume.price.toLocaleString()}`}
                />
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
