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
  Grid,
  Stack,
  Button,
  TablePagination,
  Divider,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  VerifiedUser as RoleIcon,
  AccountCircle as NameIcon,
  CheckCircle as ActiveIcon,
  Block as BlockedIcon,
  Book as BookIcon,
  History as HistoryIcon,
  Star as WishlistIcon,
  Settings as SettingsIcon,
  AccessTime as LastLoginIcon,
} from "@mui/icons-material";

const API_BASE = "https://sm-backend-8me3.onrender.com/api/admin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("No token found. Please login again.");
          return;
        }

        const res = await axios.get(`${API_BASE}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ SAFE MERGE (backend may return array or { users: [] })
        setUsers(res.data?.users || res.data || []);
      } catch (err) {
        console.error("Fetch users error:", err);
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        User Details
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6">Total Users: {users.length}</Typography>
      </Paper>

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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user._id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => setSelectedUser(user)}
                  >
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
                        {user.role}
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
                        <IconButton onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}>
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
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* USER DETAILS DIALOG */}
      <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} maxWidth="md" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Stack spacing={2}>
              <Typography><b>Name:</b> {selectedUser.name}</Typography>
              <Typography><b>Email:</b> {selectedUser.email}</Typography>
              <Typography><b>Role:</b> {selectedUser.role}</Typography>
              <Typography><b>Status:</b> {selectedUser.isBlocked ? "Blocked" : "Active"}</Typography>

              <Divider />

              <Typography><b>Completed Courses:</b> {selectedUser.completedCourses?.length || 0}</Typography>
              <Typography><b>Purchased Books:</b> {selectedUser.purchasedBooks?.length || 0}</Typography>
              <Typography><b>Payment History:</b> {selectedUser.paymentHistory?.length || 0}</Typography>
              <Typography><b>Wishlist:</b> {selectedUser.wishlist?.length || 0}</Typography>

              <Typography>
                <b>Last Login:</b>{" "}
                {selectedUser.lastLogin
                  ? new Date(selectedUser.lastLogin).toLocaleString()
                  : "-"}
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
