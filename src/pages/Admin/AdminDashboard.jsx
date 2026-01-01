// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  AdminPanelSettings,
  People,
  MailOutline,
  HowToReg,
  Dashboard as DashboardIcon,
  Logout,
  Block,
  CheckCircle,
  Delete,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
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
  const [view, setView] = useState("dashboard"); // dashboard, users, newsletter, subscribers
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, registrations: 0, subscribers: 0, admins: 0 });
  const [users, setUsers] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  /* ============ AUTH CHECK ============ */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") navigate("/login");
  }, [navigate]);

  /* ============ FETCH STATS & DATA ============ */
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

      setUsers(usersRes.data);
      setNewsletter(newsletterRes.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Server error while fetching data");
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

  /* ============ USER ACTIONS ============ */
  const toggleBlockUser = async (userId, block) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${API_BASE}/admin/block/${userId}`,
        { isBlocked: block },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStats();
    } catch (err) {
      console.error(err);
      alert("Failed to update block status");
    } finally {
      setActionLoading(false);
    }
  };

  const changeUserRole = async (userId, role) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${API_BASE}/admin/role/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStats();
    } catch (err) {
      console.error(err);
      alert("Failed to change role");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setActionLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStats();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setActionLoading(false);
    }
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
          <ListItemButton selected={view === "dashboard"} onClick={() => setView("dashboard")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton selected={view === "users"} onClick={() => setView("users")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton selected={view === "newsletter"} onClick={() => setView("newsletter")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <MailOutline />
            </ListItemIcon>
            <ListItemText primary="Newsletter" />
          </ListItemButton>
          <ListItemButton selected={view === "subscribers"} onClick={() => setView("subscribers")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <HowToReg />
            </ListItemIcon>
            <ListItemText primary="Subscribers" />
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
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {view === "dashboard" && (
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
                    Users & Activity Graph
                  </Typography>
                  <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {/* USERS TABLE */}
        {view === "users" && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" mb={2}>
              Users Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.role}
                            onChange={(e) => changeUserRole(user._id, e.target.value)}
                            disabled={actionLoading}
                          >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>{user.isBlocked ? "Blocked" : "Active"}</TableCell>
                      <TableCell align="center">
                        <Tooltip title={user.isBlocked ? "Unblock User" : "Block User"}>
                          <IconButton
                            color={user.isBlocked ? "success" : "error"}
                            onClick={() => toggleBlockUser(user._id, !user.isBlocked)}
                            disabled={actionLoading}
                          >
                            {user.isBlocked ? <CheckCircle /> : <Block />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                          <IconButton color="error" onClick={() => deleteUser(user._id)} disabled={actionLoading}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* NEWSLETTER TABLE */}
        {view === "newsletter" && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" mb={2}>
              Newsletter Subscribers
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Date Subscribed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newsletter.map((sub) => (
                    <TableRow key={sub._id}>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {view === "subscribers" && (
          <Typography variant="h5">Batch / Subscription Info Coming Soon</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
