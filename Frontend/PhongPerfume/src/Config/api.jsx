import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { route } from "../Routes";

import { logout } from "../Redux/features/counterSlice";
import { useNavigate } from "react-router-dom";

// const INACTIVITY_TIMEOUT = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const INACTIVITY_TIMEOUT = 1 * 2 * 60 * 1000; // 3 hours in milliseconds

let lastRequestTime = Date.now(); // Track the last request time
const baseUrl = "https://localhost:5001/api/";
const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;

const handleBefore = async (config) => {
  let accessToken = localStorage.getItem("accessToken")?.replaceAll('"', "");
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest > INACTIVITY_TIMEOUT) {
    // If inactivity period exceeds the threshold, log the user out
    console.log("User has been inactive for more than 3 hours. Logging out.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // dispatch(logout());
    // navigate(`/${route.login}`);
    window.location = `/${route.login}`;
    return Promise.reject("User logged out due to inactivity.");
  }
  if (accessToken) {
    const tokenExpiry = jwtDecode(accessToken).exp * 1000;
    if (Date.now() >= tokenExpiry) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const encodedRefreshToken = encodeURIComponent(refreshToken);
        const response = await axios.post(
          `https://localhost:5001/api/Authentication/refresh-token?refreshToken=${encodedRefreshToken}`
        );
        console.log(response);
        accessToken = response.data.token;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // dispatch(logout());
        // navigate(`/${route.login}`);
        window.location = `/${route.login}`;
        return Promise.reject(error);
      }
      // Refresh the token
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  lastRequestTime = Date.now(); // Update the last request time
  return config;
};
const handleError = (error) => {
  // console.log(error);
  return;
};
api.interceptors.request.use(handleBefore, handleError);
// api.interceptors.response.use(null, handleError);
export default api;
