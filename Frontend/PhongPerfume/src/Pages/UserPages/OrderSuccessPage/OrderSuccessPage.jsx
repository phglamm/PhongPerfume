import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./OrderSuccessPage.scss";
import { selectUser } from "../../../Redux/features/counterSlice";
import { useSelector } from "react-redux";
import { route } from "../../../Routes";
import { selectOrder } from "../../../Redux/features/orderSlice";
export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const order = useSelector(selectOrder);
  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate(`/${user.username}/${route.orderHistory}`);
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Result
        status="success"
        title="Order Placed Successfully!"
        subTitle={`Thank you for your purchase. Your order number is ${order.order_Id}. You will receive an email confirmation shortly.`}
        extra={[
          <Button
            type="primary"
            size="large"
            onClick={handleGoHome}
            style={{ borderRadius: "8px" }}
            key="home"
          >
            Go to Home
          </Button>,
          <Button
            size="large"
            onClick={handleViewOrders}
            style={{ borderRadius: "8px", border: "1px solid #d9d9d9" }}
            key="orders"
          >
            View My Orders
          </Button>,
        ]}
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
}
