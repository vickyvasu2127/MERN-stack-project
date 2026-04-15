import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Request from "./pages/Request";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import API from "./services/api";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🔐 Protected Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home users={users} />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Protected Requests */}
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/register"
          element={<Register fetchUsers={fetchUsers} />}
        />

        <Route path="/login" element={<Login />} />

        {/* 🔥 NEW: Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🔥 NEW: Reset Password */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      {<AdminDashboard />}
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;