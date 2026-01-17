import React from "react";
import "./Stats.css";

// Material-UI Icons
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DescriptionIcon from "@mui/icons-material/Description";

// Stats Data
const statsData = [
  {
    count: "100+",
    text: "Happy Students",
    icon: <SchoolIcon fontSize="inherit" />,
  },
  {
    count: "24+",
    text: "Mock Tests",
    icon: <QuizIcon fontSize="inherit" />,
  },
  {
    count: "1+",
    text: "Video Lectures",
    icon: <VideoLibraryIcon fontSize="inherit" />,
  },
  {
    count: "80+",
    text: "Practice Papers",
    icon: <DescriptionIcon fontSize="inherit" />,
  },
];

export default function Stats() {
  return (
    <section className="stats-wrapper">
      {/* Page Heading */}
      <h1 className="page-title">A Platform Trusted by Students</h1>
      <p className="page-subtitle">
        The IT Wallah aims to transform not just through words, but provide results with numbers!
      </p>

      {/* Stats Cards */}
      <div className="stats-container">
        {statsData.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{item.icon}</div>
            <h2 className="stat-count">{item.count}</h2>
            <p className="stat-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
