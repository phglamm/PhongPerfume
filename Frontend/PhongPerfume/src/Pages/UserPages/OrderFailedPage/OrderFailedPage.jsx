import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./OrderFailedPage.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/features/counterSlice";
import { route } from "../../../Routes";
export default function OrderFailedPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleRetryOrder = () => {
    navigate(`/${user.username}/${route.checkout}`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <Result
        status="error"
        title="Order Failed"
        subTitle="We're sorry, but something went wrong. Please try again later or contact support for assistance."
        extra={[
          <Button
            type="primary"
            size="large"
            onClick={handleRetryOrder}
            style={{ borderRadius: "8px" }}
            key="retry"
          >
            Retry Order
          </Button>,
          <Button
            size="large"
            onClick={handleGoHome}
            style={{ borderRadius: "8px", border: "1px solid #d9d9d9" }}
            key="home"
          >
            Go to Home
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
