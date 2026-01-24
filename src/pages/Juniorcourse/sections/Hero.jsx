import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";


export default function Hero() {
return (
<Box sx={{ background: "#eaf3ff", py: 10 }}>
<Container sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
<Box>
<Typography variant="h4" fontWeight={700}>
Make your child a math wizard
</Typography>
<Typography variant="h3" mt={2} fontWeight={800}>
With Mental Maths Course
</Typography>
<Typography mt={2}>Online classes for 1st to 8th</Typography>
<Button
variant="contained"
sx={{ mt: 4, bgcolor: "#000", px: 4 }}
>
Book Demo Session
</Button>
</Box>
<Box>{/* Image / Lottie here */}</Box>
</Container>
</Box>
);
}