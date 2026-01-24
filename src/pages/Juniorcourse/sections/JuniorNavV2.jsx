import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaChartLine,
  FaAngleRight,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../../Images/logo.jpeg";
import "./JuniorNav.css";

/* ================= MENU DATA ================= */

const NAV_MENU = [
  {
    title: "Smart Learning",
    icon: <FaBook />,
    items: [
      { name: "Math Magic", path: "/courses/math-magic" },
      { name: "Science Fun", path: "/courses/science-fun" },
      { name: "Olympiad Prep", path: "/courses/olympiad" },
    ],
  },
  {
    title: "Young Explorers",
    icon: <FaSchool />,
    items: [
      { name: "Foundation (Class 6–10)", path: "/foundation" },
      { name: "Junior-G (Class 3–8)", path: "/courses/junior-g" },
    ],
  },
  {
    title: "Future Champs",
    icon: <FaGraduationCap />,
    items: [
      { name: "Junior Coding", path: "/courses/coding-jr" },
      { name: "Logical Thinking", path: "/courses/logic" },
    ],
  },
  {
    title: "Competitive Dreams",
    icon: <FaUniversity />,
    items: [
      { name: "IIT-JEE", path: "/courses/iit-jee" },
      { name: "NEET", path: "/courses/neet" },
    ],
  },
  {
    title: "Finance Basics",
    icon: <FaChartLine />,
    items: [{ name: "Money Sense", path: "/courses/money" }],
  },
];

/* ================= COMPONENT ================= */

export default function JuniorNavV2() {
  const location = useLocation();
  const navigate = useNavigate();

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState("MAIN");
  const [activeMenu, setActiveMenu] = useState(0);

  /* ===== USER ===== */
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  /* ===== LOAD USER ===== */
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  /* ===== RESET ON ROUTE CHANGE ===== */
  useEffect(() => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setMobileStep("MAIN");
    setProfileOpen(false);
  }, [location.pathname]);

  /* ===== OUTSIDE CLICK ===== */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const avatarLetter = user?.name?.[0]?.toUpperCase();

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="jnv-header">
        <div className="jnv-wrapper">

          {/* MOBILE ICON */}
          <button
            className="jnv-hamburger"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>

         
      {/* Mascot */}
      <div className="cj-mascot">
        <div className="cj-hair"></div>
        <div className="cj-face">
          <span className="eye left"></span>
          <span className="eye right"></span>
          <span className="smile"></span>
        </div>
      </div>

      {/* Text */}
      <div className="cj-text">
        <div className="cj-title">
          Junior<span>-G</span>
        </div>
        <div className="cj-sub">
          Powered by <b>TIW</b>
        </div>
      </div>

          {/* COURSES */}
          <div
            className="jnv-course-trigger"
            onMouseEnter={() => setDesktopOpen(true)}
            onMouseLeave={() => setDesktopOpen(false)}
          >
            Explore Courses 🎒

            <AnimatePresence>
              {desktopOpen && (
                <motion.div
                  className="jnv-mega-menu"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <div className="jnv-menu-left">
                    {NAV_MENU.map((m, i) => (
                      <div
                        key={i}
                        className="jnv-category"
                        onMouseEnter={() => setActiveMenu(i)}
                      >
                        <span>{m.icon} {m.title}</span>
                        <FaAngleRight />
                      </div>
                    ))}
                  </div>

                  <div className="jnv-menu-right">
                    {NAV_MENU[activeMenu].items.map((it, i) => (
                      <Link
                        key={i}
                        to={it.path}
                        className="jnv-course-card"
                      >
                        {it.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LINKS */}
          <nav className="jnv-links">
            <NavLink to="/live-courses">Live 🎥</NavLink>
            <NavLink to="/junior">Projects 🚀</NavLink>
            <NavLink to="/study-notes">Notes 📘</NavLink>
            <NavLink to="/tiw-store">Store 🛒</NavLink>
          </nav>

          {/* AUTH */}
          {!user ? (
            <Link to="/login" className="jnv-login-btn">
              Parent Login
            </Link>
          ) : (
            <div className="jnv-profile" ref={profileRef}>
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <span className="jnv-avatar">{avatarLetter}</span>
                <span>{user.name}</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="jnv-profile-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Link to="/profile">
                      <FaUserCircle /> My Profile
                    </Link>
                    <button onClick={logout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="jnv-mobile-backdrop"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              className="jnv-mobile-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              <div className="jnv-mobile-top">
                {mobileStep !== "MAIN" ? (
                  <FaArrowLeft onClick={() => setMobileStep("MAIN")} />
                ) : (
                  <FaTimes onClick={() => setMobileOpen(false)} />
                )}
                <img src={logo} alt="logo" />
              </div>

              {mobileStep === "MAIN" && (
                <ul>
                  <li onClick={() => setMobileStep("CATS")}>
                    Explore Courses <FaAngleRight />
                  </li>
                  <li><Link to="/live-courses">Live</Link></li>
                  <li><Link to="/junior">Projects</Link></li>
                  <li><Link to="/study-notes">Notes</Link></li>
                </ul>
              )}

              {mobileStep === "CATS" && (
                <ul>
                  {NAV_MENU.map((m, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setActiveMenu(i);
                        setMobileStep("ITEMS");
                      }}
                    >
                      {m.icon} {m.title} <FaAngleRight />
                    </li>
                  ))}
                </ul>
              )}

              {mobileStep === "ITEMS" && (
                <div className="jnv-mobile-items">
                  {NAV_MENU[activeMenu].items.map((it, i) => (
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
