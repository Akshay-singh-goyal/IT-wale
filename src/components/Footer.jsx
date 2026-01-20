import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

import API from "../api";
import logo from "../Images/logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setStatus("Please enter a valid email ❌");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/newsletter", { email });

      if (res.data?.success) {
        setStatus("Subscribed successfully 🎉");
        setEmail("");
      }
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
          "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 4000);
    }
  };

  const companyLinks = [
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Careers", path: "/careers" },
    { label: "Updates", path: "/updates" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-conditions" },
    { label: "Disclamer", path: "/disclaimer" },
    { label: "Refund Policy", path: "/refundPolicy" },


  ];

  const quickLinks = [
    { label: "MERN Stack", path: "/mern-stack" },
    { label: "DSA", path: "/dsa" },
    { label: "Frontend", path: "/frontend" },
    { label: "Backend", path: "/backend" },
    { label: "AI Tools", path: "/ai-tools" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #eee",
      }}
    >
      {/* MAIN CONTENT */}
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          px: { xs: 2, md: 0 },
          py: 6,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2.2fr 1fr 1fr 1.4fr",
          },
          gap: 4,
        }}
      >
        {/* BRAND SECTION */}
        <Box>
          <img src={logo} alt="The IT Wallah Logo" width="150" />

          <Typography
            sx={{
              fontSize: 14,
              color: "#444",
              mt: 2,
              lineHeight: 1.6,
            }}
          >
            We help learners build real-world IT skills with clarity, confidence,
            and practical learning.
          </Typography>

          <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
            <IconButton
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{ color: "#4267B2" }}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{ color: "#E1306C" }}
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: "#0A66C2" }}
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              sx={{ color: "#FF0000" }}
            >
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>

        {/* COMPANY LINKS */}
        <Box>
          <Typography fontWeight={700} mb={2}>
            Company
          </Typography>

          {companyLinks.map((item) => (
            <Typography key={item.label} mb={1} fontSize={14}>
              <Link
                component={RouterLink}
                to={item.path}
                underline="none"
                sx={{
                  color: "#555",
                  "&:hover": { color: "#000" },
                }}
              >
                {item.label}
              </Link>
            </Typography>
          ))}
        </Box>

        {/* QUICK LINKS */}
        <Box>
          <Typography fontWeight={700} mb={2}>
            Quick Links
          </Typography>

          {quickLinks.map((item) => (
            <Typography key={item.label} mb={1} fontSize={14}>
              <Link
                component={RouterLink}
                to={item.path}
                underline="none"
                sx={{
                  color: "#555",
                  "&:hover": { color: "#000" },
                }}
              >
                {item.label}
              </Link>
            </Typography>
          ))}

        </Box>

        {/* NEWSLETTER */}
        <Box>
          <Typography fontWeight={700} mb={1}>
            Newsletter
          </Typography>

          <Typography fontSize={14} color="#555" mb={2}>
            Get the latest IT course updates.
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            fullWidth
            sx={{
              mt: 1.5,
              backgroundColor: "#5a4bff",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#4a3ee6" },
            }}
            onClick={handleSubscribe}
            disabled={loading}
            endIcon={<EmailIcon />}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>

          {status && (
            <Typography
              fontSize={13}
              mt={1}
              color={status.includes("❌") ? "red" : "green"}
            >
              {status}
            </Typography>
          )}
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Box sx={{ borderTop: "1px solid #eee", py: 2 }}>
        <Typography textAlign="center" fontSize={13} color="#777">
          © {new Date().getFullYear()} The IT Wallah. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
