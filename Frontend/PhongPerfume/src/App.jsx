import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { route } from "./Routes";
import UserLayout from "./Layouts/UserLayout/UserLayout";

import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import Homepage from "./Pages/UserPages/Homepage/Homepage";
import AboutPage from "./Pages/UserPages/About/AboutPage";
import UserManagement from "./Pages/AdminPages/UserManagement/UserManagement";
import PerfumeManagement from "./Pages/AdminPages/PerfumeManagement/PerfumeManagement";
import LoginPage from "./Pages/UserPages/LoginPage/LoginPage";
import BrandManagement from "./Pages/AdminPages/BrandManagement/BrandManagement";
import ProtectedRoute from "./Routes/ProtectedRoute";
import DetailPage from "./Pages/UserPages/Details/DetailPage";
import CartPage from "./Pages/UserPages/CartPage/CartPage";
import { useSelector } from "react-redux";
import { selectUser } from "./Redux/features/counterSlice";
import RegisterPage from "./Pages/UserPages/RegisterPage/RegisterPage";
import OrderHistoryPage from "./Pages/UserPages/OrderHistoryPage/OrderHistoryPage";
import CheckoutPage from "./Pages/UserPages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "./Pages/UserPages/OrderSuccessPage/OrderSuccessPage";
import OrderFailedPage from "./Pages/UserPages/OrderFailedPage/OrderFailedPage";
import OrderTrackingPage from "./Pages/UserPages/OrderTrackingPage/OrderTrackingPage";
import OrderShipper from "./Pages/ShipperPages/OrderShipper/OrderShipper";
import OrderStaff from "./Pages/StaffPages/OrderStaff/OrderStaff";
import OrderManagement from "./Pages/AdminPages/OrderManagement/OrderManagement";
import EventManagement from "./Pages/AdminPages/EventManagement/EventManagement";
import WarrantyManagement from "./Pages/AdminPages/WarrantyManagement/WarrantyManagement";
import PaymentManagement from "./Pages/AdminPages/PaymentManagement/PaymentManagement";
import ShopMenPage from "./Pages/UserPages/ShopMenPage/ShopMenPage";
import ShopWomenPage from "./Pages/UserPages/ShopWomenPage/ShopWomenPage";
import ShopUnisexPage from "./Pages/UserPages/ShopUnisexPage/ShopUnisexPage";
import ShopSearchPage from "./Pages/UserPages/ShopSearchPage/ShopSearchPage";
import ProfilePage from "./Pages/UserPages/ProfilePage/ProfilePage";

function App() {
  const user = useSelector(selectUser);

  const router = createBrowserRouter([
    {
      path: route.home,
      element: <UserLayout />,
      children: [
        {
          path: route.home,
          element: <Homepage />,
        },
        {
          path: route.about,
          element: <AboutPage />,
        },
        {
          path: route.login,
          element: <LoginPage />,
        },
        {
          path: route.register,
          element: <RegisterPage />,
        },
        {
          path: `${route.perfumes}/:id`,
          element: <DetailPage />,
        },
        {
          path: `${route.shop}/men`,
          element: <ShopMenPage />,
        },
        {
          path: `${route.shop}/women`,
          element: <ShopWomenPage />,
        },
        {
          path: `${route.shop}/unisex`,
          element: <ShopUnisexPage />,
        },
        {
          path: `${route.shop}/search`,
          element: <ShopSearchPage />,
        },
        {
          path: `${route.shop}/search/page/:pageNumber`,
          element: <ShopSearchPage />,
        },

        {
          path: `${user?.username}/${route.cart}`,
          element: <CartPage />,
        },
        {
          path: `${user?.username}/${route.orderHistory}`,
          element: <OrderHistoryPage />,
        },
        {
          path: `${user?.username}/${route.checkout}`,
          element: <CheckoutPage />,
        },
        {
          path: `${user?.username}/${route.ordersuccess}`,
          element: <OrderSuccessPage />,
        },
        {
          path: `${user?.username}/${route.orderfailed}`,
          element: <OrderFailedPage />,
        },
        {
          path: `${route.ordertracking}/:id`,
          element: <OrderTrackingPage />,
        },
        {
          path: route.shipper,
          element: <OrderShipper />,
        },
        {
          path: route.staff,
          element: <OrderStaff />,
        },
        {
          path: `${user?.username}/${route.profile}`,
          element: <ProfilePage />,
        },
      ],
    },

    {
      path: route.admin,
      element: (
        <ProtectedRoute roles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: route.userManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: route.perfumeManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <PerfumeManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: route.brandManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <BrandManagement />,
            </ProtectedRoute>
          ),
        },
        {
          path: route.orderManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <OrderManagement />,
            </ProtectedRoute>
          ),
        },
        {
          path: route.eventManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <EventManagement />,
            </ProtectedRoute>
          ),
        },
        {
          path: route.warrantyManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <WarrantyManagement />,
            </ProtectedRoute>
          ),
        },
        {
          path: route.paymentManagement,
          element: (
            <ProtectedRoute roles={["admin"]}>
              <PaymentManagement />,
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
