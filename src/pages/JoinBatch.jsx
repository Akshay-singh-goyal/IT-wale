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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import qrImg from "../Images/Qr.jpeg";

/* ================= API ================= */
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://sm-backend-8me3.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function JoinPage() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [user, setUser] = useState(null);
  const [paymentType, setPaymentType] = useState("paid");
  const [agree, setAgree] = useState(false);

  const [openPaidQR, setOpenPaidQR] = useState(false);
  const [openUnpaidQR, setOpenUnpaidQR] = useState(false);
  const [openTestDialog, setOpenTestDialog] = useState(false);

  const [txnId, setTxnId] = useState("");
  const [testDate, setTestDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [status, setStatus] = useState("NOT_REGISTERED");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("accessToken");
    if (u && t) setUser(JSON.parse(u));
  }, []);

  /* ================= CHECK STATUS ================= */
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get("/api/register/status/default123");
        if (!res.data.registered) setStatus("NOT_REGISTERED");
        else if (!res.data.adminApproved) setStatus("WAITING");
        else setStatus("APPROVED");
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, []);

  /* ================= ENROLL ================= */
  const handleEnroll = () => {
    if (!user) return navigate("/login");
    if (!agree) return toast.warning("Accept Terms & Conditions");

    paymentType === "paid"
      ? setOpenPaidQR(true)
      : setOpenUnpaidQR(true);
  };

  /* ================= PAID REGISTER (₹2000) ================= */
  const handlePaidRegister = async () => {
    if (!txnId.trim()) return toast.error("Enter transaction ID");

    setSubmitting(true);
    try {
      const res = await api.post("/api/register", {
        batchId: "default123",
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setStatus("WAITING");
      setOpenPaidQR(false);
      setTxnId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UNPAID REGISTER (₹200) ================= */
  const handleUnpaidRegister = async () => {
    if (!txnId.trim()) return toast.error("Enter transaction ID");

    setSubmitting(true);
    try {
      const res = await api.post("/api/register/unpaid", {
        batchId: "default123",
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setStatus("WAITING");
      setOpenUnpaidQR(false);
      setTxnId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= TEST DATE ================= */
  const submitTestDate = () => {
    if (!testDate) return toast.error("Select test date");
    toast.success("Test date submitted");
    setOpenTestDialog(false);
    setStatus("TEST_SCHEDULED");
  };

  return (
    <Container sx={{ py: 6 }}>
      <ToastContainer position="bottom-center" />

      {/* ===== VIDEO BANNER (YouTube Style) ===== */}
      <Box sx={{ mb: 4 }}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/dGcsHMXbSOA"
          title="Course Intro"
          frameBorder="0"
          allowFullScreen
          style={{ borderRadius: 12 }}
        />
      </Box>

      {/* ===== STATUS ===== */}
      {status === "WAITING" && (
        <Typography color="orange" sx={{ mb: 2 }}>
          ⏳ Waiting for admin approval
        </Typography>
      )}

      {status === "APPROVED" && (
        <Button sx={{ mb: 2 }} onClick={() => setOpenTestDialog(true)}>
          Select Test Date
        </Button>
      )}

      {status === "TEST_SCHEDULED" && (
        <Typography color="green" sx={{ mb: 2 }}>
          🧪 Test Scheduled – Countdown running
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">Course Registration</Typography>

              <RadioGroup
                row
                sx={{ mt: 2 }}
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <FormControlLabel
                  value="paid"
                  control={<Radio />}
                  label="Paid Course (₹2000)"
                />
                <FormControlLabel
                  value="unpaid"
                  control={<Radio />}
                  label="Unpaid Course (₹200 Registration + Test)"
                />
              </RadioGroup>

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
                  onClick={handleEnroll}
                >
                  Proceed
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              <AccountCircleIcon /> User Info
            </Typography>
            {user ? (
              <>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Mobile: {user.mobile}</Typography>
              </>
            ) : (
              <Typography>Please login</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* ===== PAID QR ₹2000 ===== */}
      <Dialog open={openPaidQR} onClose={() => setOpenPaidQR(false)}>
        <DialogTitle>Pay ₹2000</DialogTitle>
        <DialogContent>
          <img src={qrImg} alt="QR" width="220" />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaidQR(false)}>Cancel</Button>
          <Button onClick={handlePaidRegister}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== UNPAID QR ₹200 ===== */}
      <Dialog open={openUnpaidQR} onClose={() => setOpenUnpaidQR(false)}>
        <DialogTitle>Pay ₹200 (Registration)</DialogTitle>
        <DialogContent>
          <img src={qrImg} alt="QR" width="220" />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnpaidQR(false)}>Cancel</Button>
          <Button onClick={handleUnpaidRegister}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== TEST DATE ===== */}
      <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)}>
        <DialogTitle>Select Test Date</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="datetime-local"
            onChange={(e) => setTestDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitTestDate}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
