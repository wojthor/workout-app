import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ExerciseModal({ exercise, date }) {
  const [ExerciseModalIsOpen, setExerciseModalIsOpen] = useState(false);

  const openModal = () => setExerciseModalIsOpen(true);
  const closeModal = () => setExerciseModalIsOpen(false);

  if (!exercise) return null;

  return (
    <>
      <Button variant="outline-primary" onClick={openModal}>
        {exercise.name}
      </Button>
      <Modal show={ExerciseModalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title> {exercise.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body key={date}>
          <p>Sets: {exercise.sets}</p>
          <p>Weight: {exercise.weight}</p>
          <p>Repetitions: {exercise.repetitions}</p>
          <p>Date: {date}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExerciseModal;
