const asyncHandler = require("express-async-handler");
const Workout = require("../models/workoutModel");
//const Exercise = require("../models/workoutModel");

const setWorkout = asyncHandler(async (req, res) => {
  if (!req.body.date) {
    res.status(400).json("Please add a text field");
  }

  const workout = await Workout.create({
    user: req.user.id,
    date: req.body.date,

    exercise: [],
  });

  res.status(200).json(workout);
});

const addExercise = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(400);
    res.json("Workout not found");
    throw new Error("Workout not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (
    !req.body.name ||
    !req.body.sets ||
    !req.body.weight ||
    !req.body.repetitions
  ) {
    res.status(400).json({ message: "Please add all exercise details " });
    throw new Error("Incomplete exercise details");
  }

  const newExericse = {
    name: req.body.name,
    sets: req.body.sets,
    weight: req.body.weight,
    repetitions: req.body.repetitions,
  };

  workout.exercise.push(newExericse);

  await workout.save();

  res.status(200).json(workout);
});

module.exports = { setWorkout, addExercise };
