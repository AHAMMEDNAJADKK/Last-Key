import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./layouts/DashboardLayout";

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

import NomineeLogin from "./pages/nominee/NomineeLogin";
import UploadDeathCertificate from "./pages/nominee/UploadDeathCertificate";
import VerificationPending from "./pages/nominee/VerificationPending";
import NomineeAccess from "./pages/nominee/NomineeAccess";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/user" element={<DashboardLayout />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/security" element={<Security />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PROTECTED */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute roleRequired="user">
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/add-data"
          element={
            <ProtectedRoute roleRequired="user">
              <AddData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/select-nominee"
          element={
            <ProtectedRoute roleRequired="user">
              <SelectNominee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/view-data"
          element={
            <ProtectedRoute roleRequired="user">
              <ViewData />
            </ProtectedRoute>
          }
        />

        {/* NOMINEE */}
        <Route path="/nominee/login" element={<NomineeLogin />} />

        <Route
          path="/nominee/upload-death-certificate"
          element={
            <ProtectedRoute roleRequired="nominee">
              <UploadDeathCertificate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nominee/pending"
          element={
            <ProtectedRoute roleRequired="nominee">
              <VerificationPending />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nominee/access"
          element={
            <ProtectedRoute roleRequired="nominee">
              <NomineeAccess />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
