import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { FaComments, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import API from "../api";

const categories = ["Payments", "Orders", "Account", "Travel", "Events", "Other"];
const priorities = ["Low", "Medium", "High"];

export default function SupportPage({ dark }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Other",
    priority: "Medium",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject) {
      setStatus("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/contact", form);

      if (res.data.success) {
        setStatus("Message sent successfully 🎉 The IT Wallah team will contact you.");
        setForm({
          name: "",
          email: "",
          category: "Other",
          priority: "Medium",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <Box sx={{ backgroundColor: dark ? "#071124" : "#f3f6fb", minHeight: "100vh", pb: 8 }}>
      {/* SEO */}
      <Helmet>
        <title>The IT Wallah Support | Contact Us</title>
        <meta name="description" content="Reach out to The IT Wallah support team for payments, orders, account issues, or any queries. Available 24/7." />
        <meta name="keywords" content="The IT Wallah, support, contact, help, payments, queries" />
      </Helmet>

      {/* Header */}
      <Box sx={{ backgroundColor: "#0A1F44", color: "#fff", py: 8, textAlign: "center", mb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800 }}>The IT Wallah Support</Typography>
          <Typography sx={{ mt: 1, fontSize: "1.2rem" }}>Have a question? We’re here 24/7 to assist you.</Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Contact Us</Typography>

              <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
                <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth />
                <TextField label="Category" name="category" select value={form.category} onChange={handleChange} fullWidth>
                  {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
                <TextField label="Priority" name="priority" select value={form.priority} onChange={handleChange} fullWidth>
                  {priorities.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </TextField>
                <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} required fullWidth />
                <TextField label="Message" name="message" multiline rows={4} value={form.message} onChange={handleChange} fullWidth />

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <Button variant="outlined" startIcon={<FaComments />} onClick={() => setWidgetOpen(true)}>Open Chat</Button>
                </Box>

                {status && <Typography color="success.main" sx={{ mt: 1, fontWeight: 500 }}>{status}</Typography>}
              </Box>
            </Paper>
          </Grid>

          {/* Quick Support */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Quick Support</Typography>
              <Typography sx={{ mb: 3 }}>Call us or reach via WhatsApp for urgent queries</Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button startIcon={<FaPhoneAlt />} variant="contained" color="secondary">Call</Button>
                <Button startIcon={<FaWhatsapp />} variant="outlined" color="success" onClick={() => window.open("https://wa.me/6263615262", "_blank")}>WhatsApp</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
