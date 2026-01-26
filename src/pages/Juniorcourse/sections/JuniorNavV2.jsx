import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../Images/logo.png";
import "./JuniorNav.css";

/* ================= MENU DATA ================= */

const MENU_MAIN = [
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
      { name: "Foundation (6-10)", path: "/foundation" },
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

const MENU_JUNIOR = [
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

export default function Navbar({ juniorMode = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState("MAIN");
  const [activeMenu, setActiveMenu] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const [user, setUser] = useState(null);

  const MENU = juniorMode ? MENU_JUNIOR : MENU_MAIN;

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setMobileStep("MAIN");
    setProfileOpen(false);
  }, [location.pathname]);

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
      {/* ================= NAVBAR / HEADER ================= */}
      <header className={juniorMode ? "jnv-header" : "navbar"}>
        <div className={juniorMode ? "jnv-wrapper" : "nav-container"}>
          {/* MOBILE HAMBURGER */}
          <button
            className={juniorMode ? "jnv-hamburger" : "hamburger"}
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>

          {/* LOGO */}
          <Link to="/" className={juniorMode ? "jnv-logo-wrap" : "logo-wrap"}>
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          {/* DESKTOP COURSES */}
          <div
            className={juniorMode ? "jnv-course-trigger" : "all-btn"}
            onMouseEnter={() => setDesktopOpen(true)}
            onMouseLeave={() => setDesktopOpen(false)}
          >
            {juniorMode ? "Explore Courses 🎒" : "All Courses ▾"}

            <AnimatePresence>
              {desktopOpen && (
                <motion.div
                  className={juniorMode ? "jnv-mega-menu" : "dropdown"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <div className={juniorMode ? "jnv-menu-left" : "left"}>
                    {MENU.map((m, i) => (
                      <div
                        key={i}
                        className={juniorMode ? "jnv-category" : "left-item"}
                        onMouseEnter={() => setActiveMenu(i)}
                      >
                        <span>
                          {m.icon} {m.title}
                        </span>
                        <FaAngleRight />
                      </div>
                    ))}
                  </div>

                  <div className={juniorMode ? "jnv-menu-right" : "right"}>
                    {MENU[activeMenu].items.map((it, i) => (
                      <Link
                        key={i}
                        to={it.path}
                        className={juniorMode ? "jnv-course-card" : "card"}
                      >
                        {it.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESKTOP LINKS */}
          {!juniorMode && (
            <div className="menu">
              <NavLink to="/live-courses">Live Courses</NavLink>
              <NavLink to="/tiw-store">TIW Store</NavLink>
              <NavLink to="/user-notes">Study Notes</NavLink>
              <NavLink to="/batch">Batch</NavLink>
              <NavLink to="/project">Project</NavLink>
              <NavLink to="/junior">
                1<sup>th</sup> to 12<sup>th</sup> Class
              </NavLink>
            </div>
          )}
          {juniorMode && (
            <nav className="jnv-links">
              <NavLink to="/live-courses">Live 🎥</NavLink>
              <NavLink to="/junior">Projects 🚀</NavLink>
              <NavLink to="/study-notes">Notes 📘</NavLink>
              <NavLink to="/tiw-store">Store 🛒</NavLink>
            </nav>
          )}

          {/* AUTH */}
          {!user ? (
            <Link
              to="/login"
              className={juniorMode ? "jnv-login-btn" : "login-btn"}
            >
              {juniorMode ? "Parent Login" : "Login / Register"}
            </Link>
          ) : (
            <div
              className={juniorMode ? "jnv-profile" : "profile-wrap"}
              ref={profileRef}
            >
              <button
                className={juniorMode ? "" : "profile-btn"}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span className={juniorMode ? "jnv-avatar" : "avatar"}>
                  {avatarLetter}
                </span>
                <span className="username">{user.name}</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className={juniorMode ? "jnv-profile-menu" : "profile-dropdown"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Link to="/profile">
                      <FaUserCircle /> Profile
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

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={juniorMode ? "jnv-mobile-backdrop" : "mobile-overlay"}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className={juniorMode ? "jnv-mobile-panel" : "mobile-drawer"}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              {/* MOBILE HEADER */}
              <div className={juniorMode ? "jnv-mobile-top" : "mobile-header"}>
                {mobileStep !== "MAIN" ? (
                  <button onClick={() => setMobileStep("MAIN")}>
                    <FaArrowLeft />
                  </button>
                ) : (
                  <FaTimes onClick={() => setMobileOpen(false)} />
                )}
                <img src={logo} alt="logo" className="logo" />
              </div>

              {/* MOBILE AUTH */}
              {user ? (
                <div className={juniorMode ? "mobile-user" : "jnv-mobile-user"}>
                  <div className={juniorMode ? "mobile-avatar" : "jnv-avatar"}>
                    {avatarLetter}
                  </div>
                  <p>{user.name}</p>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaUserCircle /> Profile
                  </Link>
                  <button onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={juniorMode ? "mobile-login" : "jnv-login-btn"}
                  onClick={() => setMobileOpen(false)}
                >
                  {juniorMode ? "Parent Login" : "Login / Register"}
                </Link>
              )}

              {/* MOBILE MENU */}
              {mobileStep === "MAIN" && (
                <ul className={juniorMode ? "jnv-mobile-main" : "mobile-main"}>
                  <li onClick={() => setMobileStep("CATS")}>
                    {juniorMode ? "Explore Courses" : "All Courses"} <FaAngleRight />
                  </li>
                  {!juniorMode && (
                    <>
                      <li>
                        <Link to="/live-courses">Live Courses</Link>
                      </li>
                      <li>
                        <Link to="/batch">Batch</Link>
                      </li>
                      <li>
                        <Link to="/project">Project</Link>
                      </li>
                      <li>
                        <Link to="/user-notes">Study Notes</Link>
                      </li>
                      <li>
                        <Link to="/tiw-store">TIW Store</Link>
                      </li>
                      <li>
                        <Link to="/junior">1th to 12th Class</Link>
                      </li>
                    </>
                  )}
                  {juniorMode && (
                    <>
                      <li>
                        <Link to="/live-courses">Live</Link>
                      </li>
                      <li>
                        <Link to="/junior">Projects</Link>
                      </li>
                      <li>
                        <Link to="/study-notes">Notes</Link>
                      </li>
                      <li>
                        <Link to="/tiw-store">Store</Link>
                      </li>
                    </>
                  )}
                </ul>
              )}

              {/* CATEGORY */}
              {mobileStep === "CATS" && (
                <ul className={juniorMode ? "jnv-mobile-cats" : "mobile-category"}>
                  {MENU.map((m, i) => (
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

              {/* ITEMS */}
              {mobileStep === "ITEMS" && (
                <div className={juniorMode ? "jnv-mobile-items" : "mobile-items"}>
                  {MENU[activeMenu].items.map((it, i) => (
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
