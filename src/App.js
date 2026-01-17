import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

/* ===== COMPONENTS ===== */
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Footer";

/* ===== PAGES ===== */
import Home from "./components/Home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JoinBatch from "./pages/Batch";
import JoinFamily from "./pages/JoinFamily";
import Login from "./components/Login";
import Register from "./components/Register";
import UserNotes from "./components/UserNotes";

/* ===== PUBLIC LAYOUT ===== */
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

/* ===== APP ===== */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="join-family" element={<JoinFamily />} />
          <Route path="batch" element={<JoinBatch />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user-notes" element={<UserNotes />} />
        </Route>

        {/* Optional: redirect unknown routes */}
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}
