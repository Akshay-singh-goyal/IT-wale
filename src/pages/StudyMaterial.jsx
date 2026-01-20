import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NotesIcon from "@mui/icons-material/Notes";
import FoundationsCourses from "./courses/FoundationsCourses";
import "./StudyMaterial.css";

const batches = [
  "All Batches",
  "class 6",
  "class 7",
  "class 8",
  "class 9",
  "class 10",
  "class 11",
  "class 12",
  "arts",
];

const StudyMaterial = () => {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  return (
    <Container className="study-container">
      {/* Header */}
      <Box className="study-header">
        <Typography variant="h4" className="study-title">
          School Exams 2025-26 Class 6 to 12 Study Material for Preparation
        </Typography>
        <Typography className="study-description">
          Preparing for the School Exams 2025-26 is important for students from
          Classes 6 to 12. With a detailed study plan, the right resources, and
          strategic preparation, students can perform well in their exams. Here,
          we provide detailed information to help students succeed.
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={3} className="study-cards">
        {[
          {
            title: "Blogs",
            icon: <DescriptionIcon className="card-icon" />,
            text: "Read Our Latest Blogs",
            className: "blogs-card",
          },
          {
            title: "PDF Bank",
            icon: <PictureAsPdfIcon className="card-icon" />,
            text: "Access PDF Bank",
            className: "pdf-card",
          },
          {
            title: "PW Books with AI",
            icon: <MenuBookIcon className="card-icon" />,
            text: "Master NCERT Books & Solutions",
            className: "books-card",
          },
          {
            title: "Alakh Sir Notes",
            icon: <NotesIcon className="card-icon" />,
            text: "Discover handwritten notes",
            className: "notes-card",
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={`study-card ${card.className}`}>
              <CardActionArea>
                <CardContent className="card-content">
                  {card.icon}
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography className="card-text">{card.text}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Batch Buttons */}
      <Box className="study-batches">
        {batches.map((batch, index) => (
          <Button
            key={index}
            className={`batch-btn ${
              selectedBatch === batch ? "active-batch" : ""
            }`}
            variant="text"
            onClick={() => setSelectedBatch(batch)}
          >
            {batch}
          </Button>
        ))}
      </Box>

      {/* Dynamic Batch Content */}
      <Box className="batch-content">
        {selectedBatch === "All Batches" && (
          <Typography className="batch-text">
            Please select a batch above to view specific study materials.
          </Typography>
        )}
        {selectedBatch !== "All Batches" && (
          <FoundationsCourses selectedClass={selectedBatch} />
        )}
      </Box>
    </Container>
  );
};

export default StudyMaterial;
