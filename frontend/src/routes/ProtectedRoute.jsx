import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const deathVerified = localStorage.getItem("deathVerified");
  if (!token) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  // Nominee logic
  if (role === "nominee") {
    if (deathVerified === "false") {
      return <Navigate to="/nominee/upload-death-certificate" />;
    }

    if (deathVerified === "pending") {
      return <Navigate to="/nominee/pending" />;
    }
  }

  return children;
}
