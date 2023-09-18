import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddExercise from "./AddExercise";
import { deleteWorkout, getWorkout } from "../features/workout/workoutSlice";
import { CgCloseO } from "react-icons/cg";
import { useDispatch } from "react-redux";

function WorkoutDisplay({ workout }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="workout-display">
      <h4 className="workout-date">{workout.date}</h4>

      {workout.exercise &&
        workout.exercise.map((exercise, index) => (
          <div className="exercise-list" key={index}>
            <p>Name: {exercise.name}</p>
            <p>Sets: {exercise.sets}</p>
            <p>Weight: {exercise.weight}</p>
            <p>Repetitions: {exercise.repetitions}</p>
          </div>
        ))}

      <button onClick={() => setModalIsOpen(true)} className="add-exercise-btn">
        <IoIosAddCircleOutline />
      </button>
      <button
        onClick={() =>
          dispatch(deleteWorkout(workout._id)).then(() => {
            dispatch(getWorkout());
          })
        }
        className="add-exercise-btn"
      >
        <CgCloseO />
      </button>
      <AddExercise
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        workoutId={workout._id}
      />
    </div>
  );
}

export default WorkoutDisplay;
