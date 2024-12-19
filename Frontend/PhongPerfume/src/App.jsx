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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
