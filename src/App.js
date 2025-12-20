import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import JoinBatch from "./pages/JoinBatch";
import Contact from "./pages/Contact";
import About from "./pages/About";

import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/join-batch" element={<JoinBatch />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
