import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Home/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JoinBatch from "./pages/Batch";
import JoinFamily from "./pages/JoinFamily";
import Login from "./components/Login";
import Register from "./components/Register";
import UserNotes from "./components/UserNotes";


const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
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

        {/* TEMPORARILY REMOVE THIS */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}
