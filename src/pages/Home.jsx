import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  TextField,
  Card,
  CardContent,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import img1 from "../Images/banner.jpeg";

// ⭐ Dummy Data
const categories = [
  "Programming",
  "Business",
  "Finance",
  "Design",
  "Marketing",
  "Technology",
];

const popularCourses = [
  { title: "Full Stack MERN Bootcamp", teacher: "Rahul Sharma", rating: 4.7 },
  { title: "Business Fundamentals", teacher: "Anil Mehta", rating: 4.6 },
  { title: "Stock Market Basics", teacher: "Aman Gupta", rating: 4.8 },
];

const teachers = [
  { name: "Pooja Singh", subject: "Maths" },
  { name: "Ankit Verma", subject: "Web Dev" },
  { name: "Neha Basu", subject: "Business" },
];

export default function HomePage() {
  const [openHelp, setOpenHelp] = useState(false);
  const [openBanner, setOpenBanner] = useState(true); // ⭐ always true

  const handleOpenHelp = () => setOpenHelp(true);
  const handleCloseHelp = () => setOpenHelp(false);
  const handleCloseBanner = () => setOpenBanner(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (!isLoggedIn) {
      setOpenHelp(true);
      setOpenBanner(true);
    } else {
      // ⭐ login hone ke baad bhi banner dikhana hai
      setOpenBanner(true);
    }
  }, [isLoggedIn]);

  return (
    <Box sx={{ width: "100%", bgcolor: "#f8f9fa" }}>

      {/* ⭐ HERO SECTION */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#1a73e8",
          color: "white",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Learn Anytime, Anywhere with <br />
                <span style={{ color: "#ffeb3b" }}>IT Wale</span>
              </Typography>

              <Typography sx={{ opacity: 0.9, mb: 3 }}>
                Join live classes, watch recorded lectures, download notes, and
                grow your career from home.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  bgcolor: "#ffeb3b",
                  color: "#000",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#ffe92a" },
                }}
              >
                Join Live Class
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Hero"
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  display: "block",
                  margin: "0 auto",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ⭐ SEARCH BAR */}
      <Container sx={{ mt: -4 }}>
        <Box
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            fullWidth
            label="Search for courses, teachers, subjects..."
            variant="outlined"
          />
        </Box>
      </Container>

      {/* ⭐ PERFECT CONTINUOUS MARQUEE */}
      <Box sx={{ width: "100%", background: "#6C63FF", py: 2, overflow: "hidden" }}>
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          style={{ whiteSpace: "nowrap", display: "inline-block" }}
        >
          {[...categories, ...categories].map((c, i) => (
            <Typography
              key={i}
              sx={{ display: "inline-block", mx: 4, color: "white", fontSize: 18 }}
            >
              • {c}
            </Typography>
          ))}
        </motion.div>
      </Box>

      {/* ⭐ CATEGORIES */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Categories
        </Typography>

        <Grid container spacing={2}>
          {categories.map((cat, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                  fontWeight: 600,
                }}
              >
                {cat}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ⭐ HELP BUTTON ONLY WHEN NOT LOGGED IN */}
      { (
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 999,
          }}
        >
          <Button
            onClick={handleOpenHelp}
            variant="contained"
            sx={{
              bgcolor: "#ff4081",
              color: "white",
              fontWeight: 600,
              borderRadius: "50px",
              px: 3,
              py: 1.2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#f50057" },
            }}
          >
            Need Help?
          </Button>
        </Box>
      )}

      {/* ⭐ POPULAR COURSES */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Popular Courses
        </Typography>

        <Grid container spacing={3}>
          {popularCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 3, p: 1 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography sx={{ opacity: 0.8 }}>{course.teacher}</Typography>

                  <Rating
                    value={course.rating}
                    precision={0.1}
                    readOnly
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ⭐ HELP POPUP */}
      <Dialog open={openHelp && !isLoggedIn} onClose={handleCloseHelp}>
        <DialogTitle sx={{ fontWeight: 700 }}>Need Help?</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            To access live classes, courses, notes, and teachers – you need to
            create an account.
          </Typography>

          <Typography sx={{ fontWeight: 600, color: "#1a73e8" }}>
            Please Register or Login to continue.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: "#1a73e8" }}
            onClick={() => {
              handleCloseHelp();
              window.location.href = "/register";
            }}
          >
            Register
          </Button>

          <Button onClick={handleCloseHelp}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ⭐ BANNER POPUP (Always visible unless closed) */}
     {/* ⭐ BANNER POPUP (Clickable Banner Redirect) */}
<Dialog open={openBanner} onClose={handleCloseBanner} maxWidth="sm" fullWidth>
  <Box sx={{ position: "relative", cursor: "pointer" }} onClick={() => {
      handleCloseBanner();
      window.location.href = "/join-batch"; // 👉 Yaha redirect hoga
    }}
  >
    {/* Close Button */}
    <IconButton
      onClick={(e) => {
        e.stopPropagation(); // ❗ click bubble stop so banner click not trigger
        handleCloseBanner();
      }}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        bgcolor: "white",
        zIndex: 10,
        "&:hover": { bgcolor: "#f0f0f0" },
      }}
    >
      <CloseIcon />
    </IconButton>

    {/* Clickable Banner Image */}
    <img
      src={img1}
      alt="Banner"
      style={{ width: "100%", borderRadius: "6px 6px 0 0" }}
    />

    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Special Announcement!
      </Typography>
      <Typography sx={{ mt: 1 }}>
        New courses, discounts, and special batches launching this week.
        Tap here to know more.
      </Typography>
    </Box>
  </Box>
</Dialog>


      {/* ⭐ TOP TEACHERS */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Top Teachers
        </Typography>

        <Grid container spacing={3}>
          {teachers.map((t, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ textAlign: "center", borderRadius: 3, py: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "#1a73e8",
                  }}
                >
                  {t.name.charAt(0)}
                </Avatar>

                <Typography variant="h6">{t.name}</Typography>
                <Typography sx={{ opacity: 0.7 }}>{t.subject}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
}
