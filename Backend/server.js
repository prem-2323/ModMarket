const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./src/routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ModMarket auth server is running." });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptimeSeconds: process.uptime(),
    env: process.env.NODE_ENV || "development",
    firebaseApiKeyConfigured: Boolean(process.env.FIREBASE_API_KEY),
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
  console.log(`Auth backend health: http://localhost:${PORT}/health`);
  console.log(`Auth routes available at http://localhost:${PORT}/api/auth`);
});
