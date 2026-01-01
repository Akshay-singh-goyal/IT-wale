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
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/login");
  }, [navigate]);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Server error while fetching users");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ACTIONS ================= */
  const toggleBlock = async (id, isBlocked) => {
    const token = localStorage.getItem("accessToken");
    await axios.put(
      `${API_BASE}/admin/block/${id}`,
      { isBlocked: !isBlocked },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    const token = localStorage.getItem("accessToken");
    await axios.put(
      `${API_BASE}/admin/role/${id}`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    const token = localStorage.getItem("accessToken");
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

      {/* CONTENT */}
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

        <Paper>
          <TableContainer sx={{ maxHeight: "70vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    "Avatar",
                    "Name",
                    "Email",
                    "Mobile",
                    "Role",
                    "Joined",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: "bold" }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>
                      <Avatar src={u.avatar} />
                    </TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.mobile || "—"}</TableCell>

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
                      <Button
                        size="small"
                        color="warning"
                        onClick={() => toggleBlock(u._id, u.isBlocked)}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => deleteUser(u._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
