import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Helmet } from "react-helmet-async";
import "./LegalPages.css";

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>Disclaimer | The IT Wallah</title>
        <meta
          name="description"
          content="Read the official Disclaimer of The IT Wallah. Our educational content is provided for learning purposes only without warranties."
        />
        <meta
          name="keywords"
          content="The IT Wallah disclaimer, educational disclaimer, IT Wallah terms, learning platform disclaimer"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Disclaimer | The IT Wallah" />
        <meta
          property="og:description"
          content="Official Disclaimer page of The IT Wallah educational platform."
        />
        <meta property="og:type" content="website" />

        {/* Accessibility */}
        <html lang="en" />
      </Helmet>

      <main aria-labelledby="disclaimer-heading">
        <Container maxWidth="md" className="legal-container">
          <article>
            <Paper
              elevation={4}
              className="legal-paper"
              role="region"
              aria-label="Disclaimer information"
            >
              {/* Header */}
              <header className="legal-header">
                <WarningAmberRoundedIcon
                  className="legal-main-icon"
                  aria-hidden="true"
                />
                <Typography
                  id="disclaimer-heading"
                  variant="h4"
                  component="h1"
                >
                  Disclaimer
                </Typography>
              </header>

              <Typography
                className="legal-updated"
                component="p"
                aria-label="Last updated date"
              >
                Last Updated: January 2026
              </Typography>

              <Divider className="legal-divider" />

              {/* Content */}
              <section>
                <Typography variant="body1" className="legal-text">
                  The information provided on{" "}
                  <strong>The IT Wallah</strong> is intended solely for
                  educational and informational purposes. While we aim to keep
                  the content accurate and up to date, we make no
                  representations or warranties of any kind regarding the
                  completeness, accuracy, reliability, or suitability of the
                  information.
                </Typography>

                <Typography variant="body1" className="legal-text">
                  Any action you take upon the information available on this
                  platform is strictly at your own risk.{" "}
                  <strong>The IT Wallah</strong> will not be liable for any
                  losses, damages, or consequences arising from the use of our
                  content.
                </Typography>

                <Divider className="legal-divider" />

                <Typography variant="body1" className="legal-text">
                  We do not provide professional, legal, financial, or career
                  guarantees. Users are advised to verify information
                  independently before making decisions based on our content.
                </Typography>
              </section>
            </Paper>
          </article>
        </Container>
      </main>
    </>
  );
};

export default Disclaimer;
