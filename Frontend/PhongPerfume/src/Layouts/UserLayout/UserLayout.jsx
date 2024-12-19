import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../Components/Header/HeaderComponent";
import FooterComponent from "../../Components/Footer/FooterComponent";
import { Container } from "react-bootstrap";
import ReactImageGallery from "react-image-gallery";

export default function UserLayout() {
  return (
    <>
      <Container fluid>
        <div className="announcement-bar">Best perfume brand in Vietnam</div>
        <Container>
          <HeaderComponent />
        </Container>

        <Outlet />
        <FooterComponent />
      </Container>
    </>
  );
}
