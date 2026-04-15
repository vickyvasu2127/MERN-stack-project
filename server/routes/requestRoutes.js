const express = require("express");
const router = express.Router();

const {
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/requestController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");


// ADMIN ONLY
router.get("/", protect, admin, getAllRequests);
router.put("/approve/:id", protect, admin, approveRequest);
router.put("/reject/:id", protect, admin, rejectRequest);

module.exports = router;