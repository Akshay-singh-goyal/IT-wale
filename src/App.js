import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/* ===== LAYOUT ===== */
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Footer";

/* ===== PAGES ===== */
import Home from "./components/Home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JoinBatch from "./pages/JoinBatch";
import CourseDetail from "./pages/CourseDetail";
import JoinFamily from "./pages/JoinFamily";
import StudyResourcesPage from "./pages/StudyResourcesPage";

/* ===== ADMIN ===== */
import AdminDashboard from "./pages/Admin/AdminDashboard";

/* ===== DUMMY / CHANNEL ===== */
const ChannelPage = ({ name }) => (
  <div style={{ padding: 80, fontFamily: "Poppins" }}>
    <h1>{name}</h1>
    <p>YouTube channel details will load here.</p>
  </div>
);

const DummyPage = ({ title }) => (
  <div style={{ padding: 80, fontFamily: "Poppins" }}>
    <h1>{title}</h1>
    <p>Content will load dynamically from backend (MERN).</p>
  </div>
);

/* ===== PUBLIC LAYOUT ===== */
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

/* ===== ADMIN LAYOUT ===== */
const AdminLayout = () => <Outlet />;

/* ===== APP ===== */
export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/join-family" element={<JoinFamily />} />
            <Route path="/join-batch" element={<JoinBatch />} />
            <Route path="/live-courses" element={<CourseDetail />} />
            <Route path="/tiw-store" element={<CourseDetail />} />
            <Route path="/study-notes" element={<CourseDetail />} />
            <Route path="/project" element={<CourseDetail />} />

            {/* ===== CHANNELS ===== */}
            <Route path="/channels/the-it-wallah" element={<ChannelPage name="The IT Wallah" />} />
            <Route path="/channels/the-success-wallah" element={<ChannelPage name="Success Wallah" />} />
            <Route path="/channels/the-jee-wallah" element={<ChannelPage name="The JEE Wallah" />} />
            <Route path="/channels/the-ncert-wallah" element={<ChannelPage name="NCERT Wallah" />} />

            {/* ===== RESOURCES ===== */}
            <Route path="/resources" element={<StudyResourcesPage />} />
            <Route path="/resources/reference-books" element={<DummyPage title="Reference Books" />} />
            <Route path="/resources/ncert-solutions" element={<DummyPage title="NCERT Solutions" />} />
            <Route path="/resources/notes" element={<DummyPage title="Notes" />} />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ================= 404 ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </HelmetProvider>
  );
}
