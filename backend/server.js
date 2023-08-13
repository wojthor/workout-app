const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT;

connectDB();
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/workout", require("./routes/workoutRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
