import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";

import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Storage from "./pages/Storage";
import Security from "./pages/Security";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserHome from "./pages/UserHome";
import AddData from "./pages/AddData";
import SelectNominee from "./pages/SelectNominee";
import ViewData from "./pages/ViewData";
import ViewNominees from "./pages/ViewNominees";

import NomineeLogin from "./pages/nominee/NomineeLogin";
import UploadDeathCertificate from "./pages/nominee/UploadDeathCertificate";
import VerificationPending from "./pages/nominee/VerificationPending";
import NomineeAccess from "./pages/nominee/NomineeAccess";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

/* ─── Page transition wrapper ─────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" } },
};

function PageTransition({ children }) {
  return (
    <motion.div
      className="page-transition"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

/* ─── Inner app — needs useLocation inside BrowserRouter ─────────────────── */
function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      {/* Toast notifications */}
      <ToastProvider />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>

          {/* ── PUBLIC ──────────────────────────────────────────────────── */}
          <Route path="/"         element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about"    element={<PageTransition><About /></PageTransition>} />
          <Route path="/how"      element={<PageTransition><HowItWorks /></PageTransition>} />
          <Route path="/storage"  element={<PageTransition><Storage /></PageTransition>} />
          <Route path="/security" element={<PageTransition><Security /></PageTransition>} />
          <Route path="/contact"  element={<PageTransition><Contact /></PageTransition>} />

          <Route path="/login"    element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

          {/* ── USER (protected) ────────────────────────────────────────── */}
          <Route
            path="/user/home"
            element={
              <ProtectedRoute roleRequired="user">
                <PageTransition><UserHome /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/add-data"
            element={
              <ProtectedRoute roleRequired="user">
                <PageTransition><AddData /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/select-nominee"
            element={
              <ProtectedRoute roleRequired="user">
                <PageTransition><SelectNominee /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/view-data"
            element={
              <ProtectedRoute roleRequired="user">
                <PageTransition><ViewData /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/nominees"
            element={
              <ProtectedRoute roleRequired="user">
                <PageTransition><ViewNominees /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* ── NOMINEE ─────────────────────────────────────────────────── */}
          <Route path="/nominee/login" element={<PageTransition><NomineeLogin /></PageTransition>} />
          <Route
            path="/nominee/upload-death-certificate"
            element={
              <ProtectedRoute roleRequired="nominee">
                <PageTransition><UploadDeathCertificate /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nominee/pending"
            element={
              <ProtectedRoute roleRequired="nominee">
                <PageTransition><VerificationPending /></PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nominee/access"
            element={
              <ProtectedRoute roleRequired="nominee">
                <PageTransition><NomineeAccess /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* ── ADMIN ───────────────────────────────────────────────────── */}
          <Route path="/admin/login"     element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roleRequired="admin">
                <PageTransition><AdminDashboard /></PageTransition>
              </ProtectedRoute>
            }
          />
          {/* Admin verification requests — add the page component when ready */}
          <Route
            path="/admin/verification"
            element={
              <ProtectedRoute roleRequired="admin">
                <PageTransition><AdminDashboard /></PageTransition>
              </ProtectedRoute>
            }
          />

        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

/* ─── Root App ────────────────────────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
