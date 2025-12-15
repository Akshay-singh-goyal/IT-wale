import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export default function AdminTopbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box
      sx={{
        height: 60,
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>Welcome, Admin</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar>{user?.name?.charAt(0)}</Avatar>
        <Typography>{user?.name}</Typography>
      </Box>
    </Box>
  );
}
