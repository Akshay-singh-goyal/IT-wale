import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import PolicyIcon from "@mui/icons-material/Policy";
import EmailIcon from "@mui/icons-material/Email";
import { Helmet } from "react-helmet-async";
import "./LegalPages.css";

const RefundPolicy = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalPage",
    name: "Refund Policy | The IT Wallah",
    description:
      "Refund policy for courses, subscriptions, and services offered by The IT Wallah.",
    url: "https://theitwallah.com/refund-policy",
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
        <title>Refund Policy | The IT Wallah</title>
        <meta
          name="description"
          content="Read the official refund policy for courses and services offered by The IT Wallah."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theitwallah.com/refund-policy" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Container maxWidth="md" className="legal-container">
        <Paper elevation={4} className="legal-paper">
          {/* HEADER */}
          <Box className="legal-header">
            <PolicyIcon className="legal-main-icon" aria-hidden="true" />
            <Typography component="h1" variant="h4">
              Refund Policy
            </Typography>
          </Box>

          <Typography className="legal-updated">
            Last Updated: January 2026
          </Typography>

          <Divider className="legal-divider" />

          {/* INTRO */}
          <Typography className="legal-text">
            At <strong>The IT Wallah</strong>, we are committed to delivering
            high-quality educational content and services. This Refund Policy
            explains the circumstances under which refunds may be granted.
          </Typography>

          {/* POLICY DETAILS */}
          <section>
            <Typography component="h2" variant="h6" className="legal-section-title">
              Refund Eligibility
            </Typography>

            <Typography className="legal-text">
              All purchases made on The IT Wallah platform are generally
              <strong> non-refundable</strong>. Refunds are considered only in
              exceptional situations, including:
            </Typography>

            <Typography className="legal-text">
              • Duplicate payments due to technical errors<br />
              • Payment debited but service not activated<br />
              • Verified billing or transaction issues
            </Typography>
          </section>

          {/* REQUEST PROCESS */}
          <section>
            <Typography component="h2" variant="h6" className="legal-section-title">
              Refund Request Process
            </Typography>

            <Typography className="legal-text">
              Refund requests must be submitted within <strong>7 days</strong>
              of the purchase date along with valid proof of payment. Requests
              received after this period will not be eligible for review.
            </Typography>
          </section>

          {/* DECISION */}
          <section>
            <Typography component="h2" variant="h6" className="legal-section-title">
              Final Decision
            </Typography>

            <Typography className="legal-text">
              The IT Wallah reserves the right to approve or reject any refund
              request after reviewing the details. Approved refunds, if any,
              will be processed using the original payment method.
            </Typography>
          </section>

          <Divider className="legal-divider" />

          {/* CONTACT */}
          <Box className="legal-footer">
            <EmailIcon aria-hidden="true" />
            <Typography>
              For refund-related queries, contact us at{" "}
              <strong>theitwallah@gmail.com</strong>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RefundPolicy;
