import React, { useEffect, useState } from "react";
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
  TextField,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";

const backendURL = "https://sm-backend-8me3.onrender.com";

const AdminContacts = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState({}); // store replies per ticket

  const token = localStorage.getItem("accessToken");

  // Fetch all contact tickets
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.tickets || res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Send reply to a user
  const handleReply = async (ticketId) => {
    if (!reply[ticketId]) return alert("Enter a reply first");
    try {
      await axios.put(
        `${backendURL}/api/admin/contact/${ticketId}/reply`,
        { reply: reply[ticketId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReply((prev) => ({ ...prev, [ticketId]: "" }));
      fetchTickets();
      alert("Reply sent successfully!");
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply.");
    }
  };

  // Mark ticket as resolved
  const handleResolve = async (ticketId) => {
    try {
      await axios.put(
        `${backendURL}/api/admin/contact/${ticketId}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets();
    } catch (err) {
      console.error("Error resolving ticket:", err);
      alert("Failed to resolve ticket.");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" py={5} textAlign="center">
        {error}
      </Typography>
    );

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" mb={3}>
        Admin Panel - User Contacts / Complaints
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Reply</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id}>
              <TableCell>{ticket.name}</TableCell>
              <TableCell>{ticket.email}</TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.message}</TableCell>

              {/* Reply input */}
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  value={reply[ticket._id] || ticket.reply || ""}
                  onChange={(e) =>
                    setReply((prev) => ({ ...prev, [ticket._id]: e.target.value }))
                  }
                  placeholder="Type your reply..."
                />
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  variant="contained"
                  onClick={() => handleReply(ticket._id)}
                >
                  Send
                </Button>
              </TableCell>

              {/* Status */}
              <TableCell>
                {ticket.resolved ? "Resolved" : "Pending"}
              </TableCell>

              {/* Actions */}
              <TableCell>
                {!ticket.resolved && (
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleResolve(ticket._id)}
                  >
                    Mark Resolved
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminContacts;
