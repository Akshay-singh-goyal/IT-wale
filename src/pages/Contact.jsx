import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
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

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState("");

  /* ================= FETCH USER TICKETS ================= */
  const fetchTickets = async () => {
    if (!form.email) return;

    setTicketsLoading(true);
    setTicketsError("");
    try {
      const res = await API.get(
        `/contact/user-tickets?email=${form.email}`
      );
      setTickets(res.data.tickets || []);
    } catch (err) {
      setTicketsError("Failed to fetch tickets");
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [form.email]);

  /* ================= FORM HANDLERS ================= */
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
      await API.post("/contact", form);

      setStatus("Ticket submitted successfully 🎉");
      setForm({
        ...form,
        name: "",
        subject: "",
        message: "",
      });

      fetchTickets();
      setTimeout(() => setStatus(""), 4000);
    } catch {
      setStatus("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: dark ? "#071124" : "#f3f6fb",
        minHeight: "100vh",
        pb: 8,
      }}
    >
      <Helmet>
        <title>The IT Wallah Support</title>
      </Helmet>

      {/* ================= HEADER ================= */}
      <Box
        sx={{
          backgroundColor: "#0A1F44",
          color: "#fff",
          py: 7,
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography variant="h3" fontWeight={800}>
          The IT Wallah Support
        </Typography>
        <Typography mt={1}>
          Have a question? We’re here 24/7 to assist you.
        </Typography>
      </Box>

      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* ================= CONTACT FORM ================= */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" mb={3}>
                Contact Us
              </Typography>

              <Box
                component="form"
                onSubmit={submit}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Priority"
                  name="priority"
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
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {status && <Alert severity="success">{status}</Alert>}
              </Box>
            </Paper>
          </Grid>

          {/* ================= QUICK SUPPORT + STATUS ================= */}
          <Grid item xs={12} md={6}>
            {/* QUICK SUPPORT */}
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" mb={2}>
                Quick Support
              </Typography>
              <Box display="flex" gap={2}>
                <Button startIcon={<FaPhoneAlt />} variant="contained">
                  Call
                </Button>
                <Button
                  startIcon={<FaWhatsapp />}
                  variant="outlined"
                  color="success"
                  onClick={() =>
                    window.open("https://wa.me/6263615262", "_blank")
                  }
                >
                  WhatsApp
                </Button>
              </Box>
            </Paper>

            {/* SUPPORT STATUS */}
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" mb={3}>
                Your Support Status
              </Typography>

              {ticketsLoading ? (
                <CircularProgress />
              ) : ticketsError ? (
                <Alert severity="error">{ticketsError}</Alert>
              ) : tickets.length === 0 ? (
                <Typography>No tickets found</Typography>
              ) : (
                tickets.map((ticket) => (
                  <Paper
                    key={ticket._id}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderLeft: `5px solid ${
                        ticket.resolved ? "green" : "orange"
                      }`,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      color={ticket.resolved ? "green" : "orange"}
                    >
                      Status:{" "}
                      {ticket.resolved
                        ? "Resolved ✅"
                        : "Pending ⏳"}
                    </Typography>

                    <Box mt={1}>
                      <Typography fontWeight={600}>
                        Admin Reply:
                      </Typography>
                      <Typography>
                        {ticket.reply || "No reply from admin yet"}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
