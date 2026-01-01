// src/pages/Admin/Registrations.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button
} from "@mui/material";

const API = "https://sm-backend-8me3.onrender.com/api";

export default function RegistrationsAdmin() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("accessToken");

  const load = async () => {
    const res = await axios.get(`${API}/admin/registrations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(res.data.registrations);
  };

  useEffect(() => { load(); }, []);

  const approve = async (id) => {
    await axios.put(`${API}/admin/registrations/approve/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Approved</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(r => (
          <TableRow key={r._id}>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.status}</TableCell>
            <TableCell>{r.adminApproved ? "Yes" : "No"}</TableCell>
            <TableCell>
              {!r.adminApproved && (
                <Button onClick={() => approve(r._id)}>Approve</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
