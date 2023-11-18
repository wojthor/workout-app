import Carousel from "react-bootstrap/Carousel";
import AddExercise from "../components/AddExercise";
import { Button } from "react-bootstrap";
import ExerciseModal from "./ExerciseModal";
import { deleteWorkout, getWorkout } from "../features/workout/workoutSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { CgCloseO } from "react-icons/cg";
import czechu from "./czechu.jpg";

function CarouselComponent({ workouts, openedModalId, setOpenedModalId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [exerciseModalIsOpen, setExerciseModalIsOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // nowy stan dla kontrolowanej karuzeli
  const dispatch = useDispatch();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openExerciseModal = (exercise) => {
    setCurrentExercise(exercise);
    setExerciseModalIsOpen(true);
  };

  const closeExerciseModal = () => {
    setCurrentExercise(null);
    setExerciseModalIsOpen(false);
  };

  const handleCarouselSelect = (selectedIndex) => {
    // funkcja wywołania zwrotnego dla kontrolowanej karuzeli
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleCarouselSelect}>
      {workouts.map((workout) => (
        <Carousel.Item key={workout._id}>
          <img src={czechu} alt="" />
          <Carousel.Caption className="bg-warning">
            <h3>{workout.date}</h3>
            <Button onClick={openModal}>Add exercise</Button>

            <AddExercise
              workoutId={workout._id}
              workoutDate={workout.date}
              ModalIsOpen={modalIsOpen}
              closeModal={closeModal}
            />
          </Carousel.Caption>
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
            ExerciseModalIsOpen={exerciseModalIsOpen}
            closeModal={closeExerciseModal}
            exercise={currentExercise}
            date={workout.date}
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
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
