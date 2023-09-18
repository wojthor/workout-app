const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  setWorkout,
  addExercise,
  deleteWorkout,
  getWorkout,
} = require("../controllers/workoutController");

router.get("/", protect, getWorkout);
router.post("/", protect, setWorkout);
router.put("/:id", protect, addExercise);
router.delete("/:id", protect, deleteWorkout);

module.exports = router;
