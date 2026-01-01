// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  AdminPanelSettings,
  Dashboard as DashboardIcon,
  People,
  MailOutline,
  ContactMail,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const API_BASE = "https://sm-backend-8me3.onrender.com/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, registrations: 0, subscribers: 0, admins: 0 });
  const [activeSection, setActiveSection] = useState("dashboard"); // Which section is active

  /* ============ AUTH CHECK ============ */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") navigate("/login");
  }, [navigate]);

  /* ============ FETCH STATS ============ */
  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const [usersRes, regRes, newsletterRes, adminRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/admin/registrations`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/admin/newsletter`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/admin/admins`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setStats({
        users: usersRes.data.length,
        registrations: regRes.data.length,
        subscribers: newsletterRes.data.length,
        admins: adminRes.data.length,
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Server error while fetching stats");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ============ CHART DATA ============ */
  const chartData = {
    labels: ["Users", "Registrations", "Subscribers", "Admins"],
    datasets: [
      {
        label: "Count",
        data: [stats.users, stats.registrations, stats.subscribers, stats.admins],
        backgroundColor: ["#1976d2", "#0d47a1", "#42a5f5", "#1e88e5"],
      },
    ],
  };

  if (loading) {
    return (
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  /* ============ MAIN CONTENT COMPONENTS ============ */
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <Typography variant="h4" fontWeight="bold" mb={3}>
              Admin Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
              {["Users", "Registrations", "Subscribers", "Admins"].map((title, idx) => (
                <Grid item xs={12} md={3} key={idx}>
                  <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#fff" }}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="h4" fontWeight="bold" mt={1}>
                      {Object.values(stats)[idx]}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" mb={2}>
                    Activity Graph
                  </Typography>
                  <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      case "users":
        return <Typography variant="h5">Users Management Page (Will load user data here)</Typography>;
      case "newsletter":
        return <Typography variant="h5">Newsletter Page (Will load newsletter data here)</Typography>;
      case "contact":
        return <Typography variant="h5">Contact / Messages Page (Will load messages here)</Typography>;
      default:
        return <Typography variant="h5">Section Coming Soon</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": { width: 240, bgcolor: "#0d47a1", color: "#fff" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <AdminPanelSettings /> Admin Panel
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItemButton selected={activeSection === "dashboard"} onClick={() => setActiveSection("dashboard")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton selected={activeSection === "users"} onClick={() => setActiveSection("users")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton selected={activeSection === "newsletter"} onClick={() => setActiveSection("newsletter")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <MailOutline />
            </ListItemIcon>
            <ListItemText primary="Newsletter" />
          </ListItemButton>
          <ListItemButton selected={activeSection === "contact"} onClick={() => setActiveSection("contact")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ContactMail />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box sx={{ flexGrow: 1, p: 4 }}>{renderSection()}</Box>
    </Box>
  );
};

export default AdminDashboard;
