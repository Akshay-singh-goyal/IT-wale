import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        All Registered Users
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Avatar</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Mobile</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Courses</b></TableCell>
              <TableCell><b>Books</b></TableCell>
              <TableCell><b>Wishlist</b></TableCell>
              <TableCell><b>Payments</b></TableCell>
              <TableCell><b>Created At</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
                </TableCell>

                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>

                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === "admin" ? "error" : "primary"}
                    size="small"
                  />
                </TableCell>

                <TableCell>{user.completedCourses.length}</TableCell>
                <TableCell>{user.purchasedBooks.length}</TableCell>
                <TableCell>{user.wishlist.length}</TableCell>
                <TableCell>{user.paymentHistory.length}</TableCell>

                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
