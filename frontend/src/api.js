import axios from "axios";

// ✅ CREATE AXIOS INSTANCE
const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api",
  withCredentials: true, // optional (good for auth/cookies later)
});


// ✅ REQUEST INTERCEPTOR

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ==============================
// ✅ RESPONSE INTERCEPTOR
// ==============================
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      // 🔴 Unauthorized (token expired)
      if (error.response.status === 401) {
        console.log("Session expired. Logging out...");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }

      // 🔴 Not Found Debug
      if (error.response.status === 404) {
        console.error("❌ API Route Not Found:", error.config.url);
      }
    } else {
      console.error("❌ Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;