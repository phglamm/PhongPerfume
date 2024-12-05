import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
export default function FooterComponent() {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#3a393a",
        color: "white",
      }}
    >
      Perfume Paradise ©2024 | Crafted with elegance and care.
    </Footer>
  );
}
