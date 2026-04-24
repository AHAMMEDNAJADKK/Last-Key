import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─── Inline skeleton while verification status is loading ────────────────────
function VerificationLoadingSkeleton() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "40px 24px",
      }}
    >
      <div
        className="skeleton skeleton-block"
        style={{ width: 64, height: 64, borderRadius: "50%" }}
      />
      <div className="skeleton skeleton-text" style={{ width: 220, height: 16 }} />
      <div className="skeleton skeleton-text" style={{ width: 160, height: 12 }} />
    </div>
  );
}

// ─── ProtectedRoute ──────────────────────────────────────────────────────────
// Props:
//   roleRequired  — "user" | "nominee" | "admin"
//   children      — the page component

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, role, verificationStatus } = useAuth();
  const location = useLocation();

  // AuthProvider already handles the initial loading skeleton,
  // so by the time we reach here, user data is resolved.

  // ── Not authenticated ─────────────────────────────────────────────────────
  if (!user) {
    // Send to the appropriate login page based on intended role
    if (roleRequired === "nominee") return <Navigate to="/nominee/login" replace />;
    if (roleRequired === "admin")   return <Navigate to="/admin/login" replace />;
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ── Wrong role ────────────────────────────────────────────────────────────
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  // ── Nominee verification flow ─────────────────────────────────────────────
  if (role === "nominee") {

    // Status not yet loaded from backend — show skeleton
    if (verificationStatus === null) {
      return <VerificationLoadingSkeleton />;
    }

    const path = location.pathname;

    if (
      verificationStatus === "not_uploaded" &&
      path !== "/nominee/upload-death-certificate"
    ) {
      return <Navigate to="/nominee/upload-death-certificate" replace />;
    }

    if (
      verificationStatus === "pending" &&
      path !== "/nominee/pending"
    ) {
      return <Navigate to="/nominee/pending" replace />;
    }

    if (
      verificationStatus === "rejected" &&
      path !== "/nominee/rejected"
    ) {
      return <Navigate to="/nominee/rejected" replace />;
    }

    // "approved" → fall through and render children
  }

  return children;
}