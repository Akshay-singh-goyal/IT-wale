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
    if (storedUser) setUser(JSON.parse(storedUser));

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
  // PROFILE MENU HANDLERS
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
        transition: "0.3s ease",
        py: 0.5,
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
            alt="logo"
            width="32"
          />
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: "#3a3a3a",
              }}
            >
              ITWale
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#6c6c6c" }}>
              Learn • Grow • Succeed
            </Typography>
          </Box>
        </Box>

        {/* DESKTOP MENU */}
        {user && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Typography onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
              Home
            </Typography>
            <Typography onClick={() => navigate("/courses")} sx={{ cursor: "pointer" }}>
              Courses
            </Typography>
            <Typography onClick={() => navigate("/books")} sx={{ cursor: "pointer" }}>
              Books
            </Typography>
            <Typography onClick={() => navigate("/contact-us")} sx={{ cursor: "pointer" }}>
              Contact
            </Typography>
            <Typography onClick={() => navigate("/about")} sx={{ cursor: "pointer" }}>
              About
            </Typography>
            <Typography onClick={() => navigate("/join-batch")} sx={{ cursor: "pointer" }}>
              Join Batch
            </Typography>
          </Box>
        )}

        {/* RIGHT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* DARK MODE TOGGLE */}
          <Switch checked={darkMode} onChange={toggleDarkMode} />

          {/* NOTIFICATION BELL */}
          {user && (
            <Badge badgeContent={3} color="error">
              <NotificationsIcon sx={{ cursor: "pointer" }} />
            </Badge>
          )}

          {/* LOGIN / PROFILE DROPDOWN */}
          {!user ? (
            <>
              <Button onClick={() => navigate("/login")}>Sign In</Button>
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  background: "linear-gradient(135deg,#7b3eff,#6242ff)",
                  color: "white",
                  px: 2,
                }}
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Avatar sx={{ bgcolor: "#7b3eff", cursor: "pointer" }} onClick={openMenu}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                <MenuItem disabled>{user.name}</MenuItem>
                <Divider />

                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/courses")}>Courses</MenuItem>
                <MenuItem onClick={() => navigate("/books")}>Books</MenuItem>
                <MenuItem onClick={() => navigate("/contact")}>Contact</MenuItem>
                <MenuItem onClick={() => navigate("/about")}>About</MenuItem>

                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {/* MOBILE MENU BUTTON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: darkMode ? "#fff" : "#000" }}
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
                <ListItem button>{user.name}</ListItem>
                <ListItem button onClick={() => navigate("/")}>
                  Home
                </ListItem>
                <ListItem button onClick={() => navigate("/courses")}>
                  Courses
                </ListItem>
                <ListItem button onClick={() => navigate("/books")}>
                  Books
                </ListItem>
                <ListItem button onClick={() => navigate("/contact")}>
                  Contact
                </ListItem>
                <ListItem button onClick={() => navigate("/about")}>
                  About
                </ListItem>
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
