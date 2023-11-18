import React, { useState } from "react";
import ControlledCarousel from "../components/Carousel";
import AddExercise from "./AddExercise";
import { deleteWorkout, getWorkout } from "../features/workout/workoutSlice";
import { CgCloseO } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import ExerciseModal from "./ExerciseModal";

function WorkoutDisplay({ workout, openedModalId, setOpenedModalId }) {
  const [ExerciseModalIsOpen, setExerciseModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseModalIsOpen(true);
  };

  return (
    <div className="figure-container">
      <ControlledCarousel
        workout={workout}
        openedModalId={openedModalId}
        setOpenedModalId={setOpenedModalId}
      />
      {workout.exercise &&
        workout.exercise.map((exercise, index) => (
          <Button
            key={index}
            className="exercise-info"
            variant="secondary"
            onClick={() => openExerciseModal(exercise)}
          >
            <div className="exercises">
              <p>{exercise.name}</p>
            </div>
          </Button>
        ))}

      <ExerciseModal
        ExerciseModalIsOpen={ExerciseModalIsOpen}
        closeModal={() => {
          setExerciseModalIsOpen(false);
          setSelectedExercise(null);
        }}
        exercise={selectedExercise}
        date={workout.date}
      />

      <AddExercise
        ModalIsOpen={openedModalId === workout._id}
        closeModal={() => setOpenedModalId(null)}
        workoutId={workout._id}
      />

      <Button
        variant="danger"
        className="delete-card-btn delete-button"
        onClick={() => {
          dispatch(deleteWorkout(workout._id)).then(() => {
            dispatch(getWorkout());
          });
        }}
      >
        <CgCloseO />
      </Button>
    </div>
  );
}

export default WorkoutDisplay;
