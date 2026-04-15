import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      alert("✅ Password reset successful");
    } catch (err) {
      alert("❌ Reset failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;