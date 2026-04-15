import React, { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");

  const bloodGroups = [
    "", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"
  ];

  const fetchUsers = async (group = "") => {
    try {
      let url = "/users";

      if (group) {
        url = `/users?bloodGroup=${encodeURIComponent(group)}`;
      }

      const res = await API.get(url);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (e) => {
    const selected = e.target.value;
    setBloodGroup(selected);
    fetchUsers(selected);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🩸 Donor List</h2>

      {/* Filter Dropdown */}
      <select value={bloodGroup} onChange={handleFilter} style={styles.select}>
        {bloodGroups.map((bg, i) => (
          <option key={i} value={bg}>
            {bg === "" ? "All Blood Groups" : bg}
          </option>
        ))}
      </select>

      {/* Donor List */}
      <div style={styles.list}>
        {users.length === 0 ? (
          <p>No donors found</p>
        ) : (
          users.map((u) => (
            <div key={u._id} style={styles.card}>
              <h3>{u.name}</h3>
              <p>{u.email}</p>
              <span style={styles.badge}>{u.bloodGroup}</span>
            </div>
          ))
        )}
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
  title: {
    marginBottom: "10px",
  },
  select: {
    padding: "10px",
    marginBottom: "15px",
    width: "100%",
    borderRadius: "5px",
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
    textAlign: "left",
  },
  badge: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
  },
};

export default Home;