import React, { useState } from "react"; import { Box, TextField, Button, Typography, Container, Paper, InputAdornment, IconButton, MenuItem, } from "@mui/material"; 
import { Person, Email, Phone, Lock, Visibility, VisibilityOff, } from "@mui/icons-material";

const countries = [ { code: "+91", label: "India" }, { code: "+1", label: "USA" }, { code: "+44", label: "UK" }, { code: "+61", label: "Australia" }, ];

export default function Register() { const [form, setForm] = useState({ name: "", email: "", countryCode: "+91", mobile: "", password: "", });

const [errors, setErrors] = useState({}); const [showPassword, setShowPassword] = useState(false);

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const validate = () => { let temp = {};

if (!form.name.trim()) temp.name = "Name is required";
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
  temp.email = "Valid email is required";
if (!/^\d{10}$/.test(form.mobile))
  temp.mobile = "Mobile number must be 10 digits";
if (form.password.length < 6)
  temp.password = "Password must be at least 6 characters";

setErrors(temp);
return Object.keys(temp).length === 0;

};

const handleSubmit = (e) => { e.preventDefault(); if (validate()) { console.log("Register Data:", form); alert("Registered Successfully ✅"); } };

return ( <Container maxWidth="sm"> <Paper elevation={6} sx={{ p: 4, mt: 6, borderRadius: 3 }}> <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}> Create Account </Typography>

<Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
      Register to continue
    </Typography>

    <Box component="form" onSubmit={handleSubmit}>
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

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          select
          label="Code"
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
          sx={{ width: "30%" }}
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
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, py: 1.2, borderRadius: 2 }}
      >
        Register
      </Button>

      <Typography textAlign="center" mt={2} variant="body2">
        Already have an account? <b>Login</b>
      </Typography>
    </Box>
  </Paper>
</Container>

); }
