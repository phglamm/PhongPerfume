import React from "react";
import { Carousel } from "antd";
import "./CarouselComponent.scss";
const CarouselComponent = ({ images }) => {
  return (
    <Carousel autoplay className="carousel">
      {images.map((img, index) => (
        <div className="carousel-div" key={index}>
          <img src={img} alt={`carousel-image-${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
