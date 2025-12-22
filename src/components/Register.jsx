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
} from "@mui/material";
import { Visibility, VisibilityOff, DarkMode, LightMode } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

/* ---------------------------
   Password Strength Utility
---------------------------- */
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------------------
     Formik + Yup
  ---------------------------- */
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      countryCode: "+91",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string()
        .min(10, "Must be at least 10 digits")
        .required("Mobile number is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "One uppercase letter required")
        .matches(/[0-9]/, "One number required")
        .matches(/[^A-Za-z0-9]/, "One special character required")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:5000/api/auth/register", {
          ...values,
          mobile: `${values.countryCode}${values.mobile}`,
        });
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const strength = getPasswordStrength(formik.values.password);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg,#0f172a,#020617)"
          : "linear-gradient(135deg,#eef2ff,#e3e6ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "0.3s",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: darkMode ? "#020617" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={3} position="relative">
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ position: "absolute", right: 0, top: 0 }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>

            <Typography fontSize={26} fontWeight={700}>
              ITWale
            </Typography>
            <Typography fontSize={14} color="gray">
              Create your study account
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              sx={{ mb: 2 }}
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              sx={{ mb: 2 }}
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* Country Code + Mobile */}
            <Box display="flex" gap={1} mb={2}>
              <TextField
                select
                name="countryCode"
                sx={{ width: "35%" }}
                {...formik.getFieldProps("countryCode")}
              >
                <MenuItem value="+91">🇮🇳 +91</MenuItem>
                <MenuItem value="+1">🇺🇸 +1</MenuItem>
                <MenuItem value="+44">🇬🇧 +44</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                {...formik.getFieldProps("mobile")}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Box>

            {/* Password */}
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              sx={{ mb: 1 }}
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Strength */}
            {formik.values.password && (
              <Box mb={2}>
                <LinearProgress
                  variant="determinate"
                  value={(strength / 4) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: "#ddd",
                  }}
                />
                <Typography fontSize={12} mt={0.5}>
                  Strength: {["Weak", "Fair", "Good", "Strong"][strength - 1] || "Weak"}
                </Typography>
              </Box>
            )}

            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.3,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg,#7b3eff,#6242ff)",
                }}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </motion.div>
          </form>

          <Typography textAlign="center" mt={3} fontSize={14}>
            Already have an account?{" "}
            <span
              style={{ color: "#6a5acd", cursor: "pointer", fontWeight: 600 }}
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