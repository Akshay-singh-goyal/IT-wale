// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  CircularProgress,
  Button,
  TextField,
  Stack,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import {
  People,
  Logout,
  Block,
  Delete,
  Refresh,
  AdminPanelSettings,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://sm-backend-8me3.onrender.com/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.users || res.data);
    } catch (err) {
      console.error(err);
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ACTIONS ================= */
  const toggleBlock = async (id, isBlocked) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${API_BASE}/admin/block/${id}`,
      { isBlocked: !isBlocked },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${API_BASE}/admin/change-role/${id}`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE}/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= FILTER ================= */
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* ================= SIDEBAR ================= */}
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

        <Divider sx={{ bgcolor: "rgba(255,255,255,.3)" }} />

        <List>
          <ListItemButton selected>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ================= CONTENT ================= */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Users Management Dashboard
          </Typography>
          <Button variant="contained" startIcon={<Refresh />} onClick={fetchUsers}>
            Refresh
          </Button>
        </Stack>

        <TextField
          fullWidth
          placeholder="Search user by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3, bgcolor: "#fff" }}
        />

        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: "70vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: "#1976d2" }}>
                  {[
                    "Avatar",
                    "Name",
                    "Email",
                    "Mobile",
                    "Role",
                    "Courses",
                    "Books",
                    "Wishlist",
                    "Payments",
                    "Joined",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      sx={{ color: "#fff", fontWeight: "bold", bgcolor: "#1976d2" }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u._id} hover>
                    <TableCell>
                      <Avatar src={u.avatar} />
                    </TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.mobile || "—"}</TableCell>

                    {/* ROLE CHANGE */}
                    <TableCell>
                      <Select
                        size="small"
                        value={u.role}
                        onChange={(e) =>
                          changeRole(u._id, e.target.value)
                        }
                      >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell>{u.completedCourses?.length || 0}</TableCell>
                    <TableCell>{u.purchasedBooks?.length || 0}</TableCell>
                    <TableCell>{u.wishlist?.length || 0}</TableCell>
                    <TableCell>{u.paymentHistory?.length || 0}</TableCell>
                    <TableCell>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={u.isBlocked ? "Blocked" : "Active"}
                        color={u.isBlocked ? "error" : "success"}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          color="warning"
                          startIcon={<Block />}
                          onClick={() => toggleBlock(u._id, u.isBlocked)}
                        >
                          {u.isBlocked ? "Unblock" : "Block"}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => deleteUser(u._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
