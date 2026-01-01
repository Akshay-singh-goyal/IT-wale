// src/pages/Admin/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
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
  FormControl,
  Select,
  MenuItem,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import {
  Block,
  CheckCircle,
  Delete,
  ExpandMore,
  ExpandLess,
  Visibility,
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
  const [selectedUser, setSelectedUser] = useState(null);
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

  const openDetailModal = (user) => {
    setSelectedUser(user);
  };
  const closeDetailModal = () => setSelectedUser(null);

  /* ===== Pagination ===== */
  const handleChangePage = (event, newPage) => setPage(newPage);
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
      {/* Top Stats */}
      <Typography variant="h4" mb={2}>
        User Management
      </Typography>
      <Paper sx={{ p: 2, mb: 3, bgcolor: "#e3f2fd" }}>
        <Typography variant="h6">
          Total Users: {users.length}
        </Typography>
      </Paper>

      {/* Users Table */}
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
                        <Tooltip title="View Details">
                          <IconButton onClick={() => openDetailModal(user)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row for quick info */}
                    <TableRow>
                      <TableCell colSpan={7} sx={{ p: 0, borderBottom: "1px solid #eee" }}>
                        <Collapse
                          in={expandedRows.includes(user._id)}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                            <Typography variant="subtitle2">Quick Info:</Typography>
                            <Stack spacing={1}>
                              <Typography>Email: {user.email}</Typography>
                              <Typography>Mobile: {user.mobile || "-"}</Typography>
                              <Typography>
                                Completed Courses: {user.completedCourses.length}
                              </Typography>
                              <Typography>
                                Purchased Books: {user.purchasedBooks.length}
                              </Typography>
                            </Stack>
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

      {/* Modal for full user details */}
      <Dialog
        open={Boolean(selectedUser)}
        onClose={closeDetailModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <img
                  src={selectedUser.avatar}
                  alt="avatar"
                  width={120}
                  style={{ borderRadius: "50%" }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack spacing={1}>
                  <Typography><b>Name:</b> {selectedUser.name}</Typography>
                  <Typography><b>Email:</b> {selectedUser.email}</Typography>
                  <Typography><b>Mobile:</b> {selectedUser.mobile || "-"}</Typography>
                  <Typography><b>Role:</b> {selectedUser.role}</Typography>
                  <Typography><b>Status:</b> {selectedUser.isBlocked ? "Blocked" : "Active"}</Typography>
                  <Typography><b>Completed Courses:</b> {selectedUser.completedCourses.length}</Typography>
                  <Typography><b>Purchased Books:</b> {selectedUser.purchasedBooks.length}</Typography>
                  <Typography><b>Payment History:</b> {selectedUser.paymentHistory.length}</Typography>
                  <Typography><b>Download History:</b></Typography>
                  {selectedUser.downloadHistory.map((d, idx) => (
                    <Typography key={idx}>
                      {d.title} ({new Date(d.date).toLocaleDateString()})
                    </Typography>
                  ))}
                  <Typography><b>Saved Notes:</b></Typography>
                  {selectedUser.savedNotes.map((note, idx) => (
                    <Typography key={idx}>
                      {note.title} - <a href={note.url}>Link</a>
                    </Typography>
                  ))}
                  <Typography><b>Wishlist:</b> {selectedUser.wishlist.length} items</Typography>
                  <Typography><b>Settings:</b> Notifications: {selectedUser.settings.notifications ? "On" : "Off"}, Dark Mode: {selectedUser.settings.darkMode ? "On" : "Off"}</Typography>
                  <Typography><b>Last Login:</b> {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : "-"}</Typography>
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={closeDetailModal} variant="contained">Close</Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
