import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

// Status options
const statusOptions = [
  "NOT_REGISTERED",
  "MODE_SELECTED",
  "WAITING_ADMIN",
  "ADMIN_APPROVED",
  "SEAT_CONFIRMED",
];

// Backend URL
const backendURL = "https://sm-backend-8me3.onrender.com";

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Fetch all registrations
  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/admin/registrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(res.data.registrations || res.data);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Update registration status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${backendURL}/api/admin/registration/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRegistrations();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Admin approve/unapprove
  const handleAdminApprove = async (id, approved) => {
    try {
      await axios.put(
        `${backendURL}/api/admin/registration/${id}/status`,
        { adminApproved: approved },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRegistrations();
    } catch (err) {
      console.error("Error updating admin approval:", err);
    }
  };

  // Update payment mode
  const handleModeUpdate = async (id, mode) => {
    try {
      await axios.put(
        `${backendURL}/api/admin/registration/${id}/mode`,
        { mode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRegistrations();
    } catch (err) {
      console.error("Error updating mode:", err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" mb={3}>
        Admin Panel - Registrations
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Admin Approved</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {registrations.map((reg) => (
            <TableRow key={reg._id}>
              <TableCell>{reg.name}</TableCell>
              <TableCell>{reg.email}</TableCell>
              <TableCell>{reg.mobile}</TableCell>

              {/* Mode */}
              <TableCell>
                <Select
                  value={reg.mode || "UNPAID"}
                  onChange={(e) => handleModeUpdate(reg._id, e.target.value)}
                >
                  <MenuItem value="PAID">PAID</MenuItem>
                  <MenuItem value="UNPAID">UNPAID</MenuItem>
                </Select>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Select
                  value={reg.status}
                  onChange={(e) => handleStatusChange(reg._id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>

              {/* Admin Approved */}
              <TableCell>
                <Button
                  variant={reg.adminApproved ? "contained" : "outlined"}
                  color="success"
                  onClick={() =>
                    handleAdminApprove(reg._id, !reg.adminApproved)
                  }
                >
                  {reg.adminApproved ? "Approved" : "Approve"}
                </Button>
              </TableCell>

              {/* Extra Actions */}
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => alert("Perform extra action")}
                >
                  Action
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminRegistrations;
