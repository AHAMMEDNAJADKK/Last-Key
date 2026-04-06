import { Navigate, useLocation } from "react-router-dom";
import useVerification from "../hooks/useVerification";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roleRequired }) {

  const { user } = useAuth();
  const location = useLocation();

  const status = useVerification(); // ✅ always called (safe)

  // ❌ No user
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Wrong role
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  // 🔐 ONLY APPLY LOGIC FOR NOMINEE
  if (user.role === "nominee") {

    if (status === "loading") {
      return <p className="text-center mt-5">Loading...</p>;
    }

    if (status === "not_uploaded" && location.pathname !== "/nominee/upload-death-certificate") {
      return <Navigate to="/nominee/upload-death-certificate" />;
    }

    if (status === "pending" && location.pathname !== "/nominee/pending") {
      return <Navigate to="/nominee/pending" />;
    }

    if (status === "rejected" && location.pathname !== "/nominee/rejected") {
      return <Navigate to="/nominee/rejected" />;
    }

    // approved → allow
  }

  return children;
}