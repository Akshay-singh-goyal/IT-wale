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
// import ChatWidget from "../components/ChatWidget";
// import API from "../api";

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
    //   await API.post("/contact", form);
      setStatus("Message sent successfully 🎉 Our team will contact you.");

      setForm({
        name: "",
        email: "",
        category: "Other",
        priority: "Medium",
        subject: "",
        message: "",
      });

      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ background: dark ? "#071124" : "#f3f6fb", minHeight: "100vh", pb: 8 }}>
      {/* Header */}
      <Box sx={{ background: "#0A1F44", color: "#fff", py: 6, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            IncredibleFest Support
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Ask anything — we are here 24/7.
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: -6 }}>
        <Grid container spacing={3}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Contact Us
              </Typography>

              <Box
                component="form"
                onSubmit={submit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  name="name"
                  label="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  name="category"
                  select
                  label="Category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="priority"
                  select
                  label="Priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  {priorities.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="subject"
                  label="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />

                <TextField
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<FaComments />}
                    onClick={() => setWidgetOpen(true)}
                  >
                    Open Chat
                  </Button>
                </Box>

                {status && (
                  <Typography color="success.main" sx={{ mt: 1 }}>
                    {status}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Quick Support */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6">Quick Support</Typography>
              <Typography sx={{ mt: 1 }}>
                Call us or reach via WhatsApp for urgent queries
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button startIcon={<FaPhoneAlt />} variant="contained">
                  Call
                </Button>

                <Button
                  startIcon={<FaWhatsapp />}
                  variant="outlined"
                  onClick={() =>
                    window.open("https://wa.me/6263615262", "_blank")
                  }
                >
                  WhatsApp
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Chat Widget */}
      {/* <ChatWidget open={widgetOpen} onClose={() => setWidgetOpen(false)} /> */}
    </Box>
  );
}
