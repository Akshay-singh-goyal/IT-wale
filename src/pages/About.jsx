import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import founder from "../Images/selfcircle.jpeg";
const AboutUs = () => {
  useEffect(() => {
    // Initialize AOS for scroll animations
    AOS.init({ duration: 900, once: true });

    // SEO: set title and meta description
    document.title = "About Us | The IT Wallah - Learn Online with Live Classes";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The IT Wallah offers live online classes, expert teachers, and top-quality courses to help you grow your career in IT and programming."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "The IT Wallah offers live online classes, expert teachers, and top-quality courses to help you grow your career in IT and programming.";
      document.head.appendChild(meta);
    }
  }, []);

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "60px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      color: "#2d2d2d",
      lineHeight: 1.8,
    },

    heading: {
      fontSize: "42px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "15px",
      color: "#1c1c1c",
      letterSpacing: "-1px",
    },

    subHeading: {
      fontSize: "18px",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 50px",
      color: "#585858",
    },

    section: {
      marginBottom: "50px",
    },

    title: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#171717",
      marginBottom: "12px",
    },

    text: {
      fontSize: "16px",
      marginBottom: "15px",
      color: "#444",
    },

    missionBox: {
      background: "linear-gradient(135deg, #f3f6ff 0%, #ffffff 100%)",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      marginBottom: "50px",
      borderLeft: "6px solid #1a73e8",
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
      gap: "20px",
      marginTop: "20px",
    },

    valueCard: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
      textAlign: "center",
      transition: ".3s",
      cursor: "pointer",
    },

    founderSection: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      alignItems: "center",
      background: "#fafafa",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
      marginTop: "50px",
    },

    founderImage: {
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #1a73e8",
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    },

    founderName: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "#222",
    },

    founderTitle: {
      fontSize: "16px",
      fontStyle: "italic",
      color: "#555",
      marginBottom: "6px",
    },

    founderDesc: {
      fontSize: "15px",
      color: "#555",
      fontStyle: "italic",
      textAlign: "center",
      maxWidth: "500px",
    },

    footerQuote: {
      marginTop: "50px",
      fontSize: "20px",
      textAlign: "center",
      fontStyle: "italic",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      {/* Heading */}
      <h1 style={styles.heading} data-aos="fade-down">
        About The IT Wallah
      </h1>
      <p style={styles.subHeading} data-aos="fade-up">
        Empowering learners with live online classes, expert guidance, and
        top-quality courses to grow your IT career anytime, anywhere.
      </p>

      {/* Who We Are */}
      <div style={styles.section} data-aos="fade-right">
        <h2 style={styles.title}>Who We Are</h2>
        <p style={styles.text}>
          The IT Wallah is a leading online learning platform specializing in
          IT, programming, and technology courses. We provide live classes,
          recorded lessons, and comprehensive resources to help learners
          upskill and excel in their careers.
        </p>

        <p style={styles.text}>
          With expert teachers and curated courses, we aim to bridge the gap
          between knowledge and practical skills, making learning accessible,
          flexible, and impactful.
        </p>
      </div>

      {/* Mission Section */}
      <div style={styles.missionBox} data-aos="fade-up">
        <h2 style={styles.title}>Our Mission</h2>
        <p style={styles.text}>
          To empower learners with the skills and knowledge required to thrive
          in the modern IT world, delivering live, engaging, and career-oriented
          learning experiences.
        </p>
      </div>

      {/* What We Do */}
      <div style={styles.section} data-aos="fade-left">
        <h2 style={styles.title}>What We Do</h2>
        <p style={styles.text}>
          ✔ Live Online Classes with Expert Teachers <br />
          ✔ Recorded Courses for Flexible Learning <br />
          ✔ Career-Focused IT and Programming Programs <br />
          ✔ Interactive Notes and Assignments <br />
          ✔ Personal Mentorship and Guidance <br />
          ✔ Continuous Skill Development
        </p>
      </div>

      {/* Core Values */}
      <div style={styles.section} data-aos="zoom-in">
        <h2 style={styles.title}>Our Core Values</h2>
        <div style={styles.valuesGrid}>
          <div style={styles.valueCard} data-aos="zoom-in">
            <h3>Excellence</h3>
            <p>Delivering top-quality education with practical skills.</p>
          </div>
          <div style={styles.valueCard} data-aos="zoom-in">
            <h3>Innovation</h3>
            <p>Creating modern, engaging, and interactive learning experiences.</p>
          </div>
          <div style={styles.valueCard} data-aos="zoom-in">
            <h3>Integrity</h3>
            <p>Maintaining transparency and dedication to learners’ success.</p>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div style={styles.founderSection} data-aos="fade-up">
        <img
          src={founder}
          alt="Founder"
          style={styles.founderImage}
        />
        <div>
          <h3 style={styles.founderName}>Akshay Goyal</h3>
          <p style={styles.founderTitle}>Founder & Head Instructor, The IT Wallah</p>
          <p style={styles.founderDesc}>
            “With a vision to empower learners worldwide, he believes
            every student should have access to live, quality IT education
            and practical career guidance.”
          </p>
        </div>
      </div>

      {/* Footer Quote */}
      <p style={styles.footerQuote} data-aos="fade-up">
        “Learn, Grow, and Excel with The IT Wallah.”
      </p>
    </div>
  );
};

export default AboutUs;
