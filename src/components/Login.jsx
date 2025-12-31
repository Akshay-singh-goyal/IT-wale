import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://sm-backend-8me3.onrender.com/api/auth/login";

export default function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  const handleLogin = async () => {
    const email = form.email.trim();
    const mobile = form.mobile.trim();
    const password = form.password.trim();

    if (loginType === 0 && !email) {
      toast.error("Email is required");
      return;
    }
    if (loginType === 1 && !mobile) {
      toast.error("Mobile number is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const payload =
        loginType === 0 ? { email, password } : { mobile, password };

      const res = await axios.post(API_URL, payload);

      // Save tokens and user
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      // Role-based redirect without reload
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#eef2ff,#f5f7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
            width="52"
            alt="logo"
          />
          <Typography fontSize="26px" fontWeight={700} mt={1}>
            The IT Wallah ✨
          </Typography>
          <Typography fontSize="14px" color="gray">
            Login to your account
          </Typography>
        </Box>

        <Tabs
          value={loginType}
          onChange={(e, val) => setLoginType(val)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Email Login" />
          <Tab label="Mobile Login" />
        </Tabs>

        {loginType === 0 ? (
          <TextField
            fullWidth
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        ) : (
          <TextField
            fullWidth
            placeholder="9876543210"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          fullWidth
          type={showPass ? "text" : "password"}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton onClick={() => setShowPass(!showPass)}>
                {showPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
          sx={{ mb: 1 }}
        />

        <Typography
          sx={{
            textAlign: "right",
            fontSize: "13px",
            color: "#6a5acd",
            cursor: "pointer",
            mb: 2,
          }}
        >
          Forgot password?
        </Typography>

        <Button
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            background: "linear-gradient(135deg,#7b3eff,#6242ff)",
            color: "white",
            py: 1.4,
            borderRadius: "14px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Sign In →"
          )}
        </Button>

        <Typography textAlign="center" mt={2} fontSize={14}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#6a5acd", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </Typography>
      </Paper>

      <ToastContainer position="bottom-center" />
    </Box>
  );
}
