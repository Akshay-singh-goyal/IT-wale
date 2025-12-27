 
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
import img2 from "../Images/Qr.jpeg";

/* ================= AXIOS INSTANCE (FIXED) ================= */
const api = axios.create({
  baseURL: "https://sm-backend-8me3.onrender.com",
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

  // User & Registration States
  const [user, setUser] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  // Payment / Flow
  const [paymentType, setPaymentType] = useState("paid");
  const [agree, setAgree] = useState(false);

  // Dialog States
  const [openQR, setOpenQR] = useState(false);
  const [openCourseQR, setOpenCourseQR] = useState(false);
  const [openUnpaidReg, setOpenUnpaidReg] = useState(false);
  const [openSlot, setOpenSlot] = useState(false);
  const [openTest, setOpenTest] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const [txnId, setTxnId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [testScore, setTestScore] = useState("");
  const [goForTest, setGoForTest] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  /* ================= FETCH STATUS ================= */
  const fetchStatus = async () => {
    try {
      const paid = await api.get("/api/register/status/default123?type=paid");
      const unpaid = await api.get("/api/register/status/default123?type=unpaid");

      const status = paid.data || unpaid.data || null;
      setRegistrationStatus(status);

      if (status?.paymentType === "unpaid" && status.testSlot) {
        if (Date.now() >= new Date(status.testSlot).getTime()) {
          setGoForTest(true);
        }
      }
    } catch (err) {
      console.error("Status error:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  /* ================= ROADMAP ================= */
  const handleEnrollFromRoadmap = (lang) => {
    toast.info(`You selected "${lang.title}" batch`);
    paymentType === "paid" ? setOpenQR(true) : handleUnpaidClick();
  };

  /* ================= PAID FLOW ================= */
  const handleOpenQR = () => {
    if (!agree) return toast.warning("Accept terms & conditions");
    if (!user) return navigate("/login");

    if (!registrationStatus) setOpenQR(true);
    else if (registrationStatus.registrationFeePaid && !registrationStatus.adminApproved)
      toast.info("Waiting for admin approval");
    else if (registrationStatus.adminApproved && !registrationStatus.courseFeePaid)
      setOpenCourseQR(true);
  };

  const handleSubmitRegistration = async () => {
    if (!txnId) return toast.error("Enter transaction ID");
    setSubmitting(true);
    try {
      const res = await api.post("/api/register", {
        batchId: "default123",
        transactionId: txnId,
        paymentType: "paid",
      });
      toast.success(res.data.message);
      setRegistrationStatus(res.data.registration);
      setOpenQR(false);
      setTxnId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitCoursePayment = async () => {
    if (!txnId) return toast.error("Enter transaction ID");
    setSubmitting(true);
    try {
      const res = await api.post(`/api/register/course/pay/${registrationStatus._id}`, {
        amount: 2000,
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setRegistrationStatus(res.data.registration);
      setOpenCourseQR(false);
      setTxnId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UNPAID FLOW ================= */
  const handleUnpaidClick = () => {
    if (!agree) return toast.warning("Accept terms");
    if (!user) return navigate("/login");
    setOpenUnpaidReg(true);
  };

  const handleSubmitUnpaidRegistration = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/api/register/unpaid", {
        batchId: "default123",
        paymentType: "unpaid",
      });
      toast.success(res.data.message);
      setRegistrationStatus(res.data.registration);
      setOpenUnpaidReg(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return toast.error("Select slot");
    try {
      const res = await api.post("/api/register/unpaid/slot", {
        batchId: "default123",
        slot: selectedSlot,
      });
      toast.success(res.data.message);
      setRegistrationStatus(res.data.registration);
      setOpenSlot(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleSubmitTest = async () => {
    if (!testScore) return toast.error("Enter test score");
    try {
      const res = await api.post("/api/register/unpaid/test", {
        batchId: "default123",
        testScore,
      });
      toast.success(res.data.message);
      setOpenTest(false);
      setRegistrationStatus({ ...registrationStatus, testScore });
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleGoForTest = () => navigate("/test-page");

  return (
    <Container sx={{ py: 6 }}>
      <ToastContainer position="bottom-center" />
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card elevation={6}>
            <CardContent>
              <Typography variant="h4" className="main-title">
  <PaidIcon className="icon" />
  Full Stack MERN Bootcamp
</Typography>

              <Typography sx={{ mt: 1, color: "text.secondary" }}>
                Learn MERN Stack from scratch with live sessions, projects, and notes.
              </Typography>

             <Box className="fee-box" sx={{ mt: 3 }}>
  <Typography>
    <CheckCircleIcon className="icon" /> Registration Fee: ₹200
  </Typography>
  <Typography>
    <PaidIcon className="icon" /> Course Fee: ₹2000
  </Typography>
</Box>


              <Box sx={{ mt: 3, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                <FormControlLabel
                  control={<Checkbox checked={paymentType === "paid"} onChange={(e) => setPaymentType(e.target.checked ? "paid" : "unpaid")} />}
                  label="Paid Course (₹2000)"
                />
                <FormControlLabel
                  control={<Checkbox checked={paymentType === "unpaid"} onChange={(e) => setPaymentType(e.target.checked ? "unpaid" : "paid")} />}
                  label="Unpaid Course (₹0, test required)"
                />
              </Box>

              <Roadmap onEnroll={handleEnrollFromRoadmap} />

              <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControlLabel
                  control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
                  label={<span>I agree to <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setOpenTerms(true)}>terms & conditions</span></span>}
                />

                {/* Paid Flow */}
                {paymentType === "paid" && (
                  <Button
                    variant={registrationStatus?.courseFeePaid ? "contained" : "outlined"}
                    color={registrationStatus?.courseFeePaid ? "success" : "primary"}
                    onClick={handleOpenQR}
                    disabled={registrationStatus?.courseFeePaid || (registrationStatus?.registrationFeePaid && !registrationStatus?.adminApproved)}
                  >
                    {registrationStatus?.courseFeePaid
                      ? "Seat Confirmed"
                      : registrationStatus?.adminApproved
                      ? "Pay Course Fee ₹2000"
                      : registrationStatus?.registrationFeePaid
                      ? "Waiting for admin approval"
                      : "Pay ₹200 & Register"}
                  </Button>
                )}

                {/* Unpaid Flow */}
                {paymentType === "unpaid" && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleUnpaidClick}
                      disabled={registrationStatus?.paymentType === "paid"}
                    >
                      {registrationStatus?.testScore
                        ? "Test Completed"
                        : registrationStatus?.testSlot
                        ? "Slot Booked, Await Test"
                        : registrationStatus?.adminApproved
                        ? "Register & Schedule Test"
                        : "Register (Waiting Admin)"}
                    </Button>

                    {goForTest && (
                      <Button variant="contained" color="primary" onClick={handleGoForTest}>
                        Go for Test
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <Paper sx={{ p: 3, mb: 4 }}>
             <Typography className="sidebar-title">
  <AccountCircleIcon className="icon" />
  User Info
</Typography>

              {user ? (
                <>
                  <Typography>Name: {user.name}</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>Mobile: {user.mobile}</Typography>
                  <Typography>Points: {user.points ?? 0}</Typography>
                  {registrationStatus && (
                    <Box sx={{ mt: 2 }}>
                      <Typography sx={{ fontWeight: 600, color: "green" }}>
                        Status: {registrationStatus.paymentType?.toUpperCase() || "N/A"}
                      </Typography>
                      {registrationStatus.testSlot && (
                        <Typography>Slot: {new Date(registrationStatus.testSlot).toLocaleString()}</Typography>
                      )}
                      {registrationStatus.testScore && (
                        <Typography>Test Score: {registrationStatus.testScore}</Typography>
                      )}
                      {registrationStatus.adminApproved && !registrationStatus.courseFeePaid && paymentType === "paid" && (
                        <Typography color="warning.main">Admin Approved! Pay Course Fee ₹2000</Typography>
                      )}
                      {registrationStatus.courseFeePaid && (
                       <Typography className="status-paid">
  <CheckCircleIcon className="icon" /> Seat Confirmed
</Typography>

                      )}
                    </Box>
                  )}
                </>
              ) : <Typography>Please login to see your info</Typography>}
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Dialogs */}
      {/* Paid Registration */}
      <Dialog open={openQR} onClose={() => setOpenQR(false)}>
        <Button className="action-btn" variant="contained">
  <PaidIcon className="icon" />
  Pay ₹200 & Register
</Button>

        <DialogContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img src={img2} alt="QR Code" width="220" />
            <Typography variant="body2" color="text.secondary">
              Scan QR & complete payment
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQR(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitRegistration} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Paid Course Fee */}
      <Dialog open={openCourseQR} onClose={() => setOpenCourseQR(false)}>
        <DialogTitle>Pay Course Fee ₹2000</DialogTitle>
        
        <DialogContent>
          <TextField fullWidth label="Transaction ID" value={txnId} onChange={(e) => setTxnId(e.target.value)} />
          <Typography variant="body2" color="text.secondary">
            After submitting, wait for admin approval to confirm your seat.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCourseQR(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitCoursePayment} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Payment"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unpaid Registration */}
      <Dialog open={openUnpaidReg} onClose={() => setOpenUnpaidReg(false)}>
        <Button className="action-btn" variant="outlined">
  <FreeIcon className="icon" />
  Pay Registration Fee ₹200 (Unpaid Course)
</Button>

        <DialogContent>
          <TextField fullWidth label="Transaction ID" value={txnId} onChange={(e) => setTxnId(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnpaidReg(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitUnpaidRegistration} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terms & Conditions */}
      <Dialog open={openTerms} onClose={() => setOpenTerms(false)}>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <Typography>
            1. Registration fee ₹200 is mandatory.<br />
            2. Paid course: ₹2000, instant registration after admin approval.<br />
            3. Unpaid course: ₹0, requires slot + test.<br />
            4. Attend classes as per schedule.<br />
            5. Refund & cancellation policies apply.<br />
            6. Selecting unpaid confirms agreement.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTerms(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Unpaid Slot */}
      <Dialog open={openSlot} onClose={() => setOpenSlot(false)}>
        <DialogTitle>Select Slot for Test</DialogTitle>
        <DialogContent>
          <TextField type="datetime-local" fullWidth value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSlot(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleBookSlot}>Book Slot</Button>
        </DialogActions>
      </Dialog>

      {/* Unpaid Test */}
      <Dialog open={openTest} onClose={() => setOpenTest(false)}>
        <DialogTitle>Submit Test Score</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Test Score" type="number" value={testScore} onChange={(e) => setTestScore(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTest(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitTest}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
