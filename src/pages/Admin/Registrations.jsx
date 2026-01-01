// pages/AdminRegistrations.jsx
import React, { useEffect, useState } from "react";
import {
  getRegistrations,
  approveRegistration,
  confirmSeat,
} from "../services/adminApi";

const AdminRegistrations = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getRegistrations();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Registration Panel</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Batch</th>
            <th>Admin Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((reg) => (
            <tr key={reg._id}>
              <td>{reg.name}</td>
              <td>{reg.email}</td>
              <td>{reg.mobile}</td>
              <td>{reg.mode}</td>
              <td>{reg.status}</td>
              <td>{reg.batchId}</td>

              <td>
                {!reg.adminApproved && (
                  <button onClick={() => approveRegistration(reg._id)}>
                    Approve
                  </button>
                )}

                {reg.status === "ADMIN_APPROVED" && (
                  <button onClick={() => confirmSeat(reg._id)}>
                    Confirm Seat
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegistrations;
