// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AdminPanelSettings,
  Dashboard as DashboardIcon,
  People,
  MailOutline,
  ContactMail,
  Logout,
  School,
  NoteAdd, // NEW: Icon for Create Notes
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ===== PAGES ===== */
import DashboardHome from "./DashboardHome";
import UserManagement from "./UserManagement";
import AddUniversity from "./AddUniversity";
import CreateNotes from "./CreateNotes"; // NEW: Import CreateNotes page

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  /* ===== AUTH CHECK ===== */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ===== RENDER CONTENT ===== */
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;

      case "users":
        return <UserManagement />;

      case "addUniversity":
        return <AddUniversity />;

      case "createNotes": // NEW SECTION
        return <CreateNotes />;

      case "contact":
        return (
          <Typography variant="h5">
            Contact Messages (Coming Soon)
          </Typography>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* ===== SIDEBAR ===== */}
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
            <AdminPanelSettings sx={{ mr: 1 }} />
            Admin Panel
          </Typography>
        </Box>

        <Divider />

        <List>
          <ListItemButton onClick={() => setActiveSection("dashboard")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("users")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("addUniversity")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <School />
            </ListItemIcon>
            <ListItemText primary="Add University" />
          </ListItemButton>

          {/* NEW: Create Notes Button */}
          <ListItemButton onClick={() => setActiveSection("createNotes")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <NoteAdd />
            </ListItemIcon>
            <ListItemText primary="Create Notes" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("registrations")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <MailOutline />
            </ListItemIcon>
            <ListItemText primary="Registrations" />
          </ListItemButton>

          <ListItemButton onClick={() => setActiveSection("contact")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ContactMail />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>

          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ===== CONTENT ===== */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {renderSection()}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
