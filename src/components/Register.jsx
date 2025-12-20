import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  // ---------------------
  // Register User
  // ---------------------
  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#eef2ff,#e3e6ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Logo */}
          <Box textAlign="center" mb={2}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
              width="48"
              alt="logo"
            />
            <Typography fontSize="26px" fontWeight={700} mt={1}>
              ITWale ✨
            </Typography>
            <Typography color="gray" fontSize="14px">
              Create your study account
            </Typography>
          </Box>

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            sx={{ mb: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            sx={{ mb: 2 }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Mobile */}
          <TextField
            fullWidth
            label="Mobile Number"
            type="number"
            sx={{ mb: 2 }}
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

          {/* Password */}
          <TextField
            fullWidth
            type="password"
            label="Password"
            sx={{ mb: 3 }}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Register */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              fullWidth
              sx={{
                background: "linear-gradient(135deg,#7b3eff,#6242ff)",
                color: "white",
                py: 1.3,
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={handleRegister}
            >
              Register →
            </Button>
          </motion.div>

          <Typography textAlign="center" mt={2}>
            Already have an account?{" "}
            <span
              style={{
                color: "#6a5acd",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
