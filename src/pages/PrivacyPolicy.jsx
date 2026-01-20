import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import SecurityIcon from "@mui/icons-material/Security";
import CookieIcon from "@mui/icons-material/Cookie";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import { Helmet } from "react-helmet-async";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalPage",
    name: "Privacy Policy | The IT Wallah",
    description:
      "Privacy Policy explaining how The IT Wallah collects, uses, stores, and protects user data.",
    url: "https://theitwallah.com/privacy-policy",
    publisher: {
      "@type": "Organization",
      name: "The IT Wallah",
      logo: {
        "@type": "ImageObject",
        url: "https://theitwallah.com/logo.png",
      },
    },
  };

  return (
    <>
      {/* 🔥 SEO META */}
      <Helmet>
        <title>Privacy Policy | The IT Wallah</title>
        <meta
          name="description"
          content="Learn how The IT Wallah collects, uses, and protects your personal information. Read our complete Privacy Policy."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://theitwallah.com/privacy-policy"
        />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Container maxWidth="md" className="privacy-container">
        <Paper elevation={4} className="privacy-paper">
          {/* HEADER */}
          <Box className="privacy-header">
            <PrivacyTipIcon className="privacy-main-icon" aria-hidden="true" />
            <Typography component="h1" variant="h4" className="privacy-title">
              Privacy Policy
            </Typography>
          </Box>

          <Typography className="privacy-updated">
            Last Updated: January 2026
          </Typography>

          <Divider className="privacy-divider" />

          {/* INTRODUCTION */}
          <Typography className="privacy-text">
            This <strong>Privacy Policy</strong> explains how{" "}
            <strong>The IT Wallah</strong> (“we”, “our”, “us”) collects, uses,
            stores, and safeguards your personal information when you access our
            website, services, or applications (collectively referred to as the
            “Platform”).
          </Typography>

          <Typography className="privacy-text">
            By using our Platform, you consent to the practices described in
            this policy. If you do not agree, please discontinue use of our
            services.
          </Typography>

          {/* INFORMATION COLLECTION */}
          <section>
            <Typography component="h2" variant="h6" className="privacy-section-title">
              <InfoIcon className="privacy-icon" aria-hidden="true" /> Information
              We Collect
            </Typography>

            <Typography className="privacy-text">
              We may collect the following types of personal and non-personal
              information:
            </Typography>

            <List className="privacy-list">
              {[
                "Full name and contact details (email, phone number)",
                "IP address, browser type, and device information",
                "Educational or professional details (if voluntarily provided)",
                "User-uploaded files, images, or documents",
                "Usage data, preferences, and interaction history",
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <PrivacyTipIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </section>

          {/* USE OF DATA */}
          <section>
            <Typography component="h2" variant="h6" className="privacy-section-title">
              <SecurityIcon className="privacy-icon" aria-hidden="true" /> Use of
              Information
            </Typography>

            <List className="privacy-list">
              {[
                "To provide, operate, and improve our services",
                "To manage accounts, subscriptions, and support requests",
                "To send service-related updates or important notifications",
                "To enhance platform security and prevent fraud",
                "To comply with legal or regulatory obligations",
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </section>

          {/* COOKIES */}
          <section>
            <Typography component="h2" variant="h6" className="privacy-section-title">
              <CookieIcon className="privacy-icon" aria-hidden="true" /> Cookies &
              Tracking Technologies
            </Typography>

            <Typography className="privacy-text">
              We use cookies and similar tracking technologies to analyze
              traffic, remember preferences, and improve user experience. You
              may disable cookies via browser settings; however, some features
              may not function properly.
            </Typography>
          </section>

          {/* DATA SHARING */}
          <section>
            <Typography component="h2" variant="h6" className="privacy-section-title">
              <GavelIcon className="privacy-icon" aria-hidden="true" /> Sharing of
              Information
            </Typography>

            <Typography className="privacy-text">
              We do not sell, trade, or rent your personal information. Data may
              be shared only with trusted service providers or legal authorities
              when required by law.
            </Typography>
          </section>

          {/* SECURITY */}
          <section>
            <Typography component="h2" variant="h6" className="privacy-section-title">
              <SecurityIcon className="privacy-icon" aria-hidden="true" /> Data
              Security
            </Typography>

            <Typography className="privacy-text">
              We implement industry-standard security measures to protect your
              data. However, no online transmission or storage method is 100%
              secure, and absolute security cannot be guaranteed.
            </Typography>
          </section>

          {/* USER RIGHTS */}
          <section>
            <Typography component="h2" variant="h6" className="privacy-section-title">
              <InfoIcon className="privacy-icon" aria-hidden="true" /> Your Rights
            </Typography>

            <Typography className="privacy-text">
              You have the right to access, update, or request deletion of your
              personal data by contacting us directly.
            </Typography>
          </section>

          <Divider className="privacy-divider" />

          {/* CONTACT */}
          <Box className="privacy-footer">
            <EmailIcon className="privacy-icon" aria-hidden="true" />
            <Typography>
              For privacy-related concerns, contact us at{" "}
              <strong>theitwallah@gmail.com</strong>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
