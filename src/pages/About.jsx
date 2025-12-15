import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "80px 25px",
      maxWidth: "1200px",
      margin: "0 auto",
      color: "#2d2d2d",
      lineHeight: 1.8,
    },

    heading: {
      fontSize: "50px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "20px",
      color: "#1c1c1c",
      letterSpacing: "-1px",
    },

    subHeading: {
      fontSize: "22px",
      textAlign: "center",
      maxWidth: "850px",
      margin: "0 auto 60px",
      color: "#585858",
    },

    section: {
      marginBottom: "70px",
    },

    title: {
      fontSize: "32px",
      fontWeight: "600",
      color: "#171717",
      marginBottom: "15px",
    },

    text: {
      fontSize: "18px",
      marginBottom: "20px",
      color: "#444",
    },

    missionBox: {
      background: "linear-gradient(135deg, #f3f6ff 0%, #ffffff 100%)",
      padding: "45px",
      borderRadius: "18px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      marginBottom: "70px",
      borderLeft: "6px solid #4560ff",
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
      gap: "30px",
      marginTop: "25px",
    },

    valueCard: {
      background: "#fff",
      padding: "28px",
      borderRadius: "14px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
      textAlign: "center",
      transition: ".3s",
      cursor: "pointer",
    },

    valueHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    },

    founderSection: {
      display: "flex",
      gap: "35px",
      alignItems: "center",
      background: "#fafafa",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
      marginTop: "70px",
    },

    founderImage: {
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #4a4aff",
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    },

    founderName: {
      fontSize: "26px",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#222",
    },

    founderTitle: {
      fontSize: "18px",
      fontStyle: "italic",
      color: "#555",
      marginBottom: "10px",
    },

    founderDesc: {
      fontSize: "17px",
      color: "#555",
      fontStyle: "italic",
      maxWidth: "700px",
    },

    footerQuote: {
      marginTop: "70px",
      fontSize: "24px",
      textAlign: "center",
      fontStyle: "italic",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      {/* Heading */}
      <h1 style={styles.heading} data-aos="fade-down">About Utsav Aura</h1>
      <p style={styles.subHeading} data-aos="fade-up">
        Crafting Vastu-aligned, culturally inspired experiences designed to elevate
        every celebration with harmony, elegance, and unforgettable moments.
      </p>

      {/* Who We Are */}
      <div style={styles.section} data-aos="fade-right">
        <h2 style={styles.title}>Who We Are</h2>
        <p style={styles.text}>
          Utsav Aura is a premium event experience brand specializing in soulful,
          Vastu-aligned, and culturally enriched celebrations. Every layout, visual,
          and design is intentional — bringing balance, beauty, and emotion.
        </p>

        <p style={styles.text}>
          From luxury weddings to elite corporate gatherings, cultural ceremonies,
          and curated premium events — we blend tradition with modern creative finesse.
        </p>
      </div>

      {/* Mission Section */}
      <div style={styles.missionBox} data-aos="fade-up">
        <h2 style={styles.title}>Our Mission</h2>
        <p style={styles.text}>
          To create meaningful, Vastu-aligned event experiences that touch hearts,
          celebrate culture, and leave behind an aura of timeless elegance.
        </p>
      </div>

      {/* What We Do */}
      <div style={styles.section} data-aos="fade-left">
        <h2 style={styles.title}>What We Do</h2>
        <p style={styles.text}>
          ✔ Luxury Event Planning & Management <br />
          ✔ Vastu-Aligned Décor & Stage Design <br />
          ✔ Cultural & Theme-Based Event Styling <br />
          ✔ Destination Weddings & Premium Ceremonies <br />
          ✔ Corporate Events & Brand Activations <br />
          ✔ Creative Visual Storytelling & Experience Design
        </p>
      </div>

      {/* Core Values */}
      <div style={styles.section} data-aos="zoom-in">
        <h2 style={styles.title}>Our Core Values</h2>

        <div style={styles.valuesGrid}>
          <div style={styles.valueCard} data-aos="zoom-in">
            <h3>Authenticity</h3>
            <p>Preserving culture while evolving creativity.</p>
          </div>

          <div style={styles.valueCard} data-aos="zoom-in">
            <h3>Precision</h3>
            <p>Every detail is crafted with intention and mastery.</p>
          </div>

          <div style={styles.valueCard} data-aos="zoom-in">
            <h3>Positive Aura</h3>
            <p>Vastu-driven harmony that enhances every experience.</p>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div style={styles.founderSection} data-aos="fade-up">
        <img
          src="/images/founder.jpg"
          alt="Founder"
          style={styles.founderImage}
        />

        <div>
          <h3 style={styles.founderName}>Ruchi Jain</h3>
          <p style={styles.founderTitle}>
            Founder & Creative Director, Utsav Aura
          </p>
          <p style={styles.founderDesc}>
            “With a deep love for culture and experience design, she believes every
            celebration should radiate harmony, meaning, and timeless elegance.”
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default AboutUs;
