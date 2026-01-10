import React, { useState } from "react"; 
import api from "../api"; // axios instance with Render baseURL import { Box, TextField, Button, Typography, Container, Paper, InputAdornment, IconButton, MenuItem, Alert, CircularProgress, } from "@mui/material"; import { Person, Email, Phone, Lock, Visibility, VisibilityOff, } from "@mui/icons-material";

const countries = [ { code: "+91", label: "India" }, { code: "+1", label: "USA" }, { code: "+44", label: "UK" }, { code: "+61", label: "Australia" }, ];

export default function Register() { const [form, setForm] = useState({ name: "", email: "", countryCode: "+91", mobile: "", password: "", });

const [errors, setErrors] = useState({}); const [showPassword, setShowPassword] = useState(false); const [loading, setLoading] = useState(false); const [serverError, setServerError] = useState(""); const [success, setSuccess] = useState("");

/* ================= HANDLE CHANGE ================= */ const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

/* ================= VALIDATION ================= */ const validate = () => { const temp = {};

if (!form.name.trim()) temp.name = "Full name is required";

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
  temp.email = "Enter a valid email address";

if (!/^\d{10}$/.test(form.mobile))
  temp.mobile = "Mobile number must be exactly 10 digits";

if (form.password.length < 6)
  temp.password = "Password must be at least 6 characters";

setErrors(temp);
return Object.keys(temp).length === 0;

};

/* ================= SUBMIT ================= */ const handleSubmit = async (e) => { e.preventDefault(); if (!validate()) return;

try {
  setLoading(true);
  setServerError("");
  setSuccess("");

  // Backend-compatible payload
  const payload = {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    mobile: form.mobile, // backend expects plain 10-digit number
    password: form.password,
  };

  const res = await api.post("/api/users/register", payload);

  setSuccess(res.data.message || "Registration successful");

  setForm({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    password: "",
  });
} catch (err) {
  setServerError(
    err?.response?.data?.message || "Registration failed. Please try again"
  );
} finally {
  setLoading(false);
}

};

return ( <Container maxWidth="sm"> <Paper elevation={8} sx={{ p: 4, mt: 8, borderRadius: 3 }}> <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom> Create Account </Typography>

<Typography
      variant="body2"
      textAlign="center"
      color="text.secondary"
      mb={3}
    >
      Register to continue
    </Typography>

    {serverError && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {serverError}
      </Alert>
    )}

    {success && (
      <Alert severity="success" sx={{ mb: 2 }}>
        {success}
      </Alert>
    )}

    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* NAME */}
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      {/* EMAIL */}
      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />

      {/* MOBILE */}
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          select
          label="Code"
          value={form.countryCode}
          sx={{ width: "30%" }}
          disabled
        >
          {countries.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.label} ({c.code})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Mobile Number"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          error={!!errors.mobile}
          helperText={errors.mobile}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* PASSWORD */}
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* SUBMIT */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, py: 1.3, borderRadius: 2, fontWeight: "bold" }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Register"
        )}
      </Button>

      <Typography textAlign="center" mt={2} variant="body2">
        Already have an account? <b>Login</b>
      </Typography>
    </Box>
  </Paper>
</Container>

); }
