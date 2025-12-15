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

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [loginType, setLoginType] = useState(0); // 0=email, 1=mobile
  const [form, setForm] = useState({ email: "", mobile: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if ((loginType === 0 && !form.email) || (loginType === 1 && !form.mobile)) {
      toast.error("Please enter your email or mobile number!");
      return;
    }
    if (!form.password) {
      toast.error("Please enter your password!");
      return;
    }

    try {
      const payload =
        loginType === 0
          ? { email: form.email, password: form.password }
          : { mobile: form.mobile, password: form.password };

      const res = await axios.post("http://localhost:5000/api/auth/login", payload);

      // ✅ Save BOTH token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful!", { position: "bottom-center" });

      // ROLE BASED REDIRECT
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
        window.location.reload(); // refresh Navbar
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#eef2ff,#f4f7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: "18px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
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
            Welcome back! Sign in to your study account.
          </Typography>
        </Box>

        {/* LOGIN TYPE SWITCHER */}
        <Tabs
          value={loginType}
          onChange={(e, val) => setLoginType(val)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Email Login" />
          <Tab label="Mobile Login" />
        </Tabs>

        {/* EMAIL LOGIN */}
        {loginType === 0 && (
          <TextField
            fullWidth
            placeholder="name@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        )}

        {/* MOBILE LOGIN */}
        {loginType === 1 && (
          <TextField
            fullWidth
            placeholder="9876543210"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        )}

        {/* PASSWORD FIELD */}
        <TextField
          fullWidth
          type={showPass ? "text" : "password"}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton onClick={() => setShowPass(!showPass)}>
                {showPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />

        <Typography
          sx={{
            mt: 1,
            mb: 1,
            textAlign: "right",
            fontSize: "13px",
            color: "#6a5acd",
            cursor: "pointer",
          }}
        >
          Forgot password?
        </Typography>

        {/* LOGIN BUTTON */}
        <Button
          fullWidth
          sx={{
            background: "linear-gradient(135deg,#7b3eff,#6242ff)",
            color: "white",
            py: 1.4,
            mt: 1,
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 600,
          }}
          onClick={handleLogin}
        >
          Sign in →
        </Button>

        {/* FOOTER */}
        <Typography textAlign="center" mt={2} fontSize={14}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#6a5acd", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </Typography>
      </Paper>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
}
