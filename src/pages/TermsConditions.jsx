import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import SecurityIcon from "@mui/icons-material/Security";
import EmailIcon from "@mui/icons-material/Email";
import { Helmet } from "react-helmet-async";
import "./LegalPages.css";

const TermsConditions = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions | The IT Wallah",
    description:
      "Official Terms and Conditions governing the use of The IT Wallah website, courses, and services.",
    url: "https://theitwallah.com/terms-conditions",
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
        <title>Terms & Conditions | The IT Wallah</title>
        <meta
          name="description"
          content="Read the official Terms and Conditions for using The IT Wallah website, courses, and services."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://theitwallah.com/terms-conditions"
        />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Container maxWidth="md" className="legal-container">
        <Paper elevation={4} className="legal-paper">
          {/* HEADER */}
          <Box className="legal-header">
            <GavelIcon className="legal-main-icon" aria-hidden="true" />
            <Typography component="h1" variant="h4">
              Terms & Conditions
            </Typography>
          </Box>

          <Typography className="legal-updated">
            Last Updated: January 2026
          </Typography>

          <Divider className="legal-divider" />

          {/* INTRO */}
          <Typography className="legal-text">
            These <strong>Terms and Conditions</strong> govern your access to and
            use of <strong>The IT Wallah</strong> website, online courses,
            services, and content. By accessing or using our platform, you agree
            to comply with these terms in full.
          </Typography>

          {/* USE OF PLATFORM */}
          <section>
            <Typography
              component="h2"
              variant="h6"
              className="legal-section-title"
            >
              <InfoIcon aria-hidden="true" /> Use of Platform
            </Typography>

            <List>
              {[
                "You must provide accurate and complete information during registration",
                "You agree not to misuse, hack, or disrupt the platform or its services",
                "All content is intended for personal and educational use only",
                "Sharing paid or protected content is strictly prohibited",
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </section>

          {/* INTELLECTUAL PROPERTY */}
          <section>
            <Typography
              component="h2"
              variant="h6"
              className="legal-section-title"
            >
              <SecurityIcon aria-hidden="true" /> Intellectual Property Rights
            </Typography>

            <Typography className="legal-text">
              All materials on this website, including but not limited to text,
              videos, graphics, logos, and code samples, are the intellectual
              property of <strong>The IT Wallah</strong>. Unauthorized copying,
              redistribution, or commercial use without written permission is
              strictly prohibited.
            </Typography>
          </section>

          {/* LIMITATION */}
          <section>
            <Typography
              component="h2"
              variant="h6"
              className="legal-section-title"
            >
              <GavelIcon aria-hidden="true" /> Limitation of Liability
            </Typography>

            <Typography className="legal-text">
              The IT Wallah shall not be held responsible for any direct or
              indirect damages arising from the use or inability to use our
              services, including technical issues, content inaccuracies, or
              service interruptions.
            </Typography>
          </section>

          <Divider className="legal-divider" />

          {/* CONTACT */}
          <Box className="legal-footer">
            <EmailIcon aria-hidden="true" />
            <Typography>
              For any questions regarding these Terms, contact us at{" "}
              <strong>theitwallah@gmail.com</strong>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default TermsConditions;
