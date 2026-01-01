// src/pages/Admin/sections/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const API = "https://sm-backend-8me3.onrender.com/api";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    registrations: 0,
    subscribers: 0,
    admins: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };

      const [u, r, n, a] = await Promise.all([
        axios.get(`${API}/admin/users`, { headers }),
        axios.get(`${API}/admin/registrations`, { headers }),
        axios.get(`${API}/admin/newsletter`, { headers }),
        axios.get(`${API}/admin/admins`, { headers }),
      ]);

      setStats({
        users: u.data.users.length,
        registrations: r.data.registrations.length,
        subscribers: n.data.subscribers.length,
        admins: a.data.admins.length,
      });
    };

    fetchStats();
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(stats).map(([key, value]) => (
          <Grid item xs={12} md={3} key={key}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography sx={{ textTransform: "capitalize" }}>
                {key}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DashboardHome;
