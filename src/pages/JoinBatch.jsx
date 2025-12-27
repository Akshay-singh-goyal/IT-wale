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
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Roadmap from "./Roadmap";
import PaidIcon from "@mui/icons-material/Payments";
import FreeIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import qrImg from "../Images/Qr.jpeg";
import bannerImg from "../Images/banner.jpg"; // 👈 add banner image

/* ================= AXIOS ================= */
const api = axios.create({
  baseURL: "https://sm-backend-8me3.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function JoinPage() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [user, setUser] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const [paymentType, setPaymentType] = useState("paid");
  const [agree, setAgree] = useState(false);

  const [openPaidQR, setOpenPaidQR] = useState(false);
  const [openUnpaidQR, setOpenUnpaidQR] = useState(false);
  const [openCourseQR, setOpenCourseQR] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const [txnId, setTxnId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("accessToken");
    if (u && t) setUser(JSON.parse(u));
  }, []);

  /* ================= FETCH STATUS ================= */
  const fetchStatus = async () => {
    try {
      const res = await api.get("/api/register/status/default123");
      setRegistrationStatus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchStatus();
  }, [user]);

  /* ================= ENROLL ================= */
  const handleEnroll = () => {
    if (!agree) return toast.warning("Accept Terms & Conditions");
    if (!user) return navigate("/login");

    if (paymentType === "paid") setOpenPaidQR(true);
    else setOpenUnpaidQR(true);
  };

  /* ================= PAID REGISTER ================= */
  const handlePaidRegister = async () => {
    if (!txnId) return toast.error("Enter transaction ID");
    setSubmitting(true);
    try {
      const res = await api.post("/api/register", {
        batchId: "default123",
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setRegistrationStatus(res.data.registration);
      setOpenPaidQR(false);
      setTxnId("");
    } catch (err) {
      toast.error(err.response?.data?.message);
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
      setRegistrationStatus(res.data.registration);
      setOpenUnpaidQR(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

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
            Learn React, Node, MongoDB with Live Projects
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* ===== LEFT ===== */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Course Registration
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={paymentType === "paid"}
                      onChange={() => setPaymentType("paid")}
                    />
                  }
                  label="Paid Course (₹2000)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={paymentType === "unpaid"}
                      onChange={() => setPaymentType("unpaid")}
                    />
                  }
                  label="Unpaid Course (Test Required)"
                />
              </Box>

              <Roadmap onEnroll={handleEnroll} />

              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                }
                label={
                  <span>
                    I agree to{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => setOpenTerms(true)}
                    >
                      Terms & Conditions
                    </span>
                  </span>
                }
              />

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleEnroll}
              >
                Proceed
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ===== RIGHT ===== */}
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
        <DialogTitle>Pay ₹200 & Register</DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <img src={qrImg} width="220" alt="QR" />
          </Box>
          <TextField
            fullWidth
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaidQR(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePaidRegister}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== UNPAID QR ===== */}
      <Dialog open={openUnpaidQR} onClose={() => setOpenUnpaidQR(false)}>
        <DialogTitle>Register (Unpaid Course)</DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <img src={qrImg} width="220" alt="QR" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnpaidQR(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUnpaidRegister}>
            Register
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== TERMS ===== */}
      <Dialog open={openTerms} onClose={() => setOpenTerms(false)}>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <Typography>
            Registration fee ₹200 is mandatory. Paid course requires admin
            approval. Unpaid course requires test clearance.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTerms(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
