import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./StudyResources.css";

/* ================= DATA ================= */

const resources = [
  {
    title: "Reference Books",
    desc:
      "Our experts have created thorough study materials that break down complicated concepts into easily understandable content.",
    route: "/resources/reference-books",
    bg: "blue",
    image: "/images/books.png",
  },
  {
    title: "NCERT Solutions",
    desc:
      "Unlock academic excellence with step-by-step NCERT Solutions designed by expert educators.",
    route: "/resources/ncert-solutions",
    bg: "yellow",
    image: "/images/ncert.png",
  },
  {
    title: "Notes",
    desc:
      "Detailed study notes that simplify complex ideas into easy-to-understand language.",
    route: "/resources/notes",
    bg: "green",
    image: "/images/notes.png",
  },
];

export default function StudyResourcesPage() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [stats, setStats] = useState(null);

  /* ===== Dynamic Stats (MongoDB ready) ===== */
  useEffect(() => {
    // Replace with API later
    setStats({
      resources: "5+",
      subjects: "120+",
      downloads: "100+",
    });
  }, []);

  return (
    <section className="resources-wrapper">
      {/* ================= HERO ================= */}
      <motion.div
        className="resources-hero"
        initial={!reducedMotion ? { opacity: 0, y: 25 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Study Resources</h1>
        <p className="subtitle">
          A diverse array of learning materials to enhance your educational
          journey.
        </p>

        {stats && (
          <div className="resource-stats">
            <div>
              <strong>{stats.resources}</strong>
              <span>Resources</span>
            </div>
            <div>
              <strong>{stats.subjects}</strong>
              <span>Subjects</span>
            </div>
            <div>
              <strong>{stats.downloads}</strong>
              <span>Downloads</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* ================= GRID ================= */}
      <div className="resources-grid">
        {resources.map((item, index) => (
          <motion.div
            key={index}
            className={`resource-card ${item.bg}`}
            onClick={() => navigate(item.route)}
            initial={!reducedMotion ? { opacity: 0, y: 30 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <div className="card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>

              <button className="explore-btn">
                Explore <span>→</span>
              </button>
            </div>

            <div className="card-image">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width="140"
                height="140"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
