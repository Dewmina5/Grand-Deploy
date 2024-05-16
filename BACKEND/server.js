const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
var morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connection Success! 🚀");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

const grantRoutes = require("./routes/grantHolderRouter");
app.use("/api/grant", grantRoutes);

const AdminRoutes = require("./routes/AdminUserRoutes");
app.use("/api/admin", AdminRoutes);

const ContactUs = require("./routes/ContactUsRounts");
app.use("/api/contact", ContactUs);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
