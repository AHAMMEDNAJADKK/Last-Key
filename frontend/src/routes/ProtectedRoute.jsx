import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const deathVerified = localStorage.getItem("deathVerified");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
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
