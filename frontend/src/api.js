import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ REQUEST INTERCEPTOR (attach token)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ RESPONSE INTERCEPTOR (🔥 IMPORTANT)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    // 🔴 If token expired / unauthorized
    if (error.response && error.response.status === 401) {

      console.log("Session expired. Logging out...");

      // clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;