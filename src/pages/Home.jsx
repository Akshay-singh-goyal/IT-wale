import React, { useEffect, useState, memo } from "react";
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
  Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import { motion } from "framer-motion";
import banner1 from "../Images/banner1.png";

import img1 from "../Images/banner.jpeg";

/* ================= SEO (React 19 SAFE) ================= */
const setSEO = () => {
  document.title = "The IT Wallah | Learn Online with Live Classes";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      "The IT Wallah offers live online classes, expert teachers, recorded courses and notes to grow your career."
    );
};

/* ================= STATIC DATA ================= */
const categories = [
  "Programming",
  "Business",
  "Finance",
  "Design",
  "Marketing",
  "Technology",
];

const images = [banner1]; // fixed image imports

const popularCourses = [
  { title: "Full Stack MERN Bootcamp", teacher: "Rahul Sharma", rating: 4.7 },
  { title: "Business Fundamentals", teacher: "Anil Mehta", rating: 4.6 },
  { title: "Stock Market Basics", teacher: "Aman Gupta", rating: 4.8 },
];

const teachers = [
  { name: "Pooja Singh", subject: "Maths" },
  { name: "Ankit Verma", subject: "Web Development" },
  { name: "Neha Basu", subject: "Business Studies" },
];

/* ================= COMPONENT ================= */
function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openBanner, setOpenBanner] = useState(true);
  const [index, setIndex] = useState(0);

  /* 🔐 AUTH + SEO */
  useEffect(() => {
    setSEO();
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    if (!token) setOpenHelp(true);
  }, []);

  /* ================= SLIDER HANDLERS ================= */
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f5f7fb" }}>
      {/* ================= IMAGE SLIDER ================= */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.6s ease",
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <Box
              key={i}
              component="img"
              src={img}
              alt={`slide-${i}`}
              sx={{
                width: "100%",
                height: { xs: 180, sm: 280, md: 380 }, // smaller height
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>

        {/* Left Arrow */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowBackIos />
        </IconButton>

        {/* Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* ================= HERO ================= */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#1a73e8,#6c63ff)",
          color: "white",
          py: { xs: 7, md: 10 },
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Learn Anytime, Anywhere <br />
                with <span style={{ color: "#ffeb3b" }}>The IT Wallah</span>
              </Typography>

              <Typography sx={{ opacity: 0.9, mb: 4 }}>
                Live classes • Expert teachers • Notes • Career growth
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<LiveTvIcon />}
                  sx={{
                    bgcolor: "#ffeb3b",
                    color: "#000",
                    fontWeight: 700,
                  }}
                  onClick={() =>
                    (window.location.href = isLoggedIn
                      ? "/dashboard"
                      : "/login")
                  }
                >
                  {isLoggedIn ? "Go to Dashboard" : "Join Live Class"}
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Explore Courses
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Online Learning"
                loading="lazy"
                style={{ width: "100%", maxWidth: 320, margin: "auto" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= SEARCH ================= */}
      <Container sx={{ mt: -4 }}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
          <TextField
            fullWidth
            placeholder="Search courses, teachers, subjects..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
        </Card>
      </Container>

      {/* ================= MARQUEE ================= */}
      <Box
        sx={{ width: "100%", background: "#6C63FF", py: 2, overflow: "hidden" }}
      >
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

      {/* ================= CATEGORIES ================= */}
      <Container sx={{ py: 7 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Popular Categories
        </Typography>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={6} sm={4} md={2} key={cat}>
              <Card
                sx={{
                  textAlign: "center",
                  py: 3,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <SchoolIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                <Typography fontWeight={600}>{cat}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= POPULAR COURSES ================= */}
      <Container sx={{ pb: 7 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Popular Courses
        </Typography>
        <Grid container spacing={3}>
          {popularCourses.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.title}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {c.title}
                  </Typography>
                  <Typography sx={{ opacity: 0.7 }}>{c.teacher}</Typography>
                  <Rating value={c.rating} precision={0.1} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= TEACHERS ================= */}
      <Container sx={{ pb: 8 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Top Teachers
        </Typography>
        <Grid container spacing={3}>
          {teachers.map((t) => (
            <Grid item xs={12} sm={4} key={t.name}>
              <Card sx={{ textAlign: "center", py: 4, borderRadius: 3 }}>
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

      {/* ================= HELP BUTTON ================= */}
      {!isLoggedIn && (
        <Box sx={{ position: "fixed", bottom: 30, right: 30, zIndex: 1000 }}>
          <Button
            startIcon={<HelpOutlineIcon />}
            variant="contained"
            sx={{ bgcolor: "#ff4081", borderRadius: 50, px: 3 }}
            onClick={() => setOpenHelp(true)}
          >
            Need Help?
          </Button>
        </Box>
      )}

      {/* ================= HELP POPUP ================= */}
      <Dialog open={openHelp && !isLoggedIn} onClose={() => setOpenHelp(false)}>
        <DialogTitle fontWeight={700}>Login Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please login or register to access live classes and courses.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </Button>
          <Button onClick={() => setOpenHelp(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= BANNER ================= */}
      <Dialog open={openBanner} onClose={() => setOpenBanner(false)}>
        <Box
          sx={{ position: "relative", cursor: "pointer" }}
          onClick={() => (window.location.href = "/join-batch")}
        >
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8, bgcolor: "white" }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenBanner(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={img1} alt="Special Offer" style={{ width: "100%" }} />
        </Box>
      </Dialog>
    </Box>
  );
}

export default memo(HomePage);
