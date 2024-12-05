import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../../Components/Header/HeaderComponent";
import FooterComponent from "../../Components/Footer/FooterComponent";
import { Container } from "react-bootstrap";

export default function UserLayout() {
  return (
    <>
      <Container fluid>
        <Container>
          <HeaderComponent />
          <Outlet />
        </Container>
        <FooterComponent />
      </Container>
    </>
  );
}
