const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ai_voice_calling")
  .then(() => console.log("✅ MongoDB Connected for Auth"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Login Endpoint
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`🔑 Login attempt for: ${username}`);

  // Returning a token is critical so React's ProtectedRoute lets you in
  res.json({
    message: "Logged in successfully",
    username: username || "AdminUser",
    token: "valid-session-token-12345"
  });
});

// Register Endpoint
app.post("/api/auth/register", (req, res) => {
  const { username } = req.body;
  console.log(`📝 Register attempt for: ${username}`);

  res.json({
    message: "Registered successfully"
  });
});

app.listen(5000, () => {
  console.log("🚀 Auth Server running on port 5000");
});