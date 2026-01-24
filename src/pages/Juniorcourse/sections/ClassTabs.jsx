import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalculateIcon from "@mui/icons-material/Calculate";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const courses = [
  {
    title: "After-School",
    desc: "Daily learning that builds strong academic foundations.",
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b",
    icon: <SchoolIcon />,
    color: "#ff6f3c",
    details: ["Class 3-8", "CBSE / ICSE", "6 Days"],
  },
  {
    title: "Learn English",
    desc: "Speak confidently with Cambridge-aligned programs.",
    img: "https://images.unsplash.com/photo-1588075592446-265fd1e5b1a6",
    icon: <MenuBookIcon />,
    color: "#4a90e2",
    details: ["Class 1-8", "4-5 Kids", "CEFR"],
  },
  {
    title: "Maths Learning",
    desc: "Fun maths that sharpens logic & mental skills.",
    img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178",
    icon: <CalculateIcon />,
    color: "#2ecc71",
    details: ["Class 1-8", "10-15 Kids", "Mental Maths"],
  },
];

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: "#fffaf5", py: 8 }}>

      {/* ================= HERO ================= */}
      <Grid container spacing={6} alignItems="center" px={{ xs: 2, md: 8 }}>
        {/* Left */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: "#2d2d2d", mb: 2 }}
          >
            Learning Kids Actually Love 🎉
          </Typography>

          <Typography sx={{ color: "#555", fontSize: "1.1rem", mb: 3 }}>
            Live interactive classes for young minds, powered by expert teachers
            and playful learning methods.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: "30px",
                bgcolor: "#ff6f3c",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { bgcolor: "#ff5722" },
              }}
              variant="contained"
            >
              Book Free Demo
            </Button>

            <Button
              size="large"
              startIcon={<PlayCircleIcon />}
              sx={{
                px: 3,
                borderRadius: "30px",
                color: "#ff6f3c",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Watch Video
            </Button>
          </Stack>
        </Grid>

        {/* Right – Cartoon Mascot */}
        <Grid item xs={12} md={6} textAlign="center">
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/1998/1998610.png"
            alt="Kids Mascot"
            sx={{
              width: { xs: "70%", md: "55%" },
              animation: "float 3s ease-in-out infinite",
            }}
          />
        </Grid>
      </Grid>

      {/* ================= COURSES (ONE LINE) ================= */}
      <Grid
        container
        spacing={4}
        mt={8}
        px={{ xs: 2, md: 8 }}
        justifyContent="center"
      >
        {courses.map((c, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "24px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-12px)",
                },
              }}
            >
              <CardMedia component="img" height="200" image={c.img} />

              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: c.color,
                      color: "#fff",
                      p: 1,
                      borderRadius: "50%",
                    }}
                  >
                    {c.icon}
                  </Box>
                  <Typography fontWeight="bold">{c.title}</Typography>
                </Stack>

                <Typography sx={{ mt: 1.5, color: "#555" }}>
                  {c.desc}
                </Typography>

                <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                  {c.details.map((d, idx) => (
                    <Chip
                      key={idx}
                      label={d}
                      sx={{ bgcolor: "#f2f2f2", fontSize: "0.75rem" }}
                    />
                  ))}
                </Stack>

                <Button
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.2,
                    borderRadius: "20px",
                    bgcolor: c.color,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { opacity: 0.9 },
                  }}
                  variant="contained"
                >
                  Book Demo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= VIDEO DEMO ================= */}
      <Box mt={10} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3}>
          See How Kids Learn With Fun 🎥
        </Typography>

        <Box
          sx={{
            width: "80%",
            maxWidth: "800px",
            mx: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
        >
          <iframe
            width="100%"
            height="420"
            src="https://www.youtube.com/embed/ysz5S6PUM-U"
            title="Demo Video"
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      </Box>

      {/* floating animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Box>
  );
};

export default HomePage;
