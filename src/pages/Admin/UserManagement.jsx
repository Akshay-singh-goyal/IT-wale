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
  AccessTime as LastLoginIcon,
} from "@mui/icons-material";

const API_BASE = "https://sm-backend-8me3.onrender.com/api/admin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem("accessToken");

  /* ================= ROLE MAPPING ================= */
  const dbToUiRole = (role) => (role === "student" ? "user" : role);
  const uiRoles = ["user", "teacher", "admin"]; // Full role options

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE}/users?page=${page + 1}&limit=${rowsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(res.data.users || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Fetch users error:", err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  /* ================= BLOCK / UNBLOCK ================= */
  const toggleBlockUser = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/users/${id}/block-toggle`,
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
  const changeRole = async (id, role) => {
    try {
      await axios.put(
        `${API_BASE}/users/${id}/role`,
        { role }, // backend handles mapping
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      setSelectedUser((prev) => (prev ? { ...prev, role } : null));
    } catch (err) {
      console.error(err);
      alert("Failed to change role");
    }
  };

  /* ================= PAGINATION HANDLERS ================= */
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <Typography variant="h6">Total Users: {total}</Typography>
      </Paper>

      {/* ================= USERS TABLE ================= */}
      <Paper>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <NameIcon color="primary" />
                      {user.name}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <EmailIcon fontSize="small" />
                      {user.email}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneIcon fontSize="small" />
                      {user.mobile || "-"}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <RoleIcon fontSize="small" />
                      {dbToUiRole(user.role)}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    {user.isBlocked ? (
                      <Stack direction="row" spacing={0.5} color="error.main">
                        <BlockedIcon fontSize="small" /> Blocked
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={0.5} color="success.main">
                        <ActiveIcon fontSize="small" /> Active
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
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* ================= USER DETAILS DIALOG ================= */}
      <Dialog
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Stack spacing={2}>
              <Typography><b>Name:</b> {selectedUser.name}</Typography>
              <Typography><b>Email:</b> {selectedUser.email}</Typography>
              <Typography><b>Mobile:</b> {selectedUser.mobile || "-"}</Typography>

              {/* Role Selector */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography><b>Role:</b></Typography>
                <Select
                  size="small"
                  value={dbToUiRole(selectedUser.role)}
                  onChange={(e) =>
                    changeRole(selectedUser._id, e.target.value)
                  }
                >
                  {uiRoles.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>

              <Typography>
                <b>Status:</b> {selectedUser.isBlocked ? "Blocked" : "Active"}
              </Typography>

              <Typography>
                <LastLoginIcon fontSize="small" />{" "}
                <b>Last Login:</b>{" "}
                {selectedUser.lastLogin
                  ? new Date(selectedUser.lastLogin).toLocaleString()
                  : "-"}
              </Typography>

              <Divider />

              <Button
                variant="contained"
                color={selectedUser.isBlocked ? "success" : "error"}
                onClick={() => toggleBlockUser(selectedUser._id)}
              >
                {selectedUser.isBlocked ? "Unblock User" : "Block User"}
              </Button>

              <Divider />

              {/* Extra Info */}
              <Typography>
                <b>Completed Courses:</b>{" "}
                {selectedUser.completedCourses?.length || 0}
              </Typography>
              <Typography>
                <b>Purchased Books:</b>{" "}
                {selectedUser.purchasedBooks?.length || 0}
              </Typography>
              <Typography>
                <b>Download History:</b>{" "}
                {selectedUser.downloadHistory?.length || 0}
              </Typography>
              <Typography>
                <b>Saved Notes:</b>{" "}
                {selectedUser.savedNotes?.length || 0}
              </Typography>
              <Typography>
                <b>Wishlist:</b>{" "}
                {selectedUser.wishlist?.length || 0}
              </Typography>
              <Typography>
                <b>Payment History:</b>{" "}
                {selectedUser.paymentHistory?.length || 0}
              </Typography>
            </Stack>
          )}
        </DialogContent>

        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button variant="contained" onClick={() => setSelectedUser(null)}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
