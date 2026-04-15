require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


// ================= CONNECT DB =================
connectDB();


// ================= MIDDLEWARE =================
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());


// ================= ROUTES =================
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);


// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.json({ message: "🚀 API Running Successfully" });
});


// ================= ERROR MIDDLEWARE (MUST BE LAST) =================
app.use(errorMiddleware);


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});