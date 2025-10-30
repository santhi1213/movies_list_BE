const express = require("express");
const cors = require("cors");
const path = require("path");
const moviesRoutes = require("./routes/moviesRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use(errorHandler);

module.exports = app;
