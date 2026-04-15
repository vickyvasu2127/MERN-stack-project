const Request = require("../models/Request");


// GET ALL REQUESTS (ADMIN)
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("user", "name email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// APPROVE REQUEST
const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "approved";
    await request.save();

    res.json({ message: "Request approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// REJECT REQUEST
const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRequests,
  approveRequest,
  rejectRequest,
};