import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  DarkMode,
  LightMode,
  Person,
  Email,
  Phone,
  Lock,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Password Strength */
const getStrength = (pwd) => {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s;
};

export default function Register() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    password: "",
  });

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.mobile || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://sm-backend-8me3.onrender.com/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: `${form.countryCode}${form.mobile.trim()}`,
        password: form.password,
      });

      alert("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f4f6fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 430,
          p: 4,
          borderRadius: 3,
          position: "relative",
          bgcolor: darkMode ? "#020617" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {/* Theme Button */}
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{ position: "absolute", right: 16, top: 16 }}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>

        {/* Header */}
        <Box textAlign="center" mb={3}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
            width="52"
            alt="logo"
          />
          <Typography fontSize={26} fontWeight={700} mt={1}>
            ITWale ✨
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Create your learning account
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Error */}
        {error && (
          <Typography color="error" fontSize={14} mb={2} textAlign="center">
            {error}
          </Typography>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" gap={1} mb={2}>
            <TextField
              select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              sx={{ width: "35%" }}
            >
              <MenuItem value="+91">🇮🇳 +91</MenuItem>
              <MenuItem value="+1">🇺🇸 +1</MenuItem>
              <MenuItem value="+44">🇬🇧 +44</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {form.password && (
            <Box mb={2}>
              <LinearProgress
                variant="determinate"
                value={(strength / 4) * 100}
                sx={{ height: 8, borderRadius: 5 }}
              />
              <Typography variant="caption">
                Strength:{" "}
                {["Weak", "Fair", "Good", "Strong"][strength - 1] || "Weak"}
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: "bold",
              bgcolor: "#2563eb",
              ":hover": { bgcolor: "#1d4ed8" },
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <Typography textAlign="center" mt={3} fontSize={14}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}
