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

/* ================= COMPONENT ================= */

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState("MAIN");
  const [activeCategory, setActiveCategory] = useState(null);

  /* ===== AUTH ===== */
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  /* ===== LOAD USER ===== */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  /* ===== ROUTE CHANGE RESET ===== */
  useEffect(() => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setMobileView("MAIN");
    setActiveCategory(null);
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

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase();

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="nav-container">

          {/* MOBILE TOGGLE */}
          <button className="hamburger" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <FaBars />
          </button>

          {/* LOGO */}
          <Link to="/" className="logo-wrap" aria-label="Homepage">
            <img src={logo} alt="The IT Wallah Logo" className="logo" />
          </Link>

          {/* DESKTOP ALL COURSES */}
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
                    {MENU[activeCategory ?? 0].items.map((it, i) => (
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
            <NavLink to="/user-notes">Study Notes</NavLink>
            <NavLink to="/batch">Batch</NavLink>
            <NavLink to="/project">Project</NavLink>
             <NavLink to="/junior">1<sup> th</sup> to 12<sup> th</sup> Class</NavLink>
          </div>

          {/* DESKTOP AUTH */}
          {!user ? (
            <Link to="/login" className="login-btn">
              Login / Register
            </Link>
          ) : (
            <div className="profile-wrap" ref={profileRef}>
              <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <span className="avatar">{userInitial}</span>
                <span className="username">{user.name}</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="profile-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Link to="/profile"><FaUserCircle /> Profile</Link>
                    <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
            <motion.aside className="mobile-drawer">

              {/* HEADER */}
              <div className="mobile-header">
                {mobileView !== "MAIN" ? (
                  <button className="back-btn" onClick={() => setMobileView("MAIN")}>
                    <FaArrowLeft />
                  </button>
                ) : (
                  <FaTimes onClick={() => setMobileOpen(false)} />
                )}
                <img src={logo} alt="logo" className="mobile-logo" />
              </div>

              {/* AUTH MOBILE */}
              {user ? (
                <div className="mobile-user">
                  <div className="mobile-avatar">{userInitial}</div>
                  <p>{user.name}</p>
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <FaUserCircle /> Profile
                  </Link>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="mobile-login" onClick={() => setMobileOpen(false)}>
                  Login / Register
                </Link>
              )}

              {/* MAIN MENU */}
              {mobileView === "MAIN" && (
                <ul className="mobile-main">
                  <li>
                    <button onClick={() => setMobileView("CATEGORY")} className="category-btn">
                      All Courses <FaAngleRight />
                    </button>
                  </li>
                  <li><Link to="/live-courses">Live Courses</Link></li>
                  <li><Link to="/batch">Batch</Link></li>
                  <li><Link to="/project">Project</Link></li>
                  <li><Link to="/user-notes">Study Notes</Link></li>
                  <li><Link to="/tiw-store">TIW Store</Link></li>
                  <li><Link to="/junior">1<sup>th</sup> to 12<sup>th</sup> Class</Link></li>
                </ul>
              )}

              {/* CATEGORY */}
              {mobileView === "CATEGORY" && (
                <ul className="mobile-category">
                  {MENU.map((m, i) => (
                    <li key={i} onClick={() => { setActiveCategory(i); setMobileView("ITEMS"); }}>
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
                    <Link key={i} to={it.path} onClick={() => setMobileOpen(false)}>
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