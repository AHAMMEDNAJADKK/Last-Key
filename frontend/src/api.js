import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// ✅ Base URL
//
// CRA reads env vars prefixed with REACT_APP_ from .env
// Fallback to localhost:5000 for local development
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL =
  process.env.REACT_APP_API_URL    // CRA variable  (frontend/.env)
  || "http://localhost:5000";      // local fallback

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// ─────────────────────────────────────────────────────────────────────────────
// ✅ REQUEST INTERCEPTOR — attach JWT token
// ─────────────────────────────────────────────────────────────────────────────
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    // Debug: log every outgoing request URL in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ${req.method?.toUpperCase()} ${req.baseURL}${req.url}`);
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────────────────────────────────────
// ✅ RESPONSE INTERCEPTOR — handle global errors
// ─────────────────────────────────────────────────────────────────────────────
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      const { status, data, config } = error.response;

      // 401 — session expired
      if (status === 401) {
        console.warn("[API] 401 Unauthorized — clearing session");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      // 404 — wrong route
      if (status === 404) {
        console.error(`[API] 404 Not Found: ${config?.url}`);
      }

      // 502 — Cloudinary or upstream error
      if (status === 502) {
        console.error("[API] 502 Bad Gateway:", data?.message);
      }

      // 500 — server crash
      if (status === 500) {
        console.error("[API] 500 Server Error:", data?.message);
      }

    } else if (error.request) {
      // Request made but no response — backend not running or CORS issue
      console.error("[API] No response received. Is the backend running on", BASE_URL, "?");
    } else {
      console.error("[API] Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;