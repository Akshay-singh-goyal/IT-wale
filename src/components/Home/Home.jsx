import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  Box,
  Button,
  Card,
  Avatar,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import {
  motion,
  useReducedMotion,
  useAnimation,
} from "framer-motion";
import {
  FaVideo,
  FaBookOpen,
  FaBrain,
  FaUniversity,
} from "react-icons/fa";

/* ================= LOCAL IMPORTS ================= */
import SEO from "./seo";
import profile from "../../Images/selfphoto.jpeg";
import CoursesCategoriesPage from "../../pages/CoursesCategoriesPage";
import StudyResourcesPage from "../../pages/StudyResourcesPage";
import JoinFamily from "../../pages/JoinFamily";

import teacher1 from "../../Images/selfcircle.jpeg";
import teacher2 from "../../Images/selfcircle.jpeg";
import teacher3 from "../../Images/selfcircle.jpeg";
import Stats from "./Stats";

/* ================= ICON MAP ================= */
const ICON_MAP = {
  video: FaVideo,
  book: FaBookOpen,
  brain: FaBrain,
  university: FaUniversity,
};

/* ================= TEACHERS DATA ================= */
const TEACHERS = [
  { name: "Akshay Goyal", subject: "DSA", photo: teacher1 },
  { name: "Akshay Goyal", subject: "Web Development", photo: teacher2 },
  { name: "Akshay Goyal", subject: "Basic of Computer", photo: teacher3 },
];

/* ================= TEACHER CARD ================= */
const TeacherCard = ({ teacher }) => {
  return (
    <Card sx={styles.teacherCard}>
      <Avatar
        src={teacher.photo}
        alt={teacher.name}
        loading="lazy"
        sx={styles.avatar}
      />

      <Typography fontWeight={700}>
        {teacher.name}
      </Typography>

      <Typography color="text.secondary" mb={1}>
        {teacher.subject}
      </Typography>

      <Typography sx={styles.rating}>
        ⭐ Top Rated Instructor
      </Typography>
    </Card>
  );
};

/* ================= COUNTER CARD ================= */
const CounterCard = ({
  title,
  subtitle,
  end,
  suffix,
  icon,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const Icon = ICON_MAP[icon];

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let observer;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let current = 0;
        const increment = Math.max(1, end / 60);

        const timer = setInterval(() => {
          current += increment;

          if (current >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 20);

        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [end, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      whileHover={
        !prefersReducedMotion
          ? { y: -6, scale: 1.04 }
          : {}
      }
      transition={{ duration: 0.3 }}
      style={styles.card}
    >
      <Box sx={styles.iconCircle}>
        <Icon size={28} color="#7c3aed" />
      </Box>

      <Typography sx={styles.cardNumber}>
        {count}
        {suffix}
      </Typography>

      <Typography sx={styles.cardTitle}>
        {title}
      </Typography>

      <Typography sx={styles.cardText}>
        {subtitle}
      </Typography>
    </motion.div>
  );
};

/* ================= HOME ================= */
export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  const [stats, setStats] = useState([]);

  /* ===== STATS DATA (API READY) ===== */
  useEffect(() => {
    setStats([
      {
        title: "Daily Live",
        subtitle: "Interactive Classes",
        value: 2,
        suffix: "+",
        icon: "video",
      },
      {
        title: "10+",
        subtitle: "Tests, Papers & Notes",
        value: 10,
        suffix: "",
        icon: "book",
      },
      {
        title: "24 x 7",
        subtitle: "Doubt Solving",
        value: 24,
        suffix: "x7",
        icon: "brain",
      },
      {
        title: "0+",
        subtitle: "Offline Centres",
        value: 0,
        suffix: "+",
        icon: "university",
      },
    ]);
  }, []);

  /* ===== MOBILE AUTO SLIDER ===== */
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 25,
        ease: "linear",
      },
    });
  }, [controls]);

  const teachers = useMemo(
    () => [...TEACHERS, ...TEACHERS],
    []
  );

  return (
    <>
      {/* ================= SEO ================= */}
      <SEO
        title="The IT Wallah | India’s Trusted Learning Platform"
        description="Affordable & trusted education platform for students across India"
        preloadImage={profile}
      />

      <main>
        {/* ================= HERO ================= */}
        <section style={styles.section}>
          <motion.div
            initial={
              !prefersReducedMotion
                ? { opacity: 0, x: -40 }
                : false
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.leftText}
          >
            <h1 style={styles.heading}>
              India’s{" "}
              <span style={styles.highlight}>
                Most Trusted & Affordable
              </span>
              <br />
              Learning Platform
            </h1>

            <p style={styles.paragraph}>
              Build your future with The IT Wallah – a
              reliable and cost-effective education
              solution for students across India.
            </p>

            <Button
              variant="contained"
              aria-label="Get Started"
              style={styles.button}
            >
              Get Started
            </Button>
          </motion.div>

          <motion.div
            initial={
              !prefersReducedMotion
                ? { opacity: 0, scale: 0.95 }
                : false
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={styles.rightImageWrapper}
          >
            <img
              src={profile}
              alt="The IT Wallah Mentor"
              loading="eager"
              width="260"
              height="260"
              style={styles.teacherImage}
            />

            <div style={styles.bubble}>
              Knowledge with Heart ❤️
            </div>
          </motion.div>
        </section>

        {/* ================= STATS ================= */}
        <section style={styles.statsSection}>
          {stats.map((item, i) => (
            <CounterCard
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              end={item.value}
              suffix={item.suffix}
              icon={item.icon}
            />
          ))}
        </section>

        <CoursesCategoriesPage />
        <Stats/>
        <StudyResourcesPage />

        {/* ================= TEACHERS ================= */}
        <Container sx={{ py: { xs: 8, md: 10 } }}>
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
          >
            Meet Our Expert Teachers
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            mb={6}
          >
            Learn from industry experts with years of
            teaching experience
          </Typography>

          {/* DESKTOP */}
          <Grid
            container
            spacing={5}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {TEACHERS.map((t, i) => (
              <Grid item md={4} key={i}>
                <TeacherCard teacher={t} />
              </Grid>
            ))}
          </Grid>

          {/* MOBILE */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                display: "flex",
                gap: 16,
              }}
              drag="x"
              animate={controls}
              onDragStart={() => controls.stop()}
              onDragEnd={() => controls.start()}
            >
              {teachers.map((t, i) => (
                <Box key={i} sx={{ minWidth: 260 }}>
                  <TeacherCard teacher={t} />
                </Box>
              ))}
            </motion.div>
          </Box>
        </Container>

        <JoinFamily />
      </main>
    </>
  );
}

/* ================= STYLES ================= */
const styles = {
  section: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "clamp(48px,6vw,80px) 24px",
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "center",
  },
  leftText: { flex: 1, minWidth: "280px" },
  heading: {
    fontSize: "clamp(1.9rem,4vw,2.6rem)",
    fontWeight: 700,
    marginBottom: "20px",
  },
  highlight: { color: "#7c3aed" },
  paragraph: {
    fontSize: "1.1rem",
    color: "#555",
    maxWidth: "520px",
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "#7c3aed",
    padding: "14px 32px",
    borderRadius: "12px",
    textTransform: "none",
  },
  rightImageWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  teacherImage: {
    borderRadius: "50%",
    boxShadow: "0 10px 25px rgba(0,0,0,.2)",
  },
  bubble: {
    position: "absolute",
    bottom: "-10px",
    background: "#7c3aed",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "12px",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    padding: "0 24px 72px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    padding: "24px 16px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "rgba(124,58,237,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px",
  },
  cardNumber: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#7c3aed",
  },
  cardTitle: { fontWeight: 600 },
  cardText: { color: "#555" },
  teacherCard: {
    textAlign: "center",
    px: 3,
    py: 4,
    borderRadius: 5,
    background: "linear-gradient(#fff,#f6f7ff)",
  },
  avatar: {
    width: 110,
    height: 110,
    mx: "auto",
    mb: 2,
    border: "4px solid #7c3aed",
  },
  rating: {
    color: "#7c3aed",
    fontWeight: 600,
  },
};
