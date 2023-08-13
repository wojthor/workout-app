const mongoose = require("mongoose");

const ExerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a text value"],
  },
  sets: {
    type: Number,
    required: [true, "Please add a number value"],
  },
  weight: {
    type: Number,
    required: [true, "Please add a number value"],
  },
  repetitions: {
    type: Number,
    required: [true, "Please add a number value"],
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
  exercise: [ExerciseSchema],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
