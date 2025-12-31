import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  Box,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import qrImg from "../Images/Qr.jpeg";
import bannerImg from "../Images/banner.jpeg"; // Landing image

const api = axios.create({
  baseURL: "https://sm-backend-8me3.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function JoinBatch() {
  const navigate = useNavigate();

  // STATES
  const [agree, setAgree] = useState(false);
  const [mode, setMode] = useState(""); // PAID | UNPAID
  const [status, setStatus] = useState("NOT_REGISTERED");
  const [adminApproved, setAdminApproved] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [openRegPay, setOpenRegPay] = useState(false);
  const [openCoursePay, setOpenCoursePay] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [testDate, setTestDate] = useState("");
  const [testTime, setTestTime] = useState("");
  const [profile, setProfile] = useState({ name: "", email: "", mobile: "" });
  const [timer, setTimer] = useState(0);
  const timerRef = useRef();

  const steps = [
    "NOT_REGISTERED",
    "MODE_SELECTED",
    "WAITING_ADMIN",
    "ADMIN_APPROVED",
    "SEAT_CONFIRMED",
  ];

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login");
      navigate("/login");
    } else {
      fetchStatus();
    }
  }, []);

  // FETCH STATUS
  const fetchStatus = async () => {
    try {
      const res = await api.get("/api/register/status");
      const data = res.data;
      setStatus(data.status);
      setMode(data.mode || "");
      setAdminApproved(data.adminApproved || false);
      setProfile({ name: data.name, email: data.email, mobile: data.mobile });

      // If test slot booked, calculate countdown
      if (data.testSlot?.date && data.testSlot?.time) {
        const testDateTime = new Date(`${data.testSlot.date}T${data.testSlot.time}`);
        const diff = Math.floor((testDateTime - new Date()) / 1000);
        if (diff > 0) setTimer(diff);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // TIMER EFFECT
  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timer]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // SELECT MODE
  const selectMode = async (m) => {
    if (!agree) return toast.error("Accept Terms & Conditions");
    try {
      await api.post("/api/register/select-mode", {
        batchId: "default123",
        mode: m,
        termsAccepted: true,
      });
      setMode(m);
      setStatus("MODE_SELECTED");
      setOpenRegPay(true);
      setShowForm(true);
      toast.success(`${m} course selected`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to select mode");
    }
  };

  // REGISTRATION PAYMENT
  const payRegistration = async () => {
    if (!txnId) return toast.error("Transaction ID required");
    try {
      await api.post("/api/register/registration-pay", {
        batchId: "default123",
        transactionId: txnId,
        mode,
        amount: mode === "PAID" ? 200 : 1200,
      });
      toast.success("Payment submitted. Waiting for admin approval");
      setTxnId("");
      setOpenRegPay(false);
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  // TEST SLOT BOOKING
  const submitTestSlot = async () => {
    if (!testDate || !testTime)
      return toast.error("Select date & time");

    try {
      await api.post("/api/register/test-slot", {
        batchId: "default123",
        date: testDate,
        time: testTime,
      });
      toast.success("Test slot booked successfully");
      fetchStatus();
    } catch (err) {
      toast.error("Failed to book test slot");
    }
  };

  // COURSE PAYMENT
  const payCourseFee = async () => {
    if (!txnId) return toast.error("Transaction ID required");
    try {
      await api.post("/api/register/course-pay", {
        batchId: "default123",
        transactionId: txnId,
        amount: 2000,
      });
      toast.success("🎉 Seat confirmed");
      setTxnId("");
      setOpenCoursePay(false);
      fetchStatus();
    } catch (err) {
      toast.error("Payment failed");
    }
  };

  // PDF RECEIPT
  const downloadReceipt = () => {
    const pdf = new jsPDF();
    pdf.text("Seat Confirmation", 20, 20);
    pdf.text(`Course Type: ${mode}`, 20, 40);
    pdf.text(`Status: ${status}`, 20, 60);
    pdf.save("seat-confirmation.pdf");
  };

  return (
    <Container sx={{ py: 5 }}>
      <ToastContainer position="bottom-center" />

      {/* USER PROFILE TOP RIGHT */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Avatar sx={{ mr: 1 }}>{profile.name[0]}</Avatar>
        <Box>
          <Typography>{profile.name}</Typography>
          <Typography variant="caption">{profile.email}</Typography>
        </Box>
      </Box>

      {/* BANNER IMAGE + ENROLL BUTTON */}
      {!showForm && (
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img src={bannerImg} alt="Banner" style={{ width: "100%", maxHeight: 300 }} />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setShowForm(true)}
          >
            Enroll Now
          </Button>
        </Box>
      )}

      {/* FORM & STEPPER */}
      {showForm && (
        <>
          <Stepper activeStep={steps.indexOf(status)} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((s) => (
              <Step key={s}>
                <StepLabel>{s.replaceAll("_", " ")}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Join Batch
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                    }
                    label="I agree to Terms & Conditions"
                  />

                  {!mode && (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item>
                        <Button variant="contained" onClick={() => selectMode("PAID")}>
                          Paid Course
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" onClick={() => selectMode("UNPAID")}>
                          Unpaid Course
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {/* WAITING FOR ADMIN */}
                 {status === "ADMIN_APPROVED" && adminApproved && mode === "UNPAID" && (
  <Box sx={{ mt: 3 }}>
    <Typography>Select Test Slot</Typography>
    <TextField
      type="date"
      fullWidth
      sx={{ mt: 1 }}
      value={testDate}
      onChange={(e) => setTestDate(e.target.value)}
    />
    <TextField
      type="time"
      fullWidth
      sx={{ mt: 2 }}
      value={testTime}
      onChange={(e) => setTestTime(e.target.value)}
    />
    <Button sx={{ mt: 2 }} variant="contained" onClick={submitTestSlot}>
      Submit Test Slot
    </Button>

    {timer > 0 && (
      <Typography sx={{ mt: 2, fontWeight: "bold" }}>
        ⏱ Test starts in: {formatTime(timer)}
      </Typography>
    )}

    {timer === 0 && (
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={() => navigate("/test-page")} // replace with actual test route
      >
        Go to Test
      </Button>
    )}
  </Box>
)}


                  {/* PAID COURSE PAYMENT */}
                  {status === "ADMIN_APPROVED" && mode === "PAID" && adminApproved && (
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      onClick={() => setOpenCoursePay(true)}
                    >
                      Pay ₹2000 Course Fee
                    </Button>
                  )}

                  {/* SEAT CONFIRMED */}
                  {status === "SEAT_CONFIRMED" && (
                    <Box sx={{ mt: 3 }}>
                      <Typography sx={{ color: "green" }}>
                        🎉 Seat Confirmed
                      </Typography>
                      <Button sx={{ mt: 2 }} onClick={downloadReceipt}>
                        Download Receipt
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* STATUS PANEL */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Current Status</Typography>
                <Typography>Status: {status}</Typography>
                <Typography>Mode: {mode}</Typography>
                <Typography>Admin Approved: {adminApproved ? "Yes" : "No"}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* REGISTRATION PAYMENT */}
      <Dialog open={openRegPay} onClose={() => setOpenRegPay(false)}>
        <DialogTitle>
          Pay Registration Fee ₹{mode === "PAID" ? 200 : 1200}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img src={qrImg} alt="QR" style={{ width: 220 }} />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRegPay(false)}>Cancel</Button>
          <Button variant="contained" onClick={payRegistration}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* COURSE PAYMENT */}
      <Dialog open={openCoursePay} onClose={() => setOpenCoursePay(false)}>
        <DialogTitle>Pay Course Fee ₹2000</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img src={qrImg} alt="QR" style={{ width: 220 }} />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCoursePay(false)}>Cancel</Button>
          <Button variant="contained" onClick={payCourseFee}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
