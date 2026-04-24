import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api";

const AuthContext = createContext();

// ─── Full-screen loading skeleton ───────────────────────────────────────────
function AuthLoadingSkeleton() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#f8f9ff",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar skeleton */}
      <div
        className="skeleton"
        style={{ height: 70, width: "100%", borderRadius: 0 }}
      />

      {/* Content skeleton */}
      <div
        style={{
          maxWidth: 800,
          width: "90%",
          margin: "60px auto",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div className="skeleton skeleton-text" style={{ width: "40%", height: 18 }} />
        <div className="skeleton skeleton-text" style={{ width: "70%", height: 38 }} />
        <div className="skeleton skeleton-text" style={{ width: "55%", height: 18 }} />
        <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
          <div className="skeleton skeleton-block" style={{ width: 200, height: 120 }} />
          <div className="skeleton skeleton-block" style={{ width: 200, height: 120 }} />
          <div className="skeleton skeleton-block" style={{ width: 200, height: 120 }} />
        </div>
        <div className="skeleton skeleton-text" style={{ width: "90%", height: 14 }} />
        <div className="skeleton skeleton-text" style={{ width: "80%", height: 14 }} />
      </div>
    </div>
  );
}

// ─── Provider ───────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);             // from /api/auth/me
  const [loading, setLoading] = useState(true);       // initial auth check
  const [verificationStatus, setVerificationStatus] = useState(null); // nominee only

  // ── Fetch verification status (nominee only) ──────────────────────────────
  const fetchVerificationStatus = useCallback(async () => {
    try {
      const { data } = await API.get("/verification/status");
      setVerificationStatus(data.status);
    } catch {
      setVerificationStatus("not_uploaded");
    }
  }, []);

  // ── Initial auth check on app boot ────────────────────────────────────────
  useEffect(() => {
    const checkAuth = async () => {
      // Only attempt if a token exists (avoids 401 noise for guests)
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // ✅ Role comes ONLY from the backend — never from localStorage
        const { data } = await API.get("/auth/me");
        setUser(data);

        // Fetch verification status immediately for nominees
        if (data?.role === "nominee") {
          await fetchVerificationStatus();
        }
      } catch {
        // Token invalid/expired → clean up
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [fetchVerificationStatus]);

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = async (responseData) => {
    // Store token for transport ONLY — role is NOT read from localStorage
    localStorage.setItem("token", responseData.token);

    // Immediately re-fetch /auth/me so role comes from backend
    try {
      const { data } = await API.get("/auth/me");
      setUser(data);

      if (data?.role === "nominee") {
        await fetchVerificationStatus();
      }
    } catch {
      // Fallback: use the data shape returned by login endpoint
      const userData = responseData.user || responseData;
      setUser(userData);
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setVerificationStatus(null);
  };

  // ── Refresh verification status (called from UploadDeathCertificate etc.) ─
  const refreshVerification = () => {
    if (user?.role === "nominee") {
      fetchVerificationStatus();
    }
  };

  // ── Prevent UI flicker: render skeleton until auth is resolved ────────────
  if (loading) {
    return <AuthLoadingSkeleton />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role: user?.role ?? null,           // ✅ from backend only
        verificationStatus,                 // ✅ from backend only
        login,
        logout,
        refreshVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext);