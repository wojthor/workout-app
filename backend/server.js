const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
