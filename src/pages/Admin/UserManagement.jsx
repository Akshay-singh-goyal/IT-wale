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
  Info as InfoIcon,
  CheckCircle as ActiveIcon,
  Block as BlockedIcon,
  Notes as NotesIcon,
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
        const res = await axios.get(`${API_BASE}/users`, {
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

    fetchUsers();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress size={60} thickness={5} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary.dark">
        User Details
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "primary.light",
          color: "primary.contrastText",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Total Users: {users.length}
        </Typography>
      </Paper>

      <Paper elevation={3}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mobile</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                  Actions
                </TableCell>
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
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <NameIcon color="primary" />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {user.name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <EmailIcon color="action" fontSize="small" />
                        <Typography variant="body2" noWrap>
                          {user.email}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <PhoneIcon color="action" fontSize="small" />
                        <Typography variant="body2">{user.mobile || "-"}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <RoleIcon color="info" fontSize="small" />
                        <Typography
                          variant="body2"
                          sx={{ textTransform: "capitalize", fontWeight: "medium" }}
                        >
                          {user.role}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {user.isBlocked ? (
                        <Stack direction="row" alignItems="center" spacing={0.5} color="error.main">
                          <BlockedIcon fontSize="small" />
                          <Typography variant="body2" fontWeight={600}>
                            Blocked
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack direction="row" alignItems="center" spacing={0.5} color="success.main">
                          <ActiveIcon fontSize="small" />
                          <Typography variant="body2" fontWeight={600}>
                            Active
                          </Typography>
                        </Stack>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                          }}
                          size="large"
                        >
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
          rowsPerPageOptions={[5, 10, 20, 50]}
          sx={{ bgcolor: "background.paper" }}
        />
      </Paper>

      {/* User Details Modal */}
      <Dialog
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        maxWidth="md"
        fullWidth
        scroll="paper"
        aria-labelledby="user-details-dialog-title"
      >
        <DialogTitle
          id="user-details-dialog-title"
          sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}
        >
          User Details
        </DialogTitle>

        <DialogContent dividers>
          {selectedUser && (
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Box
                  component="img"
                  src={selectedUser.avatar}
                  alt={`${selectedUser.name} avatar`}
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: 3,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <NameIcon color="primary" />
                    <Typography variant="h6" fontWeight={700}>
                      {selectedUser.name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon color="action" />
                    <Typography variant="body1">{selectedUser.email}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon color="action" />
                    <Typography variant="body1">{selectedUser.mobile || "-"}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <RoleIcon color="info" />
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "capitalize", fontWeight: "medium" }}
                    >
                      {selectedUser.role}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    {selectedUser.isBlocked ? (
                      <>
                        <BlockedIcon color="error" />
                        <Typography variant="body1" fontWeight={600} color="error.main">
                          Blocked
                        </Typography>
                      </>
                    ) : (
                      <>
                        <ActiveIcon color="success" />
                        <Typography variant="body1" fontWeight={600} color="success.main">
                          Active
                        </Typography>
                      </>
                    )}
                  </Stack>

                  <Divider />

                  <Stack direction="row" spacing={1} alignItems="center">
                    <BookIcon color="primary" />
                    <Typography variant="body1" fontWeight={600}>
                      Completed Courses:
                    </Typography>
                    <Typography variant="body1">{selectedUser.completedCourses.length}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <BookIcon color="primary" />
                    <Typography variant="body1" fontWeight={600}>
                      Purchased Books:
                    </Typography>
                    <Typography variant="body1">{selectedUser.purchasedBooks.length}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <HistoryIcon color="primary" />
                    <Typography variant="body1" fontWeight={600}>
                      Payment History:
                    </Typography>
                    <Typography variant="body1">{selectedUser.paymentHistory.length}</Typography>
                  </Stack>

                  <Divider />

                  <Typography variant="subtitle1" fontWeight={700} color="primary.main" mb={1}>
                    Download History
                  </Typography>
                  {selectedUser.downloadHistory.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No downloads
                    </Typography>
                  ) : (
                    selectedUser.downloadHistory.map((d, idx) => (
                      <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                        {d.title} —{" "}
                        <Typography
                          component="span"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          {new Date(d.date).toLocaleDateString()}
                        </Typography>
                      </Typography>
                    ))
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" fontWeight={700} color="primary.main" mb={1}>
                    Saved Notes
                  </Typography>
                  {selectedUser.savedNotes.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No saved notes
                    </Typography>
                  ) : (
                    selectedUser.savedNotes.map((note, idx) => (
                      <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                        {note.title} —{" "}
                        <a href={note.url} target="_blank" rel="noreferrer" style={{ color: "#1976d2" }}>
                          Link
                        </a>
                      </Typography>
                    ))
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" spacing={1} alignItems="center">
                    <WishlistIcon color="primary" />
                    <Typography variant="body1" fontWeight={600}>
                      Wishlist:
                    </Typography>
                    <Typography variant="body1">{selectedUser.wishlist.length} items</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <SettingsIcon color="primary" />
                    <Typography variant="body1" fontWeight={600}>
                      Settings:
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Notifications: {selectedUser.settings.notifications ? "On" : "Off"} &nbsp;|&nbsp; Dark Mode:{" "}
                      {selectedUser.settings.darkMode ? "On" : "Off"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <LastLoginIcon color="primary" />
                    <Typography variant="body1" fontWeight={600}>
                      Last Login:
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {selectedUser.lastLogin
                        ? new Date(selectedUser.lastLogin).toLocaleString()
                        : "-"}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" onClick={() => setSelectedUser(null)}>
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
