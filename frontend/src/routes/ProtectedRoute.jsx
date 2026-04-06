import { Navigate } from "react-router-dom";
import useVerification from "../hooks/useVerification";

export default function ProtectedRoute({ children, roleRequired }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const status = useVerification(); // 🔥 NEW

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  // 🔐 NOMINEE FLOW
  if (role === "nominee") {

    if (status === "loading") {
      return <p className="text-center mt-5">Loading...</p>;
    }

    if (status === "not_uploaded") {
      return <Navigate to="/nominee/upload-death-certificate" />;
    }

    if (status === "pending") {
      return <Navigate to="/nominee/pending" />;
    }

    if (status === "rejected") {
      return <Navigate to="/nominee/rejected" />;
    }

    // ✅ approved → allow access
  }

  return children;
}