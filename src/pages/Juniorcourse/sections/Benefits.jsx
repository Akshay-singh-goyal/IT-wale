import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GroupsIcon from "@mui/icons-material/Groups";

const TABS = [
  {
    id: 1,
    title: "Interactive Live Classes",
    desc: "Fun & engaging sessions where kids talk, answer & enjoy learning.",
    video: "/videos/live-class.mp4",
    icon: <PlayCircleFilledIcon />,
  },
  {
    id: 2,
    title: "Two-Teacher Model",
    desc: "One teaches, one clears doubts instantly.",
    video: "/videos/two-teacher.mp4",
    icon: <GroupsIcon />,
  },
  {
    id: 3,
    title: "Smart Practice",
    desc: "Practice that adapts to your child’s level.",
    video: "/videos/practice.mp4",
    icon: <AutoGraphIcon />,
  },
  {
    id: 4,
    title: "Performance Tracking",
    desc: "Parents get progress updates & reports.",
    video: "/videos/progress.mp4",
    icon: <EmojiEventsIcon />,
  },
];

export default function CuriousWaySection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <Box
      sx={{
        background: "#fffaf5",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🎈 FLOATING EMOJIS */}
      <FloatingEmoji emoji="🎈" top="10%" left="5%" />
      <FloatingEmoji emoji="🧠" top="30%" right="6%" />
      <FloatingEmoji emoji="⭐" bottom="15%" left="8%" />
      <FloatingEmoji emoji="📚" bottom="10%" right="10%" />

      <Container maxWidth="lg">
        {/* 🔥 HEADING */}
        <Box textAlign="center" mb={7}>
          <Typography variant="h4" fontWeight={900}>
            CuriousJr’s Way of Teaching ✨
          </Typography>
          <Typography mt={2} sx={{ color: "#555", maxWidth: 720, mx: "auto" }}>
            A joyful learning experience designed specially for young minds 👧🧒
          </Typography>
        </Box>

        {/* 🧠 MAIN SECTION */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* 👈 LEFT TABS */}
          <Stack spacing={2}>
            {TABS.map((tab) => (
              <Paper
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                elevation={activeTab.id === tab.id ? 6 : 1}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  borderRadius: 4,
                  background:
                    activeTab.id === tab.id
                      ? "linear-gradient(135deg,#fff1dc,#ffe0b2)"
                      : "#fff",
                  border:
                    activeTab.id === tab.id
                      ? "2px solid #ff9800"
                      : "1px solid #eee",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <CircleIcon>{tab.icon}</CircleIcon>
                  <Box>
                    <Typography fontWeight={700}>{tab.title}</Typography>
                    <Typography fontSize={14} color="#666">
                      {tab.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>

          {/* 👉 RIGHT VIDEO */}
          <Box
            sx={{
              background: "#000",
              borderRadius: 5,
              overflow: "hidden",
              aspectRatio: "16 / 9",
              boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
              border: "4px solid #fff",
            }}
          >
            <video
              key={activeTab.video}
              src={activeTab.video}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* 🔵 ICON CIRCLE */
function CircleIcon({ children }) {
  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#ff9800",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
}

/* 🎈 FLOATING EMOJI */
function FloatingEmoji({ emoji, ...pos }) {
  return (
    <Box
      sx={{
        position: "absolute",
        fontSize: "2.5rem",
        animation: "float 6s ease-in-out infinite",
        opacity: 0.25,
        ...pos,
        "@keyframes float": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
      }}
    >
      {emoji}
    </Box>
  );
}
