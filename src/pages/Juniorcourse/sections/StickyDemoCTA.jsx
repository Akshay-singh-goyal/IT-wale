import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StickyDemoCTA() {
  const navigate = useNavigate();
  const triggerRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Invisible trigger (appears when user scrolls here) */}
      <div ref={triggerRef} style={{ height: "1px" }} />

      {show && (
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            zIndex: 1300,
            backgroundColor: "#ffffff",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
            px: { xs: 2, md: 4 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography fontWeight={600}>
            Ready to begin your Child’s learning journey?
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff8c1a",
              px: 4,
              "&:hover": {
                backgroundColor: "#ff7a00",
              },
            }}
            onClick={() => navigate("/book-demo")}
          >
            Book a Demo
          </Button>
        </Box>
      )}
    </>
  );
}
