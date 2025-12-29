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

import Roadmap from "./Roadmap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import qrImg from "../Images/Qr.jpeg";
import bannerImg from "../Images/banner.jpeg";

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
  const [openUnpaidConfirm, setOpenUnpaidConfirm] = useState(false);
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

  /* ================= CHECK REGISTRATION STATUS ================= */
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get("/api/register/status/default123");

        if (!res.data.registered) {
          setStatus("NOT_REGISTERED");
        } else if (!res.data.adminApproved) {
          setStatus("WAITING");
        } else if (res.data.paymentType === "unpaid") {
          setStatus("APPROVED");
        } else {
          setStatus("APPROVED");
        }
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
      : setOpenUnpaidConfirm(true);
  };

  /* ================= PAID REGISTER ================= */
  const handlePaidRegister = async () => {
    if (!txnId.trim()) return toast.error("Enter transaction ID");

    setSubmitting(true);
    try {
      const res = await api.post("/api/register", {
        batchId: "default123",
        transactionId: txnId,
      });

      toast.success(res.data.message);
      setOpenPaidQR(false);
      setTxnId("");
      setStatus("WAITING");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UNPAID REGISTER ================= */
  const handleUnpaidRegister = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/api/register/unpaid", {
        batchId: "default123",
      });

      toast.success(res.data.message);
      setOpenUnpaidConfirm(false);
      setStatus("WAITING");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= TEST DATE SUBMIT ================= */
  const submitTestDate = () => {
    if (!testDate) return toast.error("Select test date");
    toast.success("Test date submitted");
    setOpenTestDialog(false);
    setStatus("TEST_SCHEDULED");
  };

  /* ================= UI ================= */
  return (
    <Container sx={{ py: 6 }}>
      <ToastContainer position="bottom-center" />

      {/* ===== Banner ===== */}
      <Box
        sx={{
          height: 220,
          background: `url(${bannerImg}) center/cover`,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Box sx={{ bgcolor: "rgba(0,0,0,0.55)", height: "100%", p: 3 }}>
          <Typography variant="h4" color="#fff">
            Full Stack MERN Bootcamp
          </Typography>
          <Typography color="#ddd">
            Learn React, Node & MongoDB with Projects
          </Typography>
        </Box>
      </Box>

      {/* ===== STATUS VIEW ===== */}
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

      {/* ===== MAIN GRID ===== */}
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
                  label="Unpaid Course (Test Required)"
                />
              </RadioGroup>

              <Roadmap onEnroll={handleEnroll} />

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

      {/* ===== PAID QR ===== */}
      <Dialog open={openPaidQR} onClose={() => setOpenPaidQR(false)}>
        <DialogTitle>Pay ₹2000 & Register</DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <img src={qrImg} alt="QR" width="220" />
          </Box>
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
          <Button variant="contained" onClick={handlePaidRegister}>
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

      {/* ===== UNPAID CONFIRM ===== */}
      <Dialog
        open={openUnpaidConfirm}
        onClose={() => setOpenUnpaidConfirm(false)}
      >
        <DialogTitle>Confirm Unpaid Registration</DialogTitle>
        <DialogContent>
          <Typography>
            You will need to clear a test to join this course.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnpaidConfirm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUnpaidRegister}>
            {submitting ? "Submitting..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
