import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role"));

  // 🔁 Update navbar when localStorage changes
  useEffect(() => {
    const syncRole = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", syncRole);

    return () => {
      window.removeEventListener("storage", syncRole);
    };
  }, []);

  // 🔓 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-navbar fixed-top">
      <div className="container">

        {/* LOGO */}
        <NavLink className="navbar-brand logo-text fw-bold" to="/">
          LastKey
        </NavLink>

        {/* MOBILE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#lastKeyNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="lastKeyNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* PUBLIC */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link nav-modern">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link nav-modern">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/how" className="nav-link nav-modern">How It Works</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/security" className="nav-link nav-modern">Security</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link nav-modern">Contact</NavLink>
            </li>

            {/* ================= USER ================= */}
            {role === "user" && (
              <>
                <li className="nav-item">
                  <NavLink to="/user/home" className="nav-link nav-modern">
                    My Vault
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/user/add-data" className="nav-link nav-modern">
                    Add Data
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/user/select-nominee" className="nav-link nav-modern">
                    Nominee
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/user/view-data" className="nav-link nav-modern">
                    View Data
                  </NavLink>
                </li>
              </>
            )}

            {/* ================= NOMINEE ================= */}
            {role === "nominee" && (
              <li className="nav-item">
                <NavLink to="/nominee/access" className="nav-link nav-modern">
                  My Access
                </NavLink>
              </li>
            )}

            {/* ================= ADMIN ================= */}
            {role === "admin" && (
              <li className="nav-item">
                <NavLink to="/admin/dashboard" className="nav-link nav-modern">
                  Admin Panel
                </NavLink>
              </li>
            )}

            {/* ================= AUTH ================= */}
            {!role ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link nav-modern">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item ms-lg-3">
                  <NavLink to="/register" className="btn btn-gold">
                    Get Started
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-3">
                <button onClick={handleLogout} className="btn btn-outline-warning">
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}