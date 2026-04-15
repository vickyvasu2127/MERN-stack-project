import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
      <Link to="/requests">Requests</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Navbar;