import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // save token
      localStorage.setItem("token", res.data.token);

      alert("✅ Login Successful");

      navigate("/"); // go to home
    } catch (error) {
      console.error(error);
      alert("❌ Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {/* ✅ Forgot Password Link */}
      <p style={styles.forgot}>
        <Link to="/forgot-password" style={styles.link}>
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
  },
  button: {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
  },
  forgot: {
    marginTop: "10px",
  },
  link: {
    color: "blue",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default Login;