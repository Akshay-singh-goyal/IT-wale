import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Avatar,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import StarIcon from "@mui/icons-material/Star";

/* ===========================
   MAIN PAGE
=========================== */
export default function KidsLearningLandingPage() {
  return (
    <Box sx={{ backgroundColor: "#fff", overflow: "hidden" }}>

      {/* 🎈 HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6ec6ff, #ffcc80)",
          py: { xs: 8, md: 12 },
          position: "relative",
        }}
      >
        {/* Floating Emojis */}
        <FloatingEmoji top="10%" left="8%">🎈</FloatingEmoji>
        <FloatingEmoji top="60%" left="5%">🧸</FloatingEmoji>
        <FloatingEmoji top="20%" right="10%">📚</FloatingEmoji>

        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={6}
            alignItems="center"
          >
            {/* LEFT */}
            <Box flex={1}>
              <Typography variant="h3" fontWeight={900} color="#111">
                Fun & Interactive Learning <br /> for Curious Kids 🚀
              </Typography>

              <Typography mt={2} fontSize="1.15rem" color="#333">
                Live classes, expert teachers and activity-based learning
                designed specially for children aged 6–12 👧🧒
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  px: 5,
                  py: 1.4,
                  fontWeight: 800,
                  borderRadius: 4,
                  backgroundColor: "#000",
                  textTransform: "none",
                }}
              >
                🎉 Book a Free Demo Class
              </Button>

              {/* Trust */}
              <TrustBadges />
            </Box>

            {/* RIGHT CARTOON */}
            <Box flex={1} textAlign="center">
              <img
                src="/images/kids-learning-cartoon.png"
                alt="Kids Learning"
                style={{ width: "100%", maxWidth: 420 }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* 🎒 CLASS STRUCTURE */}
      <LiveSessionSection />

      {/* 🧠 LEARN → PRACTICE → PERFORM */}
      <LearningSteps />

      {/* ❤️ PARENT TRUST */}
      <ParentsTrust />

    </Box>
  );
}

/* ===========================
   LIVE SESSION SECTION
=========================== */
function LiveSessionSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight={900}>
            🎒 Our Class Structure
          </Typography>
          <Typography mt={2} color="#666">
            Turning screen time into smart learning time 🌈
          </Typography>
        </Box>

        <Box
          sx={{
            background: "linear-gradient(135deg,#ffb020,#ffca55)",
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
            gap: 6,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={900} color="#fff">
              🎥 Live Audio-Video Classes
            </Typography>

            <Stack spacing={1.5} mt={3}>
              <Feature icon={<VideocamIcon />} text="Live video with expert teachers" />
              <Feature icon={<HeadsetMicIcon />} text="Two-way interaction & doubt solving" />
              <Feature icon={<GroupsIcon />} text="Small batches for personal attention" />
              <Feature icon={<EmojiObjectsIcon />} text="Fun quizzes & activities" />
            </Stack>
          </Box>

          <Box
            sx={{
              background: "#000",
              borderRadius: 4,
              overflow: "hidden",
              aspectRatio: "16/9",
              border: "4px solid #fff",
            }}
          >
            <video
              src="/videos/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ===========================
   LEARNING STEPS
=========================== */
function LearningSteps() {
  return (
    <Box sx={{ backgroundColor: "#f9fafc", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={900} textAlign="center">
          🧠 How Kids Learn With Us
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          mt={6}
          justifyContent="center"
        >
          <StepCard emoji="📖" title="Learn" desc="Concepts explained with stories & visuals" />
          <StepCard emoji="✍️" title="Practice" desc="Live activities & guided exercises" />
          <StepCard emoji="🏆" title="Perform" desc="Confidence building & assessments" />
        </Stack>
      </Container>
    </Box>
  );
}

/* ===========================
   PARENT TRUST
=========================== */
function ParentsTrust() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={900} textAlign="center">
          ❤️ Trusted by Parents
        </Typography>

        <Stack spacing={2} alignItems="center" mt={4}>
          <Stack direction="row">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} sx={{ color: "#ffb400", fontSize: 32 }} />
            ))}
          </Stack>

          <Typography color="#666" textAlign="center">
            4.9/5 rating from 10,000+ happy parents across India 🇮🇳
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Avatar src="/images/parent1.png" />
            <Avatar src="/images/parent2.png" />
            <Avatar src="/images/parent3.png" />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

/* ===========================
   REUSABLE COMPONENTS
=========================== */
function Feature({ icon, text }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff9800",
        }}
      >
        {icon}
      </Box>
      <Typography color="#fff" fontWeight={600}>
        {text}
      </Typography>
    </Stack>
  );
}

function StepCard({ emoji, title, desc }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 4,
        p: 4,
        width: 260,
        textAlign: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Typography fontSize="2.5rem">{emoji}</Typography>
      <Typography fontWeight={800} mt={1}>
        {title}
      </Typography>
      <Typography color="#666" mt={1}>
        {desc}
      </Typography>
    </Box>
  );
}

function FloatingEmoji({ children, top, left, right }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        right,
        fontSize: "2.5rem",
        animation: "float 6s ease-in-out infinite",
        "@keyframes float": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
          "100%": { transform: "translateY(0px)" },
        },
      }}
    >
      {children}
    </Box>
  );
}

function TrustBadges() {
  return (
    <Stack direction="row" spacing={3} mt={4}>
      <Badge text="Live Teachers 👩‍🏫" />
      <Badge text="Safe Learning 🛡️" />
      <Badge text="Parent Approved ❤️" />
    </Stack>
  );
}

function Badge({ text }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        px: 2,
        py: 0.8,
        borderRadius: 3,
        fontWeight: 600,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </Box>
  );
}
