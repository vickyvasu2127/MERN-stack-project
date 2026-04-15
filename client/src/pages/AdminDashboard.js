import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await API.put(`/requests/approve/${id}`);
    fetchRequests();
  };

  const reject = async (id) => {
    await API.put(`/requests/reject/${id}`);
    fetchRequests();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🩸 Admin Dashboard</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={styles.card}>
            <p><b>User:</b> {req.user?.name}</p>
            <p><b>Blood Group:</b> {req.bloodGroup}</p>
            <p><b>Units:</b> {req.units}</p>
            <p><b>Status:</b> {req.status}</p>

            <button onClick={() => approve(req._id)} style={styles.approve}>
              Approve
            </button>

            <button onClick={() => reject(req._id)} style={styles.reject}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },
  approve: {
    backgroundColor: "green",
    color: "white",
    marginRight: "10px",
  },
  reject: {
    backgroundColor: "red",
    color: "white",
  },
};

export default AdminDashboard;