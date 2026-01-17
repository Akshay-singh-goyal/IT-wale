import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaGoogle
} from "react-icons/fa";
import "./JoinFamily.css";

const channels = [
  {
    title: "Physics Wallah",
    subs: "10M+ Subscribers",
    route: "/channels/physics-wallah",
    icon: <FaYoutube />,
    type: "youtube",
  },
  {
    title: "Competition Wallah",
    subs: "2.71M Followers",
    route: "/channels/competition-wallah",
    icon: <FaInstagram />,
    type: "instagram",
  },
  {
    title: "JEE Wallah",
    subs: "1.69M Followers",
    route: "/channels/jee-wallah",
    icon: <FaLinkedin />,
    type: "linkedin",
  },
  {
    title: "NCERT Wallah",
    subs: "1.35M Reviews",
    route: "/channels/ncert-wallah",
    icon: <FaGoogle />,
    type: "google",
  },
];

export default function JoinFamily() {
  const navigate = useNavigate();

  return (
    <section className="join-family">
      <h2>Join The IT Wallah Family, Today!</h2>
      <p>
        Explore our 130+ learning communities across social platforms and grow
        with us for free.
      </p>

      <div className="slider-wrapper">
        <div className="slider-track">
          {[...channels, ...channels].map((item, index) => (
            <div
              key={index}
              className={`channel-card ${item.type}`}
              onClick={() => navigate(item.route)}
            >
              <div className="social-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <span>{item.subs}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="cta-btn">Get Started</button>
    </section>
  );
}
