import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import { route } from "./Routes";
import UserLayout from "./Layouts/UserLayout/UserLayout";

import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import Homepage from "./Pages/UserPages/Homepage/Homepage";
import AboutPage from "./Pages/UserPages/About/AboutPage";
import UserManagement from "./Pages/AdminPages/UserManagement/UserManagement";
import PerfumeManagement from "./Pages/AdminPages/PerfumeManagement/PerfumeManagement";

function App() {
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
      ],
    },

    {
      path: route.admin,
      element: <AdminLayout />,
      children: [
        {
          path: route.userManagement,
          element: <UserManagement />,
        },
        {
          path: route.perfumeManagement,
          element: <PerfumeManagement />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
