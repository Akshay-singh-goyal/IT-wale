import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  Divider,
  Badge,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";

import banner from "../Images/logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  // ==========================
  // CHECK LOGIN USER & THEME
  // ==========================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.style.background = "#121212";
    } else {
      document.body.style.background = "#fff";
    }
  }, []);

  // ==========================
  // DARK MODE HANDLER
  // ==========================
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.style.background = newMode ? "#121212" : "#fff";
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // ==========================
  // LOGOUT
  // ==========================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // ==========================
  // PROFILE MENU
  // ==========================
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1300px",
          width: "100%",
          mx: "auto",
        }}
      >
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={banner} alt="logo" width="54" />
          <Box>
            <Typography fontSize="11px" color="gray">
              Learn • Grow • Succeed
            </Typography>
          </Box>
        </Box>

        {/* DESKTOP MENU */}
        {user && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/book")}>
              Courses
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/books")}>
              Books
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/contact-us")}>
              Contact
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/about")}>
              About
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/join-batch")}>
             Batch
            </Typography>
          </Box>
        )}

        {/* RIGHT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch checked={darkMode} onChange={toggleDarkMode} />

          {user && (
            <Badge badgeContent={3} color="error">
              <NotificationsIcon sx={{ cursor: "pointer" }} />
            </Badge>
          )}

          {!user ? (
            <>
              <Button onClick={() => navigate("/login")}>Sign In</Button>
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  background: "linear-gradient(135deg,#7b3eff,#6242ff)",
                  color: "#fff",
                }}
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Avatar
                sx={{ bgcolor: "#7b3eff", cursor: "pointer" }}
                onClick={openMenu}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                <MenuItem disabled>{user?.name}</MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/courses")}>Courses</MenuItem>
                <MenuItem onClick={() => navigate("/books")}>Books</MenuItem>
                <MenuItem onClick={() => navigate("/join-batch")}>Batch</MenuItem>
                <MenuItem onClick={() => navigate("/contact-us")}>Contact</MenuItem>
                <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {/* MOBILE MENU ICON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <List>
            {!user ? (
              <>
                <ListItem button onClick={() => navigate("/login")}>
                  Sign In
                </ListItem>
                <ListItem button onClick={() => navigate("/register")}>
                  Register
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>{user?.name}</ListItem>
                <ListItem button onClick={() => navigate("/")}>Home</ListItem>
                <ListItem button onClick={() => navigate("/courses")}>Courses</ListItem>
                <ListItem button onClick={() => navigate("/books")}>Books</ListItem>
                <ListItem button onClick={() => navigate("/contact-us")}>Contact</ListItem>
                <ListItem button onClick={() => navigate("/about")}>About</ListItem>
                <ListItem button onClick={handleLogout} sx={{ color: "red" }}>
                  Logout
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
