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
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API_BASE = "https://sm-backend-8me3.onrender.com/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [stats, setStats] = useState({
    users: 0,
    registrations: 0,
    subscribers: 0,
    admins: 0,
  });

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  /* ================= FETCH DASHBOARD STATS ================= */
  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [usersRes, regRes, newsletterRes, adminRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/users`, { headers }),
        axios.get(`${API_BASE}/admin/registrations`, { headers }),
        axios.get(`${API_BASE}/admin/newsletter`, { headers }),
        axios.get(`${API_BASE}/admin/admins`, { headers }),
      ]);

      setStats({
        users: usersRes.data?.users?.length || 0,
        registrations: regRes.data?.registrations?.length || 0,
        subscribers: newsletterRes.data?.subscribers?.length || 0,
        admins: adminRes.data?.admins?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Server error while loading dashboard data");
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

  /* ================= CHART DATA ================= */
  const chartData = {
    labels: ["Users", "Registrations", "Subscribers", "Admins"],
    datasets: [
      {
        data: [
          stats.users,
          stats.registrations,
          stats.subscribers,
          stats.admins,
        ],
        backgroundColor: ["#1976d2", "#0288d1", "#26c6da", "#2e7d32"],
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

  /* ================= MAIN CONTENT ================= */
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <Typography variant="h4" fontWeight="bold" mb={3}>
              Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
              {Object.entries(stats).map(([key, value]) => (
                <Grid item xs={12} md={3} key={key}>
                  <Paper sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
                      {key}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" mb={2}>
                    Platform Overview
                  </Typography>
                  <Bar
                    data={chartData}
                    options={{ responsive: true, plugins: { legend: { display: false } } }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        );

      case "users":
        return <Typography variant="h5">Users Management Page</Typography>;

      case "newsletter":
        return <Typography variant="h5">Newsletter Management Page</Typography>;

      case "contact":
        return <Typography variant="h5">Contact Messages Page</Typography>;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "#0d47a1",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            <AdminPanelSettings /> Admin Panel
          </Typography>
        </Box>

        <Divider />

        <List>
          <ListItemButton onClick={() => setActiveSection("dashboard")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("users")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("newsletter")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <MailOutline />
            </ListItemIcon>
            <ListItemText primary="Newsletter" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("contact")}>
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

      {/* CONTENT */}
      <Box sx={{ flexGrow: 1, p: 4 }}>{renderSection()}</Box>
    </Box>
  );
};

export default AdminDashboard;
