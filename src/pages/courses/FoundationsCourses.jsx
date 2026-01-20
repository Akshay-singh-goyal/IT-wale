import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import "./FoundationsCourses.css";

const coursesData = [
  {
    title: "Champs Term II 2026",
    class: "Class 6",
    slug: "champs-term-ii-2026",
    price: 1199,
    oldPrice: 2000,
    discount: 40,
    start: "13 Oct, 2025",
    end: "31 Mar, 2026",
    newLabel: true,
    language: "Hinglish",
    teachers: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
    image: "https://via.placeholder.com/400x200",
  },
  {
    title: "PROJECT 45 ICSE",
    class: "Class 6 Crash Course",
    slug: "project-45-icse",
    price: 400,
    oldPrice: 600,
    discount: 33,
    start: "22 Dec, 2025",
    end: "31 Mar, 2026",
    newLabel: false,
    language: "Hinglish",
    teachers: ["https://via.placeholder.com/40"],
    image: "https://via.placeholder.com/400x200",
  },
  {
    title: "PROJECT 30",
    class: "Class 6 Crash Course",
    slug: "project-30",
    price: 250,
    oldPrice: 399,
    discount: 37,
    start: "15 Dec, 2025",
    end: "31 Mar, 2026",
    newLabel: false,
    language: "Hinglish",
    teachers: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
    image: "https://via.placeholder.com/400x200",
  },
];

const FoundationsCourses = () => {
  const navigate = useNavigate();

  // 🔹 Redirect logic
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("accessToken"); // example auth
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg" className="foundation-container">
      <Box className="foundation-header">
        <Typography variant="h3">School Foundation Courses</Typography>
        <Typography className="foundation-subtitle">
          Class 6 to 12 Study Material, Notes & Exam Preparation
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {coursesData.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="course-card">
              <Chip label="ONLINE" color="primary" className="online-chip" />
              {course.newLabel && (
                <Chip label="NEW" color="secondary" className="new-chip" />
              )}

              <CardMedia
                component="img"
                height="180"
                image={course.image}
                alt={course.title}
              />

              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography className="course-class">{course.class}</Typography>

                <Box className="teachers">
                  {course.teachers.map((t, i) => (
                    <img
                      key={i}
                      src={t}
                      alt="Teacher"
                      className="teacher-img"
                    />
                  ))}
                </Box>

                <Typography className="course-meta">
                  <SchoolIcon fontSize="small" /> Targeted for {course.class} Students
                </Typography>

                <Box className="price-section">
                  <Typography className="price">₹{course.price}</Typography>
                  <Typography className="old-price">₹{course.oldPrice}</Typography>
                  <Typography className="discount">{course.discount}% off</Typography>
                </Box>

                <Typography className="course-dates">
                  Starts on {course.start} | Ends on {course.end}
                </Typography>

                <Box className="course-buttons">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/courses/foundations/${course.slug}`)}
                  >
                    Explore
                  </Button>
                  <Button variant="contained" color="primary">
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FoundationsCourses;
