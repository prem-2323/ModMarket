const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sharemodsRoutes = require("./routes/sharemodsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sharemods", sharemodsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
