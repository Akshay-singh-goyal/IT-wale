/* =========================================================
   SupportPage.jsx
   Author: The IT Wallah
   Purpose: SEO Optimized Support & Contact Page
   ========================================================= */

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
  Divider,
} from "@mui/material";
import {
  FaComments,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import API from "../api";

/* =========================================================
   CONSTANTS
   ========================================================= */

const categories = [
  "Payments",
  "Orders",
  "Account",
  "Travel",
  "Events",
  "Other",
];

const priorities = ["Low", "Medium", "High"];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function SupportPage({ dark }) {
  /* ================= STATE ================= */

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

  /* =========================================================
     FETCH USER SUPPORT TICKETS
     ========================================================= */

  const fetchTickets = async () => {
    if (!form.email) return;

    setTicketsLoading(true);
    setTicketsError("");

    try {
      const res = await API.get(
        `/contact/user-tickets?email=${form.email}`
      );
      setTickets(res.data.tickets || []);
    } catch (error) {
      setTicketsError("Failed to fetch tickets");
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [form.email]);

  /* =========================================================
     FORM HANDLERS
     ========================================================= */

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

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

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <Box
      sx={{
        backgroundColor: dark ? "#071124" : "#f3f6fb",
        minHeight: "100vh",
        pb: 8,
      }}
    >
      {/* =====================================================
         SEO META TAGS (VERY IMPORTANT)
         ===================================================== */}
      <Helmet>
        <title>
          Contact Support | The IT Wallah – RGPV Student Help Desk
        </title>

        <meta
          name="description"
          content="Contact The IT Wallah support for RGPV notes, payments, orders, travel, events and account issues. 24/7 student help desk."
        />

        <meta
          name="keywords"
          content="The IT Wallah support, RGPV student support, contact IT Wallah, RGPV help desk, RGPV notes support"
        />

        <link
          rel="canonical"
          href="https://theitwallah.vercel.app/support"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="The IT Wallah Support – Contact & Help Center"
        />
        <meta
          property="og:description"
          content="Need help with RGPV notes or services? Contact The IT Wallah support team anytime."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://theitwallah.vercel.app/support"
        />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "The IT Wallah",
            url: "https://theitwallah.vercel.app",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-6263615262",
              contactType: "customer support",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          })}
        </script>
      </Helmet>

      {/* =====================================================
         PAGE HEADER
         ===================================================== */}
      <Box
        component="header"
        sx={{
          backgroundColor: "#0A1F44",
          color: "#fff",
          py: 7,
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography component="h1" variant="h3" fontWeight={800}>
          The IT Wallah Support – Contact & Help Center
        </Typography>

        <Typography component="h2" mt={1}>
          24/7 Student Support for RGPV Notes & Services
        </Typography>
      </Box>

      {/* =====================================================
         MAIN CONTENT
         ===================================================== */}
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* ================= CONTACT FORM ================= */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography component="h2" variant="h6" mb={3}>
                Contact The IT Wallah Support Team
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
                  startIcon={<FaComments />}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {status && (
                  <Alert severity="success">{status}</Alert>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* ================= QUICK SUPPORT + STATUS ================= */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography component="h2" variant="h6" mb={2}>
                Quick Support Options
              </Typography>

              <Box display="flex" gap={2}>
                <Button
                  startIcon={<FaPhoneAlt />}
                  variant="contained"
                >
                  Call Support
                </Button>

                <Button
                  startIcon={<FaWhatsapp />}
                  variant="outlined"
                  color="success"
                  onClick={() =>
                    window.open(
                      "https://wa.me/6263615262",
                      "_blank"
                    )
                  }
                >
                  WhatsApp Support
                </Button>
              </Box>

              <Typography mt={2}>
                Looking for study material?{" "}
                <a href="/notes">Explore RGPV Notes</a>
              </Typography>
            </Paper>

            <Paper sx={{ p: 4 }}>
              <Typography component="h2" variant="h6" mb={3}>
                Your Support Ticket Status
              </Typography>

              {ticketsLoading ? (
                <CircularProgress />
              ) : ticketsError ? (
                <Alert severity="error">
                  {ticketsError}
                </Alert>
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
                        ticket.resolved
                          ? "green"
                          : "orange"
                      }`,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      color={
                        ticket.resolved
                          ? "green"
                          : "orange"
                      }
                    >
                      Status:{" "}
                      {ticket.resolved
                        ? "Resolved ✅"
                        : "Pending ⏳"}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography fontWeight={600}>
                      Admin Reply:
                    </Typography>
                    <Typography>
                      {ticket.reply ||
                        "No reply from admin yet"}
                    </Typography>
                  </Paper>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* ================= SEO CONTENT BLOCK ================= */}
        <Box mt={6}>
          <Typography component="h2" fontWeight={700}>
            Why Contact The IT Wallah Support?
          </Typography>
          <Typography mt={1}>
            The IT Wallah provides dedicated support for
            RGPV students. Get help related to notes,
            payments, account issues, travel events and
            more. Our support team ensures fast and
            reliable assistance.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
