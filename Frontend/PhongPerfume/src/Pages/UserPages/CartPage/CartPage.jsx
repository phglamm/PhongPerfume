import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Typography, Divider } from "antd";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
} from "../../../Redux/features/cartSlice";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { route } from "../../../Routes";
import { selectUser } from "../../../Redux/features/counterSlice";

const { Title, Text } = Typography;

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={record.perfume_images[0]}
          alt={record.perfume_Name}
          style={{ width: "100%", height: "200px" }}
        />
      ),
      width: 400,
    },
    {
      title: "Name",
      dataIndex: "perfume_Name",
      key: "perfume_Name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            size="small"
            onClick={() =>
              dispatch(decreaseQuantity({ perfume_Id: record.perfume_Id }))
            }
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Text>{quantity}</Text>
          <Button
            size="small"
            onClick={() =>
              dispatch(increaseQuantity({ perfume_Id: record.perfume_Id }))
            }
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_, record) =>
        `$${(record.price * record.quantity).toLocaleString()}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          danger
          onClick={() =>
            dispatch(removeFromCart({ perfume_Id: record.perfume_Id }))
          }
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <div style={{ padding: "30px" }}>
        <Title level={2}>Your Cart</Title>
        <Divider />
        {cartItems.length > 0 ? (
          <>
            <Table
              dataSource={cartItems}
              columns={columns}
              pagination={false}
              bordered
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Title level={4}>Total: ${totalPrice.toLocaleString()}</Title>
              <div>
                <Link to={`/${user?.username}/${route.checkout}`}>
                  <Button
                    // onClick={() =>
                    //   navigate(`${user?.username}/${route.checkout}`)
                    // }
                    type="primary"
                    size="large"
                    style={{ marginRight: "10px" }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button
                  type="default"
                  size="large"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Text type="secondary">Your cart is empty.</Text>
        )}
      </div>
    </Container>
  );
}
