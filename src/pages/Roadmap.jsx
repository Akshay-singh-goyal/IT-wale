// Roadmap.jsx
import React, { useState } from "react";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Code, Palette, FileCode, Atom, Server, Database, GitBranch, UploadCloud } from "lucide-react";
import "./roadmap.css";

export default function Roadmap({ onEnroll }) {
  const [openStepDialog, setOpenStepDialog] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeLangId, setActiveLangId] = useState(null);

  const roadmapSteps = [
    { label: "HTML5", icon: <Code size={20} />, color: "#E34F26", description: "Semantic HTML, forms" },
    { label: "CSS3", icon: <Palette size={20} />, color: "#264DE4", description: "Flexbox, Grid, responsive" },
    { label: "JavaScript", icon: <FileCode size={20} />, color: "#F0DB4F", description: "ES6+, DOM manipulation" },
    { label: "React", icon: <Atom size={20} />, color: "#61DAFB", description: "Hooks, state management, components" },
    { label: "Node.js", icon: <Server size={20} />, color: "#83CD29", description: "Backend runtime" },
    { label: "Express", icon: <Server size={20} />, color: "#000000", description: "Routing, middleware, APIs" },
    { label: "MongoDB", icon: <Database size={20} />, color: "#47A248", description: "NoSQL database, CRUD operations" },
    { label: "Git", icon: <GitBranch size={20} />, color: "#F05032", description: "Version control, branching" },
    { label: "Deploy", icon: <UploadCloud size={20} />, color: "#4A90E2", description: "Vercel, Netlify deployment" },
  ];

  const coords = [
    { left: "60px", top: "180px" }, { left: "200px", top: "120px" }, { left: "360px", top: "220px" },
    { left: "520px", top: "140px" }, { left: "700px", top: "80px" }, { left: "840px", top: "130px" },
    { left: "960px", top: "180px" }, { left: "1040px", top: "140px" }, { left: "1120px", top: "110px" },
  ];

  const languages = [
    { id: 1, title: "C Language", start: "15 Jan 2026", end: "15 Mar 2026", topics: ["Basics of C", "Loops & Conditions", "Pointers", "Memory Management", "Structures & Files"] },
    { id: 2, title: "C++ Language", start: "20 Jan 2026", end: "25 Mar 2026", topics: ["OOP Concepts", "Inheritance", "Polymorphism", "Templates", "STL"] },
    { id: 3, title: "Java Language", start: "10 Feb 2026", end: "10 Apr 2026", topics: ["Core Java", "Collections", "OOP & Interfaces", "JDBC", "Exceptions"] },
  ];

  const toggleLangPopup = (id) => setActiveLangId((prev) => (prev === id ? null : id));

  return (
    <Box sx={{ mt: 6 }}>
      {/* MERN Roadmap */}
      <Typography variant="h6" sx={{ mb: 2 }}>MERN Stack Learning Roadmap</Typography>
      <div className="svg-roadmap-wrapper">
        <svg viewBox="0 0 1200 260" className="svg-roadmap">
          <path
            d="M 60 200 C 200 120, 350 260, 480 160 S 760 40, 920 120 S 1120 200, 1160 110"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
        <div className="svg-steps">
          {roadmapSteps.map((step, i) => (
            <motion.div
              key={step.label}
              className="svg-step-node"
              style={{ ...coords[i], borderColor: step.color }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setSelectedStep(step);
                setOpenStepDialog(true);
              }}
            >
              <div className="node-icon" style={{ color: step.color }}>{step.icon}</div>
              <div className="node-label">{step.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MERN Step Dialog */}
      <Dialog open={openStepDialog} onClose={() => setOpenStepDialog(false)}>
        <DialogTitle>{selectedStep?.label}</DialogTitle>
        <DialogContent>
          <Typography>{selectedStep?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStepDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Language Batches */}
      <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>Language Batches</Typography>
      <div className="language-grid">
        {languages.map((lang) => (
          <div key={lang.id} className="lang-card">
            <div className="lang-btn" onClick={() => toggleLangPopup(lang.id)}>{lang.title}</div>
            {activeLangId === lang.id && (
              <div className="cloud-popup">
                <div className="cloud-head">
                  <h3>{lang.title}</h3>
                  <div className="date-range">
                    <small><strong>Start:</strong> {lang.start}</small>
                    <small style={{ marginLeft: 8 }}><strong>End:</strong> {lang.end}</small>
                  </div>
                </div>
                <ul>{lang.topics.map((t, i) => <li key={i}>{t}</li>)}</ul>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="enroll-btn" onClick={() => onEnroll(lang)}>Enroll Now</button>
                  <button className="close-cloud" onClick={() => setActiveLangId(null)}>Close</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Box>
  );
}
