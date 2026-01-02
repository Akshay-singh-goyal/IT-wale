import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  TablePagination,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  VerifiedUser as RoleIcon,
  AccountCircle as NameIcon,
  CheckCircle as ActiveIcon,
  Block as BlockedIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

const API_BASE = "https://sm-backend-8me3.onrender.com/api/admin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem("accessToken");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      if (!token) return alert("Login again");

      const res = await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data?.users || res.data || []);
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

  /* ================= BLOCK / UNBLOCK ================= */
  const toggleBlockUser = async (userId) => {
    try {
      await axios.put(
        `${API_BASE}/users/${userId}/block-toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update block status");
    }
  };

  /* ================= ROLE CHANGE ================= */
  const changeRole = async (userId, role) => {
    try {
      await axios.put(
        `${API_BASE}/users/${userId}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to change role");
    }
  };

  if (loading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        User Management (Admin)
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6">Total Users: {users.length}</Typography>
      </Paper>

      {/* ================= TABLE ================= */}
      <Paper>
        <TableContainer>
          <Table stickyHeader>
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <NameIcon color="primary" /> {user.name}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <EmailIcon /> {user.email}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <AdminIcon /> {user.role}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {user.isBlocked ? (
                        <Stack direction="row" spacing={1} color="error.main">
                          <BlockedIcon /> Blocked
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1} color="success.main">
                          <ActiveIcon /> Active
                        </Stack>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton onClick={() => setSelectedUser(user)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
        />
      </Paper>

      {/* ================= USER DETAILS ================= */}
      <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Stack spacing={2}>
              <Typography><b>Name:</b> {selectedUser.name}</Typography>
              <Typography><b>Email:</b> {selectedUser.email}</Typography>

              {/* ROLE CHANGE */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography><b>Role:</b></Typography>
                <Select
                  size="small"
                  value={selectedUser.role}
                  onChange={(e) => changeRole(selectedUser._id, e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </Stack>

              <Divider />

              {/* BLOCK / UNBLOCK */}
              <Button
                variant="contained"
                color={selectedUser.isBlocked ? "success" : "error"}
                onClick={() => toggleBlockUser(selectedUser._id)}
              >
                {selectedUser.isBlocked ? "Unblock User" : "Block User"}
              </Button>
            </Stack>
          )}
        </DialogContent>

        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button onClick={() => setSelectedUser(null)}>Close</Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
