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
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ICONS */
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import banner from "../Images/logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const theme = localStorage.getItem("theme") === "dark";
    setDarkMode(theme);
    document.body.style.background = theme ? "#121212" : "#fff";
  }, []);

  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    document.body.style.background = mode ? "#121212" : "#fff";
    localStorage.setItem("theme", mode ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const navItem = {
    display: "flex",
    alignItems: "center",
    gap: 0.7,
    cursor: "pointer",
    fontWeight: 500,
    transition: "0.3s",
    "&:hover": {
      color: "#7b3eff",
      transform: "translateY(-2px)",
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: darkMode ? "#1c1c1c" : "#ffffff",
        color: darkMode ? "#fff" : "#000",
        borderBottom: "1px solid",
        borderColor: darkMode ? "#333" : "#eee",
      }}
    >
      <Toolbar sx={{ maxWidth: "1300px", mx: "auto", width: "100%" }}>
        {/* LOGO */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={banner} alt="logo" width="45" />
          <Typography fontSize="12px" color="gray">
            Learn • Grow • Succeed
          </Typography>
        </Box>

        {/* DESKTOP NAV */}
        {user && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, ml: 4 }}>
            <Typography sx={navItem} onClick={() => navigate("/")}>
              <HomeIcon fontSize="small" /> Home
            </Typography>
            <Typography sx={navItem} onClick={() => navigate("/courses")}>
              <SchoolIcon fontSize="small" /> Courses
            </Typography>
            <Typography sx={navItem} onClick={() => navigate("/books")}>
              <MenuBookIcon fontSize="small" /> Books
            </Typography>
            <Typography sx={navItem} onClick={() => navigate("/notes")}>
              <DescriptionIcon fontSize="small" /> Notes
            </Typography>
            <Typography sx={navItem} onClick={() => navigate("/join-batch")}>
              <GroupsIcon fontSize="small" /> Batch
            </Typography>
            <Typography sx={navItem} onClick={() => navigate("/contact-us")}>
              <ContactMailIcon fontSize="small" /> Contact
            </Typography>
            <Typography sx={navItem} onClick={() => navigate("/about")}>
              <InfoIcon fontSize="small" /> About
            </Typography>
          </Box>
        )}

        {/* RIGHT */}
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1.5 }}>
          <Switch checked={darkMode} onChange={toggleDarkMode} />

          {user && (
            <Badge badgeContent={3} color="error">
              <NotificationsIcon sx={{ cursor: "pointer" }} />
            </Badge>
          )}

          {!user ? (
            <>
              <Button startIcon={<LoginIcon />} onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button
                startIcon={<PersonAddIcon />}
                onClick={() => navigate("/register")}
                sx={{
                  color: "#fff",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg,#7b3eff,#6242ff)",
                }}
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Typography fontSize="14px">
                Hi, <strong>{user.name}</strong>
              </Typography>

              <Avatar
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  bgcolor: "#7b3eff",
                  cursor: "pointer",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem disabled>{user.name}</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {/* MOBILE ICON */}
          <IconButton sx={{ display: { md: "none" } }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ my: 2 }} />

          <List>
            {user ? (
              <>
                <ListItem>
                  <ListItemText primary={`Hi, ${user.name}`} />
                </ListItem>
                <Divider />

                {[
                  ["Home", "/", <HomeIcon />],
                  ["Courses", "/courses", <SchoolIcon />],
                  ["Books", "/books", <MenuBookIcon />],
                  ["Notes", "/notes", <DescriptionIcon />],
                  ["Batch", "/join-batch", <GroupsIcon />],
                  ["Contact", "/contact-us", <ContactMailIcon />],
                  ["About", "/about", <InfoIcon />],
                ].map(([text, path, icon]) => (
                  <ListItem button key={text} onClick={() => navigate(path)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}

                <Divider />
                <ListItem button onClick={handleLogout} sx={{ color: "red" }}>
                  <ListItemIcon>
                    <LogoutIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button onClick={() => navigate("/login")}>
                  <ListItemIcon><LoginIcon /></ListItemIcon>
                  <ListItemText primary="Sign In" />
                </ListItem>
                <ListItem button onClick={() => navigate("/register")}>
                  <ListItemIcon><PersonAddIcon /></ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
