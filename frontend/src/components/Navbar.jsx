import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

/* ─── Nav link definitions per role ─────────────────────────────────────── */
const GUEST_LINKS = [
  { label: "Home",         to: "/" },
  { label: "About",        to: "/about" },
  { label: "How It Works", to: "/how" },
  { label: "Security",     to: "/security" },
  { label: "Contact",      to: "/contact" },
];

const USER_LINKS = [
  { label: "My Vault",  to: "/user/home" },
  { label: "Add Data",  to: "/user/add-data" },
  { label: "View Data", to: "/user/view-data" },
  { label: "Nominee",   to: "/user/select-nominee" },
];

const ADMIN_LINKS = [
  { label: "Dashboard",              to: "/admin/dashboard" },
  { label: "Verification Requests",  to: "/admin/verification" },
];

/* ─── Animation variants ─────────────────────────────────────────────────── */
const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

const linkListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
};

/* ─── Hamburger icon (animated) ─────────────────────────────────────────── */
function HamburgerIcon({ open }) {
  return (
    <div style={{ width: 24, height: 20, position: "relative", cursor: "pointer" }}>
      {[0, 8, 16].map((top, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top,
            width: 24,
            height: 2.5,
            borderRadius: 2,
            background: "var(--primary)",
            display: "block",
            transformOrigin: "center",
          }}
          animate={
            open
              ? i === 0
                ? { top: 9, rotate: 45 }
                : i === 1
                ? { opacity: 0, scaleX: 0 }
                : { top: 9, rotate: -45 }
              : { top, rotate: 0, opacity: 1, scaleX: 1 }
          }
          transition={{ duration: 0.25 }}
        />
      ))}
    </div>
  );
}

/* ─── Single nav link with animated underline ───────────────────────────── */
function NavItem({ to, label, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        position: "relative",
        display: "inline-block",
        color: isActive ? "var(--primary)" : "var(--gray-700)",
        fontWeight: isActive ? 600 : 500,
        fontSize: "0.9rem",
        padding: "6px 0",
        textDecoration: "none",
        transition: "color 0.2s ease",
        whiteSpace: "nowrap",
      })}
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Animated underline */}
          <motion.span
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              background: "var(--accent)",
              borderRadius: 2,
              width: "100%",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive || hovered ? 1 : 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            transformOrigin="left"
          />
        </>
      )}
    </NavLink>
  );
}

/* ─── Nominee links — conditional on verificationStatus ─────────────────── */
function NomineeLinks({ verificationStatus, onClick }) {
  return (
    <>
      <NavItem to="/nominee/upload-death-certificate" label="Upload Certificate" onClick={onClick} />
      <NavItem to="/nominee/pending" label="Verification Status" onClick={onClick} />
      {verificationStatus === "approved" && (
        <NavItem to="/nominee/access" label="Access Vault" onClick={onClick} />
      )}
    </>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { user, role, verificationStatus, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Scroll detection for blur intensity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully!");
    navigate("/");
  };

  const closeMobile = () => setMobileOpen(false);

  /* ── Navbar base styles ─────────────────────────────────────────────────── */
  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: "var(--navbar-h)",
    background: scrolled
      ? "rgba(255, 255, 255, 0.88)"
      : "rgba(255, 255, 255, 0.75)",
    backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "blur(12px)",
    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "blur(12px)",
    borderBottom: scrolled
      ? "1px solid rgba(68,45,130,0.12)"
      : "1px solid rgba(68,45,130,0.06)",
    boxShadow: scrolled
      ? "0 4px 24px rgba(68,45,130,0.10)"
      : "none",
    transition:
      "background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  };

  /* ── Logo ────────────────────────────────────────────────────────────────── */
  const Logo = (
    <NavLink
      to="/"
      style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
    >
      {/* Key icon */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
            stroke="#b7d333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontWeight: 800,
          fontSize: "1.25rem",
          color: "var(--primary)",
          letterSpacing: "-0.5px",
        }}
      >
        Last<span style={{ color: "var(--accent-dark)" }}>Key</span>
      </span>
    </NavLink>
  );

  /* ── Role-based desktop links ────────────────────────────────────────────── */
  const renderDesktopLinks = () => {
    if (!user) {
      return GUEST_LINKS.map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ));
    }
    if (role === "user") {
      return USER_LINKS.map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ));
    }
    if (role === "nominee") {
      return (
        <NomineeLinks
          verificationStatus={verificationStatus}
          onClick={closeMobile}
        />
      );
    }
    if (role === "admin") {
      return ADMIN_LINKS.map((link) => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ));
    }
    return null;
  };

  /* ── Role-based mobile links ─────────────────────────────────────────────── */
  const renderMobileLinks = () => {
    const linkStyle = {
      display: "block",
      padding: "11px 0",
      color: "var(--gray-700)",
      fontWeight: 500,
      fontSize: "0.95rem",
      borderBottom: "1px solid rgba(68,45,130,0.07)",
      cursor: "pointer",
      textDecoration: "none",
    };

    const items = [];

    if (!user) {
      GUEST_LINKS.forEach((l) =>
        items.push(
          <motion.div key={l.to} variants={linkItemVariants}>
            <NavLink to={l.to} onClick={closeMobile} style={linkStyle}>
              {l.label}
            </NavLink>
          </motion.div>
        )
      );
      items.push(
        <motion.div key="login" variants={linkItemVariants} style={{ paddingTop: 10 }}>
          <NavLink to="/login" onClick={closeMobile}>
            <button className="btn-ghost-lk" style={{ width: "100%", justifyContent: "center" }}>
              Login
            </button>
          </NavLink>
        </motion.div>
      );
      items.push(
        <motion.div key="register" variants={linkItemVariants} style={{ paddingTop: 8 }}>
          <NavLink to="/register" onClick={closeMobile}>
            <button className="btn-accent-lk" style={{ width: "100%", justifyContent: "center" }}>
              Get Started
            </button>
          </NavLink>
        </motion.div>
      );
    } else if (role === "user") {
      USER_LINKS.forEach((l) =>
        items.push(
          <motion.div key={l.to} variants={linkItemVariants}>
            <NavLink to={l.to} onClick={closeMobile} style={linkStyle}>
              {l.label}
            </NavLink>
          </motion.div>
        )
      );
    } else if (role === "nominee") {
      const nomLinks = [
        { label: "Upload Certificate", to: "/nominee/upload-death-certificate" },
        { label: "Verification Status", to: "/nominee/pending" },
        ...(verificationStatus === "approved"
          ? [{ label: "Access Vault", to: "/nominee/access" }]
          : []),
      ];
      nomLinks.forEach((l) =>
        items.push(
          <motion.div key={l.to} variants={linkItemVariants}>
            <NavLink to={l.to} onClick={closeMobile} style={linkStyle}>
              {l.label}
            </NavLink>
          </motion.div>
        )
      );
    } else if (role === "admin") {
      ADMIN_LINKS.forEach((l) =>
        items.push(
          <motion.div key={l.to} variants={linkItemVariants}>
            <NavLink to={l.to} onClick={closeMobile} style={linkStyle}>
              {l.label}
            </NavLink>
          </motion.div>
        )
      );
    }

    if (user) {
      items.push(
        <motion.div key="logout" variants={linkItemVariants} style={{ paddingTop: 10 }}>
          <button
            className="btn-primary-lk"
            onClick={() => { closeMobile(); handleLogout(); }}
            style={{ width: "100%", justifyContent: "center" }}
          >
            Logout
          </button>
        </motion.div>
      );
    }

    return items;
  };

  /* ── Guest CTA buttons (desktop) ─────────────────────────────────────────── */
  const GuestCTAs = (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <NavLink to="/login">
        <motion.button
          className="btn-ghost-lk"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Login
        </motion.button>
      </NavLink>
      <NavLink to="/register">
        <motion.button
          className="btn-accent-lk"
          whileHover={{ scale: 1.04, boxShadow: "0 6px 22px rgba(183,211,51,0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started
        </motion.button>
      </NavLink>
    </div>
  );

  /* ── Logout button (desktop) ─────────────────────────────────────────────── */
  const LogoutBtn = (
    <motion.button
      className="btn-primary-lk"
      onClick={handleLogout}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      Logout
    </motion.button>
  );

  /* ── User avatar chip ────────────────────────────────────────────────────── */
  const UserChip = user && (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(68,45,130,0.07)",
        borderRadius: "var(--radius-full)",
        padding: "5px 12px 5px 6px",
        marginRight: 4,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          fontWeight: 700,
          fontSize: "0.8rem",
        }}
      >
        {(user.name || user.email || "U")[0].toUpperCase()}
      </div>
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "var(--primary)",
          maxWidth: 100,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {user.name || user.email?.split("@")[0]}
      </span>
    </div>
  );

  /* ── Role badge ──────────────────────────────────────────────────────────── */
  const RoleBadge = role && (
    <span
      style={{
        fontSize: "0.68rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.8px",
        color: role === "admin" ? "#e04f5f" : role === "nominee" ? "#b7d333" : "var(--primary)",
        background:
          role === "admin"
            ? "rgba(224,79,95,0.1)"
            : role === "nominee"
            ? "rgba(183,211,51,0.15)"
            : "rgba(68,45,130,0.1)",
        borderRadius: "var(--radius-full)",
        padding: "3px 10px",
      }}
    >
      {role}
    </span>
  );

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <motion.nav
      ref={navRef}
      style={navStyle}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      aria-label="Main navigation"
    >
      {/* ── Desktop bar ────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {/* Logo */}
        {Logo}

        {/* Desktop links */}
        <motion.div
          className="desktop-nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            flex: 1,
            justifyContent: "center",
          }}
          variants={linkListVariants}
          initial="hidden"
          animate="visible"
        >
          {renderDesktopLinks()}
        </motion.div>

        {/* Right side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {user ? (
            <>
              {UserChip}
              {RoleBadge}
              {LogoutBtn}
            </>
          ) : (
            GuestCTAs
          )}

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="hamburger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "none",   // shown via CSS media query below
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{
              position: "absolute",
              top: "var(--navbar-h)",
              left: 0,
              right: 0,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(68,45,130,0.12)",
              boxShadow: "0 16px 40px rgba(68,45,130,0.14)",
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            <motion.div
              style={{ padding: "16px 24px 24px" }}
              variants={linkListVariants}
              initial="hidden"
              animate="visible"
            >
              {renderMobileLinks()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive CSS ───────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}