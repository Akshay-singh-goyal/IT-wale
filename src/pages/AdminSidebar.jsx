import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#1a73e8",
        color: "white",
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>
        IT Wale Admin
      </Typography>

      <SidebarButton
        icon={<DashboardIcon />}
        label="Dashboard"
        onClick={() => navigate("/admin")}
      />

      <SidebarButton
        icon={<PeopleIcon />}
        label="Users"
        onClick={() => navigate("/admin/users")}
      />

      <SidebarButton
        icon={<SupportIcon />}
        label="Support"
        onClick={() => navigate("/admin/support")}
      />

      <Button
        startIcon={<LogoutIcon />}
        sx={{ color: "white", mt: 4 }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
}

const SidebarButton = ({ icon, label, onClick }) => (
  <Button
    startIcon={icon}
    fullWidth
    onClick={onClick}
    sx={{
      color: "white",
      justifyContent: "flex-start",
      mb: 1,
      "&:hover": {
        bgcolor: "rgba(255,255,255,0.15)",
      },
    }}
  >
    {label}
  </Button>
);
