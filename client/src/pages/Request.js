import React, { useEffect, useState } from "react";
import API from "../services/api";

const Request = () => {
  const [form, setForm] = useState({
    bloodGroup: "",
    hospital: "",
  });

  const [requests, setRequests] = useState([]);

  const bloodGroups = [
    "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchRequests = async () => {
    const res = await API.get("/requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bloodGroup || !form.hospital) {
      alert("Fill all fields");
      return;
    }

    await API.post("/requests", form);

    alert("🩸 Request Created");

    setForm({ bloodGroup: "", hospital: "" });

    fetchRequests();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/requests/${id}`, { status });
    fetchRequests();
  };

  return (
    <div style={styles.container}>
      <h2>🩸 Blood Requests</h2>

      {/* Create Request */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <input
          name="hospital"
          placeholder="Hospital Name"
          value={form.hospital}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Create Request
        </button>
      </form>

      {/* Request List */}
      <div style={styles.list}>
        {requests.map((req) => (
          <div key={req._id} style={styles.card}>
            <h3>{req.bloodGroup}</h3>
            <p>{req.hospital}</p>
            <p>Status: <b>{req.status}</b></p>

            <button
              style={styles.accept}
              onClick={() => updateStatus(req._id, "accepted")}
            >
              Accept
            </button>

            <button
              style={styles.reject}
              onClick={() => updateStatus(req._id, "rejected")}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
  },
  accept: {
    marginRight: "10px",
    backgroundColor: "green",
    color: "white",
    padding: "5px",
  },
  reject: {
    backgroundColor: "black",
    color: "white",
    padding: "5px",
  },
};

export default Request;