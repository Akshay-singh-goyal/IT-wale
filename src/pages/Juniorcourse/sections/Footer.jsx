import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  MenuItem,
  Select,
} from "@mui/material";

// ✅ Correct CSS import (NO variable, NO conflict)
import "./Footer.css";

export default function Footer() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(90deg, #1a1a1a 0%, #4a260e 60%, #6b2f0f 100%)",
        color: "#fff",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* ================= TOP SECTION ================= */}
        <Grid container spacing={6} alignItems="flex-start">
          
          {/* BRAND + ABOUT */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2}>
              {/* MASCOT */}
              <div className="cj-mascot">
                <div className="cj-hair"></div>
                <div className="cj-face">
                  <span className="eye left"></span>
                  <span className="eye right"></span>
                  <span className="smile"></span>
                </div>
              </div>

              {/* TEXT */}
              <div className="cj-text">
                <div className="cj-title">
                  Junior<span>-G</span>
                </div>
                <div className="cj-sub">
                  Powered by <b>TIW</b>
                </div>
              </div>
            </Box>

            <Typography
              mt={2}
              fontSize="0.95rem"
              lineHeight={1.7}
              color="#ddd"
            >
              We understand that every student has different needs and
              capabilities, which is why we create a unique curriculum
              best suited for every child.
            </Typography>
          </Grid>

          {/* ABOUT LINKS */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight={700} mb={2}>
              More About Us
            </Typography>
            {[
              "About Us",
              "Blogs",
              "Contact Us",
              "Email Us",
              "Talk to a Counsellor",
            ].map((item) => (
              <FooterLink key={item} text={item} />
            ))}
          </Grid>

          {/* COUNTRY */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight={700} mb={2}>
              Country
            </Typography>

            <Select
              value="india"
              fullWidth
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                fontSize: "0.95rem",
              }}
            >
              <MenuItem value="india">🇮🇳 INDIA</MenuItem>
            </Select>
          </Grid>

          {/* IMAGE */}
          <Grid item xs={12} md={2} textAlign="center">
            <img
              src="/images/footer-kid.png"
              alt="Happy Kid"
              style={{
                maxWidth: "120px",
                marginTop: "10px",
              }}
            />
          </Grid>
        </Grid>

        {/* ================= DIVIDER ================= */}
        <Box
          sx={{
            height: 1,
            backgroundColor: "rgba(255,255,255,0.2)",
            my: 5,
          }}
        />

        {/* ================= BOTTOM LINKS ================= */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={700} mb={1}>
              School Curriculum
            </Typography>
            {["Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"].map(
              (item) => (
                <FooterLink key={item} text={item} />
              )
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={700} mb={1}>
              Mental Maths
            </Typography>
            {["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6"].map(
              (item) => (
                <FooterLink key={item} text={item} />
              )
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight={700} mb={1}>
              English Cambridge
            </Typography>
            {["Starters", "Movers", "Key", "Preliminary"].map((item) => (
              <FooterLink key={item} text={item} />
            ))}
          </Grid>
        </Grid>

        {/* ================= COPYRIGHT ================= */}
        <Typography
          textAlign="center"
          mt={6}
          fontSize="0.85rem"
          color="#ccc"
        >
          © {new Date().getFullYear()} Junior-G. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

/* ================= FOOTER LINK ================= */
function FooterLink({ text }) {
  return (
    <Typography
      fontSize="0.9rem"
      color="#ddd"
      sx={{
        mb: 0.8,
        cursor: "pointer",
        "&:hover": { color: "#ffb020" },
      }}
    >
      {text}
    </Typography>
  );
}
