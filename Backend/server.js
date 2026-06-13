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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
