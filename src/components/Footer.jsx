import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Link
} from "@mui/material";

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

      if (res.data.success) {
        setStatus("Subscribed successfully 🎉");
        setEmail("");
      }
    } catch (error) {
      setStatus(
        error.response?.data?.message || "Server error. Try again later."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fff", borderTop: "1px solid #eee" }}>
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          px: { xs: 2, md: 0 },
          py: 6,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2.2fr 1fr 1fr 1.4fr"
          },
          gap: 4
        }}
      >
        {/* BRAND */}
        <Box>
          <img src={logo} alt="The IT Wallah" width="150" />

          <Typography sx={{ fontSize: 14, color: "#444", mt: 2 }}>
            We help learners build real-world IT skills with clarity,
            confidence, and practical learning.
          </Typography>

          <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
            <IconButton><FacebookIcon /></IconButton>
            <IconButton><InstagramIcon /></IconButton>
            <IconButton><LinkedInIcon /></IconButton>
            <IconButton><YouTubeIcon /></IconButton>
          </Box>
        </Box>

        {/* COMPANY */}
        <Box>
          <Typography fontWeight={700} mb={2}>Company</Typography>
          {["About Us", "Contact Us", "Careers", "Updates"].map((item) => (
            <Typography key={item} mb={1}>
              <Link underline="none" sx={{ color: "#555" }}>
                {item}
              </Link>
            </Typography>
          ))}
        </Box>

        {/* QUICK LINKS */}
        <Box>
          <Typography fontWeight={700} mb={2}>Quick Links</Typography>
          {["MERN Stack", "DSA", "Frontend", "Backend", "AI Tools"].map(
            (item) => (
              <Typography key={item} mb={1}>
                <Link underline="none" sx={{ color: "#555" }}>
                  {item}
                </Link>
              </Typography>
            )
          )}
        </Box>

        {/* NEWSLETTER */}
        <Box>
          <Typography fontWeight={700}>Newsletter</Typography>
          <Typography fontSize={14} color="#555" mt={1}>
            Get latest IT course updates.
          </Typography>

          <TextField
            fullWidth
            size="small"
            sx={{ mt: 2 }}
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
              "&:hover": { backgroundColor: "#4a3ee6" }
            }}
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
            <EmailIcon sx={{ ml: 1 }} />
          </Button>

          {status && (
            <Typography fontSize={13} mt={1} color="green">
              {status}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ borderTop: "1px solid #eee", py: 2 }}>
        <Typography textAlign="center" fontSize={13} color="#777">
          © {new Date().getFullYear()} The IT Wallah. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
