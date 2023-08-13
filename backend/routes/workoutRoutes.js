const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { setWorkout, addExercise } = require("../controllers/workoutController");

router.post("/", protect, setWorkout);
router.put("/:id", protect, addExercise);

module.exports = router;
