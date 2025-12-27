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
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function JoinPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [paymentType, setPaymentType] = useState("paid");
  const [agree, setAgree] = useState(false);

  const [openPaidQR, setOpenPaidQR] = useState(false);
  const [openUnpaidQR, setOpenUnpaidQR] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const [txnId, setTxnId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("accessToken");
    if (u && t) setUser(JSON.parse(u));
  }, []);

  /* ================= ENROLL ================= */
  const handleEnroll = () => {
    if (!user) return navigate("/login");
    if (!agree) return toast.warning("Accept Terms & Conditions");

    paymentType === "paid"
      ? setOpenPaidQR(true)
      : setOpenUnpaidQR(true);
  };

  /* ================= PAID ================= */
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
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UNPAID ================= */
  const handleUnpaidRegister = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/api/register/unpaid", {
        batchId: "default123",
      });
      toast.success(res.data.message);
      setOpenUnpaidQR(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
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
            Learn React, Node & MongoDB with Projects
          </Typography>
        </Box>
      </Box>

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

              <Button variant="contained" sx={{ mt: 3 }} onClick={handleEnroll}>
                Proceed
              </Button>
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

      {/* PAID */}
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

      {/* UNPAID */}
      <Dialog open={openUnpaidQR} onClose={() => setOpenUnpaidQR(false)}>
        <DialogTitle>Register (Unpaid)</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenUnpaidQR(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUnpaidRegister}>
            Register
          </Button>
        </DialogActions>
      </Dialog>

      {/* TERMS */}
      <Dialog open={openTerms} onClose={() => setOpenTerms(false)}>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <Typography>
            Paid course requires ₹2000 registration.  
            Unpaid course requires test clearance.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTerms(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
