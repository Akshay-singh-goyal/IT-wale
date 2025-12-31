import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/* ===== LAYOUT COMPONENTS ===== */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ===== PAGES ===== */
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JoinBatch from "./pages/JoinBatch";
import CourseDetail from "./pages/CourseDetail";
import AdminDashboard from "./pages/AdminDashboard";

/* ===== AUTH COMPONENTS ===== */
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/join-batch" element={<JoinBatch />} />
          <Route path="/books" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>

        <Footer />
      </Router>
    </HelmetProvider>
  );
}
