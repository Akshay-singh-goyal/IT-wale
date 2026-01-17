import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./CoursesCategoriesPage.css";

/* ================= CATEGORY DATA ================= */

const categories = [
  {
    title: "NEET",
    subtitle: ["Class 11", "Class 12", "Dropper"],
    route: "/courses/neet",
    icon: "🩺",
    bg: "neet",
  },
  {
    title: "IIT JEE",
    subtitle: ["Class 11", "Class 12", "Dropper"],
    route: "/courses/iit-jee",
    icon: "⚛️",
    bg: "jee",
  },
  {
    title: "Pre Foundation",
    subtitle: [],
    route: "/courses/pre-foundation",
    icon: "🎒",
    bg: "foundation",
  },
  {
    title: "School Boards",
    subtitle: ["CBSE", "ICSE", "UP Board", "MH Board"],
    route: "/courses/boards",
    icon: "🏫",
    bg: "boards",
  },
  {
    title: "UPSC",
    subtitle: [],
    route: "/courses/upsc",
    icon: "🧑‍⚖️",
    bg: "upsc",
  },
  {
    title: "Govt Job Exams",
    subtitle: ["SSC", "Banking", "Teaching", "Judiciary"],
    route: "/courses/govt-exams",
    icon: "🏛️",
    bg: "govt",
  },
];

export default function CoursesCategoriesPage() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [stats, setStats] = useState(null);

  /* ===== Dynamic stats (MongoDB ready) ===== */
  useEffect(() => {
    // Example API (replace later)
    setStats({
      students: "100+",
      courses: "10+",
      instructors: "1+",
    });
  }, []);

  return (
    <section className="categories-wrapper">
      {/* ================= HERO ================= */}
      <motion.div
        className="hero"
        initial={!reducedMotion ? { opacity: 0, y: 25 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Explore Our Top Categories</h1>
        <p className="page-subtitle">
          Learn from India’s most trusted educators — anytime, anywhere.
        </p>

        {stats && (
          <div className="stats">
            <div>
              <strong>{stats.students}</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>{stats.courses}</strong>
              <span>Courses</span>
            </div>
            <div>
              <strong>{stats.instructors}</strong>
              <span>Educators</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* ================= GRID ================= */}
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className={`category-card ${cat.bg}`}
            onClick={() => navigate(cat.route)}
            initial={!reducedMotion ? { opacity: 0, y: 30 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="card-left">
              <h2>{cat.title}</h2>

              {cat.subtitle.length > 0 && (
                <div className="tags">
                  {cat.subtitle.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              )}

              <div className="explore">
                Explore Category <span>→</span>
              </div>
            </div>

            <div className="card-icon">{cat.icon}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
