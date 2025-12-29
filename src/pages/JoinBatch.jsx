import React, { useEffect, useState } from "react";
// import api from "../api/api";
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";

const BATCH_ID = "default123";

export default function JoinBatch() {
  const [status, setStatus] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [openPaid, setOpenPaid] = useState(false);
  const [openUnpaid, setOpenUnpaid] = useState(false);
  const [slot, setSlot] = useState("");
  const [testScore, setTestScore] = useState("");

  /* ================= FETCH STATUS ================= */
  const fetchStatus = async () => {
    try {
      const res = await api.get(`/api/register/status/${BATCH_ID}`);
      setStatus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  /* ================= PAID REGISTER ================= */
  const handlePaidRegister = async () => {
    if (!txnId) return toast.error("Enter transaction id");

    try {
      const res = await api.post("/api/register", {
        batchId: BATCH_ID,
        transactionId: txnId,
      });
      toast.success(res.data.message);
      setOpenPaid(false);
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  /* ================= UNPAID REGISTER ================= */
  const handleUnpaidRegister = async () => {
    try {
      const res = await api.post("/api/register/unpaid", {
        batchId: BATCH_ID,
      });
      toast.success(res.data.message);
      setOpenUnpaid(false);
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  /* ================= SLOT BOOK ================= */
  const handleSlotBook = async () => {
    try {
      const res = await api.post("/api/register/unpaid/slot", {
        batchId: BATCH_ID,
        slot,
      });
      toast.success(res.data.message);
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  /* ================= SUBMIT TEST ================= */
  const handleSubmitTest = async () => {
    try {
      const res = await api.post("/api/register/unpaid/test", {
        batchId: BATCH_ID,
        testScore,
      });
      toast.success(res.data.message);
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Join MERN Bootcamp</Typography>

          {!status?.paymentType && (
            <>
              <Button sx={{ mt: 2 }} variant="contained" onClick={() => setOpenPaid(true)}>
                Paid Registration (₹200)
              </Button>

              <Button sx={{ mt: 2, ml: 2 }} variant="outlined" onClick={() => setOpenUnpaid(true)}>
                Unpaid Registration
              </Button>
            </>
          )}

          {status?.paymentType === "paid" && (
            <Typography sx={{ mt: 2, color: "green" }}>
              Paid Registered – Waiting Admin Approval
            </Typography>
          )}

          {status?.paymentType === "unpaid" && (
            <>
              {!status.testSlot && (
                <>
                  <Typography sx={{ mt: 2 }}>Book Test Slot</Typography>
                  <TextField
                    type="datetime-local"
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                  />
                  <Button onClick={handleSlotBook}>Book Slot</Button>
                </>
              )}

              {status.testSlot && !status.testScore && (
                <>
                  <Typography sx={{ mt: 2 }}>Submit Test Score</Typography>
                  <TextField
                    value={testScore}
                    onChange={(e) => setTestScore(e.target.value)}
                  />
                  <Button onClick={handleSubmitTest}>Submit Test</Button>
                </>
              )}

              {status.testScore && (
                <Typography sx={{ mt: 2, color: "orange" }}>
                  Test Submitted – Waiting Admin Approval
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ================= PAID DIALOG ================= */}
      <Dialog open={openPaid} onClose={() => setOpenPaid(false)}>
        <DialogTitle>Paid Registration</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaid(false)}>Cancel</Button>
          <Button onClick={handlePaidRegister}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* ================= UNPAID DIALOG ================= */}
      <Dialog open={openUnpaid} onClose={() => setOpenUnpaid(false)}>
        <DialogTitle>Unpaid Registration</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenUnpaid(false)}>Cancel</Button>
          <Button onClick={handleUnpaidRegister}>Register</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
