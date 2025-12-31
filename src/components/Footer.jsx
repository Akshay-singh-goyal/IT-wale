import React from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "#111827",
        color: "#fff",
        padding: "50px 20px",
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1300px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr" },
          gap: 4,
        }}
      >
        {/* Brand Info */}
        <Box>
          <Typography sx={{ fontSize: "26px", fontWeight: 700 }}>
          The IT Wallah
          </Typography>
          <Typography sx={{ color: "#ccc", marginTop: "10px" }}>
            Learn • Build • Succeed  
            <br /> Your one-stop solution for IT courses, MERN stack learning,
            and interview preparation.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
            <IconButton sx={{ color: "#fff" }}><FacebookIcon /></IconButton>
            <IconButton sx={{ color: "#fff" }}><InstagramIcon /></IconButton>
            <IconButton sx={{ color: "#fff" }}><LinkedInIcon /></IconButton>
            <IconButton sx={{ color: "#fff" }}><YouTubeIcon /></IconButton>
          </Box>
        </Box>

        {/* Quick Links */}
        <Box>
          <Typography sx={{ fontSize: "18px", fontWeight: 600, marginBottom: 2 }}>
            Quick Links
          </Typography>

          {["Home", "Courses", "About Us", "Contact", "The IT Wallah AI Tools"].map(
            (item) => (
              <Typography sx={{ marginY: "6px", color: "#ccc" }} key={item}>
                {item}
              </Typography>
            )
          )}
        </Box>

        {/* Support */}
        <Box>
          <Typography sx={{ fontSize: "18px", fontWeight: 600, marginBottom: 2 }}>
            Support
          </Typography>

          {[
            "Help Center",
            "Privacy Policy",
            "Terms & Conditions",
            "Refund Policy",
            "Feedback",
          ].map((item) => (
            <Typography sx={{ marginY: "6px", color: "#ccc" }} key={item}>
              {item}
            </Typography>
          ))}
        </Box>

        {/* Newsletter */}
        <Box>
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
            Newsletter
          </Typography>
          <Typography sx={{ color: "#ccc", marginTop: 1 }}>
            Subscribe for updates and new IT courses.
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <TextField
              variant="filled"
              fullWidth
              label="Enter your email"
              InputProps={{
                style: { background: "#fff", borderRadius: "6px" },
              }}
            />

            <Button
              fullWidth
              sx={{
                marginTop: 2,
                background: "linear-gradient(135deg,#7b3eff,#6242ff)",
                color: "#fff",
                padding: "10px 0",
                borderRadius: "8px",
                fontWeight: 600,
              }}
            >
              Subscribe <EmailIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          marginTop: 5,
          textAlign: "center",
          color: "#bbb",
          borderTop: "1px solid #333",
          paddingTop: 3,
        }}
      >
        © {new Date().getFullYear()} The IT Wallah. All Rights Reserved.
      </Typography>
    </Box>
  );
}
