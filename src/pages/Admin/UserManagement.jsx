// src/pages/Admin/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Collapse,
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  TablePagination,
} from "@mui/material";
import {
  Block,
  CheckCircle,
  Delete,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://sm-backend-8me3.onrender.com/api";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ===== Auth check ===== */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") navigate("/login");
  }, [navigate]);

  /* ===== Fetch users ===== */
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
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ===== Actions ===== */
  const toggleBlockUser = async (userId, block) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${API_BASE}/admin/block/${userId}`,
        { isBlocked: block },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
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
      fetchUsers();
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
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleExpandRow = (userId) => {
    setExpandedRows((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  /* ===== Pagination ===== */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading)
    return (
      <Box sx={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        User Management
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <React.Fragment key={user._id}>
                    <TableRow>
                      <TableCell>
                        <IconButton onClick={() => toggleExpandRow(user._id)}>
                          {expandedRows.includes(user._id) ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile || "-"}</TableCell>
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
                          <IconButton
                            color="error"
                            onClick={() => deleteUser(user._id)}
                            disabled={actionLoading}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row for Full Details */}
                    <TableRow>
                      <TableCell colSpan={7} sx={{ p: 0, borderBottom: "1px solid #eee" }}>
                        <Collapse
                          in={expandedRows.includes(user._id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                  <Typography variant="subtitle2">Avatar:</Typography>
                                  <img
                                    src={user.avatar}
                                    alt="avatar"
                                    width={100}
                                    style={{ borderRadius: "50%" }}
                                  />
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                  <Typography variant="subtitle2">Completed Courses:</Typography>
                                  <Typography>{user.completedCourses.length}</Typography>

                                  <Typography variant="subtitle2">Purchased Books:</Typography>
                                  <Typography>{user.purchasedBooks.length}</Typography>

                                  <Typography variant="subtitle2">Payment History:</Typography>
                                  <Typography>{user.paymentHistory.length}</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                  <Typography variant="subtitle2">Download History:</Typography>
                                  {user.downloadHistory.map((d, idx) => (
                                    <Typography key={idx}>
                                      {d.title} ({new Date(d.date).toLocaleDateString()})
                                    </Typography>
                                  ))}

                                  <Typography variant="subtitle2">Saved Notes:</Typography>
                                  {user.savedNotes.map((note, idx) => (
                                    <Typography key={idx}>
                                      {note.title} - <a href={note.url}>Link</a>
                                    </Typography>
                                  ))}

                                  <Typography variant="subtitle2">Wishlist:</Typography>
                                  <Typography>{user.wishlist.length} items</Typography>
                                </Stack>
                              </Grid>
                              <Grid item xs={12}>
                                <Stack spacing={1}>
                                  <Typography variant="subtitle2">Settings:</Typography>
                                  <Typography>
                                    Notifications: {user.settings.notifications ? "On" : "Off"}, Dark
                                    Mode: {user.settings.darkMode ? "On" : "Off"}
                                  </Typography>

                                  <Typography variant="subtitle2">
                                    Last Login:
                                  </Typography>
                                  <Typography>
                                    {user.lastLogin
                                      ? new Date(user.lastLogin).toLocaleString()
                                      : "-"}
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement;
