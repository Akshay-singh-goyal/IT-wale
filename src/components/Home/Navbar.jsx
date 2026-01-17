import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaBook,
  FaUniversity,
  FaSchool,
  FaBalanceScale,
  FaGraduationCap,
  FaChartLine,
  FaAngleRight,
  FaBars,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../Images/logo.png";
import "./Navbar.css";

/* ================= MENU DATA ================= */

const MENU = [
  {
    title: "Competitive Exams",
    icon: <FaBook />,
    items: [
      { name: "IIT JEE", path: "/courses/iit-jee" },
      { name: "NEET", path: "/courses/neet" },
      { name: "GATE", path: "/courses/gate" },
      { name: "ESE", path: "/courses/ese" },
      { name: "Olympiad", path: "/courses/olympiad" },
    ],
  },
  {
    title: "Only IAS",
    icon: <FaUniversity />,
    items: [
      { name: "UPSC", path: "/courses/upsc" },
      { name: "State PSC", path: "/courses/state-psc" },
    ],
  },
  {
    title: "School Preparation",
    icon: <FaSchool />,
    items: [
      { name: "Foundation (6-10)", path: "/courses/foundation" },
      { name: "CuriousJr (3-8)", path: "/courses/curious-jr" },
    ],
  },
  {
    title: "Govt Exams",
    icon: <FaBalanceScale />,
    items: [
      { name: "SSC", path: "/courses/ssc" },
      { name: "Banking", path: "/courses/banking" },
      { name: "Railway", path: "/courses/railway" },
    ],
  },
  {
    title: "UG & PG Entrance",
    icon: <FaGraduationCap />,
    items: [
      { name: "CUET", path: "/courses/cuet" },
      { name: "CLAT", path: "/courses/clat" },
    ],
  },
  {
    title: "Finance",
    icon: <FaChartLine />,
    items: [
      { name: "CA", path: "/courses/ca" },
      { name: "CS", path: "/courses/cs" },
    ],
  },
];

/* ================= COMPONENT ================= */

export default function Navbar() {
  const location = useLocation();

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // mobile states
  const [mobileView, setMobileView] = useState("MAIN"); 
  // MAIN | CATEGORY | ITEMS
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setMobileView("MAIN");
    setActiveCategory(null);
  }, [location.pathname]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-container">

          {/* MOBILE LEFT */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>

          {/* LOGO */}
          <Link to="/" className="logo-wrap">
            <img src={logo} alt="The IT Wallah" className="logo" />
          </Link>

          {/* DESKTOP COURSES */}
          <div
            className="all-btn"
            onMouseEnter={() => setDesktopOpen(true)}
            onMouseLeave={() => setDesktopOpen(false)}
          >
            All Courses ▾
            <AnimatePresence>
              {desktopOpen && (
                <motion.div
                  className="dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="left">
                    {MENU.map((m, i) => (
                      <div
                        key={i}
                        className="left-item"
                        onMouseEnter={() => setActiveCategory(i)}
                      >
                        <span>{m.icon} {m.title}</span>
                        <FaAngleRight />
                      </div>
                    ))}
                  </div>

                  <div className="right">
                    {(MENU[activeCategory ?? 0].items).map((it, i) => (
                      <Link key={i} to={it.path} className="card">
                        {it.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESKTOP LINKS */}
          <div className="menu">
            <NavLink to="/live-courses">Live Courses</NavLink>
            <NavLink to="/tiw-store">TIW Store</NavLink>
            <NavLink to="/study-notes">Study Notes</NavLink>
            <NavLink to="/join-batch">Batch</NavLink>
            <NavLink to="/project">Project</NavLink>
          </div>

          {/* LOGIN */}
          <Link to="/login" className="login-btn">
            Login / Register
          </Link>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              {/* HEADER */}
              <div className="mobile-header">
                {mobileView !== "MAIN" ? (
                  <button
                    className="back-btn"
                    onClick={() => {
                      if (mobileView === "ITEMS") setMobileView("CATEGORY");
                      else setMobileView("MAIN");
                    }}
                  >
                    <FaArrowLeft />
                  </button>
                ) : (
                  <FaTimes onClick={() => setMobileOpen(false)} />
                )}

                <img src={logo} alt="logo" className="mobile-logo" />
              </div>

              {/* MAIN MENU */}
              {mobileView === "MAIN" && (
                <ul className="mobile-main">
                  <li onClick={() => setMobileView("CATEGORY")}>
                    All Courses <FaAngleRight />
                  </li>
                  <li><Link to="/live-courses">Live Courses</Link></li>
                  <li><Link to="/join-batch">Batch</Link></li>
                  <li><Link to="/project">Project</Link></li>
                  <li><Link to="/study-notes">Study Notes</Link></li>
                  <li><Link to="/tiw-store">TIW Store</Link></li>
                </ul>
              )}

              {/* CATEGORY */}
              {mobileView === "CATEGORY" && (
                <ul className="mobile-category">
                  {MENU.map((m, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setActiveCategory(i);
                        setMobileView("ITEMS");
                      }}
                    >
                      <span>{m.icon} {m.title}</span>
                      <FaAngleRight />
                    </li>
                  ))}
                </ul>
              )}

              {/* ITEMS */}
              {mobileView === "ITEMS" && (
                <div className="mobile-items">
                  {MENU[activeCategory].items.map((it, i) => (
                    <Link
                      key={i}
                      to={it.path}
                      onClick={() => setMobileOpen(false)}
                    >
                      {it.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/login" className="mobile-login">
                Login / Register
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
