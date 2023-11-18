const mongoose = require("mongoose");

const ExerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a text value"],
  },
  sets: {
    type: String,
    required: [true, "Please enter the number of series"],
  },
  weight: {
    type: String,
    required: [true, "Please enter the weight"],
  },
  repetitions: {
    type: String,
    required: [true, "Please enter the number of repetitions"],
  },
});

const WorkoutSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
