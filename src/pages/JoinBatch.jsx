import React, { useEffect, useState } from "react";
import "./roadmap.css";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import jsPDF from "jspdf";

import qrImg from "../Images/Qr.jpeg";
import courseImg from "../Images/banner1.jpeg";

/* ================= API ================= */
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://sm-backend-8me3.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ================= TIMELINE STEPS ================= */
const steps = [
  "Registration Fee Paid (₹200)",
  "Admin Approval",
  "Course Fee Paid (₹2000)",
  "Seat Confirmed",
];

export default function JoinPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");

  /* ================= STATES ================= */
  const [user, setUser] = useState(null);
  const [agree, setAgree] = useState(false);

  const [status, setStatus] = useState("NOT_REGISTERED");
  const [openPay200, setOpenPay200] = useState(false);
  const [openPay2000, setOpenPay2000] = useState(false);

  const [txnId, setTxnId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("accessToken");
    if (!t) navigate("/login");
    if (u) setUser(JSON.parse(u));
  }, [navigate]);

  /* ================= CHECK STATUS ================= */
  const fetchStatus = async () => {
    try {
      const res = await api.get("/api/register/status/default123");
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  /* ================= PAY ₹200 ================= */
  const payRegistrationFee = async () => {
    if (!txnId.trim()) return toast.error("Enter transaction ID");

    setSubmitting(true);
    try {
      const res = await api.post("/api/register/unpaid", {
        batchId: "default123",
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setOpenPay200(false);
      setTxnId("");
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= PAY ₹2000 ================= */
  const payCourseFee = async () => {
    if (!txnId.trim()) return toast.error("Enter transaction ID");

    setSubmitting(true);
    try {
      const res = await api.post("/api/register", {
        batchId: "default123",
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setOpenPay2000(false);
      setTxnId("");
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= RECEIPT PDF ================= */
  const downloadReceipt = () => {
    const pdf = new jsPDF();
    pdf.text("Payment Receipt", 20, 20);
    pdf.text(`Name: ${user.name}`, 20, 40);
    pdf.text(`Email: ${user.email}`, 20, 50);
    pdf.text(`Batch: default123`, 20, 60);
    pdf.text(`Status: Seat Confirmed`, 20, 70);
    pdf.text(`Note: Registration fee is non-refundable`, 20, 90);
    pdf.save("payment-receipt.pdf");
  };

  const activeStep =
    status === "NOT_REGISTERED"
      ? 0
      : status === "WAITING"
      ? 1
      : status === "APPROVED_WAITING_PAYMENT"
      ? 2
      : status === "SEAT_CONFIRMED"
      ? 3
      : 0;

  return (
    <Container sx={{ py: 5 }}>
      <ToastContainer position="bottom-center" />

      {/* ===== COURSE IMAGE ===== */}
      <Box textAlign="center" mb={3}>
        <img src={courseImg} width="100" height="100" alt="course" />
      </Box>

      {/* ===== USER INFO (TOP ON MOBILE) ===== */}
      {isMobile && user && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6">
            <AccountCircleIcon /> User Info
          </Typography>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Mobile: {user.mobile}</Typography>
        </Paper>
      )}

      {/* ===== STATUS TIMELINE ===== */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">Course Registration</Typography>

              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                }
                label="I agree to Terms & Conditions"
              />

              {status === "NOT_REGISTERED" && (
                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() =>
                    agree
                      ? setOpenPay200(true)
                      : toast.warning("Accept terms")
                  }
                >
                  Pay ₹200 Registration Fee
                </Button>
              )}

              {status === "WAITING" && (
                <Typography sx={{ mt: 3 }} color="orange">
                  ⏳ Waiting for admin approval
                </Typography>
              )}

              {status === "APPROVED_WAITING_PAYMENT" && (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3 }}
                  onClick={() => setOpenPay2000(true)}
                >
                  Pay ₹2000 Course Fee
                </Button>
              )}

              {status === "SEAT_CONFIRMED" && (
                <>
                  <Typography color="green" sx={{ mt: 3 }}>
                    🎉 Seat Confirmed
                  </Typography>
                  <Typography color="red">
                    Registration fee is non-refundable
                  </Typography>
                  <Button sx={{ mt: 2 }} onClick={downloadReceipt}>
                    Download Receipt (PDF)
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT (DESKTOP USER INFO) */}
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                <AccountCircleIcon /> User Info
              </Typography>
              {user && (
                <>
                  <Typography>Name: {user.name}</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>Mobile: {user.mobile}</Typography>
                </>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* ===== PAY ₹200 ===== */}
      <Dialog open={openPay200} onClose={() => setOpenPay200(false)}>
        <DialogTitle>Pay ₹200 Registration Fee</DialogTitle>
        <DialogContent>
          <img src={qrImg} width="220" alt="qr" />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPay200(false)}>Cancel</Button>
          <Button onClick={payRegistrationFee}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== PAY ₹2000 ===== */}
      <Dialog open={openPay2000} onClose={() => setOpenPay2000(false)}>
        <DialogTitle>Pay ₹2000 Course Fee</DialogTitle>
        <DialogContent>
          <img src={qrImg} width="220" alt="qr" />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPay2000(false)}>Cancel</Button>
          <Button onClick={payCourseFee}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
