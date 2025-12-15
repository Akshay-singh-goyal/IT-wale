// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  Divider,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Email,
  Phone,
  AdminPanelSettings,
  AccessTime,
  Person,
  People,
  Inventory2,
  QuestionAnswer,
  MoreHoriz,
  Book,
  Logout,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { socket } from "../socket"; // Socket.IO instance
// import AdminCreateBlog from "../pages/AdminCreateBlog"; // Blog Manager Component

const API_URL = "http://localhost:5000/api/admin/users";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Users");
  const [openBlogDrawer, setOpenBlogDrawer] = useState(false);

  // Chat states
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef();

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin"); // must be "true" for admin
    
  }, [navigate]);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  // ---------------- BLOCK / UNBLOCK ----------------
  const handleBlockUser = async (id, isBlocked, email) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/block/${id}`,
        { isBlocked: !isBlocked, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch {
      alert("Failed to update user status.");
    }
  };

  // ---------------- DELETE USER ----------------
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch {
      alert("Failed to delete user.");
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- FILTERED USERS ----------------
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

//   // ---------------- SOCKET.IO CHAT ----------------
//   useEffect(() => {
//     const adminId = localStorage.getItem("adminId") || "admin";
//     socket.emit("joinRoom", { userId: adminId, role: "admin" });s

//     socket.on("receiveMessage", (msg) => {
//       if (selectedUser && (msg.senderId === selectedUser._id || msg.receiverId === selectedUser._id)) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket.off("receiveMessage");
//   }, [selectedUser]);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!text.trim() || !selectedUser) return;
//     const adminId = localStorage.getItem("adminId") || "admin";
//     const payload = {
//       senderId: adminId,
//       senderName: "Admin",
//       receiverId: selectedUser._id,
//       text,
//       role: "admin",
//       timestamp: new Date(),
//     };
//     socket.emit("sendMessage", payload);
//     setMessages((prev) => [...prev, payload]);
//     setText("");
//   };

  // ---------------- SIDEBAR MENU ----------------
  const menuItems = [
    { text: "Users", icon: <People /> },
    { text: "Products", icon: <Inventory2 /> },
    { text: "Customer Queries", icon: <QuestionAnswer /> },
    { text: "Create Blog", icon: <Book /> },
    { text: "Extras", icon: <MoreHoriz /> },
  ];

  if (loading)
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* ---------------- SIDEBAR ---------------- */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight="bold">Admin Panel</Typography>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)" }} />
        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.text}>
              <ListItemButton
                onClick={() => {
                  if (item.text === "Create Blog") setOpenBlogDrawer(true);
                  else setActiveTab(item.text);
                }}
                sx={{
                  color: activeTab === item.text ? "#1976d2" : "white",
                  backgroundColor: activeTab === item.text ? "white" : "transparent",
                  m: 0.5,
                  borderRadius: 1,
                }}
              >
                <ListItemIcon sx={{ color: activeTab === item.text ? "#1976d2" : "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "white" }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">{activeTab}</Typography>
          <Button variant="contained" onClick={fetchUsers}>Refresh Data</Button>
        </Box>

        {/* ---------------- USERS TABLE ---------------- */}
        {activeTab === "Users" && (
          <>
            <TextField
              fullWidth
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 3, backgroundColor: "white" }}
            />
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Registered Users ({filteredUsers.length})</Typography>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#1976d2" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>Name</TableCell>
                      <TableCell sx={{ color: "white" }}>Email</TableCell>
                      <TableCell sx={{ color: "white" }}>Mobile</TableCell>
                      <TableCell sx={{ color: "white" }}>Role</TableCell>
                      <TableCell sx={{ color: "white" }}>Status</TableCell>
                      <TableCell sx={{ color: "white" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile || "N/A"}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell sx={{ color: user.isBlocked ? "red" : "green" }}>
                          {user.isBlocked ? "Blocked" : "Active"}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button variant="outlined" size="small" color={user.isBlocked ? "success" : "warning"}
                              onClick={() => handleBlockUser(user._id, user.isBlocked, user.email)}>
                              {user.isBlocked ? "Unblock" : "Block"}
                            </Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                            <Button variant="outlined" size="small" onClick={() => setSelectedUser(user)}>View</Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">No users found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}

        {/* ---------------- OTHER TABS ---------------- */}
        {activeTab !== "Users" && activeTab !== "Create Blog" && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">{activeTab} Page (Coming Soon)</Typography>
          </Paper>
        )}

        {/* ---------------- USER DETAILS + CHAT DIALOG ---------------- */}
        <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)} maxWidth="md" fullWidth>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <>
                <Box sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: "#1976d2" }}><Person /></Avatar>
                    <Typography variant="h6">{selectedUser.name}</Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={1}>
                    <Typography><Email fontSize="small" /> <strong>Email:</strong> {selectedUser.email}</Typography>
                    <Typography><Phone fontSize="small" /> <strong>Mobile:</strong> {selectedUser.mobile || "N/A"}</Typography>
                    <Typography><AdminPanelSettings fontSize="small" /> <strong>Role:</strong> {selectedUser.role}</Typography>
                    <Typography><AccessTime fontSize="small" /> <strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</Typography>
                    <Typography><strong>Status:</strong> {selectedUser.isBlocked ? "❌ Blocked" : "✅ Active"}</Typography>
                  </Stack>
                </Box>

                {/* ---------------- CHAT ---------------- */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Chat with {selectedUser.name}</Typography>
                  <Box sx={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", p: 1 }}>
                    {messages.map((m, i) => (
                      <Box key={i} sx={{ display: "flex", justifyContent: m.role === "admin" ? "flex-end" : "flex-start", mb: 1 }}>
                        <Paper sx={{ p: 1, maxWidth: "75%", background: m.role === "admin" ? "#d1ffd1" : "#e8e8e8", color: "#000" }}>
                          <Typography variant="body2"><strong>{m.senderName}</strong>: {m.text}</Typography>
                          <Typography variant="caption" sx={{ display: "block", textAlign: "right" }}>
                            {new Date(m.timestamp).toLocaleString()}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                    <div ref={endRef}></div>
                  </Box>

                  <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
                    <TextField fullWidth placeholder="Type message..." value={text} onChange={(e) => setText(e.target.value)} />
                    <Button variant="contained" >Send</Button>
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedUser(null)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* ---------------- BLOG DRAWER ---------------- */}
        <Drawer anchor="right" open={openBlogDrawer} onClose={() => setOpenBlogDrawer(false)}
          sx={{ "& .MuiDrawer-paper": { width: "80vw", maxWidth: 1000, p: 3 } }}>
          {/* <AdminCreateBlog /> */}
        </Drawer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
